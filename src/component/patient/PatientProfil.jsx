import { faCalendarCheck, faCommentMedical, faFolderPlus, faSearch, faUserAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './PatientProfil.css';
import { userSession } from '../../services/userSession';
import {fetchGetHandler} from '../../services/global.service';
import CarnetDeSante from '../carnetDeSante/CarnetDeSante';
import Proche from '../mesProches/Proche';
import Causette from '../chat/Causette';
import Assistance from '../profils/Assistance';
import Centre from '../centre/Centre';
import ListeRdv from '../listeRdvPatient/ListeRdv';
import DetailProfil from './DetailProfil';
import { utile } from '../../services/utile';
import Loader from '../alert/Loader';

const indexLink = ['recherche','compte','rendez-vous','carnet-de-sante','causette','proches','actu','assistance']
export default class PatientProfil extends React.Component{
    constructor(props){
        super(props);
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
        if(window.location.pathname.split('/')[2]===""||window.location.pathname.split('/')[2]===undefined){
            this.setState({etatShow: 1});
        }else{
            this.setState({etatShow:indexLink.indexOf(window.location.pathname.split('/')[2])},function(){
                if(this.state.etatShow===0){
                    const value = window.location.pathname.split('/');
                    this.setState({dataSearch:{text:value[3],district:value[4]}},function(){
                        console.log(this.state.dataSearch);
                    });
                }
                console.log('token = '+userSession.get('token'))
            });
        }
        fetchGetHandler('/users/dataUser/'+userSession.get('token')).then(response=>{
            console.log(response)
            if(utile.hasValue(response))
                this.setState({user : response.data});
        });
    }
    linkInMenu=(link)=>{
        this.setState({etatShow:indexLink.indexOf(link)},function(){
            if(this.state.etatShow===0){
                window.history.pushState("object or string", "Title", "/profil-patient/"+link+'//0');
                const value = window.location.pathname.split('/');
                this.setState({dataSearch:{text:value[3],district:value[4]}},function(){
                    console.log(this.state.dataSearch);
                });
            }else{
                window.history.pushState("object or string", "Title", "/profil-patient/"+link);
                this.setState({dataSearch:null},function(){
                    console.log(this.state.dataSearch);
                });
            } 
        });
    }
    isActive=(active)=>{
        if(this.state.etatShow===active)
            return ' active-menu';
    }
    showComponentProfil(valeur){
        if(valeur!==null && valeur!==undefined)
            return <DetailProfil dataUser ={valeur} />
        else
            return <div style={{marginTop:'25vh'}}><Loader/></div>

        
    }
    showComponentRdv(valeur){
        if(valeur!==null && valeur!==undefined)
            return <ListeRdv id={valeur.idUser}/>
        else
            return <div style={{marginTop:'25vh'}}><Loader/></div>
    }
    render(){
        return(
            <div className="profil-patient">
                <div className="row">
                    <div className="header-profil-patient col-md-12">
                        <ul className="">
                            <li onClick={()=>this.linkInMenu('recherche')} className={this.isActive(0)}><FontAwesomeIcon icon={faSearch} /> Trouver un professionnel de santé</li>
                            <li onClick={()=>this.linkInMenu('compte')} className={this.isActive(1)}><FontAwesomeIcon icon={faUserAlt} /> Mon profil</li>
                            <li onClick={()=>this.linkInMenu('rendez-vous')} className={this.isActive(2)}><FontAwesomeIcon icon={faCalendarCheck} /> Mes rendez-vous</li>
                            <li onClick={()=>this.linkInMenu('carnet-de-sante')} className={this.isActive(3)}><FontAwesomeIcon icon={faFolderPlus}/> Suivi médical</li>
                            <li onClick={()=>this.linkInMenu('proches')} className={this.isActive(5)}><FontAwesomeIcon icon={faUserFriends}/> Mes proches</li>
                            <li onClick={()=>this.linkInMenu('causette')}  className={this.isActive(4)}><FontAwesomeIcon icon={faCommentMedical} /> Causette</li>
                            {/* <li onClick={()=>this.linkInMenu('compte')} className={this.isActive(1)}><FontAwesomeIcon icon={faUserAlt} /> Gérer mon compte</li> */}
                            {/* <a href="#assistance" onClick={()=>this.linkInMenu('assistance')} className={this.isActive(7)}><button className="btn btn-info form-control" style={{backgroundColor: "#39c3ef",borderColor: "#39c3ef"}}><FontAwesomeIcon icon={faHeadset} /> Assistance</button></a>
                            <a href="/" onClick={()=>{localStorage.clear(); window.location.replace("/connexion-centre")}}><button className="btn btn-danger form-control"><FontAwesomeIcon icon={faPowerOff}/> Déconnexion </button></a> */}
                                        
                        </ul>
                    </div>
                    <div className="header-profil-phone col-md-12">
                        <ul className="">
                            <li onClick={()=>this.linkInMenu('recherche')} className={this.isActive(0)}><FontAwesomeIcon icon={faSearch} /></li>
                            <li onClick={()=>this.linkInMenu('compte')} className={this.isActive(1)}><FontAwesomeIcon icon={faUserAlt} /></li>
                            <li onClick={()=>this.linkInMenu('rendez-vous')} className={this.isActive(2)}><FontAwesomeIcon icon={faCalendarCheck} /></li>
                            <li onClick={()=>this.linkInMenu('carnet-de-sante')} className={this.isActive(3)}><FontAwesomeIcon icon={faFolderPlus}/></li>
                            <li onClick={()=>this.linkInMenu('proches')} className={this.isActive(5)}><FontAwesomeIcon icon={faUserFriends}/></li>
                            <li onClick={()=>this.linkInMenu('causette')}  className={this.isActive(4)}><FontAwesomeIcon icon={faCommentMedical} /></li>
                            {/* <li onClick={()=>this.linkInMenu('compte')} className={this.isActive(1)}><FontAwesomeIcon icon={faUserAlt} /> Gérer mon compte</li> */}
                            {/* <a href="#assistance" onClick={()=>this.linkInMenu('assistance')} className={this.isActive(7)}><button className="btn btn-info form-control" style={{backgroundColor: "#39c3ef",borderColor: "#39c3ef"}}><FontAwesomeIcon icon={faHeadset} /> Assistance</button></a>
                            <a href="/" onClick={()=>{localStorage.clear(); window.location.replace("/connexion-centre")}}><button className="btn btn-danger form-control"><FontAwesomeIcon icon={faPowerOff}/> Déconnexion </button></a> */}
                                        
                        </ul>
                    </div>
                    <div className="content-profil-patient col-md-12">
                        <div className="container">
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
                            ?(this.state.dataSearch!==null?<Centre show={true} dataFind = {this.state.dataSearch}/>:'')
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