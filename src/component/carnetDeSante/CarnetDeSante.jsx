import React, {Component} from 'react';
import './CarnetDeSante.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookMedical, faHandPaper, faHourglassStart, faPenNib ,faPhoneAlt, faStarOfLife, faAmbulance, faFileAlt, faArrowLeft, faTrashAlt, faEdit, faTint, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { authUser } from '../../services/authUser';
import { fetchPost } from '../../services/global.service';
import {Modal,Button} from 'react-bootstrap';
import { utile } from '../../services/utile';

class CarnetDeSante extends Component{
    constructor(props){
        super();
        this.state={
            etatShowMenu : 1,
            newEtat : false,
            etatShow :  false,
            etatShow2 :  false,
            etatEdit : false,
            listeUrgence : [],
            nom : { valuesText : '' , etat : 1 },
            lien : { valuesText : '' , etat : 1 },
            phone : { valuesText : '' , etat : 1 },
            adresse : { valuesText : '' , etat : 1 },
            error : false,
            messageError : '', 
            dataEdit : null
        }
    }
    setStateByNameState(name,valeur,etatChamps){
        if(name === 'nom')this.setState({ nom : { valuesText : valeur , etat : etatChamps }}); 
        else if( name === 'lien') this.setState({ lien : { valuesText : valeur , etat : etatChamps }}); 
        else if( name === 'phone') this.setState({ phone : { valuesText : valeur , etat : etatChamps } });
        else if( name === 'adresse') this.setState({ adresse : { valuesText : valeur , etat : etatChamps }});
    }
    setValue(names,event){
        const valeur = event.target.value;
        if(valeur !== '' && valeur != null){this.setStateByNameState(names,valeur,2)}else{ this.setStateByNameState(names,'',3)}
    }
    getErreurChamps(etat,text){
        if(etat){
            return <div className="alert alert-danger form-control" >{text}</div>
        }
        return <p></p>;
    }
    getVerificationDataUrgence(){
        if(this.state.nom.etat === 2 && this.state.lien.etat === 2 && this.state.phone.etat === 2 && this.state.adresse.etat === 2){
            return true;
        }
        return false;
    }
    addUrgence=()=>{
        if(this.getVerificationDataUrgence()){
            const data = {
                nom : this.state.nom.valuesText,
                lien : this.state.lien.valuesText,
                phone : this.state.phone.valuesText,
                adresse : this.state.adresse.valuesText,
                token : authUser.getToken()
            }
            fetchPost('/contactUrgence/add',data).then(datas=>{
                alert(''+datas.message);
                this.getListeUrgence();
                this.setState({error:false,message: ''});
            });
        }else{ 
            this.setState({error:true,messageError: 'Verifiez votre champs car il y a une erreur ou un champs vide'});
        }
    }
    supprimerContactUrgence=(dataTmp)=>{
        if(utile.getConfirme("Vous le vous vraiment supprimer cet contact d'urgence ? ")){
            const data = {
                idContactUrgence : dataTmp.idContactUrgence,
                token : authUser.getToken()
            }
            fetchPost('/contactUrgence/delete',data).then(datas=>{
                alert(''+datas.message);
                this.getListeUrgence();
            });
        }
    }
    openModalAddUrgence=()=>{
        this.setState({showModal : true,etatEdit : false,
            nom : { valuesText : '' , etat : 1 }, 
            lien : { valuesText : '' , etat : 1 }, 
            phone : { valuesText : '' , etat : 1 },
            adresse : { valuesText : '' , etat : 1 } 
        });
    }
    openModalUpdateUrgence=(data)=>{
        this.setState({showModal : true,etatEdit : true, dataEdit : data,
            nom : { valuesText : data.nom , etat : 2 }, 
            lien : { valuesText : '' , etat : 1 }, 
            phone : { valuesText : data.phone , etat : 2 },
            adresse : { valuesText : data.adresse , etat : 2 } 
        });
    }
    updateUrgence=()=>{
        if(this.getVerificationDataUrgence()){
            const data = {
                nom : this.state.nom.valuesText,
                lien : this.state.lien.valuesText,
                phone : this.state.phone.valuesText,
                adresse : this.state.adresse.valuesText,
                idContactUrgence: this.state.dataEdit.idContactUrgence,
                token : authUser.getToken()
            }
            fetchPost('/contactUrgence/update',data).then(datas=>{
                alert(''+datas.message);
                this.getListeUrgence();
                this.setState({error:false,message: ''});
            });
        }else{ 
            this.setState({error:true,messageError: 'Verifiez votre champs car il y a une erreur ou un champs vide'});
        }
    }
    getDossierMedicaux(){
        return (
            <div className="allUrgenceCarnetDeSante">
                <div>
                    <ul className="accessCarnetDeSante">
                        <li className="retourCarnetDeSante" onClick={()=>{this.setState({newEtat : false})}}><FontAwesomeIcon icon={faArrowLeft}/></li>
                        <li className="miniTitleUrgenceCarnetDeSante">Mes dossiers médicaux</li>
                    </ul>
                </div>
                <div className="row">
                    <div className="col-md-5 col-sm-12 dossierMedicauxPatient">
                        <div className="row">
                            <div className="col-10"><p className="textDossierMedicauxPatient">Consultation</p></div>
                            <div className="col-2"><p className="textNumberDossierMedicauxPatient">11</p></div>
                            <div className="col-12"><FontAwesomeIcon style={{color: '#007bff'}}  className="iconDossierMedicauxPatient" icon={faBook}/></div>
                            <div className="col-5" style={{marginTop: "2%"}}><p className="addDossierMedicauxPatient">Ajouter</p></div>
                            <div className="col-7" style={{marginTop: "2%"}}><p className="docDossierMedicauxPatient">Dr Botosoamalandy</p></div>
                        </div>
                    </div>
                    <div className="col-md-5 col-sm-12 dossierMedicauxPatient">
                        <div className="row">
                            <div className="col-10"><p className="textDossierMedicauxPatient">Analyses biologiques</p></div>
                            <div className="col-2"><p className="textNumberDossierMedicauxPatient">11</p></div>
                            <div className="col-12"><FontAwesomeIcon style={{color: 'red'}} className="iconDossierMedicauxPatient" icon={faTint}/></div>
                            <div className="col-5" style={{marginTop: "2%"}}><p className="addDossierMedicauxPatient">Ajouter</p></div>
                            <div className="col-7" style={{marginTop: "2%"}}><p className="docDossierMedicauxPatient">Dr Botosoamalandy</p></div>
                        </div>
                    </div>
                    <div className="col-md-5 col-sm-12 dossierMedicauxPatient">
                        <div className="row">
                            <div className="col-10"><p className="textDossierMedicauxPatient">Examins d'imageries</p></div>
                            <div className="col-2"><p className="textNumberDossierMedicauxPatient">11</p></div>
                            <div className="col-12"><FontAwesomeIcon style={{color: 'orange'}} className="iconDossierMedicauxPatient" icon={faHandPaper}/></div>
                            <div className="col-5" style={{marginTop: "2%"}}><p className="addDossierMedicauxPatient">Ajouter</p></div>
                            <div className="col-7" style={{marginTop: "2%"}}><p className="docDossierMedicauxPatient">Dr Botosoamalandy</p></div>
                        </div>
                    </div>
                    <div className="col-md-5 col-sm-12 dossierMedicauxPatient">
                        <div className="row">
                            <div className="col-10"><p className="textDossierMedicauxPatient">Prescriptions</p></div>
                            <div className="col-2"><p className="textNumberDossierMedicauxPatient">11</p></div>
                            <div className="col-12"><FontAwesomeIcon style={{color: 'green'}} className="iconDossierMedicauxPatient" icon={faPenNib}/></div>
                            <div className="col-5" style={{marginTop: "2%"}}><p className="addDossierMedicauxPatient">Ajouter</p></div>
                            <div className="col-7" style={{marginTop: "2%"}}><p className="docDossierMedicauxPatient">Dr Botosoamalandy</p></div>
                        </div>
                    </div>
                    <div className="col-md-5 col-sm-12 dossierMedicauxPatient">
                        <div className="row">
                            <div className="col-10"><p className="textDossierMedicauxPatient">Examins d'imageries</p></div>
                            <div className="col-2"><p className="textNumberDossierMedicauxPatient">11</p></div>
                            <div className="col-12"><FontAwesomeIcon style={{color: 'black'}} className="iconDossierMedicauxPatient" icon={faHourglassStart}/></div>
                            <div className="col-5" style={{marginTop: "2%"}}><p className="addDossierMedicauxPatient">Ajouter</p></div>
                            <div className="col-7" style={{marginTop: "2%"}}><p className="docDossierMedicauxPatient">Dr Botosoamalandy</p></div>
                        </div>
                    </div>
                    <div className="col-md-5 col-sm-12 dossierMedicauxPatient">
                        <div className="row">
                            <div className="col-10"><p className="textDossierMedicauxPatient">Document libre</p></div>
                            <div className="col-2"><p className="textNumberDossierMedicauxPatient">11</p></div>
                            <div className="col-12"><FontAwesomeIcon style={{color: 'gray'}} className="iconDossierMedicauxPatient" icon={faBookMedical}/></div>
                            <div className="col-5" style={{marginTop: "2%"}}><p className="addDossierMedicauxPatient">Ajouter</p></div>
                            <div className="col-7" style={{marginTop: "2%"}}><p className="docDossierMedicauxPatient">Dr Botosoamalandy</p></div>
                        </div>
                    </div>
                    <div className="col-md-10 col-sm-12" style={{textAlign: "center"}}><button className="btn btn-primary" style={{width: "50%"}}>Ajouter</button></div>
                </div>
            </div>
        )
    }
    getDonneSante(){
        return (
            <div className="allUrgenceCarnetDeSante">
                <div>
                    <ul className="accessCarnetDeSante">
                        <li className="retourCarnetDeSante" onClick={()=>{this.setState({newEtat : false})}}><FontAwesomeIcon icon={faArrowLeft}/></li>
                        <li className="miniTitleUrgenceCarnetDeSante">Données Santés</li>
                    </ul>
                </div>
            </div>
        )
    }
    getUrgence(){
        return (
            <div className="allUrgenceCarnetDeSante">
                <div>
                    <ul className="accessCarnetDeSante">
                        <li className="retourCarnetDeSante" onClick={()=>{this.setState({newEtat : false})}}><FontAwesomeIcon icon={faArrowLeft}/></li>
                        <li className="miniTitleUrgenceCarnetDeSante">Urgence</li>
                    </ul>
                </div>
            
                <div className="row rowUrgenceCarnetDeSante">
                    <div className="col-md-6 col-sm-12">
                        <div className="rowPatient"><h3 className="titlePatient"><FontAwesomeIcon className="fontAwesomeIconClass" icon={faStarOfLife}/> &ensp;Informations</h3></div>
                        
                        <div className="urgencePatient"> 
                            <div className="row rowPatient">
                                <div className="col-md-8 textMoiPatient">Je ne sais pas</div>
                                <div className="col-md-4 textTwoMoiPatient">3 mois</div>
                            </div> 
                            <div className="row rowPatient">
                                <div className="col-md-8 textMoiPatient">Je ne sais pas</div>
                                <div className="col-md-4 textTwoMoiPatient"><BootstrapSwitchButton checked={true} onlabel='Oui' disabled={true} onstyle="secondary"  offlabel='Non' /></div>
                            </div> 
                            <div className="row rowPatient">
                                <div className="col-md-8 textMoiPatient">Je ne sais pas</div>
                                <div className="col-md-4 textTwoMoiPatient"><BootstrapSwitchButton checked={true} onlabel='Oui' disabled={true} onstyle="secondary" offlabel='Non' /></div>
                            </div> 
                            <div className="row rowPatient">
                                <div className="col-md-8 textMoiPatient">Je ne sais pas</div>
                                <div className="col-md-4 textTwoMoiPatient"><BootstrapSwitchButton checked={true} onlabel='Oui' disabled={true} onstyle="secondary" offlabel='Non' /></div>
                            </div> 
                            <div className="row rowPatient">
                                <div className="col-md-8 textMoiPatient">Je ne sais pas</div>
                                <div className="col-md-4 textTwoMoiPatient"><BootstrapSwitchButton checked={true} onlabel='Oui' disabled={true} onstyle="secondary"  offlabel='Non' /></div>
                            </div> 
                            <div className="row rowPatient">
                                <div className="col-md-8 textMoiPatient">Je ne sais pas</div>
                                <div className="col-md-4 textTwoMoiPatient"><BootstrapSwitchButton checked={true} onlabel='Oui' disabled={true} onstyle="secondary" offlabel='Non' /></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6  col-sm-12">
                        <div className="rowPatient"><h3 className="titlePatient"><FontAwesomeIcon className="fontAwesomeIconClass" icon={faPhoneAlt}/> &ensp;Contact en cas d'urgence</h3></div>
                        {
                            (this.state.listeUrgence.length > 0)
                            ? (
                                <div className="allListeConatctUrgencePatient">
                                    {
                                        (this.state.listeUrgence).map((dataTmp,i)=>{
                                            return (
                                                <div className="divConatctUrgencePatient" key={i}>
                                                    <div className="contactOnePatient">{dataTmp.nom}</div>
                                                    <div className="row">
                                                        <div className="col-md-6 col-sm-12"><div className="contactTwoPatient">{dataTmp.adresse}</div></div>
                                                        <div className="col-md-6 col-sm-12 iconAddCarnetDeSante" onClick={()=>this.openModalUpdateUrgence(dataTmp)}><FontAwesomeIcon icon={faEdit}/></div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 col-sm-12"><div className="contactTwoPatient">lien : {dataTmp.lienParente}</div></div>
                                                        <div className="col-md-6 col-sm-12 iconAddCarnetDeSanteV2" onClick={()=>this.supprimerContactUrgence(dataTmp)}><FontAwesomeIcon icon={faTrashAlt}/></div>
                                                    </div>
                                                    <div className="contactThreePatient"><FontAwesomeIcon icon={faPhoneAlt}/> &ensp; {dataTmp.phone} </div>
                                                </div>
                                            )
                                        })
                                    }
                                    
                                </div>
                            ): (<div></div>)
                        }
                        
                        <div className="addContactUrgencePatient" onClick={()=>this.openModalAddUrgence()}>
                            <ul>
                                <li className="iconContactUrgencePatient"><FontAwesomeIcon icon={faPlusCircle} /></li>
                                <li className="liContactUrgencePatient">Ajouter les contacts de vos proches</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    getMenuPrincipaleCarnetSante(){
        return (
            <div>
                <ul className="ulChoixCarnetDeSante">
                    <li className="liChoixCarnetDeSante" onClick={()=>{this.setState({etatShowMenu : 1, newEtat : true})}}>
                        <div className="divChoixCarnetDeSante">
                            <div className="divImgChoixCarnetDeSante"><FontAwesomeIcon icon={faAmbulance} id="iconDecorationCarnetDeSante" className="imgChoixCarnetDeSante" /></div>
                            <div className="textChoixCarnetDeSante">Urgence</div>
                            <p className="pChoixCarnetDeSante">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                    </li>
                    <li className="liChoixCarnetDeSante" onClick={()=>{this.setState({etatShowMenu : 2, newEtat : true})}}>
                        <div className="divChoixCarnetDeSante">
                            <div className="divImgChoixCarnetDeSante"><FontAwesomeIcon icon={faBookMedical} id="iconDecorationCarnetDeSante" className="imgChoixCarnetDeSante" /></div>
                            <div className="textChoixCarnetDeSante">Mes dossiers médicaux</div>
                            <p className="pChoixCarnetDeSante">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                    </li>
                    <li className="liChoixCarnetDeSante" onClick={()=>{this.setState({etatShowMenu : 3, newEtat : true})}}>
                        <div className="divChoixCarnetDeSante">
                            <div className="divImgChoixCarnetDeSante"><FontAwesomeIcon icon={faFileAlt} id="iconDecorationCarnetDeSante" className="imgChoixCarnetDeSante" /></div>
                            <div className="textChoixCarnetDeSante">Mes données santés</div>
                            <p className="pChoixCarnetDeSante">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
    getListeUrgence(){
        const data= {token : authUser.getToken()}
        fetchPost('/contactUrgence/list',data).then(datas=>{
            console.log('type-medecin/list : ',datas);
            this.setState({ listeUrgence: datas });
        });
    }
    componentDidMount() {
        this.getListeUrgence();
    }
    render(){
        return (
           <div>
                <div className="allContentPatient">
                    { 
                        (!this.state.newEtat) ? this.getMenuPrincipaleCarnetSante()
                        :(<div>
                            {
                                (this.state.etatShowMenu === 1 ) ?  this.getUrgence()
                                :(this.state.etatShowMenu === 2 ) ?  this.getDossierMedicaux()
                                :(this.state.etatShowMenu === 3 ) ?  this.getDonneSante()
                                : (<div></div>)
                            }
                        </div>)
                        
                    
                    }

                </div>


                {/* modal */}
                <Modal show={this.state.showModal} onHide={()=>{this.setState({showModal : false});}} animation={true}>
                    <Modal.Header closeButton>
                    {
                            (this.state.etatEdit && this.state.dataEdit!==null && this.state.dataEdit!==undefined)
                            ? (<Modal.Title>Modifiés les contacts de mes proches</Modal.Title>)
                            : (!this.state.etatEdit)
                            ?(<Modal.Title>Ajouter les contacts de mes proches</Modal.Title>)
                            : (<Modal.Title>Ajouter ou modifier les contacts de vos proches</Modal.Title>)
                    }
                    
                    </Modal.Header>
                    <Modal.Body>
                        {
                            (this.state.etatEdit && this.state.dataEdit!==null && this.state.dataEdit!==undefined)
                            ? (
                                <div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    <div className="col-md-12 col-sm-12">
                                        <p className="titleChampsUrgenceCarnetDeSante">Nom complet</p>
                                        <input type="text" placeholder="Nom et prénom" value={this.state.nom.valuesText} onChange={(e) => this.setValue("nom", e)} className="form-control" />
                                    </div>
                                    <div className="col-md-12 col-sm-12">
                                        <p className="titleChampsUrgenceCarnetDeSante">Lien</p>
                                        <select className="form-control" onChange={(e) => this.setValue("lien", e)}>
                                            <option value=''>Lien</option>
                                            <option value='Parents'>Parents</option>
                                            <option value='Enfants'>Enfants</option>
                                            <option value='Famille'>Famille</option>
                                            <option value='Tuteur'>Tuteur</option>
                                            <option value='Amis'>Amis</option>
                                        </select>
                                    </div>
                                    <div className="col-md-12 col-sm-12">
                                        <p className="titleChampsUrgenceCarnetDeSante">Téléphone</p>
                                        <input type="text" placeholder="Numéro de téléphone" value={this.state.phone.valuesText} onChange={(e) => this.setValue("phone", e)} className="form-control" />
                                    </div>
                                    <div className="col-md-12 col-sm-12">
                                        <p className="titleChampsUrgenceCarnetDeSante">Adresse</p>
                                        <input type="text" placeholder="Adresse du personne" value={this.state.adresse.valuesText} onChange={(e) => this.setValue("adresse", e)} className="form-control" />
                                    </div>

                                    {this.getErreurChamps(this.state.error,this.state.messageError)}
                                </div>
                            ): (!this.state.etatEdit)
                            ?(
                                <div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    <div className="col-md-12 col-sm-12">
                                        <p className="titleChampsUrgenceCarnetDeSante">Nom complet</p>
                                        <input type="text" placeholder="Nom et prénom" onChange={(e) => this.setValue("nom", e)} className="form-control" />
                                    </div>
                                    <div className="col-md-12 col-sm-12">
                                        <p className="titleChampsUrgenceCarnetDeSante">Lien</p>
                                        <select className="form-control" onChange={(e) => this.setValue("lien", e)}>
                                            <option value=''>Lien</option>
                                            <option value='Parents'>Parents</option>
                                            <option value='Enfants'>Enfants</option>
                                            <option value='Famille'>Famille</option>
                                            <option value='Tuteur'>Tuteur</option>
                                            <option value='Amis'>Amis</option>
                                        </select>
                                    </div>
                                    <div className="col-md-12 col-sm-12">
                                        <p className="titleChampsUrgenceCarnetDeSante">Téléphone</p>
                                        <input type="text" placeholder="Numéro de téléphone" onChange={(e) => this.setValue("phone", e)} className="form-control" />
                                    </div>
                                    <div className="col-md-12 col-sm-12">
                                        <p className="titleChampsUrgenceCarnetDeSante">Adresse</p>
                                        <input type="text" placeholder="Adresse du personne" onChange={(e) => this.setValue("adresse", e)} className="form-control" />
                                    </div>

                                    {this.getErreurChamps(this.state.error,this.state.messageError)}
                                </div>
                            ): (<div></div>)
                        }
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={()=>{this.setState({showModal : false});}}>Annuler</Button>
                        {
                            (this.state.etatEdit && this.state.dataEdit!==null && this.state.dataEdit!==undefined)
                            ? (<Button variant="warning" onClick={()=>this.updateUrgence()} >Modifier</Button>)
                            : (!this.state.etatEdit)
                            ?(<Button variant="primary" onClick={()=>this.addUrgence()} >Ajouter</Button>)
                            : (<div></div>)
                        }
                    </Modal.Footer>
                </Modal>
                
                {/* modal */}
                            
           </div>
        )
    }
}
export default CarnetDeSante;