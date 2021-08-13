import { faCheckCircle, faExclamationCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';
import React from 'react';
import { fetchGetHandler } from '../../services/global.service';
import { utile } from '../../services/utile';
import './MesPatients.css';

export default class MesPatients extends React.Component{
    constructor(props){
        super(props);
        this.state={
            rdv:[],
            patients:[]
        }
    }
    componentDidMount(){
        // fetchGetHandler('/professionnel/get-rdv/null/null/null/null/0/100').then(data=>{
        fetchGetHandler('/professionnel/get-rdv').then(data=>{
			if(data!=null){
				this.setState({ rdv: data.content });
                console.log(data)
			}
        });
        fetchGetHandler('/professionnel/get-list-patient?limit=10').then(data=>{
			if(data!=null){
				this.setState({ patients: data });
                console.log(data)
			}
        });
    }
    render(){
        return(
            <div className="mes-patients-container row">
                <h3>Liste des patients</h3>
                <table className="col-md-12 row">
                    {/* <thead><tr><th>Liste des patients</th></tr></thead> */}
                    <tbody className="col-md-12 row">
                        {this.state.rdv.map((rdv,i)=>{
                            return(
                                <tr key={i} className="col-md-12 row">
                                    <td className="col-md-8 row">
                                        <div className="col-md-12 row">
                                            <div className="col-md-2">
                                                <span className="patient-initial">{utile.getFullInitial(rdv.personnePatient.nom+(rdv.personnePatient.prenoms!==null?" "+rdv.personnePatient.prenoms:""))}</span>
                                            </div>
                                            <div className="col-md-10 row">
                                                <span className="col-md-12 patient-name">
                                                    {rdv.personnePatient.nom+(rdv.personnePatient.prenoms!==null?" "+rdv.personnePatient.prenoms:"")}
                                                </span>
                                                <span className="col-md-12">
                                                    {utile.getDateHourComplet(rdv.dateHeureRdv)}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="col-md-3">{rdv.motif}</td>
                                    <td className="col-md-1" data-tip data-for={"line-rdv"+i}>
                                        <FontAwesomeIcon style={{color:rdv.statut.idStatut===102?'crimson':rdv.statut.idStatut===101?'olivedrab':'orange'}} icon={rdv.statut.idStatut===102?faExclamationTriangle:rdv.statut.idStatut===101?faCheckCircle:faExclamationCircle}/>
                                        <ReactTooltip id={"line-rdv"+i} place="top" effect="float">{rdv.statut.idStatut===102?'Rendez-vous annulé':rdv.statut.idStatut===101?'Rendez-vous déjà pris':'Rendez-vous à venir'}</ReactTooltip>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}