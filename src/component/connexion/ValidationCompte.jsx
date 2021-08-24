import React from 'react';
import './ValidationCompte.css';
import { fetchPostNotLogged} from '../../services/global.service';
import {userSession} from '../../services/userSession';

export default class ValidationCompte extends React.Component{
    constructor(props){
        super(props);
        this.state={
            identification:'',
            password:'',
            code1 : -1,
            code2 : -1,
            code3 : -1,
            code4 : -1,
            error : {message : '',activation : false},
            disableButton:false
        }
    }
    setValueCode(names, event){
        const valeur = event.target.value;
        if(names==='code1'){if(valeur.length===1){this.code2.focus();this.setState({code1: valeur})}}
        if(names==='code2'){if(valeur.length===1){this.code3.focus();this.setState({code2: valeur})}}
        if(names==='code3'){if(valeur.length===1){this.code4.focus();this.setState({code3: valeur})}}
        if(names==='code4'){if(valeur.length===1){this.setState({code4: valeur})}}
    }
    confirmationCode=()=>{
        if(this.props.identification && this.props.password){
            if(this.state.code1>=0 && this.state.code2>=0 && this.state.code3>=0 && this.state.code4>=0){
                const dataTmp = {
                    identification: this.props.identification,
                    password: this.props.password,
                    code : this.state.code1+''+this.state.code2+''+this.state.code3+''+this.state.code4
                }
                console.log(dataTmp);
                //this.setState({erreurMessage : "",erreurEtat: false});
                fetchPostNotLogged('/users/validation-compte-patient',dataTmp).then(response=>{
                    console.log(response)
                    if(response.statut){
                        if(response.statut===200){
                            console.log(response);
                            if(response.role.toLowerCase()==="patient"){
                                userSession.userLogin(response.data.username,
                                    (response.data.profilPicture!==null&&response.data.profilPicture!==undefined&&response.data.profilPicture!=="")?response.data.profilPicture:"profile.png",
                                    response.token,
                                    response.role);
                                window.location.pathname = "/profil-patient";
                            }
                        }else if(response.statut===400){
                            this.setState({erreurMessage : response.message,erreurEtat: true});
                        }else{
                            this.setState({erreurMessage : response.message,erreurEtat: true});
                        }
                    }
                });
            }else{
                this.setState({erreurMessage : "Erreur de connexion.",erreurEtat: true});
            }
        }
    }
    componentDidMount(){

    }
    render(){
        return(
            <div className="validation-compte-container">
                <div className="row">
                    <div className="col-md-12 col-sm-12">
                        <h1 className="titleH1Login"><b>Nouveau sur MEDDoC ? </b></h1>
                        <p className="titlePLogin">Pour des raisons de sécurité, renseignez les informations demandées ci-dessous.<a className="titleALogin" href="/login-meddoc"> Connectez-vous</a> </p>
                        <div className="inputInscriptionPatient">
                            <p className="titlePLogin">Ce code à 4 caractères vous a été envoyé par mail et par SMS pour la création de votre compte. <br/> Si vous n'avez pas reçu, clique <a href="/">e-mail</a> / <a  href="/">SMS</a></p>
                            <div className="form-group row">
                                <div className="input-group">
                                    <span className="form-control spanSonOfChildLoggins col-2" id="textAuMilieu">Code*</span>
                                    <input className="form-control inputSonOfChildLoggin inputSonOfChildLogginV12V5 col-2" type="text" maxLength="1" ref={inputEl1 => (this.code1 = inputEl1)} onChange={(e) => this.setValueCode("code1", e)}/>
                                    <input className="form-control inputSonOfChildLoggin inputSonOfChildLogginV12V5 col-2" type="text" maxLength="1" ref={inputEl2 => (this.code2 = inputEl2)} onChange={(e) => this.setValueCode("code2", e)}/>
                                    <input className="form-control inputSonOfChildLoggin inputSonOfChildLogginV12V5 col-2" type="text" maxLength="1" ref={inputEl3 => (this.code3 = inputEl3)} onChange={(e) => this.setValueCode("code3", e)}/>
                                    <input className="form-control inputSonOfChildLoggin inputSonOfChildLogginV12V5 col-2" type="text" maxLength="1" ref={inputEl4 => (this.code4 = inputEl4)} onChange={(e) => this.setValueCode("code4", e)}/>
                                </div>
                                <div className="textPrimaryValidationInscription" hidden={this.state.erreurEtat}><p className="pPrimaryValidationInscription">*Champs obligatoires</p></div>
                                <div hidden={!this.state.erreurEtat} className="textDePreventionInscriptionMedecin">{this.state.erreurMessage}</div>
                                <button className="bouton-solid-reg col-10 popup-with-move-anim a1" id="sonboutonConnecter" onClick={()=>this.confirmationCode()}  >Confirmer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}