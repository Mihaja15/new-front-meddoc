import React from 'react';
import { fetchGet, fetchGetHandler, fetchPostHeader } from '../../services/global.service';
import { utile } from '../../services/utile';
import './Consultation.css';
import Select from 'react-select';
import { convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';

const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

export default class Consultation extends React.Component{
    constructor(props){
        super();
        const contentState = convertFromRaw(content);
        this.state={
            idRdv : 0,
            rdv : null,
            addSymptome : false,
            addMaladie : false,
            addMedicament : false,
            //addsymptome
            textsymptome : {value: '',etat : 0},
            infosymptome : {value: '',etat : 0},
            //addMaladie
            textmaladie : {value: '',etat : 0},
            infomaladie : {value: '',etat : 0},
            //addMedicaments
            textmedicamend : {value: '',etat : 0},
            //result prescription
            prescription : [],
            descriptionMedicament : {value: '',etat : 0},
            selectMedicament : null,

            symptome : [],
            maladie : [],
            medicament : [],
            //message
            activeSms : false,
            sms : ''
        }
    }
    setStateByNameState(name,valeur,etatChamps){
		if(name === 'textsymptome')this.setState({ textsymptome : { value : valeur , etat : etatChamps }}); 
		else if( name === 'infosymptome') this.setState({ infosymptome : { value : valeur , etat : etatChamps }});
		else if( name === 'textmaladie') this.setState({ textmaladie : { value : valeur , etat : etatChamps }});
		else if( name === 'infomaladie') this.setState({ infomaladie : { value : valeur , etat : etatChamps }});
		else if( name === 'textmedicamend') this.setState({ textmedicamend : { value : valeur , etat : etatChamps }});
		else if( name === 'descriptionMedicament') this.setState({ descriptionMedicament : { value : valeur , etat : etatChamps }});
	}
    setValue(names,event){
		const valeur = event.target.value;
		if(valeur !== '' && valeur != null){this.setStateByNameState(names,valeur,2)}else{ this.setStateByNameState(names,'',3)}
    }
    getAdresse(adresse){
        let size =adresse.length;
        if(size>0){
            return adresse[size-1].informationAdresse;
        }
        return '';
    }
    getContact(contact){
        let size =contact.length;
        if(size>=2){
            return contact[1].valeurContact;
        }
        return '';
    }
    getAge(dateString){
        if(dateString !==undefined && dateString!==null && dateString!==''){
            let date = new Date(dateString);let now = new Date();
            return ' , soit '+(now.getFullYear()-date.getFullYear())+' ans';
        }
        return '';
    }
    getSymptome(){
        fetchGetHandler('/professionnel/symptome').then(data=>{
            let size =data.length; let newData = [];
            for (let i = 0; i < size; i++) {
                newData.push({ value: data[i].idSymptome, label: ''+data[i].libelleSymptome })
            }
            this.setState({symptome : newData});
        });
    }
    getMaladie(){
        fetchGetHandler('/professionnel/maladie').then(data=>{
            let size =data.length; let newData = [];
            for (let i = 0; i < size; i++) {
                newData.push({ value: data[i].idMaladie, label: ''+data[i].libelleMaladie })
            }
            this.setState({maladie : newData});
        });
    }
    getMedicaments(){
        fetchGetHandler('/professionnel/medicament').then(data=>{
            let size =data.length; let newData = [];
            for (let i = 0; i < size; i++) {
                newData.push({ value: data[i].idMedicament, label: ''+data[i].libelleMedicament })
            }
            this.setState({medicament : newData});
        });
    }
    addSymptomeInBase=()=>{
        let text = this.state.textsymptome.value;let info= this.state.infosymptome.value;
        if(utile.verifString(text) && utile.verifString(info)){
            const data = {
                libelleSymptome : text,
                infoSymptome : info,
                codeSymptome : '',
                symptome : [],
                maladie : []
            }
            fetchPostHeader('/professionnel/add-symptome',data).then(dataTmp=>{
                this.getSymptome();
                this.setState({activeSms : true,sms : ''+dataTmp.message});
            });
        }else{
            this.setState({activeSms : true,sms : 'Verifiez vos information car il y a un champs vide'});
        }
    }
    addMaladieInBase=()=>{
        let text = this.state.textmaladie.value;let info= this.state.infomaladie.value;
        if(utile.verifString(text) && utile.verifString(info)){
            const data = {
                libelleMaladie : text,
                infoMaladie : info,
                symptome : []
            }
            fetchPostHeader('/professionnel/add-maladie',data).then(dataTmp=>{
                this.getMaladie();
                this.setState({activeSms : true,sms : ''+dataTmp.message});
            });
            this.setState({activeSms : true,sms : 'Insertion de la maladie avec succé'});
        }else{
            this.setState({activeSms : true,sms : 'Verifiez vos information car il y a un champs vide'});
        }
    }
    addMedicamentInBase=()=>{
        let text = this.state.textmedicamend.value
        if(utile.verifString(text)){
            const data = {
                libelleMedicament : text,
                codeMedicament : ''
            }
            fetchPostHeader('/professionnel/add-medicament',data).then(dataTmp=>{
                this.getMedicaments();
                this.setState({activeSms : true,sms : ''+dataTmp.message});
            });
        }else{
            this.setState({activeSms : true,sms : 'Verifiez vos information car il y a un champs vide'});
        }
    }
    handleChangeSelectPrescription=(e)=>{
        this.setState({selectMedicament :e});   
    }
    onclickSelectPrescription=()=>{
        let e =this.state.selectMedicament;
        if(e!==null && e!==undefined && utile.verifString(this.state.descriptionMedicament.value)){
            let list = this.state.prescription;let size = list.length;let test = false;
            for (let i = 0; i < size; i++) {
                if(list[i].value === e.value){
                    test = true;break;
                }
            }
            if(!test){
                list.push({value : e.value,libeller : e.label, description : this.state.descriptionMedicament.value});
                this.setState({prescription : list});
            }
        }
    }
    deleteprescription=(i)=>{
        let list = this.state.prescription; list.splice(i,1);
        this.setState({prescription : list});
    }
    onContentStateChange = (contentState) => {
        this.setState({
          contentState,
        });
    }
    getSexe(valeur){
        if(valeur===1){
            return 'Homme'
        }
        return 'Femme';
    }
    componentDidMount(){   
        let url = window.location.pathname.split('/');
        console.log(url.length === 6)
        if(url.length === 6){
            let id = url[5];
            fetchGetHandler('/professionnel/idrdv/'+utile.decrypteId(id)).then(data=>{
                console.log(data)
                this.setState({rdv : data});
            });
            this.getSymptome();
            this.getMaladie();
            this.getMedicaments();
        }
    }
    render(){
        // console.log('mlfmdp : ',this.state.rdv);
        return(
            <div className="principal_container_in_page_consultatio">
                <div className="son_principal_container_in_page_consultatio" >
                    <div className="container-fluid identite_son_principal_container_in_page_consultatio" hidden={this.state.rdv===null || this.state.rdv===undefined}>
                        <div className="row">
                            <div className="col-md-3 col-sm-5 col-xs-6 title_identite_son_principal_container_in_page_consultatio ">Nom </div>
                            <div className="col-md-9 col-sm-7 col-xs-6 data_identite_son_principal_container_in_page_consultatio">: {utile.hasValue(this.state.rdv)?' '+this.state.rdv.personnePatient.nom:""} {utile.hasValue(this.state.rdv)?' '+this.state.rdv.personnePatient.prenoms:""}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 col-sm-5 col-xs-6 title_identite_son_principal_container_in_page_consultatio">Date de naissance </div>
                            <div className="col-md-9 col-sm-7 col-xs-6 data_identite_son_principal_container_in_page_consultatio">:{utile.hasValue(this.state.rdv)?' '+utile.getDateComplet(this.state.rdv.personnePatient.dateNaissance):""} {utile.hasValue(this.state.rdv)?',  '+utile.calculateAge(this.state.rdv.personnePatient.dateNaissance)+' ans':""}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 col-sm-5 col-xs-6 title_identite_son_principal_container_in_page_consultatio">Sexe</div>
                            <div className="col-md-9 col-sm-7 col-xs-6 data_identite_son_principal_container_in_page_consultatio">:{utile.hasValue(this.state.rdv)?' '+this.getSexe(this.state.rdv.personnePatient.sexe):""} </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 col-sm-5 col-xs-6 title_identite_son_principal_container_in_page_consultatio">Numero </div>
                            <div className="col-md-9 col-sm-7 col-xs-6 data_identite_son_principal_container_in_page_consultatio">: {utile.hasValue(this.state.rdv)?' '+this.getContact(this.state.rdv.personnePatient.contact):""}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 col-sm-5 col-xs-6 title_identite_son_principal_container_in_page_consultatio">Adresse </div>
                            <div className="col-md-9 col-sm-7 col-xs-6 data_identite_son_principal_container_in_page_consultatio">: {utile.hasValue(this.state.rdv)?' '+this.getAdresse(this.state.rdv.personnePatient.adresse):""}</div>
                        </div>
                    </div>
                    <div class="alert alert-warning alert-dismissible fade show" role="alert" hidden ={!this.state.activeSms}>
                        <strong>Message : </strong> {this.state.sms}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="title_son_of_son_son_principal_container_in_page_consultatio">Consultation</div>
                    <div className="container-fluid son_of_son_son_principal_container_in_page_consultatio ">
                        <div className="row">
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <div className="form-group">
                                    <label for="exampleInputEmail1" className="label_son_principal_container_in_page_consultatio">Symptômes</label>
                                    <ul className="ul_champs_containt_consultation">
                                        <li className="li_1_ul_champs_containt_consultation">
                                            <Select
                                                isMulti={true}
                                                name="colors"
                                                options={this.state.symptome}
                                                className="select_search_in_consultation"
                                                classNamePrefix="select"
                                            />
                                        </li>
                                        <li className="li_2_ul_champs_containt_consultation"><button className={(!this.state.addSymptome)?"btn-primary button_add_data_in_consultation":"btn-warning button_add_data_in_consultation"}  onClick={()=>{this.setState({addSymptome : !this.state.addSymptome})}}><FontAwesomeIcon icon={(!this.state.addSymptome)?faPlus:faArrowAltCircleRight}/></button></li>
                                    </ul>
                                </div>
                                <div className="row class_add_symptome_in_consultation" hidden={!this.state.addSymptome}>
                                    <div className="col-md-6 col-sm-6 col-xs-12 son_class_add_symptome_in_consultation"><input type="text" className="form-control" placeholder="Vore symptôme" onChange={(e) => this.setValue('textsymptome', e)}/></div>
                                    <div className="col-md-3 col-sm-3 col-xs-12 son_class_add_symptome_in_consultation"><button className="btn-success button_add_data_in_consultation" onClick={()=>this.addSymptomeInBase()}><FontAwesomeIcon icon={faCheck}/></button></div>
                                    <div className="col-md-3 col-sm-3 col-xs-12 son_class_add_symptome_in_consultation"><button className="btn-warning button_add_data_in_consultation" onClick={()=>{this.setState({addSymptome : false})}}><FontAwesomeIcon icon={faArrowAltCircleRight}/></button></div>
                                    <div className="col-md-12 col-sm-12 col-xs-12 son_class_add_symptome_in_consultation"><textarea rows="2" className="form-control" placeholder="Information à propos du symptôme" onChange={(e) => this.setValue('infosymptome', e)} ></textarea></div>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <div className="form-group">
                                    <label for="exampleInputEmail1" className="label_son_principal_container_in_page_consultatio">Maladies</label>
                                    <ul className="ul_champs_containt_consultation">
                                        <li className="li_1_ul_champs_containt_consultation">
                                            <Select
                                                isMulti={true}
                                                name="colors"
                                                options={this.state.maladie}
                                                className="select_search_in_consultation"
                                                classNamePrefix="select"
                                            />
                                        </li>
                                        <li className="li_2_ul_champs_containt_consultation"><button className={(!this.state.addMaladie)?"btn-primary button_add_data_in_consultation":"btn-warning button_add_data_in_consultation"} onClick={()=>{this.setState({addMaladie : !this.state.addMaladie})}}><FontAwesomeIcon icon={(!this.state.addMaladie)?faPlus:faArrowAltCircleRight}/></button></li>
                                    </ul>
                                </div>
                                <div className="row class_add_symptome_in_consultation" hidden={!this.state.addMaladie}>
                                    <div className="col-md-6 col-sm-6 col-xs-12 son_class_add_symptome_in_consultation"><input type="text" className="form-control" placeholder="Maladies" onChange={(e) => this.setValue('textmaladie', e)} /></div>
                                    <div className="col-md-3 col-sm-3 col-xs-12 son_class_add_symptome_in_consultation"><button className="btn-success button_add_data_in_consultation" onClick={()=>this.addMaladieInBase()}><FontAwesomeIcon icon={faCheck}/></button></div>
                                    <div className="col-md-3 col-sm-3 col-xs-12 son_class_add_symptome_in_consultation"><button className="btn-warning button_add_data_in_consultation" onClick={()=>{this.setState({addMaladie : false})}}><FontAwesomeIcon icon={faArrowAltCircleRight}/></button></div>
                                    <div className="col-md-12 col-sm-12 col-xs-12 son_class_add_symptome_in_consultation"><textarea rows="2" className="form-control" placeholder="Information à propos de cette maladie" onChange={(e) => this.setValue('infomaladie', e)} ></textarea></div>
                                </div>
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="form-group">
                                    <label for="exampleInputEmail1" className="label_son_principal_container_in_page_consultatio">Prescription</label>
                                    <div className="row">
                                        <div className="col-md-8 col-sm-8 col-xs-12">
                                            <Select
                                                onChange={(e)=>this.handleChangeSelectPrescription(e)}
                                                isMulti={false}
                                                name="colors"
                                                options={this.state.medicament}
                                                className="select_search_in_consultation"
                                                classNamePrefix="select"
                                            />
                                        </div>
                                        <div className="col-md-2 col-sm-2 col-xs-12"><button className="btn-success form-control" onClick={()=>this.onclickSelectPrescription()}>Ajouter</button></div>
                                        <div className="col-md-2 col-sm-2 col-xs-12"><button className={(!this.state.addMedicament)?"btn-primary form-control":"btn-warning form-control"} onClick={()=>{this.setState({addMedicament : !this.state.addMedicament})}}><FontAwesomeIcon icon={(!this.state.addMaladie)?faPlus:faArrowAltCircleRight}/></button></div>
                                        <div className="col-md-12 col-sm-12 col-xs-12"><textarea style={{marginTop : '1%'}} rows="2" className="form-control" placeholder="Description" onChange={(e) => this.setValue('descriptionMedicament', e)}></textarea></div>
                                    </div>
                                </div>
                                
                                <div className="row class_add_symptome_in_consultation" hidden={!this.state.addMedicament}>
                                    <div className="col-md-6 col-sm-6 col-xs-12 son_class_add_symptome_in_consultation"><input type="text" className="form-control" placeholder="Médicaments" onChange={(e) => this.setValue('textmedicamend', e)} /></div>
                                    <div className="col-md-3 col-sm-3 col-xs-12 son_class_add_symptome_in_consultation"><button className="btn-success button_add_data_in_consultation" onClick={()=>this.addMedicamentInBase()}><FontAwesomeIcon icon={faCheck}/></button></div>
                                    <div className="col-md-3 col-sm-3 col-xs-12 son_class_add_symptome_in_consultation"><button className="btn-warning button_add_data_in_consultation" onClick={()=>{this.setState({addMedicament : false})}}><FontAwesomeIcon icon={faArrowAltCircleRight}/></button></div>
                                </div>
                                <div className="class_add_symptome_in_consultation" hidden={this.state.prescription<=0}>
                                    <div class="table-responsive">
                                        <table class="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Medicament</th>
                                                    <th>Description</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.prescription.map((data,i)=>{
                                                        return (
                                                            <tr key={i}>
                                                                <td>{data.libeller}</td>
                                                                <td>{data.description}</td>
                                                                <td><button className="btn-danger form-control" onClick={()=>this.deleteprescription(i)}>Supprimer</button></td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <div className="form-group">
                                    <label for="exampleInputEmail1" className="label_son_principal_container_in_page_consultatio">Repos</label>
                                    <select className="form-control">
                                        <option value="">Selectionnez le jour de repos du patient</option>
                                        {
                                            (utile.createTableauNumber(1,31)).map((data,i)=>{
                                                return <option value={data} key={i}>{data}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <div className="form-group">
                                    <label for="exampleInputEmail1" className="label_son_principal_container_in_page_consultatio">Prochain rendez-vous</label>
                                    <input type="date" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="form-group">
                                    <label for="exampleInputEmail1" className="label_son_principal_container_in_page_consultatio">Diagnostique</label>
                                    <Editor
                                        wrapperClassName="demo-wrapper"
                                        editorClassName="demo-editor"
                                        onContentStateChange={this.onContentStateChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12 fin_in_page_consultation"><button className="btn-success form-control">Enregistrer</button></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}