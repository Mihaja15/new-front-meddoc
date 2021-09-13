import React from 'react';
import { Router, Switch, Route} from 'react-router-dom';
import './App.css';
import InscriptionProfessionnel from './component/centre/InscriptionProfessionnel';
import Profil from './component/centre/Profil';
import Actualites from './component/actualites/Actualites';
import Connexion from './component/connexion/Connexion';
import ConnexionCentre from './component/connexion/ConnexionCentre';
import Footer from './component/footer/Footer';
import Header from './component/header/Header';
import Home from './component/home/Home';
import Inscription from './component/inscription/Inscription';
import LeftMenu from './component/left/LeftMenu';
import MotDePasse from './component/motDePasse/MotDePasse';
import SuiviMedicals from './component/suivi-medicals/SuiviMedical';
import Vaccin from './component/vaccin/Vaccin';
import history from './history';
import ProfilStaff from './component/staff/ProfilStaff';
import Centre from './component/centre/Centre';
import { withCookies } from 'react-cookie';
import PatientProfil from './component/patient/PatientProfil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import ProfessionnalProfil from './component/profil-professionnel/ProfessionnalProfil';
import ProfessionnelSanteDashboard from './component/professionnel-sante/ProfessionnelSanteDashboard';
import Consultation from './component/consultation/Consultation';
// import UploadFile from './component/dynamics/UploadFile';
// import Loader from './component/alert/Loader';
import Error404 from './component/alert/Error404';
import Apropos from './component/apropos/Apropos';
import InscriptionPro from './component/professionnel-sante/InscriptionPro';
import Pharmacie from './component/pharmacie/Pharmacie';
import ContactUs from './component/contact-us/ContactUs';
import ComingSoon from './component/alert/ComingSoon';
import ReactGA from 'react-ga';
ReactGA.initialize('G-7XR3QBWWJZ');
ReactGA.pageview(window.location.pathname+ window.location.search);
ReactGA.event({
  category: 'User',
  action: 'Page visite'
});

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      nav:false
    }
  }
  contentShow(content,header,footer){
    return(
      <div className="container-fluid" id="root-container">
        <header className="col-md-12">{header}</header>
        <main className="col-md-12">{content}</main>
        {footer!==null?<footer className="col-md-12">{footer}</footer>:''}
          <span onClick={this.scrollToTop} style={{ display:this.state.nav?"block":"none", transition:"all 1s"}} className="back-to-top">
            {/* <i className="lni-chevron-up"></i> */}
            <FontAwesomeIcon icon={faArrowUp}/>
          </span>
      </div>
    );
  } 
  contentShowWithLeft(content,header, leftNav, footer){
    return(
      <div id="root-container">
          {header?<header className="col-md-12">{header}</header>:""}
          <nav className="col-md-2">{leftNav}</nav>
          <main className="col-md-10">{content}</main>
          {footer?<footer className="col-md-12">{footer}</footer>:null}
          <span onClick={this.scrollToTop} style={{ display:this.state.nav?"block":"none", transition:"all 1s"}} className="back-to-top">
            {/* <i className="lni-chevron-up"></i> */}
            <FontAwesomeIcon icon={faArrowUp}/>
          </span>
      </div>
    );
  }  
  contentShowV2(content,header,footer){
    return(
      <div id="root-container">
        {/* <div className="row"> */}
          {header?<header className="col-md-12">{header}</header>:""}
          <main className="col-md-12">{content}</main>
          {footer?<footer className="col-md-12">{footer}</footer>:null}
          <span onClick={this.scrollToTop} style={{ display:this.state.nav?"block":"none", transition:"all 1s"}} className="back-to-top">
            {/* <i className="lni-chevron-up"></i> */}
            <FontAwesomeIcon icon={faArrowUp}/>
          </span>
        {/* </div> */}
      </div>
    );
  }
  componentDidMount(){
    window.addEventListener("scroll", this.handleScroll);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
    ReactGA.initialize('G-7XR3QBWWJZ');
    ReactGA.pageview(window.location.pathname+ window.location.search);
    ReactGA.event({
      category: 'User',
      action: 'Page visite'
    });
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
  scrollToTop() {
      window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
  }
  setProps(){
    const value = window.location.pathname.split('/');
    const dataFind = {
      text: value[2],
      district: "0",
    }
    return dataFind;
  }
  render(){
    return (
        <Router history={history}>
          <Switch>
            <Route exact path="/" render={() => {return  this.contentShow(<Home/>,<Header cookies={this.props.cookies}/>,<Footer/>);}}/>
            <Route exact path="/404" render={() => { return this.contentShow(<Error404/>,<Header cookies={this.props.cookies}/>,<Footer/>); }}/>
            {/* <Route exact path="/tout-savoir-sur-la-campagne-de-vaccination-contre-la-Covid-19-a-Madagascar/actualites" render={() => { return this.contentShow(<Actualites/>,<Header/>,<LeftMenu/>,<Footer/>); }}/> */}
            <Route exact path="/inscription" render={() => {return  this.contentShow(<Inscription/>,<Header cookies={this.props.cookies}/>,<Footer/>);}}/>
            <Route exact path="/inscription-professionnel" render={() => {return  this.contentShow(<InscriptionPro/>,<Header cookies={this.props.cookies}/>,<Footer/>);}}/>
            <Route exact path="/inscription-professionnel-sante" render={() => {return  this.contentShow(<InscriptionProfessionnel/>,<Header cookies={this.props.cookies}/>,<Footer/>);}}/>
            <Route exact path="/connexion-professionnel-sante" render={() => {return  this.contentShow(<ConnexionCentre/>,<Header cookies={this.props.cookies}/>,<Footer/>);}}/>
            <Route exact path="/connexion" render={() => {return  this.contentShow(<Connexion cookies={this.props.cookies}/>,<Header cookies={this.props.cookies}/>,<Footer/>);}}/>
            <Route exact path="/suivi-medical" render={() => { return this.contentShowV2(<SuiviMedicals/>,<Header cookies={this.props.cookies}/>,<Footer/>); }}/>
            <Route exact path="/tout-savoir-sur-la-campagne-de-vaccination-contre-la-Covid-19-a-Madagascar/actualites" render={() => { return this.contentShowV2(<Actualites/>,<Header cookies={this.props.cookies}/>,<Footer/>); }}/>
            <Route exact path="/a-propos/:onglet" render={() => {return  this.contentShow(<Apropos/>,<Header cookies={this.props.cookies}/>,<Footer/>);}}/>
            <Route exact path="/nous-contacter" render={() => {return  this.contentShow(<ContactUs/>,<Header cookies={this.props.cookies}/>,<Footer/>);}}/>
            <Route exact path="/mot-de-passe-oublie" render={() => { return this.contentShowV2(<MotDePasse/>,<Header cookies={this.props.cookies}/>,<Footer/>); }}/>
            <Route path="/mes-vaccins" render={() => {return  this.contentShowWithLeft(<Vaccin/>,<Header cookies={this.props.cookies}/>,<LeftMenu/>,<Footer/>);}}/>
            <Route path="/recherche" render={() => {return  this.contentShow(<div ><Centre dataFind={this.setProps()}/></div>,<Header cookies={this.props.cookies}/>,<Footer/>);}}/>
            {/* <Route path="/profil" render={() => {return  this.contentShow(<UserProfil/>,<Header cookies={this.props.cookies}/>,<Footer/>);}}/> */}
            <Route path="/profil-patient" render={() => {return  this.contentShow(<PatientProfil/>,<Header cookies={this.props.cookies}/>,<Footer/>);}}/>
            {/* <Route path="/profil-centre" render={() => {return  this.contentShowWithLeft(<Profil/>,<Header cookies={this.props.cookies}/>,<LeftMenu type={0}/>,null);}}/> */}
            <Route path="/profil-centre" render={() => {return  this.contentShow(<Profil/>,<Header cookies={this.props.cookies}/>);}}/>
            <Route exact path="/professionnel/:name/:panel/:date" render={() => {return  this.contentShow(<ProfessionnelSanteDashboard/>,<Header cookies={this.props.cookies}/>);}}/>
            {/* <Route path="/profil-staff" render={() => {return  this.contentShowWithLeft(<ProfilStaff/>,<Header cookies={this.props.cookies}/>,<LeftMenu type={1}/>,null);}}/> */}
            <Route path="/profil-staff" render={() => {return  this.contentShow(<ProfilStaff/>,<Header cookies={this.props.cookies}/>);}}/>
            <Route exact path="/:lieu/:specialite/:professionnel" render={() => {return  this.contentShow(<ProfessionnalProfil/>,<Header cookies={this.props.cookies}/>,<Footer/>);}}/>
            <Route exact path="/consultation/patient/:specialite/:userConsultation/:aaa" render={() => {return  this.contentShow(<Consultation/>,<Header cookies={this.props.cookies}/>);}}/>
            <Route exact path="/pharmacie" render={() => {return  this.contentShow(<Pharmacie/>,<Header cookies={this.props.cookies}/>,<Footer/>);}}/>
            <Route exact path="/professionnel-de-sante" render={() => {return  this.contentShow(<ComingSoon/>,<Header cookies={this.props.cookies}/>,<Footer/>);}}/>
            <Route exact path="*" render={() => {return  this.contentShow(<Error404/>,<Header cookies={this.props.cookies}/>,<Footer/>);}} />
          </Switch>
        </Router>
    );
  }
}

export default withCookies(App);
