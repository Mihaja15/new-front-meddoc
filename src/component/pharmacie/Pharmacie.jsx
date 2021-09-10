import React, {Component} from 'react';
import './Pharmacie.css';
import {Link} from 'react-router-dom';

class Pharmacie extends Component{
    constructor(props){
        super();
        this.state={
        }
    }
    render(){
        return (
           <div class = "container-pharmacie">
               <div className="container">
                    <h2>PHARMACLIC, la parapharmacie en ligne! La solution en ligne innovante aux services des pharmacies…</h2>
                    <p>Plusieurs milliers de personnes à Madagascar recherchent des produits de santé, de bien-être ou de beauté sur Internet ou sur les réseaux sociaux. Ces personnes sont aujourd’hui de plus en plus tentées d’acheter ces produits directement en ligne.</p>
                    <p>Afin de vous aider à vous adapter aux nouveaux modes de consommation des patients, Pharmaclic vous permet de mettre en avant vos produits, vos services et vos domaines de spécialisation via un moteur de recherche géolocalisé. Les internautes peuvent ainsi facilement être orientés vers les officines les plus proches proposant le produit, le service ou le domaine de spécialisation recherché.</p>
                    <p>Avec Pharmaclic, la pharmacie connectée devient simple !</p>
                    <ol>
                        <li>Renseignez vos informations pratiques et vos activités</li>
                        <li>Configurer très facilement la mise à jour automatique de vos produits depuis votre logiciel de gestion</li>
                        <li>Accueillez vos patients dans votre officine sans changer vos habitudes</li>
                    </ol>
                    <p><b>Important : </b> Pharmaclic n'est pas un comparateur de prix des pharmacies</p>
                    <h2>5 bonnes raisons de rejoindre Pharmaclic :</h2>
                    <ul>
                            <li>Vous accédez à un outil qui vous permet de référencer simplement et efficacement votre pharmacie sur Internet et de générer davantage de trafic et des ventes additionnelles dans votre officine</li>
                            <li>Vous donnez de la visibilité sur les produits et sur les marques que vous êtes le/la seul(e) à commercialiser sur votre zone de chalandise et vous mettez en avant vos produits d’appel</li>
                            <li>Vous valorisez vos services et vos nouvelles missions : entretiens pharmaceutiques et dépistages</li>
                            <li>Vous faites connaître vos domaines de spécialisation : phytothérapie, diététique, etc.</li>
                            <li>Vous continuez d’exercer votre métier au contact de vos patients sans changer vos habitudes et sans avoir à vous soucier de votre visibilité sur Internet</li>
                    </ul>

                    <div class="container-boutique">
                        <a href="#" class="btn btn-success btn-lg">Ouvrir une boutique</a>
                    </div>
                    <Link href="/contacter">Nous contacter</Link>
               </div>
           </div>
        )
    }
}
export default Pharmacie