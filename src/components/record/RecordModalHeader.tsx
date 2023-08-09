import styled from '@emotion/styled';

import Loading from '@/components/Common/Loading';
import useRecordDetail from '@/hooks/useRecordDetail';

type RecordModalHeaderPropType = {
  id: number;
};

export default function RecordModalHeader({ id }: RecordModalHeaderPropType) {
  const { recordDetailData } = useRecordDetail(id);

  return (
    <TemplateContentContainer>
      {!recordDetailData ? (
        <Loading />
      ) : (
        <>
          <label htmlFor="template-title">템플릿 제목*</label>
          <StyledHedaerText>{recordDetailData.title}</StyledHedaerText>
          <br />
          <label htmlFor="template-title">설명</label>
          <StyledHedaerText>{recordDetailData.description}</StyledHedaerText>
        </>
      )}
    </TemplateContentContainer>
  );
}

const TemplateContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 2rem 1rem 2rem;
  font-size: 0.8rem;
`;

const StyledHedaerText = styled.div`
  border-bottom: 1px solid #e7e7e7;
  font-size: 0.9rem;
  margin: 0.2rem;
  padding: 0 0.2rem 0 0.2rem;
`;
