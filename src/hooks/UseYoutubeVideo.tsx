import { useCallback, useState } from 'react';

import { fetchYoutubeVideo } from '@/apis/Youtube';
import {
  getYoutubeVideoFromMetadata,
  YoutubeVideo,
} from '@/hooks/useGetYoutubeVideoFromMetadata';

export function extractVideoIdFromUrl(url: string) {
  const match = url.match(/(?:[?&]v=|\/embed\/|\/v\/|youtu\.be\/)([^&\n?#]+)/);
  return match ? match[1] : '';
}

export function useYoutubeVideo() {
  const [youtubeVideo, setYoutubeVideo] = useState<YoutubeVideo | null>(null);
  const handler = useCallback((youtubeVideoUrl: string | undefined) => {
    if (youtubeVideoUrl) {
      fetchYoutubeVideo(extractVideoIdFromUrl(youtubeVideoUrl))
        .then(data => {
          setYoutubeVideo(getYoutubeVideoFromMetadata(data.items[0]));
        })
        .catch(() => {
          setYoutubeVideo(null);
        });
    }
  }, []);
  return { youtubeVideo, handler };
}
