import React, {Component} from 'react';
import './CarnetDeSante.css';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookMedical, faFileAlt, faArrowLeft, faSyringe} from '@fortawesome/free-solid-svg-icons';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromRaw, convertFromHTML  } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { authUser } from '../../services/authUser';
import {fetchGet} from '../../services/global.service';
import { utile } from '../../services/utile';
import ReactTooltip from 'react-tooltip';
import ComingSoon from '../alert/ComingSoon';

class CarnetDeSante extends Component{
    constructor(props){
        super();
        this.state={
            etatShowMenu : 1,
            newEtat : false,
            etatShow :  false,
            user : null,
            vaccination : [],
            blockValue : null,
        }
    }

    telechargerFichier=(nom)=>{
        // const data = {name : nom};
        
    }
    getVaccination(vaccination){
        return (
            <div className="allUrgenceCarnetDeSante">
                <div>
                    <ul className="accessCarnetDeSante">
                        <li className="retourCarnetDeSante" onClick={()=>{this.setState({newEtat : false})}}><FontAwesomeIcon icon={faArrowLeft}/></li>
                        <li className="miniTitleUrgenceCarnetDeSante">Vaccination</li>
                    </ul>
                </div>
                <div className="">
                    {
                        (vaccination.length>0)?(
                            <>
                                <div className="deuxiemeclassTablecarnetMedical">
                                    <table className="table table-maladie-carnetMedical-tmp2">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Centre</th>
                                                <th>Vaccin</th>
                                                <th>Injection</th>
                                                <th>Zone</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                vaccination.map((dataTmp,i)=>{
                                                    return (
                                                        <tr key={i}>
                                                            <td>{utile.getDateComplet((new Date(dataTmp.dateVaccination)).toString())}</td>
                                                            <td>{dataTmp.centre.nomCentre}</td>
                                                            <td>{dataTmp.vaccin.designation}</td>
                                                            <td>{dataTmp.numInjection}</td>
                                                            <td>{dataTmp.zone}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        ):<div></div>
                    }
                </div>
            </div>
        )
    }
    getOriginalNameFichier(valeur){
        let data = valeur.split('_');
        if(data.length >1){
            return data[data.length-1];
        }
        return valeur;
    }
    getMesDocuments(vaccination){
        if(vaccination.length){
            return (
                <div className="allUrgenceCarnetDeSante">
                    <div>
                        <ul className="accessCarnetDeSante">
                            <li className="retourCarnetDeSante" onClick={()=>{this.setState({newEtat : false})}}><FontAwesomeIcon icon={faArrowLeft}/></li>
                            <li className="miniTitleUrgenceCarnetDeSante">Mes documents</li>
                        </ul>
                    </div>
                    <div className="allUrgenceCarnetDeSanteRow-new">
                        
                        {
                            vaccination.map((dataTmp,i)=>{

                                return (
                                    <div className="row" key={i}>
                                        <div className="allUrgenceCarnetDeSanteRow-new-title">{utile.getDateComplet((new Date(dataTmp.dateVaccination)).toString())}</div>
                                        {
                                            dataTmp.document.map((result,a)=>{
                                                if(result.type==='application/pdf'){
                                                    return (
                                                        <div className="col-md-3 col-sm-6 col-xs-12 document-carnet-medicale-mere" key={a} >               
                                                            {/* <div className="document-carnet-medicale-mere-img"> <a href={'http://localhost:3000/uploads/'+result.nomDocument} target="_blank"><img data-tip data-for='textTelechargementFichierv1' src={'/uploads/pdf.jpg'} alt={result.nomDocument}/></a> </div> */}
                                                            <div className="document-carnet-medicale-mere-img"> <a href="#!" onClick={()=> window.open('/uploads/'+result.nomDocumen, "_blank")}><img data-tip data-for='textTelechargementFichierv1' src={'/uploads/pdf.jpg'} alt={result.nomDocument}/></a> </div>
                                                            <div className="document-carnet-medicale-mere-name">{this.getOriginalNameFichier(result.nomDocument)} <br/> {result.type} </div>
                                                            <ReactTooltip id='textTelechargementFichierv1' type='error'>
                                                                <span>Cliquer ici pour télécharger le fichier</span>
                                                            </ReactTooltip>
                                                        </div>
                                                    )
                                                }else{
                                                    return (
                                                        <div className="col-md-3 col-sm-6 col-xs-12 document-carnet-medicale-mere" key={a} >               
                                                            {/* <div className="document-carnet-medicale-mere-img"><a href={'http://localhost:3000/uploads/'+result.nomDocument}  target="_blank" download={result.nomDocument}><img data-tip data-for='textTelechargementFichierv2' src={'/uploads/'+result.nomDocument} alt={result.nomDocument}/></a> </div> */}
                                                            <div className="document-carnet-medicale-mere-img"><a href="#!" onClick={()=> window.open('/uploads/'+result.nomDocumen, "_blank")}><img data-tip data-for='textTelechargementFichierv2' src={'/uploads/'+result.nomDocument} alt={result.nomDocument}/></a> </div>
                                                            <div className="document-carnet-medicale-mere-name">{this.getOriginalNameFichier(result.nomDocument)} <br/> {result.type} </div>
                                                            <ReactTooltip id='textTelechargementFichierv2' type='error'>
                                                                <span>Cliquer ici pour télécharger le fichier</span>
                                                            </ReactTooltip>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                )

                                
                            })
                        }
                        
                    </div>
                </div>
            )
        }
        return <div></div>;
    }
    getTableMaladie(user){
        if(user!==null){
            if(user.maladies){
                return (
                    <>
                        <div hidden={user.maladies.length<=0}>
                            <div>
                                <table className="table table-maladie-carnetMedical">
                                    <thead>
                                        <tr>
                                            <th>Maladies</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            user.maladies.map((dataTmp,i)=>{
                                                return (
                                                    <tr key={i}>
                                                        <td>{dataTmp.nomMaladie}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )
            }
        }
        return <div></div>
    }
    convertCommentFromJSONToHTML = (text) => {return stateToHTML(convertFromRaw(JSON.parse(text))) }
    
    convertStringToHtml(valeur){
        var parser = new DOMParser();
        var doc = parser.parseFromString(valeur, 'text/html');
        return doc.body;
    }
    getDiagnostic(vaccination){
        if(vaccination.length>0){
            return (
                <>
                    <div className="documentTitleCarnetDeSanteFather">
                        <div className="documentTitleCarnetDeSante">Diagnostic</div>
                        {
                            vaccination.map((dataTmp,i)=>{
                                return (
                                    <div className="allDiagnosticContentData">
                                        <table className="table table-bordered" key={i}>
                                            <tbody>
                                                <tr>
                                                    <td colSpan={2} className="titleDiagnosticCarnetSante">{utile.getDateComplet( (new Date(dataTmp.dateVaccination)).toString())}</td>
                                                </tr>
                                                <tr>
                                                    <td className="dimensionthDiagnostic dimensionthDiagnosticTitleChamp">Centre de vaccination</td>
                                                    <td className="dimensionthDiagnostic">{dataTmp.centre.nomCentre}</td>
                                                </tr>
                                                <tr>
                                                    <td className="dimensionthDiagnostic dimensionthDiagnosticTitleChamp">Motif</td>
                                                    <td className="dimensionthDiagnostic">Vaccination</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2}>
                                                        <div className="titleDiagnosticCarnetSanteV2">Examens</div>
                                                        <Editor editorState={EditorState.createWithContent(
                                                                    ContentState.createFromBlockArray(
                                                                    convertFromHTML(this.convertCommentFromJSONToHTML(dataTmp.diag))
                                                                    )
                                                                )}
                                                                wrapperClassName="demo-wrapper"
                                                                editorClassName="demo-editor-carnetDeSante"
                                                            toolbarHidden 
                                                        />
                                                        
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                </>
            )
        }else{
            return <div></div>
        }
    }
    getDonneMedicale(){
        return (
            <div className="allUrgenceCarnetDeSante">
                <div>
                    <ul className="accessCarnetDeSante">
                        <li className="retourCarnetDeSante" onClick={()=>{this.setState({newEtat : false})}}><FontAwesomeIcon icon={faArrowLeft}/></li>
                        <li className="miniTitleUrgenceCarnetDeSante">Mes données médicales</li>
                    </ul>
                </div>
            
                <div className="rowUrgenceCarnetDeSante">
                    <div>
                        {this.getTableMaladie(this.state.user)}
                        {this.getDiagnostic(this.state.vaccination)}
                        
                        
                    </div>
                    
                </div>
            </div>
        )
    }
    getMenuPrincipaleCarnetSante(){
        return (
            <div>
                <ul className="ulChoixCarnetDeSante">
                    <li className="liChoixCarnetDeSante" onClick={()=>{this.setState({etatShowMenu : 1, newEtat : true})}}>
                        <div className="divChoixCarnetDeSante">
                            <div className="divImgChoixCarnetDeSante"><FontAwesomeIcon icon={faBookMedical} id="iconDecorationCarnetDeSante" className="imgChoixCarnetDeSante" /></div>
                            <div className="textChoixCarnetDeSante">Données médicales</div>
                        </div>
                    </li>
                    <li className="liChoixCarnetDeSante" onClick={()=>{this.setState({etatShowMenu : 2, newEtat : true})}}>
                        <div className="divChoixCarnetDeSante">
                            <div className="divImgChoixCarnetDeSante"><FontAwesomeIcon icon={faSyringe} id="iconDecorationCarnetDeSante" className="imgChoixCarnetDeSante" /></div>
                            <div className="textChoixCarnetDeSante">Vaccination</div>
                        </div>
                    </li>
                    <li className="liChoixCarnetDeSante" onClick={()=>{this.setState({etatShowMenu : 3, newEtat : true})}}>
                        <div className="divChoixCarnetDeSante">
                            <div className="divImgChoixCarnetDeSante"><FontAwesomeIcon icon={faFileAlt} id="iconDecorationCarnetDeSante" className="imgChoixCarnetDeSante" /></div>
                            <div className="textChoixCarnetDeSante">Mes documents</div>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
    componentDidMount() {
        fetchGet('/users/dataUser/'+authUser.getToken()).then(data=>{
            
            if(data!==null){
                console.log("Users : ",data);
                this.setState({user : data});
                fetchGet('/covid/vaccinationByIdPatient/'+authUser.getToken()).then(dataTmp=>{
                    console.log("vaccination : ",dataTmp);
                    this.setState({vaccination : dataTmp});
                })
            }
        });
    }
    render(){
        return (
           <div>
                {/* <div className="allContentPatient">
                    { 
                        (!this.state.newEtat) ? this.getMenuPrincipaleCarnetSante()
                        :(<div>
                            {
                                (this.state.etatShowMenu === 1 ) ?  this.getDonneMedicale()
                                :(this.state.etatShowMenu === 2 ) ?  this.getVaccination(this.state.vaccination)
                                :(this.state.etatShowMenu === 3 ) ?  this.getMesDocuments(this.state.vaccination)
                                : (<div></div>)
                            }
                        </div>)
                        
                    
                    }

                </div>                             */}
                <div className='row'>
                   <div className='col-12'>
                       <ComingSoon/>
                   </div>
               </div>
           </div>
        )
    }
}
export default CarnetDeSante;