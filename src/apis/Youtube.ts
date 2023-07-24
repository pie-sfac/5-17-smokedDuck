/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const API_KEY = 'AIzaSyBg1mCHyMITB1NjtW3EJDGR_MFIac0zX20';

export async function fetchYoutubeVideo(videoId: any) {
  const requestUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`;
  return (await axios.get(requestUrl)).data;
}
