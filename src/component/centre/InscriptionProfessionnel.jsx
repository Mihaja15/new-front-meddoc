import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import './InscriptionCentre.css';
import { fetchGet, fetchPost,fetchPostNotLogged,fetchPostV2 } from '../../services/global.service';
import verificationMotDePasseEnPourcentage from '../../services/motDePasse.service';
import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import { utile } from '../../services/utile';
import redIcon from '../../assets/icon/marker-icon-2x-red.png';
import Select from 'react-select';
import UploadFile from '../dynamics/UploadFile';
function MyComponent(props) {
	useMapEvent('click', (e) => {
		props.dataCenter(e.latlng.lat, e.latlng.lng);
	})
	return null;
}

export default class InscriptionProfessionnel extends React.Component{
    constructor(props){
        super();
        this.state = {
            latitude:-18.41106708060209,
            longitude:47.516397059313796,
            // latitude:0,
            // longitude:0,
            files:[],
            selectedFiles:[],
            listLieu:[],
            listDistrict:[],
            dataDistrict:[],
            listContact:[],
            listTypeContact:[],
            listTypeConsultation:[],
            listLangue:[],
            listPaiement:[],
            diplomes:[],
            experiences:[],
            fraisConsultation:[],
            listSpecialite:[],
            listTypeOrdre:[],
            nom:'',
            prenoms:'',
            sexe:'',
            dateNaissance:'',
            lieuNaissance:'',
            presentation:'',
            numOrdre:'',
            typeOrdre:'',
            specialite:'',
            infoAcces:'',
            adresse:'',
            emploiTemps:utile.createSemaineEmploieDuTemps(),
            phone:'',
            mail:'',
            file:null,
            langue:[],
            paiement:[],
            fileName:'',
            mdp:'',
            district:'',
            duree:0,
            percentageMdp:0,
            confirmationMdp:'',
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
        return false;
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
			top1 = null;
            top2 = null;
            bot1 = null;
            bot2 = null;
			if(data[i].activation){
                if((data[i].topStart!==-1&&data[i].topStart!==null) && (data[i].topStop!==-1&&data[i].topStop!==null)){
                    top1=utile.autocompleteZero(data[i].topStart,2)+":00:00";
                    top2=utile.autocompleteZero(data[i].topStop,2)+":00:00";
                }else if((data[i].topStart!==-1&&data[i].topStart!==null) && (data[i].topStop===-1||data[i].topStop===null)){
                    top1=utile.autocompleteZero(data[i].topStart,2)+":00:00";
                    top2=utile.autocompleteZero(data[i].topStart,2)+":00:00";
                }
                if((data[i].bottomStart!==-1&&data[i].bottomStart!==null) && (data[i].bottomStop!==-1&&data[i].bottomStop!==null)){
                    bot1=utile.autocompleteZero(data[i].bottomStart,2)+":00:00";
                    bot2=utile.autocompleteZero(data[i].bottomStop,2)+":00:00";
                }else if((data[i].bottomStart!==-1&&data[i].bottomStart!==null) && (data[i].bottomStop===-1||data[i].bottomStop===null)){
                    bot1=utile.autocompleteZero(data[i].bottomStart,2)+":00:00";
                    bot2=utile.autocompleteZero(data[i].bottomStart,2)+":00:00";
                }
                if(top1!==null || bot1!==null){
                    newData.push({
                        idUser:this.state.idUser,
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
    inscriptionUserMedecin=(event)=>{
		event.preventDefault();
        this.setState({disableButton:true});
        const contacts = this.state.listContact;
        if(this.state.phone!=='')
            contacts.push({
                valeurContact: this.state.phone,
                typeContact: {
                    idTypeContact: 1
                }
            })
        if(this.state.mail!=='')
            contacts.push({
                valeurContact: this.state.mail,
                typeContact: {
                    idTypeContact: 2
                }
            })
        this.setState({listContact:contacts},function(){
            for(let i =0; i < this.state.listContact.length; i++){
                if((this.state.listContact[i].idTypeContact===4||this.state.listContact[i].idTypeContact===5||this.state.listContact[i].idTypeContact===6||this.state.listContact[i].idTypeContact===7)&&utile.isValidURL(this.state.listContact[i])){
                   alert('La valeur du champs doit être un url :'+this.state.listContact[i].valeurContact);
                   return;
                }
            }
        });
        
        const dataCentre = {
            personne:{
                nom:this.state.nom,
                prenoms:this.state.prenoms,
                sexe:this.state.sexe,
                langue:this.state.langue,
                dateNaissance:this.state.dateNaissance,
                lieuNaissance:this.state.lieuNaissance,
                contact:this.state.listContact,
                adresse:[{
                    informationAdresse:this.state.adresse,
                    informationAcces:this.state.infoAcces,
                    latitude:this.state.latitude,
                    longitude:this.state.longitude,
                    district:{
                        idDistrict:this.state.district
                    }
                }],
                user:{
                    phone:this.state.phone,
                    email:this.state.mail,
                    password:this.state.mdp,
                    typeUser:{
                        idTypeUser:2
                    },
                    statut:{
                        idStatut:0
                    }
                }
            },
            informationMedecin:this.state.presentation,
            emploiTemps:this.getEmploiDuTemps(),
            dureeConsultation:this.state.duree,
            numeroOrdre:this.state.numOrdre,
            typeOrdre:{
                idTypeOrdre:this.state.typeOrdre
            },
            specialite:{
                idSpecialite:this.state.specialite
            },
            modePaiement:this.state.paiement,
            fraisConsultation:this.state.fraisConsultation,
            diplomes:this.state.diplomes,
            experiences:this.state.experiences
        }
        console.log(dataCentre);
        const data = new FormData(event.target);
        data.set('uuid',utile.generateUUID());
        this.state.selectedFiles.forEach(file=>{
            data.append("filesUpload", file);
          });
        if(this.state.selectedFiles.length>0){
            fetchPostV2('http://localhost:5000/fichier',data).then((res)=>{ 
                if(res.status){
                    fetchPostNotLogged('/professionnel/register',dataCentre).then(result=>{
                        if(result.statut === 200){
                            this.setState({disableButton:false});
                            window.location.replace('/connexion-centre');
                        }else{
                            this.setState({disableButton:false, erreurEtat: true, erreurMessage: result.message});
                        }
                    }).catch(error=>{
                        console.log(error)
                        this.setState({disableButton:false, erreurEtat: true, erreurMessage: error.message});
                    });
                }
            }).catch(error=>{
                console.log(error)
            });
        }else{
            fetchPostNotLogged('/professionnel/register',dataCentre).then(result=>{
                if(result.statut === 200){
                    this.setState({disableButton:false});
                    window.location.replace('/connexion-centre');
                }else{
                    this.setState({disableButton:false, erreurEtat: true, erreurMessage: result.message});
                }
            }).catch(error=>{
                console.log(error)
                this.setState({disableButton:false, erreurEtat: true, erreurMessage: error.message});
            });
        }
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
        if(param==="langue"){
            if(e!==null){
                const lang = [];
                for(let i=0;i<e.length;i++){
                    lang.push({
                        idLangue:e[i].value
                    })
                }
                this.setState({ [param]: lang });
            }else
                this.setState({ [param]: null });
        }else if(param==="paiement"){
            if(e!==null){
                const lang = [];
                for(let i=0;i<e.length;i++){
                    lang.push({
                        idModePaiement:e[i].value
                    })
                }
                this.setState({ [param]: lang });
            }else
                this.setState({ [param]: null });
        }else if(param==="district"){
            if(e!==null)
                this.setState({ [param]: e.value });
            else
                this.setState({ [param]: '' });
        }else
            this.setState({ [param]: e.target.value });
    }
    componentDidMount(){
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude
            let lng = position.coords.longitude
            console.log("getCurrentPosition Success " + lat + lng) // logs position correctly
            this.setState({
                latitude: lat,
                longitude: lng
            })
          },
          (error) => {
            // this.props.displayError("Error dectecting your location");
            // console.error(JSON.stringify(error))
            console.error(`ERROR(${error.code}): ${error.message}`);
          },
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
        // this.getDataInStorageAndChangeStage();
        fetchGet('/adresse/find-district-part/all').then(data=>{
            if(data!=null && data.length>=0){
                this.setState({ dataDistrict: data });
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
        fetchGet('/professionnel/listSpecialite').then(data=>{
            console.log(data);
			if(data!=null){
				this.setState({ listSpecialite: data });
			}
        });
        fetchGet('/professionnel/listTypeOrdre').then(data=>{
			if(data!=null){
				this.setState({ listTypeOrdre: data });
			}
        });
        fetchGet('/professionnel/listTypeConsultation').then(data=>{
			if(data!=null){
				this.setState({ listTypeConsultation: data });
			}
        });
        fetchGet('/extra/langue/list').then(data=>{
			if(data!=null){
				this.setState({ listLangue: data });
			}
        });
        fetchGet('/extra/paiement/list').then(data=>{
			if(data!=null){
				this.setState({ listPaiement: data });
			}
        });
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
		}else{
            const data= this.state.emploiTemps;
			if(namesHeure === 'topStart'){
                data[indice].topStart=valeur;
                data[indice].topStop = valeur;
            }
			if(namesHeure === 'topStop'){
                data[indice].topStop=valeur;
            }
			if(namesHeure === 'bottomStart'){
                data[indice].bottomStart=valeur;
                data[indice].bottomStop=valeur;
            }
			if(namesHeure === 'bottomStop'){
                data[indice].bottomStop=valeur;
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
            valeurContact:''
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
        data[indice].valeurContact= event.target.value;
		this.setState({listContact: data});
    }
    changeContactType=(indice, event)=>{
        const data= this.state.listContact;
        data[indice].idTypeContact= event.target.value;
        data[indice].typeContact= {idTypeContact:event.target.value};
		this.setState({listContact: data});
    }
    //experiences
    addExperience=()=>{
        const data = this.state.experiences;
        data.push({
            anneeDebut:null,
            anneeFin:null,
            nomEntite:null,
            description:null
        });
        this.setState({experiences: data});
    }
    removeExperience=(indice)=>{
        const data = this.state.experiences;
        data.splice(indice, 1);
        this.setState({experiences: data});
    }
    changeExperienceAnneeDebut=(indice, event)=>{
        const data= this.state.experiences;
        data[indice].anneeDebut= event.target.value;
		this.setState({experiences: data});
    }
    changeExperienceAnneeFin=(indice, event)=>{
        const data= this.state.experiences;
        data[indice].anneeFin= event.target.value;
		this.setState({experiences: data});
    }
    changeExperienceNomEntite=(indice, event)=>{
        const data= this.state.experiences;
        data[indice].nomEntite= event.target.value;
		this.setState({experiences: data});
    }
    changeExperienceDescription=(indice, event)=>{
        const data= this.state.experiences;
        data[indice].description= event.target.value;
		this.setState({experiences: data});
    }
    //diplomes
    addDiplome=()=>{
        const data = this.state.diplomes;
        data.push({
            anneeObtention:null,
            libelleDiplome:null,
            description:null
        });
        this.setState({diplomes: data});
    }
    removeDiplome=(indice)=>{
        const data = this.state.diplomes;
        data.splice(indice, 1);
        this.setState({diplomes: data});
    }
    changeDiplomeAnneeObtention=(indice, event)=>{
        const data= this.state.diplomes;
        data[indice].anneeObtention= event.target.value;
		this.setState({diplomes: data});
    }
    changeDiplomeLibelleDiplome=(indice, event)=>{
        const data= this.state.diplomes;
        data[indice].libelleDiplome= event.target.value;
		this.setState({diplomes: data});
    }
    changeDiplomeDescription=(indice, event)=>{
        const data= this.state.diplomes;
        data[indice].description= event.target.value;
		this.setState({diplomes: data});
    }
    //diplomes
    addDiplome=()=>{
        const data = this.state.diplomes;
        data.push({
            anneeObtention:null,
            libelleDiplome:null,
            description:null
        });
        this.setState({diplomes: data});
    }
    removeDiplome=(indice)=>{
        const data = this.state.diplomes;
        data.splice(indice, 1);
        this.setState({diplomes: data});
    }
    changeDiplomeAnneeObtention=(indice, event)=>{
        const data= this.state.diplomes;
        data[indice].anneeObtention= event.target.value;
		this.setState({diplomes: data});
    }
    changeDiplomeLibelleDiplome=(indice, event)=>{
        const data= this.state.diplomes;
        data[indice].libelleDiplome= event.target.value;
		this.setState({diplomes: data});
    }
    changeDiplomeDescription=(indice, event)=>{
        const data= this.state.diplomes;
        data[indice].description= event.target.value;
		this.setState({diplomes: data});
    }
    //frais consultation
    addFrais=()=>{
        const data = this.state.fraisConsultation;
        data.push({
            idTypeConsultation:0,
            dateDebut:new Date(),
            frais:null
        });
        this.setState({fraisConsultation: data});
    }
    removeFrais=(indice)=>{
        const data = this.state.fraisConsultation;
        data.splice(indice, 1);
        this.setState({fraisConsultation: data});
    }
    changeFraisDateDebut=(indice, event)=>{
        const data= this.state.fraisConsultation;
        data[indice].dateDebut= event.target.value;
		this.setState({fraisConsultation: data});
    }
    changeFraisValeur=(indice, event)=>{
        const data= this.state.fraisConsultation;
        data[indice].frais= event.target.value;
		this.setState({fraisConsultation: data});
    }
    changeFraisTypeConsultation=(indice, event)=>{
        const data= this.state.fraisConsultation;
        data[indice].idTypeConsultation= event.target.value;
		this.setState({fraisConsultation: data});
    }
    setPhotos=(value)=>{
        this.setState({files:utile.hasValue(value)?value:[]},function(){
            console.log('files: '+this.state.files);
        });
    }
    setSelectedPhotos=(value)=>{
        this.setState({selectedFiles:utile.hasValue(value)?value:[]},function(){
            console.log('selectedFiles: '+this.state.selectedFiles);
        });
    }
    render(){
        // let position = [this.state.latitude?this.state.latitude:-18.0, this.state.longitude?this.state.longitude:47.0];
        return(
            <div className="inscription-centre-container">
                <div className="row">
                    <div className="row marginBottomHeaderInscription">
                        <div className="col-md-12 col-sm-12">
                            <h1 className="titleH1Login"><b>Rejoignez le !</b></h1>
                            <p className="titlePLogin">C'est le moment de créer votre compte!</p>
                        </div>
                    </div>
                    <div className="col-md-12" style={{marginTop:'5vh'}}>
                        <form className="row" onSubmit={this.inscriptionUserMedecin.bind(this)}>
                            <div className="col-md-7 col-sm-12">
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control inscription-label col-5">Nom</span>
                                        <input className="form-control inscription-input inscription-inputV12 col-7" required={true} type="text" value={this.state.nom} onChange={this.handleChange.bind(this,"nom")} placeholder="" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control inscription-label col-5">Prénom(s)</span>
                                        <input className="form-control inscription-input inscription-inputV12 col-7" required={true} type="text" value={this.state.prenoms} onChange={this.handleChange.bind(this,"prenoms")} placeholder="" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control inscription-label col-5">Sexe</span>
                                        <select className="form-control inscription-input inscription-inputV12 col-7" required={true} value={this.state.sexe} onChange={this.handleChange.bind(this,"sexe")}  >
                                            <option value=''>Sélectionner</option>
                                            <option value={1}>Homme</option>
                                            <option value={2}>Femme</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control inscription-label col-5">Langue(s)</span>
                                        <Select onChange={this.handleChange.bind(this,"langue")} className="col-7" isClearable={true} isMulti placeholder="" closeMenuOnSelect={false} options={this.state.listLangue} />
                                        {/* <select className="form-control inscription-input inscription-inputV12 col-7" required={true} value={this.state.sexe} onChange={this.handleChange.bind(this,"sexe")}  >
                                            { this.state.listLangue.map((langue,i) => {
                                                return(
                                                <option value={langue.idLangue} key={i}>
                                                    {langue.libelle}
                                                </option>
                                                )
                                            })}
                                        </select> */}
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control inscription-label col-5">Date de naissance</span>
                                        <input className="form-control inscription-input inscription-inputV12 col-7" required={true} type="date" value={this.state.dateNaissance} onChange={this.handleChange.bind(this,"dateNaissance")}  placeholder=""  />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control inscription-label col-5">Lieu de naissance</span>
                                        <input className="form-control inscription-input inscription-inputV12 col-7" required={true} type="text" value={this.state.lieuNaissance} onChange={this.handleChange.bind(this,"lieuNaissance")}  placeholder=""  />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    {/* <div className="input-group"> */}
                                        <span className="form-control inscription-label col-12">Présentation</span>
                                        <textarea rows="4" className="inscription-input form-control" value={this.state.presentation} onChange={this.handleChange.bind(this,"presentation")} placeholder="Texte de présentation qui apparaîtra sur votre profil (facultatif)"></textarea>
                                    {/* </div> */}
                                </div>
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control inscription-label col-5">Ordre</span>
                                        <select className="form-control inscription-input inscription-inputV12 col-7" required={true} value={this.state.typeOrdre} onChange={this.handleChange.bind(this,"typeOrdre")}  >
                                            <option value=''></option>
                                            { this.state.listTypeOrdre.map((ordre,i) => {
                                                    return(
                                                    <option value={ordre.idTypeOrdre} key={i}>
                                                        {ordre.libelle}
                                                    </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control inscription-label col-5">Numéro ordre</span>
                                        <input className="form-control inscription-input inscription-inputV12 col-7" required={true} type="text" value={this.state.numOrdre} onChange={this.handleChange.bind(this,"numOrdre")}  placeholder=""  />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control inscription-label col-5">Spécialité</span>
                                        <select className="form-control inscription-input inscription-inputV12 col-7" required={true} value={this.state.specialite} onChange={this.handleChange.bind(this,"specialite")}  >
                                            <option value=''></option>
                                            { this.state.listSpecialite.map((spec,i) => {
                                                    return(
                                                    <option value={spec.idSpecialite} key={i}>
                                                        {spec.libelle}
                                                    </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control inscription-label col-5">Durée de consultation (minutes)</span>
                                        <input className="form-control inscription-input inscription-inputV12 col-7 " required={true} value={this.state.duree} type="number" onChange={this.handleChange.bind(this,"duree")} placeholder="en minutes"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control inscription-label col-5">Adresse</span>
                                        <input className="form-control inscription-input inscription-inputV12 col-7" required={true} type="text" onChange={this.handleChange.bind(this,"adresse")}  placeholder=""  />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control inscription-label col-5">District</span>
                                        <Select onChange={this.handleChange.bind(this,"district")} className="col-7" isClearable={true} placeholder="District" options={this.state.dataDistrict} />
                                    </div>
                                </div>
                                {/* <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control inscription-label col-5">Province</span>
                                        <select className="form-control inscription-input inscription-inputV12 col-7" required={true} onChange={this.handleChange.bind(this,"province")}  >
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
                                                <span className="form-control inscription-label col-5">District</span>
                                                <select className="form-control  inscription-input inscription-inputV12 col-7" required={true} onChange={this.handleChange.bind(this,"district")}>
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
                                } */}
                                <div className="form-group row">
                                    {/* <div className="input-group"> */}
                                        <span className="form-control inscription-label col-12">Information d'accès</span>
                                        <textarea rows="4" className="inscription-input form-control" value={this.state.infoAcces} onChange={this.handleChange.bind(this,"infoAcces")} placeholder="Décrire les différentes informations pour faciliter votre localisation (facultatif)"></textarea>
                                    {/* </div> */}
                                </div>
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control inscription-label col-5">Moyen(s) de paiement</span>
                                        <Select onChange={this.handleChange.bind(this,"paiement")} className="col-7" isClearable={true} isMulti placeholder="" closeMenuOnSelect={false} options={this.state.listPaiement} />
                                        {/* <select className="form-control inscription-input inscription-inputV12 col-7" required={true} value={this.state.sexe} onChange={this.handleChange.bind(this,"sexe")}  >
                                            { this.state.listLangue.map((langue,i) => {
                                                return(
                                                <option value={langue.idLangue} key={i}>
                                                    {langue.libelle}
                                                </option>
                                                )
                                            })}
                                        </select> */}
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control inscription-label col-5">E-mail</span>
                                        <input className="form-control inscription-input inscription-inputV12 col-7" type="email" value={this.state.mail} onChange={this.handleChange.bind(this,"mail")}  placeholder=""  />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control inscription-label col-5">N° téléphone</span>
                                        <input className="form-control inscription-input inscription-inputV12 col-7" required={true} type="tel " value={this.state.phone} onChange={this.handleChange.bind(this,"phone")} placeholder=""  />
                                    </div>
                                </div>
                                <div className="form-group row formgroupCssInscriptionMedecin">
                                    <div className="input-group" data-tip data-for="registerTip">
                                        <span className="form-control inscription-label col-5">Mot de passe</span>
                                        <input className="form-control inscription-input inscription-inputV12 col-7" required={true} value={this.state.mdp} type="password" onChange={this.handleChange.bind(this,"mdp")}  placeholder=""/>
                                        <ReactTooltip id="registerTip" place="top" effect="solid">Votre mot de passe doit comporter un chiffre, une majuscule, une minuscule, un caractère spéciale(#,*,%,!...) et au moins 8 caractères </ReactTooltip>
                                        
                                    </div>
                                    <div className="input-group" data-tip data-for="registerTip">
                                        <span className="col-12 progressBarSonOfChildLoggin"><ProgressBar variant={this.getColorPourcentage(this.state.percentageMdp)} now={this.state.percentageMdp} /></span>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control inscription-label col-5">Confirmation</span>
                                        <input className="form-control inscription-input inscription-inputV12 col-7 " required={true} value={this.state.confirmationMdp} type="password" onChange={this.handleChange.bind(this,"confirmationMdp")} placeholder=""/>
                                    </div>
                                    <div className="input-group" hidden={!this.getVerificationMdp()}>
                                        <span className="inscription-label-success col-12">Mot de passe confirmé</span>
                                    </div>
                                </div>
                                {/* <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control inscription-label col-5">Photo</span>
                                        <div className="col-7 inscription-input inscription-inputV12">
                                            <div className="custom-file" id="customFile">
                                                <input type="file" className="custom-file-input inscription-input" id="exampleInputFile" name="photo" onChange={(e)=>this.onChangeImage(e)} aria-describedby="fileHelp"/>
                                                <label className="custom-file-label" >{(this.state.fileName!=='')? this.state.fileName: 'Choisissez votre photo'} </label>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            <div className="col-md-5">
                                <div className="form-group col-md-12">
                                    <span className="form-control inscription-label-other col-12">Localisation</span>
                                    <div className="mapsLocalisationInscriptionMedecin">
                                        <MapContainer center={[this.state.latitude,this.state.longitude]} style={{zIndex:"-1"}} zoom={15} scrollWheelZoom={true}>
                                            <MyComponent dataCenter={this.setDataCenter} />
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
                                    <span className="form-control inscription-label-other col-md-12">Expérience(s) <a href="#ajout-experience" className="add-button-contact" onClick={()=>this.addExperience()}>Ajouter</a></span>
                                    <div className = "col-md-12 contact-group">
                                        {this.state.experiences.map((exp,j)=>{
                                            return (
                                            <div className="col-md-12 row each-line-experience" key={j}>
                                                <label className="col-md-2">De</label>
                                                <select className="col-md-5" value={exp.anneeDebut} onChange={this.changeExperienceAnneeDebut.bind(this,j)}>
                                                    <option>début</option>
                                                    {utile.createTableauNumberSelect(1920,utile.getYearFromActual()).map((year,i)=>{
                                                        return <option key={i} value={year.value}>{year.label}</option>
                                                    })}
                                                </select>
                                                <label className="col-md-1"> à </label>
                                                <select className="col-md-3" value={exp.anneeFin} onChange={this.changeExperienceAnneeFin.bind(this,j)}>
                                                    <option>fin</option>
                                                    {utile.createTableauNumberSelect(exp.anneeDebut!==null?exp.anneeDebut:0,utile.getYearFromActual()).map((year,i)=>{
                                                        return <option key={i} value={year.value}>{year.label}</option>
                                                    })}
                                                </select>
                                                <input type="text" className="col-md-12" placeholder="Institut de travail" value={exp.nomEntite} onChange={this.changeExperienceNomEntite.bind(this,j)}/>
                                                <textarea rows="2" className="col-md-12" value={exp.description} onChange={this.changeExperienceDescription.bind(this,j)} placeholder="Description du poste occupé"></textarea>
                                                <a href="#ajout-contact" className="remove-button-contact col-md-12" onClick={()=>this.removeExperience(j)}>Supprimer</a>
                                            </div>)
                                        })}
                                    </div>
                                </div>
                                <div className="form-group col-md-12">
                                    <span className="form-control inscription-label-other col-md-12">Diplôme(s) <a href="#ajout-experience" className="add-button-contact" onClick={()=>this.addDiplome()}>Ajouter</a></span>
                                    <div className = "col-md-12 contact-group">
                                        {this.state.diplomes.map((diplome,j)=>{
                                            return (
                                            <div className="col-md-12 row each-line-experience" key={j}>
                                                <label className="col-md-8">Année d'obtention du diplôme</label>
                                                <select className="col-md-4" value={diplome.anneeObtention} onChange={this.changeDiplomeAnneeObtention.bind(this,j)}>
                                                    {utile.createTableauNumberSelect(1920,utile.getYearFromActual()).map((year,i)=>{
                                                        return <option key={i} value={year.value}>{year.label}</option>
                                                    })}
                                                </select>
                                                <input type="text" className="col-md-12" placeholder="Titre du diplôme" value={diplome.libelleDiplome} onChange={this.changeDiplomeLibelleDiplome.bind(this,j)}/>
                                                <textarea rows="2" className="col-md-12" value={diplome.description} onChange={this.changeDiplomeDescription.bind(this,j)} placeholder="Description du diplôme"></textarea>
                                                <a href="#ajout-contact" className="remove-button-contact col-md-12" onClick={()=>this.removeDiplome(j)}>Supprimer</a>
                                            </div>)
                                        })}
                                    </div>
                                </div>
                                <div className="form-group col-md-12">
                                    <span className="form-control inscription-label-other col-md-12">Frais de consultation<a href="#ajout-experience" className="add-button-contact" onClick={()=>this.addFrais()}>Ajouter</a></span>
                                    <div className = "row col-md-12 contact-group">
                                        {this.state.fraisConsultation.map((frais,j)=>{
                                            return (
                                            <div className="col-md-12 row each-line-contact" key={j}>
                                                <select className="col-md-6" value={frais.idTypeConsultation} onChange={this.changeFraisTypeConsultation.bind(this,j)}>
                                                    {this.state.listTypeConsultation.map((typeConsultation,i)=>{
                                                        return <option key={i} value={typeConsultation.idTypeConsultation}>{typeConsultation.libelle}</option>
                                                    })}
                                                </select>
                                                <input type="number" className="col-md-4" placeholder="Frais de consultation" value={frais.frais} onChange={this.changeFraisValeur.bind(this,j)}/>
                                                <a href="#ajout-contact" className="remove-button-contact col-md-2" onClick={()=>this.removeFrais(j)}>Supprimer</a>
                                            </div>)
                                        })}
                                    </div>
                                </div>
                                <div className="form-group col-md-12">
                                    <span className="form-control inscription-label-other col-md-12">Autres contacts <a href="#ajout-contact" className="add-button-contact" onClick={()=>this.addContact()}>Ajouter</a></span>
                                    <div className = "row col-md-12 contact-group">
                                        {this.state.listContact.map((contact,j)=>{
                                            return (
                                            <div className="col-md-12 row each-line-contact" key={j}>
                                                <select className="col-md-4" value={contact.typeContact.idTypeContact} onChange={this.changeContactType.bind(this,j)}>
                                                    {this.state.listTypeContact.map((typeContact,i)=>{
                                                        return <option key={i} value={typeContact.idTypeContact}>{typeContact.libelle}</option>
                                                    })}
                                                </select>
                                                <input type={contact.idTypeContact===4||contact.idTypeContact===5||contact.idTypeContact===6?"url":"text"} className="col-md-6" value={contact.valeurContact} onChange={this.changeContactText.bind(this,j)}/>
                                                <a href="#ajout-contact" className="remove-button-contact col-md-2" onClick={()=>this.removeContact(j)}>Supprimer</a>
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
                                                        <input type="checkbox" checked={this.state.emploiTemps[i].activation} onChange={this.setSemaineEmploieDuTemps.bind(this,i)}/>
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
                                <span className="form-control inscription-label-other col-md-12" style={{textAlign:'center'}}>Photos de diplômes ou du cabinet</span>
                                <div className="col-md-12 emploi-temps-content row"><UploadFile setFiles={this.setPhotos} setSelectedFiles={this.setSelectedPhotos}/></div>
                            </div>
                            <div className="form-group col-md-12 row">
                                <div hidden={!this.state.erreurEtat} className="textDePreventionInscriptionMedecin">{this.state.erreurMessage}</div>
                                <div className="textDePreventionInscriptionMedecin" hidden={this.state.erroruser<=1}>{this.state.errorusersms} <a href="/login-meddoc" hidden={this.state.erroruser!==2}>sinon connectez vous on cliquant ici</a></div>
                                <div className="boutonConnecterLogin row colDivSupplementaireInscriptionMedecin">
                                    <button className="bouton-solid-reg col-md-6 popup-with-move-anim a1" hidden={this.state.disableButton} id="sonboutonConnecter" type="submit">S'inscrire</button>
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