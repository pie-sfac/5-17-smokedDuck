import axios from 'axios';

const API_KEY = 'MyApiKey';

export async function fetchYoutubeVideo(videoId:any) {
    const requestUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`;
    return (await axios.get(requestUrl)).data;

}
