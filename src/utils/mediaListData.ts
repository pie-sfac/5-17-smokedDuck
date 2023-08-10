import useSWR from 'swr';

import { getLinkList, LINK_URL } from '@/apis/Media';
import { GetLinkListResponse } from '@/types/media.interface';

export default function useMediaList(category?: string) {
  const { data: mediaList, error } = useSWR<GetLinkListResponse, Error>(
    LINK_URL,
    getLinkList
  );

  return {
    mediaList:
      category !== '전체'
        ? mediaList?.archiveLinks.filter(
            link => link.category.title === category
          )
        : mediaList?.archiveLinks,
    isLoading: !error && !mediaList,
    error: error,
    totalLinksCount: mediaList ? mediaList.archiveLinks.length : 0,
  };
}
