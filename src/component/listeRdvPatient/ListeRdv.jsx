import React, {Component} from 'react';
import './ListeRdvPatient.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Modal,Button} from 'react-bootstrap';
import {fetchPost} from '../../services/global.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { utile } from '../../services/utile';
import {  faCheckCircle, faChevronLeft, faChevronRight, faClock, faExclamationCircle, faTrash} from '@fortawesome/free-solid-svg-icons';
import { authUser } from '../../services/authUser';
import Pagination from "react-js-pagination";

let ordres = false;

class ListeRdv extends Component{
    constructor(props){
        super();
        this.state={
            page:1,
            size:10,
            nbPage:1,
            totalElement:0,
            ordre:'desc',
            colonne:'dateHeureRdv',
            statut:null,
            list:[],
            idEntite:null,
            type:null,
            listUserName:[]
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
            size : this.state.size,
            statut : this.state.statut,
            ordre : this.state.ordre
        }
        fetchPost('/covid/rdv-patient',data).then(data=>{
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
            this.setState({ list: data.content ,page : (data.number+1),nbPage : data.totalPages, totalElement: data.totalElements, listUserName: userName});
        });
        
    }
    componentDidMount() {

        if(this.props.id!== null){
            this.setState({idEntite:this.props.id},function(){
                const data= {
                    id : this.state.idEntite,
                    colonne : this.state.colonne,
                    page : (this.state.page-1),
                    size : this.state.size,
                    statut : this.state.statut,
                    ordre : this.state.ordre
                }
                fetchPost('/covid/rdv-patient',data).then(data=>{
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
                    this.setState({ list: data.content ,page : (data.number+1), nbPage : data.totalPages, totalElement: data.totalElements, listUserName: userName});
                });
            });
        }
    }
    render(){
        return (
            <div className="tousRendezVous">
                <div className="divTableaListeRendezVous">
                    <div className="full-rdv-container col-md-12 row">
                        <div className="header-rdv-patient col-md-12 row">
                            <span className="col-md-3">Patient</span>
                            <span className="col-md-3">Date</span>
                            <span className="col-md-1">Heure</span>
                            <span className="col-md-3">Lieu de RDV</span>
                            <span className="col-md-2">Statut</span>
                        </div>
                        {this.state.list.map((one, i)=>{
                            return(
                            <div className="container-rdv-patient col-md-12 row" key={i}>
                                <span className="col-md-3">{this.inList(one.patient.idUser!==undefined?one.patient.idUser:one.patient)}</span>
                                <span className="col-md-3">{utile.getDateComplet(one.dateHeureRdv)}</span>
                                <span className="col-md-1">{utile.dateToHour(one.dateHeureRdv)}</span>
                                <span className="col-md-3">{one.centre.nomCentre+","+one.centre.adresse[0].addrValue}</span>
                                {one.statut.idStatut===101?
                                    <span className="rdv-list-statut col-md-2">Déjà fait&nbsp;&nbsp;<FontAwesomeIcon style={{color:'#82a64e'}} icon={faCheckCircle}/></span>
                                    :<span className="rdv-list-statut col-md-2">A venir&nbsp;&nbsp;<FontAwesomeIcon style={{color:'#ffca3a'}} icon={faExclamationCircle}/></span>
                                }
                            </div>)
                        })}
                        <div className="footer-rdv-patient col-md-12">
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
                    </div>
                    <div className="col-md-12 warning-rdv row">
                        <p>Lors de votre rendez-vous dans un centre de vaccination, veuillez vous munir des documents suivants:</p>
                        <ul>
                            <li>CIN</li>
                            <li>Preuve d'emploi ou d'ordre d'appartenance (carte ordre des médecins, services sociaux, militaires, policiers...)</li>
                            <li>Votre carte assurance santé (le cas échéant)</li>
                        </ul>
                    </div>
                    <div className="pagnationRecherche">
                        {/* <TablePagination
                            type="full"
                            dropup = {true}
                            page={this.state.page}
                            pageLength={this.state.pageLength}
                            totalRecords={this.state.totalRecords}
                            onPageChange={({ page, pageLength }) => {
                                const data= {
                                    idMedecin : 5,
                                    colone : 'heureRdv',
                                    pages : page-1,
                                    max : 10,
                                    etat : 1,
                                    ordre : ''+true 
                                }
                                this.getDataRdvByData(data)
                            }}
                            prevPageRenderer={() => <FontAwesomeIcon icon={faChevronLeft}/>}
                            nextPageRenderer={() => <FontAwesomeIcon icon={faChevronRight}/>}
                        /> */}
                    </div> 
                </div>
            </div>
        )
    }
}
export default ListeRdv;