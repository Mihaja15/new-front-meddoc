import React from 'react';
import Calendrier from './Calendrier';
import { fetchGet } from '../../services/global.service';
import './ProfilStaff.css';

export default class ProfilStaff extends React.Component{
    constructor(props){
        super();
        this.state={
            show:1,
            centreUser: null
        }
    }
    componentDidMount(){
        fetchGet('/covid/personalCentre/'+localStorage.getItem('idStaff')).then(data=>{
            if(data!=null){
                this.setState({ centreUser: data});
                console.log(data)
            }else{
                
            }
        });
        const view = window.location.pathname.split('/')[2];
        this.setState({show:view})
    }
    showComponentAgenda(valeur){
        if(valeur!==null && valeur!==undefined){
            return <Calendrier id={valeur.idCentreRel} type={0}/>
        }
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
                                this.state.show==="1"?
                                <div className="col-md-12">{this.showComponentAgenda(this.state.centreUser)}</div>
                                :
                                <div className="col-md-12"></div>
                            }
                            </div>
                        </div>
                    </div>
                {/* </div> */}
            </div>
        );
    }
}