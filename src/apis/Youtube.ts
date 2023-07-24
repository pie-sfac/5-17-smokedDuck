import axios from 'axios';

const API_KEY = 'MyApiKey';

export async function fetchYoutubeVideo(videoId: string) {
  const requestUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return (await axios.get(requestUrl)).data;
}
