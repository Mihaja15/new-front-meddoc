import React from 'react';
import './Compte.css';
import { ProgressBar } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import redIcon from '../../assets/icon/marker-icon-2x-red.png';
import { fetchGet, fetchPost } from '../../services/global.service';
import verificationMotDePasseEnPourcentage from '../../services/motDePasse.service';
import { utile } from '../../services/utile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
function MyComponent(props) {
	useMapEvent('click', (e) => {
		props.dataCenter(e.latlng.lat, e.latlng.lng);
	})
	return null;
}

export default class Compte extends React.Component{
    constructor(props){
        super(props);
        this.state={
            idCentre:null,
            idAdresse:null,
            latitude:-18.41106708060209,
            longitude:47.516397059313796,
            listLieu:[],
            listDistrict:[],
            listContact:[],
            listTypeContact:[],
            nomCentre:'',
            presentation:'',
            infoAcces:'',
            nbSalle:0,
            adresse:'',
            emploiTemps:utile.createSemaineEmploieDuTemps(),
            phone:'',
            mail:'',
            file:null,
            fileName:'',
            mdp:'',
            oldMdp:'',
            province:'',
            district:'',
            duree:0,
            percentageMdp:0,
            confirmationMdp:'',
            update:false,
            mailIndice:null,
            phoneIndice:null,
            disableButton:false,
            erreurMessage:'',
            erreurEtat:false
        }
    }
    getColorPourcentage(pourcentage){
        if(pourcentage>=100){
           return 'success';
        }else if(pourcentage>60 && pourcentage<=99){
            return 'warning';
        }else{
            return 'danger';
        }
    }
    getVerificationMdp(){
        if(this.state.mdp === this.state.confirmationMdp && this.state.percentageMdp === 100){
            return true;
        }
    }
    modificationCompte(event){
        event.preventDefault();
        this.setState({disableButton:true});
		// const data = new FormData(event.target);
        const dataCentre = {
            idCentre:this.state.idCentre,
            nomCentre:this.state.nomCentre,
            presentation:this.state.presentation,
            infoAcces:this.state.infoAcces,
            nbSalle:this.state.nbSalle,
            adresse:[{
                idAdresse: this.state.idAdresse,
                addrValue:this.state.adresse,
                latitude : this.state.latitude,
                longitude : this.state.longitude,
                district:{
                    idDistrict: this.state.district
                }
            }],
            identifiant:[{
                identifiant: this.state.mail.trim()
            },{
                identifiant: this.state.phone.trim()
            }],
            emploiTemps:this.getEmploiDuTemps(),
            contact:this.state.listContact,
            dureeVaccination:this.state.duree
        }
        const dataSend = {
            centre: JSON.stringify(dataCentre),
            mdp: this.state.oldMdp
        }
        console.log(dataCentre);
        fetchPost('/covid/edition-centre',dataSend).then(result=>{
            if(result.etat === "0"){
                alert(result.message);
                this.setState({update:false});
            }else{
                this.setState({disableButton:false, erreurEtat: true, erreurMessage: result.message});
            }
            console.log(result);
        });
    }
    handleChange = (param, e) => {
        if(param==="mdp"){
            this.setState({percentageMdp:verificationMotDePasseEnPourcentage(e.target.value)});
        }
        if(param==="province"){
            fetchGet('/adresse/find-district-by-id-province/'+e.target.value).then(data=>{
                if(data!=null){
                    this.setState({ listDistrict: data });
                }
            });
        }
        if(param==="phone"){
            if(this.state.phoneIndice!==null)
                this.state.listContact[this.state.phoneIndice].contact=e.target.value;
        }
        if(param==="mail"){
            if(this.state.mailIndice!==null)
                this.state.listContact[this.state.mailIndice].contact=e.target.value;
        }
        this.setState({ [param]: e.target.value })
    }
    generaterTabSelect = (min,max) =>{
		const valeur = [];
		for (let index = (min-1); index < max; index++) {
			valeur.push({
				label : utile.autocompleteZero((index+1),2)+' h',
				value : (index+1)
			})
		}
		return(
            <>
                <option value={-1}>--h</option>
                {valeur.map((heure, i)=>{
                    return <option key={i} value={heure.value}>{heure.label}</option>
                })}
            </>
        );
    }
    setDataCenter=(lats,lngs)=>{
        this.setState({latitude : lats,longitude : lngs});
	}
    getEmploiDuTemps(){
		const data= this.state.emploiTemps;
		const newData = [];
        var top1 = null;
        var top2 = null;
        var bot1 = null;
        var bot2 = null;
		for (let i = 0; i < data.length; i++) {
			if(data[i].activation){
                if(data[i].topStart!==null && data[i].topStop!==null){
                    top1=utile.autocompleteZero(data[i].topStart,2)+":00:00";
                    top2=utile.autocompleteZero(data[i].topStop,2)+":00:00";
                }
                if(data[i].bottomStart!==null && data[i].bottomStop!==null){
                    bot1=utile.autocompleteZero(data[i].bottomStart,2)+":00:00";
                    bot2=utile.autocompleteZero(data[i].bottomStop,2)+":00:00";
                }
                if(top1!==null || bot1!==null){
                    newData.push({
                        timeStartBottom: bot1,
                        timeStopBottom: bot2,
                        jour: data[i].jour,
                        timeStartTop: top1,
                        timeStopTop: top2,
                    });
                }
			}
		}
		return newData;
	}
    setSemaineEmploieDuTemps=(indice,event)=>{
        const data= this.state.emploiTemps;
        data[indice].activation= event.target.checked;
        this.setState({emploiTemps: data});
	}
    setValueEmploieDuTemps(namesHeure,indice,event){
		const valeur = utile.parseStringToInt(event.target.value);
		if(valeur >=0){
			const data= this.state.emploiTemps;
			if(namesHeure === 'topStart'){
                data[indice].topStart=valeur;
                if(data[indice].topStop===undefined || data[indice].topStop===null || data[indice].topStop==="")
                    data[indice].topStop=valeur;
                else{
                    if(data[indice].topStop < data[indice].topStart)
                        data[indice].topStop = valeur;
                }
            }
			if(namesHeure === 'topStop'){
                data[indice].topStop=valeur;
                if(data[indice].topStart===undefined || data[indice].topStart===null || data[indice].topStart==="")
                    data[indice].topStart=valeur;
            }
			if(namesHeure === 'bottomStart'){
                data[indice].bottomStart=valeur;
                if(data[indice].bottomStop===undefined || data[indice].bottomStop===null || data[indice].bottomStop==="")
                    data[indice].bottomStop=valeur;
                else{
                    if(data[indice].bottomStop < data[indice].bottomStart)
                        data[indice].bottomStop = valeur;
                }
            }
			if(namesHeure === 'bottomStop'){
                data[indice].bottomStop=valeur;
                if(data[indice].bottomStart===undefined || data[indice].bottomStart===null || data[indice].bottomStart==="")
                    data[indice].bottomStart=valeur;
            }
			this.setState({emploiTemps: data},function(){
                console.log(this.state.emploiTemps)
            });
		}
	}
    onChangeImage(event) {
        const picture = event.target.files;
        const photoName = picture[0].name.toString();
        // alert(photoName.split('.')[photoName.split('.').length-1]);
        const fileName = this.state.nomCentre+(new Date()).getTime()+'.'+photoName.split('.')[photoName.split('.').length-1];

		if(picture.length > 0){
            this.setState({file:picture[0], fileName:fileName}); 
        }
	}
    addContact=()=>{
        const data = this.state.listContact;
        data.push({
            typeContact:{
                idTypeContact:0
            },
            contact:''
        });
        this.setState({listContact: data});
    }
    removeContact=(indice)=>{
        const data = this.state.listContact;
        data.splice(indice, 1);
        this.setState({listContact: data});
    }
    changeContactText=(indice, event)=>{
        const data= this.state.listContact;
        data[indice].contact= event.target.value;
		this.setState({listContact: data});
    }
    changeContactType=(indice, event)=>{
        const data= this.state.listContact;
        data[indice].typeContact= {idTypeContact:event.target.value};
		this.setState({listContact: data});
    }
    componentDidMount(){
        fetchGet('/covid/centre/'+localStorage.getItem('idCentre')).then(data=>{
			if(data!=null){
                fetchGet('/adresse/find-province-by-id-district/'+data.adresse[0].district.idDistrict).then(idProvince=>{
                    this.setState({province:idProvince});
                    fetchGet('/adresse/find-district-by-id-province/'+idProvince).then(datas=>{
                        if(datas!=null){
                            this.setState({ listDistrict: datas });
                        }
                    });
                });
                // console.log("idProvince:  "+idProvince);
                console.log(data)
                const edt = data.emploiTemps;
                const semaine = utile.getAllSemaine();
                const dataEdt= [];
                var exist = false;
                var top1 = null;
                var top2 = null;
                var bot1 = null;
                var bot2 = null;
                for (let i = 0; i < semaine.length; i++) {
                    exist = false;
                    if(edt!==null){
                        for (let j = 0; j < edt.length; j++) {
                            if(edt[j].timeStartBottom!==undefined && edt[j].timeStartBottom!==null && edt[j].timeStartBottom!=="")
                                bot1 = edt[j].timeStartBottom.split(':')[0]*1;
                            if(edt[j].timeStopBottom!==undefined && edt[j].timeStopBottom!==null && edt[j].timeStopBottom!=="")
                                bot2 = edt[j].timeStopBottom.split(':')[0]*1;
                            if(edt[j].timeStartTop!==undefined && edt[j].timeStartTop!==null && edt[j].timeStartTop!=="")
                                top1 = edt[j].timeStartTop.split(':')[0]*1;
                            if(edt[j].timeStopTop!==undefined && edt[j].timeStopTop!==null && edt[j].timeStopTop!=="")
                                top2 = edt[j].timeStopTop.split(':')[0]*1;
                            if(edt[j].jour===i){
                                exist = true;
                                dataEdt.push({
                                    names : semaine[i],
                                    activation : true,
                                    jour : i,
                                    topStart : top1,
                                    topStop : top2,
                                    bottomStart : bot1,
                                    bottomStop : bot2,
                                })
                            }
                        }
                    }
                    if(!exist){
                        dataEdt.push({
                            names : semaine[i],
                            activation : false,
                            jour : i,
                            topStart : null,
                            topStop : null,
                            bottomStart : null,
                            bottomStop : null,
                        })
                    }
                }
                const contact = data.contact;
                const ids = data.identifiant;
                var mail = "";
                var phone = "";
                for(let i = 0; i < contact.length; i++){
                    for(let j = 0; j < ids.length; j++){
                        if(ids[j].identifiant===contact[i].contact){
                            if(contact[i].typeContact.idTypeContact===1){
                                phone = contact[i].contact;
                                this.setState({phoneIndice:i});
                            }
                            if(contact[i].typeContact.idTypeContact===2){
                                mail = contact[i].contact;
                                this.setState({mailIndice:i});
                            }
                        }
                    }
                }
				this.setState({
                    idCentre:data.idCentre,
                    idAdresse:data.adresse[0].idAdresse,
                    nomCentre:data.nomCentre,
                    presentation:data.presentation,
                    infoAcces:data.infoAcces,
                    nbSalle:data.nbSalle,
                    listContact:data.contact,
                    adresse:data.adresse[0].addrValue,
                    latitude:data.adresse[0].latitude,
                    longitude:data.adresse[0].longitude,
                    emploiTemps:dataEdt,
                    phone:phone,
                    mail:mail,
                    // file:null,
                    // fileName:'',
                    // mdp:'',
                    // province:idProv,
                    district:data.adresse[0].district.idDistrict,
                    duree:data.dureeVaccination
                });
			}
        });
		fetchGet('/adresse/province/all').then(data=>{
			if(data!=null){
				this.setState({ listLieu: data });
			}
        });
        fetchGet('/type-contact/list').then(data=>{
			if(data!=null){
				this.setState({ listTypeContact: data });
			}
        });
    }
    render(){
        return(
            <div className="compte-container">
                <div className="row">
                    <div className="col-md-12">
                        <a href="#0" onClick={()=>this.setState({update:!this.state.update})}>{!this.state.update?"Modifier":"Annuler"}</a>
                    </div>
                    <div className="col-md-12">
                        <form className="row" onSubmit={this.modificationCompte.bind(this)}>
                            <div className="col-md-7 col-sm-12">
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control compte-label col-5">Nom du centre</span>
                                        <input className="form-control inscription-input inscription-inputV12 col-7" required={true} disabled={!this.state.update} type="text" value={this.state.nomCentre} onChange={this.handleChange.bind(this,"nomCentre")} placeholder="" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control compte-label col-5">Présentation</span>
                                        <textarea rows="4" className="inscription-input form-control" disabled={!this.state.update} value={this.state.presentation} onChange={this.handleChange.bind(this,"presentation")} placeholder="Texte de présentation qui apparaîtra sur votre profil (facultatif)"></textarea>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control compte-label col-5">Adresse</span>
                                        <input className="form-control inscription-input inscription-inputV12 col-7" value={this.state.adresse} required={true} disabled={!this.state.update} type="text" onChange={this.handleChange.bind(this,"adresse")}  placeholder=""  />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control compte-label col-5">Information d'accès</span>
                                        <textarea rows="4" className="inscription-input form-control" disabled={!this.state.update} value={this.state.infoAcces} onChange={this.handleChange.bind(this,"infoAcces")} placeholder="Décrire les différentes informations pour faciliter la localisation de votre centre (facultatif)"></textarea>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control compte-label col-5">Province</span>
                                        <select className="form-control inscription-input inscription-inputV12 col-7" value={this.state.province} disabled={!this.state.update} required={true} onChange={this.handleChange.bind(this,"province")}  >
                                            <option value=''></option>
                                            { this.state.listLieu.map((lieu,i) => {
                                                    return(
                                                    <option value={lieu.idProvince} key={i}>
                                                        {lieu.nomProvince}
                                                    </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                {
                                    (this.state.listDistrict.length>0)
                                    ? (
                                        <div className="form-group row">
                                            <div className="input-group">
                                                <span className="form-control compte-label col-5">District</span>
                                                <select className="form-control  inscription-input inscription-inputV12 col-7"value={this.state.district} disabled={!this.state.update} required={true} onChange={this.handleChange.bind(this,"district")}>
                                                    <option value=''></option>
                                                    { this.state.listDistrict.map((lieu,i) => {
                                                        return(
                                                        <option value={lieu.idDistrict} key={i}>
                                                            {lieu.nomDistrict}
                                                        </option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    ): (<div></div>)
                                }
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control compte-label col-5">Nombre de salle de vaccination</span>
                                        <input className="form-control inscription-input inscription-inputV12 col-7" disabled={!this.state.update} type="number" value={this.state.nbSalle} onChange={this.handleChange.bind(this,"nbSalle")} placeholder="" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control compte-label col-5">E-mail</span>
                                        <input className="form-control inscription-input inscription-inputV12 col-7" disabled={!this.state.update} type="email" value={this.state.mail} onChange={this.handleChange.bind(this,"mail")}  placeholder=""  />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control compte-label col-5">N° téléphone</span>
                                        <input className="form-control inscription-input inscription-inputV12 col-7" required={true} disabled={!this.state.update} type="tel " value={this.state.phone} onChange={this.handleChange.bind(this,"phone")} placeholder=""  />
                                    </div>
                                </div>
                                <div className="form-group row formgroupCssInscriptionMedecin">
                                    <div className="input-group" data-tip data-for="registerTip">
                                        <span className="form-control compte-label col-5">Nouveau mot de passe</span>
                                        <input className="form-control inscription-input inscription-inputV12 col-7" value={this.state.mdp} disabled={!this.state.update} type="password" onChange={this.handleChange.bind(this,"mdp")}  placeholder="Changer votre mot de passe en tapant un nouveau"/>
                                        <ReactTooltip id="registerTip" place="top" effect="solid">Votre mot de passe doit comporter un chiffre, une majuscule, une minuscule, un caractère spéciale(#,*,%,!...) et au moins 8 caractères </ReactTooltip>
                                        
                                    </div>
                                    <div className="input-group" data-tip data-for="registerTip">
                                        <span className="col-12 progressBarSonOfChildLoggin"><ProgressBar variant={this.getColorPourcentage(this.state.percentageMdp)} now={this.state.percentageMdp} /></span>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control compte-label col-5">Confirmation</span>
                                        <input className="form-control inscription-input inscription-inputV12 col-7 " value={this.state.confirmationMdp} disabled={!this.state.update} type="password" onChange={this.handleChange.bind(this,"confirmationMdp")} placeholder="Confirmation du nouveau mot de passe"/>
                                    </div>
                                    <div className="input-group" hidden={!this.getVerificationMdp()}>
                                        <span className="inscription-label-success col-12">Mot de passe confirmé</span>
                                    </div>
                                </div>
                                {/* <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control compte-label col-5">Photo</span>
                                        <div className="col-7 inscription-input inscription-inputV12">
                                            <div className="custom-file" id="customFile">
                                                <input disabled={!this.state.update} type="file" className="custom-file-input inscription-input" id="exampleInputFile" name="photo" onChange={(e)=>this.onChangeImage(e)} aria-describedby="fileHelp"/>
                                                <label className="custom-file-label" >{(this.state.fileName!=='')? this.state.fileName: 'Choisissez votre photo'} </label>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control compte-label col-5">Durée de vaccination (minutes)</span>
                                        <input className="form-control inscription-input inscription-inputV12 col-7 " required={true} value={this.state.duree} disabled={!this.state.update} type="number" onChange={this.handleChange.bind(this,"duree")} placeholder="en minutes"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="form-group col-md-12">
                                <span className="form-control inscription-label-other col-12">Localisation</span>
                                <div className="mapsLocalisationInscriptionMedecin">
                                    <MapContainer center={[this.state.latitude,this.state.longitude]} zoom={15} scrollWheelZoom={true}>
                                        {this.state.update?<MyComponent dataCenter={this.setDataCenter} />:""}
                                        <TileLayer
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker position={[this.state.latitude,this.state.longitude]}  icon={new L.Icon({
                                                iconUrl: redIcon,
                                                iconRetinaUrl: redIcon,
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
                                </div>
                                </div>
                                <div className="form-group col-md-12">
                                    <span className="form-control inscription-label-other col-md-12">Autres contacts {this.state.update?<a href="#ajout-contact" className="add-button-contact" onClick={()=>this.addContact()}>Ajouter</a>:""}</span>
                                    <div className = "row col-md-12 contact-group">
                                        {this.state.listContact.map((contact,j)=>{
                                            return (
                                            <div className="col-md-12 row each-line-contact" key={j}>
                                                {contact.idContact===null||contact.idContact===undefined?
                                                    <select className="col-md-4" disabled={!this.state.update} value={contact.typeContact.idTypeContact} onChange={this.changeContactType.bind(this,j)}>
                                                        {this.state.listTypeContact.map((typeContact,i)=>{
                                                            return <option key={i} value={typeContact.idTypeContact}>{typeContact.libelleTypeContact}</option>
                                                        })}
                                                    </select>
                                                :<span className="form-control compte-label col-md-4">{contact.typeContact.libelleTypeContact}</span>}
                                                {contact.idContact===null||contact.idContact===undefined?
                                                    <input disabled={!this.state.update} type="text" className="col-md-6" value={contact.contact} onChange={this.changeContactText.bind(this,j)}/>
                                                :<span className="form-control compte-label col-md-4">{contact.contact}</span>}
                                                {contact.idContact===null||contact.idContact===undefined?this.state.update?<a href="#ajout-contact" className="remove-button-contact col-md-1" onClick={()=>this.removeContact(j)}><FontAwesomeIcon icon={faTrashAlt}/></a>:"":""}
                                            </div>)
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group col-md-12 row">
                                <span className="form-control inscription-label-other col-md-12" style={{textAlign:'center'}}>Emploi du temps</span>
                                <div className="col-md-12 emploi-temps-content row">
                                {
                                    this.state.emploiTemps.map((data,i)=>{
                                        return(
                                            <div className="col-md-12 each-line-week row" key={i}>
                                                <div className="col-md-4">
                                                    <label className="switch">
                                                        <input disabled={!this.state.update} type="checkbox" checked={this.state.emploiTemps[i].activation} onChange={this.setSemaineEmploieDuTemps.bind(this,i)}/>
                                                        <span className="slider"></span>
                                                    </label> {data.names}
                                                </div>
                                                <div className="col-md-4" hidden={!this.state.emploiTemps[i].activation}>
                                                    <span>Matin de <select value={this.state.emploiTemps[i].topStart} onChange={(e)=>this.setValueEmploieDuTemps('topStart',i,e)}>{this.generaterTabSelect(0,12)}</select>  &nbsp;&nbsp;à <select value={this.state.emploiTemps[i].topStop} onChange={(e)=>this.setValueEmploieDuTemps('topStop',i,e)}>{this.generaterTabSelect(this.state.emploiTemps[i].topStart,12)}</select></span>
                                                </div>
                                                <div className="col-md-4" hidden={!this.state.emploiTemps[i].activation}>
                                                    <span>Midi de <select value={this.state.emploiTemps[i].bottomStart} onChange={(e)=>this.setValueEmploieDuTemps('bottomStart',i,e)}>{this.generaterTabSelect(12,23)}</select>  &nbsp;&nbsp;à <select value={this.state.emploiTemps[i].bottomStop} onChange={(e)=>this.setValueEmploieDuTemps('bottomStop',i,e)}>{this.generaterTabSelect(this.state.emploiTemps[i].bottomStart!==null?this.state.emploiTemps[i].bottomStart:12,23)}</select></span>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                                </div>
                            </div>
                            <div className="form-group col-md-12 row">
                                {this.state.update?
                                <div className="input-group" data-tip data-for="registerTip">
                                    <span className="form-control compte-label col-5">Mot de passe Actuel</span>
                                    <input className="form-control inscription-input inscription-inputV12 col-7" required={true} value={this.state.oldMdp} disabled={!this.state.update} type="password" onChange={this.handleChange.bind(this,"oldMdp")}  placeholder="Tapez le mot de passe actuel pour confirmer la modification"/>        
                                </div>:""}
                                <div hidden={!this.state.erreurEtat} className="textDePreventionInscriptionMedecin">{this.state.erreurMessage}</div>
                                <div className="boutonConnecterLogin row colDivSupplementaireInscriptionMedecin">
                                    {this.state.update?<button className="bouton-solid-reg col-md-6 popup-with-move-anim a1" hidden={this.state.disableButton} id="sonboutonConnecter" disabled={!this.state.update} type="submit">Enregistrer</button>:""}
                                    <div hidden={!this.state.disableButton} className="login-loader"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}