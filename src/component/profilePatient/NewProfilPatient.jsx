import React, {Component} from 'react';
import './NewProfilPatient.css';
import 'bootstrap/dist/css/bootstrap.css';
import {fetchGet, fetchPost, fetchPostV2} from '../../services/global.service';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit } from '@fortawesome/free-solid-svg-icons';
import { utile } from '../../services/utile';
import ReactTooltip from 'react-tooltip';

class NewProfilPatient extends Component{
    constructor(props){
        super();
        this.state ={
            dataUser : props.dataUser,
            listProvince:[],
            listFonkotany:[],
            nom : {valuesText : '',etat : 0, dataEdit:false},
            prenoms : {valuesText : '',etat : 0, dataEdit:false},
            naissance : {valuesText : '',etat : 0, dataEdit:false},
            lieuNaissance : {valuesText : '',etat : 0, dataEdit:false},
            sexe : {valuesText : '',etat : 0, dataEdit:false},
            province : {valuesText : '',etat : 0, dataEdit:false},
            fokontany : {valuesText : '',etat : 0, dataEdit:false},
            adresse : {valuesText : '',etat : 0, dataEdit:false},
            error : {text : '',etat : 0},
            listContact : [],
            dataContactEdit : null,
            etatdataContactEdit : false,
            indiceDataContactEdit : -1,
            showButtonModif: false,
            fileName : '',
            file : null,
        }
    }
    setStateByNameState(name,valeur,etatChamps,dataEdits){
        this.setState({showButtonModif : true});
		if(name === 'nom')this.setState({ nom : { valuesText : valeur , etat : etatChamps,dataEdit : dataEdits }}); 
		else if( name === 'prenoms') this.setState({ prenoms : { valuesText : valeur , etat : etatChamps ,dataEdit : dataEdits }});
		else if( name === 'naissance') this.setState({ naissance : { valuesText : valeur , etat : etatChamps ,dataEdit : dataEdits }});
		else if( name === 'lieuNaissance') this.setState({ lieuNaissance : { valuesText : valeur , etat : etatChamps ,dataEdit : dataEdits }});
		else if( name === 'sexe') this.setState({ sexe : { valuesText : valeur , etat : etatChamps ,dataEdit : dataEdits }});
		else if( name === 'fokontany') this.setState({ fokontany : { valuesText : valeur , etat : etatChamps ,dataEdit : dataEdits }});
		else if( name === 'adresse') this.setState({ adresse : { valuesText : valeur , etat : etatChamps ,dataEdit : dataEdits }});
		else if( name === 'province'){
            if(dataEdits){
                this.setState({fokontany : {valuesText : '',etat : 0, dataEdit:false}});
            }
            this.setState({ province : { valuesText : valeur , etat : etatChamps ,dataEdit : dataEdits} });
            console.log('valeur quatier = '+valeur);
			if(valeur !== null && valeur!== '' && utile.parseStringToInt(valeur)>0){
				fetchGet('/adresse/quartiers/'+valeur).then(data=>{
					if(data!=null){
						this.setState({ listFonkotany: data });
					}
				});
			}
        };
	}
    setValue(event,names,dataEdits,select){
        let valeur = '';
        if(select){
            valeur = event.value;
        }else{
            valeur = event.target.value;
        }
		if(valeur !== '' && valeur != null){this.setStateByNameState(names,valeur,2,dataEdits)}else{ this.setStateByNameState(names,'',3,dataEdits)}
    }
    
    getLabelSexe(valeur){
        if(''+valeur===''+1){
            return 'Homme';
        }
        return 'Femme';
    }
    setDataProvince(){
        const data = this.state.listProvince;const newDate=[]; let size= data.length;
        for(let i=0;i<size;i++){
            newDate.push({value : data[i].idProvince , label : data[i].nomProvince});
        }
        return newDate;
    }
    setDataFokontany(){
        const data = this.state.listFonkotany;const newDate=[]; let size= data.length;
        for(let i=0;i<size;i++){
            newDate.push({value : data[i].idFokontany , label : data[i].nomFokontany});
        }
        return newDate;
    }
    
