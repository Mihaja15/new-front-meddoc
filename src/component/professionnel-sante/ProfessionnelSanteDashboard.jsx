import React from 'react';
// import Calendrier from './Calendrier';
import '../centre/Profil.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxes, faCalendarAlt, faCertificate, faChartPie, faCommentMedical, faFileSignature, faInfo, faThList, faUserEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Calendrier from '../staff/Calendrier';
import Compte from '../centre/Compte';
import RessourcesHumaines from '../centre/RessourcesHumaines';
import Dashboard from '../centre/Dashboard';
import { userSession } from '../../services/userSession';
import Causette from '../chat/Causette';
import PdfForm from '../pdf/PdfForm';
import ToDoList from './ToDoList';

export default class ProfessionnelSanteDashboard extends React.Component{
    constructor(props){
        super();
        this.state={
            show:"1",
            showToDoList:true
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
                            <li onClick={()=> this.setState({show:"8"})} className={this.state.show==="8"?"active-menu col-md-12":"col-md-12"}><FontAwesomeIcon icon={faCommentMedical}/>&nbsp; Causette</li>
                            <li onClick={()=> this.setState({show:"9"})} className={this.state.show==="9"?"active-menu col-md-12":"col-md-12"}><FontAwesomeIcon icon={faFileSignature}/>&nbsp; E-trames</li>
                            {/* <li onClick={()=> this.setState({show:"4"})} className={this.state.show==="4"?"active-menu col-md-12":"col-md-12"}><FontAwesomeIcon icon={faUserPlus}/>&nbsp; Ressources humaines</li>
                            <li onClick={()=> this.setState({show:"5"})} className={this.state.show==="5"?"active-menu col-md-12":"col-md-12"}><FontAwesomeIcon icon={faBoxes}/>&nbsp;&nbsp; Gestion de stock</li> */}
                            <li onClick={()=> this.setState({showToDoList:!this.state.showToDoList})} className={this.state.show==="6"?"active-menu col-md-12":"col-md-12"}><FontAwesomeIcon icon={faThList}/>&nbsp;&nbsp;&nbsp; To do List</li>
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
                                <Calendrier id={userSession.get('token')} type={1}/>
                                :this.state.show==="3"?
                                <Compte/>
                                :this.state.show==="8"?
                                <Causette/>
                                :this.state.show==="9"?
                                <PdfForm/>
                                :this.state.show==="4"?
                                <RessourcesHumaines/>
                                :<Dashboard/>
                            }
                            {/* </div> */}
                        {/* </div> */}
                    </div>
                    <div className="profil-centre-fixed col-md-9">
                        <ToDoList show={this.state.showToDoList}/>
                    </div>
                </div>
            // </div>
        );
    }
}