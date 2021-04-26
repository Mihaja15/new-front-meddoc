function getAllMois(){
    return ["Janvier", "Fevrier", "Mars","Avril", "Mai", "Juin", "Juillet", "Août", "Septembre","Octobre", "Novembre", "Decembre"];
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
    return ["Dimanche","Lundi", "Mardi", "Mercredi","Jeudi", "Vendredi", "Samedi"];   
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

function getNbJoursMois(mois, annee) {
    var lgMois = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((annee%4 === 0 && annee%100 !== 0) || annee%400 === 0) lgMois[1] += 1;
    return lgMois[mois-1]; // 0 < mois <11
};
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
            topStart : 0,
            topStop : 0,
            bottomStart : 0,
            bottomStop : 0,
        })
    }
    return data; // 0 < mois <11
};
function formatDate(date){
    if(date===null||date===undefined||date==="null")
        return "";
    return autocompleteZero(date.getDate(),2)+'/'+autocompleteZero(date.getMonth()+1,2)+'/'+date.getFullYear();
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
    formatDate,
    formatDateText,
    formatDateTextWithTime,
    autocompleteZero,
    getWeekAbrev,
    getMonthAbrev
};