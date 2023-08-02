import { useContext } from 'react';

import RecordDetailItemQuestionSeletor from '@/components/RecordDetailItem/RecordDetailItemQuestionSeletor';
import RecordDetailTitle from '@/components/RecordDetailItem/RecordDetailTitle';
import RecordDetailItemTemplateContent from '@/components/Template/RecordDetailTemplateContent';
import { MainContext } from '@/store';

import TemplateFooter from './TemplateFooter';
import TemplateTitle from './TemplateTitle';

export default function RecordDetailTemplate() {
  const { isRecordEdit } = useContext(MainContext);
  return (
    <>
      {isRecordEdit ? (
        <>
          <TemplateTitle />
          <RecordDetailTitle />
          <RecordDetailItemQuestionSeletor />
          <RecordDetailItemTemplateContent />
          <TemplateFooter
            handleClickedSaveButton={async () => {
              await new Promise(resolve => {
                setTimeout(() => {
                  resolve(1);
                }, 1000);
              });
            }}
          />
        </>
      ) : (
        <>
          <RecordDetailTitle />
          <RecordDetailItemTemplateContent />
        </>
      )}
    </>
  );
}
