import fetch from 'isomorphic-fetch';


const init = {
    headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json'
    }
};
const API_HOST = '//localhost:4000';
export default function fetchData(url, config){
    return fetch(API_HOST + url, {
        ...init,
        ...config
    })
};