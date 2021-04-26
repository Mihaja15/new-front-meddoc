const typeUserMedecin = 'Médecin';
const typeUserPatient = 'Patient';

function logout(){
    localStorage.clear();
}
function putDatatInLocaleStorage(token,typeUser,dateSession,profilPicture){
    localStorage.setItem('token',token);
    localStorage.setItem('typeUser',typeUser);
    localStorage.setItem('sessionToken',dateSession);
    localStorage.setItem('profilPicture',profilPicture);
}
function createDateToken(dates){
    try {
        return (new Date(''+dates).toISOString());
    } catch (error) {
        return null;
    }
}
function loginUser(token,typeUser,dates,profilPicture){
    const datesToken = createDateToken(dates);
    if(token !== null  && token !== undefined && token !== '' && typeUser !== null  && typeUser !== undefined && typeUser !== '' && datesToken !== null ){
        putDatatInLocaleStorage(token,typeUser,datesToken,profilPicture);
        return true;
    }
    return false;
}
function getProfilPicture(){
    const profilPicture = localStorage.getItem('profilPicture');
    if(profilPicture !== null  && profilPicture !== undefined && profilPicture !== ''){ 
        return profilPicture;
    }else{
        return 'profile.png';
    }
}
function getNameByTypeUser(){
    const typeUser = localStorage.getItem('typeUser');
    if(typeUser === typeUserPatient){
        return 'patient';
    }else if(typeUser === typeUserMedecin){
        return 'medecin';
    }else{
        return '';
    }
}
function getNameTypeUser(typeUser){
    if(typeUser === typeUserPatient){
        return 'patient';
    }else if(typeUser === typeUserMedecin){
        return 'medecin';
    }else{
        return '';
    }
}
function createDate(){
    try {
        const dates= new Date(''+localStorage.getItem('sessionToken'));
        const newDate= new Date(dates.getFullYear(),dates.getMonth(),dates.getDate());const dateActuel = new Date();//dateActuel.setMonth(dates.getMonth()-1);
        if(newDate < dateActuel){
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}
function verificationDatesSessionToken(){
    if(createDate()){
        logout();
        return false;
    }
    return true;
}
function getToken(){
    const token =localStorage.getItem('token');
    if(token !== null  && token !== undefined && token !== '') { return token };
    return '';
}
function getTypeUser(){
    const typeUser =localStorage.getItem('typeUser');
    if(typeUser !== null  && typeUser !== undefined && typeUser !== '') { return typeUser };
    return '';
}
function verificationIfUserIsLogged(){
    const tmp = verificationDatesSessionToken();
    if(tmp){
        const token = getToken(); const typeUser= getTypeUser();const nameTypeUser = getNameTypeUser(typeUser); 
        if(token !== '' && typeUser !== '' && nameTypeUser !== ''){
            return { url : nameTypeUser , logged : true};
        }
    }
    return { url : '' , logged : false};
}
function rectificationUrl(){
    const tmp = verificationDatesSessionToken();
    if(tmp){
        const token = getToken(); const typeUser= getTypeUser();const nameTypeUser = getNameTypeUser(typeUser);
        if(token !== '' && typeUser !== '' && nameTypeUser !== ''){
            return nameTypeUser;
        }
    }
    return '';
}

function premierUrl(typeUser){
    const namesUrl = getNameTypeUser(typeUser);
    if(namesUrl === 'medecin'){
        return '/medecin/profil-medecin';
    }else if(namesUrl === 'patient'){
        return '/profil';
    }else{
        return '/';
    }
}
function premierUrlVersionTwo(namesUrl){
    if(namesUrl === 'medecin'){
        return '/medecin/profil-medecin';
    }else if(namesUrl === 'patient'){
        return '/profil';
    }else{
        return '/';
    }
}
function deconnexion(){
    logout();
    return '/';
}
export const authUser = {
    loginUser,
    verificationIfUserIsLogged,
    rectificationUrl,
    premierUrl,
    premierUrlVersionTwo,
    getToken,
    getNameByTypeUser,
    logout,
    deconnexion,
    getProfilPicture
};