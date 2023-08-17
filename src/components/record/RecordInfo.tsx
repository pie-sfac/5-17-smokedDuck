import Loading from '@/components/Common/Loading';
import RecordContents from '@/components/Record/RecordContents';
import RecordModalHeader from '@/components/Record/RecordModalHeader';
import UpdateTemplate from '@/components/UpdateTemplate';
import UpdateTemplateTitle from '@/components/UpdateTemplate/UpdateTemplateTitle';
import { useRecordDetail } from '@/utils/recordData';

type RecordInfo = {
  id: number;
  isEditing: boolean;
  saveHandler?: () => void;
};

export default function RecordInfo({ id, isEditing, saveHandler }: RecordInfo) {
  const { recordDetailData } = useRecordDetail(id);

  return (
    <>
      {!recordDetailData && <Loading />}
      {recordDetailData && isEditing ? (
        <UpdateTemplate
          id={id}
          recordDetailData={recordDetailData}
          saveHandler={saveHandler!}
        />
      ) : (
        <>
          <UpdateTemplateTitle id={id} isEditing={isEditing} />
          <RecordModalHeader id={id} />
          <RecordContents />
        </>
      )}
    </>
  );
}
