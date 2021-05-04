import React, {Component} from 'react';
import './SuiviMedical.css';
import Select from 'react-select';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { utile } from '../../services/utile';
import { Page, Text, Document, StyleSheet,PDFViewer,Image,View } from '@react-pdf/renderer';
import { fetchPostV2 } from '../../services/global.service';
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
]
let province = [
    { value: '', label: '' },
    { value: '1', label: 'Mananjary' },
    { value: '2', label: 'Antananarivo' }
]
let district = [
    { value: '', label: '' },
    { value: '1', label: 'Analamanga' },
    { value: '2', label: 'Vakinakaratra' }
]
let maladie = [
    { value: '', label: '' },
    { value: '1', label: 'maladie1' },
    { value: '2', label: 'maladie2' },
    { value: '3', label: 'maladie3' },
    { value: '4', label: 'maladie4' }
]          
let vaccin = [
    { value: '', label: '' },
    { value: 'Covishield', label: 'Covishield' },
    { value: 'Johnson & johnson', label: 'Johnson & johnson' },
    { value: 'Pfizer', label: 'Pfizer' },
    { value: 'Sinopharm', label: 'Sinopharm' }
]          
let vaccination = [
    { value: '', label: '' },
    { value: '1/2', label: '1/2' },
    { value: '2/2 & johnson', label: '2/2' }
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

class SuiviMedical extends Component{
    constructor(props){
        super();
        this.state = {
            civilite : {value: '1',etat : 0},
            nom : {value: 'Marivelo',etat : 0},
            prenom : {value: 'Botosoamalandy Heritiana',etat : 0},
            sexe : {value: '1',etat : 0},
            naissance : {value: '1999-06-27',etat : 0},
            lieunaissance : {value: 'Befelantanana',etat : 0},
            cin : {value: '1152232252552',etat : 0},
            datedelivrance : {value: '2017-06-30',etat : 0},
            lieudelivrance : {value: 'Ankaraobato',etat : 0},
            telephone : {value: '0342674765',etat : 0},
            situationfamiliale : {value: 'Etudiant',etat : 0},
            profession : {value: 'Développeur',etat : 0},
            etatprofessession : {value: '',etat : 0},
            secteur : {value: '',etat : 0},
            adresse : {value: 'IVD 63 Ter AA Ambohibahiny',etat : 0},
            province : {value: 'Antananarivo',etat : 0},
            district : {value: 'Analamanga',etat : 0},
            email : {value: 'botosoamalandyheritiana@gmail.com',etat : 0},
            personneurgence : {value: 'Papa : 0333333333333',etat : 0},
            typemaladie : [],
            diagnostic: EditorState.createEmpty(),
            centrevaccin : {value: '',etat : 0},
            nomvaccin : {value: '',etat : 0},
            lot : {value: '',etat : 0},
            expiration : {value: '',etat : 0},
            datevaccination : {value: ''+this.getDateComplet(),etat : 0},
            deuxemevaccination : {value: ''+this.getDateComplet(),etat : 0},
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
            etatMenuShow : 0
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
		else if( name === 'nomvaccin') this.setState({ nomvaccin : { value : valeur , etat : etatChamps } }); 
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
                <input type="text" defaultValue={value}  className="col-8 new-input-suivi"/>
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
                <div className="new-title-suivi-medical" onClick={()=>{this.setState({identite : !this.state.identite})}}><h2>Identité</h2></div>
                <div className="row divSuivi-son" hidden={!this.state.identite}>
                    <div className="col-md-6 col-sm-12">
                        {this.getDataHtmlSelect('Civilité',civiliter,false,0,"new-basic-multi-select col-8",'civilite')}
                        {this.getDataHtmlInput('Nom','text',''+this.state.nom.value,'nom')}
                        {this.getDataHtmlInput('Prénom','text',''+this.state.prenom.value,'prenom')}
                        {this.getDataHtmlSelect('Sexe',sexe,false,0,"new-basic-multi-select col-8",'sexe')}
                        {this.getDataHtmlInput('Né le ','date',''+this.state.naissance.value,'naissance')}
                        {this.getDataHtmlInput('à ','text',''+this.state.lieunaissance.value,'lieunaissance')}
                        {this.getDataHtmlInput('Numéro CIN ','text',''+this.state.cin.value,'cin')}
                        {this.getDataHtmlInput('Date de délivrance ','date',''+this.state.datedelivrance.value,'datedelivrance')}
                        {this.getDataHtmlInput('Lieu de délivrance ','text',''+this.state.lieudelivrance.value,'lieudelivrance')}    
                    </div>
                    <div className="col-md-6 col-sm-12">
                        {this.getDataHtmlInput('Numéro identification ','text',''+this.state.telephone.value,'telephone')}
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
                <div className="new-title-suivi-medical" onClick={()=>{this.setState({coordonnees : !this.state.coordonnees})}}><h2>COORDONNÉES</h2></div>
                <div className="row divSuivi-son" hidden={!this.state.coordonnees}>
                    {this.getDataHtmlInput('Adresse','text',''+this.state.adresse.value,'adresse')}
                    {this.getDataHtmlSelect('Province',province,false,0,"new-basic-multi-select col-8",'province')}
                    {this.getDataHtmlSelect('District',district,false,0,"new-basic-multi-select col-8",'district')}
                    {this.getDataHtmlInput('Email','email',''+this.state.email.value,'email')}
                    {this.getDataHtmlInput('Téléphone','text',''+this.state.telephone.value,'telephone')}
                    {this.getDataHtmlInput("Personne à contacter en cas d'urgence",'text',''+this.state.personneurgence.value,'personneurgence')}
                </div>
            </>
        )
    }
    verificationDedoublement(newFiles,file){
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
        const newFiles = this.state.files;
        let size = files.length;
        for (let i=0; i<size; i++){
            let file = files[i];
            console.log('type : ',file.name);
            if(!this.verificationDedoublement(newFiles,file)){
                newFiles.push(files[i]);
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    let dataTmp = this.state.filebase64; dataTmp.push({base : reader.result,type : file.type, name : file.name});
                    this.setState({ filebase64: dataTmp});
                };
            }
        }
    }
    deleteFichierTelecharger=(i)=>{
        const files = this.state.files;const filesbase64= this.state.filebase64;
        files.splice(i,1);filesbase64.splice(i,1);
        this.setState({files : files, filebase64 : filesbase64});
    }
    enregistre(event){
        event.preventDefault();
        const data = new FormData(event.target);
        data.append('historique','broter2026_20_12');
        console.log(" form : ",data);
        console.log(" event : ",event.target);
        fetchPostV2('http://localhost:5000/fichier',data).then((res)=>{ 
            if(res.status){
                const files = this.state.files;let size = files.length;const meFichier = [];
                for (let i=0; i<size; i++){
                    meFichier.push(res.code+''+files[i].name);
                }
                this.setState({mesFichiers : meFichier});
                console.log('mesFichiers : ',meFichier);
            }
            console.log('res : ',res)
        },error=>{
            console.log('error : ',error);
        });
    }
    getDataHtmlDocument() {
        return (
            <>
                <form  onSubmit={this.enregistre.bind(this)}>
                    <div className="new-title-suivi-medical" onClick={()=>{this.setState({documents : !this.state.documents})}}><h2>DOCUMENTS</h2></div>
                    <div className="row divSuivi-son" hidden={!this.state.documents}>
                        <div className="form-group row new-champ">
                            <div className="new-input-file-suivi col-12">
                            
                                <div className="box">
                                    <input type="file" name="files" id="file-6" data-multiple-caption="{count} files selected" onChange={(e) => this.setStateByInputFile(e)} accept="application/pdf,image/png,image/jpeg" className="inputfile inputfile-5"  multiple />
                                    <label htmlFor="file-6" data-tip data-for='textTelechargementFichier'><figure><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg></figure> <span></span></label>
                                </div>
                                <ReactTooltip id='textTelechargementFichier' type='error'>
                                    <span>Importer des documents ici</span>
                                </ReactTooltip>
                            </div>
                        </div>
                        <div className="row divSuivi-son">
                            {
                                this.state.filebase64.map((data,i)=>{
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
                        <div className="row divSuivi-son" style={{display: 'none'}}><button type="submit" className="btn btn-primary form-control">Enregistre les fichiers</button></div>
                    </div>
                    
                </form>
            </>
        )
    }
    getDataHtmlSuiviMedical(){
        return(
            <>
                <div className="new-title-suivi-medical" onClick={()=>{this.setState({suivi_medical : !this.state.suivi_medical})}}><h2>SUIVI MÉDICAL</h2></div>
                <div className="row divSuivi-son" hidden={!this.state.suivi_medical}>
                    <div className="form-group row new-champ">
                        <div className="col-4 new-span-input-suivi" >Types de maladies</div>
                        <Select
                            onChange={(e)=>this.handleChangeSelectMaladie(e)}
                            defaultValue={[maladie[1]]}
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
                                editorState={this.state.diagnostic}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={this.onEditorStateChange}
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    }
    onEditorStateChange = (editorState) => {
        this.setState({diagnostic : editorState})
    }
    handleChangeSelectMaladie=(e)=>{
        const data = e;let size= data.length;let final =[];
        for(let i=0;i<size;i++){final[i] =data[i].value;}
        this.setState({typemaladie : final});
    }
    getDataHtmlVaccination(){
        return (
            <>
                <div className="new-title-suivi-medical" onClick={()=>{this.setState({vaccination : !this.state.vaccination})}}><h2>VACCINATION COVID-19</h2></div>
                <div className="row divSuivi-son" hidden={!this.state.vaccination}>
                    {this.getDataHtmlInput('Centre de vaccination','text','','centrevaccin')}
                    {this.getDataHtmlInput('Vaccinateur','text','','vaccinateur')}
                    {this.getDataHtmlSelect('Nom du vaccin',vaccin,false,0,"new-basic-multi-select col-8",'nomvaccin')}
                    {this.getDataHtmlInput('N° Lot','text','','lot')}
                    {this.getDataHtmlInput('Date du vaccination','date',''+this.getDateComplet(),'datevaccination')}
                    {this.getDataHtmlInput('Date du deuxiéme vaccination','date','','deuxemevaccination')}
                    {this.getDataHtmlInput("Date d'expiration",'date','','expiration')}
                    
                </div>
            </>
        )
    }
    getDataHtmlAttestation(){
        return (
            <>
                <div className="new-title-suivi-medical" onClick={()=>{this.setState({attestation : !this.state.attestation})}}><h2>ATTESTATION DE VACCINATION</h2></div>
                <div className="row divSuivi-son" hidden={!this.state.attestation}>
                    {this.getDataHtmlInputDisabled('Civilité',this.getLabelByValue(this.state.civilite.value,civiliter))}
                    {this.getDataHtmlInputDisabled('Nom',this.state.nom.value)}
                    {this.getDataHtmlInputDisabled('Prénom',this.state.prenom.value)}
                    {this.getDataHtmlInputDisabled('Sexe',this.getLabelByValue(this.state.sexe.value,sexe))}
                    {this.getDataHtmlInputDisabled('Date de naissance',this.state.naissance.value)}
                    {this.getDataHtmlInputDisabled('à',this.state.lieunaissance.value)}
                    {this.getDataHtmlInputDisabled('Date',this.getDateComplet())}
                    {this.getDataHtmlInputDisabled('Centre de vaccination',this.state.centrevaccin.value)}
                    {this.getDataHtmlSelect('Zone',zone,false,0,"new-basic-multi-select col-8",'zone')}
                    {this.getDataHtmlSelect('Injection',vaccination,false,0,"new-basic-multi-select col-8",'injection')}
                    {this.getDataHtmlInputDisabled('Vaccin',this.state.nomvaccin.value)}
                    {this.getDataHtmlInput("Lieu",'text','','lieu')}
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
                                <Text style={styles.documentText}>Nom du vaccin : {this.state.nomvaccin.value}</Text>
                                <Text style={styles.documentText}>Zone :  {this.getLabelByValue(this.state.zone.value,zone)}</Text>
                                <Text style={styles.documentText}>Injection :  {this.getLabelByValue(this.state.injection.value,vaccination)}</Text>
                                <Text style={styles.documentText}>Date du vaccination : {utile.getDateNormal(this.state.datevaccination.value)}</Text>
                                <Text style={styles.documentText}>Date du deuxième vaccination : {utile.getDateNormal(this.state.deuxemevaccination.value)}</Text>
                                <Text style={styles.documentText}>Vaccinateur : {this.state.vaccinateur.value}</Text>
                                <Text style={styles.documentText}>Centre de vaccination : {this.state.centrevaccin.value}</Text>
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
        alert(' menu numero = '+i)
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
    render(){
        return (
            <div className="divSuivi">
                <Stepper activeStep={this.state.etatMenuShow} stepClassName="menu-stepper-suivi">
                    <Step label="Identité" onClick={()=>this.getClickMenu(1)} />
                    <Step label="Coordonnées" onClick={()=>this.getClickMenu(2)} />
                    <Step label="Documents" onClick={()=>this.getClickMenu(3)} />
                    <Step label="Suivi médical" onClick={()=>this.getClickMenu(4)} />
                    <Step label="Vaccination" onClick={()=>this.getClickMenu(5)} />
                    <Step label="Attestation de vaccination" onClick={()=>this.getClickMenu(6)} />
                </Stepper>
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
                    <div className="col-md-6 col-sm-12"><button type="button" disabled={this.state.etatMenuShow===0} onClick={()=>this.nextOrPreviewMenu(false)} className="btn btn-primary ">Précédent</button></div>
                    <div className="col-md-6 col-sm-12 boutton-next-preview-suivi-next"><button type="button" disabled={this.state.etatMenuShow===5} onClick={()=>this.nextOrPreviewMenu(true)} className="btn btn-primary">Suivant</button></div>
                </div>
                
                
                
                
            </div>
            
        )
    }
}
export default SuiviMedical;