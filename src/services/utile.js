function getAllMois(){
    return ["janvier", "février", "mars","avril", "mai", "juin", "juillet", "août", "septembre","octobre", "novembre", "décembre"];
}
function getAllMoisBreviation(indice){
    const month= ["JANV", "FEVR", "MARS","AVR", "MAI", "JUIN", "JUIL", "AOUT", "SEPT","OCT", "NOV", "DEC"];
    return month[indice];
}
function getAllMoisBreviationV2(){
    return ["JANV", "FEVR", "MARS","AVR", "MAI", "JUIN", "JUIL", "AOUT", "SEPT","OCT", "NOV", "DEC"];
}
function getNamesMois(indice){
    const data= this.getAllMois();
    return data[indice];
}
function getAllSemaine(){
    return ["dimanche","lundi", "mardi", "mercredi","jeudi", "vendredi", "samedi"];   
}
function getWeekAbrev(jour){
    const week = ["dim.","lun.", "mar.", "mer.","jeu.", "ven.", "sam."];
    return week[jour];   
}
function getMonthAbrev(indice){
    const months = ["jan.", "fév.", "mars","avr.", "mai", "juin", "juil.", "août", "sept.","oct.", "nov.", "dec."];
    return months[indice];
}
function getAllLitleSemaine(){
    return ["dimanche","lundi", "mardi", "mercredi","jeudi", "vendredi", "samedi"];   
}
function getNamesSemaine(indice){
    const data = this.getAllSemaine();
    return data[indice];
}
function createTableauNumber(start,end){
    const data = [];
    for (let i = start; i <= end; i++) {
        data.push(i);
    }
    return data;
}
function createTableauNumberSelect(start,end){
    const data = [];
    for (let i = end; i >= start; i--) {
        data.push({value: i, label: i});
    }
    return data;
}
function parseStringToInt(valeur){
    try {
        if(''+valeur!==''){
            return parseInt(''+valeur);
        }
        return 0;
    } catch (error) {
        return 0;
    }
}
function parseStringToIntV2(valeur){
    try {
        if(''+valeur!==''){
            return parseInt(''+valeur);
        }
        return -1;
    } catch (error) {
        return -1;
    }
}
function completChiffre(chiffre){
    let tmp = parseStringToInt(''+chiffre);
    if(tmp<10){
        return '0'+tmp;
    }
    return ''+tmp;
}
function getDateComplet(dateString){
    if(dateString===null||dateString===undefined||dateString==="null")
        return "";
    const dates= new Date(dateString);
    return ""+this.getNamesSemaine(dates.getDay())+", "+dates.getDate()+" "+this.getNamesMois(dates.getMonth())+" "+dates.getFullYear();
}
function getDateNormal(dateString){
    if(dateString===null||dateString===undefined||dateString==="null")
        return "";
    const dates= new Date(dateString);
    return completChiffre(dates.getDate())+" "+this.getNamesMois(dates.getMonth())+" "+dates.getFullYear();
}
function getDateCompletAbrev(dateString){
    if(dateString===null||dateString===undefined||dateString==="null")
        return "";
    const dates= new Date(dateString);
    return ""+this.getNamesSemaine(dates.getDay())+", "+dates.getDate()+" "+this.getAllMoisBreviation(dates.getMonth())+" "+dates.getFullYear();
}
function getDateCompletWithHoureAndMinute(dateString){
    if(dateString===null||dateString===undefined||dateString==="null")
        return "";
    const dates= new Date(dateString);
    return ""+this.getNamesSemaine(dates.getDay())+", <br/> "+dates.getDate()+" "+this.getNamesMois(dates.getMonth())+" "+dates.getFullYear()+" à "+completChiffre(dates.getHours())+'h'+completChiffre(dates.getMinutes());
}
function getDateHourComplet(dateString){
    if(dateString===null||dateString===undefined||dateString==="null")
        return "";
    const dates= new Date(dateString);
    return ""+this.getNamesSemaine(dates.getDay())+", "+autocompleteZero(dates.getDate(),2)+" "+this.getNamesMois(dates.getMonth())+" "+dates.getFullYear()+" à "+completChiffre(dates.getHours())+'h'+completChiffre(dates.getMinutes());
}

