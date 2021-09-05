import React, {Component} from 'react';
import './MvtStock.css';
import { fetchPost,fetchGet } from '../../services/global.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';

class MvtStock extends Component{
    constructor(props){
        super();
        this.state={
            etatAjout : false,
            idVaccin : {value: '',etat : 0},
            quantite : {value: 1,etat : 0},
            lot : {value: 1,etat : 0},
            dateFabrication : {value: 1,etat : 0},
            dateExpiration : {value: '',etat : 0},
            erreur : {message : '', etat : 1},
            vaccins : []
        }
    }
    getListVaccin(){
        fetchGet('/vaccin/list').then((response) => {
            this.setState({vaccins : response});
            //console.log('resp : ',response);
        })
    }
     setStateByNameState(name,valeur,etatChamps){
		if(name === 'idVaccin')this.setState({ idVaccin : { value : valeur , etat : etatChamps }}); 
		else if( name === 'nbrInjection') this.setState({ nbrInjection : { value : valeur , etat : etatChamps }}); 
		else if( name === 'interaction') this.setState({ interaction : { value : valeur , etat : etatChamps }}); 
		else if( name === 'description') this.setState({ description : { value : valeur , etat : etatChamps } }); 
	}
    setValue(names,event){
		const valeur = event.target.value;
		if(valeur !== '' && valeur != null){this.setStateByNameState(names,valeur,2)}else{ this.setStateByNameState(names,'',3)}
    }
    verificationValue(value){
        if(value.value !== undefined && value.value !==null && value.etat===2){
            return true;
        }
        return false;
    }
    addVaccin=()=>{
        if(this.verificationValue(this.state.designation) && this.verificationValue(this.state.nbrInjection) && this.verificationValue(this.state.interaction) && this.verificationValue(this.state.description)){
            const data = {
                designation : this.state.designation.value,
                nbrInjection : this.state.nbrInjection.value,
                interaction : this.state.interaction.value,
                description : this.state.description.value
            }
            
            fetchPost('/vaccin/add',data).then(resultatTmp=>{
                if(resultatTmp.status){
                    this.setState({erreur :{message : ""+resultatTmp.message,etat: 3},etatAjout : false});
                    this.showDiv1();
                    this.getListVaccin();
                }else{
                    this.setState({erreur :{message : "Erreur : "+resultatTmp.message,etat: 2}});
                }
            });
        }else{
            alert('Il y a une champs vide');
            this.setState({erreur :{message : "Il y a une champs vide",etat: 2}});
        }
    }
    getDataHtmlInput(etatAjout){
        return (
            <>
                <div className="champ-ajout-vaccin col-md-11 col-sm-11" hidden={!etatAjout}>
                        <div className="champ-ajout-vaccin-title">Ajouter un vaccin</div>
                        <div className="form-group row new-champ">
                            <div className="col-4 new-span-input-champ-vaccin" >Désignation</div>
                            <input type="text" onChange={(e) => this.setValue('designation', e)}  className="col-8 new-input-champ-vaccin"/>
                        </div>
                        <div className="form-group row new-champ">
                            <div className="col-4 new-span-input-champ-vaccin" >Nombre(s) d'injection</div>
                            <input type="number" onChange={(e) => this.setValue('nbrInjection', e)}  className="col-8 new-input-champ-vaccin"/>
                        </div>
                        <div className="form-group row new-champ">
                            <div className="col-4 new-span-input-champ-vaccin" >Interaction</div>
                            <input type="number" onChange={(e) => this.setValue('interaction', e)}  className="col-8 new-input-champ-vaccin"/>
                        </div>
                        <div className="form-group row new-champ">
                            <div className="col-4 new-span-input-champ-vaccin" >Description</div>
                            <textarea rows="3" onChange={(e) => this.setValue('description', e)} className="col-8 new-input-champ-vaccin"></textarea>
                        </div>
                        <div className="champ-ajout-erreur-vaccin" hidden={this.state.erreur.etat!==2}>{this.state.erreur.message}</div>
                        <div className="form-group row new-champ">
                            <button className="col-md-5 col-sm-12 bouton-fermer-vaccin" onClick={()=>{this.setState({etatAjout : false})}}>Fermer</button>
                            <span className="col-md-2 col-sm-12"></span>
                            <button className="col-md-5 col-sm-12 bouton-enregistrer-vaccin" onClick={()=>this.addVaccin()} >Enregistrer</button>
                        </div>
                </div>
                
            </>
        )
    }
    showDiv1() {
        setTimeout(
            () => {document.getElementById("div1").style.display = "none";}, 
            5000
          );
    }
    supprimerVaccin=(idVaccin)=>{
        if(idVaccin>0){
            fetchGet('/vaccin/delete/'+idVaccin).then((response) => {
                if(response.status === 200){
                    this.getListVaccin();
                    this.setState({erreur :{message : ""+response.message,etat: 3}});
                }
                //console.log('resp : ',response);
            })
        }
    }
    
    componentDidMount() {
        this.getListVaccin();
    }
    
    render(){
        return (
           <div className="new-div-vaccin">
               <div className="row">
                    <h1 className="new-div-vaccin-big-title col-12">Mes vaccins</h1>
                    <div className="div-ajouter-vaccin"><button className="bouton-ajouter-vaccin" hidden={this.state.etatAjout} onClick={()=>{this.setState({etatAjout : true,erreur :{message : "",etat: 1}})}}>Ajouter</button></div>
                    {this.getDataHtmlInput(this.state.etatAjout)}
                    <div className="alert alert-success col-11" style={{marginLeft: "2%",display: "initiale"}} id="div1" hidden={this.state.erreur.etat!==3}>
                        {this.state.erreur.message}
                    </div>
                    <div className="col-md-12 col-sm-12 div-responsive-vaccin">
                        <div className="table-responsive ">
                            <table className="table table-border table-vaccin-theader-body" style={{border: "2px solid #4d2863"}}>
                                <thead style={{backgroundColor : "#4d2863",color: "white"}}>
                                    <tr>
                                        <th scope="col">Désignation</th>
                                        <th scope="col">Nombre d'injection</th>
                                        <th scope="col">Interaction</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Supprimer</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.vaccins.map((dataTmp,i)=>{
                                            return (
                                                <tr key={i}>
                                                    <td>{dataTmp.designation}</td>
                                                    <td>{dataTmp.nbrInjection}</td>
                                                    <td>{dataTmp.interaction} jours</td>
                                                    <td>
                                                        <div className="limiter-ecriture-vaccin"  data-tip data-for={'description_vaccin'+i}>
                                                            {dataTmp.description}    
                                                            <ReactTooltip id={'description_vaccin'+i} type='error'>
                                                                <span className="limiter-ecriture-vaccin-description">{dataTmp.description}</span>
                                                            </ReactTooltip>
                                                        </div>
                                                    </td>
                                                    <td><button className="form-control btn-danger" onClick={()=>this.supprimerVaccin(dataTmp.idVaccin)}><FontAwesomeIcon icon={faTrash} /></button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
               </div>
                
           </div>
        )
    }
}
export default MvtStock;