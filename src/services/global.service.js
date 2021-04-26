import urlConf from '../config';

export const globalService = {
    getData,
    postData,
};

function getData(url){
    return fetch(urlConf()+url).then(handleResponse);
}

export function fetchGet(url){
    console.log('url : '+urlConf()+url);
    return fetch(urlConf()+url).then(response=>response.json()).then(data=>{
        return data;
    });
}

function postData(url, dataSend){
    console.log(dataSend);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataSend)
    };
    return fetch(urlConf()+url, requestOptions).then(handleResponse);
}

export function fetchPost(url, dataSend){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataSend)
    };
    return fetch(urlConf()+url, requestOptions).then(response=>response.json()).then(data=>{
        return data;
    });
}
export function fetchPostV2(url, dataSend){
    const requestOptions = {
        method: 'POST',
        body: dataSend
    };
    return fetch(url, requestOptions).then(response=>response.json()).then(data=>{
        return data;
    });
}
export function fetchPostIndependent(url, dataSend){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataSend)
    };
    return fetch(url, requestOptions).then(response=>response.json()).then(data=>{
        return data;
    });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                window.location.reload();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        console.log(data);
        return data;
    });
}

// export default fetchGet;