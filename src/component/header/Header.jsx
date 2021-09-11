import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom';
import logo from '../../assets/logo/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../assets/fonts/Font.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCaretDown, faUserCircle, faSignOutAlt, faUser, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Cookies } from 'react-cookie';
import { instanceOf } from "prop-types";
import { utile } from '../../services/utile';

import {userSession} from '../../services/userSession';

class Header extends React.Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props){
        super(props);
        this.state={
            close:false,
            showMore:false,
            pseudo:null,
            photo:null,
            showMenu:false,
            type:null,
            way:'',
            initial:'',
            text:'',
            district:'0',
            listDistrict:[],
            nav:false
        }
    }
    logout(){
        userSession.userLogout();
    }
    componentDidMount(){
        const cookies = this.props.cookies;
        cookies.get('user');
        const chemin = window.location.pathname.split('/')[1];
        this.setState({way:chemin});
        if(cookies.get('pseudo')!==null && cookies.get('pseudo')!==undefined && cookies.get('token')!==null && cookies.get('token')!==undefined && cookies.get('role')!==null && cookies.get('role')!==undefined){
            if(cookies.get('role').toLowerCase()==='centre'){
                if(chemin==='profil-patient'||chemin==='professionnel'){
                    alert('Vous n\'êtes pas autororisé à accéder ce lien');
                    window.location.replace('/profil-centre/1');
                }
                if(chemin==='connexion-professionnel-sante' || chemin==='inscription-centre' || chemin==='connexion' || chemin==='inscription'){
                    alert('Vous êtes déjà connecté');
                    window.location.replace('/profil-centre/1');
                }
                // this.setState({type:'centre', pseudo:localStorage.getItem('pseudo'), photo: localStorage.getItem('photo')});
                this.setState({initial: utile.getFullInitial(cookies.get('pseudo')),photo:cookies.get('photo'), pseudo: cookies.get('pseudo'), type: cookies.get('role')});
            }else if(cookies.get('role').toLowerCase()==='patient'){
                if(chemin==='profil-centre'||chemin==='professionnel'){
                    alert('Vous n\'êtes pas autororisé à accéder ce lien');
                    window.location.replace('/');
                }
                if(chemin==='connexion-professionnel-sante' || chemin==='inscription-centre' || chemin==='connexion' || chemin==='inscription'){
                    alert('Vous êtes déjà connecté');
                    window.location.replace('/profil-patient');
                }
                // this.setState({type:'patient', pseudo:userData.username, photo: userData.profilPicture});
                this.setState({initial: utile.getFullInitial(cookies.get('pseudo')), photo:cookies.get('photo'), pseudo: cookies.get('pseudo'), type: cookies.get('role')});
            }else if(cookies.get('role').toLowerCase()==='professionnel santé'){
                if(chemin==='profil-patient'||chemin==='profil-centre'){
                    alert('Vous n\'êtes pas autororisé à accéder ce lien');
                    window.location.replace('/professionnel/'+utile.valueToLink(cookies.get('pseudo'))+'/dashboard/'+utile.formatDateDash(new Date()));
                }
                if(chemin==='connexion-professionnel-sante' || chemin==='inscription-centre' || chemin==='connexion' || chemin==='inscription'){
                    alert('Vous êtes déjà connecté');
                    window.location.replace('/professionnel/'+utile.valueToLink(cookies.get('pseudo'))+'/dashboard/'+utile.formatDateDash(new Date()));
                }
                // this.setState({type:'professionnel santé', pseudo:localStorage.getItem('pseudo'), photo: 'profile.png'});
                this.setState({initial: utile.getFullInitial(cookies.get('pseudo')),photo:cookies.get('photo'), pseudo: cookies.get('pseudo'), type: cookies.get('role')});
            }else{
                if(chemin==='profil-patient'||chemin==='profil-centre'||chemin==='professionnel'){
                    alert('Vous devez vous connecté');
                    window.location.replace('/');
                }
            }
        }else{
            if(chemin==='profil-patient'||chemin==='profil-centre'||chemin==='professionnel'){
                alert('Vous devez vous connecté');
                window.location.replace('/');
            }
        }
        window.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll= () => {
        if (window.pageYOffset > 190) {
                this.setState({ nav: true});
        }else{
                this.setState({ nav: false});
        }
        // this.setState({scrollTop: $(window).scrollTop()});
    }
    getLink(){
        if((this.state.type).toLowerCase()==='centre'){
            if(this.state.way!=='profil-centre'){
                return(
                    <>
                        <li onClick={()=>{window.location.replace("/profil-centre/1")}}>Compte <FontAwesomeIcon icon={faUser}/></li>
                        <li onClick={()=>{this.logout(); window.location.replace("/connexion-professionnel-sante")}}>Déconnexion <FontAwesomeIcon icon={faSignOutAlt}/></li>
                    </>
                )
            }else{
                return(
                    <>
                        <li onClick={()=>{this.logout(); window.location.replace("/connexion-professionnel-sante")}}>Déconnexion <FontAwesomeIcon icon={faSignOutAlt}/></li>
                    </>
                )
            }
        }
        else if((this.state.type).toLowerCase()==='patient'){
            if(this.state.way!=='profil-patient'){
                return(
                    <>
                        <li onClick={()=>{window.location.replace("/profil-patient")}}>Compte <FontAwesomeIcon icon={faUser}/></li>
                        <li onClick={()=>{this.logout(); window.location.replace("/connexion")}}>Déconnexion <FontAwesomeIcon icon={faSignOutAlt}/></li>
                    </>
                )
            }else{
                return(
                    <>
                        <li onClick={()=>{this.logout(); window.location.replace("/connexion")}}>Déconnexion <FontAwesomeIcon icon={faSignOutAlt}/></li>
                    </>
                )
            }
        }
        else if((this.state.type).toLowerCase()==='professionnel santé'){
            if(this.state.way!=='professionnel'){
                return(
                    <>
                        <li onClick={()=>{window.location.replace("/professionnel/"+utile.valueToLink(userSession.get('pseudo'))+'/dashboard/'+utile.formatDateDash(new Date()))}}>Compte <FontAwesomeIcon icon={faUser}/></li>
                        <li onClick={()=>{this.logout(); window.location.replace("/connexion-professionnel-sante")}}>Déconnexion <FontAwesomeIcon icon={faSignOutAlt}/></li>
                    </>
                )
            }else{
                return(
                    <>
                        <li onClick={()=>{this.logout(); window.location.replace("/connexion-professionnel-sante")}}>Déconnexion <FontAwesomeIcon icon={faSignOutAlt}/></li>
                    </>
                )
            }
        }
    }
    searchOnChange=(param, e)=>{
        if(param==="district"){
            if(e!==null)
                this.setState({[param]:e.value});
            else
                this.setState({[param]:'0'});
        }else
            this.setState({[param]:e.target.value});
    }
    render(){
        // const customStyles = {
        //     option: (provided, state) => ({
        //       ...provided,
        //       borderBottom: '1px dotted pink',
        //       color: state.isSelected ? '#fff' : '#1b7895'
        //     }),
        //     control: (provided) => ({
        //       // none of react-select's styles are passed to <Control />
        //         ...provided,
        //         width: '100%',
        //         height: '51px',
        //         borderRadius: '0 !important',
        //         backgroundColor: '#fff',
        //         marginLeft: 0
        //     }),
        //     container: base => ({
        //         ...base,
        //         // flex: 1,
        //         height:51,
        //         padding:0
        //         // margin:'0 auto',

        //       })
        // }
        return(
            <div className="root-header" style={{ backgroundColor:this.state.nav?"#1b7895":"", transition:"all 1s"}}>
                <div className="row">
                    <div className="col-md-4 col-sm-4 col-xs-4 col-4 logo-place">
                        <div className="col-md-12">
                            <Link to="/" className="col-md-8"><img src={logo} alt="logo meddoc"/></Link>
                            {/* <div className="col-md-12"></div> */}
                        </div>
                    </div>
                    <div className="col-md-8 col-sm-8 col-xs-8 col-8 user-icon-place">
                        {
                        this.state.pseudo !== null?
                            <>
                                
                                <ul className="connected-menu">
                                    <li className="sign-in-link">
                                        <Link to="#0" className="signed-link"><span className='initial-icon'>{this.state.initial}</span>&nbsp;&nbsp;{this.state.pseudo} <FontAwesomeIcon style={{fontSize:'15px'}} icon={faCaretDown}/></Link>
                                        <ul className="dropdown-menu-compte" style={this.state.showMenu?{display:"block",opacity:"1",visibility:"visible",zIndex:"999"}:null}>
                                            {/* <li onClick={()=>window.location.replace('/inscription')}>Inscription</li>
                                            <li onClick={()=>window.location.replace('/connexion')}>Connexion</li> */}
                                            {this.getLink()}
                                        </ul>
                                    </li>
                                </ul>
                            </>
                            :<>
                                <ul className="home-menu">
                                    <li className="nav-menu-link sign-in-link" id="drop-down-menu-link">Nos services <FontAwesomeIcon icon={faCaretDown}/>
                                        <ul id="drop-down-menu-sublink">
                                            <li>Prise de rendez-vous en ligne</li>
                                            <li>Pharmaclic</li>
                                        </ul>
                                    </li>
                                    <li className="nav-menu-link" id="drop-down-menu-link">Vous êtes <FontAwesomeIcon icon={faCaretDown}/>
                                        <ul id="drop-down-menu-sublink">
                                            <li><Link to="/professionnel-de-sante">Un professionnel de santé?</Link></li>
                                            <li><Link to="/pharmacie">Une pharmacie?</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                                <ul className="account-menu">
                                    <li className="sign-in-link">
                                        <Link to="#0"><FontAwesomeIcon style={{fontSize:'25px', color:'#fff',paddingTop : '5%'}} icon={faUserCircle}/>&nbsp;Compte&nbsp;<FontAwesomeIcon style={{fontSize:'15px', color:'#fff'}} icon={faCaretDown}/></Link>
                                        <ul className="dropdown-menu-compte">
                                            {/* <li onClick={()=>window.location.replace('/inscription')}><Link to="/inscription">Inscription</a></li> */}
                                            <li><Link to="/inscription">Inscription</Link></li>
                                            {/* <li onClick={()=>window.location.replace('/connexion')}><Link to="/connexion">Connexion</a></li> */}
                                            <li><Link to="/connexion">Connexion</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </>
                        }
                    </div>
                    <div className="col-md-8 col-sm-8 col-xs-8 col-8 user-icon-phone">
                        <ul>
                            <li id="bar-menu">
                                <Link to="#menu" onClick={()=>this.setState({showMenu:!this.state.showMenu})} className="cold-md-12"><FontAwesomeIcon icon={this.state.showMenu?faTimes:faBars}/> </Link>
                                <ul style={this.state.showMenu?{display:"block",opacity:"1",visibility:"visible",zIndex:"999"}:null} id="bar-menu-phone">
                                    {!utile.hasValue(this.state.pseudo)?
                                    <>
                                        <li>Prise de rendez-vous en ligne</li>
                                        <li>Pharmaclic</li>
                                        <li><Link to="/professionnel-de-sante">Un professionnel de santé?</Link></li>
                                        <li><Link to="/pharmacie">Une pharmacie?</Link></li>
                                        <li><Link to="/inscription">Inscription</Link></li>
                                        <li><Link to="/connexion">Connexion</Link></li>
                                    </>:<>
                                        {this.getLink()}
                                    </> }           
                                    {/* <li ><Link to="/inscription">Inscription</a></li>
                                    <li ><Link to="/connexion">Connexion</a></li> */}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* <div className="searchbar-header" style={{display:this.state.way==="sprofil-patient"?"block":"none"}}>
                    <div className="row">
                        <input className="inputSearch col-md-4" name="text" type="text" value={this.state.text} onChange={this.searchOnChange.bind(this,'text')} placeholder="Rechercher un centre de vaccination" />
                        <Select styles={customStyles} defaultValue={this.state.listDistrict[5]} isClearable className="col-md-4" options={this.state.listDistrict} onChange={this.searchOnChange.bind(this,"district")}/>
                        <button href='#sendMessage' className="buttonSearch col-md-2"  onClick={()=>{window.location.pathname='/profil-patient/recherche/'+this.state.text+'/'+this.state.district}}><FontAwesomeIcon icon={faSearch}/></button>
                    </div>
                </div> */}
            </div>
        );
    }
}
export default Header;