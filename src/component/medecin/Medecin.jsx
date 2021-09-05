import React, {Component} from 'react';
import './Medecin.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { faChevronDown, faChevronUp, faLock, faQuestionCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchGet, fetchPost } from '../../services/global.service';
import { utile } from '../../services/utile';
import { authUser } from '../../services/authUser';

//const position = [-18.883996,47.523274];
class Medecin extends Component{
  constructor(props){
      super();
      this.state={
            voirPlus:false,
            voirPlusExp:false,
            voirPlusDiplome:false,
            voirSemaine:false,
            dataMedecin :null,
            dateRdv : (new Date()),
            etatJour : 'all',
            dataAuthUser : authUser.verificationIfUserIsLogged(),
            identification : {valuesText : '',etat : 1},
            mdp : {valuesText : '',etat : 1},
            consultation : {valuesText : '',etat : 1},
            dateConsultation : {valuesText : '',etat : 1},
            heureConsultation : {valuesText : '',etat : 1},
            description : {valuesText : '',etat : 1},
            error : {message : '',activation : false},
            errorRdv : '',
            etatErrorRdv : false
        }
    }
    setStateByNameState(name,valeur,etatChamps){
        if(name === 'identification')this.setState({ identification : { valuesText : valeur , etat : etatChamps }}); 
        else if( name === 'mdp') this.setState({ mdp : { valuesText : valeur , etat : etatChamps }}); 
        else if( name === 'consultation') this.setState({ consultation : { valuesText : valeur , etat : etatChamps }}); 
        else if( name === 'dateConsultation') this.setState({ dateConsultation : { valuesText : valeur , etat : etatChamps }}); 
        else if( name === 'heureConsultation') this.setState({ heureConsultation : { valuesText : valeur , etat : etatChamps }}); 
        else if( name === 'description') this.setState({ description : { valuesText : valeur , etat : etatChamps }}); 
    }
    setValue(names,event){
        const valeur = event.target.value;
        this.setState({error : {message : '',activation: false}});
        if(valeur !== '' && valeur != null){this.setStateByNameState(names,valeur,2)}else{ this.setStateByNameState(names,'',3)}
    }
    voirPlus(e){
        this.setState({voirPlus:!this.state.voirPlus});
    }
    testValeurDate(valeur){
        const testInt = utile.parseStringToInt(''+valeur);
        if(testInt < 10){
            return  '0'+valeur;
        }
        return valeur;
    }
    getFindEmploiDuTemps(emploieDuTemps,day){
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
    createNombreAvecDureeConsultation(duree,date,emploieDuTemps){
        const emploi=this.getFindEmploiDuTemps(5);const final =[];let dureeFinal= this.getDureeConsultation(duree);
        if(emploi!==null && emploi!==undefined){
            let topStart = emploi.timeStartTop; let topStop = emploi.timeStopTop; let bottomStart= emploi.timeStartBottom; let bottomStop = emploi.timeStopBottom;
            for (let i = topStart; i <= topStop; i++) {
                for (let a = 0; a < 64; a=a+dureeFinal) {
                    final.push({heure : i , minute : this.testValeurDate(a)});
                }
            }
            for (let i = bottomStart; i <= bottomStop; i++) {
                for (let a = 0; a < 64; a=a+dureeFinal) {
                    final.push({heure : i , minute : this.testValeurDate(a)});
                }
            }
        }else{
            for (let i = 1; i <= 24; i++) {
                for (let a = 0; a < 64; a=a+dureeFinal) {
                    final.push({heure : i , minute : this.testValeurDate(a)});
                }
            }
        }
        return final;
    }
    createDate(dates){
        const newDate = new Date(dates);
        let annee = newDate.getFullYear(); let mois = this.testValeurDate(newDate.getMonth()); let jour = this.testValeurDate(newDate.getDate());
        const final=''+annee+'-'+mois+'-'+jour;
        return final;
    }
    getUrlPhoto(photo){
        try {
            if(photo!==null && photo!==undefined && photo!==''){
                return <img src={"/uploads/"+photo} className="ImageMedecinPrendreRdvMedecin" alt="image_medecin"/>
            }
        } catch (error) { }
        return <img src={"/uploads/profile.jpg"} className="ImageMedecinPrendreRdvMedecin" alt="image_medecin"/>
    }
    getInformationMedecin(dataMedecin){
        if(dataMedecin!==null && dataMedecin !==undefined){
            return (
                <div className="container ProfilMedecinPrendreRdvMedecin">
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <ul className="ulImageMedecinPrendreRdvMedecin">
                                <li className="ilOneulImageMedecinPrendreRdvMedecin">
                                    {this.getUrlPhoto(dataMedecin.medecinData.user.profilPicture)}
                                </li>
                                <li className="ilTwoulImageMedecinPrendreRdvMedecin">
                                    <div className="namedivImageMedecinPrendreRdvMedecin">Dr {dataMedecin.medecinData.user.nom} {dataMedecin.medecinData.user.prenoms}</div>
                                    {
                                        (dataMedecin.medecinData.fraisConsultation).map((dataTmp,i)=>{
                                            return (<div className="specialitedivImageMedecinPrendreRdvMedecin" key={i}>Médecin {dataTmp.typeMedecin.libelleTypeMedecin} {dataTmp.typeConsultation.libelleTypeConsultation}</div>)
                                        })
                                    }
                                </li>
                            </ul>
                            <div className="descriptionPrendreRdvMedecin">
                                {
                                    (dataMedecin.medecinData.infoMedecin!=='')?(
                                        <div className="PresentationProfilMedecinPrendreRdvMedecin" >
                                            <h3 className="titreProfilMedecinPrendreRdvMedecin">Présentation</h3>
                                            <p className= {(this.state.voirPlus)?'textV2PresentationProfilMedecinPrendreRdvMedecin':'textV3PresentationProfilMedecinPrendreRdvMedecin'} >{dataMedecin.medecinData.infoMedecin}</p>
                                            <div className="divShowMoreDesciptionPrendrezRdvMedecin" hidden={this.state.voirPlus}><Link to="#ee" onClick={()=>this.setState({voirPlus : !this.state.voirPlus})}><FontAwesomeIcon icon={faChevronDown}/></a></div>
                                            <div className="divShowMoreDesciptionPrendrezRdvMedecin" hidden={!this.state.voirPlus}><Link to="#ee" onClick={()=>this.setState({voirPlus : !this.state.voirPlus})}><FontAwesomeIcon icon={faChevronUp}/></a></div>
                                        </div>
                                    ):(<div></div>)
                                }
                                
                                {
                                    (dataMedecin.medecinData.experiences!== undefined && dataMedecin.medecinData.experiences!==null)?(
                                        <div className="PresentationProfilMedecinPrendreRdvMedecin">
                                            <h3 className="titreProfilMedecinPrendreRdvMedecin" >Expériences</h3>
                                            <table className="table table-hover" hidden= {!this.state.voirPlusExp}>
                                                <tbody>
                                                    {
                                                        (dataMedecin.medecinData.experiences).map((dataTmp,i)=>{
                                                            return (
                                                                <tr key={i}>
                                                                    <td className="annePresentationProfilMedecinPrendreRdvMedecin">{dataTmp.anneeDebut} à {dataTmp.anneeFin}</td>
                                                                    <td className="textPresentationProfilMedecinPrendreRdvMedecin"><p className="textV2PresentationProfilMedecinPrendreRdvMedecin">{dataTmp.description}</p></td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>                          
                                            </table>
                                            <div className="divNewTextShowMoreDesciptionPrendrezRdvMedecin" hidden={this.state.voirPlusExp}>Voir tous mes experiences</div>
                                            <div className="divV2ShowMoreDesciptionPrendrezRdvMedecin" hidden={this.state.voirPlusExp}><Link to="#ee" onClick={()=>this.setState({voirPlusExp : !this.state.voirPlusExp})}><FontAwesomeIcon icon={faChevronDown}/></a></div>
                                            <div className="divV2ShowMoreDesciptionPrendrezRdvMedecin" hidden={!this.state.voirPlusExp}><Link to="#ee" onClick={()=>this.setState({voirPlusExp : !this.state.voirPlusExp})}><FontAwesomeIcon icon={faChevronUp}/></a></div>
                                        </div>
                                    ):(<div></div>)
                                }
                                {
                                    (dataMedecin.medecinData.diplomes!== undefined && dataMedecin.medecinData.diplomes!==null)?(
                                        <div className="PresentationProfilMedecinPrendreRdvMedecin">
                                            <h3 className="titreProfilMedecinPrendreRdvMedecin">Diplômes</h3>
                                            <table className="table table-hover" hidden= {!this.state.voirPlusDiplome}>
                                                <tbody>
                                                    {
                                                        (dataMedecin.medecinData.diplomes).map((dataTmp,i)=>{
                                                            return (
                                                                <tr key={i}>
                                                                    <td className="annePresentationProfilMedecinPrendreRdvMedecin">{dataTmp.anneeDebut} à {dataTmp.anneeFin}</td>
                                                                    <td className="textPresentationProfilMedecinPrendreRdvMedecin"><p className="textV2PresentationProfilMedecinPrendreRdvMedecin">{dataTmp.description}</p></td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>                          
                                            </table>
                                            <div className="divNewTextShowMoreDesciptionPrendrezRdvMedecin" hidden={this.state.voirPlusDiplome}>Voir tous mes diplômes</div>
                                            <div className="divV2ShowMoreDesciptionPrendrezRdvMedecin" hidden={this.state.voirPlusDiplome}><Link to="#ee" onClick={()=>this.setState({voirPlusDiplome : !this.state.voirPlusDiplome})}><FontAwesomeIcon icon={faChevronDown}/></a></div>
                                            <div className="divV2ShowMoreDesciptionPrendrezRdvMedecin" hidden={!this.state.voirPlusDiplome}><Link to="#ee" onClick={()=>this.setState({voirPlusDiplome : !this.state.voirPlusDiplome})}><FontAwesomeIcon icon={faChevronUp}/></a></div>
                                        </div>
                                    ):(<div></div>)
                                }
                                
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="row">
                                <div className="col-md-5 col-sm-12 fraisConsultaionPrendreRdvMedecin">
                                    <div className="titrefraisConsultaionPrendreRdvMedecin">Frais consultation</div>
                                    <hr className="hrfraisConsultaionPrendreRdvMedecin"/>
                                    
                                    <div>
                                        {
                                            (dataMedecin.medecinData.fraisConsultation).map((dataTmp,i)=>{
                                                return (<ul className="ulPricefraisConsultaionPrendreRdvMedecin" key={i}>
                                                            <li className="liSonOneulPricefraisConsultaionPrendreRdvMedecin">{dataTmp.typeConsultation.libelleTypeConsultation}</li>
                                                            <li className="liTwoOneulPricefraisConsultaionPrendreRdvMedecin"><sup>Ar</sup> {dataTmp.frais}</li>
                                                        </ul>)
                                            })
                                            
                                        }
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12 mapPrendreRdvMedecin">
                                    <MapContainer center={[dataMedecin.medecinData.user.adresse.latitude,dataMedecin.medecinData.user.adresse.longitude]} zoom={15} scrollWheelZoom={true}>
                                        <TileLayer
                                        attribution='&copy; <Link to="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker position={[dataMedecin.medecinData.user.adresse.latitude,dataMedecin.medecinData.user.adresse.longitude]}  icon={new L.Icon({
                                                iconUrl: "marker-icon-2x-blue.png",
                                                iconSize: [25, 41],
                                                iconAnchor: [12, 41],
                                                popupAnchor: [1, -34],
                                                shadowSize: [41, 41]
                                            })}>
                                            <Popup>
                                                Je suis ici
                                            </Popup>
                                        </Marker>
                                        
                                    </MapContainer>
                                    <div className="carteAccesInformationPrendreRdvMedecin">
                                        <h5 className="TitlecarteAccesInformationPrendreRdvMedecin">Carte et informations d'accès</h5>
                                        {dataMedecin.medecinData.informationAcces}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return <div>Il y a une erreur de chargement</div>
    }
    getDisponibiliteEmploiTemps(timeStart,timeStop){
        if(timeStart>0 && timeStop>0){
            return timeStart+'h à '+timeStop+'h';
        }
        return 'indisponible';
    }
    getErrorMessage(valeur , text){
        if(valeur>=3){
            return <div className="col-md-12 col-sm-12 labelErrors">{text}</div>
        }
        return <p></p>;
    }
    loginConnexion = () => {
        const dataIdentification = this.state.identification;const dataMdp = this.state.mdp;
        if(dataIdentification.etat === 2 && dataIdentification.etat === 2 ){
            const userAuth = {identification: dataIdentification.valuesText,mdp: dataMdp.valuesText}
            fetchPost('/users/loginMeddoc',userAuth).then(data=>{
                if(data.status === 200){
                    const log = authUser.loginUser(data.token,data.typeUser,data.sessionToken,data.profilPicture);
                    if(log && data.typeUser === 'Patient'){
                        this.setState({dataAuthUser : authUser.verificationIfUserIsLogged()})
                    }else{
                        //console.log('log : '+log+"   :=> ",data);
                        localStorage.clear();
                        this.setState({error : {message : "Il y a une erreur d'information ou vous n'etez pas un(e) patient .",activation: true}})
                    }
                }else{
                    this.setState({error : {message : data.message,activation: true}})
                }
            });
        }
    }
    getEmploieDuTemps(dataMedecin){
        if(dataMedecin!==null && dataMedecin !==undefined){
            return (
                <div className="container ProfilMedecinPrendreRdvMedecin">
                    <div hidden={this.state.voirSemaine}>Pour voir mes disponibilités par semaine, veuille cliquer <Link to="#ee" onClick={()=>this.setState({voirSemaine : !this.state.voirSemaine})}>ici</a></div>
                    <div hidden={!this.state.voirSemaine}>Pour déplie mes disponibilités, veuille cliquer <Link to="#ee" onClick={()=>this.setState({voirSemaine : !this.state.voirSemaine})}>ici</a></div>
                    <div>
                        <table className="table table-hover" hidden={!this.state.voirSemaine}>
                            <thead>
                                <tr>
                                    <th>Semaine</th>
                                    <th>Matin</th>
                                    <th>Midi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (dataMedecin.emploiDuTemps).map((dataTmp,i)=>{
                                        if(dataTmp.timeStartTop>0 && dataTmp.timeStopTop>0){}
                                        return (
                                            <tr key={i}>
                                                <td>{utile.getAllSemaine()[dataTmp.jour]}</td>
                                                <td>{this.getDisponibiliteEmploiTemps(dataTmp.timeStartTop,dataTmp.timeStopTop) }</td>
                                                <td>{this.getDisponibiliteEmploiTemps(dataTmp.timeStartBottom,dataTmp.timeStopBottom)}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
        return <div>Il y a une erreur de chargement</div>
    }
    getHtmlLogin(dataAuthUser){
        if(!dataAuthUser.logged){
            return (
                <div className="sonV12logginAllMeddoc">
                    <div className="row">
                        <div className="col-md-5 col-sm-12"></div>
                        <div className="col-md-7 col-sm-12 loginMedecinPrendreRdv">
                            <h1 className="titleH1Login" id="textAuMilieu"><b>Connexion</b></h1>
                            <p className="titlePLogin" id="textAuMilieu">Pour prendre un rendez-vous, Veuillez vous connecté ou <a className="titleALogin" href="/inscription-patient"> créer mon compte</a></p>
                            <div className="form-group row lognNewDesign descenteLogin">
                                <div className="input-group">
                                    <span className="form-control spanSonOfChildLoggin col-2"><FontAwesomeIcon style={{textAlign : "center"}} icon={faUser} /></span>
                                    <input className="form-control inputSonOfChildLoggin col-10" type="text" value={this.state.identification.valuesText} onChange={(e) => this.setValue("identification", e)}  placeholder="E-mail ou numéro de téléphone" name="identification"/>
                                    {this.getErrorMessage(this.state.identification.etat,'Le champs identification est obligatoire')}
                                </div>
                                
                            </div>
                            <div className="form-group row lognNewDesign">
                                <div className="input-group">
                                    <span className="form-control spanSonOfChildLoggin col-2"><FontAwesomeIcon icon={faLock} /></span>
                                    <input className="form-control inputSonOfChildLoggin col-10" type="password" value={this.state.mdp.valuesText} onChange={(e) => this.setValue("mdp", e)}   placeholder="Mot de passe" name="mdp"/>
                                    {this.getErrorMessage(this.state.mdp.etat,'Le champs mot de passe est obligatoire')}
                                </div>
                            </div>
                            <a className="motDePasseOublieLogin" href="/mot-de-passe">Mot de passe oublié ?</a>
                            <div className="boutonConnecterLogin">
                                <a className="bouton-solid-reg popup-with-move-anim a1" id="sonboutonConnecter" href="#details-lightbox-1" onClick={this.loginConnexion}>Se connecter</a>
                            </div>
                        </div>
                        
                    </div>
                </div>
            ) 
        }
        return <div></div>
    }
    findIdTypeMedecin(id){
        const data = this.state.dataMedecin.medecinData.fraisConsultation; let size=data.length;
        for (let i=0; i<size; i++){
            if(''+data[i].typeConsultation.idTypeConsultation=== ''+id){
                return data[i].typeMedecin.idTypeMedecin;
            }
        }
        return -1;
    }
    prendreRdv=()=>{
       if(this.state.consultation.etat===2 && this.state.heureConsultation.etat===2 && this.state.description.etat===2 && this.state.dataMedecin.medecinData.idMedecin!==null && this.state.dataMedecin.medecinData.idMedecin!==undefined){
           let dateTmp = this.state.dateRdv;let idTypeMed = this.findIdTypeMedecin(this.state.consultation.valuesText);
           if(this.state.dateConsultation.etat===2){dateTmp = new Date(this.state.dateConsultation.valuesText); //console.log('dadadad : '+this.state.dateConsultation.valuesText)}
           if(idTypeMed>=0){
                const data = { 
                    jour : dateTmp.getDate(),
                    mois:dateTmp.getMonth(),
                    anne : dateTmp.getFullYear() ,
                    heureDeRDV : this.state.heureConsultation.valuesText ,
                    idTypeConsultation : this.state.consultation.valuesText,
                    idMedecin : this.state.dataMedecin.medecinData.idMedecin,
                    description : this.state.description.valuesText,
                    idTypeMedecin : idTypeMed,
                    token : authUser.getToken()
                };
                //console.log('prendre rdv : ',data);
                fetchPost('/rendez-vous/addRDV',data).then(result=>{
                    if(result.status === 200){
                        alert(''+result.message);
                        this.setState({etatErrorRdv : false, errorRdv : ''});
                    }else{
                        this.setState({etatErrorRdv : true, errorRdv : ''+result.message});
                    }
                });
           }else{
            this.setState({etatErrorRdv : true, errorRdv : 'Verifiez votre champs car il y a une erreur.'});
           }
       }else{
            this.setState({etatErrorRdv : true, errorRdv : 'Verifiez votre champs car il y a une erreur.'});
       }
    }
    getPrendreRdv(dataMedecin){
        if(dataMedecin!==null && dataMedecin !==undefined){
            return (
                <div className="container ProfilMedecinPrendreRdvMedecin">
                    <div className="row form-group">
                        <span className="col-md-5 col-sm-12 textDivRdvMedecinPrendreRdv">Type de rendez-vous &ensp;&ensp;<FontAwesomeIcon color="#007bff" icon={faQuestionCircle}/></span>
                        <div className="col-md-7 col-sm-12 champTextRdvMedecinPrendreRdv">
                            <select className="form-control" onChange={(e) => this.setValue("consultation", e)}>
                                <option value="">Type de consultation*</option>
                                {
                                    (dataMedecin.medecinData.fraisConsultation).map((dataTmp,i)=>{
                                        return <option value={dataTmp.typeConsultation.idTypeConsultation} key={i}>{dataTmp.typeConsultation.libelleTypeConsultation}  : {dataTmp.frais} Ariary</option>
                                    }) 
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row form-group">
                        <span className="col-md-5 col-sm-12 textDivRdvMedecinPrendreRdv">Date* &ensp;&ensp;<FontAwesomeIcon color="#007bff" icon={faQuestionCircle}/></span>
                        <div className="col-md-7 col-sm-12 champTextRdvMedecinPrendreRdv"><input type="date" onChange={(e) => this.setValue("dateConsultation", e)} defaultValue={this.createDate(this.state.dateRdv)} className="form-control"/></div>
                    </div>
                    <div className="row form-group">
                        <span className="col-md-5 col-sm-12 textDivRdvMedecinPrendreRdv">Pour* &ensp;&ensp;<FontAwesomeIcon color="#007bff" icon={faQuestionCircle}/></span>
                        <div className="col-md-7 col-sm-12 champTextRdvMedecinPrendreRdv">
                            <select className="form-control">
                                <option value="">Vos proches ou pour vous même</option>
                                <option value="">Pour moi</option>
                            </select>
                        </div>
                    </div>
                    <div className="row form-group">
                        <span className="col-md-5 col-sm-12 textDivRdvMedecinPrendreRdv">Heure* &ensp;&ensp;<FontAwesomeIcon color="#007bff" icon={faQuestionCircle}/></span>
                        <div className="col-md-7 col-sm-12 champTextRdvMedecinPrendreRdv">
                            <select className="form-control" onChange={(e) => this.setValue("heureConsultation", e)}>
                                <option value="">Heure de consultation</option>
                                { 
                                    (this.createNombreAvecDureeConsultation(dataMedecin.medecinData.dureeConsultation,this.state.dateRdv,dataMedecin.emploiDuTemps)).map((dataTmp,i)=>{
                                        return (<option value={dataTmp.heure+','+dataTmp.minute} key={i}> {dataTmp.heure+'h '+dataTmp.minute}</option>)
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row form-group">
                        <span className="col-md-5 col-sm-12 textDivRdvMedecinPrendreRdv">Description* &ensp;&ensp;<FontAwesomeIcon color="#007bff" icon={faQuestionCircle}/></span>
                        <div className="col-md-7 col-sm-12 champTextRdvMedecinPrendreRdv"><textarea rows="3" onChange={(e) => this.setValue("description", e)} className="form-control" placeholder="Description ou raison de votre rendez-vous"></textarea></div>
                    </div>
                    {this.getHtmlLogin(this.state.dataAuthUser)}
                    <div hidden={!this.state.etatErrorRdv} id="divErrorAmelioreMedecin" className="textDePreventionInscriptionMedecin">{this.state.errorRdv}</div>
                    <div className="boutonFinalPrendreRdv">
                        <button className="btn btn-primary" disabled={!this.state.dataAuthUser.logged} onClick={()=>this.prendreRdv()}>Prenez rendez-vous</button>
                    </div>
                </div>
            )
        }
        return <div>Il y a une erreur de chargement</div>
    }
    componentDidMount(){
        if(this.props.dataMedecin !== undefined && this.props.dataMedecin!==null){ 
            this.setState({ dateRdv: new Date(this.props.dataMedecin.date) , etatJour : this.props.dataMedecin.etat });
            fetchGet('/medecin/dataMedecinSpeciale/'+this.props.dataMedecin.idMedecin).then(data=>{
                if(data!=null){
                    this.setState({ dataMedecin: data });
                    //console.log('data med :',data)
                }
            });
        }
    }
    render(){
        return (
            <div className="allPrendreRdvMedecin">
                
                {this.getInformationMedecin(this.state.dataMedecin)}
                {this.getEmploieDuTemps(this.state.dataMedecin)}
                {this.getPrendreRdv(this.state.dataMedecin)}
            </div>
        )
    }
}
export default Medecin;