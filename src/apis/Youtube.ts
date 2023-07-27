import axios, { AxiosResponse } from 'axios';

import { YoutubeVideoMetadata } from '@/hooks/useGetYoutubeVideoFromMetadata';

export interface YoutubeVideoAPIResponse {
  items: [YoutubeVideoMetadata];
}

export async function fetchYoutubeVideo(
  videoId: string
): Promise<YoutubeVideoAPIResponse> {
  const requestUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${
    import.meta.env.VITE_APP_GA_API_KEY
  }`;
  const responseData: AxiosResponse<YoutubeVideoAPIResponse> = await axios.get(
    requestUrl
  );
  return responseData.data;
}
