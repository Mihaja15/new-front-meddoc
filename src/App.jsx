import React from 'react';
import {
  Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import Actualites from './component/actualites/Actualites';
import Connexion from './component/connexion/Connexion';
import Footer from './component/footer/Footer';
import Header from './component/header/Header';
import Home from './component/home/Home';
import Inscription from './component/inscription/Inscription';
import LeftMenu from './component/left/LeftMenu';
import UserProfil from './component/profils/UserProfil';
import RightMenu from './component/right/RightMenu';
import SuiviMedicals from './component/suivi-medicals/SuiviMedical';
import history from './history';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={

    }
  }
  contentShow(content,header, leftNav, rightNav ,footer){
    return(
      <div>
        {header?<header>{header}</header>:null}
        {leftNav?<nav>{leftNav}</nav>:null}
        {rightNav?<nav>{rightNav}</nav>:null}
        <main>{content}</main>
        {footer?<footer>{footer}</footer>:null}
      </div>
    );
  }
  render(){
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" render={() => {return  this.contentShow(<Home/>,<Header/>,<LeftMenu/>,<RightMenu/>,<Footer/>);}}/>
          <Route exact path="/inscription" render={() => {return  this.contentShow(<Inscription/>,<Header/>,<LeftMenu/>,<RightMenu/>,<Footer/>);}}/>
          <Route exact path="/connexion" render={() => {return  this.contentShow(<Connexion/>,<Header/>,<LeftMenu/>,<RightMenu/>,<Footer/>);}}/>
          <Route exact path="/suivi-medical" render={() => { return this.contentShow(<SuiviMedicals/>,<Header/>,<LeftMenu/>,<RightMenu/>,<Footer/>); }}/>
          <Route exact path="/tout-savoir-sur-la-campagne-de-vaccination-contre-la-Covid-19-a-Madagascar/actualites" render={() => { return this.contentShow(<Actualites/>,<Header/>,<LeftMenu/>,<RightMenu/>,<Footer/>); }}/>
          <Route path="/profil" render={() => {return  this.contentShow(<UserProfil/>,<Header/>,<LeftMenu/>,<RightMenu/>,<Footer/>);}}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
