import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './ConnexionCentre.css';
import {fetchPostNotLogged} from '../../services/global.service';
import bgLogin from '../../assets/background/centre.jpg';
import {userSession} from '../../services/userSession';
import { utile } from '../../services/utile';
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3';
import CaptchaButton from './CaptchaButton';
import Toaster from '../alert/Toaster';

export default class ConnexionCentre extends React.Component{
    constructor(props){
        super();
        this.state = {
            error : {message : '',activation : false},
            login:'',
            mdp:'',
            disableButton:false
        }
        this.setToken = this.setToken.bind(this);
    }
    handleChange = (param, e) => {
        this.setState({ [param]: e.target.value })
    }
    keyPressed=(e)=>{
        // if(e.keyCode===13)
        //     this.loginConnexion();
    }
    loginConnexion = () => {
        this.setState({disableButton:true,error:{activation:false}});
         if(this.state.login !== "" && this.state.mdp !== ""){
            const userAuth = {identification: this.state.login,mdp: this.state.mdp}
            fetchPostNotLogged('/users/login',userAuth).then(response=>{
                //console.log(response);
                if(response.statut===200){
                    if(response.role.toLowerCase()==='professionnel santé'){
                        userSession.userLogin(response.data.username,
                            (response.data.profilPicture!==null&&response.data.profilPicture!==undefined&&response.data.profilPicture!=="")?response.data.profilPicture:"profile.png",
                            response.token,
                            response.role);
                        window.location.replace('/professionnel/'+utile.valueToLink(response.data.username)+'/dashboard/'+utile.formatDateDash(new Date()));
                    } else if(response.role.toLowerCase()==='structure santé'){
                        userSession.userLogin(response.data.username,
                            (response.data.profilPicture!==null&&response.data.profilPicture!==undefined&&response.data.profilPicture!=="")?response.data.profilPicture:"profile-centre.png",
                            response.token,
                            response.role);
                        window.location.replace('/profil-centre/1');
                    } else{
                        this.setState({disableButton:false,error : {message : "Erreur de connexion",activation: true}});
                    }
                }else if(response.statut===400){
                    this.setState({disableButton:false,error : {message : response.message,activation: true}});
                }else{
                    this.setState({disableButton:false,error : {message : response.message,activation: true}});
                }
            }).catch(error=>{
                //console.log(error)
                this.setState({disableButton:false,error : {message : error.message,activation: true}});
            });
        }
    }
    setToken(value){
        const dataIdentification = this.state.login;const dataMdp = this.state.mdp;
         if(utile.hasValue(dataIdentification) && utile.hasValue(dataMdp) && value!==null){
             this.setState({disableButton:true,error:{activation:false}});
             const userAuth = {identification: dataIdentification,mdp: dataMdp, captchaToken:value}
             fetchPostNotLogged('/users/login',userAuth).then(response=>{
                //console.log(response)
                if(response.statut===200){
                    if(response.role.toLowerCase()==='professionnel santé'){
                        userSession.userLogin(response.data.username,
                            (response.data.profilPicture!==null&&response.data.profilPicture!==undefined&&response.data.profilPicture!=="")?response.data.profilPicture:"profile.png",
                            response.token,
                            response.role);
                        window.location.replace('/professionnel/'+utile.valueToLink(response.data.username)+'/dashboard/'+utile.formatDateDash(new Date()));
                    } else if(response.role.toLowerCase()==='structure santé'){
                        userSession.userLogin(response.data.username,
                            (response.data.profilPicture!==null&&response.data.profilPicture!==undefined&&response.data.profilPicture!=="")?response.data.profilPicture:"profile-centre.png",
                            response.token,
                            response.role);
                        window.location.replace('/profil-centre/1');
                    }else{
                        // throw new Error("Erreur de connexion");
                        this.setState({disableButton:false,error : {message : 'Vous n\'êtes pas autorisés à connecter à ce lien',activation: true}});
                    }
                }else if(response.statut===201){
                    this.setState({toShow : 2, disableButton:false,error : {message : response.message,activation: true}});
                }else if(response.statut===400){
                    this.setState({disableButton:false,error : {message : response.message,activation: true}});
                }else{
                    this.setState({disableButton:false,error : {message : response.message,activation: true}});
                }
            }).catch(error=>{
                //console.log(error)
                this.setState({disableButton:false,error : {message : error,activation: true}});
            });
        }
    }
    changeShow=(value)=>{
        this.setState({error : {message : '',activation: value}});
    }
    render(){
        return(
            <div className="login-centre-container">
                <div className="row">
                    <div className="left-hand col-md-6">
                        <div className="row">
                            <h1 className="titleH1Login col-md-12">Connectez-vous pour commencer!</h1>
                            <div className="form-group col-md-12 row">
                                <div className="input-group row">
                                    <span className="form-control spanSonOfChildLoggin col-md-2" style={{textAlign:'center'}}><FontAwesomeIcon style={{textAlign : "center"}} icon={faUser} /></span>
                                    <input className="form-control inputSonOfChildLoggin col-md-10" required={true} type="text" value={this.state.login} onChange={this.handleChange.bind(this,"login")} placeholder="E-mail ou numéro de téléphone" name="login"/>
                                </div>
                            </div>
                            <div className="form-group col-md-12 row">
                                <div className="input-group row">
                                    <span className="form-control spanSonOfChildLoggin col-md-2" style={{textAlign:'center'}}><FontAwesomeIcon icon={faLock} /></span>
                                    <input onKeyDown={this.keyPressed.bind(this)} className="form-control inputSonOfChildLoggin col-10" required={true} type="password" value={this.state.mdp} onChange={this.handleChange.bind(this,"mdp")} placeholder="Mot de passe" name="mdp"/>
                                </div>
                            </div>
                            <a className="col-md-12" href="/mot-de-passe">Mot de passe oublié ?</a>
                            <div className="form-group row col-md-12">
                                <div className="input-group row">
                                <GoogleReCaptchaProvider className="g-recaptcha" reCaptchaKey="6LclRt8bAAAAAFWdHWX7Tu1q8C00ptadzT4yeG45">
                                    <CaptchaButton setCaptchaToken={this.setToken} hiddenButton={this.state.disableButton} disableButton={!(utile.hasValue(this.state.login)&&utile.hasValue(this.state.mdp))}/>
                                    {/* <GoogleReCaptcha onVerify={this.handleVerifyRecaptcha}/> */}
                                </GoogleReCaptchaProvider>
                                    {/* <a className="bouton-solid-reg popup-with-move-anim a1" style={{textAlign:'center'}} hidden={this.state.disableButton} id="sonboutonConnecter" href="#0" onClick={this.loginConnexion}>Se connecter</a> */}
                                    <div hidden={!this.state.disableButton} className="login-loader"></div>
                                </div>
                                {this.state.error.activation?<Toaster type={'error'} bodyMsg={this.state.error.message} isShow={this.state.error.activation} toggleShow={this.changeShow}/>:''}
                                {/* <div className="textDePreventionInscriptionMedecin" hidden={!this.state.error.activation}>{this.state.error.message} <a onClick={()=>this.openModalValidation()} href="#valider-mon-compte" hidden={!this.state.nonValider}>Valider mon compte</a></div> */}
                            </div>
                        </div>
                    </div>
                    <div className="right-hand col-md-6">
                        <img src={bgLogin} alt="background"/>
                    </div>
                </div>
            </div>
        );
    }
}