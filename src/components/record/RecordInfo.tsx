import Loading from '@/components/Common/Loading';
import RecordContents from '@/components/Record/RecordContents';
import RecordModalHeader from '@/components/Record/RecordModalHeader';
import UpdateTemplate from '@/components/UpdateTemplate';
import UpdateTemplateTitle from '@/components/UpdateTemplate/UpdateTemplateTitle';
import useRecordDetail from '@/hooks/useRecordDetail';

type RecordInfo = {
  id: number;
  isEditing: boolean;
};

export default function RecordInfo({ id, isEditing }: RecordInfo) {
  const { recordDetailData } = useRecordDetail(id);

  return (
    <>
      {!recordDetailData && <Loading />}
      {recordDetailData && isEditing ? (
        <UpdateTemplate id={id} recordDetailData={recordDetailData} />
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
