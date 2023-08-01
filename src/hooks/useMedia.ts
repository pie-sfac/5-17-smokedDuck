import { useEffect, useMemo, useRef, useState } from 'react';

import { getLinkDetails, getLinkList } from '@/apis/Media';
import {
  GetLinkDetailResponse,
  GetLinkListResponse,
} from '@/types/media.interface';

export const useMediaList = (token: string) => {
  const [mediaList, setMediaList] = useState<GetLinkListResponse | null>(null);

  useEffect(() => {
    getLinkList(token).then((responseData: GetLinkListResponse) => {
      setMediaList(responseData);
    });
  }, []);

  const memoizedMediaList = useMemo(() => mediaList, [mediaList]);

  const mediaListRef = useRef(memoizedMediaList);
  useEffect(() => {
    mediaListRef.current = memoizedMediaList;
  }, [memoizedMediaList]);

  return mediaListRef.current;
};

export const useMedia = (linkId: number, token: string) => {
  const [media, setMedia] = useState<GetLinkDetailResponse | null>(null);

  useEffect(() => {
    getLinkDetails(linkId, token).then(
      (responseData: GetLinkDetailResponse) => {
        setMedia(responseData);
      }
    );
  }, [linkId]);

  const memoizedMedia = useMemo(() => media, [media]);
  return { media: memoizedMedia };
};