function getNbJoursMois(mois, annee) {
    var lgMois = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((annee%4 === 0 && annee%100 !== 0) || annee%400 === 0) lgMois[1] += 1;
    return lgMois[mois-1]; // 0 < mois <11
}
function getEndMonth(month, year) {
    var months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year%4===0) months[1] += 1;
    return months[month]; // 0 < mois <11
}
function getConfirme(text){
    if(window.confirm(''+text)) {return true;}
    return false;
}
function createSemaineEmploieDuTemps() {
    const semaine = getAllSemaine();
    const data= [];
    for (let i = 0; i < semaine.length; i++) {
        data.push({
            names : semaine[i],
            activation : false,
            jour : i,
            topStart : null,
            topStop : null,
            bottomStart : null,
            bottomStop : null,
        })
    }
    return data; // 0 < mois <11
};
function formatDate(date){
    if(date===null||date===undefined||date==="null")
        return "";
    return autocompleteZero(date.getDate(),2)+'/'+autocompleteZero(date.getMonth()+1,2)+'/'+date.getFullYear();
}
function formatDateDash(date){
    if(date===null||date===undefined||date==="null")
        return "";
    return autocompleteZero(date.getDate(),2)+'-'+autocompleteZero(date.getMonth()+1,2)+'-'+date.getFullYear();
}
function formatDateText(date){
    if(date===null||date===undefined||date==="null")
        return "";
    return autocompleteZero(date.getDate(),2)+' '+this.getNamesMois(date.getMonth())+' '+date.getFullYear();
}
function formatDateTextWithTime(date){
    if(date===null||date===undefined||date==="null")
        return "";
    return autocompleteZero(date.getDate(),2)+' '+this.getNamesMois(date.getMonth())+' '+date.getFullYear()+' à '+date.getHours()+':'+date.getMinutes();
}
function autocompleteZero(number, totalLength){
    var result = ''+number;
    for(let i=0;i<(totalLength-result.length);i++){
        result = '0'+result;
    }
    return result;
}
function isEqualJourDate(dateA, dateB){
    const date1 = new Date(dateA);
    const date2 = new Date(dateB);
    return (date1.getDate()===date2.getDate()&&date1.getMonth()===date2.getMonth()&&date1.getFullYear()===date2.getFullYear())
}
function dateToHour(date){
    const dateRes = new Date(date);
    return autocompleteZero(dateRes.getHours(),2)+":"+autocompleteZero(dateRes.getMinutes(),2)+":00";
}
function calculateAge(dateNaissance){
    var today = new Date();
    var birthDate = new Date(dateNaissance);
    var ageNow = today.getFullYear() - birthDate.getFullYear();
    var month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) 
    {
        ageNow--;
    }
    return ageNow;
}
function checkEligibility(age, testResponse, dateTest){
    if(testResponse===null || testResponse===undefined)
        return false;
    else if(age===null || age===undefined)
        return false;
    else if(dateTest===null || dateTest===undefined)
        return false;
    const date = new Date(dateTest);
    const now = new Date();
    const j = 24 * 60 * 60 * 1000;
    const duree = 3 * 30 * j;
    const dureeTest = now.getTime()-date.getTime();
    if(testResponse)
        return (duree < dureeTest) && age >= 18;
    else
        return age >= 18;
}
function getInitial(complete){
    const initials = complete.trim().split(' ');
    var init = '';
    // for(let i = 0; i < initials.length; i++){
    for(let i = 0; i < 2; i++){
        init+=initials[i][0]+' ';
    }
    return init;
}
function getFullInitial(complete){
    const initials = complete.trim().split(' ');
    var init = '';
    for(let i = 0; i < initials.length; i++){
        // if(i!=0)
        //     init+=' ';
        init+=initials[i][0].toUpperCase();
    }
    return init;
}
function getPercent(value, total){
    if(total===null || total===0)
        return 0;
    var per = value * 100 / total;
    return per | 0;
}
function numStr(a, b) {
    a = '' + a;
    b = b || ' ';
    var c = '',
        d = 0;
    while (a.match(/^0[0-9]/)) {
      a = a.substr(1);
    }
    for (var i = a.length-1; i >= 0; i--) {
      c = (d !== 0 && d % 3 === 0) ? a[i] + b + c : a[i] + c;
      d++;
    }
    return c;
}
function hasValue(data){
    return data!==undefined&&data!==null&&data!=="";
}
function noValue(data){
    return data===undefined||data===null||data==="";
}
function getYearFromActual(add){
    const today = new Date();
    var year = today.getFullYear();
    if(add) return year+add;
    else return year;
}
function valueToLink(value){
    if(hasValue(value))
        return value.trim().replace(/\s+/g, '-').toLowerCase();
    else
        return "";
}
function crypteId(valeur){
    if(valeur!==undefined && valeur !==null && valeur!==''){
        let date = new Date();
        return ''+date.getFullYear()+'_'+date.getMonth()+'_'+date.getDate()+'_'+valeur;
    }
    return '';
}
function decrypteId(valeur){
    let val = valeur.split('_');
    if(val.length === 4){
        return ''+val[3];
    }
    return '';
}
function verifString(valeur){
    if(valeur !== null && valeur !==undefined && valeur!=='' && valeur!==' '){
        return true;
    }
    return false;
}
function generateUUID() {
    return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
}
function isValidURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}
export const utile = {
    getAllMois,
    getNamesMois,
    getAllSemaine,
    getNamesSemaine,
    getDateComplet,
    getNbJoursMois,
    getAllMoisBreviation,
    createTableauNumber,
    getAllLitleSemaine,
    parseStringToInt,
    createSemaineEmploieDuTemps,
    getConfirme,
    createTableauNumberSelect,
    parseStringToIntV2,
    getAllMoisBreviationV2,
    getDateCompletAbrev,
    getDateCompletWithHoureAndMinute,
    getDateHourComplet,
    formatDate,
    formatDateDash,
    formatDateText,
    formatDateTextWithTime,
    autocompleteZero,
    getWeekAbrev,
    getMonthAbrev,
    getEndMonth,
    isEqualJourDate,
    completChiffre,
    getDateNormal,
    dateToHour,
    calculateAge,
    checkEligibility,
    getInitial,
    getFullInitial,
    getPercent,
    numStr,
    hasValue,
    noValue,
    getYearFromActual,
    valueToLink,
    crypteId,
    decrypteId,
    verifString,
    isValidURL,
    generateUUID
};