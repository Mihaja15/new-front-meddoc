import { faBoxes, faCalendarAlt, faChartPie, faCogs, faInfo, faThList, faUserEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './LeftMenu.css';

class LeftMenu extends React.Component{
    constructor(props){
        super(props);
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
            <div className="left-menu-root">
                <ul className="col-md-12">
                    <li onClick={()=>window.location.replace('/profil-centre/1')} className={this.state.show==="1"?"active-menu col-md-12":"col-md-12"}><FontAwesomeIcon icon={faChartPie}/>&nbsp; Tableau de bord</li>
                    <li onClick={()=>window.location.replace('/profil-centre/2')} className={this.state.show==="2"?"active-menu col-md-12":"col-md-12"}><FontAwesomeIcon icon={faCalendarAlt}/>&nbsp;&nbsp; Agenda</li>
                    <li onClick={()=>window.location.replace('/profil-centre/3')} className={this.state.show==="3"?"active-menu col-md-12":"col-md-12"}><FontAwesomeIcon icon={faUserEdit}/>&nbsp; Compte</li>
                    <li onClick={()=>window.location.replace('/profil-centre/4')} className={this.state.show==="4"?"active-menu col-md-12":"col-md-12"}><FontAwesomeIcon icon={faUserPlus}/>&nbsp; Ressources humaines</li>
                    <li onClick={()=>window.location.replace('/profil-centre/5')} className={this.state.show==="5"?"active-menu col-md-12":"col-md-12"}><FontAwesomeIcon icon={faBoxes}/>&nbsp;&nbsp; Gestion de stock</li>
                    <li onClick={()=>window.location.replace('/profil-centre/6')} className={this.state.show==="6"?"active-menu col-md-12":"col-md-12"}><FontAwesomeIcon icon={faThList}/>&nbsp;&nbsp;&nbsp; To do List</li>
                    <li onClick={()=>window.location.replace('/profil-centre/7')} className={this.state.show==="7"?"active-menu col-md-12":"col-md-12"}><FontAwesomeIcon icon={faInfo}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Besoin d'aide?</li>
                </ul>
            </div>
        );
    }
}
export default LeftMenu;