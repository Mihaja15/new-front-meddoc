import React, {Component} from 'react';
import './ListeRdvPatient.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Modal,Button} from 'react-bootstrap';
import {fetchPost} from '../../services/global.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { utile } from '../../services/utile';
import { TablePagination } from '@trendmicro/react-paginations';
import {  faChevronLeft, faChevronRight, faClock, faLongArrowAltUp, faTrash} from '@fortawesome/free-solid-svg-icons';
import { authUser } from '../../services/authUser';
import '@trendmicro/react-paginations/dist/react-paginations.css';

let ordres = false;

class ListeRdvPatient extends Component{
    constructor(props){
        super();
        this.state={
            dataRdv : {},
            loadData : false,
            etatListeRendezVous : 4,
            showModalDeValidation : false,
            dataDeValidation : {},
            etatModal : 1,
            sizeModal : 'md',
            titleModal : '',
            dateRdv : '',
            heureRdv : '',
            motifRdv : '',
            erreurModal : '',
            activateErreurModal : false,
            page : 0,
            pageLength : 0,
            totalRecords : 0,
            textRecherche : '',
            selectRecherche : '1',
            dateTmp : null
        }
        this.setValueHandle = this.setValueHandle.bind(this);
    }
    getDataRdv(etat){
        const data= {
            idMedecin : authUser.getToken(),
            colone : 'heureRdv',
            pages : 0,
            max : 10,
            etat : etat,
            ordre : ''+true ,
            etatRdv : 'pat'
        }
        fetchPost('/rendez-vous/listeRdv',data).then(dataTmp=>{
            this.setState({ dataRdv: dataTmp ,page : (dataTmp.page+1),pageLength : 10,totalRecords : (dataTmp.totalLength)});
        });
    }
    getDataRdvByData(data){
        fetchPost('/rendez-vous/listeRdv',data).then(dataTmp=>{
            console.log('dataTmp dataTmp :',dataTmp);
            this.setState({ dataRdv: dataTmp ,page : (dataTmp.page+1),pageLength : 10,totalRecords : (dataTmp.totalLength)});
        });
    }
    clickColoneTable=(data)=>{
        if(data.name!== null && data.name !== undefined && data.name!==''){
            const dataD= {
                idMedecin : authUser.getToken(),
                colone : data.name,
                ordre : ''+ordres ,
                etatRdv : 'pat'
            }
            console.log('dataTmp fsdfqsd :',dataD);
            fetchPost('/rendez-vous/trierRdv',dataD).then(dataTmp=>{
                this.setState({ dataRdv: dataTmp ,page : (dataTmp.page+1),pageLength : 10,totalRecords : (dataTmp.totalLength)});
            });
            ordres= !ordres;
        }
    }
    createHtmlTable(dataHeader){
        return (
            <thead>
                <tr>
                    {
                        dataHeader.map((data,i)=>{
                            return (
                            <th key={i} style={{cursor:"pointer"}} onClick={()=>this.clickColoneTable(data)} >{data.label} </th>
                            )
                        })
                    }
                </tr>
            </thead>
        )
    }
    validationRdv=(dataTmp,etat)=>{
        console.log('dataTmp dataTmp : ',dataTmp);
        if(etat === 1){ //validation
            this.setState({sizeModal : 'md',titleModal : 'Validation rendez-vous'})
        }else if(etat === 2){// annuler
            this.setState({sizeModal : 'xl',titleModal : 'Annulation rendez-vous'})
        }else if (etat === 3){//retard
            this.setState({sizeModal : 'xl',titleModal : 'Retardé une rendez-vous',dateTmp : new Date(dataTmp.dateRdv)})
        }
         this.setState({showModalDeValidation : true, dataDeValidation : dataTmp,etatModal : etat});
    }
    getDataHtmlTouteLesListeRendezVous(){
        const datas = [{label : 'Patient',name : 'nomPatient'},{label : 'Lieu de RDV',name : 'lieuRdv'},{label : 'Date',name : 'dateRdv'},{label : 'Heure',name : 'heureRdv'},{label :'Modification', name : ''},{label : 'Annulation',name : ''}];
        return (
            <table className="styled-table" style={{border: "2px solid #1b7895",height: "auto", width: "100%"}}>
                {this.createHtmlTable(datas)}
                <tbody>
                        { (this.state.dataRdv.rdvDatas) 
                            ? (this.state.dataRdv.rdvDatas).map((dataTmp,i)=>{
                                return (
                                    <tr key={i}>
                                        <td>{dataTmp.userRdv.nom} {dataTmp.userRdv.prenoms}</td>
                                        <td>{dataTmp.medecin.user.adresse.addrValue}</td>
                                        <td>{utile.getDateComplet(dataTmp.dateRdv)}</td>
                                        <td>{dataTmp.heureRdv}</td>
                                        <td><button className="btn-warning form-control" onClick={()=>this.validationRdv(dataTmp,3)}><FontAwesomeIcon icon={faClock}/></button></td>
                                        <td><button className="btn-danger form-control"  onClick={()=>this.validationRdv(dataTmp,2)}><FontAwesomeIcon icon={faTrash}/></button></td>
                                    </tr>
                                )
                            }) :  <tr></tr>
                        }
                    </tbody>
            </table>
        )        
    }
    getDataHtmlListeRendezVousAnnulation(){   
        const data = [{label : 'Medécin',name : 'nomPatient'},{label : 'Date',name : 'dateRdv'},{label : 'Heure',name : 'heureRdv'}];
        return (
            <table className="styled-table" style={{border: "2px solid #1b7895",height: "auto", width: "100%"}}>
                {this.createHtmlTable(data)}
                <tbody>
                        { (this.state.dataRdv.rdvDatas !==null && this.state.dataRdv.rdvDatas!== undefined) 
                            ? (this.state.dataRdv.rdvDatas).map((dataTmp,i)=>{
                                return (
                                    <tr key={i}>
                                        <td>{dataTmp.medecin.user.nom} {dataTmp.medecin.user.prenoms}</td>
                                        <td>{utile.getDateComplet(dataTmp.dateRdv)}</td>
                                        <td>{dataTmp.heureRdv}</td>
                                    </tr>
                                )
                            }) :  <tr></tr>
                        }
                    </tbody>
            </table>
        )
    }
    createDataHtmlByEtatListeRendezVous(etat){
        if( etat === 3){// annulation
            return this.getDataHtmlListeRendezVousAnnulation();
        }else{//tous
            return this.getDataHtmlTouteLesListeRendezVous();
        }
    }
    clickMenuListeRendezVous=(etat)=>{
        this.setState({etatListeRendezVous : etat})
        if(etat === 1){ //valider
            this.getDataRdv(11);
        }else if( etat === 2){// non valider
            this.getDataRdv(1);
        }else if( etat === 3){// annulation
            this.getDataRdv(1);
        }else{//tous
            this.getDataRdv(1);
        }
    }
    setValeur(valeur){
        if(valeur !== null &&  valeur!==undefined){
            return valeur;
        }else{
            return '';
        }
    }
    setValueHandle=(name,event)=>{
        const valeur = this.setValeur(event.target.value);
        if(name === 'dateRdv'){
            this.setState({dateRdv : valeur,dateTmp : new Date(valeur)});
        }else if(name === 'heureRdv'){
            this.setState({heureRdv : valeur});
        }else if( name==='motifRdv'){
            this.setState({motifRdv : valeur});
        }else if( name==='selectRecherche'){
            this.setState({selectRecherche : valeur});
        }else if( name==='textRecherche'){
            this.setState({textRecherche : valeur});
        }
    }
    verificationValeur(valeur){
        console.log('verification : ',valeur);
        if(valeur !== null && valeur !== undefined && valeur !== ''){
            return true;
        }
        return false;
    }
    testValeurDate(valeur){
        const testInt = utile.parseStringToInt(''+valeur);
        if(testInt < 10){
            return  '0'+valeur;
        }
        return valeur;
    }
    createDate(dates){
        const newDate = new Date(dates);
        let annee = newDate.getFullYear(); let mois = this.testValeurDate(newDate.getMonth()); let jour = this.testValeurDate(newDate.getDate());
        const final=''+annee+'-'+mois+'-'+jour;
        return final;
    }
    reporterRdv=()=>{
        if(this.verificationValeur(this.state.dateRdv) && this.verificationValeur(this.state.heureRdv) && this.verificationValeur(this.state.motifRdv) && this.state.dataDeValidation.medecin!==null && this.state.dataDeValidation.medecin!==undefined){
            try {
                const dateRdv = new Date(this.state.dateRdv);const dateDmdRdv= new Date(this.state.dataDeValidation.dateDmdRdv);const dateDuJour=new Date();
                if(dateRdv.getDate() >= dateDmdRdv.getDate() && dateRdv.getMonth()>=dateDmdRdv.getMonth() && dateRdv.getFullYear() >=dateDuJour.getFullYear() &&dateRdv.getDate() >= dateDuJour.getDate() && dateRdv.getMonth()>=dateDuJour.getMonth()){
                    const newData={
                        idRdv : this.state.dataDeValidation.idRdv,
                        heureRdv : this.state.heureRdv,
                        dateRdv : dateRdv.toISOString(),
                        motif : this.state.motifRdv
                    }
                    fetchPost('/rendez-vous/reporterRdv',newData).then(dataTmp=>{
                        console.log('dataTmp :', dataTmp);
                        //this.setState({ dataRdv: dataTmp ,page : (dataTmp.page+1),pageLength : 10,totalRecords : (dataTmp.totalLength)});
                    });
                    console.log('new Data :',newData);
                }else{
                    this.setState({activateErreurModal : true, erreurModal : "Il y a une erreur d'information" });
                }
            } catch (error) {
                this.setState({activateErreurModal : true, erreurModal : "Il y a une erreur d'information" });
            }
        }else{
            this.setState({activateErreurModal : true, erreurModal : "Modification des information reussi" });
            this.getAll();
        }
    }
    AnnulationRdv=()=>{
        if(this.verificationValeur(this.state.motifRdv) && this.state.dataDeValidation.medecin!==null && this.state.dataDeValidation.medecin!==undefined){
            const newData={
                idRdv : this.state.dataDeValidation.idRdv,
                motif : this.state.motifRdv
            }
            fetchPost('/rendez-vous/annulationRdv',newData).then(dataTmp=>{
                console.log('dataTmp :', dataTmp);
                this.getAll();
                //this.setState({ dataRdv: dataTmp ,page : (dataTmp.page+1),pageLength : 10,totalRecords : (dataTmp.totalLength)});
            });
        }else{
            this.setState({activateErreurModal : true, erreurModal : "Il y a une erreur d'information" });
        }
    }
    getDataHtmlAnnulationRdv(){
        if(this.state.dataDeValidation.medecin!==null && this.state.dataDeValidation.medecin!==undefined){
            return (
                <div>
                    <div className="titreAnDInformationRDVListeRendezVous">
                        <h6>Médecin : <strong>{this.state.dataDeValidation.medecin.user.nom} {this.state.dataDeValidation.medecin.user.prenoms}</strong></h6>
                        <h6>Patient : <strong>{this.state.dataDeValidation.userRdv.nom} {this.state.dataDeValidation.userRdv.prenoms}</strong></h6>
                        <h6>Date  : {utile.getDateComplet(this.state.dataDeValidation.dateRdv)}</h6>
                        <h6>Heure  : {this.state.dataDeValidation.heureRdv}</h6>
                        <h6>Motif  : Annulation</h6>
                    </div>
                    <div className="titreAnDInformationRDVListeRendezVous"> 
                        <div>
                            <p>Motif</p>
                            <textarea cols="30" rows="4" onChange={(e)=>this.setValueHandle('motifRdv',e)} className="form-control"></textarea>
                        </div>
                    </div>
                </div>
            )
        }else{
            return <div></div>
        }
    }
    getDataHtmlRetarderRdv(){
        if(this.state.dataDeValidation.medecin!==null && this.state.dataDeValidation.medecin!==undefined){
            return (
                <div>
                    <div className="titreAnDInformationRDVListeRendezVous">    
                        <h6>Médecin : <strong>{this.state.dataDeValidation.medecin.user.nom} {this.state.dataDeValidation.medecin.user.prenoms}</strong></h6>
                        <h6>Patient : <strong>{this.state.dataDeValidation.userRdv.nom} {this.state.dataDeValidation.userRdv.prenoms}</strong></h6>
                        <h6>Date  : {utile.getDateComplet(this.state.dataDeValidation.dateRdv)}</h6>
                        <h6>Heure  : {this.state.dataDeValidation.heureRdv}</h6>
                        <h6>Motif  : Retardé</h6>
                    </div>
                    <div className="titreAnDInformationRDVListeRendezVous"> 
                        <div>
                            <p>Date</p>
                            <input type="date" defaultValue={this.createDate(this.state.dataDeValidation.dateRdv)} onChange={(e)=>this.setValueHandle('dateRdv',e)} className="form-control-sm col-md-12" />
                        </div>
                        <div>
                            <p>Heure</p>
                            <select className="form-control-sm col-md-12" onChange={(e)=>this.setValueHandle('heureRdv',e)}>
                                <option value="">Heure de rendez-vous</option>
                                {
                                    this.createNombreAvecDureeConsultation(this.state.dataDeValidation.medecin.dureeConsultation,new Date(this.state.dataDeValidation.dateRdv),this.state.dataDeValidation.emploiTemps,this.state.dateTmp).map((dataTmp,i)=>{
                                        return <option value={dataTmp.heure+','+dataTmp.minute} key={i}>{dataTmp.heure+'h '+dataTmp.minute}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <p>Motif</p>
                            <textarea cols="30" rows="2" onChange={(e)=>this.setValueHandle('motifRdv',e)} className="form-control-sm col-md-12"></textarea>
                        </div>
                    </div>
                </div>
            )
        }else{
            return <div></div>
        }
    }
    voirModal=(etat)=>{
        if(etat === 2){
            return this.getDataHtmlAnnulationRdv();
        }else if (etat === 3){
            return this.getDataHtmlRetarderRdv();
        }
    }
    rechercheUserMMM=()=>{
        if(this.verificationValeur(this.state.textRecherche) && this.verificationValeur(this.state.selectRecherche)){
            const data= {
                text : this.state.textRecherche,
                select : this.state.selectRecherche,
                id : authUser.getToken(),
                etatRdv : 'patient'
            };
            console.log('data : ',data);
            fetchPost('/rendez-vous/findlisteRdv',data).then(dataTmp=>{
                console.log('dataTmp :',dataTmp);
                this.setState({ dataRdv: dataTmp ,page : (dataTmp.page+1),pageLength : 10,totalRecords : (dataTmp.totalLength)});
            });
        }else{
            alert('Verifiez votre information');
        }
    }

    //duree
    testValeurDateV12(valeur){
        const testInt = utile.parseStringToInt(''+valeur);
        if(testInt < 10){
            return  '0'+valeur;
        }
        return valeur;
    }
    getFindEmploiDuTemps(emploieDuTemps,day){
        console.log(' emploieDuTemps : ',emploieDuTemps);
        console.log(' day : ',day);
        if(emploieDuTemps!==null && emploieDuTemps !==undefined){
            let size=emploieDuTemps.length;
            for(let i=0; i < size; i++){
                if(emploieDuTemps[i].jour === day){
                    return emploieDuTemps[i];
                }
            }
        }   
        return null;
    }
    getDureeConsultation(valeur){
        if(valeur!== null && valeur !== undefined){
            const tmp = valeur.split(':');
            if(tmp.length > 1){
                const intTmp=utile.parseStringToInt(tmp[1]);
                if(intTmp>0){
                    return intTmp;
                }
            }
        }
        return 1;
    }
    createNombreAvecDureeConsultation(duree,date,emploieDuTemps,dateTmp){
        let ddate = date.getDay();
        if(dateTmp!=null){
            const dateTmpV2 = this.state.dateTmp.getDay();
            if(dateTmpV2>=0){
                ddate=dateTmpV2;
            }
        }
        const emploi=this.getFindEmploiDuTemps(emploieDuTemps,ddate);const final =[];let dureeFinal= this.getDureeConsultation(duree);
        if(emploi!==null && emploi!==undefined){
            let topStart = emploi.timeStartTop; let topStop = emploi.timeStopTop; let bottomStart= emploi.timeStartBottom; let bottomStop = emploi.timeStopBottom;
            console.log('topStart : '+topStart+', topStop :'+topStop+', bottomStart : '+bottomStart+', bottomStop: '+bottomStop);
            if(topStart > 0 && topStop>0){
                for (let i = topStart; i <= topStop; i++) {
                    for (let a = 0; a < 60; a=a+dureeFinal) {
                        final.push({heure : i , minute : this.testValeurDateV12(a)});
                    }
                }
            }
            if(bottomStart >0 && bottomStop>0){
                for (let i = bottomStart; i <= bottomStop; i++) {
                    for (let a = 0; a < 60; a=a+dureeFinal) {
                        final.push({heure : i , minute : this.testValeurDateV12(a)});
                    }
                }
            }
        }else{
            for (let i = 1; i <= 24; i++) {
                for (let a = 0; a < 64; a=a+dureeFinal) {
                    final.push({heure : i , minute : this.testValeurDateV12(a)});
                }
            }
        }
        return final;
    }
    
    
    
    //duree




    getAll(){
        const data= {
            idMedecin : authUser.getToken(),
            colone : 'heureRdv',
            pages : 0,
            max : 10,
            etat : 1,
            ordre : ''+true ,
            etatRdv : 'pat'
        }
        this.getDataRdvByData(data);
        this.setState({loadData : true});
    }



    componentDidMount() {
        if(this.state.loadData=== false){
            const data= {
                idMedecin : authUser.getToken(),
                colone : 'heureRdv',
                pages : 0,
                max : 10,
                etat : 1,
                ordre : ''+true ,
                etatRdv : 'pat'
            }
            this.getDataRdvByData(data);
            this.setState({loadData : true});
        }
    }
    render(){
        return (
            <div className="tousRendezVous">
                {/* <div className="container">
                    <nav id="navB">
                        <ul>
                            <li onClick={()=>this.clickMenuListeRendezVous(4)}>Tous mes rendez-vous<span></span><span></span><span></span><span></span></li>
                            <li onClick={()=>this.clickMenuListeRendezVous(3)}>Rendez-vous aujourd'hui<span></span><span></span><span></span><span></span></li>
                            <li onClick={()=>this.clickMenuListeRendezVous(3)}>Annulé une rendez-vous<span></span><span></span><span></span><span></span></li>
                        </ul>
                    </nav>  
                </div> */}
                <div className="divTableaListeRendezVous">
                    {/* <div className="row">
                        <div className="col-6">
                            {(this.state.selectRecherche==='5')
                                ?(<input type="date" className="inputFindUserListeRdv" onChange={(e)=>this.setValueHandle('textRecherche',e)} />)
                            :(this.state.selectRecherche==='6') 
                                ? (<input type="time" className="inputFindUserListeRdv" onChange={(e)=>this.setValueHandle('textRecherche',e)} />)
                            : (<input type="text" className="inputFindUserListeRdv" onChange={(e)=>this.setValueHandle('textRecherche',e)} placeholder="Recherche" />)}
                            
                        </div>
                        <div className="col-3">
                            <select className="inputFindUserListeRdv" onChange={(e)=>this.setValueHandle('selectRecherche',e)}>
                                <option value="1">Médecin</option>
                                <option value="2">Spécialité</option>
                                <option value="4">Consultation</option>
                                <option value="5">Date de rendez vous</option>
                                <option value="6">Heure de rendez vous</option>
                            </select>
                        </div>
                        <div className="col-3"><button className="buttonFindUserListeRdv" onClick={()=>this.rechercheUserMMM()}>Recherche</button></div>
                    </div> */}
                    {this.createDataHtmlByEtatListeRendezVous(this.state.etatListeRendezVous)}
                    <div className="col-md-12 warning-rdv">
                        <p>Lors de votre rendez-vous dans un centre de vaccination, veuillez vous munir des documents suivants:</p>
                        <ul>
                            <li>CIN</li>
                            <li>Preuve d'emploi ou d'ordre d'appartenance (carte ordre des médecins, services sociaux, militaires, policiers...)</li>
                            <li>Votre carte assurance santé (le cas échéant)</li>
                        </ul>
                    </div>
                    <div className="pagnationRecherche">
                        <TablePagination
                            type="full"
                            dropup = {true}
                            page={this.state.page}
                            pageLength={this.state.pageLength}
                            totalRecords={this.state.totalRecords}
                            onPageChange={({ page, pageLength }) => {
                                const data= {
                                    idMedecin : 5,
                                    colone : 'heureRdv',
                                    pages : page-1,
                                    max : 10,
                                    etat : 1,
                                    ordre : ''+true 
                                }
                                this.getDataRdvByData(data)
                            }}
                            prevPageRenderer={() => <FontAwesomeIcon icon={faChevronLeft}/>}
                            nextPageRenderer={() => <FontAwesomeIcon icon={faChevronRight}/>}
                        />
                    </div> 
                </div>
                {/* modal */}
                <Modal show={this.state.showModalDeValidation} onHide={()=>{this.setState({showModalDeValidation : false});}} animation={true} size={'md'}>
                    <Modal.Header closeButton>
                    <Modal.Title>{this.state.titleModal}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.voirModal(this.state.etatModal)}
                        <div hidden={!this.state.activateErreurModal} className="labelError">
                            {this.state.erreurModal}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={()=>{this.setState({showModalDeValidation : false});}}>Fermer</Button>
                        {
                            (this.state.etatModal===2) ? (
                                <Button variant="primary" onClick={()=>this.AnnulationRdv()} >Confirmer</Button>
                            ) : <Button variant="primary" onClick={()=>this.reporterRdv()} >Reporter</Button>
                        }
                        
                    </Modal.Footer>
                </Modal>
                {/* modal */}
            </div>
        )
    }
}
export default ListeRdvPatient;