import styled from '@emotion/styled';
import { useContext } from 'react';

import Footer from '@/components/Common/Footer';
import Record from '@/components/Record';
import { QuestionProvider } from '@/store/QuestionProvider';
import { RecordContext } from '@/store/RecordProvider';
import { SelectedIdProvider } from '@/store/SelectedIdProvider';

export default function RecordManagementPage() {
  const { setRecordModalState } = useContext(RecordContext);
  return (
    <SelectedIdProvider>
      <QuestionProvider>
        <PageContainer>
          <Record />
        </PageContainer>
        <Footer
          onClick={() => setRecordModalState(true)}
          buttonContent={' + 템플릿 추가'}
        />
      </QuestionProvider>
    </SelectedIdProvider>
  );
}

const PageContainer = styled.div`
  position: relative;
`;
