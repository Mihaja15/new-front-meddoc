import React, {Component} from 'react';
import './Connexion.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import {fetchPost, fetchPostNotLogged} from '../../services/global.service';
import {Modal,Button} from 'react-bootstrap';
import { Cookies } from 'react-cookie';
import { instanceOf } from "prop-types";

import {userSession} from '../../services/userSession';
import ValidationCompte from './ValidationCompte';
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3';
import CaptchaButton from './CaptchaButton';
import { utile } from '../../services/utile';
import Toaster from '../alert/Toaster';

class Connexion extends Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
     
    constructor(props) {
        super(props);
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
            toShow : 1,
            disableButton:false,
            etatMotDePasseShow : false
        }
        this.setValue = this.setValue.bind(this);
        this.setToken = this.setToken.bind(this);
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
    componentDidMount(){
        //console.log(this.props.cookies);
    }
    loginConnexion = () => {
        const dataIdentification = this.state.identification;const dataMdp = this.state.mdp;
        if(dataIdentification.etat === 2 && dataIdentification.etat === 2 ){
            this.setState({disableButton:true,error:{activation:false}});
            const userAuth = {identification: dataIdentification.valuesText,mdp: dataMdp.valuesText}
            fetchPostNotLogged('/users/login',userAuth).then(response=>{
                //console.log(response)
                if(response.statut===200){
                    if(response.role.toLowerCase()==="patient"){
                        userSession.userLogin(response.data.username,
                            (response.data.profilPicture!==null&&response.data.profilPicture!==undefined&&response.data.profilPicture!=="")?response.data.profilPicture:"profile.png",
                            response.token,
                            response.role,
                            response.data.idMeddoc);
                        window.location.pathname = "/profil-patient";
                    }else{
                        throw new Error("Erreur de connexion");
                    }
                }else if(response.statut===201){
                    this.setState({toShow : 2, disableButton:false});
                }else if(response.statut===400){
                    this.setState({disableButton:false,error : {message : response.message,activation: true}});
                }else{
                    this.setState({disableButton:false,error : {message : response.message,activation: true}});
                }
            }).catch(error=>{
                this.setState({disableButton:false,error : {message : "Erreur de connexion",activation: true}});
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
        // if(e.keyCode===13)
        //     this.loginConnexion();
    }
    setToken(value){
       const dataIdentification = this.state.identification;const dataMdp = this.state.mdp;
        if(dataIdentification.etat === 2 && dataMdp.etat === 2 && value!==null){
            this.setState({disableButton:true,error:{activation:false}});
            const userAuth = {identification: dataIdentification.valuesText,mdp: dataMdp.valuesText, captchaToken:value}
            fetchPostNotLogged('/users/login',userAuth).then(response=>{
                //console.log(response)
                if(response.statut===200){
                    if(response.role.toLowerCase()==="patient"){
                        userSession.userLogin(response.data.username,
                            (response.data.profilPicture!==null&&response.data.profilPicture!==undefined&&response.data.profilPicture!=="")?response.data.profilPicture:"profile.png",
                            response.token,
                            response.role,
                            response.data.idMeddoc);
                        window.location.pathname = "/profil-patient";
                    }else{
                        // throw new Error("Erreur de connexion");
                        this.setState({disableButton:false,error : {message : 'Vous n\'êtes pas autorisés à connecter à ce lien',activation: true}});
                    }
                }else if(response.statut===201){
                    this.setState({toShow : 2, disableButton:false});
                }else if(response.statut===400){
                    this.setState({disableButton:false,error : {message : response.message,activation: true}});
                }else{
                    this.setState({disableButton:false,error : {message : response.message,activation: true}});
                }
            }).catch(error=>{
                this.setState({disableButton:false,error : {message : error,activation: true}});
            });
        }
    }
    // handleVerifyRecaptcha = async () => {
    //     const { executeRecaptcha } = IWithGoogleReCaptchaProps.googleReCaptchaProps;
    
    //     if (!executeRecaptcha) {
    //       //console.log('Recaptcha has not been loaded');
    
    //       return;
    //     }
    
    //     const token = await executeRecaptcha('homepage');
    //   };
    changeShow=(value)=>{
        this.setState({error : {message : '',activation: value}});
    }
    render(){
        return (
            <div className="logginAllMeddoc">
                <div className="logginAllMeddoc_container col-md-6 col-sm-12">
                    {this.state.toShow===2?<ValidationCompte identification={this.state.identification.valuesText} password={this.state.mdp.valuesText}/>:
                    <div className="">
                        <div className="col-md-12 col-sm-12">
                            <h1 className="logginAllMeddoc_container_row_titleH1Login"><b>Connexion</b></h1>
                            <p className="logginAllMeddoc_container_row_titleH1Login_titlePLogin">Pas encore de compte ? <a className="titleALogin" href="/inscription"> Créer mon compte</a></p>
                            <div className="form-group row descenteLogin">
                                <div className="input-group">
                                    <span className="form-control spanSonOfChildLoggin col-2" id="logginAllMeddoc_container_row_span_spanSonOfChildLoggins"><FontAwesomeIcon style={{textAlign : "center"}} icon={faUser} /></span>
                                    <input className="form-control inputSonOfChildLoggin col-10" id="logginAllMeddoc_container_row_inputSonOfChildLoggins" required={true} type="text" value={this.state.identification.valuesText} onChange={(e) => this.setValue("identification", e)} placeholder="E-mail ou numéro de téléphone" name="identification"/>
                                    {this.getErrorMessage(this.state.identification.etat,'Entrez votre identifiant')}
                                </div>
                                
                            </div>
                            <div className="form-group row">
                                <div className="input-group">
                                    <span className="form-control spanSonOfChildLoggin col-2" id="logginAllMeddoc_container_row_span_spanSonOfChildLoggins"><FontAwesomeIcon icon={faLock} /></span>
                                    <ul className="col-10 container_inscription_dataInscription_div_row_col_ul">
                                        <li className="container_inscription_dataInscription_div_row_col_ul_li_1"><input onKeyDown={this.keyPressed.bind(this)} className="form-control inputSonOfChildLoggin" id="logginAllMeddoc_container_row_inputSonOfChildLoggins_v2" required={true} type={(this.state.etatMotDePasseShow)?"text":"password"} value={this.state.mdp.valuesText} onChange={(e) => this.setValue("mdp", e)} placeholder="Mot de passe" name="mdp"/></li>
                                        <li className="container_inscription_dataInscription_div_row_col_ul_li_2"><button className="container_connexion_dataInscription_div_row_col_ul_li_2_button" onClick={()=>{this.setState({etatMotDePasseShow:!this.state.etatMotDePasseShow})}}><FontAwesomeIcon icon={(!this.state.etatMotDePasseShow)?faEyeSlash:faEye} /></button></li>
                                    </ul>
                                    
                                    {this.getErrorMessage(this.state.mdp.etat,'Vérifiez votre mot de passe')}
                                </div>
                            </div>
                            <div className="logginAllMeddoc_container_row_titleH1Login_mot_de_passe_oublie"><a className="motDePasseOublieLogin" href="/mot-de-passe-oublie">Mot de passe oublié ?</a></div>
                        </div>
                        {/* <p>{"Token==>"+this.state.identification.valuesText}</p> */}
                        <div className="boutonConnecterLogin">
                            <GoogleReCaptchaProvider className="g-recaptcha" reCaptchaKey="6LclRt8bAAAAAFWdHWX7Tu1q8C00ptadzT4yeG45">
                                <CaptchaButton setCaptchaToken={this.setToken} hiddenButton={this.state.disableButton} disableButton={!(utile.hasValue(this.state.identification.valuesText)&&utile.hasValue(this.state.mdp.valuesText))}/>
                                {/* <GoogleReCaptcha onVerify={this.handleVerifyRecaptcha}/> */}
                            </GoogleReCaptchaProvider>
                            {/* <a className="bouton-solid-reg popup-with-move-anim a1" aria-disabled={this.state.token===null} hidden={this.state.disableButton} id="sonboutonConnecter" href="#details-lightbox-1" onClick={this.loginConnexion}>Se connecter</a> */}
                            <div hidden={!this.state.disableButton} className="login-loader"></div>
                        </div>
                        {this.state.error.activation?<Toaster type={'error'} bodyMsg={this.state.error.message} isShow={this.state.error.activation} toggleShow={this.changeShow}/>:''}
                        {/* <div className="textDePreventionInscriptionMedecin" hidden={!this.state.error.activation}>{this.state.error.message} <a onClick={()=>this.openModalValidation()} href="#valider-mon-compte" hidden={!this.state.nonValider}>Valider mon compte</a></div> */}
                    </div>}
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