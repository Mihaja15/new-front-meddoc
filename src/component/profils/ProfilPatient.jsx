import React from 'react';
import './ProfilPatient.css';
import 'bootstrap/dist/css/bootstrap.css';
import {fetchGet, fetchPost, fetchPostV2} from '../../services/global.service';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit } from '@fortawesome/free-solid-svg-icons';
import { utile } from '../../services/utile';
import ReactTooltip from 'react-tooltip';

class ProfilPatient  extends React.Component{
    constructor(props){
        super();
        this.state={
            menuShow:1,
            dataUser : props.dataUser,
            listProvince:[],
            listDistrict:[],
            nom : {valuesText : '',etat : 0, dataEdit:false},
            prenoms : {valuesText : '',etat : 0, dataEdit:false},
            naissance : {valuesText : '',etat : 0, dataEdit:false},
            lieuNaissance : {valuesText : '',etat : 0, dataEdit:false},
            numCin : {valuesText : '',etat : 0, dataEdit:false},
            dateCin : {valuesText : '',etat : 0, dataEdit:false},
            lieuCin : {valuesText : '',etat : 0, dataEdit:false},
            sexe : {valuesText : '',etat : 0, dataEdit:false},
            province : {valuesText : '',etat : 0, dataEdit:false},
            district : {valuesText : '',etat : 0, dataEdit:false},
            adresse : {valuesText : '',etat : 0, dataEdit:false},
            error : {text : '',etat : 0},
            listContact : [],
            dataContactEdit : null,
            etatdataContactEdit : false,
            indiceDataContactEdit : -1,
            showButtonModif: false,
            listCategorie:[],
            listSousCategorie:[],
            listTypeMaladie:[],
            listMaladie:[],
            categorieVal:null,
            sousCategorieVal:null,
            typeMaladieVal:null,
            maladiesVal:[]
        }
    }
    setStateByNameState(name,valeur,etatChamps,dataEdits){
        this.setState({showButtonModif : true});
		if(name === 'nom')this.setState({ nom : { valuesText : valeur , etat : etatChamps,dataEdit : dataEdits }}); 
		else if( name === 'prenoms') this.setState({ prenoms : { valuesText : valeur , etat : etatChamps ,dataEdit : dataEdits }});
		else if( name === 'naissance') this.setState({ naissance : { valuesText : valeur , etat : etatChamps ,dataEdit : dataEdits }});
		else if( name === 'lieuNaissance') this.setState({ lieuNaissance : { valuesText : valeur , etat : etatChamps ,dataEdit : dataEdits }});
		else if( name === 'numCin') this.setState({ numCin : { valuesText : valeur , etat : etatChamps ,dataEdit : dataEdits }});
		else if( name === 'dateCin') this.setState({ dateCin : { valuesText : valeur , etat : etatChamps ,dataEdit : dataEdits }});
		else if( name === 'lieuCin') this.setState({ lieuCin : { valuesText : valeur , etat : etatChamps ,dataEdit : dataEdits }});
		else if( name === 'sexe') this.setState({ sexe : { valuesText : valeur , etat : etatChamps ,dataEdit : dataEdits }});
		else if( name === 'district') this.setState({ district : { valuesText : valeur , etat : etatChamps ,dataEdit : dataEdits }});
		else if( name === 'adresse') this.setState({ adresse : { valuesText : valeur , etat : etatChamps ,dataEdit : dataEdits }});
		else if( name === 'province'){
            if(dataEdits){
                this.setState({district : {valuesText : '',etat : 0, dataEdit:false}});
            }
            this.setState({ province : { valuesText : valeur , etat : etatChamps ,dataEdit : dataEdits} });
            console.log('valeur quatier = '+valeur);
			if(valeur !== null && valeur!== '' && utile.parseStringToInt(valeur)>0){
				fetchGet('/adresse/find-district-by-id-province/'+valeur).then(data=>{
					if(data!=null){
						this.setState({ listDistrict: data });
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
    setDataDistrict(){
        const data = this.state.listDistrict;const newDate=[]; let size= data.length;
        for(let i=0;i<size;i++){
            newDate.push({value : data[i].idDistrict , label : data[i].nomDistrict});
        }
        return newDate;
    }
    setDataCategorie(){
        const data = this.state.listCategorie;const newDate=[];
        for(let i=(data.length-1);i>=0;i--){
            newDate.push({value : data[i].idCategorie , label : data[i].libelle});
        }
        return newDate;
    }
    setDataSousCategorie(){
        const data = this.state.listSousCategorie;const newDate=[];
        for(let i=(data.length-1);i>=0;i--){
            newDate.push({value : data[i].idSousCategorie , label : data[i].libelle});
        }
        return newDate;
    }
    setDataTypeMaladie(){
        const data = this.state.listTypeMaladie;const newDate=[];
        for(let i=(data.length-1);i>=0;i--){
            newDate.push({value : data[i].idTypeMaladie , label : data[i].nomTypeMaladie});
        }
        return newDate;
    }
    setDataMaladie(){
        const data = this.state.listMaladie;const newDate=[];
        for(let i=(data.length-1);i>=0;i--){
            newDate.push({value : data[i].idMaladie , label : data[i].nomMaladie});
        }
        return newDate;
    }
    categorieChange(event){
        this.setState({categorieVal:event.value}, function(){
            if(this.state.categorieVal!==null && this.state.categorieVal!==""){
                fetchGet('/covid/list-sous-categorie-by-categorie/'+this.state.categorieVal).then(data=>{
					if(data!=null){
						this.setState({ listSousCategorie: data });
					}
				});
            }else{
                this.setState({listSousCategorie:[]});
            }
        })
    }
    typeMaladieChange(event){
        this.setState({typeMaladieVal:event.value}, function(){
            if(this.state.typeMaladieVal!==null && this.state.typeMaladieVal!==""){
                fetchGet('/covid/list-maladie-by-type-maladie/'+this.state.typeMaladieVal).then(data=>{
					if(data!=null){
						this.setState({ listMaladie: data });
					}
				});
            }else{
                this.setState({listMaladie:[]});
            }
        })
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
    searchDistrictById(id){
        const list = this.state.listDistrict;let size = list.length;
        for (let i = 0; i < size; i++) {
            if(''+list[i].idDistrict=== ''+id){
                return list[i].nomDistrict;
            }
        }
        return '';
    }
    getDataHtmlProvinceDistrict(province,district){
        if(province.dataEdit){
            return (
                <>
                    {this.getDataHtml('text','province','Province',province.valuesText,this.searchProvinceById(province.valuesText),province.dataEdit,province.etat,true,true,this.setDataProvince())}
                    {/* {this.getDataHtml('text','district','District',province.valuesText,this.searchDistrictById(district.valuesText),district.dataEdit,district.etat,true,true,this.setDataDistrict())} */}
                    <div className="form-group">
                        <ul className="ulDataUserNewProfil">
                            <li className="titleLiDataUserNewProfil">District :</li>
                            <li className="textLiDataUserNewProfil"><Select onChange={(e)=>this.setValue(e,'district',true,true)} className="selectNewProfil" placeholder="District" options={this.setDataDistrict()} /></li>
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
                            <li className="titleLiDataUserNewProfil">District </li>
                            <li className="textLiDataUserNewProfil">{this.searchDistrictById(district.valuesText)}</li>
                        </ul>
                    </div>
                </>
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
    setValeur(valeurOriginal,valeur){
        if(valeur.etat===2){
            return valeur.valuesText;
        }
        return valeurOriginal;
    }
    updateDataUser=()=>{
        
        const dataUser={
            idUser: this.state.dataUser.idUser,
            nom: this.setValeur(this.state.dataUser.nom,this.state.nom),
            prenoms: this.setValeur(this.state.dataUser.prenoms,this.state.prenoms),
            dateNaissance: this.setValeur(this.state.dataUser.dateNaissance,this.state.naissance),
            lieuNaissance: this.setValeur(this.state.dataUser.lieuNaissance,this.state.lieuNaissance),
            numCin: this.setValeur(this.state.dataUser.numCin,this.state.numCin),
            dateCin: this.setValeur(this.state.dataUser.dateCin,this.state.dateCin),
            lieuCin: this.setValeur(this.state.dataUser.lieuCin,this.state.lieuCin),
            sexe : this.setValeur(this.state.dataUser.sexe,this.state.sexe),
            profilPicture : this.state.dataUser.profilPicture,
            adresse : [{
                idAdresse: this.state.dataUser.adresse.idAdresse,
                addrValue: this.setValeur(this.state.dataUser.adresse.addrValue,this.state.adresse),
                latitude : this.state.dataUser.adresse.latitude,
                longitude : this.state.dataUser.adresse.longitude,
                district:{
                    idDistrict: this.setValeur(this.state.dataUser.district.idDistrict,this.state.district)
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
                numCin : {valuesText : ''+this.props.dataUser.numCin,etat : 0, dataEdit:false},
                dateCin : {valuesText : ''+this.props.dataUser.dateCin,etat : 0, dataEdit:false},
                lieuCin : {valuesText : ''+this.props.dataUser.lieuCin,etat : 0, dataEdit:false},
                province : {valuesText : ''+this.props.dataUser.province.idProvince,etat : 0, dataEdit:false},
                district : {valuesText : ''+this.props.dataUser.district.idDistrict,etat : 0, dataEdit:false},
                adresse : {valuesText : ''+this.props.dataUser.adresse.addrValue,etat : 0, dataEdit:false},
                listContact : this.props.dataUser.contact,
                dataUser : this.props.dataUser
            });
            console.log("this.props.dataUser.fokotany ", this.props.dataUser.district);
            fetchGet('/adresse/find-district-by-id-province/'+this.props.dataUser.province.idProvince).then(data=>{
                if(data!=null){
                    this.setState({ listDistrict: data });
                }
            });
        }
        fetchGet('/adresse/province/all').then(data=>{
			if(data!=null){
                this.setState({ listProvince: data });
                console.log('listProvince : ',data)
            }
        });
        fetchGet('/covid/list-categorie').then(data=>{
			if(data!=null){
                this.setState({ listCategorie: data });
                console.log('listCategorie : ',data)
            }
        });
        fetchGet('/covid/list-type-maladie').then(data=>{
			if(data!=null){
                this.setState({ listTypeMaladie: data });
                console.log('listTypeMaladie : ',data)
            }
        });
    }
    getMenuShow=(menu)=>{
        if(menu===1){
            return(
                <div>
                    {this.getDataHtml('text','nom','Nom',this.state.nom.valuesText,this.state.nom.valuesText,this.state.nom.dataEdit,this.state.nom.etat,true,false,[])}
                    {this.getDataHtml('text','prenoms','Prénom(s)',this.state.prenoms.valuesText,this.state.prenoms.valuesText,this.state.prenoms.dataEdit,this.state.prenoms.etat,true,false,[])}
                    {this.getDataHtml('text','sexe','Sexe',this.state.sexe.valuesText,this.getLabelSexe(this.state.sexe.valuesText),this.state.sexe.dataEdit,this.state.sexe.etat,true,true,[{value : 1 , label : 'Homme'},{value : 2 , label : 'Femme'}])}
                    {this.getDataHtml('date','naissance','Date de naissance',this.state.naissance.valuesText,utile.getDateComplet(this.state.naissance.valuesText),this.state.naissance.dataEdit,this.state.naissance.etat,true,false,[])}
                    {this.getDataHtml('text','lieuNaissance','Lieu de naissance',this.state.lieuNaissance.valuesText,this.state.lieuNaissance.valuesText,this.state.lieuNaissance.dataEdit,this.state.lieuNaissance.etat,true,false,[])}
                    {this.getDataHtml('text','numCin','N° CIN',this.state.numCin.valuesText,this.state.numCin.valuesText,this.state.numCin.dataEdit,this.state.numCin.etat,true,false,[])}
                    {this.getDataHtml('date','dateCin','Date de délivrance',this.state.dateCin.valuesText,utile.getDateComplet(this.state.dateCin.valuesText),this.state.dateCin.dataEdit,this.state.dateCin.etat,true,false,[])}
                    {this.getDataHtml('text','lieuCin','Lieu de délivrance',this.state.lieuCin.valuesText,this.state.lieuCin.valuesText,this.state.lieuCin.dataEdit,this.state.lieuCin.etat,true,false,[])}
                </div>
            );
        }if(menu===4){
            return(
                <div>
                    <div className="form-group">
                        <ul className="ulDataUserNewProfil">
                            <li className="titleLiDataUserNewProfil">Catégorie :</li>
                            <li className="textLiDataUserNewProfil"><Select onChange={(e)=>this.categorieChange(e)} className="selectNewProfil" options={this.setDataCategorie()} /></li>
                        </ul>
                    </div>
                    <div className="form-group">
                        <ul className="ulDataUserNewProfil">
                            <li className="titleLiDataUserNewProfil">Sous catégorie :</li>
                            <li className="textLiDataUserNewProfil"><Select onChange={(e)=>this.categorieChange(e)} className="selectNewProfil" placeholder="Catégorie" options={this.setDataSousCategorie()} /></li>
                        </ul>
                    </div>
                    <div className="form-group">
                        <ul className="ulDataUserNewProfil">
                            <li className="titleLiDataUserNewProfil">Type Maladie :</li>
                            <li className="textLiDataUserNewProfil"><Select onChange={(e)=>this.typeMaladieChange(e)} className="selectNewProfil" options={this.setDataTypeMaladie()} /></li>
                        </ul>
                    </div>
                    <div className="form-group">
                        <ul className="ulDataUserNewProfil">
                            <li className="titleLiDataUserNewProfil">Maladies :</li>
                            <li className="textLiDataUserNewProfil"><Select onChange={(e)=>this.typeMaladieChange(e)} className="selectNewProfil" placeholder="Maladie chronique" options={this.setDataMaladie()} /></li>
                        </ul>
                    </div>
                </div>
            );
        }else if(menu===2){
            return(
                <div>
                    {this.getDataHtml('tex','adresse','Adresse',this.state.adresse.valuesText,this.state.adresse.valuesText,this.state.adresse.dataEdit,this.state.adresse.etat,true,false,[])}
                    {this.getDataHtmlProvinceDistrict(this.state.province,this.state.district)}
                </div>
            );
        }else{
            return(
                <div>
                    <ReactTooltip id="registerTipV4" place="top" effect="solid">Valider</ReactTooltip>
                    <ReactTooltip id="registerTip" place="top" effect="solid">Modifier</ReactTooltip>
                    <table className="table">
                        <tbody>
                            {this.getDataHtmlContact()}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
    render(){
        return(
            <div className="profil-manager-content">
                {/* <div className="container"> */}
                    <div className="row">
                        <div className="col-md-8 profil-left-content">
                            {this.getMenuShow(this.state.menuShow)}
                            <div className="alert alert-info" hidden={!(this.state.error.etat===2)}>{this.state.error.text}</div>
                            <div hidden={!(this.state.error.etat===1)} className="textSuccesModificationProfilMedecin">{this.state.error.text} <a href="/profil/compte" className="atextSuccesModificationProfilMedecin">Actualiser la page</a></div>
                            <div hidden={!this.state.showButtonModif} className="boutonModifierProfil"><button className="form-control" type="submit" onClick={()=>this.updateDataUser()}>Enregistrer</button></div>
                        </div>
                        <div className="col-md-3 profil-right-menu">
                            <ul>
                                <li className={this.state.menuShow===1?"active-show-menu":""} onClick={()=>this.setState({menuShow:1})}>Information générale</li>
                                <li className={this.state.menuShow===4?"active-show-menu":""} onClick={()=>this.setState({menuShow:4})}>Catégorie Professionnelle</li>
                                <li className={this.state.menuShow===2?"active-show-menu":""} onClick={()=>this.setState({menuShow:2})}>Adresse</li>
                                <li className={this.state.menuShow===3?"active-show-menu":""} onClick={()=>this.setState({menuShow:3})}>Contact</li>
                            </ul>
                        </div>
                    </div>
                {/* </div> */}
            </div>
        );
    }
}
export default ProfilPatient;