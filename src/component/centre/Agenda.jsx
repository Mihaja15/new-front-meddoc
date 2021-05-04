import React, {Component} from 'react';
import './Agenda.css';
import 'bootstrap/dist/css/bootstrap.css';
import {fetchPost} from '../../services/global.service';
import { authUser } from '../../services/authUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faChevronCircleLeft, faChevronCircleRight, faEdit, faEye, faMapMarkedAlt, faMoneyBillAlt, faPhoneAlt, faTrash, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { utile } from '../../services/utile';


const dateAjourdHuiGlobal =new Date();
const dataAgendaGlobale ={
    token : localStorage.getItem('idCentre'),
    jour : dateAjourdHuiGlobal.getDate(),
    mois : dateAjourdHuiGlobal.getMonth(),
    annee : dateAjourdHuiGlobal.getFullYear(),
    numeroSemaine: 0,
    selectionner : 'mois',
    jourDuJour : dateAjourdHuiGlobal.getDate(),
    moisDuJour : dateAjourdHuiGlobal.getMonth(),
    anneeDuJour : dateAjourdHuiGlobal.getFullYear()
};
var initialisation = false;
class Agenda extends Component{
    constructor(props){
        super();
        this.state = {
            etatAgenda : 'mois',
            annee : '',
            mois : '',
            jour : '',
            filtreAgenda : '',
            listeAgenda : {},
            listeAgendaTmp : {},
            showJour : false,
            dataRdv : null,
            showDetailRdv : 0,
            dateRdv : null,
            motifRdv : '',
            dateRdvText : '',
            heureRdvText : '',

        }
        this.setValueHandle = this.setValueHandle.bind(this);
    }
    setValeur(valeur){
        if(valeur !== null &&  valeur!==undefined){
            return valeur;
        }else{
            return '';
        }
    }
    setValueHandleNew=(name,event)=>{
        const valeur = this.setValeur(event.target.value);
        if(name==='motifRdv'){
            this.setState({motifRdv : valeur});
        }else if(name==='dateRdvText'){
            this.setState({dateRdvText : valeur});
        }else if(name==='heureRdvText'){
            this.setState({heureRdvText : valeur});
        }
    }
    getAgenda(data){
        fetchPost('/covid/agenda-centre',data).then(dataTmp=>{
            this.setState({listeAgenda : dataTmp});
            console.log(dataTmp);
        });
    }
    getAllMois(){
        return ["Janvier", "Fevrier", "Mars","Avril", "Mai", "Juin", "Juillet", "Août", "Septembre","Octobre", "Novembre", "Decembre"];
    }
    getNamesMois(indice){
        const data= this.getAllMois();
        return data[indice];
    }
    getAllSemaine(){
        return ["Dimanche","Lundi", "Mardi", "Mercredi","Jeudi", "Vendredi", "Samedi"];   
    }
    getNamesSemaine(indice){
        const data = this.getAllSemaine();
        return data[indice];
    }
    getDateComplet(date){
        const dates= new Date(date);
        return ""+this.getNamesSemaine(dates.getDay())+", "+dates.getDate()+" "+this.getNamesMois(dates.getMonth())+" "+dates.getFullYear();
    }
    getNbJoursMois(mois, annee) {
        var lgMois = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if ((annee%4 === 0 && annee%100 !== 0) || annee%400 === 0) lgMois[1] += 1;
        return lgMois[mois-1]; // 0 < mois <11
    };
    createDataHtmlAnnee(){
        const data =[]; let size = (new Date()).getFullYear()+20;
        for (let i = 2019; i < size; i++) {
            data.push(i);
        }
        return (
            <select className="form-control" onChange={(e)=>this.setValueHandle('annee',e)}>
                <option value="">Année</option>
                {data.map((dataTmp,i)=>{return (<option value={dataTmp} key={i}>{dataTmp}</option>)})}
            </select>
        )
    }
    createDataHtmlMois(){
        const data =this.getAllMois();
        return (
            <select className="form-control" onChange={(e)=>this.setValueHandle('mois',e)}>
                <option value="">Mois</option>
                {data.map((dataTmp,i)=>{return (<option value={i} key={i}>{dataTmp}</option>)})}
            </select>
        )
    }
    createDataHtmlJour(){
        const data =[]; let size = 31;
       for (let i = 1; i <= size; i++) {
           data.push(i);
       }
        return (
            <select className="form-control" onChange={(e)=>this.setValueHandle('jour',e)}>
                <option value="">Jours</option>
                {data.map((dataTmp,i)=>{return (<option value={dataTmp} key={i}>{dataTmp}</option>)})}
            </select>
        )
    }
    clickTdTableVoirJour=(data)=>{
         this.setState({listeAgendaTmp : data,showJour : true})
    }
    createDataHtmlDivDateAgenda(valeurCss,date,nameMounth,text,dataListeRendezVous){
        return (
            <a href="#voirAujourdHui" style={{textDecoration : "none"}} onClick={()=>this.clickTdTableVoirJour(dataListeRendezVous)}>
                <div className={"agendaV"+valeurCss}>
                    <div className={"agendaTitleOneV"+valeurCss}>
                        <h5 className={"agendaDateV"+valeurCss}><strong>{date}</strong></h5>
                        <h5 className={"agendaMonthV"+valeurCss}><strong>{nameMounth}</strong></h5>
                    </div>
                    <div className={"agendaTitleTwoV"+valeurCss}>
                        {text}
                    </div>
                </div>
            </a>
        )
    }
    setValueHandle=(names,event)=>{
        const valeur = event.target.value;
        if(valeur !== null && valeur !== undefined && valeur !== ''){
            if(names === 'annee'){
                this.setState({annee : valeur});
            }else if(names === 'mois'){
                this.setState({mois : valeur});
            }else if(names === 'jour'){
                this.setState({jour : valeur});
            }else if(names === 'filtre'){
                this.setState({filtreAgenda : valeur});
            }
        }
    }
    controlData(data){
        try {
            if(this.state.jour !== null && this.state.jour !== null && this.state.jour !== '' ){ data.jour = parseInt(''+this.state.jour)}
            if(this.state.mois !== null && this.state.mois !== null && this.state.mois !== '' ){ data.mois = parseInt(''+this.state.mois)}
            if(this.state.annee !== null && this.state.annee !== null && this.state.annee !== '' ){ data.annee = parseInt(''+this.state.annee)}
            return data;
        } catch (error) {
            return data;   
        }
        
    }
    findDataAgenda=()=>{
        const data = dataAgendaGlobale;
        if(this.state.filtreAgenda === 'jour'){
            this.setState({showJour : false});
        }
        if(this.state.filtreAgenda!== '' && this.state.filtreAgenda!==null && this.state.filtreAgenda!==undefined){
            data.selectionner= this.state.filtreAgenda;
        }
        const newdata =this.controlData(data);
        this.getAgenda(newdata);
        this.setState({etatAgenda : this.state.filtreAgenda}); 
    }
    voirAgeendaSemaine(dataTmp){
        if(dataTmp.length > 0){
            const resultat = dataTmp[0];const date =new Date(resultat.dateRdvDates);
            const data = dataAgendaGlobale;data.selectionner= 'semaine';
            data.jour = date.getDate();data.mois = date.getMonth();
            data.annee = date.getFullYear();data.numeroSemaine = date.getDay();
            this.getAgenda(data);this.setState({etatAgenda : 'semaine'});
        }
    }
    getPDateDuJourAgenda(data){
        let size = data.infoRdvs.length;
        if(size > 0){
            return <p className="agendaTextV4">rendez-vous <br/> <span className="badge badge-pink" style={{fontSize: "20px"}}>{size}</span></p>
        }else{
            return <p className="agendaTextV4">Aucun</p>
        }
    }
    getDataHtmlAgendaParMoisTmp(data,dataListeRendezVous){
        const date=new Date(data.dateRdvDates);const aujourdHui=new Date();
        const jour = date.getDate();const jour2 = aujourdHui.getDate();const mois = date.getMonth();const mois2 = aujourdHui.getMonth();
        const annee = date.getFullYear();const annee2 = aujourdHui.getFullYear();
        if(data.activeted){
            if(jour === jour2 && mois === mois2 && annee === annee2){
                return this.createDataHtmlDivDateAgenda(4,date.getDate(),utile.getAllMoisBreviation(date.getMonth()),this.getPDateDuJourAgenda(data),dataListeRendezVous);
            }else{
                let size = data.infoRdvs.length;
                if(size>0){
                    return this.createDataHtmlDivDateAgenda(3,date.getDate(),utile.getAllMoisBreviation(date.getMonth()),<p className="agendaTextV3"><span className="badge badge-primary" style={{fontSize: "20px"}}>{size}</span></p>,dataListeRendezVous)
                }else{
                    return this.createDataHtmlDivDateAgenda(1,date.getDate(),utile.getAllMoisBreviation(date.getMonth()),<p className="agendaTextV1">Aucun</p>,dataListeRendezVous)
                }
            }
        }else{
            return this.createDataHtmlDivDateAgenda(2,date.getDate(),utile.getAllMoisBreviation(date.getMonth()),<p className="agendaTextV2">Invalide</p>,dataListeRendezVous)
        }
    }
    createDateEventNextPreview(next,jour, mois , annee,selectionner){
        if(next){
            if(selectionner ==='mois'){ return new Date(annee,mois+1,jour)}
            else if(selectionner ==='semaine'){ return new Date(annee,mois,jour+7)}
            else{ return new Date(annee,mois,jour+1)}
        }else{
            if(selectionner ==='mois'){ return new Date(annee,mois-1,jour)}
            else if(selectionner ==='semaine'){ return new Date(annee,mois,jour-7)}
            else{ return new Date(annee,mois,jour-1)}
        }
    }
    suivantOuPrecedentDateMois=(next,jour, mois , annee, selectionner)=>{
        const data = dataAgendaGlobale;const date = this.createDateEventNextPreview(next,jour, mois , annee, selectionner);
        data.selectionner= selectionner;
        data.jour = date.getDate();data.mois = date.getMonth();
        data.annee = date.getFullYear();data.numeroSemaine= date.getDay();
        this.getAgenda(data);
        this.setState({etatAgenda : selectionner, showJour : false}); 
    }
    getDataHtmlAgendaParMois(){
        const dataFinale = this.state.listeAgenda;
        const jour = dataFinale.jour;const mois = dataFinale.mois;const annee = dataFinale.annee;
        const data=dataFinale.listRendezVous;
        if(data !== undefined && data !== null){
           
            return (
                <div className="row listcalendrierAgenda">
                    <div className="col-md-12">
                        <div className="row">
                            <span className="col-4 faChevronCircleLeftAgenda" onClick={()=>this.suivantOuPrecedentDateMois(false,jour,mois,annee,'mois')}><FontAwesomeIcon icon={faChevronCircleLeft}/></span>
                            <span className="col-4 faChevronCircleCenterAgenda">{this.getNamesMois(mois)} {annee}</span>
                            <span className="col-4 faChevronCircleRightAgenda" onClick={()=>this.suivantOuPrecedentDateMois(true,jour,mois,annee,'mois')}><FontAwesomeIcon icon={faChevronCircleRight}/></span>
                        </div>
                        <div className="divTableAgenda">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="tableThAgenda temporaireDisparition">Semaine</th>
                                        <th className="tableThAgenda">Dimanche</th>
                                        <th className="tableThAgenda">Lundi</th>
                                        <th className="tableThAgenda">Mardi</th>
                                        <th className="tableThAgenda">Mercredi</th>
                                        <th className="tableThAgenda">Jeudi</th>
                                        <th className="tableThAgenda">Vendredi</th>
                                        <th className="tableThAgenda">Samedi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((dataTmp,i)=>{
                                            return (
                                                <tr key={i}>
                                                    <td className="temporaireDisparition">
                                                        <button className="bouttonVoirSemaineAgenda" onClick={()=>this.voirAgeendaSemaine(dataTmp)}>Voir</button>
                                                    </td>
                                                    {
                                                        dataTmp.map((dataTmp2,a)=>{
                                                            return ( 
                                                                <td key={a}>{this.getDataHtmlAgendaParMoisTmp(dataTmp2,dataTmp2)}</td>
                                                            )
                                                        })
                                                    }
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }else{
            return <div></div>
        }
        
    }
    getDataHtmlAgendaParSemaineTmp(data,dataListeRendezVous){
        const date=new Date(data.dateRdvDates);const aujourdHui=new Date();
        const jour = date.getDate();const jour2 = aujourdHui.getDate();const mois = date.getMonth();const mois2 = aujourdHui.getMonth();
        const annee = date.getFullYear();const annee2 = aujourdHui.getFullYear();
        if(jour === jour2 && mois === mois2 && annee === annee2){
            return this.createDataHtmlDivDateAgenda(4,date.getDate(),utile.getAllMoisBreviation(date.getMonth()),this.getPDateDuJourAgenda(data),dataListeRendezVous);
        }else{
            let size = data.infoRdvs.length;
            if(size>0){
                return this.createDataHtmlDivDateAgenda(3,date.getDate(),utile.getAllMoisBreviation(date.getMonth()),<p className="agendaTextV3"><span className="badge badge-primary" style={{fontSize: "20px"}}>{size}</span></p>,dataListeRendezVous)
            }else{
                return this.createDataHtmlDivDateAgenda(1,date.getDate(),utile.getAllMoisBreviation(date.getMonth()),<p className="agendaTextV1">Aucun</p>,dataListeRendezVous)
            }
        }
    }
    getDataHtmlAgendaParSemaine(){
        const dataFinale = this.state.listeAgenda;
        const jour = dataFinale.jour;const mois = dataFinale.mois;const annee = dataFinale.annee;
        const data=dataFinale.listRendezVous;
        if(data !== undefined && data !== null){
           
            return (
                <div className="row listcalendrierAgenda">
                    <div className="col-md-12">
                        <div className="row">
                            <span className="col-4 faChevronCircleLeftAgenda" onClick={()=>this.suivantOuPrecedentDateMois(false,jour,mois,annee,'semaine')}><FontAwesomeIcon icon={faChevronCircleLeft}/></span>
                            <span className="col-4 faChevronCircleCenterAgenda">{this.getNamesMois(mois)} {annee} / semaine</span>
                            <span className="col-4 faChevronCircleRightAgenda" onClick={()=>this.suivantOuPrecedentDateMois(true,jour,mois,annee,'semaine')}><FontAwesomeIcon icon={faChevronCircleRight}/></span>
                        </div>
                        <div className="divTableAgenda">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="tableThAgenda">Dimanche</th>
                                        <th className="tableThAgenda">Lundi</th>
                                        <th className="tableThAgenda">Mardi</th>
                                        <th className="tableThAgenda">Mercredi</th>
                                        <th className="tableThAgenda">Jeudi</th>
                                        <th className="tableThAgenda">Vendredi</th>
                                        <th className="tableThAgenda">Samedi</th>
                                    </tr> 
                                </thead>
                                <tbody>
                                    {
                                        data.map((dataTmp,i)=>{
                                            return (
                                                <tr key={i}>
                                                    {
                                                        dataTmp.map((dataTmp2,a)=>{
                                                            return (
                                                                <td key={a}>{this.getDataHtmlAgendaParSemaineTmp(dataTmp2,dataTmp2)}</td>
                                                            )
                                                        })
                                                    }
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }else{
            return <div></div>
        }
        
    }
    getDataHtmlAgendaParJours(){
        const dataFinale = this.state.listeAgenda;
        const jour = dataFinale.jour;const mois = dataFinale.mois;const annee = dataFinale.annee;
        const data=dataFinale.listRendezVous;
        if(data !== undefined && data !== null){
            return (
                <div className="row listcalendrierAgendaV2">
                    <div className="col-md-12 listeAgendaJour">
                        <div className="row">
                            <span className="col-4 faChevronCircleLeftAgenda" onClick={()=>this.suivantOuPrecedentDateMois(false,jour,mois,annee,'jour')}><FontAwesomeIcon icon={faChevronCircleLeft}/></span>
                            <span className="col-4 faChevronCircleCenterAgendaV2">{this.getDateComplet((new Date(annee,mois,jour).toISOString()))}</span>
                            <span className="col-4 faChevronCircleRightAgenda" onClick={()=>this.suivantOuPrecedentDateMois(true,jour,mois,annee,'jour')}><FontAwesomeIcon icon={faChevronCircleRight}/></span>
                        </div>
                        
                            {
                                data.map((dataTmp1,a)=>{
                                    return(
                                        <div key={a}>
                                            {
                                                 dataTmp1.map((dataTmp2,i)=>{
                                                    if(dataTmp2.infoRdvs.length>0){
                                                        return (                 
                                                            <div className="row agendaJoursDiv" key={i}>
                                                                {
                                                                    (dataTmp2.infoRdvs).map((dataTmp3,o)=>{
                                                                        return (
                                                                            <div className="col-12 agendaResultaJoursDiv" key={o}>
                                                                                <h3 className="agendaJourTitleTime">{dataTmp3.heureRdv}</h3>
                                                                                <div className="AlldetailAgendaJour">
                                                                                    <div className="detailAgendaJour"><FontAwesomeIcon icon={faUserAlt}/> &ensp; {dataTmp3.nom} {dataTmp3.prenom}</div>
                                                                                    <div className="detailAgendaJour"><FontAwesomeIcon icon={faPhoneAlt}/> &ensp; {dataTmp3.identification} </div>
                                                                                    <div className="detailAgendaJour"><FontAwesomeIcon icon={faMapMarkedAlt}/> &ensp; Aux cabinet </div>
                                                                                    <div className="detailAgendaJour"><FontAwesomeIcon icon={faAddressCard}/> &ensp; Dentiste </div>
                                                                                    <div className="detailAgendaJour"><FontAwesomeIcon icon={faMoneyBillAlt}/> &ensp; 15000 <sup>Ar</sup> </div>
                                                                                    <div className="detailAgendaJour"><FontAwesomeIcon icon={faAddressCard}/> &ensp; IVD  63 Ter AA Ambohibahiny Ankaraobato </div>
                                                                                </div>
                                                                                <div className="row">
                                                                                    <div className="col-md-6"><button className="btn-warning form-control">Modifier</button></div>
                                                                                    <div className="col-md-6"><button className="btn-danger form-control">Annuler</button></div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        )
                                                    }else{
                                                        return(
                                                            <h2 key={i} style={{textAlign: "center",marginTop: "10%",color:"#009879"}}>Aucun rendez-vous aujourd' hui</h2>
                                                        )
                                                    }
                                                    
                                                })
                                            }
                                        </div>
                                    )
                                })


                               
                            }
                    </div>
                </div>
            )
        }else{
            return <div></div>
        }
        
    }
    getDataHtmlAgendaParJoursTemporaire(showJour){
        if(showJour){
            const dataFinale = this.state.listeAgendaTmp;
            const date = new Date(dataFinale.dateRdvDates)
            const jour = date.getDate();const mois = date.getMonth();const annee = date.getFullYear();
            const data=dataFinale.infoRdvs;
            if(data !== undefined && data !== null){
                if(data.length>0){
                    console.log('datdatadtatadtdat :',data)
                    console.log('datdatadtatadtdatV2 :',dataFinale)
                    return (
                        <div className="row listcalendrierAgendaV2" id="voirAujourdHui">
                            <div className="col-md-12 listeAgendaJour">
                                <div className="row">
                                    <span className="col-12 faChevronCircleCenterAgendaV2">{this.getDateComplet((new Date(annee,mois,jour).toISOString()))}</span>
                                </div>  
                                <div>
                                    <div className="table-responsive">
                                        <table className="table table-hover tableStyleTmpAgenda">
                                            <thead>
                                                <tr>
                                                    <th>Heure</th>
                                                    <th>Nom</th>
                                                    <th>Lieu</th>
                                                    <th>Prix</th>
                                                    <th>Détail</th>
                                                    <th>Modifier</th>
                                                    <th>Supprimer</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                data.map((dataTmp3,o)=>{
                                                    return <tr key={o} className="tableResponsiveAgenda">
                                                        <td>{dataTmp3.heureRdv}</td>
                                                        <td>{dataTmp3.nom} {dataTmp3.prenom}</td>
                                                        <td>{dataTmp3.libelleTypeConsultation}</td>
                                                        <td>{dataTmp3.frais} Ar</td>
                                                        <td><button className="btn btn-info form-control"  onClick={()=>{this.setState({dataRdv : {infos : dataTmp3,idRdv : dataFinale.idRdv,dateRdv : (new Date(annee,mois,jour).toISOString())}, showDetailRdv : 1})}}><FontAwesomeIcon icon={faEye}/></button></td>
                                                        <td><button className="btn btn-warning form-control" onClick={()=>{this.setState({dataRdv : {infos : dataTmp3,idRdv : dataFinale.idRdv,dateRdv : (new Date(annee,mois,jour).toISOString())}, showDetailRdv : 2})}}><FontAwesomeIcon icon={faEdit}/></button></td>
                                                        <td><button className="btn btn-danger form-control" onClick={()=>{this.setState({dataRdv : {infos : dataTmp3,idRdv : dataFinale.idRdv,dateRdv : (new Date(annee,mois,jour).toISOString())}, showDetailRdv : 3})}}><FontAwesomeIcon icon={faTrash}/></button></td>
                                                    </tr>
                                                })
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }else{
                    return(
                        <div className="row listcalendrierAgendaV2" id="voirAujourdHui">
                        <div className="col-md-12 listeAgendaJour">
                            <div className="row">
                                <span className="col-4 faChevronCircleLeftAgenda" onClick={()=>this.suivantOuPrecedentDateMois(false,jour,mois,annee,'jour')}><FontAwesomeIcon icon={faChevronCircleLeft}/></span>
                                <span className="col-4 faChevronCircleCenterAgendaV2">{this.getDateComplet((new Date(annee,mois,jour).toISOString()))}</span>
                                <span className="col-4 faChevronCircleRightAgenda" onClick={()=>this.suivantOuPrecedentDateMois(true,jour,mois,annee,'jour')}><FontAwesomeIcon icon={faChevronCircleRight}/></span>
                            </div>
                            <h2 style={{textAlign: "center",marginTop: "10%",color:"#009879"}}>Aucun rendez-vous aujourd' hui</h2>
                        </div>
                    </div>
                        
                    )
                }
            }
        }
        return <div></div>
        
    }
    affichagePrincipale(etatAgenda){
        if(etatAgenda === 'jour'){
            return this.getDataHtmlAgendaParJours();
        }else if(etatAgenda === 'semaine'){
            return this.getDataHtmlAgendaParSemaine();
        }else{
            return this.getDataHtmlAgendaParMois();
        }
    }
    affichageFinale(etatAgenda){
        if(initialisation === false){
            this.getAgenda(dataAgendaGlobale);initialisation=true;
        }
        return this.affichagePrincipale(etatAgenda);
    }
    changeFormatHeure(lettreAvant,valeur){
        try {
            const dataTmp = valeur.split(':');let size = dataTmp.length;
            if(size>=3){
                return lettreAvant+' '+dataTmp[0]+'h'+dataTmp[1];
            }
        } catch (error) {}
        return "";
    }
    getUrlPhoto(photo){
        try {
            if(photo!==null && photo!==undefined && photo!==''){
                return <img src={"/uploads/"+photo} className="responsive imagedetailRdvTmpAgenda" alt="User avatar"/>
            }
        } catch (error) { }
        return <img src={"/uploads/profile.jpg"} className="responsive imagedetailRdvTmpAgenda" alt="User avatar"/>
    }
    voirDetailRdv(dataRdv, showDetailRdv){
        if(dataRdv !== undefined && dataRdv !== null && showDetailRdv ===1){
            console.log('showDetailRdv  : ',dataRdv);let sexe = 'masculin';
            if(dataRdv.sexe === 2){sexe = 'feminin'}
            return (
                <div className="parentdetailRdvTmpAgenda">
                    <ul className="detailRdvTmpAgenda">
                        <li className="child1detailRdvTmpAgenda">{this.getUrlPhoto(dataRdv.infos.profilPicture)}</li>
                        <li className="child2detailRdvTmpAgenda">
                            <div>
                                <h3>{dataRdv.infos.nom} {dataRdv.infos.prenom}</h3>  
                                <p>Née le  {utile.getDateComplet(''+dataRdv.infos.dateNaissance) }, de sexe {sexe}</p>
                                <p>Contact : {dataRdv.infos.identification}</p>
                                <p>Rdv le {utile.getDateComplet(''+dataRdv.dateRdv) } {this.changeFormatHeure('à',dataRdv.infos.heureRdv)} par un médecin {dataRdv.infos.specialiter}</p>
                                <p>Frais consultation : {dataRdv.infos.frais}<sup>Ar</sup></p>
                                {(''+dataRdv.infos.motif!==' ' || ''+dataRdv.infos.motif!=='')?(<p>Motif : {dataRdv.infos.motif}</p>):(<p></p>)}
                            </div>
                        </li>
                    </ul>
                </div>
            )
        }
        return <div></div>
    }
    
    AnnulationRdv=()=>{
        if(this.state.motifRdv!==null && this.state.motifRdv !== undefined && this.state.dataRdv!==null && this.state.dataRdv!==undefined){
            const dates = new Date(this.state.dataRdv.dateRdv);
            const newData={
                idRdv : this.state.dataRdv.idRdv,
                motif : this.state.motifRdv,
                typeChangement : 1,
                date : dates.getFullYear()+"-"+dates.getMonth()+"-"+dates.getDate(),
                heure : this.state.dataRdv.infos.heureRdv
            }
            fetchPost('/rendez-vous/annulationRdv',newData).then(dataTmp=>{
                console.log('dataTmp :', dataTmp);
                
                alert(dataTmp);
            });
        }else{
            alert("Il y a une erreur d'information");
        }
    }
    getDataHtmlAnnulationRdv(dataRdv,showDetailRdv){
        if(dataRdv !== undefined && dataRdv !== null && showDetailRdv ===3){
            return (
                <div className="parentAnnulationRdvTmpAgenda">
                    <p>Voulez-vous vraiment annuler <br/>
                    le rendez-vous du {utile.getDateComplet(''+dataRdv.dateRdv) } {this.changeFormatHeure('à',dataRdv.infos.heureRdv)} <br/>
                    par le patient "{dataRdv.infos.nom} {dataRdv.infos.prenom}"</p>
                    <textarea rows="2" placeholder="Veuillez saisir votre motif" onChange={(e)=>this.setValueHandleNew('motifRdv',e)} className="form-control"></textarea>
                    <div className="row parentAnnulationRdvTmpAgendaRow">
                        <div className="col-md-6 col-sm-12"><button className="btn btn-primary form-control" onClick={()=>this.AnnulationRdv()}>Confirmer</button></div>
                        <div className="col-md-6 col-sm-12"><button className="btn btn-danger form-control" onClick={()=>{this.setState({dataRdv : null, showDetailRdv : 0,dateRdv : null})}}>Fermer</button></div>
                    </div>
                </div>
            )
        }
        return <div></div>
    }
    testValeurDate(valeur){
        const testInt = utile.parseStringToInt(''+valeur);
        if(testInt < 10){
            return  '0'+valeur;
        }
        return valeur;
    }
    createDate(dates){
        const newDate = new Date(dates);let moisTmp = (newDate.getMonth()+1);
        if(moisTmp >12){moisTmp = moisTmp-12}
        let annee = newDate.getFullYear(); let mois = this.testValeurDate(moisTmp); let jour = this.testValeurDate(newDate.getDate());
        return ''+annee+'-'+mois+'-'+jour;
    }
    verificationValeur(valeur){
        console.log('verification : ',valeur);
        if(valeur !== null && valeur !== undefined && valeur !== ''){
            return true;
        }
        return false;
    }
    verificationDateRdv(dateRdv,dateDmdRdv){
        if(dateRdv.getFullYear()>dateDmdRdv.getFullYear()){
            return true;
        }else if(dateRdv.getFullYear()===dateDmdRdv.getFullYear()){
            if(dateRdv.getMonth()>dateDmdRdv.getMonth()){
                return true;
            }else if(dateRdv.getMonth()===dateDmdRdv.getMonth()){
                if(dateRdv.getDate()>=dateDmdRdv.getDate()){
                    return true;
                }
            }
        }
        return false;
    }
    ModifierRdv=()=>{
        if(this.verificationValeur(this.state.motifRdv) && this.state.dataRdv !== undefined && this.state.dataRdv !== null){
            try {
                let dateRdv = new Date(this.state.dataRdv.dateRdv);
                if(this.verificationValeur(this.state.dateRdvText)){
                    dateRdv = new Date(this.state.dateRdvText);
                }
                let heure = this.state.dataRdv.infos.heureRdv;
                if(this.verificationValeur(this.state.heureRdvText)){
                    heure = this.state.heureRdvText;
                }
                const dateDmdRdv= new Date(this.state.dataRdv.dateRdv);const dateDuJour=new Date();
                if(this.verificationDateRdv(dateRdv,dateDmdRdv) && this.verificationDateRdv(dateRdv,dateDuJour)){
                    const newData={
                        idRdv : this.state.dataRdv.idRdv,
                        heureRdv : heure,
                        dateRdv : dateRdv.toISOString(),
                        motif : this.state.motifRdv,
                        typeChangement : 1
                    }
                    fetchPost('/rendez-vous/reporterRdv',newData).then(dataTmp=>{
                        console.log('dataTmp :', dataTmp);
                        alert('dataTmp : '+dataTmp.message);
                    });
                }else{
                    alert(dateRdv.getDate()+' >= '+dateDmdRdv.getDate()+' && '+dateRdv.getMonth()+' >= '+dateDmdRdv.getMonth()+' && '+dateRdv.getFullYear()+' >= '+dateDmdRdv.getFullYear()+' && '+dateRdv.getFullYear()+' >= '+dateDuJour.getFullYear()+' && '+dateRdv.getDate()+' >= '+dateDuJour.getDate()+' && '+dateRdv.getMonth()+'>='+dateDuJour.getMonth())
                }
            } catch (error) {
                alert("try catch error");
            }
        }else{
            alert("Il y a une champ vide");
            alert("this.state.dateRdvText = "+this.state.dateRdvText+"  &&   this.state.heureRdvText = "+this.state.heureRdvText+"  &&   this.state.motifRdv = "+this.state.motifRdv);
        }
    }
    getDataHtmlModifierRdv(dataRdv,showDetailRdv){
        if(dataRdv !== undefined && dataRdv !== null && showDetailRdv ===2){
            return (
                <div className="parentModificationRdvTmpAgenda">
                    <p>Patient : <strong>{dataRdv.infos.nom} {dataRdv.infos.prenom}</strong></p>
                    <p>Date  : <strong>{utile.getDateComplet(dataRdv.dateRdv)} {this.changeFormatHeure('à',dataRdv.infos.heureRdv)}</strong></p>
                    <p>Motif  : <strong>{dataRdv.infos.motif}</strong></p>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend"><span class="input-group-text" id="basic-addon3">Date</span></div>
                        <input type="date" className="form-control" defaultValue={this.createDate(dataRdv.dateRdv)} onChange={(e)=>this.setValueHandleNew('dateRdvText',e)} id="Date du rendez-vous" aria-describedby="Date du rendez-vous"/>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend"><span class="input-group-text" id="basic-addon3">Heure</span></div>
                        <input type="time" className="form-control" defaultValue={dataRdv.infos.heureRdv} onChange={(e)=>this.setValueHandleNew('heureRdvText',e)} id="Heure du rendez-vous" aria-describedby="Heure du rendez-vous"/>
                    </div>
                    <div class="input-group">
                        <div class="input-group-prepend"><span class="input-group-text">Motif</span></div>
                        <textarea className="form-control" onChange={(e)=>this.setValueHandleNew('motifRdv',e)} aria-label="Motif du rendez-vous" placeholder="Motif du rendez-vous"></textarea>
                    </div>
                    <div className="row parentAnnulationRdvTmpAgendaRow">
                        <div className="col-md-6 col-sm-12"><button className="btn btn-primary form-control" onClick={()=>this.ModifierRdv()}>Confirmer</button></div>
                        <div className="col-md-6 col-sm-12"><button className="btn btn-danger form-control" onClick={()=>{this.setState({dataRdv : null, showDetailRdv : 0,dateRdv : null})}}>Fermer</button></div>
                    </div>
                </div>
            )
        }
        return <div></div>
    }
    componentDidMount(){
        
    }
    render(){
        return (
            <div  className="allAgenda">
                <div className="row champsDateAgenda">
                    <div className="col-md-12 findcalendrierAgenda ">
                        <div className="row">
                            <div className="col-md-2 col-sm-12"><p className="miniTitleAgenda">Année</p>{this.createDataHtmlAnnee()}</div>
                            <div className="col-md-2 col-sm-12"><p className="miniTitleAgenda">Mois</p>{this.createDataHtmlMois()}</div>
                            <div className="col-md-2 col-sm-12"><p className="miniTitleAgenda">Jours</p>{this.createDataHtmlJour()}</div>
                            <div className="col-md-2 col-sm-12">
                                <p className="miniTitleAgenda">Filtre</p>
                                <select className="form-control" onChange={(e)=>this.setValueHandle('filtre',e)}>
                                    <option value="">Filtre</option>
                                    <option value="mois">Mois</option>
                                    <option value="semaine">Semaine</option>
                                    <option value="jour">Jour</option>
                                </select>
                            </div>
                            <div className="col-md-4 col-sm-12"><br/><br/><button className="btn-primary form-control" onClick={()=>this.findDataAgenda()}>Rechercher</button></div>
                        </div>
                    </div>
                </div>

                {this.affichageFinale(this.state.etatAgenda)}
                {this.getDataHtmlAgendaParJoursTemporaire(this.state.showJour)}
                {this.voirDetailRdv(this.state.dataRdv,this.state.showDetailRdv)}
                {this.getDataHtmlAnnulationRdv(this.state.dataRdv,this.state.showDetailRdv)}
                {this.getDataHtmlModifierRdv(this.state.dataRdv,this.state.showDetailRdv)}
            </div>
        )
    }
}
export default Agenda;