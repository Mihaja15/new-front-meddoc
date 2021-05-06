import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './ConnexionCentre.css';
import {fetchPost} from '../../services/global.service';
import bgLogin from '../../assets/background/centre.jpg';

export default class ConnexionCentre extends React.Component{
    constructor(props){
        super();
        this.state = {
            error : {message : '',activation : false},
            login:'',
            mdp:'',
            disableButton:false
        }
    }
    handleChange = (param, e) => {
        this.setState({ [param]: e.target.value })
    }
    keyPressed=(e)=>{
        if(e.keyCode===13)
            this.loginConnexion();
    }
    loginConnexion = () => {
        this.setState({disableButton:true,error:{activation:false}});
         if(this.state.login !== "" && this.state.mdp !== ""){
            const userAuth = {identification: this.state.login,mdp: this.state.mdp}
            fetchPost('/covid/loginCentre',userAuth).then(data=>{
                if(data.message===undefined){
                    console.log(data);
                    localStorage.setItem('photo',data.photo);
                    localStorage.setItem('idCentre',data.idCentre);
                    localStorage.setItem('pseudo',data.nomCentre);
                    localStorage.setItem('connected',true);
                    window.location.replace('/profil-centre/1');
                }
                else{
                    this.setState({disableButton:false, error : {message : data.message,activation: true}})
                }
            }).catch(error=>{
                console.log(error)
                this.setState({disableButton:false,error : {message : error.message,activation: true}});
            });
        }
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
                                    <a className="bouton-solid-reg popup-with-move-anim a1" style={{textAlign:'center'}} hidden={this.state.disableButton} id="sonboutonConnecter" href="#0" onClick={this.loginConnexion}>Se connecter</a>
                                    <div hidden={!this.state.disableButton} className="login-loader"></div>
                                </div>
                                <div className="textDePreventionInscriptionMedecin" hidden={!this.state.error.activation}>{this.state.error.message} <a onClick={()=>this.openModalValidation()} href="#valider-mon-compte" hidden={!this.state.nonValider}>Valider mon compte</a></div>
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