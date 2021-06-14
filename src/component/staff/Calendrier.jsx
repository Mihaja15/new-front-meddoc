import React from 'react';
import './Calendrier.css';
import { utile } from '../../services/utile';
import {fetchPostHeader} from '../../services/global.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';
import Pagination from "react-js-pagination";

const dateNow = new Date();

export default class Calendrier extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            idEntite:null,
            typeEntite:null,
            statut:null,
            dateSelected: new Date(),
            jourSelected: dateNow.getDate(),
            moisSelected: dateNow.getMonth(),
            anneeSelected: dateNow.getFullYear(),
            typeVue: 'month',
            calendrier: null,
            listRdv:{
                content:[],
                number:0,
                size:0
            },
            listUserName:[],
            page:1,
            size:10,
            nbPage:1,
            totalElement:0,
            ordre:'desc',
            colonne:'dateHeureRdv',
        }
    }
    getScroll(numberStart, numberStop){
        var list = [];
        for(let i = numberStart; i <= numberStop; i++){
            list.push(i);
        }
        return list;
    }
    changeDate=(params, e)=>{
        console.log(params)
        var date = this.state.dateSelected;
        if(params==="jourSelected"){
            date.setDate(e.target.value);
            this.setState({ [params]: e.target.value, dateSelected: date},function(){
                this.getAgenda();
                this.getRdv();
            });
        }
        if(params==="moisSelected"){
            date.setMonth(e.target.value);
            this.setState({ [params]: e.target.value, dateSelected: date},function(){
                this.getAgenda();
                this.getRdv();
            });
        }
        if(params==="anneeSelected"){
            date.setFullYear(e.target.value);
            this.setState({ [params]: e.target.value, dateSelected: date},function(){
                this.getAgenda();
                this.getRdv();
            });
        }
        if(params==="statut"){
            if(e.target.value===''){
                this.setState({ [params]: null},function(){
                    // this.getAgenda();
                    this.getRdv();
                });    
            }else
                this.setState({ [params]: e.target.value},function(){
                    // this.getAgenda();
                    this.getRdv();
                });
        }
    }
    inList=(value)=>{
        return this.state.listUserName.find(element => element.indice === value).value;
    }
    handlePageChange=(pageNumber)=> {
        const data= {
            id : this.state.idEntite,
            colonne : this.state.colonne,
            page : (pageNumber-1),
            type : this.state.typeEntite,
            statut : this.state.statut,
            jour : this.state.jourSelected,
            mois : this.state.moisSelected,
            annee : this.state.anneeSelected,
            size : this.state.size
        }
        fetchPostHeader('/covid/rdv-centre',data).then(data=>{
            var userName = [];
            console.log('dataTmp dataTmp :',data);
            for(let i=0; i <data.content.length; i++){
                if(!userName.find(element => element.value === data.content[i].patient.nom+" "+data.content[i].patient.prenoms)){
                    userName.push({
                        value:data.content[i].patient.nom+" "+data.content[i].patient.prenoms,
                        indice: data.content[i].patient.idUser
                    })
                }
            }
            console.log(userName)
            // this.setState({ list: data.content ,page : data.number, listUserName: userName});
            this.setState({ listRdv: data ,page : (data.number+1),nbPage : data.totalPages, totalElement: data.totalElements, listUserName: userName});
        });
        
    }
    getRdv(){
        const data = {
            id : this.state.idEntite,
            type : this.state.typeEntite,
            statut : this.state.statut,
            jour : this.state.jourSelected,
            mois : this.state.moisSelected,
            annee : this.state.anneeSelected,
            page: (this.state.page-1),
            size: this.state.size
        }
        fetchPostHeader('/covid/rdv-centre',data).then(dataTmp=>{
            console.log(dataTmp)
            var userName = [];
            if(dataTmp.content){
                for(let i=0; i <dataTmp.content.length; i++){
                    if(!userName.find(element => element.value === dataTmp.content[i].patient.nom+" "+dataTmp.content[i].patient.prenoms)){
                        userName.push({
                            value:dataTmp.content[i].patient.nom+" "+dataTmp.content[i].patient.prenoms,
                            indice: dataTmp.content[i].patient.idUser
                        })
                    }
                }
                console.log('dataTmp dataTmp :',userName);
                this.setState({listRdv : dataTmp, listUserName: userName,page : (dataTmp.number+1), nbPage : dataTmp.totalPages, totalElement: dataTmp.totalElements});
            }
        });
    }
    getAgenda(){
        const data = {
            id : this.state.idEntite,
            type : this.state.typeEntite,
            jour : this.state.jourSelected,
            mois : this.state.moisSelected,
            annee : this.state.anneeSelected
        }
        fetchPostHeader('/covid/agenda-centre',data).then(dataTmp=>{
            console.log(dataTmp)
            this.setState({calendrier : dataTmp});
        });
    }
    componentDidMount(){
        console.log(this.props.id+"  "+this.props.type);
        if(this.props.id!==null&&this.props.id!==undefined&&this.props.type!==null&&this.props.type!==undefined){
            this.setState({idEntite:this.props.id,typeEntite:this.props.type},function(){
                this.getAgenda();
                this.getRdv();
            });
        }
        // if(this.props.type!==null&&this.props.type!==undefined&&this.props.type!=="")
        //     this.setState({typeEntite:this.props.type});
    }
    isToday(date){
        if(utile.isEqualJourDate(dateNow,new Date(date)))
            return " case-now";
        return "";
    }
    isSelected(date){
        if(utile.isEqualJourDate(this.state.dateSelected,new Date(date)))
            return " case-selected";
        return "";
    }
    dateToHour(date){
        const dateRes = new Date(date);
        return utile.autocompleteZero(dateRes.getHours(),2)+":"+utile.autocompleteZero(dateRes.getMinutes(),2)+":00";
    }
    selectDate=(date)=>{
        const dateUp = new Date(date);
        this.setState({dateSelected: dateUp, jourSelected: dateUp.getDate(), moisSelected: dateUp.getMonth(), anneeSelected: dateUp.getFullYear()}, function(){
            this.getRdv();
        });
    }
    getStatus(status){
        if(status===101)
            return <FontAwesomeIcon incon={faCheckCircle}/>
        else if(status===100)
            return <td><FontAwesomeIcon style={{color:'#1b7895'}} incon={faExclamationCircle}/></td>
        else
            return <FontAwesomeIcon incon={faExclamationCircle}/>
    }
    render(){
        return(
            <div className="calendrier-container">
                {/* <div className="container"> */}
                    <div className="row">
                        <div className="header-agenda col-md-12 row">
                            <label className="col-md-2">Date : </label>
                            <select name="jourSelected" id="day" value={this.state.jourSelected} onChange={this.changeDate.bind(this,'jourSelected')} className="select-date col-md-1">
                                {
                                    this.getScroll(1,utile.getEndMonth(this.state.moisSelected, this.state.anneeSelected)).map((day, i)=>{
                                        return <option key={i} value={day}>{utile.autocompleteZero(day,2)}</option>
                                    })
                                }
                            </select>
                            <select name="moisSelected" id="month" value={this.state.moisSelected} onChange={this.changeDate.bind(this,"moisSelected")} className="select-date col-md-2">
                                {
                                    this.getScroll(0,11).map((month, i)=>{
                                        return <option key={i} value={month}>{utile.getNamesMois(month)}</option>
                                    })
                                }
                            </select>
                            <select name="anneeSelected" id="year" value={this.state.anneeSelected} onChange={this.changeDate.bind(this,"anneeSelected")} className="select-date col-md-2">
                                {
                                    this.getScroll(2020,(dateNow.getFullYear()+20)).map((year, i)=>{
                                        return <option key={i} value={year}>{year}</option>
                                    })
                                }
                            </select>
                            <label className="col-md-3">Liste des rendez-vous : </label>
                            <select name="typeVue" id="typeVue" onChange={this.changeDate.bind(this,"statut")} className="col-md-2">
                                <option value={''}>Tous</option>
                                <option value={100}>Non pris</option>
                                <option value={101}>Déjà pris</option>
                            </select>
                        </div>
                        {/* <div className="centre-content-agenda- col-md-12 row"> */}
                            <div className="centre-content-agenda col-md-12 row">
                                <div className="centre-agenda-left">
                                    <h5 className="col-md-12">Calendrier</h5>
                                    <table className="tableau-calendrier col-md-12">
                                        <thead>
                                            <tr>
                                                <th>dimanche</th>
                                                <th>lundi</th>
                                                <th>mardi</th>
                                                <th>mercredi</th>
                                                <th>jeudi</th>
                                                <th>vendredi</th>
                                                <th>samedi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.calendrier!==null?
                                                this.state.calendrier.map((week,i)=>{
                                                    return(
                                                    <tr key={i}>
                                                        {
                                                            week.map((day, j)=>{
                                                                return (
                                                                <td key={j}>
                                                                    {
                                                                        day!==null?
                                                                        <div onClick={()=>this.selectDate(day.dateString)} className={"calendar-case"+this.isToday(day.dateString)+this.isSelected(day.dateString)}>
                                                                            {day.hasRdv?<div className="case-active">{day.nbRdv}</div>:""}
                                                                            <h4>{day.day}</h4>
                                                                        </div>
                                                                        :"" 
                                                                    }  
                                                                </td>)
                                                            })
                                                        }
                                                    </tr>)
                                                }):<tr></tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="centre-agenda-right">
                                    <h5 className="col-md-12">Liste des rendez-vous du {utile.getDateComplet(this.state.dateSelected)}</h5>
                                    <table className="tableau-rdv col-md-12">
                                        <thead>
                                            <tr>
                                                <th>Heure</th>
                                                <th>Accueil</th>
                                                <th>Patient</th>
                                                <th>Motif</th>
                                                <th>Etat</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.listRdv.content!==undefined?this.state.listRdv.content.map((rdv, i)=>{
                                                return(
                                                    rdv.statut!==null?rdv.statut.idStatut===101 
                                                    ?<tr key={i}>
                                                        <td>{this.dateToHour(rdv.dateHeureRdv)}</td>
                                                        <td>{rdv.centre.nomCentre}</td>
                                                        <td>{this.inList(rdv.patient.idUser!==undefined?rdv.patient.idUser:rdv.patient)}</td>
                                                        <td>{rdv.motif}</td>
                                                        <td data-tip data-for={"line-rdv"+i}>
                                                            <FontAwesomeIcon style={{color:'#82a64e'}} icon={faCheckCircle}/>
                                                            <ReactTooltip id={"line-rdv"+i} place="top" effect="solid">Rendez-vous déjà pris</ReactTooltip>
                                                        </td>
                                                    </tr>
                                                    :<tr key={i} onClick={()=>{this.props.setPatient(rdv.patient.idUser!==undefined?rdv.patient.idUser:rdv.patient,"vaccination",rdv.dateHeureRdv);}}>
                                                        <td>{this.dateToHour(rdv.dateHeureRdv)}</td>
                                                        <td>{rdv.centre.nomCentre}</td>
                                                        <td>{this.inList(rdv.patient.idUser!==undefined?rdv.patient.idUser:rdv.patient)}</td>
                                                        <td>{rdv.motif}</td>
                                                        <td data-tip data-for={"line-rdv"+i}>
                                                            <FontAwesomeIcon style={{color:'#ffca3a'}} icon={faExclamationCircle}/>
                                                            <ReactTooltip id={"line-rdv"+i} place="top" effect="solid">Rendez-vous non pris</ReactTooltip>
                                                        </td>
                                                    </tr>
                                                    :<tr key={i}>
                                                        <td>{this.dateToHour(rdv.dateHeureRdv)}</td>
                                                        <td>{rdv.centre.nomCentre}</td>
                                                        <td>{this.inList(rdv.patient.idUser!==undefined?rdv.patient.idUser:rdv.patient)}</td>
                                                        <td>{rdv.motif}</td>
                                                        <td data-tip data-for={"line-rdv"+i}>
                                                            <FontAwesomeIcon style={{color:'#ffca3a'}} icon={faExclamationCircle}/>
                                                            <ReactTooltip id={"line-rdv"+i} place="top" effect="solid">Rendez-vous non pris</ReactTooltip>
                                                        </td>
                                                    </tr>
                                                )
                                            }):<tr></tr>}
                                        </tbody>
                                    </table>
                                    {/* <div className="col-md-12"> */}
                                        <div className="footer-rdv-staff col-md-12">
                                            <div className='divPagination'>
                                                <Pagination
                                                    activeClass='pagClassActive'
                                                    itemClassNext='pagClassNext'
                                                    itemClassPrev='pagClassPrev'
                                                    itemClassFirst='pagClassFirst'
                                                    itemClassLast='pagClassLast'
                                                    itemClass='pagClassItemTmp'
                                                    prevPageText='< Précédant'
                                                    nextPageText='> Suivant'
                                                    activePage={(this.state.page)}
                                                    itemsCountPerPage={this.state.size}
                                                    totalItemsCount={this.state.totalElement}
                                                    pageRangeDisplayed={10}
                                                    onChange={(pageNumber)=>this.handlePageChange(pageNumber)}
                                                />
                                            </div>
                                        </div>
                                    {/* </div> */}
                                </div>
                            </div>
                        {/* </div> */}
                    </div>
                {/* </div> */}
            </div>
        );
    }
}