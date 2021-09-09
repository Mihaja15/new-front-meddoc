import React from 'react';
import Select from 'react-select';
import { ProgressBar } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import './InscriptionPro.css';
import verificationMotDePasseEnPourcentage from '../../services/motDePasse.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { fetchGet } from '../../services/global.service';
import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import redIcon from '../../assets/icon/marker-icon-2x-red.png';
import { utile } from '../../services/utile';
import UploadFile from '../dynamics/UploadFile';
const styles = {
    container: base => ({
        ...base,
        padding:0,
        borderRadius:12,
    }),
    control: base => ({
        ...base,
        fontSize: 16,
        borderRadius: 12,
        borderTopLeftRadius:0,
        borderBottomLeftRadius:0,
        textAlign: "left",
        cursor: "pointer",
        boxShadow: 'none'
    }),
    indicatorSeparator: base => ({
        ...base,
        display: "none"
    }),
    valueContainer: base => ({
        ...base,
        padding: 0,
        paddingLeft: 2,
    })
}
function MyComponent(props) {
	useMapEvent('click', (e) => {
		props.dataCenter(e.latlng.lat, e.latlng.lng);
	})
	return null;
}
export default class InscriptionPro extends React.Component{
    constructor(props){
        super(props);
        this.state={
            step:1,
            validStep:1,
            //files
            files:[],
            selectedFiles:[],
            //pauements
            listPaiement:[],
            paiement:[],
            //langues
            listLangue:[],
            langue:[],
            //adresse
            dataDistrict:[],
            latitude:0,
            longitude:0,
            //specialite
            listSpecialite:[],
            specialite:'',
            //ordre
            listTypeOrdre:[],
            numOrdre:'',
            typeOrdre:'',
            //contact
            listContact:[],
            numero:'',
            //diplomes
            diplomes:[],
            anneeDiplome:'',
            libelleDiplome:'',
            descriptionDiplome:'',
            //experiences
            experiences:[],
            debutExperience:'',
            finExperience:'',
            entiteExperience:'',
            descriptionExperience:'',
            //ouvrages
            ouvrages:[],
            dateOuvrage:'',
            titreOuvrage:'',
            lienOuvrage:'',
            //tags
            tags:[],
            tag:'',
            //info user
            nom:'',
            prenoms:'',
            sexe:'',
            civilite:'',
            infoAcces:'',
            adresse:'',
            phone:'',
            mail:'',
            file:null,
            mdp:'',
            district:'',
            duree:0,
            percentageMdp:0,
            confirmationMdp:'',
            disableButton:false,
            erreurMessage:'',
            erreurEtat:false,
            emploiTemps:utile.createSemaineEmploieDuTemps(),
        }
    }
    setDataCenter=(lats,lngs)=>{
        this.setState({latitude : lats,longitude : lngs});
	}
    handleChange = (param, e) => {
        // console.log(e.value)
        if(param==="mdp"){
            this.setState({percentageMdp:verificationMotDePasseEnPourcentage(e.target.value)});
        }
        if(param==='sexe'){
            if(e.target.value==='1')this.setState({civilite:'Mr'})
            else if(e.target.value==='2')this.setState({civilite:'Mme'})
            else this.setState({civilite:''})
        }
        if(e.target!==undefined)
            this.setState({[param]:e.target.value})
        else if(e.value!==undefined)
            this.setState({[param]:e.vale})
        else
            this.setState({[param]:e})        

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
    //contact
    addContact=(idTypeContact)=>{
        if(this.state.numero!==''){
            const data = this.state.listContact;
            data.push({
                typeContact:{
                    idTypeContact:idTypeContact
                },
                valeurContact:this.state.numero
            });
            this.setState({listContact: data, numero:''});
        }
    }
    removeContact=(indice)=>{
        const data = this.state.listContact;
        data.splice(indice, 1);
        this.setState({listContact: data});
    }
    //experiences
    addExperience=()=>{
        if(this.state.debutExperience!==''&&this.state.entiteExperience!==''){
            const data = this.state.experiences;
            data.push({
                anneeDebut:this.state.debutExperience,
                anneeFin:this.state.finExperience,
                nomEntite:this.state.entiteExperience,
                description:this.state.descriptionExperience
            });
            this.setState({experiences: data, debutExperience:'', finExperience:'', entiteExperience:'', descriptionExperience:''});
        }
    }
    removeExperience=(indice)=>{
        const data = this.state.experiences;
        data.splice(indice, 1);
        this.setState({experiences: data});
    }
    //diplomes
    addDiplome=()=>{
        if(this.state.anneeDiplome!==''&&this.state.libelleDiplome!==''){
            const data = this.state.diplomes;
            data.push({
                anneeObtention:this.state.anneeDiplome,
                libelleDiplome:this.state.libelleDiplome,
                description:this.state.descriptionDiplome
            });
            this.setState({diplomes: data, anneeDiplome:'', libelleDiplome:'', descriptionDiplome:''});
        }
    }
    removeDiplome=(indice)=>{
        const data = this.state.diplomes;
        data.splice(indice, 1);
        this.setState({diplomes: data});
    }
    //ouvrages
    addOuvrage=()=>{
        if(this.state.dateOuvrage!==''&&this.state.titreOuvrage!==''&&this.state.lienOuvrage!==''){
            const data = this.state.ouvrages;
            data.push({
                datePublication:this.state.dateOuvrage,
                titre:this.state.titreOuvrage,
                lien:this.state.lienOuvrage
            });
            this.setState({ouvrages: data, dateOuvrage:'', titreOuvrage:'', lienOuvrage:''});
        }
    }
    removeOuvrage=(indice)=>{
        const data = this.state.ouvrages;
        data.splice(indice, 1);
        this.setState({ouvrages: data});
    }
    //tags
    addTag=()=>{
        if(this.state.tag!==''){
            const data = this.state.tags;
            data.push({
                motCle:this.state.tag
            });
            this.setState({tags: data, tag:''});
        }
    }
    removeTag=(indice)=>{
        const data = this.state.tags;
        data.splice(indice, 1);
        this.setState({tags: data});
    }
    changeShow=(value)=>{
        this.setState({erreurEtat:value});
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
                //console.log(this.state.emploiTemps)
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
                //console.log(this.state.emploiTemps)
            });
        }
	}
    componentDidMount(){
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude
            let lng = position.coords.longitude
            this.setState({
                latitude: lat,
                longitude: lng
            },function(){
                console.log(this.state.latitude+' '+this.state.longitude)
            })
          },
          (error) => {
            console.error(`ERROR(${error.code}): ${error.message}`);
          },
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
        fetchGet('/adresse/find-district-part/all').then(data=>{
            if(data!=null && data.length>=0){
                this.setState({ dataDistrict: data });
            }
        });
        fetchGet('/professionnel/listSpecialite').then(data=>{
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
                console.log(data)
			}
        });
        fetchGet('/extra/paiement/list').then(data=>{
			if(data!=null){
				this.setState({ listPaiement: data });
			}
        });
    }
    checkData=()=>{
        this.setState({step:this.state.step<5?(this.state.step+1):5},function(){
            this.setState({validStep:this.state.step});
        });
        window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
    }
    setPhotos=(value)=>{
        this.setState({files:utile.hasValue(value)?value:[]});
    }
    setSelectedPhotos=(value)=>{
        this.setState({selectedFiles:utile.hasValue(value)?value:[]});
    }
    getFormByStep=(step)=>{
        if(step===1){
            return(
                    <div className="col-md-12">
                        <h2 className="col-12">Titulaire</h2>
                        <div className="form-group">
                            <div className="input-group">
                                <label className="col-md-4">Nom</label>
                                <input className="form-control col-md-8" required={this.state.step===1} type="text" value={this.state.nom} onChange={this.handleChange.bind(this,"nom")} placeholder="" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <label className="col-md-4">Prénom(s)</label>
                                <input className="form-control col-md-8" required={this.state.step===1} type="text" value={this.state.prenoms} onChange={this.handleChange.bind(this,"prenoms")} placeholder="" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <label className="col-md-4">Sexe</label>
                                <select className="form-control col-md-8" required={this.state.step===1} value={this.state.sexe} onChange={this.handleChange.bind(this,"sexe")}  >
                                    <option value=''>Sélectionner</option>
                                    <option value={1}>Homme</option>
                                    <option value={2}>Femme</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <label className="col-md-2">Civilité</label>
                                <span className="col-md-2 col-sm-2 col-4">
                                    <label className="special-radio" htmlFor="mlle">Mlle
                                        <input type="radio" id="mlle" checked={this.state.civilite==="Mlle"} value="Mlle" name="radio" onChange={this.handleChange.bind(this, 'civilite')}/>
                                        <span className="special-radio-checkmark"></span>
                                    </label>
                                </span>
                                <span className="col-md-2 col-sm-2 col-4">
                                    <label className="special-radio" htmlFor="mme">Mme
                                        <input type="radio" id="mme" checked={this.state.civilite==="Mme"} value="Mme" name="radio" onChange={this.handleChange.bind(this, 'civilite')}/>
                                        <span className="special-radio-checkmark"></span>
                                    </label>
                                </span>
                                <span className="col-md-2 col-sm-2 col-4">
                                    <label className="special-radio" htmlFor="mr">Mr
                                        <input type="radio" id="mr" checked={this.state.civilite==="Mr"} value="Mr" name="radio" onChange={this.handleChange.bind(this, 'civilite')}/>
                                        <span className="special-radio-checkmark"></span>
                                    </label>
                                </span>
                                <span className="col-md-2 col-sm-2 col-4">
                                    <label className="special-radio" htmlFor="dr">Dr
                                        <input type="radio" id="dr" checked={this.state.civilite==="Dr"} value="Dr" name="radio" onChange={this.handleChange.bind(this, 'civilite')}/>
                                        <span className="special-radio-checkmark"></span>
                                    </label>
                                </span>
                                <span className="col-md-2 col-sm-2 col-4">
                                    <label className="special-radio" htmlFor="pr">Pr
                                        <input type="radio" id="pr" checked={this.state.civilite==="Pr"} value="Pr" name="radio" onChange={this.handleChange.bind(this, 'civilite')}/>
                                        <span className="special-radio-checkmark"></span>
                                    </label>
                                </span>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <label className="col-md-4">Ordre</label>
                                <select className="form-control col-md-8" required={this.state.step===1} value={this.state.typeOrdre} onChange={this.handleChange.bind(this,"typeOrdre")}  >
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
                        <div className="form-group">
                            <div className="input-group">
                                <label className="col-md-4">Numéro ordre</label>
                                <input className="form-control col-md-8" required={this.state.step===1} type="text" value={this.state.numOrdre} onChange={this.handleChange.bind(this,"numOrdre")}  placeholder=""  />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <label className="col-md-4">Spécialité</label>
                                <select className="form-control col-md-8" required={this.state.step===1} value={this.state.specialite} onChange={this.handleChange.bind(this,"specialite")}  >
                                    <option value=''></option>
                                    {this.state.listSpecialite.map((spec,i) => {
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
                        <div className="form-group">
                            <div className="input-group">
                                <label className="col-md-4">N° téléphone</label>
                                <div className="form-control phone col-md-7 col-sm-10 col-10">
                                    <input className={this.state.numero===''?"col-12":"col-11"} min="0" type="number" value={this.state.numero} onChange={this.handleChange.bind(this,"numero")}  placeholder=""/>
                                    <b className="col-1" style={{display:this.state.numero===''?'none':''}} onClick={()=>this.setState({numero:''})}>&times;</b>
                                </div>
                                <a className="col-md-1 col-sm-2 col-xs-2 col-2 add" onClick={()=>this.addContact(0)}><FontAwesomeIcon icon={faPlus}/></a>
                            </div>
                        </div>
                        <div className="form-group" style={{display:this.state.listContact.length===0?'none':''}}>
                            <div className="input-group">
                                <ul className="col-md-12 row">{this.state.listContact.map((contact,j)=>{
                                    return (
                                    <li className="col-md-12" key={j}>
                                        <span className="col-6 col-sm-6 col-md-6">{contact.valeurContact}</span>
                                        <a className="col-6 col-sm-6 col-md-2 delete" onClick={()=>this.removeContact(j)}>Supprimer</a>
                                    </li>)
                                })}</ul>
                            </div>
                        </div>
                    </div>
            )
        } else if(step===2){
            return(
                <div className="col-md-12">
                    <h2 className="col-12">Présentez-vous</h2>
                    <div className="form-group">
                        <div className="input-group">
                            <label className="col-md-4">Présentation</label>
                            <textarea rows="4" className="col-md-8 form-control" value={this.state.presentation} required={this.state.step===2} onChange={this.handleChange.bind(this,"presentation")} placeholder="Texte de présentation qui apparaîtra sur votre profil (facultatif)"></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <label className="col-md-4">Expérience(s)</label>
                            <div className="form-control experience col-md-7 col-sm-10 col-10">
                                <select className="col-md-6" value={this.state.debutExperience} onChange={this.handleChange.bind(this,'debutExperience')}>
                                    <option>Début (année)</option>
                                    {utile.createTableauNumberSelect(1920,utile.getYearFromActual()).map((year,i)=>{
                                        return <option key={i} value={year.value}>{year.label}</option>
                                    })}
                                </select>
                                <select className="col-md-6" value={this.state.finExperience} onChange={this.handleChange.bind(this,'finExperience')}>
                                    <option>Fin (année)</option>
                                    {utile.createTableauNumberSelect(this.state.debutExperience!==''?this.state.debutExperience:1920,utile.getYearFromActual()).map((year,i)=>{
                                        return <option key={i} value={year.value}>{year.label}</option>
                                    })}
                                </select>
                                <input className="col-md-12" type="text" value={this.state.entiteExperience} onChange={this.handleChange.bind(this,"entiteExperience")}  placeholder="Entité / Institut de travail"/>
                                <textarea rows="2" className="col-md-12" value={this.state.descriptionExperience} onChange={this.handleChange.bind(this,"descriptionExperience")} placeholder="Description du poste occupé (facultatif)"></textarea>
                            </div>
                            <a className="col-md-1 col-sm-2 col-xs-2 col-2 add" onClick={()=>this.addExperience()}><FontAwesomeIcon icon={faPlus}/></a>
                        </div>
                    </div>
                    <div className="form-group" style={{display:this.state.experiences.length===0?'none':''}}>
                        <div className="input-group">
                            <ul className="col-md-12 list-experience row">{this.state.experiences.map((exp,j)=>{
                                return (
                                <li className="col-md-12" key={j}>
                                    <div className="col-10">
                                        <span className="col-12">{exp.anneeDebut+(utile.hasValue(exp.anneeFin)?'-'+exp.anneeFin:'')+' : '+exp.nomEntite}</span>
                                        <span className="col-12">{exp.description}</span>
                                    </div>
                                    <a className="col-2 delete" onClick={()=>this.removeExperience(j)}>Supprimer</a>
                                </li>)
                            })}</ul>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <label className="col-md-4">Diplôme(s)</label>
                            <div className="form-control experience col-md-7 col-sm-10 col-10">
                                <select className="col-md-6" value={this.state.anneeDiplome} onChange={this.handleChange.bind(this,'anneeDiplome')}>
                                    <option>Obtention (année)</option>
                                    {utile.createTableauNumberSelect(1920,utile.getYearFromActual()).map((year,i)=>{
                                        return <option key={i} value={year.value}>{year.label}</option>
                                    })}
                                </select>
                                <input className="col-md-6" type="text" value={this.state.libelleDiplome} onChange={this.handleChange.bind(this,"libelleDiplome")}  placeholder="Diplôme obtenu"/>
                                <textarea rows="2" className="col-md-12" value={this.state.descriptionDiplome} onChange={this.handleChange.bind(this,"descriptionDiplome")} placeholder="Description du diplôme (facultatif)"></textarea>
                            </div>
                            <a className="col-md-1 col-sm-2 col-xs-2 col-2 add" onClick={()=>this.addDiplome()}><FontAwesomeIcon icon={faPlus}/></a>
                        </div>
                    </div>
                    <div className="form-group" style={{display:this.state.diplomes.length===0?'none':''}}>
                        <div className="input-group">
                            <ul className="col-md-12 list-experience row">{this.state.diplomes.map((diplome,j)=>{
                                return (
                                <li className="col-md-12" key={j}>
                                    <div className="col-10">
                                        <span className="col-12">{diplome.anneeObtention+' : '+diplome.libelleDiplome}</span>
                                        <span className="col-12">{diplome.description}</span>
                                    </div>
                                    <a className="col-2 delete" onClick={()=>this.removeDiplome(j)}>Supprimer</a>
                                </li>)
                            })}</ul>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <label className="col-md-4">Langue(s)</label>
                            <Select 
                                onChange={this.handleChange.bind(this,"langue")} options={this.state.listLangue}
                                className="col-md-8" styles={styles} isClearable={true} isMulti placeholder="Langue(s) parlée(s)" closeMenuOnSelect={false} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <label className="col-md-4">Site(s) web dédié(s) à votre activité</label>
                            <div className="form-control experience col-md-8">
                                <svg fill="#b2d1db" className="col-2" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" width="30" height="30"><path d="M 19.253906 2 C 15.311906 2 13 4.0821719 13 8.8261719 L 13 13 L 8 13 L 8 18 L 13 18 L 13 30 L 18 30 L 18 18 L 22 18 L 23 13 L 18 13 L 18 9.671875 C 18 7.884875 18.582766 7 20.259766 7 L 23 7 L 23 2.2050781 C 22.526 2.1410781 21.144906 2 19.253906 2 z"/></svg>
                                <input className="col-10" type="url" value={this.state.facebook} pattern="https://.*" onChange={this.handleChange.bind(this,"facebook")}  placeholder="Lien facebook (https)" />

                                <svg xmlns="http://www.w3.org/2000/svg"  className="col-2" fill="#b2d1db" width="30" height="30" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                </svg>
                                <input className="col-10" type="url" value={this.state.twitter} pattern="https://.*" onChange={this.handleChange.bind(this,"twitter")}  placeholder="Lien twitter (https)" />
                                
                                <svg  className="col-2" xmlns="http://www.w3.org/2000/svg" fill="#b2d1db" width="30" height="30" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                                <input className="col-10" type="url" value={this.state.linkedin} pattern="https://.*" onChange={this.handleChange.bind(this,"linkedin")}  placeholder="Lien LinkedIn (https)" />
                                
                                <svg className="col-2" xmlns="http://www.w3.org/2000/svg" id="_x31__x2C_5" enableBackground="new 0 0 24 24" fill="#b2d1db" height="30" viewBox="0 0 24 24" width="30">
                                    <path d="m21.25 23h-18.5c-1.517 0-2.75-1.233-2.75-2.75v-16.5c0-1.517 1.233-2.75 2.75-2.75h18.5c1.517 0 2.75 1.233 2.75 2.75v16.5c0 1.517-1.233 2.75-2.75 2.75zm-18.5-20.5c-.689 0-1.25.561-1.25 1.25v16.5c0 .689.561 1.25 1.25 1.25h18.5c.689 0 1.25-.561 1.25-1.25v-16.5c0-.689-.561-1.25-1.25-1.25z"/>
                                    <path d="m23.25 6h-22.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h22.5c.414 0 .75.336.75.75s-.336.75-.75.75z"/>
                                    <path d="m11.742 16.399c-.804 0-1.605-.311-2.217-.925l-3.107-3.126c-.591-.585-.918-1.373-.918-2.214s.327-1.629.922-2.219c1.145-1.17 3.238-1.185 4.422.003l.534.535c.292.293.292.768-.001 1.061-.293.292-.769.292-1.061-.002l-.534-.535c-.613-.616-1.7-.613-2.296-.005-.316.314-.486.724-.486 1.162s.17.848.479 1.154l3.109 3.129c.596.596 1.535.646 2.184.11.32-.262.794-.216 1.056.104.263.32.216.792-.104 1.056-.581.477-1.283.712-1.982.712z"/>
                                    <path d="m15.368 20c-.839 0-1.626-.328-2.215-.926l-.512-.514c-.292-.293-.292-.769.002-1.061s.768-.292 1.061.002l.515.517c.615.623 1.688.62 2.298.003.313-.312.483-.722.483-1.16s-.17-.848-.479-1.154l-3.109-3.129c-.306-.306-.717-.476-1.155-.476-.269 0-.666.063-1.026.362-.32.265-.792.22-1.056-.099s-.221-.791.098-1.056c1.185-.982 3.098-.895 4.202.209l3.107 3.127c.591.586.918 1.374.918 2.215s-.327 1.629-.922 2.219c-.583.593-1.37.921-2.21.921z"/>
                                </svg>
                                <input className="col-10" type="url" value={this.state.siteweb} pattern="https://.*" onChange={this.handleChange.bind(this,"siteweb")}  placeholder="Lien de votre site web (https)" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <label className="col-md-4">Travaux et publications</label>
                            <div className="form-control experience col-md-7 col-sm-10 col-10">
                                <input className="col-md-6" type="date" value={this.state.dateOuvrage} onChange={this.handleChange.bind(this,"dateOuvrage")}  placeholder="Date de publication"/>
                                <input className="col-md-6" type="text" value={this.state.titreOuvrage} onChange={this.handleChange.bind(this,"titreOuvrage")}  placeholder="Titre de votre ouvrage"/>
                                <input className="col-md-12" type="url" pattern="https://.*" value={this.state.lienOuvrage} onChange={this.handleChange.bind(this,"lienOuvrage")}  placeholder="Lien vers votre publication (https)"/>
                            </div>
                            <a className="col-md-1 col-sm-2 col-xs-2 col-2 add" onClick={()=>this.addOuvrage()}><FontAwesomeIcon icon={faPlus}/></a>
                        </div>
                    </div>
                    <div className="form-group" style={{display:this.state.ouvrages.length===0?'none':''}}>
                        <div className="input-group">
                            <ul className="col-md-12 list-experience row">{this.state.ouvrages.map((ouvrage,j)=>{
                                return (
                                <li className="col-md-12" key={j}>
                                    <div className="col-10">
                                        <span className="col-lg-6 col-md-12">{utile.formatDate(ouvrage.datePublication)+' : '+ouvrage.titre}</span>
                                        <a className="col-lg-6 col-md-12" href={ouvrage.lien} rel="noopener noreferrer" target="_blank">{ouvrage.lien}</a>
                                    </div>
                                    <a className="col-2 delete" onClick={()=>this.removeOuvrage(j)}>Supprimer</a>
                                </li>)
                            })}</ul>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <label className="col-md-4">Les mots clés (expertises, actes et symptômes)</label>
                            <div className="form-control phone col-md-7 col-sm-10 col-10">
                                <input className="col-md-12" type="text" value={this.state.tag} onChange={this.handleChange.bind(this,"tag")}  placeholder="Mots clés/tags"/>
                            </div>
                            <a className="col-md-1 col-sm-2 col-xs-2 col-2 add" onClick={()=>this.addTag()}><FontAwesomeIcon icon={faPlus}/></a>
                        </div>
                    </div>
                    <div className="form-group" style={{display:this.state.tags.length===0?'none':''}}>
                        <div className="input-group">
                            <ul className="col-md-12 row">{this.state.tags.map((tag,j)=>{
                                return (
                                <li className="col-3" key={j}>
                                    <div className="col-10">
                                        <span className="col-lg-6 col-md-12">{tag.motCle}</span>
                                    </div>
                                    <a className="col-2 delete" onClick={()=>this.removeTag(j)}>&times;</a>
                                </li>)
                            })}</ul>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <label className="col-md-4">Moyen(s) de paiement accepté(s)</label>
                            <Select onChange={this.handleChange.bind(this,"paiement")} options={this.state.listPaiement} 
                            className="col-md-8" styles={styles} isClearable={true} isMulti placeholder="Paiement accepté" closeMenuOnSelect={false} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <label className="col-md-4">Type de consultation</label>
                            <div className="form-control experience col-md-8">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="30" height="30" fill="#b2d1db" className="col-2" viewBox="0 0 460.298 460.297" enableBackground="new 0 0 460.298 460.297;" xmlSpace="preserve">
                                    <g>
                                        <g>
                                            <path d="M230.149,120.939L65.986,256.274c0,0.191-0.048,0.472-0.144,0.855c-0.094,0.38-0.144,0.656-0.144,0.852v137.041    c0,4.948,1.809,9.236,5.426,12.847c3.616,3.613,7.898,5.431,12.847,5.431h109.63V303.664h73.097v109.64h109.629    c4.948,0,9.236-1.814,12.847-5.435c3.617-3.607,5.432-7.898,5.432-12.847V257.981c0-0.76-0.104-1.334-0.288-1.707L230.149,120.939    z"/>
                                            <path d="M457.122,225.438L394.6,173.476V56.989c0-2.663-0.856-4.853-2.574-6.567c-1.704-1.712-3.894-2.568-6.563-2.568h-54.816    c-2.666,0-4.855,0.856-6.57,2.568c-1.711,1.714-2.566,3.905-2.566,6.567v55.673l-69.662-58.245    c-6.084-4.949-13.318-7.423-21.694-7.423c-8.375,0-15.608,2.474-21.698,7.423L3.172,225.438c-1.903,1.52-2.946,3.566-3.14,6.136    c-0.193,2.568,0.472,4.811,1.997,6.713l17.701,21.128c1.525,1.712,3.521,2.759,5.996,3.142c2.285,0.192,4.57-0.476,6.855-1.998    L230.149,95.817l197.57,164.741c1.526,1.328,3.521,1.991,5.996,1.991h0.858c2.471-0.376,4.463-1.43,5.996-3.138l17.703-21.125    c1.522-1.906,2.189-4.145,1.991-6.716C460.068,229.007,459.021,226.961,457.122,225.438z"/>
                                        </g>
                                    </g>
                                </svg>
                                <input className="col-10" type="number" min="0" value={this.state.homePrice} onChange={this.handleChange.bind(this,"homePrice")}  placeholder="Prix de consultation à domicile en Ariary" />

                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" enableBackground="new 0 0 512 512" viewBox="0 0 512 512" width="30" height="30" fill="#b2d1db" className="col-2">
                                    <g>
                                        <path d="m507.514 249.429-217.665-213.93c-18.665-18.347-49.034-18.346-67.698-.001l-217.665 213.931c-5.909 5.808-5.991 15.305-.184 21.213 5.807 5.907 15.304 5.991 21.212.184l16.939-16.649v170.797c0 35.999 29.288 65.287 65.287 65.287h296.52c35.999 0 65.287-29.288 65.287-65.287v-170.797l16.939 16.649c2.921 2.87 6.718 4.302 10.513 4.302 3.882 0 7.763-1.498 10.699-4.485 5.807-5.909 5.725-15.406-.184-21.214zm-67.968 175.545c0 19.457-15.83 35.287-35.287 35.287h-296.519c-19.457 0-35.287-15.83-35.287-35.287v-200.282l170.727-167.798c1.767-1.737 3.812-3.04 5.995-3.909 6.003-2.388 13.053-1.493 18.27 2.687.474.38.933.787 1.375 1.222l170.727 167.797v200.283z"/>
                                        <path d="m210.929 196.98v48.271h-48.274c-8.284 0-15 6.716-15 15v59.866c0 8.284 6.716 15 15 15h48.274v48.27c0 8.284 6.716 15 15 15h59.866c8.284 0 15-6.716 15-15v-48.27h48.266c8.284 0 15-6.716 15-15v-59.866c0-8.284-6.716-15-15-15h-48.266v-48.271c0-8.284-6.716-15-15-15h-59.866c-8.284 0-15 6.716-15 15zm30 63.271v-48.271h29.866v48.271c0 8.284 6.716 15 15 15h48.266v29.866h-48.266c-8.284 0-15 6.716-15 15v48.27h-29.866v-48.27c0-8.284-6.716-15-15-15h-48.274v-29.866h48.274c8.284 0 15-6.716 15-15z"/>
                                    </g>
                                </svg>
                                <input className="col-10" type="number" min="0" value={this.state.officePrice} onChange={this.handleChange.bind(this,"officePrice")} placeholder="Prix de consultation au cabinet en Ariary" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-12">Photos (diplômes, cabinet ...)</label>
                        <div className="col-md-12">
                            <UploadFile setFiles={this.setPhotos} setSelectedFiles={this.setSelectedPhotos}/>
                        </div>
                    </div>
                </div>
            )
        } else if(step===3){
            return(
                <div className="col-md-12">
                    <h2 className="col-12">Localisation de votre cabinet</h2>
                    <div className="form-group">
                        <div className="input-group">
                            <label className="col-md-4">Adresse</label>
                            <input className="form-control col-md-8" required={true} type="text" onChange={this.handleChange.bind(this,"adresse")}  placeholder=""  />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <label className="col-md-4">District</label>
                            <Select 
                            onChange={this.handleChange.bind(this,"district")} placeholder="District de votre adresse" options={this.state.dataDistrict}
                            className="col-md-8" styles={styles} isClearable={true} isMulti closeMenuOnSelect={false} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <label className="col-md-4">Information d'accès</label>
                            <textarea rows="4" className="form-control col-md-8" value={this.state.infoAcces} onChange={this.handleChange.bind(this,"infoAcces")} placeholder="Décrire les différentes informations pour faciliter votre localisation (facultatif)"></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <label className="col-md-12">Géolocalisation: latitude={this.state.latitude}&nbsp;longitude={this.state.longitude}</label>
                            <div className="mapsLocalisationInscriptionMedecin col-md-12">
                                <MapContainer center={[this.state.latitude,this.state.longitude]} style={{zIndex:"-1"}} zoom={15} scrollWheelZoom={true}>
                                    <MyComponent dataCenter={this.setDataCenter} />
                                    <TileLayer
                                    attribution='&copy; <Link to="http://osm.org/copyright">OpenStreetMap</a> contributors'
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
                    </div>
                </div>
            )
        } else if(step===4){
            return(
                <div className="col-md-12">
                    <h2 className="col-12">Emploi du temps</h2>
                    <div className="form-group">
                        <div className="input-group">
                            <label className="col-md-4">Présentation</label>
                            <textarea rows="4" className="col-md-8 form-control" value={this.state.presentation} onChange={this.handleChange.bind(this,"presentation")} placeholder="Texte de présentation qui apparaîtra sur votre profil (facultatif)"></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <label className="col-md-4">Durée de consultation (minutes)</label>
                            <input className="col-md-8 form-control" required={true} value={this.state.duree} type="number" onChange={this.handleChange.bind(this,"duree")} placeholder="en minutes"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <label className="col-md-12">Votre emploi du temps</label>
                            <div className="col-md-12 emploi-temps-content row">
                            {
                                this.state.emploiTemps.map((data,i)=>{
                                    return(
                                        <div className="col-md-12 each-line-week row" key={i}>
                                            <div className="col-md-4 row">
                                                <div className="col-4">
                                                    <label className="switch">
                                                        <input type="checkbox" checked={this.state.emploiTemps[i].activation} onChange={this.setSemaineEmploieDuTemps.bind(this,i)}/>
                                                        <span className="slider"></span>
                                                    </label>
                                                </div>
                                                <label className="col-8"> {data.names}</label>
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
                    </div>
                </div>
            )
        } else if(step===5){
            return(
                <div className="col-md-12">
                    <h2 className="col-12">Identifiants</h2>
                    <div className="form-group">
                        <div className="input-group">
                            <label className="col-md-4">E-mail</label>
                            <input className="form-control col-md-8" type="email" value={this.state.mail} onChange={this.handleChange.bind(this,"mail")}  placeholder=""  />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <label className="col-md-4">N° téléphone</label>
                            <input className="form-control col-md-8" required={true} type="tel " value={this.state.phone} onChange={this.handleChange.bind(this,"phone")} placeholder=""  />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group" data-tip data-for="registerTip">
                            <ReactTooltip id="registerTip" place="top" effect="solid">Votre mot de passe doit comporter un chiffre, une majuscule, une minuscule, un caractère spéciale(#,*,%,!...) et au moins 8 caractères </ReactTooltip>
                            <label className="col-md-4">Mot de passe</label>
                            <input className="form-control col-md-8" required={true} value={this.state.mdp} type="password" onChange={this.handleChange.bind(this,"mdp")}  placeholder="Nouveau mot de passe"/>
                            
                        </div>
                        <div className="input-group" data-tip data-for="registerTip">
                            <span className="col-12 progressBarSonOfChildLoggin"><ProgressBar variant={this.getColorPourcentage(this.state.percentageMdp)} now={this.state.percentageMdp} /></span>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <label className="col-md-4">Confirmation</label>
                            <input className="form-control col-md-8" required={true} value={this.state.confirmationMdp} type="password" onChange={this.handleChange.bind(this,"confirmationMdp")} placeholder="Confirmation de mot de passe"/>
                        </div>
                    </div>
                    <div className="form-group" hidden={!this.getVerificationMdp()}>
                        <div className="input-group">
                            <label className="col-12" style={{color:'#82a64e',fontSize:'15px',fontWeight:'500',display:'flex',justifyContent:'flex-end',textAlign:'right'}}>Mot de passe confirmé</label>
                        </div>
                    </div>
                </div>
            )
        }
    }
    render(){
        return(
            <div className="inscription-professionnel-container">
                <div className="container">
                    <div className="row">
                        <form className="user-pro-content col-12">
                            <div className="col-12">
                                <ul className="stepper-view">
                                    <li className={this.state.validStep>1?'actif':this.state.validStep===1?'encours':'not'}><b onClick={()=>{if(this.state.validStep>=1)this.setState({step:1})}}>1</b><i>&nbsp;Titulaire&nbsp;</i></li>
                                    <li className={this.state.validStep>2?'actif':this.state.validStep===2?'encours':'not'}><b onClick={()=>{if(this.state.validStep>=2)this.setState({step:2})}}>2</b><i>&nbsp;Présentations&nbsp;</i></li>
                                    <li className={this.state.validStep>3?'actif':this.state.validStep===3?'encours':'not'}><b onClick={()=>{if(this.state.validStep>=3)this.setState({step:3})}}>3</b><i>&nbsp;Localisation&nbsp;</i></li>
                                    <li className={this.state.validStep>4?'actif':this.state.validStep===4?'encours':'not'}><b onClick={()=>{if(this.state.validStep>=4)this.setState({step:4})}}>4</b><i>&nbsp;Emploi du temps&nbsp;</i></li>
                                    <li className={this.state.validStep>5?'actif':this.state.validStep===5?'encours':'not'}><b onClick={()=>{if(this.state.validStep>=5)this.setState({step:5})}}>5</b><i>&nbsp;Identifiants&nbsp;</i></li>
                                </ul>
                            </div>
                            {this.getFormByStep(this.state.step)}
                            <div className="col-md-12">
                                <div className="form-group">
                                    <div className="input-group boutons">
                                        <span className="col-md-2">Etape {this.state.step}/5</span>
                                        <a onClick={()=>{this.setState({step: this.state.step>1?(this.state.step-1):1}); window.scrollTo({top: 0, left: 0, behavior: 'smooth' });}} className="col-sm-5 col-md-2 btn cancel" disabled={this.state.step===1}><FontAwesomeIcon icon={faCaretLeft}/>&nbsp; Précédant</a>
                                        <a onClick={()=>this.checkData()} className="col-sm-5 col-md-2 btn next" hidden={this.state.step===5}>Suivant &nbsp;<FontAwesomeIcon icon={faCaretRight}/></a>
                                        <button type="submit" className="col-sm-5 col-md-2 btn finish" hidden={this.state.step!==5}>Terminer &nbsp;<FontAwesomeIcon icon={faCheck}/></button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}