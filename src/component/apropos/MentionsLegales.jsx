import React from 'react';
import './MentionsLegales.css';

class MentionsLegales extends React.Component{
    constructor(props){
        super();
        this.state = {}
    }
    componentDidMount(){
        window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
    }
    render(){
        return (
            <div className="sub-apropos-container">
                <h1>MENTIONS LÉGALES</h1>
                
                <p>Les Services proposés par MEDDoC sont accessibles à l’adresse URL : <a href="https://www.meddoc.com" rel="noopener noreferrer" target="_blank">www.meddoc.com</a></p>
 
                <p>Editeur : MEDDoC, SARLU au capital de 1.000.000 MGA, immatriculée au Registre du Commerce et des Sociétés sous le numéro 2020B00629,
                     dont le siège social est situé à KENTIA DOMICILIATION - Immeuble Jacaranda Ambatonakanga</p>
 
                <p>Tél : 032 65 031 58</p>
                <p>email: <a href="mailto:contact@meddoc.mg">contact@meddoc.mg</a></p>

                <ul>
                    <li>Pour toute demande support, accompagnement pour utiliser la solution : envoyer votre demande à support@meddoc.mg</li>
                    <li>Pour toute demande d’accès, de rectification, de suppression, d’opposition au traitement de vos données à caractère personnel, à la limitation du traitement ainsi que votre droit à la portabilité de vos données : <a href="#link">link</a></li>
                    <li>Pour toute demande d’information commerciale ou partenariat: <a href="mailto:contact@meddoc.mg">contact@meddoc.mg</a></li>
                </ul>
                <p>Directeur de la publication : Le directeur de la publication est Monsieur Dominique Andriamahefasoa MANOVA, CEO - Fondateur de MEDDoC</p>
                <p>Hébergeur : Les données sont hébergées par Amazon Web Services (AWS) certifiée hébergeur de données santé dits “HDS” </p>
            </div>
            
        )
    }
}
export default MentionsLegales;