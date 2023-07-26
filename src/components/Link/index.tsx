import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import LinkCreateComponent from '@/components/Link/LinkForm';
import LinkViewComponent from '@/components/Link/LinkView';

interface FormData {
  category: string;
  linkUrl: string;
  title: string;
  description: string;
  thumbnailUrl: string;
}

export default function LinkComponent() {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

  const handleFormSubmit = (data: unknown) => {
    if (typeof data === 'object' && data !== null) {
      setFormData(data as FormData);
    }
  };

  useEffect(() => {
    if (formData) {
      setShowCompletionMessage(true);
      const timer = setTimeout(() => {
        setShowCompletionMessage(false);
      }, 4000);

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

const slideUpFadeOutAnimation = keyframes`
  0% {
    transform: translateY(10px);
    opacity: 0;
  }
  20% {
    transform: translateY(0);
    opacity: 1;
  }
  70% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(20px);
    opacity: 0;
  }
`;

const MessageBox = styled.div`
  display: flex;
  position: relative;
  bottom: 20px;
  width: 992px;
  background-color: #2d62ea;
  color: white;
  border-radius: 10px;
  height: 40px;
  animation: ${slideUpFadeOutAnimation} 4s ease-in-out;
`;

const MessageText = styled.p`
  color: white;
  font-size: 14px;
  height: 40px;
  display: flex;
  align-items: center;
  margin-left: 20px;
`;
