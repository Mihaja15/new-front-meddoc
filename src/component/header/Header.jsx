import React from 'react';
import './Header.css';
import logo from '../../assets/logo/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../assets/fonts/Font.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faUserAlt } from '@fortawesome/free-solid-svg-icons';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state={
            close:false,
            showMore:false,
            pseudo:null,
            photo:null,
            showMenu:false,
            type:null,
            way:''
        }
    }
    componentDidMount(){
        // var type = 0;
        // if(localStorage.getItem('typeConnected')!==null&&localStorage.getItem('typeConnected')!==undefined&&localStorage.getItem('typeConnected')!=="")
        //     type = localStorage.getItem('typeConnected');
        const chemin = window.location.pathname.split('/')[1];
        this.setState({way:chemin});
        // alert(chemin)
        // const isConnected = localStorage.getItem('connected');
        if(localStorage.getItem('idCentre')===null && localStorage.getItem('idUser')===null && localStorage.getItem('idStaff')===null){
            if(chemin==='profil'||chemin==='profil-centre'||chemin==='profil-staff'){
                alert('Vous n\'êtes pas autororisé à accéder ce lien');
                window.location.replace('/');
            }
        }else if(localStorage.getItem('idCentre')!==null && localStorage.getItem('idUser')===null && localStorage.getItem('idStaff')===null){
            if(chemin==='profil'||chemin==='profil-staff'){
                alert('Vous n\'êtes pas autororisé à accéder ce lien');
                window.location.replace('/profil-centre/1');
            }
            if(chemin==='connexion-centre' || chemin==='inscription-centre' || chemin==='connexion' || chemin==='inscription'){
                alert('Vous êtes déjà connecté');
                window.location.replace('/profil-centre/1');
            }
            this.setState({type:'centre', pseudo:localStorage.getItem('pseudo'), photo: localStorage.getItem('photo')});
        }else if(localStorage.getItem('idCentre')===null && localStorage.getItem('idUser')!==null && localStorage.getItem('idStaff')===null){
            if(chemin==='profil-centre'||chemin==='profil-staff'){
                alert('Vous n\'êtes pas autororisé à accéder ce lien');
                window.location.replace('/');
            }
            if(chemin==='connexion-centre' || chemin==='inscription-centre' || chemin==='connexion' || chemin==='inscription'){
                alert('Vous êtes déjà connecté');
                window.location.replace('/profil');
            }
            this.setState({type:'patient', pseudo:localStorage.getItem('pseudo'), photo: localStorage.getItem('photo')});
        }else if(localStorage.getItem('idCentre')===null && localStorage.getItem('idUser')===null && localStorage.getItem('idStaff')!==null){
            if(chemin==='profil'||chemin==='profil-centre'){
                alert('Vous n\'êtes pas autororisé à accéder ce lien');
                window.location.replace('/profil-staff/1');
            }
            if(chemin==='connexion-centre' || chemin==='inscription-centre' || chemin==='connexion' || chemin==='inscription'){
                alert('Vous êtes déjà connecté');
                window.location.replace('/profil-staff/1');
            }
            this.setState({type:'staff', pseudo:localStorage.getItem('pseudo'), photo: 'profile.png'});
        }
        // console.log(localStorage.getItem('connected')===null);
    }
    getLink(){
        if(this.state.type==='centre'){
            if(this.state.way!=='profil-centre'){
                return(
                    <>
                        <li onClick={()=>{window.location.replace("/profil-centre/1")}}>Compte</li>
                        <li onClick={()=>{localStorage.clear(); window.location.replace("/connexion-centre")}}>Déconnexion</li>
                    </>
                )
            }else{
                return(
                    <>
                        <li onClick={()=>{localStorage.clear(); window.location.replace("/connexion-centre")}}>Déconnexion</li>
                    </>
                )
            }
        }
        else if(this.state.type==='patient'){
            if(this.state.way!=='profil'){
                return(
                    <>
                        <li onClick={()=>{window.location.replace("/profil")}}>Compte</li>
                        <li onClick={()=>{localStorage.clear(); window.location.replace("/connexion")}}>Déconnexion</li>
                    </>
                )
            }else{
                return(
                    <>
                        <li onClick={()=>{localStorage.clear(); window.location.replace("/connexion")}}>Déconnexion</li>
                    </>
                )
            }
        }else if(this.state.type==='staff'){
            if(this.state.way!=='profil-staff'){
                return(
                    <>
                        <li onClick={()=>{window.location.replace("/profil-staff/1")}}>Compte</li>
                        <li onClick={()=>{localStorage.clear(); window.location.replace("/connexion")}}>Déconnexion</li>
                    </>
                )
            }else{
                return(
                    <>
                        <li onClick={()=>{localStorage.clear(); window.location.replace("/connexion")}}>Déconnexion</li>
                    </>
                )
            }
        }
    }
    render(){
        return(
            <div className="root-header">
                <a href="/"><img src={logo} alt="logo meddoc"/></a>
                <ul>
                    {
                        this.state.pseudo !== null?
                        <li className="user-icon-menu">
                            <a className="icon-menu-right" href="#0" onClick={()=>{this.setState({showMenu:!this.state.showMenu})}}><img src={`/assets/upload/profile.png`} alt=""/>{this.state.pseudo} <FontAwesomeIcon style={{fontSize:'15px'}} icon={faChevronDown}/></a>
                            <ul className="dropdown-menus" style={this.state.showMenu?{display:"block",opacity:"1",visibility:"visible",zIndex:"999"}:null}>
                                {this.getLink()}
                            </ul>
                        </li>
                        :<a href="/connexion"><FontAwesomeIcon icon={faUserAlt}/> se connecter / s'inscrire</a>
                    }
                </ul>
            </div>
        );
    }
}
export default Header;