    searchProvinceById(id){
        const list = this.state.listProvince;let size = list.length;
        for (let i = 0; i < size; i++) {
            if(''+list[i].idProvince=== ''+id){
                return list[i].nomProvince;
            }
        }
        return '';
    }
    searchFokontanyById(id){
        const list = this.state.listFonkotany;let size = list.length;
        for (let i = 0; i < size; i++) {
            if(''+list[i].idFokontany=== ''+id){
                return list[i].nomFokontany;
            }
        }
        return '';
    }
    getDataHtmlProvinceFokontany(province,fokontany){
        if(province.dataEdit){
            return (
                <>
                    {this.getDataHtml('text','province','Province',province.valuesText,this.searchProvinceById(province.valuesText),province.dataEdit,province.etat,true,true,this.setDataProvince())}
                    <div className="form-group">
                        <ul className="ulDataUserNewProfil">
                            <li className="titleLiDataUserNewProfil">Fokontany :</li>
                            <li className="textLiDataUserNewProfil"><Select onChange={(e)=>this.setValue(e,'fokontany',true,true)} className="selectNewProfil" placeholder="Fokontany" options={this.setDataFokontany()} /></li>
                        </ul>
                    </div>
                </>
            )
        }else{
            return (
                <>
                    {this.getDataHtml('text','province','Province',province.valuesText,this.searchProvinceById(province.valuesText),province.dataEdit,province.etat,true,true,this.setDataProvince())}
                    <div className="form-group">
                        <ul className="ulDataUserNewProfil">
                            <li className="titleLiDataUserNewProfil">Fokontany </li>
                            <li className="textLiDataUserNewProfil">{this.searchFokontanyById(fokontany.valuesText)}</li>
                        </ul>
                    </div>
                </>
            )
        }
    }
    getDataHtml(typeInput,nameInput,titleText,valueText,text,dataEdit,etatChamps,update,select,listDataSelect){
        if(select && listDataSelect!==null && listDataSelect!==undefined){
            return (
                <div className="form-group">
                    <ul className="ulDataUserNewProfil">
                        <li className="titleLiDataUserNewProfil">{titleText} </li>
                        <li className="textLiDataUserNewProfil" hidden={dataEdit}>{text}</li>
                        <li className="textLiDataUserNewProfil" hidden={!dataEdit}><Select onChange={(e)=>this.setValue(e,nameInput,dataEdit,true)} className="selectNewProfil" placeholder={text} options={listDataSelect} /></li>
                        <li className="buttonLiDataUserNewProfil" hidden={!dataEdit}><button className="btn btn-outline-info form-control boutonEdit" onClick={() =>this.setStateByNameState(nameInput,valueText,etatChamps,false)} data-tip data-for="registerTipV2"><FontAwesomeIcon icon={faCheck}/></button></li>
                        <li className="iconLiDataUserNewProfil" hidden={dataEdit || !update}><button className="btn btn-outline-warning form-control boutonEdit" type="button" onClick={() =>this.setStateByNameState(nameInput,valueText,etatChamps,true)} data-tip data-for="registerTip"><FontAwesomeIcon icon={faEdit}/></button> </li>
                        
                    </ul>
                </div>
            )
        }else{
            return (
                <div className="form-group">
                    <ul className="ulDataUserNewProfil">
                        <li className="titleLiDataUserNewProfil">{titleText} </li>
                        <li className="textLiDataUserNewProfil" hidden={dataEdit}>{text}</li>
                        <li className="textLiDataUserNewProfil" hidden={!dataEdit}><input className="form-control" onChange={(e)=>this.setValue(e,nameInput,dataEdit,false)} type={typeInput} defaultValue={valueText}/></li>
                        <li className="buttonLiDataUserNewProfil" hidden={!dataEdit}><button className="btn btn-outline-info form-control boutonEdit" onClick={() =>this.setStateByNameState(nameInput,valueText,etatChamps,false)} data-tip data-for="registerTipV2"><FontAwesomeIcon icon={faCheck}/></button></li>
                        <li className="iconLiDataUserNewProfil" hidden={dataEdit || !update}><button className="btn btn-outline-warning form-control boutonEdit" type="button" onClick={() =>{this.setStateByNameState(nameInput,valueText,etatChamps,true);}} data-tip data-for="registerTip"><FontAwesomeIcon icon={faEdit}/></button> </li>
                    </ul>
                </div>
            )
        }
    }
    createDataContact(){
        const list= this.state.listContact; let size = list.length;const final =[];
        for (let i = 0; i < size; i++) {
            final[i].push({
                contact: "0326503156",
                idContact: 119,
                typeContact:{
                codeTypeContact: "TPC01",
                idTypeContact: 1,
                libelleTypeContact: "Téléphone",
            }

            });
        }
    }
    setDataListContactEdit(event,indice,dataTmp){
        const list = this.state.listContact;

        list[indice] = {
            contact: event.target.value,
            idContact: dataTmp.idContact,
            typeContact: {
                codeTypeContact: dataTmp.typeContact.codeTypeContact,
                idTypeContact: dataTmp.typeContact.idTypeContact,
                libelleTypeContact: dataTmp.typeContact.libelleTypeContact,
            }
        };
        this.setState({listContact : list,showButtonModif : true});
    }
    editListContact=(indice,dataTmp)=>{
        this.setState({dataContactEdit : dataTmp,etatdataContactEdit : true,indiceDataContactEdit : indice})
    }
    getDataHtmlContact(){
        return (
            <>
                {
                    (this.state.listContact).map((dataTmp,i)=>{
                        if(this.state.dataContactEdit !==null && this.state.etatdataContactEdit && this.state.indiceDataContactEdit ===i){
                            return (
                                <tr key={i}>
                                <td className="tabTitleContactNewProfilPatien">{this.state.dataContactEdit.typeContact.libelleTypeContact}</td>
                                <td className="tabSonContactNewProfilPatien"><input type="text" onChange={(e)=>this.setDataListContactEdit(e,i,this.state.dataContactEdit)} defaultValue={this.state.dataContactEdit.contact} className="form-control"/></td>
                                <td className="tabSonContactNewProfilPatien"><button className="btn btn-outline-info form-control boutonEdit" type="button" onClick={() =>{this.setState({dataContactEdit : null,etatdataContactEdit : false,indiceDataContactEdit : -1})}} data-tip data-for="registerTipV4"><FontAwesomeIcon icon={faCheck}/></button></td>        
                            </tr>
                            )
                        }else{
                            return (
                                <tr key={i}>
                                    <td className="tabTitleContactNewProfilPatien">{dataTmp.typeContact.libelleTypeContact}</td>
                                    <td className="tabSonContactNewProfilPatien">{dataTmp.contact}</td>
                                    <td className="tabSonContactNewProfilPatien"><button className="btn btn-outline-warning form-control boutonEdit" type="button" onClick={()=>this.editListContact(i, dataTmp)} data-tip data-for="registerTip"><FontAwesomeIcon icon={faEdit}/></button></td>
                                </tr>
                            )
                        }
                        
                    })
                }
            </>
        )
    }
    //image
    onChangeImage(event) {
        const picture = event.target.files;
		if(picture.length > 0){
            this.setState({file:picture[0], fileName:picture[0].name}); 
        }
    }
    setValeur(valeurOriginal,valeur){
        if(valeur.etat===2){
            return valeur.valuesText;
        }
        return valeurOriginal;
    }
    changePhotoDeProfil=(event)=>{
        event.preventDefault();
        const data = new FormData(event.target);
        if(this.state.file!=null && this.state.fileName!==''){
            const dataTmp={profilPicture : this.state.fileName,idUser: this.state.dataUser.idUser}
            fetchPost('/users/updateSpecialite',dataTmp).then(resultatTmp=>{
                if(resultatTmp.status===200){
                    fetchPostV2('http://localhost:5000/photo',data).then((mm)=>{});
                    this.setState({ error : {text : ''+resultatTmp.message,etat : 1} });
                }else{
                    this.setState({ error : {text : ''+resultatTmp.message,etat : 2} });
                }
            })
            
        }
    }
    updateDataUser=()=>{
        
        const dataUser={
            idUser: this.state.dataUser.idUser,
            nom: this.setValeur(this.state.dataUser.nom,this.state.nom),
            prenoms: this.setValeur(this.state.dataUser.prenoms,this.state.prenoms),
            dateNaissance: this.setValeur(this.state.dataUser.dateNaissance,this.state.naissance),
            lieuNaissance: this.setValeur(this.state.dataUser.lieuNaissance,this.state.lieuNaissance),
            sexe : this.setValeur(this.state.dataUser.sexe,this.state.sexe),
            profilPicture : this.state.dataUser.profilPicture,
            adresse : [{
                addrValue: this.setValeur(this.state.dataUser.adresse.addrValue,this.state.adresse),
                latitude : this.state.dataUser.adresse.latitude,
                longitude : this.state.dataUser.adresse.longitude,
                fokontany:{
                    idFokontany: this.setValeur(this.state.dataUser.fokontany.idFokontany,this.state.fokontany)
                }
            }],
            contact: this.state.listContact,
            language: this.state.dataUser.langue
        }
        console.log('user : ',dataUser);
        if(dataUser!==null && dataUser!==undefined){
            console.log('dataUser dataUser :: ',dataUser);
            fetchPost('/users/updateUser',dataUser).then(resultatTmp=>{
                if(resultatTmp.status===200){
                    this.setState({ error : {text : ''+resultatTmp.message,etat : 1} });
                }else{
                    this.setState({ error : {text : ''+resultatTmp.message,etat : 2} });
                }
            });
            
        }
    }
    componentDidMount() {
        if(this.props.dataUser!==null && this.props.dataUser!==undefined){
            this.setState({
                nom : {valuesText : ''+this.props.dataUser.nom,etat : 0, dataEdit:false},
                prenoms : {valuesText : ''+this.props.dataUser.prenoms,etat : 0, dataEdit:false},
                naissance : {valuesText : ''+this.props.dataUser.dateNaissance,etat : 0, dataEdit:false},
                sexe : {valuesText : ''+this.props.dataUser.sexe,etat : 0, dataEdit:false},
                lieuNaissance : {valuesText : ''+this.props.dataUser.lieuNaissance,etat : 0, dataEdit:false},
                province : {valuesText : ''+this.props.dataUser.province.idProvince,etat : 0, dataEdit:false},
                fokontany : {valuesText : ''+this.props.dataUser.fokontany.idFokontany,etat : 0, dataEdit:false},
                adresse : {valuesText : ''+this.props.dataUser.adresse.addrValue,etat : 0, dataEdit:false},
                listContact : this.props.dataUser.contact,
                dataUser : this.props.dataUser
            });
            console.log("this.props.dataUser.fokotany ", this.props.dataUser.fokontany);
            fetchGet('/adresse/quartiers/'+this.props.dataUser.province.idProvince).then(data=>{
                if(data!=null){
                    this.setState({ listFonkotany: data });
                }
            });
        }
        fetchGet('/adresse/province/all').then(data=>{
			if(data!=null){
                this.setState({ listProvince: data });
                console.log('listProvince : ',data)
            }
        });
    }
    render(){
        return (
            <div className="allNewProfilePatient">
                <ReactTooltip id="registerTip" place="top" effect="solid">Modifier</ReactTooltip>
                <ReactTooltip id="registerTipV2" place="top" effect="solid">Valider</ReactTooltip>
                <h1 className="BigTitleNewProfil">PROFIL</h1>
                    <div>
                        {this.getDataHtml('text','nom','Nom',this.state.nom.valuesText,this.state.nom.valuesText,this.state.nom.dataEdit,this.state.nom.etat,true,false,[])}
                        {this.getDataHtml('text','prenoms','Prénom(s)',this.state.prenoms.valuesText,this.state.prenoms.valuesText,this.state.prenoms.dataEdit,this.state.prenoms.etat,true,false,[])}
                        {this.getDataHtml('text','sexe','Sexe',this.state.sexe.valuesText,this.getLabelSexe(this.state.sexe.valuesText),this.state.sexe.dataEdit,this.state.sexe.etat,true,true,[{value : 1 , label : 'Homme'},{value : 2 , label : 'Femme'}])}
                        {this.getDataHtml('date','naissance','Date de naissance',this.state.naissance.valuesText,utile.getDateComplet(this.state.naissance.valuesText),this.state.naissance.dataEdit,this.state.naissance.etat,true,false,[])}
                        {this.getDataHtml('tex','lieuNaissance','Lieu de naissance',this.state.lieuNaissance.valuesText,this.state.lieuNaissance.valuesText,this.state.lieuNaissance.dataEdit,this.state.lieuNaissance.etat,true,false,[])}
                        {this.getDataHtml('tex','adresse','Adresse',this.state.adresse.valuesText,this.state.adresse.valuesText,this.state.adresse.dataEdit,this.state.adresse.etat,true,false,[])}
                        {this.getDataHtmlProvinceFokontany(this.state.province,this.state.fokontany)}
                        <div>
                            <ReactTooltip id="registerTipV4" place="top" effect="solid">Valider</ReactTooltip>
                            <ReactTooltip id="registerTip" place="top" effect="solid">Modifier</ReactTooltip>
                            <table className="table">
                                <tbody>
                                   {this.getDataHtmlContact()}
                                </tbody>
                            </table>
                        </div>
                        
                        <form onSubmit={this.changePhotoDeProfil}>
                            <div className="form-group row">
                                <div className="input-group">
                                    <span className="form-control spanSonOfChildLoggins col-3">Photo</span>
                                    <div className="col-6 inputSonOfChildLoggin inputSonOfChildLogginV12">
                                        <div className="custom-file" id="customFile">
                                            <input type="file" className="custom-file-input" id="exampleInputFile" name="photo" onChange={(e)=>this.onChangeImage(e)} aria-describedby="fileHelp"/>
                                            <label className="custom-file-label" >{(this.state.fileName!=='')? this.state.fileName: 'Choisissez votre photo'} </label>
                                        </div>
                                    </div>
                                    <button className="col-3 btn btn-info form-control" type="submit">Changer</button>
                                </div>
                            </div>
                        </form>
                        <div className="alert alert-info" hidden={!(this.state.error.etat===2)}>{this.state.error.text}</div>
                        <div hidden={!(this.state.error.etat===1)} className="textSuccesModificationProfilMedecin">{this.state.error.text} <a href="/patient/profil-patient" className="atextSuccesModificationProfilMedecin">Actualiser la page</a></div>
                        <div hidden={!this.state.showButtonModif} className="boutonModifierProfil"><button className="form-control" type="submit" onClick={()=>this.updateDataUser()}>Enregistrer</button></div>
                    </div>
                
            </div>
        )
    }
}
export default NewProfilPatient;