var verificationData = false;
function getVerificationData(){
    return verificationData;
}
function setVerificationData(valeur){
    verificationData = valeur;
}
function getDataEtatStorage(){
    return localStorage.getItem('etat');
}
function getDataTokenStorage(){
    return localStorage.getItem('token');
}
function verificationToken(){
    const data = getDataTokenStorage();const dataTwo=getDataEtatStorage();
    if(data !== null && data !== '' && dataTwo === 'meddoc002med'){
        return 1;
    }else{
        return 0;
    }
}
export const dataStorage = {
    getVerificationData,
    setVerificationData,
    getDataEtatStorage,
    verificationToken,
    verificationData
};
export default dataStorage;