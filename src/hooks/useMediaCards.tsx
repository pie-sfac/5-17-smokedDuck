import { useContext } from 'react';
import useSWR from 'swr';

import { getLinkList, LINK_URL } from '@/apis/Media';
import { MainContext } from '@/store';
import { GetLinkListResponse } from '@/types/media.interface';

export default function useMediaCards(category?: string) {
  const { loginToken } = useContext(MainContext);

  const { data: mediaList, error } = useSWR<
    GetLinkListResponse,
    Error,
    [string, string]
  >([LINK_URL, loginToken], ([, accessToken]) => getLinkList(accessToken));

  return {
    mediaList: category
      ? mediaList?.archiveLinks.filter(link => {
          link.category.title === category;
        })
      : mediaList?.archiveLinks,

    isLoading: !error && !mediaList,
    error: error,
  };
}
