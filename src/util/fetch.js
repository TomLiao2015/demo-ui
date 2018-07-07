import fetch from 'isomorphic-fetch';


const headers = new Headers();
headers.append('content-type', 'application/json');

const init = {
    headers: headers
};
const API_HOST = '/api';
export default function fetchData(url, config){
    return fetch(API_HOST + url, {
        ...init,
        ...config
    }).then((response) => response.json());
};