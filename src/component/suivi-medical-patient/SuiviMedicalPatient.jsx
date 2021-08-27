import React, {Component} from 'react';
import './SuiviMedicalPatient.css';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import im1 from "../../assets/img/im1.png";
import ComingSoon from '../alert/ComingSoon';

class SuiviMedicalPatient extends Component{
    constructor(props){
        super();
        this.state={
            diagnostic : null,
            etatShow : 1
        }
    }
    getDataHtmlDonneMedical(){
        return (
            <div className="table-responsive ">
                <table className="table table-border table-vaccin-theader-body" style={{border: "2px solid #4d2863"}}>
                    <thead style={{backgroundColor : "#4d2863",color: "white"}}>
                        <tr>
                            <th scope="col">Détails</th>
                            <th scope="col">Examen médical/diagnostic</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td sclassName="dateSMP">27 juin 2021 à l'EPP andoharanofotsy pour une vaccination</td>
                            <td className="examenMedicalSMP">
                                <div className="typeDeMaladieSMP">
                                    <div className="typeDeMaladieSMPSon">Types de maladies </div>
                                    <ul className="typeDeMaladieSMPLu">
                                        <li>Maladie 1</li>
                                        <li>Maladie 2</li>
                                        <li>Maladie 3</li>
                                        <li>Maladie 4</li>
                                    </ul>
                                    <div className="typeDeMaladieSMPSon">Examens</div>
                                    <Editor
                                        editorState={this.state.diagnostic}
                                        wrapperClassName="demo-wrapper-smp"
                                        editorClassName="demo-editor-smp"
                                        toolbarHidden
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
    getDataHtmlVaccination(){
        return (
            <div className="table-responsive ">
                <table className="table table-border table-vaccin-theader-body" style={{border: "2px solid #4d2863"}}>
                    <thead style={{backgroundColor : "#4d2863",color: "white"}}>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Centre de vaccination</th>
                            <th scope="col">Nom du vaccin</th>
                            <th scope="col">Injection</th>
                            <th scope="col">Zone</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="vaccination-table-smp">
                            <td>27 juin 2021</td>
                            <td>EPP Andoharanofotsy</td>
                            <td>Johnson & Johnson</td>
                            <td>1/2</td>
                            <td>Bras droit</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
    getDataHtmlDocument(){
        return (
            <div className="row">
                <div className="col-md-6 col-sm-6 new-div-fichier">
                    <img src={im1} alt="photoTemporaire" className="new-file-show-SMP"/>
                    <span>monphoto.png</span>
                </div>
            </div>
        )
    }
    setStyleMenu(etatShow){
        if(etatShow===2){
            document.getElementById('bouton-menu-smp2').style.backgroundColor="#4d2863";
            document.getElementById('bouton-menu-smp2').style.border="1px solid #1b7895";
            document.getElementById('bouton-menu-smp1').style.backgroundColor="#1b7895";
            document.getElementById('bouton-menu-smp1').style.border="1px solid #1b7895";
            document.getElementById('bouton-menu-smp3').style.backgroundColor="#1b7895";
            document.getElementById('bouton-menu-smp3').style.border="1px solid #1b7895";
        }else if (etatShow===3){
            document.getElementById('bouton-menu-smp3').style.backgroundColor="#4d2863";
            document.getElementById('bouton-menu-smp3').style.border="1px solid #1b7895";
            document.getElementById('bouton-menu-smp2').style.backgroundColor="#1b7895";
            document.getElementById('bouton-menu-smp2').style.border="1px solid #1b7895";
            document.getElementById('bouton-menu-smp1').style.backgroundColor="#1b7895";
            document.getElementById('bouton-menu-smp1').style.border="1px solid #1b7895";
        }else{
            document.getElementById('bouton-menu-smp1').style.backgroundColor="#4d2863";
            document.getElementById('bouton-menu-smp1').style.border="1px solid #1b7895";
            document.getElementById('bouton-menu-smp2').style.backgroundColor="#1b7895";
            document.getElementById('bouton-menu-smp2').style.border="1px solid #1b7895";
            document.getElementById('bouton-menu-smp3').style.backgroundColor="#1b7895";
            document.getElementById('bouton-menu-smp3').style.border="1px solid #1b7895";
        }
       
    }
    getDataHtmlContenue(etatShow){
        if(etatShow === 3){return this.getDataHtmlDocument();}
        else if(etatShow === 2){return this.getDataHtmlVaccination();}
        else{return this.getDataHtmlDonneMedical();}
    }
    componentDidMount() {
        this.setStyleMenu(1);
    }
    render(){
        return (
           <div className="div-suivi-medical-patient">
               {/* <div className="div-suivi-medical-patient-menu">
                   <ul className="div-suivi-medical-patient-menu-ul">
                       <li><button className="div-suivi-medical-patient-menu-ul-li-button" id={'bouton-menu-smp1'} onClick={()=>{this.setState({etatShow : 1});this.setStyleMenu(1);}}><span className="div-suivi-medical-patient-menu-ul-li-button-label">Données médicales</span></button></li>
                       <li><button className="div-suivi-medical-patient-menu-ul-li-button" id={'bouton-menu-smp2'} onClick={()=>{this.setState({etatShow : 2});this.setStyleMenu(2);}}><span className="div-suivi-medical-patient-menu-ul-li-button-label">Vaccination</span ></button></li>
                       <li><button className="div-suivi-medical-patient-menu-ul-li-button" id={'bouton-menu-smp3'} onClick={()=>{this.setState({etatShow : 3});this.setStyleMenu(3);}}><span className="div-suivi-medical-patient-menu-ul-li-button-label">Documents</span></button></li>
                   </ul>
                   <div className="component-suivi-medical-patient">
                        {this.getDataHtmlContenue(this.state.etatShow)}
                   </div>
               </div> */}
               <div className='row'>
                   <div className='col-12'>
                       <ComingSoon/>
                   </div>
               </div>
           </div>
        )
    }
}
export default SuiviMedicalPatient;