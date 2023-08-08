import { useCallback, useContext, useEffect, useState } from 'react';
import { mutate } from 'swr';

import { createTemplate } from '@/apis/Template';
import useRecord from '@/hooks/useRecord';
import { MainContext } from '@/store';
import { Questions } from '@/types/question.interface';

import TemplateContent from './TemplateContent';
import TemplateFooter from './TemplateFooter';
import TemplateTitle from './TemplateTitle';

type NewTemplateContent = {
  questions: Questions[];
  category?: '' | 'INTERVIEW' | 'TREATMENT' | undefined;
  title?: string | undefined;
  description?: string | undefined;
};

export default function Template() {
  const {
    questionList,
    templateContent,
    setTemplateContent,
    selectedTemplateTitle,
    selectedRecordCard,
  } = useContext(MainContext);

  const { recordListData } = useRecord();

  const [currTemplateSubHeader, setCurrTemplateSubHeader] = useState({
    title: selectedRecordCard ? selectedRecordCard.title : '',
    description: selectedRecordCard ? selectedRecordCard.description : '',
  });

  const [didConditionPassed, setDidConditionPassed] = useState<boolean>();

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

  const handleTemplateContent = (id: string, value: string | Questions[]) => {
    templateContent &&
      setTemplateContent({
        ...templateContent,
        [id]: value,
      });
  };

  const handleClickedSaveButton = useCallback(() => {
    if (templateContent?.title.length === 0) {
      alert('템플릿 제목을 입력해주세요.');
      return;
    }
    questionList.forEach(question => {
      if (question.tagName === '기본' && question.title.length === 0) {
        alert(`${setTitle(question.type)} 문항의 제목을 입력해주세요.`);
        setDidConditionPassed(false);
        return;
      }
      if (question.type === 'SELECT' && question.options?.length === 0) {
        alert('선택형 문항의 보기가 존재하지 않습니다.');
        setDidConditionPassed(false);
        return;
      } else if (question.type === 'SELECT' && question.options?.length !== 0) {
        const set = new Set(question.options);
        if (set.size !== question.options?.length) {
          alert(
            '작성하신 선택형 문항의 보기 중 중복값이 존재합니다. 중복을 수정해주세요.'
          );
          setDidConditionPassed(false);
          return;
        }
      }
      setDidConditionPassed(true);
    });
  }, [questionList, setTitle, templateContent?.title.length]);

  useEffect(() => {
    if (didConditionPassed) {
      const createNewRecord = async () => {
        const newTemplateContent: NewTemplateContent = {
          ...templateContent,
          questions: questionList,
        };

        const newRecordListData = [
          ...(recordListData || []),
          {
            id: recordListData
              ? recordListData[recordListData?.length - 1].id + 1
              : 1,
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
      setDidConditionPassed(false);
    }
  }, [didConditionPassed, questionList, recordListData, templateContent]);

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
