import React, {Component} from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import Documents from './Documents';
import { userSession } from '../../services/userSession';
import './PdfForm.css';

class PdfForm extends Component{
    constructor(props){
        super();
        
        this.state = {
            validation:false,
            typeCertificat:1,
            etat:1,
            nomSujet:'',
            prenomSujet:'',
            dateNaissance:'',
            lieuNaissance:'',
            civilite:'',
            adresse:'',
            pere:'',
            mere:'',
            typeViolence:'',
            dateViolence:'',
            heureViolence:'',
            lieuViolence:'',
            descriptionExamen:'',
            conduiteSujet:'',
            motif:'',
            causeDeces:'',
            dateDeces:'',
            heureDeces:'',
            lieuDeces:'',
            dateDocument:'',
            heureDocument:'',
            lieuDocument:'',
            nomPrenomsMedecin:'',
            numOnm:'',
            adresseMedecin:'',
            telephoneMedecin:'',
            data:{}
        }
        this.radioButtonChange = this.radioButtonChange.bind(this);
    }
    handleChange = (param, e) => {
        //console.log(e.target.value);
        this.setState({ [param]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }, function(){
            //console.log(this.state.civilite)
        });
        this.setState({data:{
            nomSujet:this.state.nomSujet,
            prenomSujet:this.state.prenomSujet,
            dateNaissance:new Date(this.state.dateNaissance),
            lieuNaissance:this.state.lieuNaissance,
            civilite:this.state.civilite,
            adresse:this.state.adresse,
            pere:this.state.pere,
            mere:this.state.mere,
            typeViolence:this.state.typeViolence,
            dateViolence:new Date(this.state.dateViolence),
            heureViolence:this.state.heureViolence,
            lieuViolence:this.state.lieuViolence,
            descriptionExamen:this.state.descriptionExamen,
            conduiteSujet:this.state.conduiteSujet,
            motif:this.state.motif,
            causeDeces:this.state.causeDeces,
            dateDeces:new Date(this.state.dateDeces),
            heureDeces:this.state.heureDeces,
            lieuDeces:this.state.lieuDeces,
            dateDocument:new Date(this.state.dateDocument),
            heureDocument:this.state.heureDocument,
            lieuDocument:this.state.lieuDocument,
            nomPrenomsMedecin:this.state.nomPrenomsMedecin,
            numOnm:this.state.numOnm,
            adresseMedecin:this.state.adresseMedecin,
            telephoneMedecin:this.state.telephoneMedecin
        }})
    }
    changeTypeCertificat(e){
        //console.log(Number(e.target.value)===3)
        this.setState({typeCertificat:Number(e.target.value)});
    }
    previewPdf(event){
        event.preventDefault();
        this.setState({etat:2, validation:false});
    }
    componentDidMount(){
        this.setState({nomPrenomsMedecin:userSession.get('pseudo')})
    }
    showPdf(){
        return(
            <div className="row">
                <a href="#1" onClick={()=>{this.setState({etat:1})}}>Retour</a>
                <PDFViewer style={{width:'100%',height:'1181px',backgroundColor:'#fff'}}>
                    <Documents type={this.state.typeCertificat} data={this.state.data}/>
                </PDFViewer>
            </div>
        );
    }
    radioButtonChange(event){
        this.setState({civilite:event.target.value});
    }
    formPdf(){
        return(
            <form className='pdf-form row' onSubmit={this.previewPdf.bind(this)}>
                <div className="input-group col-12">
                    <label className='labelStyle col-md-3'>Type de certificat: </label>
                    <select name="typeCertificat" id="typeCertificat" className="inputStyle col-md-9" onChange={this.changeTypeCertificat.bind(this)}>
                        <option value={1}>Certificat de constatations de violences</option>
                        <option value={2}>Certificat de décès</option>
                        <option value={3}>Certificat d'aptitude</option>
                        <option value={4}>Certificat d'inaptitude</option>
                    </select>
                </div>
                <div className="input-group col-12">
                    <label className='labelStyle col-md-3'>Nom: </label>
                    <input className='inputStyle col-md-3' name='nomSujet' value={this.state.nomSujet} onChange={this.handleChange.bind(this, 'nomSujet')} type='text'/>
                
                    <label className='labelStyle col-md-3'>Prénom(s): </label>
                    <input className='inputStyle col-md-3' name='prenomSujet' value={this.state.prenomSujet} onChange={this.handleChange.bind(this, 'prenomSujet')} type='text'/>
                </div>
                <div className="input-group col-12">
                    <label className='labelStyle col-md-3'>Date de naissance: </label>
                    <input className='inputStyle col-md-3' name='dateNaissance' value={this.state.dateNaissance} onChange={this.handleChange.bind(this, 'dateNaissance')} type='date'/>
                
                    <label className='labelStyle col-md-3'>Lieu de naissance: </label>
                    <input className='inputStyle col-md-3' name='lieuNaissance' value={this.state.lieuNaissance} onChange={this.handleChange.bind(this, 'lieuNaissance')} type='text'/>
                </div>
                <div className="input-group col-12">
                    <label className='labelStyle col-md-3'>Civilité: </label>
                    {/* <input className='inputStyle col-md-3' type='text'/> */}
                    <div className="col-md-3" onChange={this.handleChange.bind(this, 'civilite')}>
                        <input className="col-md-1" type="radio" id="male" name="civilite" value="1"/>
                        <label className="col-md-5" htmlFor="male">Monsieur</label>
                        <input className="col-md-1" type="radio" id="female" name="civilite" value="0"/>
                        <label className="col-md-5" htmlFor="female">Madame</label>
                        <input className="col-md-1" type="radio" id="mrs" name="civilite" value="2"/>
                        <label className="col-md-5" htmlFor="mrs">Mademoiselle</label>
                    </div>
                    <label className='labelStyle col-md-3'>Adresse: </label>
                    <input className='inputStyle col-md-3' name='adresse' value={this.state.adresse} onChange={this.handleChange.bind(this, 'adresse')} type='text'/>
                </div>
                <div hidden={this.state.typeCertificat!==2} className="input-group col-12">
                    <label className='labelStyle col-md-3'>Père: </label>
                    <input className='inputStyle col-md-3' name='pere' value={this.state.pere} onChange={this.handleChange.bind(this, 'pere')} type='text'/>
                
                    <label className='labelStyle col-md-3'>Mère: </label>
                    <input className='inputStyle col-md-3' name='mere' value={this.state.mere} onChange={this.handleChange.bind(this, 'mere')} type='text'/>
                </div>
                <div hidden={this.state.typeCertificat!==1} className="input-group col-12">
                    <label className='labelStyle col-md-3'>Type de violence: </label>
                    <select name="typeViolence" id="typeViolence" className="inputStyle col-md-3" onChange={this.handleChange.bind(this, 'typeViolence')}>
                        <option value="">Sélectionner un type</option>
                        <option value="victime d’une agression">victime d’une agression</option>
                        <option value="victime d’un accident">victime d’un accident</option>
                    </select>
                    {/* <input className='inputStyle col-md-3' name='typeViolence' value={this.state.email} onChange={this.handleChange.bind(this, 'typeViolence')} type='text'/> */}
                
                    <label className='labelStyle col-md-3'>Date de violence: </label>
                    <input className='inputStyle col-md-3' name='dateViolence' value={this.state.dateViolence} onChange={this.handleChange.bind(this, 'dateViolence')} type='date'/>
                
                    <label className='labelStyle col-md-3'>Heure de violence: </label>
                    <input className='inputStyle col-md-3' name='heureViolence' value={this.state.heureViolence} onChange={this.handleChange.bind(this, 'heureViolence')} type='time'/>
                    
                    <label className='labelStyle col-md-3'>Lieu de violence: </label>
                    <input className='inputStyle col-md-3' name='lieuViolence' value={this.state.lieuViolence} onChange={this.handleChange.bind(this, 'lieuViolence')} type='text'/>
                </div>
                <div hidden={this.state.typeCertificat!==1} className="input-group col-12">
                    <label className='labelStyle col-md-3'>Description examen clinique: </label>
                    <textarea className='inputStyle col-md-9' rows="2" name='descriptionExamen' value={this.state.descriptionExamen} onChange={this.handleChange.bind(this, 'descriptionExamen')}/>
                </div>
                <div hidden={this.state.typeCertificat!==1} className="input-group col-12">
                    <label className='labelStyle col-md-3'>Conduite à tenir: </label>
                    <textarea className='inputStyle col-md-9' rows='2' name='conduiteSujet' value={this.state.conduiteSujet} onChange={this.handleChange.bind(this, 'conduiteSujet')}/>
                </div>
                <div hidden={!(this.state.typeCertificat===3||this.state.typeCertificat===4)} className="input-group col-12">
                    <label className='labelStyle col-md-3'>Motif: </label>
                    <textarea className='inputStyle col-md-9' name='motif' value={this.state.motif} onChange={this.handleChange.bind(this, 'motif')}/>
                </div>
                <div hidden={this.state.typeCertificat!==2} className="input-group col-12">
                    <label className='labelStyle col-md-3'>Cause du décès: </label>
                    <input className='inputStyle col-md-3' name='causeDeces' value={this.state.causeDeces} onChange={this.handleChange.bind(this, 'causeDeces')} type='text'/>
                
                    <label className='labelStyle col-md-3'>Date du décès: </label>
                    <input className='inputStyle col-md-3' name='dateDeces' value={this.state.dateDeces} onChange={this.handleChange.bind(this, 'dateDeces')} type='date'/>
                
                    <label className='labelStyle col-md-3'>Heure du décès: </label>
                    <input className='inputStyle col-md-3' name='heureDeces' value={this.state.heureDeces} onChange={this.handleChange.bind(this, 'heureDeces')} type='time'/>
                
                    <label className='labelStyle col-md-3'>Lieu du décès: </label>
                    <input className='inputStyle col-md-3' name='lieuDeces' value={this.state.lieuDeces} onChange={this.handleChange.bind(this, 'lieuDeces')} type='text'/>
                </div>
                <div className="input-group col-12">
                    <label className='labelStyle col-md-3'>Date du document: </label>
                    <input className='inputStyle col-md-3' name='dateDocument' value={this.state.dateDocument} onChange={this.handleChange.bind(this, 'dateDocument')} type='date'/>
                
                    <label className='labelStyle col-md-3'>Heure du document: </label>
                    <input className='inputStyle col-md-3' name='heureDocument' value={this.state.heureDocument} onChange={this.handleChange.bind(this, 'heureDocument')} type='time'/>
                
                    <label className='labelStyle col-md-3'>Lieu du document: </label>
                    <input className='inputStyle col-md-3' name='lieuDocument' value={this.state.lieuDocument} onChange={this.handleChange.bind(this, 'lieuDocument')} type='text'/>
                </div>
                <div className='col-md-12' style={{textAlign:'center',border:'1px solid #f0f0f0',borderRadius:'10px',padding:'10px'}}>
                        <input id="validation" type='checkbox' checked={this.state.validation} onChange={this.handleChange.bind(this, 'validation')} name='validation' style={{color:'blue'}} className='col-md-1'/>
                    <label className='col-md-5' htmlFor="validation">
                        Tous les champs sont bien vérifiés et valides
                    </label>
                    <button type='submit' disabled={!this.state.validation} className='btn col-md-2'>Aperçu</button>
                </div>
                <div className='' style={{textAlign:'right'}}>
                    {/* <button type='submit' className='btn btn-info col-md-4'>Aperçu</button> */}
                </div>
            </form>
        );
    }
    render(){
        return(
            <div className="pdf-content">
                {/* <div className="container"> */}
                    {/* <h3>E-Trames</h3> */}
                    {this.state.etat===1?this.formPdf():this.showPdf()}
                    {/* <div className="row"> */}
                        
                    {/* </div> */}
                    {/* <div className="row">
                        <PDFViewer style={{width:'100%',height:'1181px',backgroundColor:'#fff'}}>
                            <Documents type={1} data={this.state.data}/>
                        </PDFViewer>
                    </div> */}
                {/* </div>                 */}
            </div>
        );
    }
}
export default PdfForm;