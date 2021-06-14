import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import './InscriptionCentre.css';
import { fetchGet, fetchPost,fetchPostV2 } from '../../services/global.service';
import verificationMotDePasseEnPourcentage from '../../services/motDePasse.service';
import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import { utile } from '../../services/utile';
import redIcon from '../../assets/icon/marker-icon-2x-red.png';
function MyComponent(props) {
	useMapEvent('click', (e) => {
		props.dataCenter(e.latlng.lat, e.latlng.lng);
	})
	return null;
}

export default class InscriptionCentre extends React.Component{
    constructor(props){
        super();
        this.state = {
            latitude:-18.41106708060209,
            longitude:47.516397059313796,
            // latitude:0,
            // longitude:0,
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
    inscriptionUserMedecin(event) {
		event.preventDefault();
        this.setState({disableButton:true});
		const data = new FormData(event.target);
        var contacts = this.state.listContact;
        if(this.state.phone!=='')
            contacts.push({
                contact: this.state.phone,
                typeContact: {
                    idTypeContact: 1
                }
            })
        if(this.state.mail!=='')
            contacts.push({
                contact: this.state.mail,
                typeContact: {
                    idTypeContact: 2
                }
            })
        this.setState({listContact:contacts});
        const dataCentre = {
            nomCentre:this.state.nomCentre,
            presentation:this.state.presentation,
            infoAcces:this.state.infoAcces,
            nbSalle:this.state.nbSalle,
            adresse:[{
                addrValue:this.state.adresse,
                latitude : this.state.latitude,
                longitude : this.state.longitude,
                district:{
                    idDistrict: this.state.district
                }
            }],
            identifiant:[{
                identifiant: this.state.mail
            },{
                identifiant: this.state.phone
            }],
            emploiTemps:this.getEmploiDuTemps(),
            contact:this.state.listContact,
            photo:this.state.fileName,
            mdp:this.state.mdp,
            dureeVaccination:this.state.duree
        }
        if(this.state.file!==null){
            fetchPost('/covid/ajout-centre',dataCentre).then(result=>{
                if(result.statut === 200){
                    fetchPostV2('http://localhost:5000/photo',data).then((mm)=>{
                        console.log(mm);
                        this.setState({disableButton:false});
                        window.location.replace('/connexion-centre');
                    }).catch(error=>{
                        console.log(error);
                        this.setState({disableButton:false});
                    });
                }else{
                    this.setState({disableButton:false, erreurEtat: true, erreurMessage: result.message});
                }
            }).catch(error=>{
                console.log(error)
                this.setState({disableButton:false, erreurEtat: true, erreurMessage: error.message});
            });
        }
        // if(dataUser!==null && this.state.file!=null){
        //     dataUser.profilPicture=''+this.state.fileName;
        //     console.log('dataUser : ',dataUser);
        //     fetchPost('/medecin/insertionMedecin',dataUser).then(resultatTmp=>{
        //         if(resultatTmp.status === 200){
        //             fetchPostV2('http://localhost:5000/photo',data).then((mm)=>{});console.log("resultatTmp.codeValidation : "+resultatTmp.codeValidation);
        //             //fetch('http://localhost:5000/photo', {method: 'POST',body: data})//
        //             this.setState({fileName:''+date.getDate()+''+date.getMonth()+''+date.getFullYear()+''+this.state.fileName,erreurMessage : "",erreurEtat: false,codeValidation : resultatTmp.codeValidation,etatMenu : 2});
        //             localStorage.setItem('tel',''+this.state.telephone.valuesText);
        //             localStorage.setItem('nom',''+this.state.nom.valuesText);
        //             localStorage.setItem('prenom',''+this.state.prenom.valuesText);
        //             localStorage.setItem('niveau','meddocInscriptionNiveauConfirmation');
        //             window.location.reload(true);
        //         }else if(resultatTmp.status === 300){
        //             this.setState({errorusersms : resultatTmp.message,erroruser: 2});
        //             this.setState({disableButton:false});
        //         }else{
        //             this.setState({errorusersms : resultatTmp.message,erroruser: 3});
        //             this.setState({disableButton:false});
        //         }
        //     });
        // }else{
        //     this.setState({erreurMessage : "Verifiez votre champs si il n'y a un champs vide ou une erreur",erreurEtat: true})
        // }
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
        this.setState({ [param]: e.target.value })
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
    render(){
        // let position = [this.state.latitude?this.state.latitude:-18.0, this.state.longitude?this.state.longitude:47.0];
        return(
            <div className="inscription-centre-container">
                <div className="row">
                    <div className="row marginBottomHeaderInscription">
                        <div className="col-md-12 col-sm-12">
                            <h1 className="titleH1Login"><b>Rejoignez le premier réseau de campagne de vaccination contre la COVID-19! </b></h1>
                            <p className="titlePLogin">C'est le moment de créer votre compte!</p>
                        </div>
                    </div>
                    <div className="col-md-12" style={{marginTop:'5vh'}}>
                        <form className="row" onSubmit={this.inscriptionUserMedecin.bind(this)}>
                            <div className="col-md-7 col-sm-12">
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control inscription-label col-5">Nom du centre</span>
                                        <input className="form-control inscription-input inscription-inputV12 col-7" required={true} type="text" value={this.state.nomCentre} onChange={this.handleChange.bind(this,"nomCentre")} placeholder="" />
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
                                        <span className="form-control inscription-label col-5">Adresse</span>
                                        <input className="form-control inscription-input inscription-inputV12 col-7" required={true} type="text" onChange={this.handleChange.bind(this,"adresse")}  placeholder=""  />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    {/* <div className="input-group"> */}
                                        <span className="form-control inscription-label col-12">Information d'accès</span>
                                        <textarea rows="4" className="inscription-input form-control" value={this.state.infoAcces} onChange={this.handleChange.bind(this,"infoAcces")} placeholder="Décrire les différentes informations pour faciliter la localisation de votre centre (facultatif)"></textarea>
                                    {/* </div> */}
                                </div>
                                <div className="form-group row">
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
                                }
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control inscription-label col-5">Nombre de salle de vaccination</span>
                                        <input className="form-control inscription-input inscription-inputV12 col-7" type="number" value={this.state.nbSalle} onChange={this.handleChange.bind(this,"nbSalle")} placeholder="" />
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
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control inscription-label col-5">Photo</span>
                                        <div className="col-7 inscription-input inscription-inputV12">
                                            <div className="custom-file" id="customFile">
                                                <input type="file" className="custom-file-input inscription-input" id="exampleInputFile" name="photo" onChange={(e)=>this.onChangeImage(e)} aria-describedby="fileHelp"/>
                                                <label className="custom-file-label" >{(this.state.fileName!=='')? this.state.fileName: 'Choisissez votre photo'} </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control inscription-label col-5">Durée de vaccination (minutes)</span>
                                        <input className="form-control inscription-input inscription-inputV12 col-7 " required={true} value={this.state.duree} type="number" onChange={this.handleChange.bind(this,"duree")} placeholder="en minutes"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="form-group col-md-12">
                                <span className="form-control inscription-label-other col-12">Localisation</span>
                                <div className="mapsLocalisationInscriptionMedecin">
                                    <MapContainer center={[this.state.latitude,this.state.longitude]} zoom={15} scrollWheelZoom={true}>
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
                                    <span className="form-control inscription-label-other col-md-12">Autres contacts <a href="#ajout-contact" className="add-button-contact" onClick={()=>this.addContact()}>Ajouter</a></span>
                                    <div className = "row col-md-12 contact-group">
                                        {this.state.listContact.map((contact,j)=>{
                                            return (
                                            <div className="col-md-12 row each-line-contact" key={j}>
                                                <select className="col-md-4" value={contact.typeContact.idTypeContact} onChange={this.changeContactType.bind(this,j)}>
                                                    {this.state.listTypeContact.map((typeContact,i)=>{
                                                        return <option key={i} value={typeContact.idTypeContact}>{typeContact.libelleTypeContact}</option>
                                                    })}
                                                </select>
                                                <input type="text" className="col-md-6" value={contact.contact} onChange={this.changeContactText.bind(this,j)}/>
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