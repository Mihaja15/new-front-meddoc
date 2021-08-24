import React, {Component} from 'react';
import './MotDePasse.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpen, faEye, faEyeSlash, faKey, faLock, faPhoneAlt, faUserLock } from '@fortawesome/free-solid-svg-icons';
import verificationMotDePasseEnPourcentage from '../../services/motDePasse.service';
import 'bootstrap/dist/css/bootstrap.css';
import { fetchPost } from '../../services/global.service';
import ReactTooltip from 'react-tooltip';
import { ProgressBar} from 'react-bootstrap';

class MotDePasse extends Component{
    constructor(props){
        super();
        this.state = {
            etatShow : 2,
            identification : {valuesText : '',etat : 1},
            mdp : {valuesText : '',etat : 1},
            confirmer : {valuesText : '',etat : 1},
            code : {valuesText : '',etat : 1},
            erreur : '', 
            etatErreur : 1 ,
            percentageMdp : 0,
            codeBase : 0,
            idUser : 0,
            change : false,
            etatMotDePasseShow : false,
            etatMotDePasseShowConf : false
        }
    }
    setStateByNameState(name,valeur,etatChamps){
		if(name === 'identification')this.setState({ identification : { valuesText : valeur , etat : etatChamps }}); 
		else if(name === 'mdp')this.setState({ mdp : { valuesText : valeur , etat : etatChamps }}); 
		else if( name === 'confirmer') this.setState({ confirmer : { valuesText : valeur , etat : etatChamps }}); 
		else if( name === 'code') this.setState({ code : { valuesText : valeur , etat : etatChamps }});  
	}
    setValue(names,event){
		const valeur = event.target.value;
        //console.log('mmm : ',verificationMotDePasseEnPourcentage(valeur))
		if(valeur !== '' && valeur != null){
            this.setStateByNameState(names,valeur,2);
            if(names === 'mdp'){this.setState({percentageMdp :verificationMotDePasseEnPourcentage(valeur)})}
        }else{ this.setStateByNameState(names,'',3)}
    }
    getColorPourcentage(pourcentage){
        if(pourcentage>=100){
           return 'success';
        }else if(pourcentage>60 && pourcentage<=99){
            return 'warning';
        }else{
            return 'danger';
        }
    }
    verificationIdentiteUser=()=>{
        console.log('this.state.identification :',this.state.identification.valuesText)
        if(this.state.identification.etat === 2){
            fetchPost('/users/verifIdentifient',{identification: ''+this.state.identification.valuesText}).then(dataTmp=>{
                if(dataTmp.status===200){
                    this.setState({erreur : '',etatErreur : 1,etatShow : 2,codeBase : dataTmp.code,idUser: dataTmp.idUser});
                }else{
                    this.setState({erreur : 'Votre identifiant est introuvable',etatErreur : 2});
                }
                console.log('valiny :',dataTmp)
            })
        }else{
            this.setState({erreur : 'Verifiez votre information car il y a une erreur',etatErreur : 2});
        }
    }
    getDataHtmlErreur(erreur,etatErreur,change){
        if(etatErreur === 2 && !change){
            return (
                <div style={{margin: "0 auto",width: "90%",marginLeft: "5%"}}>
                    <div className={(etatErreur===2)?"alert alert-danger":"alert alert-success"} role="alert">{erreur}</div>
                </div>
            )
        }else if(etatErreur === 3 && !change){
            return (
                <div style={{margin: "0 auto",width: "90%",marginLeft: "5%"}}>
                    <div className={(etatErreur===2)?"alert alert-danger":"alert alert-success"} role="alert">{erreur}</div>
                </div>
            )
        }else{
            return <div></div>
        }
    }
    getDataHtmlIdentifient(){
        return (
            <div className="mot_de_passe_oublie_meddoc_container">
                <div className="col-md-12 col-sm-12">
                    <h1 className="titleH1Login"><b>Mot de passe oublié ?</b></h1>
                    <p className="titlePLogin" id="titleMotDePasseOublie">Renseignez votre adresse email ou votre numéro d' <br/> identification afin de recevoir les instructions de <br/> réinitialisation de votre mot de passe </p>
                    <ul className="mot_de_passe_input_identifient_ul">
                        <li className="mot_de_passe_input_identifient_ul_li_1"><div className="mot_de_passe_input_identifient_ul_li_1_div"><FontAwesomeIcon style={{textAlign : "center"}} icon={faEnvelopeOpen} /> &nbsp;/ &nbsp;<FontAwesomeIcon style={{textAlign : "center"}} icon={faPhoneAlt} /></div></li>
                        <li className="mot_de_passe_input_identifient_ul_li_2"><input className="form-control inputSonOfChildLoggins" id="mot_de_passe_input_identifient_ul_li_2_input" onChange={(e) => this.setValue('identification', e)} type="text" placeholder="Identification"/></li>
                    </ul>
                </div>
                {this.getDataHtmlErreur(this.state.erreur,this.state.etatErreur)}
                <div className="boutonConnecterLogin">
                    <button className="mot_de_passe_input_identifient_bouton_envoyer" onClick={()=>this.verificationIdentiteUser()}>Envoyer</button>
                </div>
            </div>
        )
    }
    setMdpUser=()=>{
        if(this.state.mdp.etat===2 && this.state.confirmer.etat ===2 && this.state.code.etat===2){
            if(this.state.mdp.valuesText=== this.state.confirmer.valuesText){
                if(''+this.state.code.valuesText===''+this.state.codeBase){
                    console.log('nouveau mot de passe : ',this.state.mdp.valuesText);
                    const data = {
                        idUser : this.state.idUser,
                        mdp : this.state.mdp.valuesText
                    };
                    fetchPost('/users/changeMdpUser',data).then(dataTmp=>{
                        if(dataTmp.status===200){
                            this.setState({erreur : '',etatErreur : 1,etatShow : 2,change : true});
                        }else{
                            this.setState({erreur : 'Votre identifiant est introuvable',etatErreur : 2,change : true});
                        }
                        // console.log('valiny :',dataTmp)
                    })
                }else{
                    this.setState({erreur : 'Votre code de validation ne correspond pas',etatErreur : 2});
                }
            }else{
                this.setState({erreur : "Votre mot de passe est insuffisant ou le mot de passe ne correspond pas au champs confirmation mot de passe",etatErreur : 2});
            }
        }else{
            this.setState({erreur : 'Verifiez votre information car il y a une erreur',etatErreur : 2});
        }
    }
    getDataHtmlNouveauMotDePasse(){
        return (
            <div className="mot_de_passe_oublie_meddoc_container_reinitialisation">
                <div className="col-md-12 col-sm-12">
                    <h1 className="titleH1Login"><b>Mot de passe oublié ?</b></h1>
                    <p className="titlePLogin" id="titleMotDePasseOublie">Renseignez votre adresse email et votre numéro d' <br/> identification afin de recevoir les instructions de <br/> réinitialisation de votre mot de passe </p>
                    
                    <div className="form-group row">
                        <div className="input-group">
                            <span className="form-control spanSonOfChildLoggin col-2" id="logginAllMeddoc_container_row_span_spanSonOfChildLoggins"><FontAwesomeIcon icon={faUserLock} /></span>
                            <ul className="col-10 container_inscription_dataInscription_div_row_col_ul">
                                <li className="container_inscription_dataInscription_div_row_col_ul_li_1"><input onChange={(e) => this.setValue('mdp', e)} className="form-control inputSonOfChildLoggin" placeholder="Nouveau mot de passe" id="logginAllMeddoc_container_row_inputSonOfChildLoggins_v2" required={true} type={(this.state.etatMotDePasseShow)?"text":"password"} /></li>
                                <li className="container_inscription_dataInscription_div_row_col_ul_li_2"><button className="container_connexion_dataInscription_div_row_col_ul_li_2_button" onClick={()=>{this.setState({etatMotDePasseShow:!this.state.etatMotDePasseShow})}}><FontAwesomeIcon icon={(!this.state.etatMotDePasseShow)?faEyeSlash:faEye} /></button></li>
                            </ul>
                            <ReactTooltip id="registerTip" place="top" effect="solid">Votre mot de passe doit comporter un chiffre, une majuscule, une minuscule, un caractère spéciale(#,*,%,!...) et au moins 8 caractères </ReactTooltip>
                            <div className="col-12" data-tip data-for="registerTip">
                                <span className=" col-12 progressBarSonOfChildLoggin"><ProgressBar variant={this.getColorPourcentage(this.state.percentageMdp)} now={this.state.percentageMdp} /></span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="input-group">
                            <span className="form-control spanSonOfChildLoggin col-2" id="logginAllMeddoc_container_row_span_spanSonOfChildLoggins"><FontAwesomeIcon icon={faLock} /></span>
                            <ul className="col-10 container_inscription_dataInscription_div_row_col_ul">
                                <li className="container_inscription_dataInscription_div_row_col_ul_li_1"><input onChange={(e) => this.setValue('confirmer', e)} className="form-control inputSonOfChildLoggin" placeholder="Confirmer votre mot de passe" id="logginAllMeddoc_container_row_inputSonOfChildLoggins_v2" required={true} type={(this.state.etatMotDePasseShowConf)?"text":"password"} /></li>
                                <li className="container_inscription_dataInscription_div_row_col_ul_li_2"><button className="container_connexion_dataInscription_div_row_col_ul_li_2_button" onClick={()=>{this.setState({etatMotDePasseShowConf:!this.state.etatMotDePasseShowConf})}}><FontAwesomeIcon icon={(!this.state.etatMotDePasseShowConf)?faEyeSlash:faEye} /></button></li>
                            </ul>
                        </div>
                    </div>
                    <div className="form-group row descenteLogin">
                        <div className="input-group">
                            <span className="form-control spanSonOfChildLoggin col-2" id="logginAllMeddoc_container_row_span_spanSonOfChildLoggins"><FontAwesomeIcon style={{textAlign : "center"}} icon={faKey} /></span>
                            <input className="form-control inputSonOfChildLoggin col-10" id="logginAllMeddoc_container_row_inputSonOfChildLoggins" required={true} type="text" onChange={(e) => this.setValue('code', e)} placeholder="Code de validation"/>
                        </div>
                        
                    </div>
                </div>
                {this.getDataHtmlErreur(this.state.erreur,this.state.etatErreur,this.state.change)}
                <p hidden={!this.state.change}>Votre mot de passe a été modifier. Vous pouvez vous connectez <a href="/connexion">ici</a></p>

                <div className="boutonConnecterLogin">
                    <button className="mot_de_passe_input_identifient_bouton_reinitialiser" onClick={()=>this.setMdpUser()}>Reinitialiser</button>
                </div>
            </div>
        )
    }
    render(){
        return (
            <div className="logginAllMeddoc">
                { (this.state.etatShow ===2)?this.getDataHtmlNouveauMotDePasse():this.getDataHtmlIdentifient()}
            </div>
            
        )
    }
}
export default MotDePasse;