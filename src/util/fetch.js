import fetch from 'isomorphic-fetch';


const init = {
    headers: {
        'Accept': 'application/json',
    }
};
const API_HOST = '/api';
export default function fetchData(url, config){
    return fetch(API_HOST + url, {
        ...init,
        ...config
    }).then((response) => response.json());
};