import axios, { AxiosResponse } from 'axios';

import { YoutubeVideoMetadata } from '@/utils/youtubeData';

export interface YoutubeVideoAPIResponse {
  items: [YoutubeVideoMetadata];
}

export async function fetchYoutubeVideo(
  videoId: string
): Promise<YoutubeVideoAPIResponse> {
  const youTubeAxios = axios.create({
    baseURL: `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${
      import.meta.env.VITE_APP_GA_API_KEY
    }`,
  });
  delete youTubeAxios.defaults.headers.common['Authorization'];
  const responseData: AxiosResponse<YoutubeVideoAPIResponse> =
    await youTubeAxios.get('');
  return responseData.data;
}
