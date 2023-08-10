import styled from '@emotion/styled';

import Loading from '@/components/Common/Loading';
import { useRecordDetail } from '@/utils/recordData';

type UpdateTemplateTitleProp = {
  id: number;
  isEditing: boolean;
};

export default function UpdateTemplateTitle({
  id,
  isEditing,
}: UpdateTemplateTitleProp) {
  const { recordDetailData } = useRecordDetail(id);

  return (
    <ModalTitle>
      {!recordDetailData && <Loading />}
      {recordDetailData?.category === 'INTERVIEW'
        ? `문진 템플릿 ${isEditing ? '수정' : ''}`
        : `처치 템플릿 ${isEditing ? '수정' : ''}`}
    </ModalTitle>
  );
}

const ModalTitle = styled('div')`
  font-size: 16px;
  font-weight: bold;
  margin: 2rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #e7e7e7;
`;
