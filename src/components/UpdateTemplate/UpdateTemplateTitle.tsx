import styled from '@emotion/styled';

import Loading from '@/components/Common/Loading';
import useRecordDetail from '@/hooks/useRecordDetail';

type UpdateTemplateTitlePropType = {
  id: number;
  isEditing: boolean;
};

export default function UpdateTemplateTitle({
  id,
  isEditing,
}: UpdateTemplateTitlePropType) {
  const { recordDetailData } = useRecordDetail(id);

  return recordDetailData ? (
    <ModalTitle>
      {recordDetailData.category === 'INTERVIEW'
        ? `문진 템플릿 ${isEditing ? '수정' : ''}`
        : `처치 템플릿 ${isEditing ? '수정' : ''}`}
    </ModalTitle>
  ) : (
    <Loading />
  );
}

const ModalTitle = styled('div')`
  font-size: 14px;
  margin: 2rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #e7e7e7;
`;
