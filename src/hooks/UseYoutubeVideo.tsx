import { useState } from 'react';

import { fetchYoutubeVideo } from '@/apis/Youtube';
import {
  getYoutubeVideoFromMetadata,
  YoutubeVideo,
} from '@/hooks/useGetYoutubeVideoFromMetadata';

export function useYoutubeVideo() {
  const [youtubeVideo, setYoutubeVideo] = useState<YoutubeVideo | null>(null);
  const handler = (youtubeVideoUrl: string) => {
    if (!youtubeVideoUrl.trim()) {
      setYoutubeVideo(null);
      return;
    }

    fetchYoutubeVideo(extractVideoIdFromUrl(youtubeVideoUrl)).then(data => {
      setYoutubeVideo(getYoutubeVideoFromMetadata(data.items[0]));
    });
  };
  const extractVideoIdFromUrl = (url: string) => {
    const match = url.match(
      /(?:[?&]v=|\/embed\/|\/v\/|youtu\.be\/)([^&\n?#]+)/
    );
    return match ? match[1] : '';
  };
  return { youtubeVideo, handler };
}
