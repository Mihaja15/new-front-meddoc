import React, {Component} from 'react';
import './Actualites.css';
import actualites from '../../assets/img/actualites.jpg';

class Actualites extends Component{
    constructor(props){
        super();
        this.state={}
    }
    render(){
        return (
           <div className="divActualites container">
                <div className="bigtitle-actualites">Tout savoir sur la campagne de vaccination contre la Covid-19 à Madagascar</div>    
                <div className="image-actualites">
                    <img src={actualites} className="image-actualites-title" alt="actualites" srcset=""/>
                </div>   
                <div className="text-actualites">
                    <p>Comme le Président de la République a annoncé, Madagascar va se lancer dans une campagne de vaccination contre la COVID-19 selon des modalités et un calendrier préconisé par le Ministère de la Santé Publique.</p>
                </div>  
                <div className="sous-title-actualites">Procédures pour se faire vacciner</div> 
                <div className="document-actualites">
                    Quatre catégories ont été pris en compte dans la définition des populations prioritaires pour la vaccination:
                    <ul className="text-ul-actualites">
                        <li>Les professionnels du secteur de la santé et du secteur médico-social</li>
                        <li>Les travailleurs en milieux à risques et de la sécurité publique (policiers, militaires, gendarmes, pompiers, surveillants pénitentiaires…)</li>
                        <li>Des personnes diabétiques ou qui ont des maladies chroniques pouvant être un facteur de commodité</li>
                        <li>Les Personnes de 60 ans et plus quel que soit leur lieu de vie et leur état de santé (avec ou sans comorbidités)</li>
                    </ul>
                    Si vous ne faites pas partie de ces groupes de vaccination, évitez de téléphoner ou de vous présenter sur place pour vous faire vacciner. Vous serez informés lorsque votre groupe pourra commencer à prendre rendez-vous.
                </div>
                <div className="sous-title-actualites">Prise de rendez-vous pour se faire vacciner</div> 
                <div className="document-actualites">
                    Pour prendre un rendez-vous, bien vérifier si vous faites partie du groupe de vaccination.
                    <ul className="text-ul-actualites">
                        <li>Prise de rendez-vous en ligne: <a href="/">www.meddoc.mg</a></li>
                        <li>Appeler le 911 pour une prise de rendez-vous téléphonique</li>
                    </ul>
                    Si vous éprouvez des difficultés pour prendre votre rendez-vous en ligne, demandez l’aide de vos proches. <br/><br/> 
                    Au besoin, il est possible d’obtenir de l’aide en appelant de 8 h à 20 h du lundi au vendredi ou de 8 h 30 à 16 h 30 les samedi et dimanche au : 0326503158.
                </div>

                <div className="sous-title-actualites">Consignes pour la personne qui se fait vacciner</div> 
                <div className="document-actualites">
                    <ul className="textNormal-ul-actualites">
                        <li>Apportez votre carte d’identité pour vous identifier </li>
                        <li>Apportez votre preuve d’emploi ou d’ordre d’appartenance (carte ordre des médecins, services sociaux, militaires, polices…)</li>
                        <li>Apportez votre carte assurance santé (si n’avez pas vous pouvez quand même recevoir le vaccin).</li>
                        <li>Respectez les consignes sanitaires de base (distanciation physique, lavage des mains, etc.) lors de votre rendez-vous.</li>
                        <li>Ne vous présentez pas en centre de vaccination si vous êtes en isolement ou en quarantaine.</li>
                        <li>
                            Si vous avez un rendez-vous :
                            <ul className="text-ul-actualites-son">
                                <li>Prévoyez votre déplacement et présentez-vous seulement cinq minutes avant l'heure de votre rendez-vous afin d’éviter de causer des files d’attente.</li>
                                <li>Prévoyez votre déplacement et présentez-vous seulement cinq minutes avant l'heure de votre rendez-vous afin d’éviter de causer des files d’attente.</li>
                            </ul>
                        </li>
                    </ul>
                </div>

                 
                <div className="sous-title-actualites">Autres mesures de protection</div> 
                <div className="document-actualites">
                    Le début de la vaccination ne signifie pas la fin des mesures sanitaires. Plusieurs mois seront nécessaires pour protéger une part suffisamment importante de la population avec le vaccin. La distanciation physique d’un mètre, le port du masque et le lavage des mains sont des habitudes à conserver.
                </div>

                
                <div className="sous-title-actualites">Consignes pour la personne accompagnatrice</div> 
                <div className="document-actualites">
                    <ul className="textNormal-ul-actualites">
                        <li>
                            Si vous n’habitez pas avec votre proche qui recevra le vaccin, protégez-le lors de vos déplacements. Dans votre automobile :
                            <ul className="text-ul-actualites-son">
                                <li>portez tous les deux un couvre-visage ou un masque d’intervention (masque de procédure) couvrant la bouche et le nez.</li>
                                <li>ouvrez une fenêtre.</li>
                                <li>faites asseoir votre proche à l'arrière.</li>
                            </ul>
                        </li>
                        <li>Une fois au centre de vaccination, votre proche et vous devez en tout temps porter un couvre-visage ou un masque d’intervention (masque de procédure).</li>
                        <li>Respectez les consignes sanitaires de base (distanciation physique, lavage des mains, etc.) lors du rendez-vous</li>
                    </ul>
                </div>

                <div className="sous-title-actualites">Déroulement d’un rendez-vous de vaccination contre la COVID-19</div> 
                <div className="document-actualites">
                    <ul className="text-line-ul-actualites">
                        <li>En appelant le 911 ou prendre un rendez-vous en ligne: Pour prendre rendez-vous, allez sur la page Web <a href="/">www.meddoc.mg</a>  et suivez les étapes pour vous inscrire.</li>
                        <li>Confirmation du rendez-vous: la veille de  votre rendez-vous, vous recevrez un texto ou un courriel  avec toutes les informations pratiques. Au besoin, vérifiez votre boîte de courrier indésirable.</li>
                        <li>Arrivée 5 minutes à l’avance: Veuillez arriver cinq minutes au maximum avant l’heure de votre rendez-vous afin d’éviter de causer des files d’attente.</li>
                        <li>Dans le centre de vaccination: Vous devrez présenter votre carte d’assurance maladie ou une carte d’identité pour vous identifier, confirmer que vous faites partie du groupe cible et prouver votre lieu de résidence. Si vous n’avez pas de carte d’assurance maladie, vous pourrez quand même recevoir le vaccin. Si un proche vous accompagne lors de votre rendez-vous, il pourra vous suivre durant tout le déroulement de la vaccination.</li>
                        <li>
                            Vous rencontrerez un professionnel autorisé qui :
                            <ul className="text-ul-actualites">
                                <li>validera avec vous le formulaire de vaccination</li>
                                <li>s’assurera que vous donnez un consentement libre et éclairé</li>
                                <li>autorisera ou non votre vaccination</li>
                            </ul>
                        </li>
                        <li>Vaccination: Vous devrez vous déplacer dans la zone de vaccination pour être vacciné par un professionnel autorisé.</li>
                        <li>Surveillance après la vaccination: Vous devrez vous asseoir dans la zone d’observation pendant au moins 15 minutes pour une surveillance par des professionnels autorisés.</li>
                        <li>Preuve de vaccination: Vous recevrez une preuve de vaccination et pourrez ensuite quitter les lieux.</li>
                    </ul>
                </div>

           </div>
        )
    }
}
export default Actualites;