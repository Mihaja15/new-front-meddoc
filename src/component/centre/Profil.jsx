import React from 'react';
import Calendrier from './Calendrier';
import Compte from './Compte';
import Dashboard from './Dashboard';
import './Profil.css';
import RessourcesHumaines from './RessourcesHumaines';

export default class Profil extends React.Component{
    constructor(props){
        super();
        this.state={
            show:1
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
                    {/* <div className="profil-header col-md-12 row"> */}
                        {/* <ul className="profil-header col-md-2">
                            <li onClick={()=>this.setState({show:1})} className={this.state.show===1?"dashboard col-md-12 active-dashboard":"dashboard col-md-12"}><FontAwesomeIcon icon={faChartPie}/>&nbsp; Tableau de bord</li>
                            <li onClick={()=>this.setState({show:2})} className={this.state.show===2?"agenda col-md-12 active-agenda":"agenda col-md-12"}><FontAwesomeIcon icon={faCalendarAlt}/>&nbsp;&nbsp; Agenda</li>
                            <li onClick={()=>this.setState({show:3})} className={this.state.show===3?"setting col-md-12 active-setting":"setting col-md-12"}><FontAwesomeIcon icon={faCogs}/>&nbsp; Paramètres</li>
                        </ul> */}
                    {/* </div> */}
                    <div className="profil-content">
                        <div className="container">
                            <div className="row">
                            {
                                this.state.show==="2"?
                                <div className="col-md-12"><Calendrier/></div>
                                :this.state.show==="3"?
                                <div className="col-md-12"><Compte/></div>
                                :this.state.show==="4"?
                                <div className="col-md-12"><RessourcesHumaines/></div>
                                :<div className="col-md-12"><Dashboard/></div>
                            }
                            </div>
                        </div>
                    </div>
                {/* </div> */}
            </div>
        );
    }
}