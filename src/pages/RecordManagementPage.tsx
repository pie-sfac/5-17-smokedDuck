import styled from '@emotion/styled';

import Record from '@/components/Record';

export default function RecordManagementPage() {
  return (
    <PageContainer>
      <Record />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  position: relative;
`;
