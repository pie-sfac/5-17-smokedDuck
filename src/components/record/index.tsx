import { useCallback, useEffect, useState } from 'react';

import { recordListPropsType } from '@/types/recordList.interface';

import RecordListContainer from './RecordListContainer';
import TypeSelector from './TypeSelector';

export default function Record({ templates }: recordListPropsType) {
  const [templateType, setTemplateType] = useState('INTERVIEW');
  const [recordList, setRecordList] = useState(
    templates.filter(item => item.category === 'INTERVIEW')
  );
  const [interviewTemplateCount] = useState(
    templates.filter(item => item.category === 'INTERVIEW').length
  );
  const [treatmentTemplateCount] = useState(
    templates.filter(item => item.category === 'TREATMENT').length
  );

  useEffect(() => {}, [templates]);

  const changeListType = useCallback(
    (type: string) => {
      setTemplateType(type);
      setRecordList(templates.filter(item => item.category === type));
    },
    [templates]
  );

  return (
    <>
      <TypeSelector
        templateType={templateType}
        changeListType={changeListType}
        interviewNum={interviewTemplateCount}
        treatNum={treatmentTemplateCount}
      />
      <RecordListContainer templates={recordList} />
    </>
  );
}
