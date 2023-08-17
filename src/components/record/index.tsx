import { useMediaQuery } from '@chakra-ui/react';
import { useCallback, useContext, useState } from 'react';

import Modal from '@/components/Common/Modal';
import RecordListContainer from '@/components/Record/RecordListContainer';
import TypeSelector from '@/components/Record/RecordTypeSelector';
import Template from '@/components/Template';
import { QueustionContext } from '@/store/QuestionProvider';
import { RecordContext } from '@/store/RecordProvider';
import { TemplateContext } from '@/store/TemplateProvider';

export default function Record() {
  const { recordModalOpen, setRecordModalState } = useContext(RecordContext);
  const { selectedTemplateTitle, setSelectedTemplateTitle } =
    useContext(TemplateContext);
  const { setQuestionList } = useContext(QueustionContext);

  const [templateCategory, setTemplateCategory] = useState('INTERVIEW');
  const [isSmallScreen] = useMediaQuery('(min-height: 800px)');

  const modalStatehandler = () => {
    setTimeout(() => {
      setRecordModalState(false);
      setSelectedTemplateTitle('');
      setQuestionList([]);
    }, 500);
  };

  const changeListType = useCallback((type: string) => {
    setTemplateCategory(type);
  }, []);

  return (
    <>
      <TypeSelector
        templateType={templateCategory}
        changeListType={changeListType}
      />
      <RecordListContainer category={templateCategory} />
      {recordModalOpen && (
        <Modal
          width={selectedTemplateTitle.length === 0 ? 700 : undefined}
          height={
            selectedTemplateTitle.length === 0
              ? 400
              : isSmallScreen
              ? 900
              : undefined
          }
          setIsOpen={setRecordModalState}
          showConfirmationAlert={
            selectedTemplateTitle.length === 0 ? false : true
          }
        >
          <Template modalStatehandler={modalStatehandler} />
        </Modal>
      )}
    </>
  );
}
