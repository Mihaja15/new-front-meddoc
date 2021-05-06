import React from 'react';
import './Proche.css';
import { fetchGet, fetchPost,fetchPostV2 } from '../../services/global.service';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            idAdresse:null,
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
            showD:false
        }
    }
    componentDidMount(){
        // console.log(this.state.listUser)
        // this.setState({listUser:})
        this.setState({idUser:localStorage.getItem('idUser')},function(){
            fetchGet('/users/proche/'+this.state.idUser+'/'+this.state.page+'/'+this.state.size).then(data=>{
                if(data!=null){
                    this.setState({ list: data });
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
                adresse:data[indice].proche.adresse[0].addrValue,
                idAdresse:data[indice].proche.adresse[0].idAdresse,
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
                adresse:data[indice].proche.adresse[0].addrValue,
                idAdresse:data[indice].proche.adresse[0].idAdresse,
                // district:data[indice].proche.adresse[0].district.idDistrict,
                viewType:0,
                indice: indice,
                lien:data[indice].lien
            });
        }else if(type==="Supprimer"){
            this.setState({idProche:data[indice].proche.idUser,})
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
    // getMailOrPhone(type, data){
    //     const contact = data.contact;
    //     const ids = data.identifiant;
    //     for(let i = 0; i < contact.length; i++){
    //         for(let j = 0; j < ids.length; j++){
    //             if(ids[j].identifiant===contact[i].contact){
    //                 if(contact[i].typeContact.idTypeContact===1 && type===1){
    //                     return contact[i].contact;
    //                 }
    //                 if(contact[i].typeContact.idTypeContact===2 && type===2){
    //                     return contact[i].contact;
    //                 }
    //             }
    //         }
    //     }
    // }
    enregistrer=()=>{
        var ids = [];
        var contacts = [];
        var adresse = [{
            addrValue:this.state.adresse,
            district:{
                idDistrict: this.state.district
            }
        }];
        if(this.state.typeShow!==0 && this.state.idAdresse!==null){
            adresse = [{
                idAdresse: this.state.idAdresse,
                addrValue:this.state.adresse,
                district:{
                    idDistrict: this.state.district
                }
            }]
        }
        const user = {
            idUser: this.state.idProche,
            nom: this.state.nom,
            prenoms: this.state.prenoms,
            sexe:this.state.sexe,
            dateNaissance:this.state.dateNaissance,
            lieuNaissance:this.state.lieuNaissance,
            numCin:this.state.numCin,
            dateCin:this.state.dateCin,
            lieuCin:this.state.lieuCin,
            adresse:adresse,
            typeUser:{
                idTypeUser: 1
            }
        }
        const data = {
            user: {idUser:this.state.idUser},
            lien: this.state.lien,
            proche: user
        }
        fetchPost('/users/ajout-proche',data).then(result=>{
            if(result.etat === "0"){
                window.location.reload();
            }else{
                // this.setState({disableButton:false, erreurEtat: true, erreurMessage: result.message});
            }
        });
    }
    render(){
        return(
            <div className="personal-container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <h4 className="card-title col-md-4">Liste de mes proches</h4>
                            {/* <select className="card-title col-md-4" value={this.state.viewType} onChange={this.handleChange.bind(this,"viewType")}>
                                <option value={0}>Tous</option>
                                {this.state.listType.map((one,i)=>{
                                    return(
                                        <option key={i} value={one.idPoste}>{one.designation}</option>
                                    )
                                })}
                            </select> */}
                            <a className="card-title col-md-4" href="#0" onClick={()=>this.clickIcon(0,"créer")}>Nouveau</a>
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
                                {this.state.list.map((one, i)=>{
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
                                <h5>{this.state.typeShow===1?"Vue":this.setState.typeShow===2?"Modification":"Ajout"}</h5>
                            </div>
                            <div className="edit-content col-md-8">    
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
                                        <input className="col-md-7" type="date" disabled={this.state.typeShow===1} disabled={this.state.typeShow===1} value={this.state.dateNaissance} onChange={this.handleChange.bind(this,"dateNaissance")}/>
                                    </div>
                                    <div className="input-group">
                                        <label className="col-md-5">Lieu de naissance</label>
                                        <input className="col-md-7" type="text" disabled={this.state.typeShow===1} value={this.state.lieuNaissance} onChange={this.handleChange.bind(this,"lieuNaissance")}/>
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
                                        <input className="col-md-7" type="text" disabled={this.state.typeShow===1} value={this.state.adresse} onChange={this.handleChange.bind(this,"adresse")}/>
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
                                    <button onClick={()=>{this.setState({show:false});this.clearData()}} className="annuler col-md-5">Annuler</button>
                                    <button onClick={()=>this.enregistrer()} className="enregistrer col-md-5">Enregistrer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}