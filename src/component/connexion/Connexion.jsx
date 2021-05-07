import React, {Component} from 'react';
import './Connexion.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import {fetchPost} from '../../services/global.service';
import { authUser } from '../../services/authUser';
import {Modal,Button} from 'react-bootstrap';
import details1officeworker from '../../assets/img/details-1-office-worker.svg';

class Connexion extends Component{
    constructor(props){
        super();
        this.state = {
            identification : {valuesText : '',etat : 1},
            mdp : {valuesText : '',etat : 1},
            error : {message : '',activation : false},
            code1 : -1,
            code2 : -1,
            code3 : -1,
            code4 : -1,
            erreurEtatModal : false,
            erreurModal: '',
            showValidation : false,
            nonValider : false,
            status : 0,
            disableButton:false
        }
        this.setValue = this.setValue.bind(this);
    }
    setValueCode(names, event){
        const valeur = event.target.value;
        if(names==='code1'){if(valeur.length===1){this.code2.focus();this.setState({code1: valeur})}}
        if(names==='code2'){if(valeur.length===1){this.code3.focus();this.setState({code2: valeur})}}
        if(names==='code3'){if(valeur.length===1){this.code4.focus();this.setState({code3: valeur})}}
        if(names==='code4'){if(valeur.length===1){this.setState({code4: valeur})}}
    }
    setStateByNameState(name,valeur,etatChamps){
        if(name === 'identification')this.setState({ identification : { valuesText : valeur , etat : etatChamps }}); 
        else if( name === 'mdp') this.setState({ mdp : { valuesText : valeur , etat : etatChamps }}); 
    }
    setValue(names,event){
        const valeur = event.target.value;
        this.setState({error : {message : '',activation: false}});
        if(valeur !== '' && valeur != null){this.setStateByNameState(names,valeur,2)}else{ this.setStateByNameState(names,'',3)}
    }
    getErrorMessage(valeur , text){
        if(valeur>=3){
            return <div className="col-md-12 col-sm-12 labelErrors">{text}</div>
        }
        return <p></p>;
    }
    openModalValidation=()=>{
        this.setState({showValidation : true})
    }
    loginConnexion = () => {
        this.setState({disableButton:true,error:{activation:false}});
        const dataIdentification = this.state.identification;const dataMdp = this.state.mdp;
        if(dataIdentification.etat === 2 && dataIdentification.etat === 2 ){
            const userAuth = {identification: dataIdentification.valuesText,mdp: dataMdp.valuesText}
            fetchPost('/users/loginMeddoc',userAuth).then(data=>{
                if(data.status === 300){
                    this.setState({showValidation : true});
                    this.setState({error : {message : data.message,activation: true},nonValider : true,status : 300});
                }else if(data.status === 500){
                    this.setState({showValidation : true});
                    this.setState({error : {message : data.message,activation: true},nonValider : true, status : 500});
                }else if(data.status === 200){
                    const log = authUser.loginUser(data.token,data.typeUser,data.sessionToken,data.profilPicture);
                    localStorage.setItem('photo',data.profilPicture);
                    localStorage.setItem('idUser',data.idUser);
                    localStorage.setItem('pseudo',data.pseudo);
                    localStorage.setItem('connected',true);
                    localStorage.setItem('etatshowAvertissement',true);
                    if(log){
                        window.location.replace(''+authUser.premierUrl(data.typeUser));
                    }else{
                        console.log('log : '+log+"   :=> ",data);
                        localStorage.clear();
                        this.setState({error : {message : 'Il y a une erreur.',activation: true}})
                    }
                }else{
                    this.setState({error : {message : data.message,activation: true}})
                }
                this.setState({disableButton:false});
            }).catch(error=>{
                this.setState({disableButton:false,error : {message : 'Erreur de connexion aux réseaux',activation: true}});
            });
        }
    }
    confirmationCodeMedecinMedecin=()=>{
        if(this.state.code1>=0 && this.state.code2>=0 && this.state.code3>=0 && this.state.code4>=0){
            const dataTmp = {
                identification: this.state.identification.valuesText,
                code : this.state.code1+''+this.state.code2+''+this.state.code3+''+this.state.code4
            }
            fetchPost('/users/verificationCodeValidation',dataTmp).then(resultatTmp=>{
                if(resultatTmp.status===200){
                    alert('Compte confirmé')
                    this.setState({erreurModal : "",erreurEtatModal: false,showValidation : false});
                }else{
                    this.setState({erreurModal : "Erreur: verifiez votre code.",erreurEtatModal: true});
                }
            });
        }else{
            this.setState({erreurModal : "Erreur: verifiez votre code.",erreurEtatModal: true});
        }
    }
    confirmationCodeMedecinPatient=()=>{
        if(this.state.code1>=0 && this.state.code2>=0 && this.state.code3>=0 && this.state.code4>=0){
            const dataTmp = {
                identification: this.state.identification.valuesText,
                code : this.state.code1+''+this.state.code2+''+this.state.code3+''+this.state.code4
            }
            fetchPost('/users/validationComptePatient',dataTmp).then(resultatTmp=>{
                if(resultatTmp.status){
                    alert('Compte confirmé')
                    this.setState({erreurModal : "",erreurEtatModal: false,showValidation : false});
                }else{
                    this.setState({erreurModal : "Erreur: verifiez votre code.",erreurEtatModal: true});
                }
            });
        }else{
            this.setState({erreurModal : "Erreur: verifiez votre code.",erreurEtatModal: true});
        }
    }
    keyPressed=(e)=>{
        if(e.keyCode===13)
            this.loginConnexion();
    }
    render(){
        return (
            <div className="logginAllMeddoc">
                <div className="row">
                     <div className="col-md-6 col-sm-12 sonVlogginAllMeddoc">
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <h1 className="titleH1Login"><b>Connexion</b></h1>
                                <p className="titlePLogin">Pas encore de compte ? <a className="titleALogin" href="/inscription"> Créer mon compte</a></p>
                                <div className="form-group row descenteLogin">
                                    <div className="input-group">
                                        <span className="form-control spanSonOfChildLoggin col-2" id="spanSonOfChildLoggins"><FontAwesomeIcon style={{textAlign : "center"}} icon={faUser} /></span>
                                        <input className="form-control inputSonOfChildLoggin col-10" id="inputSonOfChildLoggins" required={true} type="text" value={this.state.identification.valuesText} onChange={(e) => this.setValue("identification", e)} placeholder="E-mail ou numéro de téléphone" name="identification"/>
                                        {this.getErrorMessage(this.state.identification.etat,'Le champs identification est obligatoire')}
                                    </div>
                                    
                                </div>
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="form-control spanSonOfChildLoggin col-2" id="spanSonOfChildLoggins"><FontAwesomeIcon icon={faLock} /></span>
                                        <input onKeyDown={this.keyPressed.bind(this)} className="form-control inputSonOfChildLoggin col-10" id="inputSonOfChildLoggins" required={true} type="password" value={this.state.mdp.valuesText} onChange={(e) => this.setValue("mdp", e)} placeholder="Mot de passe" name="mdp"/>
                                        {this.getErrorMessage(this.state.mdp.etat,'Le champs mot de passe est obligatoire')}
                                    </div>
                                </div>
                                <a className="motDePasseOublieLogin" href="/mot-de-passe">Mot de passe oublié ?</a>
                            </div>
                            <div className="boutonConnecterLogin">
                                <a className="bouton-solid-reg popup-with-move-anim a1" hidden={this.state.disableButton} id="sonboutonConnecter" href="#details-lightbox-1" onClick={this.loginConnexion}>Se connecter</a>
                                <div hidden={!this.state.disableButton} className="login-loader"></div>
                            </div>
                            <div className="textDePreventionInscriptionMedecin" hidden={!this.state.error.activation}>{this.state.error.message} <a onClick={()=>this.openModalValidation()} href="#valider-mon-compte" hidden={!this.state.nonValider}>Valider mon compte</a></div>
                        </div>
                     </div>
                     <div className="col-md-6 col-sm-12 sonlogginAllMeddoc">
                        <img className="img-fluid imgSizeLoginMeddoc" src={details1officeworker} alt="alternative"/>
                        <div className="shadowImg"></div>
                     </div>
                </div>
                {/*<button className="btn btn-primary" onClick={()=>this.openModalValidation()}>Open</button>*/}
                {/* Modal validation compte */}
                <Modal show={this.state.showValidation} onHide={()=>{this.setState({showValidation : false})}}   size='xl' animation={false}>
                    <Modal.Header closeButton style={{backgroundColor: "#1b7895"}}>
                        <div className="titleModalValidationLoginMeddoc">Je saisis mon code spécifique de création</div>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className="row">
                                <div className="col-md-12 col-sm-12">
                                    <h1 className="titleH1Login"><b></b></h1>
                                    <p className="titlePLoginMeddoc">Pour des raisons de sécurité, renseignez les informations demandées ci-dessous.</p>
                                </div>
                            </div>
                            <p className="titlePLoginMeddoc">Ce code à 4 caractères vous a été envoyé par mail et par SMS pour la création de votre compte. <br/> Si vous n'avez pas reçu, clique <a href="/">e-mail</a> / <a  href="/">SMS</a></p>
                            <div>
                                <div className="form-group row">
                                    <div className="input-group">
                                        <span className="col-md-1 col-sm-12"></span>
                                        <span className="form-control spanSonOfChildLoggins col-md-2 col-sm-12" id="textAuMilieu">Code*</span>
                                        <input className="form-control inputSonOfChildLogginV2 inputSonOfChildLogginV12V5 col-md-2 col-sm-12" type="text" maxLength="1" ref={inputEl1 => (this.code1 = inputEl1)} onChange={(e) => this.setValueCode("code1", e)}/>
                                        <input className="form-control inputSonOfChildLogginV2 inputSonOfChildLogginV12V5 col-md-2 col-sm-12" type="text" maxLength="1" ref={inputEl2 => (this.code2 = inputEl2)} onChange={(e) => this.setValueCode("code2", e)}/>
                                        <input className="form-control inputSonOfChildLogginV2 inputSonOfChildLogginV12V5 col-md-2 col-sm-12" type="text" maxLength="1" ref={inputEl3 => (this.code3 = inputEl3)} onChange={(e) => this.setValueCode("code3", e)}/>
                                        <input className="form-control inputSonOfChildLogginV2 inputSonOfChildLogginV12V5 col-md-2 col-sm-12" type="text" maxLength="1" ref={inputEl4 => (this.code4 = inputEl4)} onChange={(e) => this.setValueCode("code4", e)}/>
                                        <span className="col-md-1 col-sm-12"></span>
                                    </div>
                                </div>
                                <div hidden={!this.state.erreurEtatModal} className="textDePreventionInscriptionMedecin">{this.state.erreurModal}</div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer  style={{backgroundColor: "#1b7895"}}>
                        <Button variant="danger" onClick={()=>{this.setState({showValidation : false});}}>Fermer</Button>
                        <Button variant="success" className="boutonshowModalDiplome" hidden={this.state.status !== 300} onClick={()=>this.confirmationCodeMedecinMedecin()}>Valider</Button>
                        <Button variant="success" className="boutonshowModalDiplome" hidden={this.state.status !== 500} onClick={()=>this.confirmationCodeMedecinPatient()}>Valider</Button>
                    </Modal.Footer>
                </Modal>
                {/* Modal validation compte */}
            </div>
            
        )
    }
}
export default Connexion;