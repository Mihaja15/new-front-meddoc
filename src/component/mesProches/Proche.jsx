import React from 'react';
import './Proche.css';
import { fetchGet, fetchPostHeader, fetchGetHandler } from '../../services/global.service';
import { faEdit, faEye, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { userSession } from '../../services/userSession';
import { utile } from '../../services/utile';
import Loader from '../alert/Loader';

export default class Proche extends React.Component{
    constructor(props){
        super(props);
        this.state={
            listTypeContact:[],
            list:[],
            listProv:[],
            listDist:[],
            listUser:[],
            idProche:null,
            idUser:null,
            page:0,
            size:10,
            nom:'',
            prenoms:'',
            sexe:1,
            dateNaissance:new Date(),
            lieuNaissance:'',
            numCin:'',
            dateCin:new Date(),
            lieuCin:'',
            dateAdresse:null,
            adresse:'',
            lien:'',
            viewType:0,
            typeShow:0,
            type:0,
            statut:0,
            province:'',
            district:'',
            indice:null,
            show:false,
            showD:false,
            showResult:false
        }
    }
    componentDidMount(){
        // console.log(this.state.listUser)
        this.setState({showResult:false})
        this.setState({idUser:userSession.get('token')},function(){
            fetchGetHandler('/users/proche/'+this.state.idUser+'/'+this.state.page+'/'+this.state.size).then(data=>{
                if(utile.hasValue(data)){
                    this.setState({ list: data , showResult:true});
                    console.log(data)
                }else{
                    
                }
            });
            fetchGet('/type-contact/list').then(data=>{
                if(data!=null){
                    this.setState({ listTypeContact: data });
                }
            });
            fetchGet('/adresse/province/all').then(data=>{
                if(data!=null){
                    this.setState({ listProv: data });
                }
            });
        });
    }
    handleChange=(param, event)=>{
        if(param==="viewType"){
            fetchGet('/users/proche/'+this.state.idUser+'/'+this.state.page+'/'+this.state.size).then(data=>{
                if(data!=null){
                    this.setState({ list: data });
                    console.log(data)
                }else{
                    
                }
            });
        }
        if(param==="province"){
            if(event.target.value!==''){
                fetchGet('/adresse/find-district-by-id-province/'+event.target.value).then(data=>{
                    if(data!=null){
                        this.setState({ listDist: data,showD:true});
                    }
                });
            }else{
                this.setState({ listDist: [], showD:false});
            }
        }
        this.setState({[param]: event.target.value});
    }
    clickIcon=(indice, type)=>{
        const data= this.state.list;
        if(type==="modifier"){
            fetchGet('/adresse/find-province-by-id-district/'+data[indice].proche.adresse[0].district.idDistrict).then(idProvince=>{
                this.setState({province:idProvince});
                fetchGet('/adresse/find-district-by-id-province/'+idProvince).then(datas=>{
                    if(datas!=null){
                        console.log(datas)
                        this.setState({ listDist: datas, district: data[indice].proche.adresse[0].district.idDistrict },function(){
                            console.log(this.state.district);
                        });
                    }
                });
            });
            this.setState({
                idProche:data[indice].proche.idUser,
                show:true,
                typeShow:2,
                nom: data[indice].proche.nom,
                prenoms: data[indice].proche.prenoms,
                sexe:data[indice].proche.sexe,
                dateNaissance:data[indice].proche.dateNaissance,
                lieuNaissance:data[indice].proche.lieuNaissance,
                numCin:data[indice].proche.numCin,
                dateCin:data[indice].proche.dateCin,
                lieuCin:data[indice].proche.lieuCin,
                adresse:data[indice].proche.adresse[0].informationAdresse,
                dateAdresse:data[indice].proche.adresse[0].dateDebut,
                // district:data[indice].proche.adresse[0].district.idDistrict,
                indice: indice,
                lien:data[indice].lien
            });
        }
        else if(type==="voir"){
            fetchGet('/adresse/find-province-by-id-district/'+data[indice].proche.adresse[0].district.idDistrict).then(idProvince=>{
                this.setState({province:idProvince});
                fetchGet('/adresse/find-district-by-id-province/'+idProvince).then(datas=>{
                    if(datas!=null){
                        console.log(datas)
                        this.setState({ listDist: datas, district: data[indice].proche.adresse[0].district.idDistrict},function(){
                            console.log(this.state.district);
                        });
                    }
                });
            });
            this.setState({
                idProche:data[indice].proche.idUser,
                show:true,
                typeShow:1,
                nom: data[indice].proche.nom,
                prenoms: data[indice].proche.prenoms,
                sexe:data[indice].proche.sexe,
                dateNaissance:data[indice].proche.dateNaissance,
                lieuNaissance:data[indice].proche.lieuNaissance,
                numCin:data[indice].proche.numCin,
                dateCin:data[indice].proche.dateCin,
                lieuCin:data[indice].proche.lieuCin,
                adresse:data[indice].proche.adresse[0].informationAdresse,
                dateAdresse:data[indice].proche.adresse[0].dateDebut,
                // district:data[indice].proche.adresse[0].district.idDistrict,
                viewType:0,
                indice: indice,
                lien:data[indice].lien
            });
        }else if(type==="supprimer"){
            this.setState({idProche:data[indice].proche.idUser, show:true, typeShow:3});
        }
        else{
            this.setState({show:true});
            this.clearData();
        }
    }
    clearData=()=>{
        this.setState({
            idProche:null,
            nom:'',
            prenoms:'',
            sexe:1,
            dateNaissance:new Date(),
            lieuNaissance:'',
            numCin:'',
            dateCin:new Date(),
            lieuCin:'',
            adresse:'',
            lien:'',
            indice:null,
            typeShow:0
        });
    }
    supprimer=()=>{
        fetchGet('/users/remove-proche/'+this.state.idProche).then(data=>{
            if(data!=null){
                if(data.statut.idStatut===2){
                    window.location.reload();
                }
            }
        });
    }
    enregistrer=()=>{
        var adresse = [{
            informationAdresse:this.state.adresse,
            district:{
                idDistrict: this.state.district
            }
        }];
        if(this.state.typeShow!==0 && this.state.dateAdresse!==null && this.state.idProche!==null){
            adresse = [{
                idUser:this.state.idProche,
                dateDebut: this.state.dateAdresse,
                informationAdresse:this.state.adresse,
                district:{
                    idDistrict: this.state.district
                }
            }]
        }
        const user = {
            idUser: this.state.idProche,
            typeUser:{
                idTypeUser: 1
            }
        }
        const proche = {
            idUser: this.state.idProche,
            nom: this.state.nom,
            prenoms: this.state.prenoms,
            sexe:this.state.sexe,
            dateNaissance:this.state.dateNaissance,
            lieuNaissance:this.state.lieuNaissance,
            numCin:this.state.numCin,
            dateCin:utile.hasValue(this.state.numCin)&&utile.hasValue(this.state.lieuCin)?this.state.dateCin:null,
            lieuCin:this.state.lieuCin,
            adresse:adresse,
            user: user
        }
        const data = {
            // user: {idUser:this.state.idUser},
            lien: this.state.lien,
            proche: proche
        }
        fetchPostHeader('/users/ajout-proche',data).then(result=>{
            if(result.etat === "0"){
                window.location.reload();
            }else{
                // this.setState({disableButton:false, erreurEtat: true, erreurMessage: result.message});
            }
        });
    }
    render(){
        return(
            <div className="personal-container-new">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row div-title-proche">
                            <h4 className="card-title col-md-8">Liste de mes proches</h4>
                            {/* <select className="card-title col-md-4" value={this.state.viewType} onChange={this.handleChange.bind(this,"viewType")}>
                                <option value={0}>Tous</option>
                                {this.state.listType.map((one,i)=>{
                                    return(
                                        <option key={i} value={one.idPoste}>{one.designation}</option>
                                    )
                                })}
                            </select> */}
                            <a className="card-title col-md-4" href="#0" onClick={()=>this.clickIcon(0,"créer")}><FontAwesomeIcon icon={faPlusCircle}/>Nouveau</a>
                        </div>
                        <div className="all-list-container row">
                            <div className="list-header col-md-12">
                                <div className="row col-md-12">
                                    <h5 className="col-md-4">Nom et prénom(s)</h5>
                                    <h5 className="col-md-3">Sexe</h5>
                                    <h5 className="col-md-3">Lien de parenté</h5>
                                    <h5 className="col-md-2">Action</h5>
                                </div>
                            </div>
                            <div className="list-content col-md-12">
                                {!this.state.showResult?
                                    <div className="each-line-list col-md-12 row"><Loader/></div>
                                :(this.state.showResult&&this.state.list.length===0)?
                                <div className="each-line-list col-md-12 row">Aucun proche</div>
                                :this.state.list.map((one, i)=>{
                                    return(
                                    <div className="each-line-list row col-md-12" key={i}>
                                        <div className="col-md-4">{one.proche.nom+" "+one.proche.prenoms}</div>
                                        <div className="col-md-3">{one.proche.sexe===1?"Homme":"Femme"}</div>
                                        <div className="col-md-3">{one.lien}</div>
                                        <div className="col-md-2"><a className="voir" onClick={()=>this.clickIcon(i,"voir")} href="#0"><FontAwesomeIcon icon={faEye}/></a>&nbsp;&nbsp;<a className="modifier" onClick={()=>this.clickIcon(i,"modifier")} href="#0"><FontAwesomeIcon icon={faEdit}/></a>&nbsp;&nbsp;<a className="supprimer" onClick={()=>this.clickIcon(i,"supprimer")} href="#0"><FontAwesomeIcon icon={faTrash}/></a></div>
                                    </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12" style={{display:this.state.show?"block":"none"}}>
                        <div className="edit-cover-content row">
                            <div className="edit-header col-md-12">
                                <h5>{this.state.typeShow===1?"Vue":this.setState.typeShow===2?"Modification":this.state.typeShow===3?"Suppression":"Ajout"}</h5>
                            </div>
                            <div className="edit-content col-md-8">    
                                {this.state.typeShow!==3?
                                <div className="row">
                                    <div className="input-group">
                                        <label className="col-md-5">Lien</label>
                                        <select className="col-md-7" disabled={this.state.typeShow===1} value={this.state.lien} required={true} onChange={this.handleChange.bind(this,"lien")}>
                                            <option value={''}>Votre lien</option>
                                            <option value={'Père'}>Père</option>
                                            <option value={'Mère'}>Mère</option>
                                            <option value={'Frère'}>Frère</option>
                                            <option value={'Soeur'}>Soeur</option>
                                            <option value={'Autre'}>Autre</option>
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <label className="col-md-5">Nom</label>
                                        <input className="col-md-7" type="text" disabled={this.state.typeShow===1} required={true} value={this.state.nom} onChange={this.handleChange.bind(this,"nom")}/>
                                    </div>
                                    <div className="input-group">
                                        <label className="col-md-5">Prénom(s)</label>
                                        <input className="col-md-7" type="text" disabled={this.state.typeShow===1} value={this.state.prenoms} onChange={this.handleChange.bind(this,"prenoms")}/>
                                    </div>
                                    <div className="input-group">
                                        <label className="col-md-5">Sexe</label>
                                        <select className="col-md-7" disabled={this.state.typeShow===1} value={this.state.sexe} required={true} onChange={this.handleChange.bind(this,"sexe")}>
                                            <option value={1}>Homme</option>
                                            <option value={2}>Femme</option>
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <label className="col-md-5">Date de naissance</label>
                                        <input className="col-md-7" type="date" disabled={this.state.typeShow===1} required={true} value={this.state.dateNaissance} onChange={this.handleChange.bind(this,"dateNaissance")}/>
                                    </div>
                                    <div className="input-group">
                                        <label className="col-md-5">Lieu de naissance</label>
                                        <input className="col-md-7" type="text" disabled={this.state.typeShow===1} required={true} value={this.state.lieuNaissance} onChange={this.handleChange.bind(this,"lieuNaissance")}/>
                                    </div>
                                    <div className="input-group">
                                        <label className="col-md-5">Province</label>
                                        <select className="col-md-7" disabled={this.state.typeShow===1} value={this.state.province} required={true} onChange={this.handleChange.bind(this,"province")}>
                                            <option value=''></option>
                                            { this.state.listProv.map((lieu,i) => {
                                                    return(
                                                    <option value={lieu.idProvince} key={i}>
                                                        {lieu.nomProvince}
                                                    </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <label className="col-md-5">District</label>
                                        <select className="col-md-7" disabled={this.state.typeShow===1} value={this.state.district} required={true} onChange={this.handleChange.bind(this,"district")}>
                                            <option value=''></option>
                                            { this.state.listDist.map((lieu,i) => {
                                                    return(
                                                    <option value={lieu.idDistrict} key={i}>
                                                        {lieu.nomDistrict}
                                                    </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <label className="col-md-5">Adresse</label>
                                        <input className="col-md-7" type="text" disabled={this.state.typeShow===1} required={true} value={this.state.adresse} onChange={this.handleChange.bind(this,"adresse")}/>
                                    </div>
                                    <div className="input-group">
                                        <label className="col-md-5">N° CIN</label>
                                        <input className="col-md-7" type="text" disabled={this.state.typeShow===1} value={this.state.numCin} onChange={this.handleChange.bind(this,"numCin")}/>
                                    </div>
                                    <div className="input-group">
                                        <label className="col-md-5">Date de délivrance</label>
                                        <input className="col-md-7" type="date" disabled={this.state.typeShow===1} value={this.state.dateCin} onChange={this.handleChange.bind(this,"dateCin")}/>
                                    </div>
                                    <div className="input-group">
                                        <label className="col-md-5">Lieu de délivrance</label>
                                        <input className="col-md-7" type="text" disabled={this.state.typeShow===1} value={this.state.lieuCin} onChange={this.handleChange.bind(this,"lieuCin")}/>
                                    </div>
                                    {this.state.typeShow!==1?
                                    <>
                                    <button onClick={()=>{this.setState({show:false});this.clearData()}} className="annuler col-md-5">Annuler</button>
                                    <button onClick={()=>this.enregistrer()} className="enregistrer col-md-5">Enregistrer</button>
                                    </>:""}
                                </div>:
                                <>
                                    <p style={{textAlign:"center"}}>Vouler-vous vraiment supprimer ce proche?</p>
                                    <button onClick={()=>{this.setState({show:false});this.clearData()}} className="annuler col-md-6">Annuler</button>
                                    <button onClick={()=>this.supprimer()} className="enregistrer col-md-6">Supprimer</button>
                                </>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}