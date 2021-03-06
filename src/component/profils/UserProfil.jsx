import React, {Component} from 'react';
import './UserProfil.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch ,faCalendarAlt, faCalendarCheck, faFolderPlus, faPowerOff, faUserAlt, faHeadset} from '@fortawesome/free-solid-svg-icons';
import { userSession } from '../../services/userSession';
import {fetchGet} from '../../services/global.service';
import Causette from '../chat/Causette';
// import Confirmation from '../alert/Confirmation';
// import Actualite from '../actualite/Actualite';
//import NewProfilPatient from '../profilePatient/NewProfilPatient';
import ProfilPatient from './ProfilPatient';
import Centre from '../centre/Centre';
import ListeRdv from '../listeRdvPatient/ListeRdv';
import Proche from '../mesProches/Proche';
//import SuiviMedicalPatient from '../suivi-medical-patient/SuiviMedicalPatient';
import CarnetDeSante from '../carnetDeSante/CarnetDeSante';
import Assistance from './Assistance';
import AlertMessage from '../alertMessage/AlertMessage';

const indexLink = ['recherche','compte','rendez-vous','carnet-de-sante','causette','proches','actu','assistance']
class UserProfil extends Component{
    constructor(props){
        super();
        this.state = {
            user : null,
            etatShow : 1,
            dataSearch:null,
            confirmeShow:false,
            validation:false,
            bodyConfirm:'',
            headerConfirm:''
        }
    }
    componentDidMount() {
        this.setState({etatShow:indexLink.indexOf(window.location.pathname.split('/')[2])},function(){
            if(this.state.etatShow===0){
                const value = window.location.pathname.split('/');
                this.setState({dataSearch:{text:value[3],district:value[4]}},function(){
                    console.log(this.state.dataSearch);
                });
            }
            console.log('token = '+userSession.get('token'))
            fetchGet('/users/dataUser/'+userSession.get('token')).then(response=>{
                this.setState({user : response.data});
            });
        });
    }
    linkInMenu=(link)=>{
        this.setState({etatShow:indexLink.indexOf(link)},function(){
            if(this.state.etatShow===0){
                window.history.pushState("object or string", "Title", "/profil/"+link+'//0');
                const value = window.location.pathname.split('/');
                this.setState({dataSearch:{text:value[3],district:value[4]}},function(){
                    console.log(this.state.dataSearch);
                });
            }else{
                window.history.pushState("object or string", "Title", "/profil/"+link);
                this.setState({dataSearch:null},function(){
                    console.log(this.state.dataSearch);
                });
            } 
        });
        // if(link==='recherche')
        //     window.history.pushState("object or string", "Title", "/profil/"+link+'/all/0');
        // else{
        //     window.history.pushState("object or string", "Title", "/profil/"+link);
        //     this.setState({dataSearch:null});
        // } 
    }
    isActive=(active)=>{
        if(this.state.etatShow===active)
            return ' active-menu';
    }
    // confirmeState=(value,body,header)=>{
    //     this.setState({confirmeShow:value,bodyConfirm:body,headerConfirm:header});
    // }
    // valideState=(value)=>{
    //     this.setState({validation:value});
    // }

