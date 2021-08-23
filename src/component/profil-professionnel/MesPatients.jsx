import { faCalendarDay, faCheckCircle, faExclamationCircle, faExclamationTriangle, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';
import React from 'react';
import { fetchGetHandler } from '../../services/global.service';
import { utile } from '../../services/utile';
import './MesPatients.css';

import Pagination from "react-js-pagination";

export default class MesPatients extends React.Component{
    constructor(props){
        super(props);
        this.state={
            rdv:[],
            patients:[],
            clicked:0,
            page:1,
            size:5,
            totalElement:0
        }
    }
    componentDidMount(){
        // fetchGetHandler('/professionnel/get-rdv/null/null/null/null/0/100').then(data=>{
        // fetchGetHandler('/professionnel/get-rdv').then(data=>{
		// 	if(data!=null){
		// 		this.setState({ rdv: data.content });
        //         console.log(data)
		// 	}
        // });
        var dateNow = new Date();
        var params = '?';
        if(this.state.clicked===0){
            params += '&jour='+dateNow.getDate();
            params += '&mois='+dateNow.getMonth();
            params += '&annee='+dateNow.getFullYear();
            params += '&page='+(this.state.page-1);
            params += '&max='+this.state.size;
        }
        fetchGetHandler('/professionnel/get-rdv'+params).then(data=>{
            if(data!=null){
                this.setState({ rdv: data.content, page: (data.number+1), size:5, totalElement: data.totalElements });
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
    changeTab=(value)=>{
        this.setState({clicked:value,page:1,size:5},function(){
            var dateNow = new Date();
            var params = '?';
            if(this.state.clicked===0){
                params += '&jour='+dateNow.getDate();
                params += '&mois='+dateNow.getMonth();
                params += '&annee='+dateNow.getFullYear();
                params += '&page='+(this.state.page-1);
                params += '&max='+this.state.size;
            }else if(this.state.clicked===1){
                dateNow.setDate((dateNow.getDate()+1));
                params += '&jour='+dateNow.getDate();
                params += '&mois='+dateNow.getMonth();
                params += '&annee='+dateNow.getFullYear();
                params += '&page='+(this.state.page-1);
                params += '&max='+this.state.size;
            }else if(this.state.clicked===2){
                params += '&mois='+dateNow.getMonth();
                params += '&annee='+dateNow.getFullYear();
                params += '&page='+(this.state.page-1);
                params += '&max='+this.state.size;
            }else if(this.state.clicked===3){
                params += '&annee='+dateNow.getFullYear();
                params += '&page='+(this.state.page-1);
                params += '&max='+this.state.size;
            }else if(this.state.clicked===4){
                params += 'statut=101';
                params += '&page='+(this.state.page-1);
                params += '&max='+this.state.size;
            }
            fetchGetHandler('/professionnel/get-rdv'+params).then(data=>{
                if(data!=null){
                    this.setState({ rdv: data.content, page: (data.number+1), size:5, totalElement: data.totalElements });
                    console.log(data)
                }
            });
        });
    }
    handlePageChange=(pageNumber)=> {
        this.setState({page:pageNumber,size:5},function(){
            var dateNow = new Date();
            var params = '?';
            if(this.state.clicked===0){
                params += '&jour='+dateNow.getDate();
                params += '&mois='+dateNow.getMonth();
                params += '&annee='+dateNow.getFullYear();
                params += '&page='+(this.state.page-1);
                params += '&max='+this.state.size;
            }else if(this.state.clicked===1){
                dateNow.setDate((dateNow.getDate()+1));
                params += '&jour='+dateNow.getDate();
                params += '&mois='+dateNow.getMonth();
                params += '&annee='+dateNow.getFullYear();
                params += '&page='+(this.state.page-1);
                params += '&max='+this.state.size;
            }else if(this.state.clicked===2){
                params += '&mois='+dateNow.getMonth();
                params += '&annee='+dateNow.getFullYear();
                params += '&page='+(this.state.page-1);
                params += '&max='+this.state.size;
            }else if(this.state.clicked===3){
                params += '&annee='+dateNow.getFullYear();
                params += '&page='+(this.state.page-1);
                params += '&max='+this.state.size;
            }else if(this.state.clicked===4){
                params += 'statut=101';
                params += '&page='+(this.state.page-1);
                params += '&max='+this.state.size;
            }
            fetchGetHandler('/professionnel/get-rdv'+params).then(data=>{
                if(data!=null){
                    this.setState({ rdv: data.content, page: (data.number+1), size:5, totalElement: data.totalElements });
                    console.log(data)
                }
            });
        });
    }
    render(){
        return(
            <div className="mes-patients-container row">
                <h3 className="col-md-12">Liste des patients</h3>
                <div className="col-md-12 row mes-patients-list-container">
                    <div className="col-md-12 header-list-content">
                        <ul className="header-tab">
                            <li onClick={()=>this.changeTab(0)} className={this.state.clicked===0?'actif':''}>Aujourd'hui</li>
                            <li onClick={()=>this.changeTab(1)} className={this.state.clicked===1?'actif':''}>Demain</li>
                            <li onClick={()=>this.changeTab(2)} className={this.state.clicked===2?'actif':''}>Ce mois</li>
                            <li onClick={()=>this.changeTab(3)} className={this.state.clicked===3?'actif':''}>Par mois</li>
                            <li onClick={()=>this.changeTab(4)} className={this.state.clicked===4?'actif':''}>Déjà pris</li>
                        </ul>
                    </div>
                    <div className="col-md-12 body-list-content">
                        <table className="col-md-12 row">
                            <thead className="col-md-12 row">
                                <tr className="col-md-12 row">
                                    <th className="col-md-7">Patient</th>
                                    <th className="col-md-3">Motif</th>
                                    <th className="col-md-1">Etat</th>
                                    <th className="col-md-1">Action</th>
                                </tr>
                            </thead>
                            <tbody className="col-md-12 row">
                                {this.state.rdv.map((rdv,i)=>{
                                    return(
                                        <tr key={i} className="col-md-12 row">
                                            <td className="col-md-7 row">
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
                                            <td className="col-md-1">
                                                <a data-tip data-for={"btn-consult"+i} href={'/consultation/patient/'+utile.valueToLink(rdv.specialite.libelle)+'/'+utile.valueToLink(rdv.personnePatient.user.pseudo)+'/'+utile.crypteId(''+rdv.idRdv)} className="abtn btn-consult"><FontAwesomeIcon icon={faStethoscope}/> </a>
                                                <ReactTooltip id={"btn-consult"+i} place="top" effect="float">Consulter ce patient</ReactTooltip>
                                                <a data-tip data-for={"btn-change-rdv"+i} href={'/consultation/patient/'+utile.valueToLink(rdv.specialite.libelle)+'/'+utile.valueToLink(rdv.personnePatient.user.pseudo)+'/'+utile.crypteId(''+rdv.idRdv)} className="abtn btn-change-rdv"><FontAwesomeIcon icon={faCalendarDay}/> </a>
                                                <ReactTooltip id={"btn-change-rdv"+i} place="top" effect="float">Reporter le rendez-vous</ReactTooltip>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            <tfoot className="col-md-12 row">
                                <tr className="col-md-12 row">
                                    <td className="col-md-12">
                                    <Pagination
                                        activeClass='patientPageClassActive'
                                        itemClassNext='patientPageClassNext'
                                        itemClassPrev='patientPageClassPrev'
                                        itemClassFirst='patientPageClassFirst'
                                        itemClassLast='patientPageClassLast'
                                        itemClass='patientPageClassItemTmp'
                                        prevPageText='< Précédent'
                                        nextPageText='> Suivant'
                                        activePage={this.state.page}
                                        itemsCountPerPage={this.state.size}
                                        totalItemsCount={this.state.totalElement}
                                        pageRangeDisplayed={10}
                                        onChange={(pageNumber)=>this.handlePageChange(pageNumber)}
                                    />
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}