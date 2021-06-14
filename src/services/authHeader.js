import {userSession} from './userSession';
export default function authHeader(content){
  // const user = JSON.parse(localStorage.getItem('user'));
  const token = userSession.getCookie('token');
  if(content){
    if (token!=="" && token !== null && token !== undefined) {
      return { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token };
    }else {
      return {};
    }
  }else{
    if (token!=="" && token !== null && token !== undefined) {
      return { Authorization: 'Bearer ' + token };
    }else {
      return {};
    }
  }
}