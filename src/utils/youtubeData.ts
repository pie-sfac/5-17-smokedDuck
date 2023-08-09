import { useCallback, useState } from 'react';

import { fetchYoutubeVideo } from '@/apis/Youtube';

interface YoutubeVideo {
  title: string;
  thumbnailUrl: string;
  description: string;
}

export interface YoutubeVideoMetadata {
  snippet: {
    title: string;
    thumbnails?: {
      default?: {
        url: string;
      };
    };
    description: string;
  };
}

function getYoutubeVideoFromMetadata(
  youtubeVideoMetadata: YoutubeVideoMetadata
): YoutubeVideo {
  return {
    title: youtubeVideoMetadata.snippet.title,
    thumbnailUrl: youtubeVideoMetadata.snippet.thumbnails?.default?.url || '',
    description: youtubeVideoMetadata.snippet.description.slice(0, 500),
  };
}

function extractVideoIdFromUrl(url: string) {
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
