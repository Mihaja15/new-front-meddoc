import React from 'react';
import './RessourcesHumaines.css';
import { fetchGet, fetchGetHandler, fetchPostHeader } from '../../services/global.service';
import { faEdit, faEye, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { userSession } from '../../services/userSession';

export default class RessourcesHumaines extends React.Component{
    constructor(props){
        super(props);
        this.state={
            list:[],
            listType:[],
            listUser:[],
            idCentre:null,
            idUser:null,
            page:0,
            size:10,
            nom:'',
            prenoms:'',
            mail:'',
            phone:'',
            mdp:'',
            viewType:0,
            typeShow:0,
            type:0,
            statut:0,
            dateDebut:null,
            indice:null,
            show:false
        }
    }
    componentDidMount(){
        // console.log(this.state.listUser)
        // this.setState({listUser:})
        this.setState({idCentre:userSession.get('token')},function(){
            fetchGetHandler('/covid/personals/'+this.state.idCentre+'/'+this.state.viewType+'/'+this.state.page+'/'+this.state.size).then(data=>{
                if(data!=null){
                    this.setState({ list: data.content });
                    console.log(data)
                }else{
                    
                }
            }).catch(error=>{
                console.log(error)
                this.setState({disableButton:false, erreurEtat: true, erreurMessage: error.message});
            });
            fetchGet('/covid/list-poste').then(data=>{
                this.setState({ listType: data });
            });
        });
    }
    handleChange=(param, event)=>{
        if(param==="viewType"){
            fetchGet('/covid/personals/'+this.state.idCentre+'/'+event.target.value+'/'+this.state.page+'/'+this.state.size).then(data=>{
                if(data!=null){
                    this.setState({ list: data.content });
                    console.log(data)
                }else{
                    
                }
            });
        }
        this.setState({[param]: event.target.value});
    }
    clickIcon=(indice, type)=>{
        const data= this.state.list;
        if(type==="modifier"){
            this.setState({
                idUser:data[indice].userRel.idUser,
                show:true,
                typeShow:2,
                nom: data[indice].userRel.nom,
                prenoms: data[indice].userRel.prenoms,
                mail: this.getMailOrPhone(2,data[indice].userRel),
                phone: this.getMailOrPhone(1,data[indice].userRel),
                mdp:'',
                type: data[indice].poste.idPoste,
                indice: indice,
                statut: data[indice].statut.idStatut,
                dateDebut: data[indice].dateDebut
            });
        }
        else if(type==="voir"){
            this.setState({
                idUser:data[indice].userRel.idUser,
                show:true,
                typeShow:1,
                nom: data[indice].userRel.nom,
                prenoms: data[indice].userRel.prenoms,
                mail: this.getMailOrPhone(2,data[indice].userRel),
                phone: this.getMailOrPhone(1,data[indice].userRel),
                mdp:'',
                type: data[indice].poste.idPoste,
                indice: indice,
                statut: data[indice].statut.idStatut,
                dateDebut: data[indice].dateDebut
            });
        }else if(type==="supprimer"){
            this.setState({
                idUser:data[indice].userRel.idUser,
                nom: data[indice].userRel.nom,
                prenoms: data[indice].userRel.prenoms,
                show:true, typeShow:3})
        }
        else{
            this.setState({show:true});
            this.clearData();
        }
    }
    clearData=()=>{
        this.setState({statut:0, dateDebut:null, idUser:null, nom:'', prenoms:'', mail:'', phone:'', type:'', mdp:'', indice:null, typeShow:0});
    }
    getMailOrPhone(type, data){
        const contact = data.contact;
        const ids = data.identifiant;
        for(let i = 0; i < contact.length; i++){
            for(let j = 0; j < ids.length; j++){
                if(ids[j].identifiant===contact[i].contact){
                    if(contact[i].typeContact.idTypeContact===1 && type===1){
                        return contact[i].contact;
                    }
                    if(contact[i].typeContact.idTypeContact===2 && type===2){
                        return contact[i].contact;
                    }
                }
            }
        }
    }
    supprimer=()=>{
        fetchGet('/covid/remove-personal/'+this.state.idCentre+'/'+this.state.idUser).then(data=>{
            if(data!=null){
                if(data.statut.idStatut===2){
                    window.location.reload();
                }
            }
        });
    }
    enregistrer=()=>{
        var ids = [];
        var contacts = [];
        if(this.state.phone!=='' && this.state.phone!==null && this.state.phone!==undefined){
            ids.push({identifiant:this.state.phone});
            contacts.push({
                contact:this.state.phone,
                typeContact: {
                    idTypeContact: 1
                }
            });
        }
        if(this.state.mail!=='' && this.state.mail!==null && this.state.mail!==undefined){
            ids.push({identifiant:this.state.mail})
            contacts.push({
                contact:this.state.mail,
                typeContact: {
                    idTypeContact: 2
                }
            });
        }
        const user = {
            idUser: this.state.idUser,
            nom: this.state.nom,
            prenoms: this.state.prenoms,
            mdp: this.state.mdp,
            contact: contacts,
            identifiant:ids,
            typeUser:{
                idTypeUser: 4
            }
        }
        const data = {
            // centreRel: {idCentre:this.state.idCentre},
            statut: {idStatut:this.state.statut},
            userRel: user,
            poste: {idPoste:this.state.type},
            dateDebut: this.state.dateDebut
        }
        fetchPostHeader('/covid/ajout-personal',data).then(result=>{
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
                            <h4 className="card-title col-md-4">Liste employés</h4>
                            <select className="card-title col-md-4" value={this.state.viewType} onChange={this.handleChange.bind(this,"viewType")}>
                                <option value={0}>Tous</option>
                                {this.state.listType.map((one,i)=>{
                                    return(
                                        <option key={i} value={one.idPoste}>{one.designation}</option>
                                    )
                                })}
                            </select>
                            <a className="card-title col-md-4" style={{textAlign:'right'}} href="#0" onClick={()=>this.clickIcon(0,"créer")}><FontAwesomeIcon icon={faPlusCircle}/> Nouveau</a>
                        </div>
                        <div className="all-list-container row">
                            <div className="list-header col-md-12">
                                <div className="row col-md-12">
                                    <h5 className="col-md-4">Nom et prénom(s)</h5>
                                    <h5 className="col-md-3">Contact(s)</h5>
                                    <h5 className="col-md-3">Type emlpoyé</h5>
                                    <h5 className="col-md-2">Action</h5>
                                </div>
                            </div>
                            <div className="list-content col-md-12">
                                {this.state.list.map((one, i)=>{
                                    return(
                                    <div className="each-line-list row col-md-12" key={i}>
                                        <div className="col-md-4">{one.userRel.nom+" "+one.userRel.prenoms}</div>
                                        <div className="col-md-3">
                                            <ul>
                                            {one.userRel.contact!==null?one.userRel.contact.map((contact,j)=>{
                                                return <li key={j}>{contact.contact}</li>
                                            }):""}
                                            </ul>
                                        </div>
                                        <div className="col-md-3">{one.poste.designation}</div>
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
                                <h5>{this.state.typeShow===1?"Vue":this.state.typeShow===2?"Modification":this.state.typeShow===3?"Suppression":"Ajout"}</h5>
                            </div>
                            <div className="edit-content col-md-8">    
                                {this.state.typeShow!==3?
                                <div className="row">
                                    <div className="input-group">
                                        <label className="col-md-5">Nom</label>
                                        <input className="col-md-7" type="text" disabled={this.state.typeShow===1} required={true} value={this.state.nom} onChange={this.handleChange.bind(this,"nom")}/>
                                    </div>
                                    <div className="input-group">
                                        <label className="col-md-5">Prénom(s)</label>
                                        <input className="col-md-7" type="text" disabled={this.state.typeShow===1} value={this.state.prenoms} onChange={this.handleChange.bind(this,"prenoms")}/>
                                    </div>
                                    <div className="input-group">
                                        <label className="col-md-5">E-mail</label>
                                        <input className="col-md-7" type="email" disabled={this.state.typeShow===1} value={this.state.mail} onChange={this.handleChange.bind(this,"mail")}/>
                                    </div>
                                    <div className="input-group">
                                        <label className="col-md-5">Téléphone</label>
                                        <input className="col-md-7" type="tel" disabled={this.state.typeShow===1} required={true} value={this.state.phone} onChange={this.handleChange.bind(this,"phone")}/>
                                    </div>
                                    <div className="input-group">
                                        <label className="col-md-5">Mot de passe</label>
                                        <input className="col-md-7" type="password" disabled={this.state.typeShow===1} required={this.state.typeShow===0} value={this.state.mdp} onChange={this.handleChange.bind(this,"mdp")}/>
                                    </div>
                                    <div className="input-group">
                                        <label className="col-md-5">Poste emlpoyé</label>
                                        <select className="col-md-7" disabled={this.state.typeShow===1} value={this.state.type} required={true} onChange={this.handleChange.bind(this,"type")}>
                                            <option>Sélectionner un poste</option>
                                            {this.state.listType.map((one,i)=>{
                                                return(
                                                    <option key={i} value={one.idPoste}>{one.designation}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    {this.state.typeShow!==1?
                                    <>
                                    <button onClick={()=>{this.setState({show:false});this.clearData()}} className="annuler col-md-5">Annuler</button>
                                    <button onClick={()=>this.enregistrer()} className="enregistrer col-md-5">Enregistrer</button>
                                    </>:""}
                                </div>:
                                <div className='row'>
                                    <div className="input-group">
                                        <span className="col-md-12" style={{textAlign:'center'}}>Voulez-vous vraiment supprimer {this.state.nom+' '+this.state.prenoms}?</span>
                                    </div>
                                    <button onClick={()=>{this.setState({show:false});this.clearData()}} className="annuler col-md-5">Annuler</button>
                                    <button onClick={()=>this.supprimer()} className="enregistrer col-md-5">Supprimer</button>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}