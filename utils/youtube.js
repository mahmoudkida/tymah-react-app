import axios from 'axios';
import URLs from "../constants/URLs";


export const youtube = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 10,
        key: URLs.YOUTUBE_KEY
    }
})