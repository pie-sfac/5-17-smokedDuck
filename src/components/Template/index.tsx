import { useContext, useState } from 'react';
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

  const handleTemplateContent = (id: string, value: string | Questions[]) => {
    templateContent &&
      setTemplateContent({
        ...templateContent,
        [id]: value,
      });
  };

  const handleClickedSaveButton = async () => {
    questionList.map(question => {
      if (question.type === 'SELECT') {
        if (question.options?.length === 0) {
          alert('선택형 문항의 보기가 존재하지 않습니다.');
          return;
        } else {
          const set = new Set(question.options);
          if (set.size !== question.options?.length) {
            alert(
              '작성하신 선택형 문항의 보기 중 중복값이 존재합니다. 중복을 수정해주세요.'
            );
            return;
          }
        }
      }
    });

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
