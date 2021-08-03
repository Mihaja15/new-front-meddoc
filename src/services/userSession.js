function userLogged(){
    var pseudo = null;
    var photo = null;
    var token = null;
    var role = null;
    if(getCookie('pseudo')!=="")
        pseudo = getCookie('pseudo');
    if(getCookie('role')!=="")
        role = getCookie('role');
    if(getCookie('photo')!=="")
        photo = getCookie('photo');
    if(getCookie('token')!=="")
        token = getCookie('token');
    const user = {
        pseudo:pseudo,
        photo:photo,
        token:token,
        role:role
    }
    return user;
}
function isLogged(){
    return getCookie('token')!=="";
}
function get(value){
    if(getCookie(value)!=="")
        return getCookie(value);
    else
        return null;
}
function userLogin(pseudo, photo, token, role){
    if(pseudo!==null&&pseudo!==undefined&&pseudo!=="")
        setCookie('pseudo',pseudo);
    if(photo!==null&&photo!==undefined&&photo!=="")
        setCookie('photo',photo);
    if(token!==null&&token!==undefined&&token!=="")
        setCookie('token',token);
    if(role!==null&&role!==undefined&&role!=="")
        setCookie('role',role);
}
function userLogout(){
    removeCookie('pseudo');
    removeCookie('photo');
    removeCookie('token');
    removeCookie('role');
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";path=/";
}

function removeCookie(cname) {
    document.cookie = cname + "=;path=/";
}

export const userSession={
    userLogged,
    userLogin,
    get,
    getCookie,
    setCookie,
    userLogout,
    removeCookie,
    isLogged
}