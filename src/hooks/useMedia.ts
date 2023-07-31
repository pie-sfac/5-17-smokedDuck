import { useEffect, useMemo, useRef, useState } from 'react';

import {
  GetLinkDetailResponse,
  getLinkDetails,
  getLinkList,
  GetLinkListResponse,
} from '@/apis/Media';

export const useMediaList = () => {
  const [mediaList, setMediaList] = useState<GetLinkListResponse | null>(null);

  useEffect(() => {
    getLinkList().then((responseData: GetLinkListResponse) => {
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

export const useMedia = (linkId: number) => {
  const [media, setMedia] = useState<GetLinkDetailResponse | null>(null);

  useEffect(() => {
    getLinkDetails(linkId).then((responseData: GetLinkDetailResponse) => {
      setMedia(responseData);
    });
  }, [linkId]);

  const memoizedMedia = useMemo(() => media, [media]);
  return { media: memoizedMedia };
};
