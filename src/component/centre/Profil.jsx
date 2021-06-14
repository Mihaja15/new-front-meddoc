import React from 'react';
import Calendrier from '../staff/Calendrier';
import { userSession } from '../../services/userSession';
// import Calendrier from './Calendrier';
import Compte from './Compte';
import Dashboard from './Dashboard';
import './Profil.css';
import RessourcesHumaines from './RessourcesHumaines';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxes, faCalendarAlt, faChartPie, faInfo, faThList, faUserEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';

export default class Profil extends React.Component{
    constructor(props){
        super();
        this.state={
            show:"1"
        }
    }
    componentDidMount(){
        
        const view = window.location.pathname.split('/')[2];
        this.setState({show:view})
    }
    render(){
        return(
            <div className="profil-centre-container">
                {/* <div className="row"> */}
                    <div className="profil-centre-left-menu">
                        <ul className="col-md-12">
                            <li onClick={()=> this.setState({show:"1"})} className={this.state.show==="1"?"active-menu col-md-12":"col-md-12"}><FontAwesomeIcon icon={faChartPie}/>&nbsp; Tableau de bord</li>
                            <li onClick={()=> this.setState({show:"2"})} className={this.state.show==="2"?"active-menu col-md-12":"col-md-12"}><FontAwesomeIcon icon={faCalendarAlt}/>&nbsp;&nbsp; Agenda</li>
                            <li onClick={()=> this.setState({show:"3"})} className={this.state.show==="3"?"active-menu col-md-12":"col-md-12"}><FontAwesomeIcon icon={faUserEdit}/>&nbsp; Compte</li>
                            <li onClick={()=> this.setState({show:"4"})} className={this.state.show==="4"?"active-menu col-md-12":"col-md-12"}><FontAwesomeIcon icon={faUserPlus}/>&nbsp; Ressources humaines</li>
                            <li onClick={()=> this.setState({show:"5"})} className={this.state.show==="5"?"active-menu col-md-12":"col-md-12"}><FontAwesomeIcon icon={faBoxes}/>&nbsp;&nbsp; Gestion de stock</li>
                            <li onClick={()=> this.setState({show:"6"})} className={this.state.show==="6"?"active-menu col-md-12":"col-md-12"}><FontAwesomeIcon icon={faThList}/>&nbsp;&nbsp;&nbsp; To do List</li>
                            <li onClick={()=> this.setState({show:"7"})} className={this.state.show==="7"?"active-menu col-md-12":"col-md-12"}><FontAwesomeIcon icon={faInfo}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Besoin d'aide?</li>
                        </ul>
                    </div>
                    {/* <div className="profil-header col-md-12 row"> */}
                        {/* <ul className="profil-header col-md-2">
                            <li onClick={()=>this.setState({show:1})} className={this.state.show===1?"dashboard col-md-12 active-dashboard":"dashboard col-md-12"}><FontAwesomeIcon icon={faChartPie}/>&nbsp; Tableau de bord</li>
                            <li onClick={()=>this.setState({show:2})} className={this.state.show===2?"agenda col-md-12 active-agenda":"agenda col-md-12"}><FontAwesomeIcon icon={faCalendarAlt}/>&nbsp;&nbsp; Agenda</li>
                            <li onClick={()=>this.setState({show:3})} className={this.state.show===3?"setting col-md-12 active-setting":"setting col-md-12"}><FontAwesomeIcon icon={faCogs}/>&nbsp; Paramètres</li>
                        </ul> */}
                    {/* </div> */}
                    <div className="profil-centre-content col-md-9">
                        {/* <div className="container"> */}
                            {/* <div className="row"> */}
                            {
                                this.state.show==="2"?
                                // <div className="col-md-12"><Calendrier/></div>
                                <Calendrier id={userSession.get('token')} type={0}/>
                                :this.state.show==="3"?
                                <Compte/>
                                :this.state.show==="4"?
                                <RessourcesHumaines/>
                                :<Dashboard/>
                            }
                            {/* </div> */}
                        {/* </div> */}
                    </div>
                </div>
            // </div>
        );
    }
}