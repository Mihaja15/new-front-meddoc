import React, {Component} from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import Documents from './Documents';
import './PdfShow.css';

class PdfShow extends Component{
    constructor(props){
        super();
        
        this.state = {
            nomSujet:'',
            prenomSujet:'',
            dateNaissance:'',
            lieuNaissance:'',
            sexe:'',
            adresse:'',
            pere:'',
            mere:'',
            typeViolence:'',
            dateViolence:'',
            heureViolence:'',
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
    }
    componentDidMount(){
        
    }
    render(){
        return(
            <div className="row">
                <PDFViewer style={{width:'100%',height:'1181px',backgroundColor:'#fff'}}>
                    <Documents type={1} data={this.state.data}/>
                </PDFViewer>
            </div>
        );
    }
}
export default PdfShow;