    getAffichageAvertisement(){
        let data = localStorage.getItem('etatshowAvertissement');
        if(data!=null && data!==undefined){
            return data;
        }
        return false;
    }
    getDataHtmlAffichageAvertisement(){
        if(this.getAffichageAvertisement()){
            return <AlertMessage />;
        }else{
            return <div></div>;
        }
    }
    showComponentProfil(valeur){
        if(valeur!==null && valeur!==undefined){
            // return <NewProfilPatient  dataUser ={valeur} />
            return <ProfilPatient dataUser ={valeur} />
        }
        // return (<div>Il y a une erreur de chargement</div>)
    }
    showComponentRdv(valeur){
        if(valeur!==null && valeur!==undefined){
            // return <NewProfilPatient  dataUser ={valeur} />
            return <ListeRdv id={valeur.idUser}/>
        }
        // return (<div>Il y a une erreur de chargement</div>)
    }
    render(){
        return(
            <div id="profil-content">
                {this.getDataHtmlAffichageAvertisement()}
                <div className="row">
                    <div className="col-md-12" id="top-banner">
                        <div className="col-md-12" id="wave">
                            <div className="col-md-12" id="profil-picture">
                                <img src={`assets/upload/${this.state.user!==null?this.state.user.profilPicture!==""?this.state.user.profilPicture:'profile.png':'profile.png'}`} alt='profil user'/>
                            </div>
                            <div className="col-md-12" id="profil-name">
                                <h1>{this.state.user!==null?this.state.user.nom+' '+this.state.user.prenoms:''}</h1>
                            </div>    
                        </div>
                        {/* <div className="col-md-12" id="gradient"></div> */}
                        <div className="col-md-12" id="pulse">
                            <div className="heart-rate">
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="170px" height="50px" viewBox="0 0 150 73" enableBackground="new 0 0 150 73" xmlSpace="preserve">
                                    <polyline fill="none" stroke="#1b7895" strokeWidth="3" strokeMiterlimit="10" points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"
                                    />
                                </svg>
                                <div className="fade-in"></div>
                                <div className="fade-out"></div>
                            </div>
                            <div id="heart"></div>
                        </div>
                    </div>
                </div>
                <div id="profil-content-container">
                    <div className="row">
                        <div className="" id="left-menu">
                            <ul className="list-group">
                                <li onClick={()=>this.linkInMenu('recherche')} className={this.isActive(0)}><FontAwesomeIcon icon={faSearch} /> Trouver un centre de vaccination</li>
                                <li onClick={()=>this.linkInMenu('compte')} className={this.isActive(1)}><FontAwesomeIcon icon={faUserAlt} /> Mon profil</li>
                                <li onClick={()=>this.linkInMenu('rendez-vous')} className={this.isActive(2)}><FontAwesomeIcon icon={faCalendarCheck} /> Mes rendez-vous</li>
                                <li onClick={()=>this.linkInMenu('carnet-de-sante')} className={this.isActive(3)}><FontAwesomeIcon icon={faCalendarAlt}/> Suivi m??dical</li>
                                <li onClick={()=>this.linkInMenu('proches')} className={this.isActive(5)}><FontAwesomeIcon icon={faFolderPlus}/> Mes proches</li>
                                {/* <li onClick={()=>this.linkInMenu('compte')} className={this.isActive(1)}><FontAwesomeIcon icon={faUserAlt} /> G??rer mon compte</li> */}
                                <a href="#assistance" onClick={()=>this.linkInMenu('assistance')} className={this.isActive(7)}><button className="btn btn-info form-control" style={{backgroundColor: "#39c3ef",borderColor: "#39c3ef"}}><FontAwesomeIcon icon={faHeadset} /> Assistance</button></a>
                                <a href="/" onClick={()=>{localStorage.clear(); window.location.replace("/connexion-centre")}}><button className="btn btn-danger form-control"><FontAwesomeIcon icon={faPowerOff}/> D??connexion </button></a>
                                            
                            </ul>
                        </div>
                        <div className="" id="right-content">
                            {
                                (this.state.etatShow===2)
                                ?this.showComponentRdv(this.state.user)
                                :(this.state.etatShow===3)
                                ?(<CarnetDeSante/>)
                                :(this.state.etatShow===5)
                                ?(<Proche/>) 
                                :(this.state.etatShow===4)
                                ?(<Causette/>)
                                :(this.state.etatShow===7)
                                ?(<Assistance/>)
                                :(this.state.etatShow===0)
                                ?(this.state.dataSearch!==null?<Centre dataFind = {this.state.dataSearch}/>:'')
                                :this.showComponentProfil(this.state.user)
                                // :(this.state.etatShow===1)
                                // ?this.showComponentProfil(this.state.user)
                                // :<Actualite/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserProfil;