import React from 'react';
import './DetailProfil.css';
import {fetchGet} from '../../services/global.service';
import { utile } from '../../services/utile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';

export default class DetailProfil extends React.Component{
    constructor(props){
        super(props);
        this.state={
            nom:'',
            prenoms:'',
            sexe:'',
            dateNaissance:'',
            lieuNaissance:'',
            adresse:'',
            numCin:'',
            dateCin:'',
            lieuCin:'',
            idMeddoc:'',
            age:'',
            mdp:'',
            newMdp:'',
            confirmMdp:'',
            district:'',
            province:'',
            mail:'',
            phone:'',
            dataUser:null,
            listContact:[],
            listDistrict:[],
            listProvince:[],
            listTypeContact:[],
            menuShow:1,
            onEdit:false,
            validAccount:false
        }
    }
    getNomProvinceById(id){
        const list = this.state.listProvince;let size = list.length;
        for (let i = 0; i < size; i++) {
            if(''+list[i].idProvince=== ''+id){
                return list[i].nomProvince;
            }
        }
        return '';
    }
    getNomDistrictById(id){
        const list = this.state.listDistrict;let size = list.length;
        for (let i = 0; i < size; i++) {
            if(''+list[i].idDistrict=== ''+id){
                return list[i].nomDistrict;
            }
        }
        return '';
    }
    componentDidMount(){
        if(this.props.dataUser!==null && this.props.dataUser!==undefined){
            console.log(this.props.dataUser);
            // const contact = this.props.dataUser.contact;
            // const ids = this.props.dataUser.identifiant;
            // var mailValue = "";
            // var phoneValue = "";
            // for(let i = 0; i < contact.length; i++){
            //     for(let j = 0; j < ids.length; j++){
            //         if(ids[j].identifiant===contact[i].contact){
            //             if(contact[i].typeContact.idTypeContact===1){
            //                 phoneValue = contact[i].contact;
            //                 this.setState({phoneIndice:i,phone:phoneValue});
            //             }
            //             if(contact[i].typeContact.idTypeContact===2){
            //                 mailValue = contact[i].contact;
            //                 this.setState({mailIndice:i,mail:mailValue});
            //             }
            //         }
            //     }
            // }
            this.setState({
                nom : this.props.dataUser.nom,
                prenoms : this.props.dataUser.prenoms,
                dateNaissance : this.props.dataUser.dateNaissance,
                sexe : this.props.dataUser.sexe,
                lieuNaissance : this.props.dataUser.lieuNaissance,
                numCin : this.props.dataUser.numCin,
                dateCin : this.props.dataUser.dateCin,
                lieuCin : this.props.dataUser.lieuCin,
                mail : this.props.dataUser.email,
                phone : this.props.dataUser.phone,
                // province : {valuesText : ''+this.props.dataUser.province.idProvince,etat : 0, dataEdit:false},
                district : this.props.dataUser.adresse.district.idDistrict,
                adresse : this.props.dataUser.adresse.informationAdresse,
                listContact : this.props.dataUser.contact,
                dataUser : this.props.dataUser,
                age: utile.calculateAge(this.props.dataUser.dateNaissance)
            });
            console.log("this.props.dataUser.fokotany ", this.props.dataUser.adresse.district.idDistrict);
            fetchGet('/adresse/find-province-by-id-district/'+this.props.dataUser.adresse.district.idDistrict).then(idProvince=>{ 
                fetchGet('/adresse/find-district-by-id-province/'+idProvince).then(data=>{
                    if(data!=null){
                        this.setState({ province: idProvince,listDistrict: data });
                    }
                });
            });
            fetchGet('/adresse/province/all').then(data=>{
                if(data!=null){
                    this.setState({ listProvince: data });
                    console.log('listProvince : ',data)
                }
            });
            fetchGet('/type-contact/list').then(data=>{
                if(data!=null){
                    this.setState({ listTypeContact: data });
                }
            });
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
    showDetailByMenu=(menu)=>{
        if(menu===1){
            return(
                <div className="col-md-12">
                    <div className="col-md-12 input-group ">
                        <label className="col-md-4 label-details-profil">Nom</label>
                        <input className="col-md-8 input-details-profil" type="text" name="nom" disabled={!this.state.onEdit} value={this.state.nom}  onChange={this.handleChange.bind(this,"nom")}/>
                    </div>
                    <div className="col-md-12 input-group">
                        <label className="col-md-4 label-details-profil">Prénom(s)</label>
                        <input className="col-md-8 input-details-profil" type="text" name="prenoms" disabled={!this.state.onEdit} value={this.state.prenoms}  onChange={this.handleChange.bind(this,"prenoms")}/>
                    </div>
                    <div className="col-md-12 input-group">
                        <label className="col-md-4 label-details-profil">Sexe</label>
                        {this.state.onEdit?
                            <select className="col-md-8 select-details-profil" name="sexe" disabled={!this.state.onEdit} value={this.state.sexe}  onChange={this.handleChange.bind(this,"sexe")}>
                                <option value=""></option>
                                <option value="1">Homme</option>
                                <option value="2">Femme</option>
                            </select>
                            :<input className="col-md-8 input-details-profil" type="text" name="sexe" disabled={!this.state.onEdit} value={this.state.sexe===1?'Homme':this.state.sexe===2?'Femme':''}/>
                        }   
                    </div>
                    <div className="col-md-12 input-group">
                        <label className="col-md-4 label-details-profil">Date de naissance</label>
                        {this.state.onEdit?
                            <input className="col-md-8 input-details-profil" type="date" name="dateNaissance" disabled={!this.state.onEdit} value={this.state.dateNaissance}  onChange={this.handleChange.bind(this,"dateNaissance")}/>
                            :<input className="col-md-8 input-details-profil" type="text" name="dateNaissance" disabled={!this.state.onEdit} value={utile.getDateNormal(this.state.dateNaissance)}  onChange={this.handleChange.bind(this,"dateNaissance")}/>
                        }
                    </div>
                    <div className="col-md-12 input-group">
                        <label className="col-md-4 label-details-profil">Lieu de naissance</label>
                        <input className="col-md-8 input-details-profil" type="text" name="lieuNaissance" disabled={!this.state.onEdit} value={this.state.lieuNaissance}  onChange={this.handleChange.bind(this,"lieuNaissance")}/>
                    </div>
                    <div className="col-md-12 input-group">
                        <label className="col-md-4 label-details-profil">N° CIN</label>
                        <input className="col-md-8 input-details-profil" type="text" name="numCin" disabled={!this.state.onEdit} value={this.state.numCin}  onChange={this.handleChange.bind(this,"numCin")}/>
                    </div>
                    <div className="col-md-12 input-group">
                        <label className="col-md-4 label-details-profil">Lieu CIN</label>
                        <input className="col-md-8 input-details-profil" type="text" name="lieuCin" disabled={!this.state.onEdit} value={this.state.lieuCin}  onChange={this.handleChange.bind(this,"lieuCin")}/>
                    </div>
                    <div className="col-md-12 input-group">
                        <label className="col-md-4 label-details-profil">Date CIN</label>
                        {this.state.onEdit?
                            <input className="col-md-8 input-details-profil" type="date" name="dateCin" disabled={!this.state.onEdit} value={this.state.dateCin}  onChange={this.handleChange.bind(this,"dateCin")}/>
                            :<input className="col-md-8 input-details-profil" type="text" name="dateCin" disabled={!this.state.onEdit} value={utile.getDateNormal(this.state.dateCin)}  onChange={this.handleChange.bind(this,"dateCin")}/>
                        }
                    </div>
                </div>
            );
        }
        else if(menu===2){
            return(
                <div className="col-md-12">
                    <div className="col-md-12 input-group ">
                        <label className="col-md-4 label-details-profil">Adresse</label>
                        <input className="col-md-8 input-details-profil" type="text" name="adresse" disabled={!this.state.onEdit} value={this.state.adresse}  onChange={this.handleChange.bind(this,"adresse")}/>
                    </div>
                    <div className="col-md-12 input-group">
                        <label className="col-md-4 label-details-profil">Province</label>
                        {this.state.onEdit?
                            <select className="col-md-8 select-details-profil" name="province" disabled={!this.state.onEdit} value={this.state.province}  onChange={this.handleChange.bind(this,"province")}>
                                <option value=""></option>
                                {this.state.listProvince.map((province,i) => {
                                    return(
                                    <option value={province.idProvince} key={i}>
                                        {province.nomProvince}
                                    </option>
                                    )
                                })}
                            </select>
                            :<input className="col-md-8 input-details-profil" type="text" name="province" disabled={!this.state.onEdit} value={this.getNomProvinceById(this.state.province)}/>
                        }   
                    </div>
                    <div className="col-md-12 input-group">
                        <label className="col-md-4 label-details-profil">District</label>
                        {this.state.onEdit?
                            <select className="col-md-8 select-details-profil" name="district" disabled={!this.state.onEdit} value={this.state.district}  onChange={this.handleChange.bind(this,"district")}>
                                <option value=""></option>
                                {this.state.listDistrict.map((district,i) => {
                                    return(
                                    <option value={district.idDistrict} key={i}>
                                        {district.nomDistrict}
                                    </option>
                                    )
                                })}
                            </select>
                            :<input className="col-md-8 input-details-profil" type="text" name="district" disabled={!this.state.onEdit} value={this.getNomDistrictById(this.state.district)}/>
                        }   
                    </div>
                </div>
            );
        }
        else if(menu===3){
            return(
                <div className="col-md-12">
                    {this.state.listContact.map((contact,j)=>{
                        return (
                            <div className="col-md-12 input-group" key={j}>
                                {contact.idUser===null||contact.idUser===undefined?
                                    <select className="col-md-5 select-details-profil" disabled={!this.state.onEdit} value={contact.typeContact.idTypeContact} onChange={this.changeContactType.bind(this,j)}>
                                        {this.state.listTypeContact.map((typeContact,i)=>{
                                            return <option key={i} value={typeContact.idTypeContact}>{typeContact.libelle}</option>
                                        })}
                                    </select>
                                :<label className="col-md-5 label-details-profil">{contact.typeContact.libelle}</label>}
                                {contact.idUser===null||contact.idUser===undefined?
                                    <input disabled={!this.state.onEdit} type="text" className="col-md-5 input-details-profil" value={contact.valeurContact} onChange={this.changeContactText.bind(this,j)}/>
                                :<label className="col-md-5 label-details-profil">{contact.valeurContact}</label>}
                                {contact.idUser===null||contact.idUser===undefined?this.state.onEdit?<a href="#ajout-contact" className="remove-button-contact col-md-1" onClick={()=>this.removeContact(j)}><FontAwesomeIcon icon={faTrashAlt}/></a>:"":""}
                            </div>)
                    })}
                </div>
            );
        }
        else if(menu===5){
            return(
                <div className="col-md-12">
                    <div className="col-md-12 input-group">
                        <label className="col-md-4 label-details-profil">E-mail</label>
                        <input className="col-md-8 input-details-profil" type="text" name="mail" disabled={!this.state.onEdit} value={this.state.mail}  onChange={this.handleChange.bind(this,"mail")}/>
                    </div>
                    <div className="col-md-12 input-group">
                        <label className="col-md-4 label-details-profil">Téléphone</label>
                        <input className="col-md-8 input-details-profil" type="text" name="phone" disabled={!this.state.onEdit} value={this.state.phone}  onChange={this.handleChange.bind(this,"phone")}/>
                    </div>
                </div>
            );
        }
    }
    handleChange=(param, event)=>{
        this.setState({[param]: event.target.value});
    }
    render(){
        return(
            <div className="detail-profil-content">
                <div className="row">
                    <div className="detail-profil-left col-md-3">
                        <ul>
                            <li className={this.state.menuShow===1?"active-show-menu":""} onClick={()=>this.setState({menuShow:1})}>Information générale</li>
                            {/* <li className={this.state.menuShow===4?"active-show-menu":""} onClick={()=>this.setState({menuShow:4})}>Catégorie Professionnelle</li> */}
                            <li className={this.state.menuShow===2?"active-show-menu":""} onClick={()=>this.setState({menuShow:2})}>Adresse</li>
                            <li className={this.state.menuShow===3?"active-show-menu":""} onClick={()=>this.setState({menuShow:3})}>Contact</li>
                            <li className={this.state.menuShow===5?"active-show-menu":""} onClick={()=>this.setState({menuShow:5})}>Données d'authentification</li>
                        </ul>
                    </div>
                    <div className="detail-profil-right col-md-9">
                        <h1 className="name-age-patient col-md-12">{this.state.nom+' '+this.state.prenoms}, <span>{this.state.age+' ans'}</span> &nbsp;
                            {utile.checkEligibility(this.state.age, true, new Date('02/02/2021'))?
                                <span className="" data-tip data-for="check-profil">
                                    <FontAwesomeIcon style={{color:'#82a64e'}} icon={faCheckCircle}/>
                                    <ReactTooltip id="check-profil" place="top" effect="solid">Compte éligible pour la prise de rendez-vous.</ReactTooltip>
                                </span>
                                :<span className="" data-tip data-for="check-profil">
                                    <FontAwesomeIcon style={{color:'#ffca3a'}} icon={faExclamationCircle}/>
                                    <ReactTooltip id="check-profil" place="top" effect="solid">Compte non éligible pour la prise de rendez-vous. Veuillez remplir tous les champs nécessaires (CIN et Test liés au COVID-19)</ReactTooltip>
                                </span>
                            }
                        </h1>
                        {this.showDetailByMenu(this.state.menuShow)}
                    </div>
                </div>
            </div>
        );
    }
}