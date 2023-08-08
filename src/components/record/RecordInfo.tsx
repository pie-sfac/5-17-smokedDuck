import RecordContents from '@/components/Record/RecordContents';
import UpdateTemplateTitle from '@/components/UpdateTemplate/UpdateTemplateTitle';

import RecordModalHeader from './RecordModalTitle';

type RecordInfo = {
  id: number;
};

export default function RecordInfo({ id }: RecordInfo) {
  return (
    <>
      <UpdateTemplateTitle />
      <RecordModalHeader id={id} />
      <RecordContents />
    </>
  );
}
