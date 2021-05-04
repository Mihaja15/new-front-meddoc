import React from 'react';
import {
  Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import InscriptionCentre from './component/centre/InscriptionCentre';
import Profil from './component/centre/Profil';
import Connexion from './component/connexion/Connexion';
import ConnexionCentre from './component/connexion/ConnexionCentre';
import Footer from './component/footer/Footer';
import Header from './component/header/Header';
import Home from './component/home/Home';
import Inscription from './component/inscription/Inscription';
import LeftMenu from './component/left/LeftMenu';
import UserProfil from './component/profils/UserProfil';
import RightMenu from './component/right/RightMenu';
import history from './history';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={

    }
  }
  contentShow(content,header, leftNav, rightNav ,footer){
    return(
      <div className="root-container">
        <div className="row">
          {header?<header className="col-md-12">{header}</header>:""}
          <nav className="col-md-2" style={{display:leftNav!==null?"block":"none"}}>{leftNav}</nav>
          {/* <nav className="col-md-2" style={{display:leftNav!==null?"block":"none"}}>{leftNav}</nav> */}
          <main className={leftNav!==null?"col-md-10":"col-md-12"}>{content}</main>
          {/* <main className={leftNav!==null?"col-md-10":"col-md-12"}>{content}</main> */}
          {footer?<footer className="col-md-12">{footer}</footer>:null}
        </div>
        
        
        {/* {rightNav?<nav className="col-md-2">{rightNav}</nav>:null} */}
        
        
      </div>
    );
  }
  render(){
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route exact path="/" render={() => {return  this.contentShow(<Home/>,<Header/>,null,null,<Footer/>);}}/>
            <Route exact path="/inscription" render={() => {return  this.contentShow(<Inscription/>,<Header/>,null,<RightMenu/>,<Footer/>);}}/>
            <Route exact path="/inscription-centre" render={() => {return  this.contentShow(<InscriptionCentre/>,<Header/>,null,<RightMenu/>,<Footer/>);}}/>
            <Route exact path="/connexion-centre" render={() => {return  this.contentShow(<ConnexionCentre/>,<Header/>,null,<RightMenu/>,<Footer/>);}}/>
            <Route exact path="/connexion" render={() => {return  this.contentShow(<Connexion/>,<Header/>,null,<RightMenu/>,<Footer/>);}}/>
            <Route path="/profil" render={() => {return  this.contentShow(<UserProfil/>,<Header/>,null,<RightMenu/>,<Footer/>);}}/>
            <Route path="/profil-centre" render={() => {return  this.contentShow(<Profil/>,<Header/>,<LeftMenu/>,<RightMenu/>,null);}}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
