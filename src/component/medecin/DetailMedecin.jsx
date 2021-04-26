import React, {Component} from 'react';
import './DetailMedecin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faLanguage, faInfo, faGraduationCap, faLevelUpAlt, faCompass, faBusinessTime, faAddressCard, faCoins, faCreditCard, faChevronRight, faCalendarCheck} from '@fortawesome/free-solid-svg-icons';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { fetchGet, fetchPost } from '../../services/global.service';
import blueIcon from '../../assets/icon/marker-icon-2x-blue.png';
import { utile } from '../../services/utile';
import { authUser } from '../../services/authUser';

class DetailMedecin extends Component{
    constructor(props){
        super();
        this.state={
            adresseMed:null,
            lat: -18.911014807267343,
            long: 47.51621369091749,
            jour:null,
            dateFirst:new Date(),
            dateEdt:[],
            typeRdv:'',
            typeMedecin:'',
            motifRdv:'',
            dateRdv:'',
            heureRdv:'',
            showConfirmation:false,
            error:false
        }
    }
    componentDidUpdate(prevProps,prevState){

    }
    componentDidMount(){
        console.log(this.props);
        if(this.props.medecinData!==null){
            // const dateJour = new Date();
            fetchGet('/adresse/'+this.props.medecinData.user.idUser).then(adresse=>{
                this.setState({adresseMed:adresse,lat:adresse.latitude,long:adresse.longitude},function(){
                    console.log('adresse ',this.state.adresseMed);
                });
            });
            fetchGet('/emploieTemps/by-medecin/'+this.props.medecinData.idMedecin+'/'+this.state.dateFirst.getDay()+'/'+this.state.dateFirst.getFullYear()+'-'+(this.state.dateFirst.getMonth()+1)+'-'+this.state.dateFirst.getDate()).then(edt=>{
                this.setState({jour:edt},function(){
                    console.log('EDT : ',this.state.jour);
                });
            });
        }
    }
    dateShow(date){
        const dates = new Date(date);
        return <>{utile.getWeekAbrev(dates.getDay())}<br/> {utile.autocompleteZero(dates.getDate(),2)} {utile.getMonthAbrev(dates.getMonth())}</>
    }
    formatTime(time){
        return time.split(':')[0]+':'+time.split(':')[1];
    }
    onClickPrevNext=(direction)=>{
        var jour = new Date(this.state.dateFirst.getTime() + (direction * 3 * 24 * 60 * 60 * 1000));
        this.setState({dateFirst:jour}, function(){
            fetchGet('/emploieTemps/by-medecin/'+this.props.medecinData.idMedecin+'/'+this.state.dateFirst.getDay()+'/'+this.state.dateFirst.getFullYear()+'-'+(this.state.dateFirst.getMonth()+1)+'-'+this.state.dateFirst.getDate()).then(edt=>{
                this.setState({jour:edt},function(){
                    console.log('EDT : ',this.state.jour);
                });
            });
        })
    }
    handleChange = (param, e) => {
        this.setState({ [param]: e.target.value })
    }
    takeAppointment=(date,heure)=>{
        const dateNow = new Date();
        console.log(dateNow.getTime()+' > '+date.getTime());
        if(dateNow.getTime() > date.getTime()){
            alert('La date de rendez-vous doit être ultérieurement!');
        }else{
            if(this.state.typeRdv!==""&&this.state.motifRdv!==""&&this.state.motifRdv!==""){
                this.setState({dateRdv:date,heureRdv:heure,showConfirmation:true});   
            }else{
                alert('Tous les champs sont obligatoires!');
            }
        }
    }
    handleClick=(validation)=>{
        // this.props.changeConfirmation(validation);
        this.setState({showConfirmation:false});
        if(validation){
        
            const data = { 
                jour : this.state.dateRdv.getDate(),
                mois: this.state.dateRdv.getMonth(),
                anne : this.state.dateRdv.getFullYear() ,
                heureDeRDV : this.state.heureRdv ,
                idTypeConsultation : this.state.typeRdv,
                idMedecin : this.props.medecinData.idMedecin,
                description : this.state.motifRdv,
                idTypeMedecin : this.state.typeMedecin,
                token : authUser.getToken()
            };
            console.log('prendre rdv : ',data);
            fetchPost('/rendez-vous/addRDV',data).then(result=>{
                if(result.status === 200){
                    alert(''+result.message);
                    this.setState({etatErrorRdv : false, errorRdv : ''});
                }else{
                    this.setState({etatErrorRdv : true, errorRdv : ''+result.message});
                }
            });
            // fetchGet('/emploieTemps/by-medecin/'+this.props.medecinData.idMedecin+'/'+this.state.dateFirst.getDay()+'/'+this.state.dateFirst.getFullYear()+'-'+(this.state.dateFirst.getMonth()+1)+'-'+this.state.dateFirst.getDate()).then(edt=>{
                
            // });
        }
    }
    render(){
        return(
            <div className="detail-medecin-container">
                {/* {this.confirmation()} */}
                <div className="confirmation-content" style={{display:this.state.showConfirmation?"block":"none"}}>
                    <div className="dialog-box">
                        <div className="confirmation-header" style={{backgroundColor:"#1b7895"}}>
                            <h2>{'Confirmation de rendez-vous'}</h2>
                        </div>
                        <div className="confirmation-body">
                            <p>{'Voulez-vous confirmer votre rendez-vous avec le docteur '+this.props.medecinData.user.nom+' '+this.props.medecinData.user.prenoms+' le '+utile.formatDateText(new Date(this.state.dateRdv))+' à '+this.state.heureRdv}</p>
                        </div>
                        <div className="confirmation-footer">
                            <a className='btn-annulation' href="#0" onClick={()=>this.handleClick(false)}>Annuler</a>
                            <a className='btn-validation' href="#0" onClick={()=>this.handleClick(true)}>Accepter</a>
                        </div>
                    </div>
                </div>
                {/* <Confirmation header={'Confirmation de rendez-vous'} bodyMsg={'Voulez-vous confirmer votre rendez-vous avec le docteur '+this.props.medecinData.user.nom+' '+this.props.medecinData.user.prenoms+' le '+utile.formatDateText(new Date(this.state.dateRdv))+' à '+this.state.heureRdv} error={this.state.error} confirmation={this.state.showConfirmation} changeConfirmation={this.confirmeState}/> */}
                {/* <div className="container"> */}
                    <div className="row">
                        <div className="col-md-12 medecin-top-container">
                            <div className="col-md-12 banner-background"></div>
                            <div className="col-md-12 banner-img">
                                <button onClick={()=>this.props.setStateShow(1)}><FontAwesomeIcon icon={faChevronLeft}/></button>
                                <img src={'/uploads/'+(this.props.medecinData!==null?this.props.medecinData.user.profilPicture:'profile.jpg')} alt={this.props.medecinData!==null?this.props.medecinData.user.nom+' '+this.props.medecinData.user.prenoms:''}/>
                                <h1>{this.props.medecinData!==null?this.props.medecinData.user.nom+' '+this.props.medecinData.user.prenoms:''}</h1>
                            </div>
                            <div className="col-md-12 banner-link"></div>
                        </div>
                        <div className="col-md-8 medecin-left-container">
                            <div className="col-md-12 presentation-info row">
                                <div className="col-md-7">
                                    <h2><th className='icon-place'><FontAwesomeIcon icon={faCoins}/></th> <th>Frais de consultation</th></h2>
                                    <table>
                                        <tbody>
                                        {
                                            this.props.medecinData!==null?this.props.medecinData.fraisConsultation.map((frais,i)=>{
                                                return(
                                                    <tr key={i}><th>{frais.typeMedecin!==null?frais.typeMedecin.libelleTypeMedecin:''} {frais.typeConsultation.libelleTypeConsultation}</th><td>{': Ar '+frais.frais}</td></tr>
                                                )
                                            }):''
                                        }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-md-5">
                                    <h2><th className='icon-place'><FontAwesomeIcon icon={faCreditCard}/></th> <th>Mode de paiement</th></h2>
                                    <ul>
                                        {
                                            this.props.medecinData!==null?this.props.medecinData.modePaiement.map((mode,i)=>{
                                                return(
                                                    <li key={i}>{mode.libelle}</li>
                                                )
                                            }):''
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-12 presentation-info row">
                                <div className="col-md-12">
                                    <h2><th className='icon-place'><FontAwesomeIcon icon={faInfo}/></th> <th>Présentation générale</th></h2>
                                    <p>{this.props.medecinData!==null?this.props.medecinData.infoMedecin:''}</p>
                                </div>
                                <div className="col-md-12">
                                    <h2><th className='icon-place'><FontAwesomeIcon icon={faLanguage}/></th> <th>Langues parlées</th></h2>
                                    <ul>
                                        {
                                            this.props.medecinData!==null?this.props.medecinData.user.langue.map((lang,i)=>{
                                                return(
                                                    <li key={i}>{lang.libelleLangue}</li>
                                                )
                                            }):''
                                        }
                                    </ul>
                                </div>
                                <div className="col-md-12">
                                    <h2><th className='icon-place'><FontAwesomeIcon icon={faGraduationCap}/></th> <th>Diplômes</th></h2>
                                    <table>
                                        <tbody>
                                            {
                                                this.props.medecinData!==null?this.props.medecinData.diplomes.map((diplome,i)=>{
                                                    return(
                                                        <tr key={i}><th>{diplome.anneeDebut+' - '+diplome.anneeFin}</th><td>{': '+diplome.description}</td></tr>
                                                    )
                                                }):''
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-md-12">
                                    <h2><th className='icon-place'><FontAwesomeIcon icon={faLevelUpAlt}/></th> <th>Expériences</th></h2>
                                    <table>
                                        <tbody>
                                        {
                                            this.props.medecinData!==null?this.props.medecinData.experiences.map((experience,i)=>{
                                                return(
                                                    <tr key={i}><th>{experience.anneeDebut+' - '+experience.anneeFin}</th><td>{': '+experience.description}</td></tr>
                                                )
                                            }):''
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-md-12 presentation-info row">
                                <div className="col-md-7">
                                    <h2><th className='icon-place'><FontAwesomeIcon icon={faCompass}/></th> <th className='subtitle-place'>Information d'accès</th></h2>
                                    <p>{this.state.adresseMed!==null?this.state.adresseMed.addrValue:''}</p>
                                    <p>{this.props.medecinData!==null?this.props.medecinData.informationAcces:''}</p>
                                </div>
                                <div className="col-md-5">
                                    <MapContainer center={[this.state.lat,this.state.long]} zoom={10} scrollWheelZoom={true}>
                                        <TileLayer
                                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker position={[this.state.lat,this.state.long]}  icon={new L.Icon({
                                            iconUrl: blueIcon,
                                            iconRetinaUrl: blueIcon,
                                            iconSize: [25, 41],
                                            iconAnchor: [12, 41],
                                            popupAnchor: [1, -34],
                                            shadowSize: [41, 41]
                                        })}>
                                            <Popup>
                                                {this.props.medecinData!==null?this.props.medecinData.user.nom+''+this.props.medecinData.user.prenoms:''}
                                            </Popup>
                                        </Marker>
                                    </MapContainer>
                                </div>
                            </div>
                            <div className="col-md-12 presentation-info row">
                                <div className="col-md-12">
                                    <h2><th className='icon-place'><FontAwesomeIcon icon={faAddressCard}/></th> <th>Contacts</th></h2>
                                    <table>
                                        <tbody>
                                        {
                                            this.props.medecinData!==null?this.props.medecinData.user.contact.map((contact,i)=>{
                                                return(
                                                    <tr key={i}><th>{contact.typeContact.libelleTypeContact}</th><td>{': '+contact.contact}</td></tr>
                                                )
                                            }):''
                                        }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-md-12">
                                    <h2><th className='icon-place'><FontAwesomeIcon icon={faBusinessTime}/></th> <th>Horaires</th></h2>
                                    <table>
                                        <thead>
                                            {
                                                this.props.medecinEmploiTemps!==null?this.props.medecinEmploiTemps.map((edt,i)=>{
                                                    return(
                                                        <tr key={i}><th>{utile.getAllSemaine()[edt.jour]}</th> : <td>{edt.timeStartTop!==0?utile.autocompleteZero(edt.timeStartTop,2)+'h00 - '+utile.autocompleteZero(edt.timeStopTop,2)+'h00':''} {edt.timeStartTop!==0&&edt.timeStartBottom!==0?' , ':''} {edt.timeStartBottom!==0?utile.autocompleteZero(edt.timeStartBottom,2)+'h00 - '+utile.autocompleteZero(edt.timeStopBottom,2)+'h00':''}</td></tr>
                                                    )
                                                }):''
                                            }
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 medecin-right-container">
                            <div className="col-md-12 rdv-container">
                                <div className="col-md-12 header-rdv">
                                    <h3><FontAwesomeIcon icon={faCalendarCheck}/> Prendre un rendez-vous</h3>
                                </div>
                                <div className="col-md-12 body-rdv">
                                    {/* <form className='col-md-12'> */}
                                        <label>Type de consultation</label>
                                        <select name='typeMedecin' value={this.state.typeMedecin} onChange={this.handleChange.bind(this,'typeMedecin')}>
                                            <option>Sélectionner un type</option>
                                            {
                                                this.props.medecinData!==null?this.props.medecinData.typeMedecin.map((type,i)=>{
                                                    return(
                                                        <option key={i} value={type.idTypeMedecin}>{type.libelleTypeMedecin}</option>
                                                    )
                                                }):''
                                            }
                                            <option></option>
                                        </select>
                                        <hr/>
                                        <label>Type de consultation</label>
                                        <select name='typeRdv' value={this.state.typeRdv} onChange={this.handleChange.bind(this,'typeRdv')}>
                                            <option>Sélectionner un type</option>
                                            {
                                                this.props.medecinData!==null?this.props.medecinData.fraisConsultation.map((frais,i)=>{
                                                    return(
                                                        <option key={i} value={frais.typeConsultation.idTypeConsultation}>{frais.typeConsultation.libelleTypeConsultation}</option>
                                                    )
                                                }):''
                                            }
                                            <option></option>
                                        </select>
                                        <hr/>
                                        <label>Motif de consultation</label>
                                        <select name='motifRdv' value={this.state.motifRdv} onChange={this.handleChange.bind(this,'motifRdv')}>
                                            <option>Choisir un motif</option>
                                            <option>Urgence</option>
                                            <option>Nouveau patient</option>
                                            <option>Suivi médical</option>
                                        </select>
                                        <hr/>
                                        <label>Définir la date et l'heure</label>
                                        <div className='col-md-12'>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th><a href='#0' onClick={()=>this.onClickPrevNext(-1)}><FontAwesomeIcon icon={faChevronLeft}/></a></th>
                                                        {/* {
                                                            this.props.medecinEmploiTemps!==null?this.props.medecinEmploiTemps.map((edt,i)=>{
                                                                return(
                                                                    <th key={i}>{this.dateShow(edt.dateJour)}</th>
                                                                )
                                                            }):''
                                                        } */}
                                                        <th>{this.state.jour!==null?this.dateShow(this.state.jour.date1):''}</th>
                                                        <th>{this.state.jour!==null?this.dateShow(this.state.jour.date2):''}</th>
                                                        <th>{this.state.jour!==null?this.dateShow(this.state.jour.date3):''}</th>
                                                        <th><a href='#0' onClick={()=>this.onClickPrevNext(1)}><FontAwesomeIcon icon={faChevronRight}/></a></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            <ul>
                                                                {
                                                                    this.state.jour!==null?this.state.jour.jour1.map((heure,i)=>{
                                                                        return <li key={i} onClick={()=>this.takeAppointment(new Date(this.state.jour.date1), heure)}>{this.formatTime(heure)}</li>
                                                                    }):''
                                                                }
                                                            </ul>
                                                        </td>
                                                        <td>
                                                            <ul>
                                                                {
                                                                    this.state.jour!==null?this.state.jour.jour2.map((heure,i)=>{
                                                                        return <li key={i} onClick={()=>this.takeAppointment(new Date(this.state.jour.date2), heure)}>{this.formatTime(heure)}</li>
                                                                    }):''
                                                                }
                                                            </ul>
                                                        </td>
                                                        <td>
                                                            <ul>
                                                                {
                                                                    this.state.jour!==null?this.state.jour.jour3.map((heure,i)=>{
                                                                        return <li key={i} onClick={()=>this.takeAppointment(new Date(this.state.jour.date3), heure)}>{this.formatTime(heure)}</li>
                                                                    }):''
                                                                }
                                                            </ul>
                                                        </td>
                                                        <td>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    {/* </form> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-md-12 validation-rdv">
                        <div className="col-md-12 validation-header"></div>
                        <div className="col-md-12 validation-container"></div>
                    </div> */}
                {/* </div> */}
            </div>
        );
    }
}
export default DetailMedecin;