import urlConf from '../config';
import authHeader from './authHeader';
import {userSession} from './userSession';

export const globalService = {
    getData,
    postData,
};

function getData(url){
    return fetch(urlConf()+url).then(handleResponse);
}

export function fetchGet(url){
    console.log('url : '+urlConf()+url);
    // return fetch(urlConf()+url, { headers: authHeader() }).then(response=>response.json()).then(data=>{
    //     return data;
    // }).catch(error=>{
    //     console.log('global service '+error)
    // });
    return fetch(urlConf()+url).then(response=>handleResponse(response));
}
export function fetchGetHandler(url){
    console.log('url : '+urlConf()+url);
    return fetch(urlConf()+url, { headers: authHeader() }).then(response=>handleResponse(response));
}

function postData(url, dataSend){
    console.log(dataSend);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataSend)
    };
    // return fetch(urlConf()+url, requestOptions).then(handleResponse);
    return fetch(urlConf()+url, requestOptions).then(response=>handleResponse(response));
}

export function fetchPost(url, dataSend){
    const requestOptions = {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        headers: authHeader(true),
        body: JSON.stringify(dataSend)
    };
    // return fetch(urlConf()+url, requestOptions).then(response=>response.json()).then(data=>{
    //     return data;
    // });
    return fetch(urlConf()+url, requestOptions).then(response=>handleResponse(response));
}
export function fetchPostNotLogged(url, dataSend){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataSend)
    };
    // return fetch(urlConf()+url, requestOptions).then(response=>response.json()).then(data=>{
    //     return data;
    // });
    return fetch(urlConf()+url, requestOptions).then(response=>handleResponse(response));
}
export function fetchPostHeader(url, dataSend){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(true),
        body: JSON.stringify(dataSend)
    };
    // return fetch(urlConf()+url, requestOptions).then(handleResponse);
    return fetch(urlConf()+url, requestOptions).then(response=>handleResponse(response));
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

export function fetchPostV3(url, dataSend){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataSend)
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
            // alert(response.status);
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                console.log(response);
                const role = userSession.get('role');
                userSession.userLogout();
                if(role==='Patient')
                    window.location.replace('/connexion');
                else if(role==='Professionnel santé')
                    window.location.replace('/connexion-centre');
                // else
                //     window.location.replace('/');
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        console.log(data);
        return data;
    });
}

// export default fetchGet;