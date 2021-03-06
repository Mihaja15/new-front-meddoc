import React, {Component} from 'react';
import './Inscription.css';
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {fetchGet, fetchPost, fetchPostNotLogged} from '../../services/global.service';
import { authUser } from '../../services/authUser';
import verificationMotDePasseEnPourcentage from '../../services/motDePasse.service';
import ReactTooltip from 'react-tooltip';
import bienvenue from '../../assets/img/bienvenue.jpg';
import {userSession} from '../../services/userSession';
import Select from 'react-select';
import Toaster from '../alert/Toaster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

class Inscription extends Component{
    constructor(props){
        super();
        this.state = {
            nom: '',
            prenoms: '',
            dateNaissance:'',
            lieuNaissance: '',
            email: '',
            phone: '',
            adresse: '',
            mdp: '',
            mdpC:'',
            sexe:'',
            showF:false,
            showP: false,
            showId: false,
            dataFokontany: null,
            dataRegion: null,
            dataDistrict: null,
            dataProvince: null,
            provinceVal:'',
            mdpCorrect: false,
            fokontanyVal:'',
            regionVal:'',
            districtVal:'',
            message : '',
            etatMessage : 1,
            percentageMdp : 0,
            code1 : -1,
            code2 : -1,
            code3 : -1,
            code4 : -1,
            erreurMessage : '',
            erreurEtat: false,
            etatMenu : 1,
            codeCompte : '',
            disableButton:false,
            validCgu:false,
            etatMotDePasseShow : false,
            etatMotDePasseShowConf : false
        }
        this.nomText = this.nomText.bind(this);
        this.prenomsText = this.prenomsText.bind(this);
        this.lieuNaissText = this.lieuNaissText.bind(this);
        this.sexeText = this.sexeText.bind(this);
        this.emailText = this.emailText.bind(this);
        this.phoneText = this.phoneText.bind(this);
        this.adresseText = this.adresseText.bind(this);
        this.mdpText = this.mdpText.bind(this);
        this.mdpCText = this.mdpCText.bind(this);
        this.dateNaissText = this.dateNaissText.bind(this);
        this.signinSubmit = this.signinSubmit.bind(this);
        this.provinceChange = this.provinceChange.bind(this);
        this.fokontanyChange = this.fokontanyChange.bind(this);
        this.districtChange = this.districtChange.bind(this);
        this.regionChange = this.regionChange.bind(this);
        this.validChange = this.validChange.bind(this);
    }
    nomText(event){
        this.setState({nom: event.target.value});
    }
    prenomsText(event){
        this.setState({prenoms: event.target.value});
    }
    lieuNaissText(event){
        this.setState({lieuNaissance: event.target.value});
    }
    sexeText(event){
        this.setState({sexe: event.target.value});
    }
    emailText(event){
        this.setState({email: event.target.value});
    }
    phoneText(event){
        this.setState({phone: event.target.value});
    }
    adresseText(event){
        this.setState({adresse: event.target.value});
    }
    mdpText(event){
        this.setState({mdp: event.target.value,percentageMdp :verificationMotDePasseEnPourcentage(event.target.value)});
    }
    mdpCText(event){
        this.setState({mdpC: event.target.value});
        if(this.state.mdp===event.target.value){
            this.setState({mdpCorrect : true});
        }else{
            this.setState({mdpCorrect : false});
        }
    }
    dateNaissText(event){
        this.setState({dateNaissance: event.target.value});
    }
    validChange(event){
        this.setState({validCgu: event.target.checked});
    }
    signinSubmit(){
        // var number = this.state.phone.toString().trim();
        // if(number.search('32')!==-1)
        //     number = '0'+number.substring(number.search('32'));
        // else if(number.search('33')!==-1)
        //     number = '0'+number.substring(number.search('33'));
        // else if(number.search('34')!==-1)
        //     number = '0'+number.substring(number.search('34'));
        // else{
        //     number = '';
        // }
        // this.setState({disableButton:true,phone:number},function(){
        //     console.log(this.state.phone)
        // });
        this.setState({disableButton:true});
        // let identiter = [];
        // if(this.state.email!== ''){identiter=[{identifiant : this.state.email}, {identifiant : this.state.phone}];}else{identiter=[{identifiant : this.state.phone}];}
        const user = {
            nom: this.state.nom,
            prenoms: this.state.prenoms,
            dateNaissance: this.state.dateNaissance,
            lieuNaissance: this.state.lieuNaissance,
            // identification: this.state.phone,
            phone: this.state.phone,
            email: this.state.email,
            // identifiant: identiter,
            password: this.state.mdp,
            sexe : this.state.sexe,
            contact: [{
                valeurContact: this.state.phone,
                idTypeContact: 1,
                typeContact: {
                    idTypeContact: 1
                }
            },{
                valeurContact: this.state.email,
                idTypeContact: 2,
                typeContact: {
                    idTypeContact: 2
                }
            }],
            // adresse:[{
            //     informationAdresse:this.state.adresse,
            //     district:{
            //         idDistrict:this.state.districtVal
            //     }
            // }],
            adresse:{
                informationAdresse:this.state.adresse,
                district:{
                    idDistrict:this.state.districtVal
                }
            },
            typeUser:{
                idTypeUser: 1
            }
        }
        if(this.state.nom===''||this.state.dateNaissance===null||this.state.districtVal===''||this.state.mdp===''||this.state.phone===''){
            this.setState({disableButton:false});
            return;
        }
        if(!this.state.mdpCorrect){
            this.setState({disableButton:false});
            return;
        }
        // fetchPost('/users/addUserPatient',user).then((data)=>{
        //     if(data.status === 200){
                
        //         this.setState({message : "Inscription r??ussie ",etatMessage: 2, codeCompte : ''+data.code,etatMenu : 2});
        //     }else{
        //         this.setState({message : ''+data.message, etatMessage: 3, disableButton:false})
        //     }
        // }).catch(error=>{
        //     this.setState({disableButton:false,error : {message : 'Erreur de connexion aux r??seaux',activation: true}});
        // });
        fetchPostNotLogged('/users/register',user).then((response)=>{
            console.log(response);
            if(response.statut === 200){
                // if(response.role.toLowerCase()==="patient"){
                //     userSession.userLogin(response.data.username,
                //         (response.data.profilPicture!==null&&response.data.profilPicture!==undefined&&response.data.profilPicture!=="")?response.data.profilPicture:"profile.png",
                //         response.token,
                //         response.role);
                //     this.setState({message : response.message,etatMessage: 2, codeCompte : ''+response.code,etatMenu : 2});
                //     window.location.pathname = "/profil-patient";
                //     // window.location.replace('/profil-patient');
                // }else{
                //     throw new Error("Erreur de connexion");
                // }
                this.setState({etatMenu:2})
            }else if(response.statut === 100){
                this.setState({message : response.message,etatMessage: 1,erreurMessage: response.message, erreurEtat:true, disableButton:false});
            }else{
                this.setState({message : ''+response.message, etatMessage: 1, disableButton:false,erreurMessage: response.message, erreurEtat:true,error : {message : response.message,activation: true}});
            }
        }).catch(erreur=>{
            this.setState({disableButton:false,erreurMessage: erreur, erreurEtat:true,error : {message : erreur,activation: true}});
        });
    }
    seConnecter=()=>{
        const tel = this.state.phone;
        if(tel!==null && tel!==undefined && tel!==''){
            const newData={identification : tel};
            fetchPost('/users/autorisationAccesPageApresInscription',newData).then(data=>{
                if(data.status === 200){
                    const log = authUser.loginUser(data.token,data.typeUser,data.sessionToken,data.profilPicture);
                    localStorage.setItem('photo',data.profilPicture);
                    localStorage.setItem('idUser',data.idUser);
                    localStorage.setItem('pseudo',data.pseudo);
                    localStorage.setItem('connected',true);
                    window.location.replace('/profil');
                    if(log){
                        localStorage.setItem('photo',data.profilPicture);
                        localStorage.setItem('idUser',data.idUser);
                        localStorage.setItem('pseudo',data.pseudo);
                        localStorage.setItem('connected',true);
                        window.location.replace('/profil');
                        // window.location.replace(''+authUser.premierUrl(data.typeUser));
                        this.setState({connectionafterInscription : {text : '',etat : false}});
                    }else{
                        localStorage.clear();
                        this.setState({message : "Votre session est t??rmnier. Veuillez vous connecter.",etatMessage: 3});
                    }
                }else{
                    this.setState({message : "Votre session est t??rmnier. Veuillez vous connecter.",etatMessage: 3});
                }
            });
            
        }else{
            this.setState({connectionafterInscription : {text : 'Votre session est t??rmnier.',etat : true}});
        }
    }
    provinceChange(event){
        console.log(event.currentTarget.value);
        this.setState({provinceVal: event.currentTarget.value});
        if(event.currentTarget.value===''){
            this.setState({showF: false});
        }
        else{
            // fetchGet('/adresse/quartiers/'+event.currentTarget.value).then(data=>{
            //     if(data!=null){
            //         this.setState({ dataFokontany: data });
            //         this.setState({showF: true});
            //     }
            // });
            fetchGet('/adresse/find-district-by-id-province/'+event.currentTarget.value).then(data=>{
                if(data!=null && data.length>=0){
                    this.setState({ dataDistrict: data });
                    this.setState({showF: true});
                }else{
                    this.setState({dataDistrict:[],showF:true});
                }
            });
            // this.setState({showF: true, dataFokontany : globalActions.getData('/adresse/quartiers')});
        }
    }
    fokontanyChange(event){
        this.setState({fokontanyVal: event.currentTarget.value});
    }
    regionChange(event){
        this.setState({regionVal: event.currentTarget.value});
    }
    districtChange(event){
        this.setState({districtVal: event.value});
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
    setValueCode(names, event){
        const valeur = event.target.value;
        if(names==='code1'){if(valeur.length===1){this.code2.focus();this.setState({code1: valeur})}}
        if(names==='code2'){if(valeur.length===1){this.code3.focus();this.setState({code2: valeur})}}
        if(names==='code3'){if(valeur.length===1){this.code4.focus();this.setState({code3: valeur})}}
        if(names==='code4'){if(valeur.length===1){this.setState({code4: valeur})}}
    }
    confirmationCodeMedecin=()=>{
        if(this.state.code1>=0 && this.state.code2>=0 && this.state.code3>=0 && this.state.code4>=0){
            const dataTmp = {
                identification: this.state.phone,
                password: this.state.mdp,
                code : this.state.code1+''+this.state.code2+''+this.state.code3+''+this.state.code4
            }
            //this.setState({erreurMessage : "",erreurEtat: false});
            fetchPostNotLogged('/users/validation-compte-patient',dataTmp).then(response=>{
                console.log(response)
                if(response.statut===200){
                    if(response.role.toLowerCase()==="patient"){
                        userSession.userLogin(response.data.username,
                            (response.data.profilPicture!==null&&response.data.profilPicture!==undefined&&response.data.profilPicture!=="")?response.data.profilPicture:"profile.png",
                            response.token,
                            response.role);
                        window.location.pathname = "/profil-patient";
                    }else{
                        throw new Error("Erreur de connexion");
                    }
                }else if(response.statut===400){
                    this.setState({erreurMessage : response.message,erreurEtat: true});
                }else{
                    this.setState({erreurMessage : response.message,erreurEtat: true});
                }
            });
        }else{
            this.setState({erreurMessage : "Erreur de connexion.",erreurEtat: true});
        }
    }
    changeShow=(value)=>{
        this.setState({erreurEtat:value});
        
    }
    //data html
    getDataHtmlInscription(){
        return (
            <div className="row">
                <div className="col-md-12 col-sm-12 container_inscription_dataInscripion_div">
                    <h1 className="titleH1Login"><b>Voulez-vous prendre un rendez-vous avec un m??decin ?<br/>Alors, inscrivez-vous!</b></h1>
                    <p className="titleTmpInscription">Vous avez d??j?? un compte? <a className="titleALogin" href="/connexion"> Connectez-vous</a> </p>
                    <div className="inputInscriptionPatient">
                        <Container>
                            {/* <div className="singin-content"> */}
                                <Row>
                                    <Col lg={12}>
                                            <Row>
                                                <Col sm={3}>
                                                    <div className="form-group">
                                                        <p className="textInscriptionPatient">Nom *:</p>
                                                    </div>
                                                </Col>
                                                <Col sm={9}>
                                                    <div className="form-group">
                                                        <input className="form-control" value={this.state.nom} onChange={this.nomText} name="nom" id="nom" type="text"  placeholder=""/>
                                                    </div>
                                                </Col>
                                                <Col sm={3}>
                                                    <div className="form-group">
                                                        <p className="textInscriptionPatient">Pr&eacute;nom(s):</p>
                                                    </div>
                                                </Col>
                                                <Col sm={9}>
                                                    <div className="form-group">
                                                        <input className="form-control" value={this.state.prenoms} onChange={this.prenomsText} name="prenoms" id="prenoms" type="text" placeholder =""/>
                                                    </div>
                                                </Col>
                                                <Col sm={3}>
                                                    <div className="form-group">
                                                        <p className="textInscriptionPatient">Sexe *:</p>
                                                    </div>
                                                </Col>
                                                <Col sm={9}>
                                                    <div className="form-group">
                                                        <select className="form-control" value={this.state.sexe} onChange={this.sexeText} name="sexe" id="sexe">
                                                            <option value=''>S??lectionner</option>
                                                            <option value={1}>Homme</option>
                                                            <option value={2}>Femme</option>
                                                        </select>
                                                    </div>
                                                </Col>
                                                <Col sm={3}>
                                                    <div className="form-group">
                                                        <p className="textInscriptionPatient">Date de naissance *:</p>
                                                    </div>
                                                </Col>
                                                <Col sm={9}>
                                                    <div className="form-group">
                                                        <input className="form-control" value={this.state.dateNaissance} onChange={this.dateNaissText} name="dateNaissance" id="dateNaissance" type="date"  placeholder="Date de Naissance"/>
                                                    </div>
                                                </Col>
                                                <Col sm={3}>
                                                    <div className="form-group">
                                                        <p className="textInscriptionPatient">Lieu de naissance:</p>
                                                    </div>
                                                </Col>
                                                <Col sm={9}>
                                                    <div className="form-group">
                                                        <input className="form-control" value={this.state.lieuNaissance} onChange={this.lieuNaissText} name="lieuNaissance" id="lieuNaissance" type="text" placeholder =""/>
                                                    </div>
                                                </Col>                                                          
                                                <Col sm={3}>
                                                    <div className="form-group">
                                                        <p className="textInscriptionPatient">Adresse *:</p>
                                                    </div>
                                                </Col>                                               
                                                <Col sm={9}>
                                                    <div className="form-group">
                                                        <input className="form-control" value={this.state.adresse} onChange={this.adresseText} name="adresse" id="adresse" type="text" placeholder =""/>
                                                    </div>
                                                </Col>
                                                <Col sm={3}>
                                                    <div className="form-group">
                                                        {/* <p className="textInscriptionPatient">Province *:</p> */}
                                                        <p className="textInscriptionPatient">District *:</p>
                                                    </div>
                                                </Col>
                                                <Col sm={9}>
                                                    <div className="form-group">
                                                        <Select onChange={this.districtChange} className="selectNewProfil" clearable placeholder="District" options={this.state.dataDistrict} />
                                                        {/* <select className="form-control" value={this.state.provinceVal} onChange={this.provinceChange}>
                                                            <option value=''>Province</option>
                                                        {this.state.showP
                                                            ? this.state.dataProvince.map((province,i) => {
                                                                return(
                                                                <option value={province.idProvince} key={i}>
                                                                    {province.nomProvince}
                                                                </option>
                                                                )
                                                            })
                                                            : 'Loading...'
                                                        }
                                                        </select> */}
                                                    </div>
                                                </Col>
                                                {/* <Col hidden={!this.state.showF} sm={5}>
                                                    <div className="form-group">
                                                        <p className="textInscriptionPatient">District *:</p>
                                                    </div>
                                                </Col> */}
                                                {/* <Col hidden={!this.state.showF} sm={8}>
                                                    <div className="form-group">
                                                        <select className="form-control" value={this.state.fokontanyVal} onChange={this.fokontanyChange}>
                                                        <option value=''>Fokontany</option>
                                                        {this.state.showF
                                                            ? this.state.dataFokontany.map((fokontany,i) => {
                                                                return(
                                                                <option value={fokontany.idFokontany} key={i}>
                                                                    {fokontany.nomFokontany}
                                                                </option>
                                                                )
                                                            })
                                                            : 'Loading...'
                                                        }
                                                        </select>
                                                    </div>
                                                </Col> */}
                                                {/* <Col hidden={!this.state.showF} sm={8}>
                                                    <div className="form-group">
                                                        <select className="form-control" value={this.state.regionVal} onChange={this.regionChange}>
                                                        <option value=''>R??gion</option>
                                                        {this.state.showF
                                                            ? this.state.dataRegion.map((region,i) => {
                                                                return(
                                                                <option value={region.idRegion} key={i}>
                                                                    {region.nomRegion}
                                                                </option>
                                                                )
                                                            })
                                                            : 'Loading...'
                                                        }
                                                        </select>
                                                    </div>
                                                </Col> */}
                                                
                                                {/* <Col hidden={!this.state.showF} sm={7}>
                                                    <div className="form-group">
                                                        <Select onChange={(e)=>this.setValue(e,'fokontany',true,true)} className="selectNewProfil" placeholder="Fokontany" />
                                                        <select className="form-control" value={this.state.districtVal} onChange={this.districtChange}>
                                                        <option value=''>District</option>
                                                        {this.state.showF
                                                            ? this.state.dataDistrict.map((district,i) => {
                                                                return(
                                                                <option value={district.idDistrict} key={i}>
                                                                    {district.nomDistrict}
                                                                </option>
                                                                )
                                                            })
                                                            : 'Loading...'
                                                        }
                                                        </select>
                                                    </div>
                                                </Col> */}
                                                <Col sm={3}>
                                                    <div className="form-group">
                                                        <p className="textInscriptionPatient">E-mail *:</p>
                                                    </div>
                                                </Col>
                                                <Col sm={9}>
                                                    <div className="form-group">
                                                        <input className="form-control" value={this.state.email} onChange={this.emailText} name="email" id="email" type="email"  placeholder=""/>
                                                    </div>
                                                </Col>
                                                <Col sm={3}>
                                                    <div className="form-group">
                                                        <p className="textInscriptionPatient">T??l??phone*:</p>
                                                    </div>
                                                </Col>
                                                <Col sm={9}>
                                                    <div className="form-group">
                                                        <input className="form-control" value={this.state.phone} onChange={this.phoneText} name="phone" id="phone" type="tel" placeholder =""/>
                                                        <p hidden={!this.state.showId}>Num??ro d??j?? pris</p>
                                                        <p hidden={(this.state.phone.length===0)}>{(this.state.phone.length!==10)? 'Le num??ro doit contenir 10 chiffres':''}</p>
                                                    </div>
                                                </Col>
                                                <Col sm={3}>
                                                    <div className="form-group">
                                                        <p className="textInscriptionPatient">Mot de passe *:</p>
                                                    </div>
                                                </Col>
                                                <Col sm={9}>
                                                    <div className="form-group" data-tip data-for="registerTip">
                                                        <ul className="container_inscription_dataInscription_div_row_col_ul">
                                                            <li className="container_inscription_dataInscription_div_row_col_ul_li_1"><input className="form-control container_inscription_dataInscription_div_row_col_ul_li_1_input" value={this.state.mdp} onChange={this.mdpText} name="" id="mdp1" type={(this.state.etatMotDePasseShow)?"text":"password"}  placeholder=""/></li>
                                                            <li className="container_inscription_dataInscription_div_row_col_ul_li_2"><button className="container_inscription_dataInscription_div_row_col_ul_li_2_button" onClick={()=>{this.setState({etatMotDePasseShow:!this.state.etatMotDePasseShow})}} ><FontAwesomeIcon icon={(!this.state.etatMotDePasseShow)?faEyeSlash:faEye} /></button></li>
                                                        </ul>
                                                        <span className=" col-12 progressBarSonOfChildLoggin"><ProgressBar variant={this.getColorPourcentage(this.state.percentageMdp)} now={this.state.percentageMdp} /></span>
                                                        <ReactTooltip id="registerTip" place="top" effect="solid">Votre mot de passe doit comporter un chiffre, une majuscule, une minuscule, un caract??re sp??ciale(#,*,%,!...) et au moins 8 caract??res </ReactTooltip>
                                                    </div>
                                                </Col>
                                                <Col sm={3}>
                                                    <div className="form-group">
                                                        <p className="textInscriptionPatient">Confirmation:</p>
                                                    </div>
                                                </Col>
                                                <Col sm={9}>
                                                    <div className="form-group">
                                                        <ul className="container_inscription_dataInscription_div_row_col_ul">
                                                            <li className="container_inscription_dataInscription_div_row_col_ul_li_1"><input className="form-control container_inscription_dataInscription_div_row_col_ul_li_1_input" value={this.state.mdpC} onChange={this.mdpCText} name="" id="mdp1" type={(this.state.etatMotDePasseShowConf)?"text":"password"}  placeholder=""/></li>
                                                            <li className="container_inscription_dataInscription_div_row_col_ul_li_2"><button className="container_inscription_dataInscription_div_row_col_ul_li_2_button" onClick={()=>{this.setState({etatMotDePasseShowConf:!this.state.etatMotDePasseShowConf})}} ><FontAwesomeIcon icon={(!this.state.etatMotDePasseShowConf)?faEyeSlash:faEye} /></button></li>
                                                        </ul>
                                                        {/* <input className={this.state.mdpCorrect? "form-control success": "form-control error"} value={this.state.mdpC} onChange={this.mdpCText} name="mdp" id="mdp2" placeholder="Confirmation du mot de passe" type="password" /> */}
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={12} md={12} sm={12}>
                                                    <div className="form-group mt-3 container_inscription_dataInscription_div_row_col_checkbox">
                                                        <label className='col-md-12' htmlFor='cgu'>
                                                            <input type='checkbox' checked={this.state.validCgu} onChange={this.validChange} name='validation' style={{color:'blue'}} className='' id='cgu'/>
                                                            &nbsp;&nbsp;J'accepte les <a href="/conditions-generales-d-utilisation-de-MEDDoC" style={{color:'#29b6f6'}}>conditions g??n??rales d'utilisation</a>
                                                        </label>
                                                    </div>
                                                </Col>
                                                <Col lg={12} md={12} sm={12}>
                                                    <div className="form-group">
                                                    <p className="titlePLogin" style={{textAlign: 'right'}}>(*) : Champs obligatoires </p>
                                                    </div>
                                                </Col>
                                                <Col lg={12} md={12} sm={12} hidden={this.state.etatMessage!==1}>
                                                    <div className="form-group mt-3">
                                                        <div className="errorInscriptionPatient">{this.state.message}</div>
                                                    </div>
                                                </Col>
                                                {this.state.erreurEtat?<Toaster type={'error'} bodyMsg={this.state.message} isShow={this.state.erreurEtat} toggleShow={this.changeShow}/>:''}
                                                <Col lg={12} md={12} sm={12}  hidden={this.state.etatMessage===2}>
                                                    <div className="form-group mt-3">
                                                        <button className="boutonInscriptionPatient" disabled={!this.state.validCgu} hidden={this.state.disableButton} onClick={()=> this.signinSubmit()}>S'inscrire</button>
                                                        <div hidden={!this.state.disableButton} className="login-loader"></div>
                                                    </div>
                                                </Col>
                                            </Row>
                                    </Col>
                                </Row>
                            {/* </div> */}
                        </Container>
                    </div>
                    
                </div>
            </div>
        )
    }
    getDataHtmlValidationCompte(){
        return (
            <div className="col-md-12 col-sm-12">
                <h1 className="titleH1Login"><b>Nouveau sur MEDDoC ? </b></h1>
                <p className="titlePLogin">Pour des raisons de s??curit??, renseignez les informations demand??es ci-dessous.<a className="titleALogin" href="/login-meddoc"> Connectez-vous</a> </p>
                <div className="inputInscriptionPatient">
                    <p className="titlePLogin">Ce code ?? 4 caract??res vous a ??t?? envoy?? par mail et par SMS pour la cr??ation de votre compte. <br/> Si vous n'avez pas re??u, clique <a href="/">e-mail</a> / <a  href="/">SMS</a></p>
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
                        <button className="bouton-solid-reg col-10 popup-with-move-anim a1" id="sonboutonConnecter" onClick={()=>this.confirmationCodeMedecin()}  >Confirmer</button>
                    </div>
                    
                </div>
                
            </div>
        )
    }
    componentDidMount(){
        fetchGet('/adresse/find-district-part/all').then(data=>{
            if(data!=null && data.length>=0){
                this.setState({ dataDistrict: data });
                this.setState({showP: true});
            }
        });
        fetchGet('/adresse/province/all').then(data=>{
            if(data!=null && data.length>=0){
                this.setState({ dataProvince: data });
                this.setState({showP: true});
            }
        });
        // this.setState({showP: true,dataProvince : globalActions.getData('/adresse/province/all')});
        
    }
    render(){
        return (
            <div className="logginAllMeddoc">
                {
                    (this.state.etatMenu === 3)?
                    (
                        <div className="container bienvenuAfterInscription">
                            <div className="sonbienvenuAfterInscription">
                                <div className="sonofSondivTableInscriptionMedecin">
                                    <div className="ChildsonofSondivTableInscription">
                                        <h2 className="h1ChildsonofSondivTableInscription">Bonjour et bienvenue dans la famille MEDDoC!</h2>
                                        <p className="text1ChildsonofSondivTableInscription">Vous ??tes sur le point de faire partie de notre formidable plateforme en ligne utilis??e par les professionnels de sant?? pour am??liorer l'acc??s aux soins ?? Madagascar, de mieux g??rer votre agenda, la prise de rendez-vous et le suivi des patients. </p>
                                        <p className="text2ChildsonofSondivTableInscription">Commencez sans plus attendre ! Et n'h??sitez pas ?? nous appeler ou nous envoyer un e-mail si vous avez des questions. Nous serons heureux de vous aider ! </p>
                                        <div className="divboutonBienvenue"><button className="boutonBienvenue" onClick={()=>this.seConnecter()}>Commencez maintenant</button></div>
                                        <div className="divImageBienvenu">
                                            <img src={bienvenue} className="imageBienvenu" alt="bienvenue" />
                                        </div>
                                        <p className="divTextIMMMMMboutonBienvenue">Cordialement,</p>
                                        <p className="divTextIPPPPPboutonBienvenue">L'??quipe MEDDoC</p>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    ): (
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 col-sm-12" id="sonV2logginAllMeddoc">
                                    <div className="row">
                                        {
                                            (this.state.etatMenu === 1)?
                                            this.getDataHtmlInscription()
                                            :(this.state.etatMenu === 2)?
                                            this.getDataHtmlValidationCompte()
                                            :(<div></div>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            
        )
    }
}
export default Inscription;