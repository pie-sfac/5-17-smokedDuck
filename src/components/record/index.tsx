import { useCallback, useState } from 'react';

import RecordListContainer from './RecordListContainer';
import TypeSelector from './TypeSelector';

export default function Record() {
  const [templateCategory, setTemplateCategory] = useState('INTERVIEW');
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
    </>
  );
}
