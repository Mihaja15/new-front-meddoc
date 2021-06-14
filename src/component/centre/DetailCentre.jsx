import React, {Component} from 'react';
import './DetailCentre.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faInfo, faCompass, faBusinessTime, faAddressCard, faChevronRight, faCalendarCheck} from '@fortawesome/free-solid-svg-icons';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { fetchGet, fetchPost } from '../../services/global.service';
import blueIcon from '../../assets/icon/marker-icon-2x-blue.png';
import { utile } from '../../services/utile';

class DetailCentre extends Component{
    constructor(props){
        super();
        this.state={
            adresseCentre:null,
            listContact:[],
            listProche:[],
            listEdt:[],
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
            error:false,
            beneficiaire:'',
            idUser:''
        }
    }
    componentDidUpdate(prevProps,prevState){

    }
    componentDidMount(){
        console.log(this.props);
        if(this.props.centreData!==null){
            // const dateJour = new Date();
            // fetchGet('/adresse/'+this.props.centreData.idCentre).then(adresse=>{
                this.setState({adresseCentre:this.props.centreData.adresse},function(){
                    console.log('adresse ',this.state.adresseCentre);
                });
            // });
            fetchGet('/covid/contact-centre/'+this.props.centreData.idCentre).then(contact=>{
                this.setState({listContact:contact},function(){
                    console.log('list contact ',this.state.listContact);
                });
            });
            fetchGet('/covid/emploi-temps/'+this.props.centreData.idCentre).then(edt=>{
                if(edt!==null)
                    this.setState({listEdt:edt},function(){
                        console.log('edt ',this.state.listEdt);
                    });
            });
            console.log(localStorage.getItem('idUser'));
            // this.setState({idUser:localStorage.getItem('idUser')},function(){
                if(localStorage.getItem('idUser')!==null){
                    console.log(localStorage.getItem('idUser'));
                    fetchGet('/users/proche/'+localStorage.getItem('idUser')+'/'+0+'/'+0).then(data=>{
                        console.log(data)
                        if(data!=null){
                            this.setState({ listProche: data , beneficiaire: localStorage.getItem('idUser'), idUser: localStorage.getItem('idUser')});
                        }else{
                            
                        }
                    });
                }
            // });
            // fetchGet('/emploieTemps/by-medecin/'+this.props.medecinData.idMedecin+'/'+this.state.dateFirst.getDay()+'/'+this.state.dateFirst.getFullYear()+'-'+(this.state.dateFirst.getMonth()+1)+'-'+this.state.dateFirst.getDate()).then(edt=>{
            //     this.setState({jour:edt},function(){
            //         console.log('EDT : ',this.state.jour);
            //     });
            // });
            fetchGet('/covid/schedule/'+this.props.centreData.idCentre+'/'+this.state.dateFirst.getDay()+'/'+this.state.dateFirst.getFullYear()+'-'+(this.state.dateFirst.getMonth()+1)+'-'+this.state.dateFirst.getDate()).then(edt=>{
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
    otherFormatTime(time){
        return time.split(':')[0]+'h'+time.split(':')[1];
    }
    onClickPrevNext=(direction)=>{
        var jour = new Date(this.state.dateFirst.getTime() + (direction * 3 * 24 * 60 * 60 * 1000));
        this.setState({dateFirst:jour}, function(){
            fetchGet('/covid/schedule/'+this.props.centreData.idCentre+'/'+this.state.dateFirst.getDay()+'/'+this.state.dateFirst.getFullYear()+'-'+(this.state.dateFirst.getMonth()+1)+'-'+this.state.dateFirst.getDate()).then(edt=>{
                this.setState({jour:edt},function(){
                    console.log('EDT : ',this.state.jour);
                });
            });
        })
    }
    handleChange = (param, e) => {
        // alert(param+" "+e.target.value)
        if(param==='beneficiaire'){
            if(e.target.value==='')
                this.setState({ beneficiaire: localStorage.getItem('idUser') });
            else
                this.setState({ beneficiaire: e.target.value });
        }else
            this.setState({ [param]: e.target.value })
    }
    takeAppointment=(date,heure)=>{
        const dateNow = new Date();
        console.log(dateNow.getTime()+' > '+date.getTime());
        if(this.state.beneficiaire===null||this.state.beneficiaire===undefined||this.state.beneficiaire===""){
            alert('Vous devez vous connecter!');
            return;
        }
        fetchGet('/covid/check-appointment/'+this.state.beneficiaire).then(has=>{
            if(has){  
                alert('Vous avez déjà pris un rendez-vous pour cette personne');
                return;
            }else{
                if(dateNow.getTime() > date.getTime()){
                    alert('La date de rendez-vous doit être ultérieurement!');
                }else{
                    if(this.state.idUser!==null&&this.state.idUser!==undefined){
                        this.setState({dateRdv:date,heureRdv:heure,showConfirmation:true});   
                    }else{
                        alert('Vous devez vous connecter!');
                    }
                }
            }
        });
    }
    handleClick=(validation)=>{
        // this.props.changeConfirmation(validation);
        this.setState({showConfirmation:false});
        const dateHeure = this.state.dateRdv.getFullYear()+"-"+utile.autocompleteZero(this.state.dateRdv.getMonth()+1,2)+"-"+utile.autocompleteZero(this.state.dateRdv.getDate(),2)+" "+this.state.heureRdv;
        if(validation){
            const data = { 
                dateHeureRdv : dateHeure ,
                idCentre : this.props.centreData.idCentre,
                idDmdUser:this.state.idUser,
                idPatient:this.state.beneficiaire,
                motif : "Premier rendez-vous",
                statut:100
            };
            console.log('prendre rdv : ',data);
            fetchPost('/covid/add-appointment',data).then(result=>{
                window.location.replace('/profil/rendez-vous');
                if(result.status === 200){
                    alert(''+result.message);
                    this.setState({etatErrorRdv : false, errorRdv : ''});
                    window.location.replace('/profil/rendez-vous');
                }else{
                    this.setState({etatErrorRdv : true, errorRdv : ''+result.message});
                }
            });
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
                            <p>{'Voulez-vous confirmer votre rendez-vous au '+this.props.centreData.nomCentre+' le '+utile.formatDateText(new Date(this.state.dateRdv))+' à '+this.state.heureRdv}</p>
                        </div>
                        <div className="confirmation-footer">
                            <a className='btn-annulation' href="#0" onClick={()=>this.handleClick(false)}>Annuler</a>
                            <a className='btn-validation' href="#0" onClick={()=>this.handleClick(true)}>Accepter</a>
                        </div>
                    </div>
                </div>
                <div className="confirmation-content" style={{display:this.state.showConfirmation?"block":"none"}}>
                    <div className="dialog-box">
                        <div className="confirmation-header" style={{backgroundColor:"#1b7895"}}>
                            <h2>{'Confirmation de rendez-vous'}</h2>
                        </div>
                        <div className="confirmation-body">
                            <p>{'Voulez-vous confirmer votre rendez-vous au '+this.props.centreData.nomCentre+' le '+utile.formatDateText(new Date(this.state.dateRdv))+' à '+this.state.heureRdv}</p>
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
                                <img src={'/uploads/'+(this.props.centreData!==null?this.props.centreData.photo:'profile.jpg')} alt={this.props.centreData!==null?this.props.centreData.nomCentre:''}/>
                                <h1>{this.props.centreData!==null?this.props.centreData.nomCentre:''}</h1>
                            </div>
                            <div className="col-md-12 banner-link"></div>
                        </div>
                        <div className="col-md-8 medecin-left-container">
                            <div className="col-md-12 presentation-info row">
                                <div className="col-md-12">
                                    <h2><th className='icon-place'><FontAwesomeIcon icon={faInfo}/></th> <th>Présentation générale</th></h2>
                                    <p>{this.props.centreData!==null?this.props.centreData.presentation:''}</p>
                                </div>
                            </div>
                            <div className="col-md-12 presentation-info row">
                                <div className="col-md-7">
                                    <h2><th className='icon-place'><FontAwesomeIcon icon={faCompass}/></th> <th className='subtitle-place'>Information d'accès</th></h2>
                                    <p>{this.state.adresseCentre!==null?this.state.adresseCentre.addrValue:''}</p>
                                    <p>District {this.state.adresseCentre!==null?this.state.adresseCentre.district.nomDistrict:''}</p>
                                    <p>{this.props.centreData!==null?this.props.centreData.infoAcces:''}</p>
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
                                                {this.props.centreData!==null?this.props.centreData.nomCentre:''}
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
                                            this.state.listContact.map((contact,i)=>{
                                                return(
                                                    <tr key={i}><th>{contact.typeContact.libelleTypeContact}</th><td>{': '+contact.contact}</td></tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-md-12">
                                    <h2><th className='icon-place'><FontAwesomeIcon icon={faBusinessTime}/></th> <th>Horaires</th></h2>
                                    <table>
                                        <thead>
                                            {
                                                this.state.listEdt.map((edt,i)=>{
                                                    return(
                                                        edt.timeStartBottom===null?<tr key={i}><th>{utile.getAllSemaine()[edt.jour]}</th> de <td>{this.otherFormatTime(edt.timeStartTop)+" à "+this.otherFormatTime(edt.timeStopTop)} </td></tr>
                                                        :edt.timeStartTop===null?<tr key={i}><th>{utile.getAllSemaine()[edt.jour]}</th> de <td>{this.otherFormatTime(edt.timeStartBottom)+" à "+this.otherFormatTime(edt.timeStopBottom)}</td></tr>
                                                        :<tr key={i}><th>{utile.getAllSemaine()[edt.jour]}</th> de <td>{this.otherFormatTime(edt.timeStartTop)+" à "+this.otherFormatTime(edt.timeStopTop)} et de {this.otherFormatTime(edt.timeStartBottom)+" à "+this.otherFormatTime(edt.timeStopBottom)}</td></tr>
                                                    )
                                                })
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
                                        <label>Pour</label>
                                        <select name='typeMedecin' value={this.state.beneficiaire} onChange={this.handleChange.bind(this,'beneficiaire')}>
                                            <option value=''>Moi</option>
                                            {
                                                this.state.listProche.map((proche,i)=>{
                                                    return(
                                                        <option key={i} value={proche.proche.idUser}>{proche.proche.nom+" "+proche.proche.prenoms}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <hr/>
                                        {/* <label>Type de consultation</label>
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
                                        <hr/> */}
                                        <label>Définir la date et l'heure</label>
                                        <div className='table-rdv-edt col-md-12'>
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
export default DetailCentre;