import axios from 'axios';
import qs from 'qs';
import { Urls } from './urls';

const get = axios.get;
const post = (url: Urls, data: any) => axios.post(url, qs.stringify(data), {
    headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
});

export { get, post }