import React, { useState } from 'react';

import { fetchYoutubeVideo } from '../apis/Youtube';

export interface YoutubeVideo {
  title: string;
  thumbnailUrl: string;
  description: string;
}

export function useYoutubeVideo() {
  const [youtubeVideo, setYoutubeVideo] = useState<YoutubeVideo | null>(null);
  const handler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const youtubeVideoUrl = event.target.value;

    if (!youtubeVideoUrl.trim()) {
      setYoutubeVideo(null);
      return;
    }

    fetchYoutubeVideo(extractVideoIdFromUrl(youtubeVideoUrl)).then(data => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      setYoutubeVideo(getYoutubeVideoFromMetedata(data.items[0]));
    });
  };
  function extractVideoIdFromUrl(url: string) {
    const match = url.match(
      /(?:[?&]v=|\/embed\/|\/v\/|youtu\.be\/)([^&\n?#]+)/
    );
    return match ? match[1] : '';
  }
  return { youtubeVideo, handler };
}

export function getYoutubeVideoFromMetedata(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  youtubeVideoMetadata: any
): YoutubeVideo {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    title: youtubeVideoMetadata?.snippet.title,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    thumbnailUrl: youtubeVideoMetadata?.snippet.thumbnails?.default?.url || '',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    description: youtubeVideoMetadata?.snippet.description.slice(0, 500),
  };
}
