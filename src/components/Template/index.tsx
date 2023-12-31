import { useToast } from '@chakra-ui/react';
import { useCallback, useContext, useState } from 'react';
import { mutate } from 'swr';

import { createTemplate } from '@/apis/Template';
import { QueustionContext } from '@/store/QuestionProvider';
import { RecordContext } from '@/store/RecordProvider';
import { TemplateContext } from '@/store/TemplateProvider';
import { Questions } from '@/types/question.interface';
import { NewTemplateContent } from '@/types/template.interface';
import { templateNotificationText } from '@/utils/constants/template';
import { useRecord } from '@/utils/recordData';

import TemplateContent from './TemplateContent';
import TemplateFooter from './TemplateFooter';
import TemplateTitle from './TemplateTitle';

type TemplateProp = {
  modalStatehandler: () => void;
};

export default function Template({ modalStatehandler }: TemplateProp) {
  const { questionList } = useContext(QueustionContext);
  const { templateContent, setTemplateContent, selectedTemplateTitle } =
    useContext(TemplateContext);
  const { selectedRecordCard } = useContext(RecordContext);

  const { recordListData } = useRecord();
  const toast = useToast();

  const [currTemplateSubHeader, setCurrTemplateSubHeader] = useState({
    title: selectedRecordCard ? selectedRecordCard.title : '',
    description: selectedRecordCard ? selectedRecordCard.description : '',
  });

  const setTitle = useCallback((type: string) => {
    switch (type) {
      case 'PAIN_HSTRY':
        return '통증 정도';
        break;
      case 'CONDITION':
        return '오늘의 컨디션';
        break;
      case 'PAIN_INTV':
        return '통증 문진';
        break;
      case 'TEXT':
        return '텍스트';
        break;
      case 'SELECT':
        return '선택형';
        break;
      case 'MEDIA':
        return '미디어';
        break;
    }
  }, []);

  const handleTemplateContent = useCallback(
    (id: string, value: string | Questions[]) => {
      templateContent &&
        setTemplateContent({
          ...templateContent,
          [id]: value,
        });
    },
    [setTemplateContent, templateContent]
  );

  const validationCheck = useCallback(() => {
    let isValid = true;
    if (templateContent?.title.length === 0) {
      toast({
        title: templateNotificationText.untitledTemplate,
        status: 'error',
        isClosable: true,
        containerStyle: {
          marginBottom: '20px',
        },
        duration: 1200,
      });
      isValid = false;
    }
    questionList.forEach(question => {
      if (question.tagName === '기본' && question.title.length === 0) {
        toast({
          title: `${setTitle(question.type)} ${
            templateNotificationText.untitledQuestion
          }`,
          status: 'error',
          isClosable: true,
          containerStyle: {
            marginBottom: '20px',
          },
          duration: 1200,
        });
        isValid = false;
      }
      if (question.type === 'SELECT' && question.options?.length === 0) {
        toast({
          title: templateNotificationText.noOptions,
          status: 'error',
          isClosable: true,
          containerStyle: {
            marginBottom: '20px',
          },
          duration: 1200,
        });
        isValid = false;
      } else if (question.type === 'SELECT' && question.options?.length !== 0) {
        const set = new Set(question.options);
        if (set.size !== question.options?.length) {
          toast({
            title: templateNotificationText.duplicateOptions,
            status: 'error',
            isClosable: true,
            containerStyle: {
              marginBottom: '20px',
            },
            duration: 1200,
          });
          isValid = false;
        }
      }
    });

    return isValid;
  }, [questionList, setTitle, templateContent?.title.length, toast]);

  const handleClickedSaveButton = useCallback(() => {
    const isValid = validationCheck();
    if (isValid) {
      modalStatehandler();
      const createNewRecord = async () => {
        const newTemplateContent: NewTemplateContent = {
          ...templateContent,
          questions: questionList,
        };

        const newRecordListData = [
          ...(recordListData || []),
          {
            id: !recordListData
              ? 1
              : recordListData[recordListData.length - 1].id + 1,
            category: newTemplateContent.category,
            title: newTemplateContent.title,
            description: newTemplateContent.description,
            createdAt: 'temporary',
            updatedAt: 'temporary',
          },
        ];

        await createTemplate(newTemplateContent);

        mutate('record-templates', newRecordListData, false);
      };
      createNewRecord();
    }
  }, [
    modalStatehandler,
    questionList,
    recordListData,
    templateContent,
    validationCheck,
  ]);

  return (
    <>
      <TemplateTitle />
      <TemplateContent
        currTemplateSubHeader={currTemplateSubHeader}
        setCurrTemplateSubHeader={setCurrTemplateSubHeader}
        onChange={handleTemplateContent}
      />
      {selectedTemplateTitle && (
        <TemplateFooter handleClickedSaveButton={handleClickedSaveButton} />
      )}
    </>
  );
}
