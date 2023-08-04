import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useContext, useEffect, useState } from 'react';
import { mutate } from 'swr';

import { createLink, getLinkDetails, LINK_URL, updateLink } from '@/apis/Media';
import LinkForm from '@/components/Link/LinkForm';
import LinkView from '@/components/Link/LinkView';
import { MainContext } from '@/store';
import { FormData, UpdateLinkProps } from '@/types/media.interface';
import {
  CreateLinkProps,
  CreateLinkResponse,
  GetLinkDetailResponse,
  GetLinkListResponse,
} from '@/types/media.interface';
export interface LinkComponentProps {
  mode: 'CREATE' | 'UPDATE';
  linkId?: number;
}

export default function LinkComponent({ mode, linkId }: LinkComponentProps) {
  const [fetchLinkResponseData, setFetchLinkResponseData] =
    useState<CreateLinkResponse | null>(null);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const { loginToken } = useContext(MainContext);

  const refreshLinkListCache = (
    accessToken: string,
    fetchLinkDetails: GetLinkDetailResponse
  ) => {
    if (mode == 'CREATE') {
      mutate(
        [LINK_URL, accessToken],
        (data: GetLinkListResponse | undefined) => ({
          archiveLinks: [...(data?.archiveLinks || []), fetchLinkDetails],
          message: data?.message || '',
        }),
        false
      );
    }
    if (mode == 'UPDATE') {
      mutate(
        [LINK_URL, accessToken],
        (data: GetLinkListResponse | undefined) => {
          const updatedArchiveLinks = [...(data?.archiveLinks || [])];

          if (linkId) {
            let updatedTargetLinkIndex = 0;
            for (let i = 0; i < updatedArchiveLinks.length; i++) {
              if (updatedArchiveLinks[i].id == fetchLinkDetails.id) {
                updatedTargetLinkIndex = i;
              }
            }
            updatedArchiveLinks[updatedTargetLinkIndex] = fetchLinkDetails;
          }
          return {
            archiveLinks: updatedArchiveLinks,
            message: data?.message || '',
          };
        },
        false
      );
    }
  };

  const fetchLinkAPI = async (
    requestData: CreateLinkProps | UpdateLinkProps
  ) => {
    const accessToken = loginToken || '';

    const fetchLinkResponseData =
      mode == 'CREATE'
        ? await createLink(requestData, accessToken)
        : await updateLink(linkId || 0, requestData, accessToken);

    setFetchLinkResponseData(fetchLinkResponseData);

    const fetchLinkDetail: GetLinkDetailResponse = await getLinkDetails(
      fetchLinkResponseData.id,
      accessToken
    );

    refreshLinkListCache(accessToken, fetchLinkDetail);
  };

  const handleFormSubmit = (data: FormData) => {
    if (typeof data === 'object' && data !== null) {
      const requestData: CreateLinkProps = {
        categoryId: data.category || 0,
        url: `${data.linkUrl};${data.thumbnailUrl}`,
        title: data.title,
        description: data.description,
      };
      fetchLinkAPI(requestData);
    }
  };

  useEffect(() => {
    if (fetchLinkResponseData) {
      setShowCompletionMessage(true);
      const timer = setTimeout(() => {
        setShowCompletionMessage(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [fetchLinkResponseData]);

  return (
    <div>
      {fetchLinkResponseData ? (
        <>
          <LinkView linkId={fetchLinkResponseData.id} />
          {showCompletionMessage && (
            <MessageBox>
              <MessageText color="white">저장되었습니다.</MessageText>
            </MessageBox>
          )}
        </>
      ) : (
        <LinkForm onSubmit={handleFormSubmit} linkId={linkId} />
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
  width: 900px;
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
