/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import LinkCreateComponent from './LinkCreateComponent';
import LinkViewComponent from './LinkViewComponent';

const MessageBox = styled.div`
  display: flex;
  position: relative;
  bottom: 20px;
  width: 992px;
  background-color: #2d62ea;
  color: white;
  border-radius: 10px;
  height: 40px;
`;

const MessageText = styled.p`
  color: white;
  font-size: 14px;
  height: 40px;
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

export default function LinkComponent() {
  const [formData, setFormData] = useState<any>(null);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

  const handleFormSubmit = (data: any) => {
    setFormData(data);
  };

  useEffect(() => {
    if (formData) {
      setShowCompletionMessage(true);
      const timer = setTimeout(() => {
        setShowCompletionMessage(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [formData]);

  return (
    <div>
      {!formData ? (
        <LinkCreateComponent onSubmit={handleFormSubmit} />
      ) : (
        <>
          <LinkViewComponent
            category={formData.category}
            linkUrl={formData.linkUrl}
            linkTitle={formData.title}
            description={formData.description}
            thumbnailUrl={formData.thumbnailUrl}
            title={formData.title}
          />
          {showCompletionMessage && (
            <MessageBox>
              <MessageText color="white">저장되었습니다.</MessageText>
            </MessageBox>
          )}
        </>
      )}
    </div>
  );
}
