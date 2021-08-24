import React from 'react';
import Calendrier from './Calendrier';
import { fetchGetHandler } from '../../services/global.service';
import './ProfilStaff.css';
import SuiviMedical from '../suivi-medicals/SuiviMedical';
import { utile } from '../../services/utile';

export default class ProfilStaff extends React.Component{
    constructor(props){
        super();
        this.state={
            show:1,
            centreUser: null,
            idUser:null
        }
    }
    componentDidMount(){
        fetchGetHandler('/professionnel/data').then(data=>{
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
            return <Calendrier setPatient={this.setIdUser} id={valeur.idCentreRel} type={0}/>
        }
    }
    // showComponentVaccination(patient,centre){
    //     if(patient!==null && patient!==undefined&&centre!==null&&centre!==undefined){
    //         return <SuiviMedical idUser={patient} idVaccinateur={centre.idUserRel}/>
    //     }
    // }
    setIdUser=(id,link,date)=>{
        const dateRes = new Date(date);
        const now = new Date();
        if(utile.isEqualJourDate(now,dateRes)){
            this.setState({show:link},function(){
                this.setState({idUser:id});
            });
        }else{
            if(dateRes.getTime()>now.getTime())
                alert('Rendez-vous à venir! Veuillez sélectionner que les rendez-vous aujourd\'hui');
            else
                alert('Rendez-vous déjà passé! Veuillez sélectionner que les rendez-vous aujourd\'hui');
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
                                :this.state.show==="vaccination"?(this.state.idUser!==null&&this.state.idUser!==undefined&&this.state.centreUser.idUserRel!==null&&this.state.centreUser.idUserRel!==undefined)?<div className="vaccination-content col-md-12 row"><a href="/profil-staff/1" className="col-md-12">Liste des rendez-vous</a><div className="col-md-12"><SuiviMedical idUser={this.state.idUser} idVaccinateur={this.state.centreUser.idUserRel}/></div></div>:""
                                :<div className="col-md-12"></div>
                            }
                            </div>
                        </div>
                    </div>
                {/* </div> */}
            </div>
        );
    }
}