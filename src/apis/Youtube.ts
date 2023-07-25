/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export async function fetchYoutubeVideo(videoId: any) {
  const requestUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${
    import.meta.env.VITE_APP_GA_API_KEY
  }`;
  return (await axios.get(requestUrl)).data;
}
