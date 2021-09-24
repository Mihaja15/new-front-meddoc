import React from 'react';
// import Calendrier from './Calendrier';
import '../centre/Profil.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChartPie, faCommentMedical, faCompress, faExpand, faFileSignature, faHospitalUser, faInfo, faThList, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import Calendrier from '../staff/Calendrier';
import Compte from '../centre/Compte';
import Dashboard from '../centre/Dashboard';
import { userSession } from '../../services/userSession';
import Causette from '../chat/Causette';
import PdfForm from '../pdf/PdfForm';
import ToDoList from './ToDoList';
import { utile } from '../../services/utile';
import MesPatients from '../profil-professionnel/MesPatients';
const indexLink = ['dashboard','agenda','compte','causette','e-trames','assistance','patients']
export default class ProfessionnelSanteDashboard extends React.Component{
    constructor(props){
        super();
        this.state={
            show:"1",
            showToDoList:true,
            showMenu:true
        }
    }
    componentDidMount(){
        if(utile.noValue(window.location.pathname.split('/')[3])){
            this.setState({show: 0});
        }else{
            this.setState({show:indexLink.indexOf(window.location.pathname.split('/')[3])},function(){
                // if(this.state.show===0){
                //     const value = window.location.pathname.split('/');
                //     this.setState({dataSearch:{text:value[3],district:value[4]}},function(){
                //         //console.log(this.state.dataSearch);
                //     });
                // }
                // //console.log('token = '+userSession.get('token'))
            });
        }
        // const view = window.location.pathname.split('/')[2];
        // this.setState({show:view})
    }
    openAndCloseTodoList=()=>{
        this.setState({showToDoList:!this.state.showToDoList});
    }
    linkInMenu=(link)=>{
        this.setState({show:indexLink.indexOf(link)},function(){
            //console.log(userSession.get('pseudo'))
           window.history.pushState("object or string", "Title", "/professionnel/"+(utile.hasValue(userSession.get('pseudo'))?userSession.get('pseudo'):"profil")+"/"+link+'/'+utile.formatDateDash(new Date()));
        //    window.location.pathname="/professionnel/"+(utile.hasValue(userSession.get('pseudo'))?userSession.get('pseudo'):"profil")+"/"+link+'/'+utile.formatDateDash(new Date());
        });
    }
    render(){
        return(
            <div className="profil-centre-container">
                <div className="row">
					<div className="profil-centre-left-menu" style={{width:this.state.showMenu?'16.5%':'4.5%'}}>
					{/* <div className={"profil-centre-left-menu"}> */}
						<div className="col-12 button-click-menu"><span onClick={()=>this.setState({showMenu:!this.state.showMenu})}><FontAwesomeIcon icon={this.state.showMenu?faCompress:faExpand}/>&nbsp;{this.state.showMenu?'Menu Pro':''}</span></div>
						<ul className="col-md-12">
							<li onClick={()=> this.linkInMenu('dashboard')} className={this.state.show===0?"active-menu col-md-12":"col-md-12"}><FontAwesomeIcon icon={faChartPie}/>{this.state.showMenu?<>&nbsp;&nbsp;Tableau de bord</>:''}</li>
							<li onClick={()=> this.linkInMenu('patients')} className={this.state.show===6?"active-menu col-md-12":"col-md-12"}><FontAwesomeIcon icon={faHospitalUser}/>{this.state.showMenu?<>&nbsp;Mes patients</>:''}</li>
							<li onClick={()=> this.linkInMenu('agenda')} className={this.state.show===1?"active-menu col-md-12":"col-md-12"}><FontAwesomeIcon icon={faCalendarAlt}/>{this.state.showMenu?<>&nbsp;&nbsp;&nbsp;Agenda</>:''}</li>
							<li onClick={()=> this.linkInMenu('compte')} className={this.state.show===2?"active-menu col-md-12":"col-md-12"}><FontAwesomeIcon icon={faUserEdit}/>{this.state.showMenu?<>&nbsp;&nbsp;Compte</>:''}</li>
							<li onClick={()=> this.linkInMenu('causette')} className={this.state.show===3?"active-menu col-md-12":"col-md-12"}><FontAwesomeIcon icon={faCommentMedical}/>{this.state.showMenu?<>&nbsp;&nbsp;&nbsp;Causette</>:''}</li>
							<li onClick={()=> this.linkInMenu('e-trames')} className={this.state.show===4?"active-menu col-md-12":"col-md-12"}><FontAwesomeIcon icon={faFileSignature}/>{this.state.showMenu?<>&nbsp;&nbsp;&nbsp;E-trames</>:''}</li>
							{/* <li onClick={()=> this.setState({show:"4"})} className={this.state.show==="4"?"active-menu col-md-12":"col-md-12"}><FontAwesomeIcon icon={faUserPlus}/>&nbsp; Ressources humaines</li>
							<li onClick={()=> this.setState({show:"5"})} className={this.state.show==="5"?"active-menu col-md-12":"col-md-12"}><FontAwesomeIcon icon={faBoxes}/>&nbsp;&nbsp; Gestion de stock</li> */}
							<li onClick={()=> this.openAndCloseTodoList()} className={"col-md-12"}><FontAwesomeIcon icon={faThList}/>{this.state.showMenu?<>&nbsp;&nbsp;&nbsp;&nbsp;To do List</>:''}</li>
							<li onClick={()=> this.linkInMenu('assistance')} className={this.state.show===5?"active-menu col-md-12":"col-md-12"}><FontAwesomeIcon icon={faInfo}/>{this.state.showMenu?<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Besoin d'aide?</>:''}</li>
						</ul>
					</div>
					{/* <div className="row"> */}
                    
                    {/* <div className="profil-header col-md-12 row"> */}
                        {/* <ul className="profil-header col-md-2">
                            <li onClick={()=>this.setState({show:1})} className={this.state.show===1?"dashboard col-md-12 active-dashboard":"dashboard col-md-12"}><FontAwesomeIcon icon={faChartPie}/>&nbsp; Tableau de bord</li>
                            <li onClick={()=>this.setState({show:2})} className={this.state.show===2?"agenda col-md-12 active-agenda":"agenda col-md-12"}><FontAwesomeIcon icon={faCalendarAlt}/>&nbsp;&nbsp; Agenda</li>
                            <li onClick={()=>this.setState({show:3})} className={this.state.show===3?"setting col-md-12 active-setting":"setting col-md-12"}><FontAwesomeIcon icon={faCogs}/>&nbsp; Paramètres</li>
                        </ul> */}
                    {/* </div> */}
                    {/* <div className={"profil-centre-content "+(this.state.showMenu?"col-md-10":"col-md-12")}> */}
                    <div className={"profil-centre-content"} style={{width:this.state.showMenu?'82.5%':'94.5%'}}>
                        <div className="col-12">
                            {/* <div className="row"> */}
                            {
                                this.state.show===1?
                                // <div className="col-md-12"><Calendrier/></div>
                                <Calendrier id={userSession.get('token')} type={1}/>
                                :this.state.show===2?
                                <Compte/>
                                :this.state.show===3?
                                <Causette/>
                                :this.state.show===4?
                                <PdfForm/>
                                :this.state.show===6?
                                <MesPatients/>
                                // :this.state.show==="4"?
                                // <RessourcesHumaines/>
                                :<Dashboard/>
                            }
                            {/* </div> */}
                        </div>
                    </div>
                    <div className={this.state.showMenu?"profil-centre-fixed":"profil-centre-fixed"} style={{display:!this.state.showToDoList?"block":"none"}} >
                        {/* <div className="col-12"> */}
                            <ToDoList show={this.state.showToDoList} optionShow={this.openAndCloseTodoList}/>
                        {/* </div> */}
                    </div>
                {/* </div> */}
                </div>
            </div>
        );
    }
}