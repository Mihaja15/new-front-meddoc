import React, {Component} from 'react';
import './SuiviMedical.css';
import Select from 'react-select';
import { convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { utile } from '../../services/utile';
import { Page, Text, Document, StyleSheet,PDFViewer,Image,View } from '@react-pdf/renderer';
import { fetchGet,fetchPost, fetchPostV2,fetchPostV3 } from '../../services/global.service';
import logoMinistereSantes from '../../assets/partenaire/logoMinistereSante.jpg'; 
import presidence from '../../assets/partenaire/presidence.png';
import ReactTooltip from 'react-tooltip';
import { Stepper,Step } from 'react-form-stepper';

let civiliter = [
    { value: '', label: '' },
    { value: '1', label: 'Monsieur' },
    { value: '2', label: 'Madame ou Mademoiselle' }
]
let sexe = [
    { value: '', label: '' },
    { value: '1', label: 'Homme' },
    { value: '2', label: 'Femme' }
];
let maladie = [
    { value: '', label: '' }
]          
let vaccin = [
    { value: '', label: '' },
]        
let zone = [
    { value: '', label: '' },
    { value: 'Bras droit', label: 'Bras droit' },
    { value: 'Bras gauche', label: 'Bras gauche' }
]

const styles = StyleSheet.create({
    page: {
      backgroundColor: '#fff',
      padding: '1%'
    },
    bigTitle:{
      marginTop: '3%',
      textAlign: 'center',
      fontWeight:900,
      fontSize:17,
      fontFamily: 'Times-Roman',
      marginBottom: '3%'
    },
    container : {
        width: '98%',
        minHeight: '100px',
        marginLeft: '1%',
        marginRight: '1%',
        marginBottom: '1%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    columnContent1:{
        width: '50%',
        height: '100px',
    },
    columnContent2:{
        width: '50%',
        height: '100px',
        textAlign: 'center'
    },
    imageTitle:{
        width: '150px',
        height: '100px',
        marginRight: '500px',
        textAlign: 'center',
        marginLeft: 70
    },
    documentTitle:{
        fontSize:15,
        textAlign:'left',
        marginBottom:'2%',
        marginTop: '3%',
        marginLeft:75,
        fontWeight:600,
        textDecoration : 'underline'
    },
    documentText:{
      fontSize:10,
      marginLeft:75,
      marginRight:75,
      marginBottom:'2%',
      textAlign:'left',
      fontWeight:500,
    },
    documentTextUl:{
      fontSize:10,
      marginLeft:100,
      marginRight:100,
      marginBottom:'2%',
      textAlign:'left',
      fontWeight:500,
      listStyle: "desc"
    },
    documentEnding:{
      fontSize:10,
      marginTop: 90,
      marginLeft:75,
      marginRight:75,
      marginBottom:'2%',
      textAlign:'right',
      fontWeight:500,
    }
});
const ColoredLine = ({ color }) => (
    <hr
        style={{
            border : '1px dashed black',
            marginLeft:100,
            marginRight:100,
            marginTop: '3%',
            marginBottom: '3%',
        }}
    />
);
let dateAujourdhui =new Date();
const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

class SuiviMedical extends Component{
    constructor(props){
        super();
        const contentState = convertFromRaw(content);
        this.state = {
            contentState,
            civilite : {value: '1',etat : 0},
            nom : {value: '',etat : 0},
            prenom : {value: '',etat : 0},
            sexe : {value: '1',etat : 0},
            naissance : {value: '1900-01-01',etat : 0},
            lieunaissance : {value: '',etat : 0},
            cin : {value: '',etat : 0},
            identification : {value: '',etat : 0},
            datedelivrance : {value: '1918-01-02',etat : 0},
            lieudelivrance : {value: '',etat : 0},
            telephone : {value: '',etat : 0},
            situationfamiliale : {value: '',etat : 0},
            profession : {value: '',etat : 0},
            etatprofessession : {value: '',etat : 0},
            secteur : {value: '',etat : 0},
            adresse : {value: '',etat : 0},
            province : {value: '',etat : 0},
            district : {value: '',etat : 0},
            email : {value: '',etat : 0},
            personneurgence : {value: '',etat : 0},
            typemaladie : [],
            diagnostic: '',//EditorState.createEmpty(),
            editorState: '',//EditorState.createEmpty(),
            centrevaccin : {value: '',etat : 0},
            nomvaccin : {value: '',etat : 0},
            lot : {value: '',etat : 0},
            expiration : {value: '',etat : 0},
            datevaccination : {value: ''+this.getDateComplet(),etat : 0},
            deuxemevaccination : {value: '',etat : 0},
            vaccinateur : {value: '',etat : 0},
            zone : {value: '',etat : 0},
            injection : {value: '',etat : 0},
            lieu : {value: '',etat : 0},
            professionEtat1: true,professionEtat2: false,professionEtat3: false,
            secteurEtat1: true,secteurEtat2: false,
            identite : true ,coordonnees : true,documents: true,suivi_medical : true,vaccination : true,attestation : true,
            filebase64 : [],
            files : [],
            mesFichiers: [],
            etatShow : 1,
            etatMenuShow : 0,
            listProvince : [],
            listProvinceSelect : [],
            vaccins : [],
            centreObject : null,
            nbr_inj : 2,
            prochainRdv : null,
            userCentre : null,
            patient : null,
            mesMaladie : [],
            contactUrgence : [],
            fichierTemporaire : {base : null,file:null,type : '', name :''},
            erreur : 1,
            smsErreur : ''
        }
    }
    getDateComplet(){
        return ''+dateAujourdhui.getFullYear()+'-'+utile.completChiffre(dateAujourdhui.getMonth())+'-'+utile.completChiffre(dateAujourdhui.getDate());
    }
    setStateByNameState(name,valeur,etatChamps){
		if(name === 'civilite')this.setState({ civilite : { value : valeur , etat : etatChamps }}); 
		if(name === 'nom')this.setState({ nom : { value : valeur , etat : etatChamps }}); 
		else if( name === 'prenom') this.setState({ prenom : { value : valeur , etat : etatChamps }}); 
		else if( name === 'sexe') this.setState({ sexe : { value : valeur , etat : etatChamps }}); 
		else if( name === 'naissance') this.setState({ naissance : { value : valeur , etat : etatChamps } }); 
		else if( name === 'lieunaissance') this.setState({ lieunaissance : { value : valeur , etat : etatChamps } }); 
		else if( name === 'cin') this.setState({ cin : { value : valeur , etat : etatChamps } }); 
		else if( name === 'identification') this.setState({ identification : { value : valeur , etat : etatChamps } }); 
		else if( name === 'datedelivrance') this.setState({ datedelivrance : { value : valeur , etat : etatChamps } }); 
		else if( name === 'lieudelivrance') this.setState({ lieudelivrance : { value : valeur , etat : etatChamps } }); 
		else if( name === 'situationfamiliale') this.setState({ situationfamiliale : { value : valeur , etat : etatChamps } }); 
		else if( name === 'profession') this.setState({ profession : { value : valeur , etat : etatChamps } }); 
		else if( name === 'adresse') this.setState({ adresse : { value : valeur , etat : etatChamps } }); 
		else if( name === 'province') this.setState({ province : { value : valeur , etat : etatChamps } }); 
		else if( name === 'district') this.setState({ district : { value : valeur , etat : etatChamps } }); 
		else if( name === 'email') this.setState({ email : { value : valeur , etat : etatChamps } }); 
		else if( name === 'personneurgence') this.setState({ personneurgence : { value : valeur , etat : etatChamps } }); 
		else if( name === 'diagnostic') this.setState({ diagnostic : { value : valeur , etat : etatChamps } }); 
		else if( name === 'centrevaccin') this.setState({ centrevaccin : { value : valeur , etat : etatChamps } }); 
		else if( name === 'nomvaccin') {
            this.setState({ nomvaccin : { value : valeur , etat : etatChamps } });
            this.createNombreDInjection(valeur,this.state.vaccins);
        } 
		else if( name === 'lot') this.setState({ lot : { value : valeur , etat : etatChamps } }); 
		else if( name === 'expiration') this.setState({ expiration : { value : valeur , etat : etatChamps } }); 
		else if( name === 'datevaccination') this.setState({ datevaccination : { value : valeur , etat : etatChamps } }); 
		else if( name === 'deuxemevaccination') this.setState({ deuxemevaccination : { value : valeur , etat : etatChamps } }); 
		else if( name === 'vaccinateur') this.setState({ vaccinateur : { value : valeur , etat : etatChamps } }); 
		else if( name === 'zone') this.setState({ zone : { value : valeur , etat : etatChamps } }); 
		else if( name === 'injection') this.setState({ injection : { value : valeur , etat : etatChamps } }); 
		else if( name === 'lieu') this.setState({ lieu : { value : valeur , etat : etatChamps } }); 
		else if( name === 'zone') this.setState({ zone : { value : valeur , etat : etatChamps } }); 
	}
    setValue(names,event){
		const valeur = event.target.value;
		if(valeur !== '' && valeur != null){this.setStateByNameState(names,valeur,2)}else{ this.setStateByNameState(names,'',3)}
    }
    verificationIfNotNulOrEmpty(valeur){
        if(valeur !== '' && valeur != null){ return true}
        return false;
    }
    getDataHtmlInput(text,type,value,textvalue){
        return (
            <div className="form-group row new-champ">
                <div className="col-4 new-span-input-suivi" >{text}</div>
                <input type={type} defaultValue={value} onChange={(e) => this.setValue(textvalue, e)}  className="col-8 new-input-suivi"/>
            </div>
        )
    }
    getDataHtmlInputDisabled(text,value){
        return (
            <div className="form-group row new-champ">
                <div className="col-4 new-span-input-suivi" >{text}</div>
                <input type="text" value={value} disabled className="col-8 new-input-suivi"/>
            </div>
        )
    }
    getDataHtmlSelect(text,data,multiple,indiceDefault,classe,name){
        return (
            <div className="form-group row new-champ">
                <div className="col-4 new-span-input-suivi">{text}</div>
                <Select
                    onChange={(e)=>this.handleChangeSelect(e,name)}
                    defaultValue={[data[indiceDefault]]}
                    isMulti={multiple}
                    name="colors"
                    options={data}
                    className={classe}
                    classNamePrefix="select"
                />
            </div>
        )
    }
    handleChangeSelect = (e,names) => {
        const valeur = e.value;
        if(this.verificationIfNotNulOrEmpty(valeur)){this.setStateByNameState(names,valeur,2)}else{ this.setStateByNameState(names,'',3)}
    }
    getDataHtmlProfession(){
        return (
            <div className="form-group row new-champ">
                <div className="col-4">
                    <div className="form-check  check_form">
                        <input className="form-check-input" type="checkbox" checked={this.state.professionEtat1} onChange={(e)=>this.setDataProfessionEtat(e,'1')} id="flexCheckDefault"/>
                        <label className="form-check-label" >Actif</label>
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-check  check_form">
                        <input className="form-check-input" type="checkbox" checked={this.state.professionEtat2} onChange={(e)=>this.setDataProfessionEtat(e,'2')} id="flexCheckDefault"/>
                        <label className="form-check-label" >Chômeur</label>
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-check  check_form">
                        <input className="form-check-input" type="checkbox" checked={this.state.professionEtat3} onChange={(e)=>this.setDataProfessionEtat(e,'3')} id="flexCheckDefault"/>
                        <label className="form-check-label" >Retraité</label>
                    </div>
                </div>
            </div>
        )
    }
    getDataHtmlSecteur(){
        return (
            <>
                <div className="form-group row new-champ">
                    <div className="col-12 new-span-input-suivi">Secteur</div>
                </div>
                <div className="form-group row new-champ">
                    <div className="col-6">
                        <div className="form-check check_form">
                            <input className="form-check-input" type="checkbox" checked={this.state.secteurEtat1} onChange={(e)=>this.setDataSecteurEtat(e,'1')} id="flexCheckDefault"/>
                            <label className="form-check-label">Public</label>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-check check_form">
                            <input className="form-check-input" type="checkbox" checked={this.state.secteurEtat2} onChange={(e)=>this.setDataSecteurEtat(e,'2')} id="flexCheckDefault"/>
                            <label className="form-check-label">Privé</label>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    setDataProfessionEtat(e,profession){
        if(profession==='1'){ if(e.target.checked){ this.setState({professionEtat1: true,professionEtat2: false,professionEtat3: false})}}
        if(profession==='2'){ if(e.target.checked){ this.setState({professionEtat1: false,professionEtat2: true,professionEtat3: false})}}
        if(profession==='3'){ if(e.target.checked){ this.setState({professionEtat1: false,professionEtat2: false,professionEtat3: true})}}
    }
    setDataSecteurEtat(e,secteur){
        if(secteur==='1'){ if(e.target.checked){ this.setState({secteurEtat1: true,secteurEtat2: false})}}
        if(secteur==='2'){ if(e.target.checked){ this.setState({secteurEtat1: false,secteurEtat2: true})}}
    }
    getDataHtmlIdentite(){
        return (
            <>
                <div className="new-title-suivi-medical" id="menu" onClick={()=>{this.setState({identite : !this.state.identite})}}><h2>Identité</h2></div>
                <div className="row divSuivi-son" hidden={!this.state.identite}>
                    <div className="col-md-6 col-sm-12">
                        {this.getDataHtmlInputDisabled('Civilité',this.getLabelByValue(this.state.civilite.value,civiliter))}
                        {this.getDataHtmlInputDisabled('Nom',this.state.nom.value)}
                        {this.getDataHtmlInputDisabled('Prénom(s)',this.state.prenom.value)}
                        {this.getDataHtmlInputDisabled('Sexe',this.getLabelByValue(this.state.sexe.value,sexe))}
                        {this.getDataHtmlInputDisabled('Né le ',utile.getDateComplet(this.state.naissance.value))}
                        {this.getDataHtmlInputDisabled('à ',this.state.lieunaissance.value)}
                        {this.getDataHtmlInputDisabled('Numéro CIN ',this.state.cin.value)}
                        {this.getDataHtmlInputDisabled('Date de délivrance ',utile.getDateComplet(this.state.datedelivrance.value))}
                        {this.getDataHtmlInputDisabled('Lieu de délivrance ',this.state.lieudelivrance.value)} 
                    </div>
                    <div className="col-md-6 col-sm-12">
                        {this.getDataHtmlInput('Numéro identification ','text',''+this.state.identification.value,'identification')}
                        {this.getDataHtmlInput('Situation familiale','text',''+this.state.situationfamiliale.value,'situationfamiliale')}
                        {this.getDataHtmlInput('Profession','text',''+this.state.profession.value,'profession')}
                        {this.getDataHtmlProfession()}
                        {this.getDataHtmlSecteur()}
                    </div>
                </div>
            </>
        )
    }
    getDataHtmlCoordonnee(){
        return (
            <>
                <div className="new-title-suivi-medical" id="menu" onClick={()=>{this.setState({coordonnees : !this.state.coordonnees})}}><h2>COORDONNÉES</h2></div>
                <div className="row divSuivi-son" hidden={!this.state.coordonnees}>
                    {this.getDataHtmlInputDisabled('Adresse',this.state.adresse.value)}
                    {this.getDataHtmlInputDisabled('Province',this.state.province.value)}
                    {this.getDataHtmlInputDisabled('Province',this.state.district.value)}
                    {this.getDataHtmlInputDisabled('Email',this.state.email.value)}
                    {this.getDataHtmlInputDisabled('Téléphone',this.state.telephone.value)}
                    <div className="form-group row new-champ" hidden={this.state.contactUrgence.length<=0}>
                        <div className="col-12 new-span-input-suivi" style={{textAlign:'center'}}>Personne à contacter en cas d'urgence</div>
                        <table class="col-12 table table-hover">
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Lien de parenté</th>
                                    <th>Téléphone</th>
                                    <th>Adresse</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.contactUrgence.map((dataTmp,i)=>{
                                        return (
                                            <tr key={i}>
                                                <td>{dataTmp.nom}</td>
                                                <td>{dataTmp.lienParente}</td>
                                                <td>{dataTmp.phone}</td>
                                                <td>{dataTmp.adresse}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
    verificationDedoublement(newFiles,file){//verification dedoublement fichier
        let size= newFiles.length;
        for(let i=0; i < size; i++){
            if(newFiles[i].name===file.name){
                return true;
            }
        }
        return false;
    }
    setStateByInputFile=(e)=>{
        e.preventDefault();
        const files = e.target.files;
        let size = files.length;
        for (let i=0; i<size; i++){
            let file = files[i];
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                this.setState({ fichierTemporaire: {base : reader.result,file : file,type : file.type, name : file.name}});
            };
        }
    }
    deleteFichierTelecharger=(i)=>{
        let mesFichiers = this.state.mesFichiers;
        let fichier = mesFichiers[i];
        const data = {name : fichier.code+''+fichier.name};
        fetchPostV3('http://localhost:5000/deleteFichier',data).then((resultat)=>{
            if(resultat.status){
                mesFichiers.splice(i,1);
                this.setState({mesFichiers : mesFichiers})
            }
            console.log('deletion : ',resultat);
        })
    }
    enregistre(event){
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(" event : ",event.target);
        fetchPostV2('http://localhost:5000/fichier',data).then((res)=>{ 
            if(res.status){
                const mesFichiers = this.state.mesFichiers;const tmp=this.state.fichierTemporaire;
                mesFichiers.push({base : tmp.base,code : ''+res.code,type : tmp.type, name : tmp.name});
                this.setState({mesFichiers : mesFichiers,fichierTemporaire : {base : null,file:null,type : '', name :''}});
            }
            console.log('res : ',res)
        },error=>{
            console.log('error : ',error);
        });
      
    }
    getAffichageImage(mesFichiers){
        if(mesFichiers.length>0){
            return (
                <div className="row divSuivi-son">
                    {
                        mesFichiers.map((data,i)=>{
                            if(data.type==='application/pdf'){
                                return (
                                    <div className="col-md-3 col-sm-6 new-div-fichier" key={i}>
                                        <iframe src={data.base} scroll="no" className="new-file-show" title={data.name}></iframe>
                                        <span>{data.name}</span>
                                        <div>
                                            <button type="button" className="btn btn-danger form-control" onClick={()=>this.deleteFichierTelecharger(i)}>Supprimer</button>
                                        </div>
                                    </div>
                                )
                            }else{
                                return (
                                    <div className="col-md-3 col-sm-6 new-div-fichier" key={i}>
                                        <img src={data.base} alt={data.name} className="new-file-show"/>
                                        <span>{data.name}</span>
                                        <div>
                                            <button type="button" className="btn btn-danger form-control" onClick={()=>this.deleteFichierTelecharger(i)}>Supprimer</button>
                                        </div>
                                    </div>
                                )
                            }
                            
                        })
                    }
                </div>
            )
        }
        return <div></div>;
    }
    getDataHtmlDocument() {
        return (
            <>
                <form  onSubmit={this.enregistre.bind(this)}>
                    <div className="new-title-suivi-medical" id="menu" onClick={()=>{this.setState({documents : !this.state.documents})}}><h2>DOCUMENTS</h2></div>
                    <div className="row divSuivi-son" hidden={!this.state.documents}>
                        <div className="form-group row new-champ">
                            <div className="new-input-file-suivi col-12">
                            
                                <div className="box">
                                    <input type="file" name="files" id="file-6" data-multiple-caption="{count} files selected" onChange={(e) => this.setStateByInputFile(e)} accept="application/pdf,image/png,image/jpeg" className="inputfile inputfile-5"  />
                                    <label htmlFor="file-6" data-tip data-for='textTelechargementFichier'><figure><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg></figure> <span></span></label>
                                </div>
                                <ReactTooltip id='textTelechargementFichier' type='error'>
                                    <span>Importer des documents ici</span>
                                </ReactTooltip>
                            </div>
                        </div>
                        {
                            (this.state.fichierTemporaire.base!==null && this.state.deuxemevaccination.value!==undefined)?(
                                <>
                                    {
                                        (this.state.fichierTemporaire.type==='application/pdf')?(
                                            <div className="row divSuivi-son image-temporaire-suivi-tmp">
                                                <ul className="image-temporaire-suivi-medical-father-of">
                                                    <li><div className="image-temporaire-suivi-medical-father"><iframe src={this.state.fichierTemporaire.base} scroll="no" className="image-temporaire-suivi-medical" title={this.state.fichierTemporaire.name}></iframe></div></li>
                                                    <li>
                                                        <ul className="image-temporaire-suivi-medical-son">
                                                            <li>Nom : {this.state.fichierTemporaire.name}</li>
                                                            <li>Type : {this.state.fichierTemporaire.type}</li>
                                                            <li><button type="submit" className="btn btn-primary">Enregistrer le fichier</button></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                        ):(
                                            <div className="row divSuivi-son image-temporaire-suivi-tmp">
                                                <ul className="image-temporaire-suivi-medical-father-of">
                                                    <li><div className="image-temporaire-suivi-medical-father"><img src={this.state.fichierTemporaire.base} className="image-temporaire-suivi-medical" alt={this.state.fichierTemporaire.name} /></div></li>
                                                    <li>
                                                        <ul className="image-temporaire-suivi-medical-son">
                                                            <li>Nom : {this.state.fichierTemporaire.name}</li>
                                                            <li>Type : {this.state.fichierTemporaire.type}</li>
                                                            <li><button type="submit" className="btn btn-primary">Enregistrer le fichier</button></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                        )
                                    }
                                </>
                            ): <div></div>
                        }
                    </div>
                </form>
                {this.getAffichageImage(this.state.mesFichiers)}
            </>
        )
    }
    getDataHtmlSuiviMedical(){
        return(
            <>
                <div className="new-title-suivi-medical" id="menu" onClick={()=>{this.setState({suivi_medical : !this.state.suivi_medical})}}><h2>SUIVI MÉDICAL</h2></div>
                <div className="row divSuivi-son" hidden={!this.state.suivi_medical}>
                    <div className="form-group row new-champ">
                        <div className="col-4 new-span-input-suivi" >Types de maladies</div>
                        <Select
                            onChange={(e)=>this.handleChangeSelectMaladie(e)}
                            defaultValue={this.state.mesMaladie}
                            isMulti
                            name="colors"
                            options={maladie}
                            className="new-basic-multi-select col-8"
                            classNamePrefix="select"
                        />
                    </div>
                    <div className="form-group row new-champ">
                        <div className="col-12 new-span-input-suivi" >Examen médical/diagnostic</div>
                        <div className="col-12">
                            <Editor
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onContentStateChange={this.onContentStateChange}
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    }
    onContentStateChange = (contentState) => {
        this.setState({
          contentState,
        });
    }
    handleChangeSelectMaladie=(e)=>{
        const data = e;let size= data.length;let final =[];
        for(let i=0;i<size;i++){final[i] =data[i].value;}
        this.setState({typemaladie : final});
    }
    getDataHtmlVaccination(){
        return (
            <>
                <div className="new-title-suivi-medical" id="menu" onClick={()=>{this.setState({vaccination : !this.state.vaccination})}}><h2>VACCINATION COVID-19</h2></div>
                <div className="row divSuivi-son" hidden={!this.state.vaccination}>
                    {this.getDataHtmlInputDisabled('Centre de vaccination',this.state.centrevaccin.value)}
                    {this.getDataHtmlInputDisabled('Vaccinateur',this.state.vaccinateur.value)}
                    {this.getDataHtmlSelect('Nom du vaccin',vaccin,false,0,"new-basic-multi-select col-8",'nomvaccin')}
                    {this.getDataHtmlInput('N° Lot','text','','lot')}
                    {this.getDataHtmlInputDisabled('Date de vaccination',''+utile.getDateComplet(dateAujourdhui.toString()))}
                    {
                        (this.state.deuxemevaccination.value!=='' && this.state.deuxemevaccination.value!==null && this.state.deuxemevaccination.value!==undefined)
                        ?this.getDataHtmlInputDisabled('Date de la prochaine vaccination',''+utile.getDateComplet(this.state.deuxemevaccination.value)+' à '+this.state.prochainRdv.time)
                        :this.getDataHtmlInputDisabled('Date de la prochaine vaccination','')
                    }
                    
                </div>
            </>
        )
    }
    createNombreDInjection(valeur,vaccins){
        const value =utile.parseStringToInt(valeur);let size = vaccins.length;let count = 2;
        if(value>0 && size>0){
            for(let i = 0; i < size; i++){
                if(''+vaccins[i].idVaccin===''+value){
                    count = vaccins[i].nbrInjection;
                    if(this.state.userCentre!==null && this.state.userCentre!==undefined){
                        this.getDecalageProchainVaccin(this.state.userCentre.centre.idCentre,vaccins[i].interaction);
                    }
                }
            }
        }
        this.setState({nbr_inj : count});
    }
    getDataNombreInjection(nbr_inj){
        let dataFinal = [];let indice = 1;
        dataFinal.push({value: '',label: ''});
        while(nbr_inj>0 && indice<=nbr_inj){
            dataFinal.push({value: ''+indice,label: indice+'/'+nbr_inj});indice++;
        }
        return dataFinal;
    }
    getDataHtmlAttestation(){
        return (
            <>
                <div className="new-title-suivi-medical" id="menu" onClick={()=>{this.setState({attestation : !this.state.attestation})}}><h2>ATTESTATION DE VACCINATION</h2></div>
                <div className="row divSuivi-son" hidden={!this.state.attestation}>
                    {this.getDataHtmlInputDisabled('Civilité',this.getLabelByValue(this.state.civilite.value,civiliter))}
                    {this.getDataHtmlInputDisabled('Nom',this.state.nom.value)}
                    {this.getDataHtmlInputDisabled('Prénom',this.state.prenom.value)}
                    {this.getDataHtmlInputDisabled('Sexe',this.getLabelByValue(this.state.civilite.value,sexe))}
                    {this.getDataHtmlInputDisabled('Date de naissance',this.state.naissance.value)}
                    {this.getDataHtmlInputDisabled('à',this.state.lieunaissance.value)}
                    {this.getDataHtmlInputDisabled('Date',this.getDateComplet())}
                    {this.getDataHtmlInputDisabled('Centre de vaccination',this.state.centrevaccin.value)}
                    {this.getDataHtmlSelect('Zone',zone,false,0,"new-basic-multi-select col-8",'zone')}

                    {this.getDataHtmlSelect('Injection',this.getDataNombreInjection(this.state.nbr_inj),false,0,"new-basic-multi-select col-8",'injection')}
                    {this.getDataHtmlInputDisabled('Vaccin',this.getLabelByValue(this.state.nomvaccin.value,vaccin))}
                    <div className="form-group row new-champ"><div className="col-12 new-button-imprimer-suivi-father"><button type="button" onClick={() =>{this.setState({etatShow : 2})}} className="new-button-imprimer-suivi">Imprimer</button></div></div>
                </div>
            </>
        )
    }
    getLabelByValue(value,data){
        let size = data.length;
        for(let i = 0; i < size; i++){
            if(''+value === ''+data[i].value){ return data[i].label;}
        }
        return '';
    }
    getDataHtmlApercuEnPdf(){
        return (
            <>  
                <div className="row new-champ-pdf">
                    <PDFViewer style={{width:'100%',height:'1181px',backgroundColor:'#fff'}}>
                        <Document>
                            <Page style={styles.page} wrap='false'>
                                <View style={styles.container}>
                                    <View style={styles.columnContent1}><Image src={presidence} style={styles.imageTitle}/></View>
                                    <View style={styles.columnContent2}><Image src={logoMinistereSantes} style={styles.imageTitle}/></View>
                                </View>
                                <Text style={styles.bigTitle}>ATTESTATION DE VACCINATION CONTRE LA COVID-19</Text>

                                <Text style={styles.documentTitle}>Patient</Text> 
                                <Text style={styles.documentText}>Nom et Prénom : {this.state.nom.value} {this.state.prenom.value}</Text>
                                <Text style={styles.documentText}>Sexe : {this.getLabelByValue(this.state.sexe.value,sexe)}</Text>
                                <Text style={styles.documentText}>Civilité : {this.getLabelByValue(this.state.civilite.value,civiliter)}</Text>
                                <Text style={styles.documentText}>Né le : {utile.getDateNormal(this.state.naissance.value)} à {this.state.lieunaissance.value}</Text>
                                <Text style={styles.documentText}>Téléphone : {this.state.telephone.value}</Text>
                                <Text style={styles.documentText}>Numéro CIN : {this.state.cin.value}</Text>
                                <Text style={styles.documentText}>Lieu et date de délivrance : {utile.getDateNormal(this.state.datedelivrance.value)} à {this.state.lieudelivrance.value} </Text>
                                <Text style={styles.documentText}>Adresse : {this.state.adresse.value} </Text>
                                <ColoredLine color="red" />
                                <Text style={styles.documentTitle}>Injection</Text>
                                <Text style={styles.documentText}>Date : {utile.getDateComplet(dateAujourdhui.toString())}</Text>
                                <Text style={styles.documentText}>Centre de vaccination : {this.state.centrevaccin.value}</Text>
                                <Text style={styles.documentText}>Zone :  {this.getLabelByValue(this.state.zone.value,zone)}</Text>
                                <Text style={styles.documentText}>Injection :  {this.state.injection.value+'/'+this.state.nbr_inj}</Text>
                                <Text style={styles.documentText}>Vaccin</Text>
                                <Text style={styles.documentTextUl}>Désignation : {this.state.nomvaccin.value}</Text>
                                <Text style={styles.documentTextUl}>N° Lot : {this.state.lot.value}</Text>
                                <Text style={styles.documentText}>Vaccinateur : {this.state.vaccinateur.value}</Text>                            
                                {
                                    (this.state.deuxemevaccination.value!=='' && this.state.deuxemevaccination.value!==null && this.state.deuxemevaccination.value!==undefined)
                                    ?<Text style={styles.documentText}>Date de la prochaine vaccination : {''+utile.getDateComplet(this.state.deuxemevaccination.value)+' à '+this.state.prochainRdv.time}</Text>
                                    :<Text style={styles.documentText}>Date de la prochaine vaccination : </Text>
                                }
                                <Text style={styles.documentEnding}>Fait le {utile.getDateNormal(this.getDateComplet())} à {this.state.lieu.value}</Text>
                            </Page>
                        </Document>
                    </PDFViewer>
                    <div className="form-group row new-champ"><div className="col-12 new-button-imprimer-suivi-father"><button type="button" onClick={()=>{this.setState({etatShow : 3})}} className="new-button-imprimer-suivi">Retour</button></div></div>
                </div>
            </>
        )
    }
    getClickMenu=(i)=>{
        this.setState({etatMenuShow : i})
    }
    nextOrPreviewMenu(etat){
        let etatShowMenu = this.state.etatMenuShow;
        if(etat && etatShowMenu<5){
            etatShowMenu=etatShowMenu+1;
        }
        if(!etat && etatShowMenu>0){
            etatShowMenu=etatShowMenu-1;
        }
        this.setState({etatMenuShow : etatShowMenu});
    }
    getDecalageProchainVaccin(idCentre,interaction){
        let date = new Date();let jour = date.getDay();
        fetchGet('/covid/prochainRDVPatientPourUnVaccin/'+idCentre+'/'+jour+'/'+date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()+'/'+interaction).then((data) => {
            console.log('le zavatra : ',data);
            this.setState({prochainRdv : data,deuxemevaccination : {value: ''+data.date,etat : 2}});
        })
    }
    getDataDefaultMaladie(maladieBase){
        let size1 = maladie.length;let size=maladieBase.length;const indice = [];const tmp = [];
        for(let i=0; i < size; i++){
            for(let a=0; a < size1; a++){
                if(''+maladieBase[i].idMaladie===''+maladie[a].value){ 
                    indice.push(maladie[a]);tmp.push(maladie[a]);
                }
            }
        }
        console.log('indice : ',indice);
        this.setState({mesMaladie : indice,typemaladie : tmp});
    }
    verifChamp(valeur){
        if(valeur !== '' && valeur != null && valeur !== undefined){
            return true;
        }
        return false;
    }
    verifObj(data){
        if(data!==null && data!==undefined){
            return true;
        }
        return false;
    }
    getDocumentFichier(){
        const mesFichier = this.state.mesFichiers;let size = mesFichier.length;let final = [];
        for(let i=0; i < size; i++){
            final.push({nomDocument : mesFichier[i].code+''+mesFichier[i].name,type : mesFichier[i].type})
        }
        return final;
    }
    getMaladieFinal(){
        const typemaladie=this.state.typemaladie;let size=typemaladie.length;let dataFinal = [];
        for(let i=0;i<size; i++){
            dataFinal.push({idMaladie : utile.parseStringToInt(typemaladie[i])});
        }
        return dataFinal;
    }
    terminerLaVaccination=()=>{
        if(this.verifChamp(this.state.deuxemevaccination.value) && this.verifChamp(this.state.lot.value) && this.verifChamp(this.state.zone.value) && this.verifChamp(this.state.injection.value) && this.verifObj(this.state.prochainRdv) && this.verifObj(this.state.userCentre) && this.verifObj(this.state.patient) ){
            let date = dateAujourdhui.getFullYear()+'-'+utile.completChiffre(dateAujourdhui.getMonth())+'-'+utile.completChiffre(utile.completChiffre(dateAujourdhui.getDate()));
            let inj=utile.parseStringToInt(this.state.injection.value);
            let data ={
                centre:{idCentre : this.state.userCentre.centre.idCentre},
                vaccinateur:{idUser : this.state.userCentre.user.idUser},
                patient:{idUser : this.state.patient.idUser, maladies:this.getMaladieFinal()},
                vaccin:{ idVaccin : this.state.nomvaccin.value},
                numLot: this.state.lot.value,
                dateVaccination: date,
                numInjection: inj,
                zone: this.state.zone.value,
                diag : JSON.stringify(this.state.contentState),
                document: this.getDocumentFichier()
            }
            let dataSend={};
            console.log('nbr_inj : '+utile.parseStringToInt(''+this.state.nbr_inj)+' > '+inj)
            if(utile.parseStringToInt(''+this.state.nbr_inj)>inj){
                dataSend={
                    vaccination:data,
                    rdv:{
                        dateDmdRdv : this.state.prochainRdv.date,
                        dateHeureRdv : this.state.prochainRdv.date+' '+this.state.prochainRdv.time,
                        motif : 'Rendez-vous '+(inj+1),
                        centre:{idCentre : this.state.userCentre.centre.idCentre},
                        patient: {idUser : this.state.patient.idUser, maladies:this.getMaladieFinal()},
                        userAccueil :{idUser : this.state.userCentre.user.idUser},
                        userDmd : {idUser : this.state.patient.idUser, maladies:this.getMaladieFinal()},
                    }
                }
            }else{
                dataSend={
                    vaccination:data
                }
            }
            console.log('final : ',dataSend);
            fetchPost('/covid/vaccinationSuiviMedical',dataSend).then(dataTmp=>{
                if(dataTmp.status===200){
                    this.setState({ erreur : 3,smsErreur : ''+dataTmp.message});
                }else{
                    this.setState({ erreur : 2,smsErreur : ''+dataTmp.message});
                }
            })
            
        }
    }
    componentDidMount() {
        fetchGet('/adresse/province/all').then(data=>{
			if(data!=null){
                let size = data.length;const dataTmp = [];
                dataTmp.push({ value: '', label: '' })
                for(let i=0; i < size; i++){
                    dataTmp.push({ value: ''+data[i].idProvince, label: ''+data[i].nomProvince });
                }
                console.log('province : ',data);
                this.setState({ listProvince: data ,listProvinceSelect : dataTmp});
            }
        });
        fetchGet('/covid-maladie/list').then(data=>{
			if(data!=null){
                let size = data.length;const dataTmp = [];
                dataTmp.push({ value: '', label: '' })
                for(let i=0; i < size; i++){
                    dataTmp.push({ value: ''+data[i].idMaladie, label: ''+data[i].nomMaladie });
                }
                console.log('province : ',data);
                maladie = dataTmp;
                this.setState({ listProvince: data});
            }
        });
        fetchGet('/vaccin/list').then((data) => {
            let size = data.length;const dataTmp = [];
                dataTmp.push({ value: '', label: '' })
                for(let i=0; i < size; i++){
                    dataTmp.push({ value: ''+data[i].idVaccin, label: ''+data[i].designation });
                }
                vaccin = dataTmp;
                console.log('vaccin : ',data);
            this.setState({vaccins : data});
        })
        fetchGet('/covid/userCentre/'+74).then((data) => {
            console.log('centre  : ', data);
            if(data !== null && data !== undefined){
                const tmpAdr = data.centre.adresse;
                console.log('ttt :',tmpAdr)
                this.setState({userCentre : data,centrevaccin : {value: ''+data.centre.nomCentre,etat : 0},vaccinateur: {value: ''+data.user.nom,etat : 0},lieu : {value: ''+tmpAdr[0].district.nomDistrict,etat : 0}})
            }
        })
        fetchGet('/users/userByIdPatient/'+79).then((data) => {
            console.log('centre  : ', data);
            if(data !== null && data !== undefined){
                console.log('patient  :',data)   ; let numero='';let email='';
                let contact = data.contact;let size = contact.length;
                for(let i=0; i < size; i++){
                    if(contact[i].typeContact.idTypeContact===2){email = contact[i].contact}
                    if(contact[i].typeContact.idTypeContact===1){numero = contact[i].contact}
                }
                this.setState({
                    nom : {value: ''+data.nom,etat : 0},
                    prenom : {value: ''+data.prenoms,etat : 0},
                    sexe : {value: ''+data.sexe,etat : 0},
                    civilite : {value: ''+data.sexe,etat : 0},
                    naissance : {value: ''+data.dateNaissance,etat : 0},
                    lieunaissance : {value: ''+data.lieuNaissance,etat : 0},
                    cin : {value: ''+data.numCin,etat : 0},
                    identification : {value: '',etat : 0},
                    datedelivrance : {value: ''+data.dateCin,etat : 0},
                    lieudelivrance : {value: ''+data.lieuCin,etat : 0},
                    telephone : {value: ''+numero,etat : 0},
                    adresse : {value: ''+data.adresse.addrValue,etat : 0},
                    province : {value: ''+data.province.nomProvince,etat : 0},
                    district : {value: ''+data.district.nomDistrict,etat : 0},
                    email : {value: ''+email,etat : 0},
                    patient : data
                });
                this.getDataDefaultMaladie(data.maladies);
                fetchGet('/contactUrgence/listByIdUser/'+data.idUser).then((data) => {
                    console.log('contactUrgence : ',data);
                    this.setState({contactUrgence : data})
                })
            }
        })
    }
    render(){
        const { contentState } = this.state;
        return (
            <div className="divSuivi">
                <div id="menu">    
                    <Stepper activeStep={this.state.etatMenuShow} stepClassName="menu-stepper-suivi">
                        <Step label="Identité" onClick={()=>this.getClickMenu(0)} />
                        <Step label="Coordonnées" onClick={()=>this.getClickMenu(1)} />
                        <Step label="Documents" onClick={()=>this.getClickMenu(2)} />
                        <Step label="Suivi médical" onClick={()=>this.getClickMenu(3)} />
                        <Step label="Vaccination" onClick={()=>this.getClickMenu(4)} />
                        <Step label="Attestation de vaccination" onClick={()=>this.getClickMenu(5)} />
                    </Stepper>
                </div>
                <div style={{margin: "0 auto",width: "90%",marginLeft: "5%"}} hidden={this.state.erreur<=1}>
                    <div className={(this.state.erreur===2)?"alert alert-danger":"alert alert-success"} role="alert">{this.state.smsErreur}</div>
                </div>
                {
                    (this.state.etatShow === 2)?this.getDataHtmlApercuEnPdf()
                    :(
                        <>
                            {
                                (this.state.etatMenuShow===1)?this.getDataHtmlCoordonnee():
                                (this.state.etatMenuShow===2)?this.getDataHtmlDocument():
                                (this.state.etatMenuShow===3)?this.getDataHtmlSuiviMedical():
                                (this.state.etatMenuShow===4)?this.getDataHtmlVaccination():
                                (this.state.etatMenuShow===5)?this.getDataHtmlAttestation()
                                :this.getDataHtmlIdentite()
                            }
                        </>
                    )
                }
                <div className="boutton-next-preview-suivi row new-champ-pdf">
                    <div className="col-md-6 col-sm-12 boutton-next-preview-suivi-preview"><a href="#menu"><button type="button" disabled={this.state.etatMenuShow===0} onClick={()=>this.nextOrPreviewMenu(false)} className="btn btn-primary ">Précédent</button></a></div>
                    <div className="col-md-6 col-sm-12 boutton-next-preview-suivi-next">
                        {
                            (this.state.etatMenuShow===5)?<a href="#menu"><button type="button" hidden={this.state.etatMenuShow!==5} disabled={this.state.etatMenuShow!==5} onClick={()=>this.terminerLaVaccination()} className="btn btn-primary">Terminer</button></a>
                            :<a href="#menu"><button type="button" hidden={this.state.etatMenuShow===5} disabled={this.state.etatMenuShow===5} onClick={()=>this.nextOrPreviewMenu(true)} className="btn btn-primary">Suivant</button></a>
                        }
                    </div>
                </div>
                 
                
                
                
            </div>
            
        )
    }
}
export default SuiviMedical;