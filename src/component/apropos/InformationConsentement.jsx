import React from 'react';
import {Link} from 'react-router-dom'
import './InformationConsentement.css';

class InformationConsentement extends React.Component{
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
                <h1>Notice d’information et de consentement</h1>
                <p>Dernière mise à jour : septembre 2021</p>
                <p>MEDDoC est particulièrement soucieuse du respect de la vie privée des personnes et s’assure de traiter leurs données personnelles conformément aux bonnes pratiques en matière de sécurité, et à l’ensemble des lois et textes en vigueur en matière de protection des données personnelles, en particulier le RGPD et Réglementation Applicable aux Données Personnelles.</p>
                <p>Les termes accompagnés d’une majuscule utilisés dans la présente Notice d’information sur la protection des données personnelles des Utilisateurs sont définis <Link to="/a-propos/lexique">ici</Link>.</p>

                <h2>OBJET DE LA PRÉSENTE NOTICE</h2>
                <p>La présente Notice a pour objet de communiquer les engagements pris par MEDDoC pour la protection des Données Personnelles des Utilisateurs, traitées via la Plateforme dans le cadre de ses Services et les informer sur leurs droits à ce titre.</p>
                <p>La présente Notice fait partie intégrante des Conditions Générales d’Utilisation et des Conditions Générales d’Abonnement du Site Internet.</p>
                <h2>QUEL EST LE RÔLE DE MEDDoC?</h2>
                <p>Dans le cadre du traitement des Données Personnelles des Utilisateurs, MEDDoC intervient soit comme Responsable de traitement, soit comme Sous-traitant :</p>
                <ul>
                    <li>MEDDoC intervient comme Sous-traitant pour le compte de chaque Professionnel de Santé abonné aux Services, s’agissant des Données Personnelles que ceux-ci traitent pour la gestion de leur agenda médical en ligne</li>
                    <li>MEDDoC intervient comme Responsable de Traitement s’agissant des Données Personnelles qu’elle traite pour la gestion de l’annuaire médical en ligne, la gestion du Site Internet, la gestion de l’agenda médical des patients s’étant inscrits directement sur la Plateforme.</li>
                </ul>
                
                <h2>QUELLES DONNÉES PERSONNELLES SONT TRAITÉES VIA LA PLATEFORME MEDDoC, ET À QUELLES FINS?</h2>
                <p>MEDDoC traite ou est susceptible de traiter en tant que Sous-Traitant, pour le compte des Professionnel de Santés, les Données Personnelles suivantes :</p>
                <ul>
                    <li>Aux fins de gestion de l’Agenda médical en ligne par le Professionnel de Santé (prise de rendez-vous en ligne, gestion et suivi des rendez-vous médicaux, télésecrétariat lorsque le Professionnel de Santé y a souscrit, génération de statistiques, maintenance de l’Agenda médical en ligne) :</li>
                    <li>Données d’identité : Nom, prénoms (seules données nécessaires à l’inscription), genre, nom de naissance ; prénom ; adresse ; email ; date de naissance, assurance, médecin traitant, téléphone (données optionnelles) ;</li>
                    <li>Données relatives à la vie personnelle : Nombre d’enfants (données optionnelles) ;</li>
                    <li>Données relatives à la vie professionnelle : Profession (données optionnelles) ;</li>
                    <li>Données de santé : données relatives à la prise de rendez-vous (motif du rendez-vous, spécialité du Professionnel de Santé, fréquence du rendez-vous), données relatives au suivi ou au compte rendu du rendez-vous (données du dossier médical collectées éventuellement par le Professionnel de Santé) (données optionnelles).</li>
                    <li>Données d’identité, relatives à la vie personnelle, et/ou de santé, constituant le carnet de santé numérique (CSN) : l’ensemble des documents échangés (ordonnances, comptes-rendus d’examens…) ;</li>
                </ul>
                <p>MEDDoC traite ou est susceptible de traiter en tant que Responsable de Traitement les Données Personnelles suivantes :</p>
                <ul>
                    <li>Aux fins de gestion de l’agenda médical des patients s’étant inscrits directement sur la Plateforme (prise de leurs rendez-vous en ligne), gestion de l’annuaire médical en ligne (mise à disposition d’un annuaire de Professionnel de Santés et de leur notation éventuelle), et gestion du Site Internet et amélioration des Services (login et création de compte, Cookies, Stockage des données) :</li>
                    <li>Données d’identité : Nom, prénom, adresse email, mot de passe ;</li>
                    <li>Données de connexion : adresse IP, log, Identifiant de terminal, identifiant de connexion, information d’horodatage</li>
                    <li>Données de géolocalisation (données optionnelles) ;</li>
                    <li>Cookies : les cookies collectés sont définis et peuvent être paramétrés dans <Link to="/a-propos/informations-cookies">la Notice d’information sur les cookies</Link>.</li>
                </ul>
                
                <h2>INFORMATIONS RELATIVES AUX DONNÉES DE PERSONNELLES DES MINEURS</h2>
                <p>Ces Données Personnelles sont collectées et utilisées aux fins susmentionnées sur la base des fondements juridiques suivants :</p>
                <ul>
                    <li>le contrat (les Conditions Générales d’Utilisation), s’agissant des Données Personnelles d’identité, de vie personnelle, de vie professionnelle, de santé ;</li>
                    <li>le consentement de l’Utilisateur s’agissant des cookies et des données de géolocalisation ;</li>
                    <li>l’intérêt légitime de MEDDoC  visant à assurer le bon fonctionnement et l’amélioration du Site Internet, s’agissant des données de connexion dans le cadre des Services </li>
                </ul>
                
                <h2>QUI A ACCES A VOS DONNÉES PERSONNELLES?</h2>
                <p>Seul le personnel habilité de MEDDoC a accès aux Données Personnelles, notamment aux Données Personnelles pouvant être qualifiées de données de santé.</p>
                <p>MEDDoC ne transmet pas les Données Personnelles à des acteurs commerciaux ou publicitaires.</p>
                <p>MEDDoC peut par ailleurs avoir besoin de recourir aux services de différents Sous-Traitants Ultérieurs afin de fournir les Services. Les Sous-Traitants Ultérieurs peuvent avoir accès à certaines Données Personnelles.</p>
                <p>MEDDoC veille à ce que les mesures nécessaires soient mises en place conformément au RGPD et à la Règlementation Applicable.</p>
                <p>MEDDoC pourrait être également conduite à communiquer les Données Personnelles à une autorité administrative dans le cas où une telle divulgation serait requise par la loi ou pour les besoins d’une procédure judiciaire.</p>
                
                <h2>COMMENT MEDDoC PROTEGE-T-ELLE VOS DONNEES PERSONNELLES ?</h2>
                <p>MEDDoC utilise des mesures techniques et organisationnelles appropriées conçues pour protéger les Données Personnelles traitées via la Plateforme.</p>
                <p>Qu’elle intervienne en tant que Responsable de traitement ou Sous-traitant, MEDDoC prend les mesures nécessaires pour assurer la confidentialité et la sécurité des données traitées via la Plateforme, conformément aux bonnes pratiques en matière de confidentialité et à la législation applicable en matière de données personnelles.</p>

                <h2>PENDANT COMBIEN DE TEMPS VOS DONNÉES PERSONNELLES SONT-ELLES CONSERVÉES PAR MEDDoC ?</h2>
                <p>Les Données Personnelles sont conservées, en base active pendant 3 ans à compter de la dernière activité sur la Plateforme ou dernier échange de l’Utilisateur avec MEDDoC. A l’issue de ce délai, le compte de l’Utilisateur sera considéré comme « inactif » et les Données Personnelles seront alors conservées en archivage intermédiaire. Le compte sera automatiquement désactivé et il appartiendra alors à l’Utilisateur d’en créer un nouveau pour utiliser l’ensemble des Services MEDDoC.</p>
                <p>L’Utilisateur est alerté du fait que le carnet de santé numérique (CSN) est automatiquement supprimé 30 jours après sa clôture par le Professionnel de Santé. Il revient à l’Utilisateur de télécharger le Carnet de santé numérique (CSN) sur son poste pour conservation au-delà de ce délai.</p>
                <p>Les durées de conservation relatives aux cookies sont décrites dans la <Link to="/a-propos/informations-cookies">Notice d’information sur les cookies</Link>.</p>

                <h2>QUELS SONT VOS DROITS CONCERNANT VOS DONNÉES PERSONNELLES ?</h2>
                <p>Conformément au RGPD et à la Règlementation Applicable, l’Utilisateur a le droit de :</p>
                <ul>
                    <li>Accéder à ses données personnelles ;</li>
                    <li>Rectifier ses données personnelles ;</li>
                    <li>Demander l’effacement de ses données personnelles sauf si le traitement est basé sur le respect d’une obligation légale du responsable du traitement ;</li>
                    <li>Demander la limitation du traitement de ses données personnelles dans certaines circonstances ; et</li>
                    <li>Demander la portabilité de ses données personnelles, lorsqu’il est applicable.</li>
                </ul>
                <p>Enfin, l’Utilisateur a le droit de faire part, à une autorité de contrôle compétente, en particulier dans l’Etat membre de sa résidence habituelle, de son lieu de travail ou du lieu où il pense qu’un manquement présumé de ses droits s’est produit, de toute préoccupation concernant la manière dont ses données personnelles sont traitées.</p>

                <h2>LES CONDITIONS DE TRAITEMENT DE VOS DONNÉES PERSONNELLES PEUVENT-ELLES ÉVOLUER ?</h2>
                <p>MEDDoC peut être amené à tout moment à procéder à des modifications du Site Internet, des Services et des présentes CGU, afin de prendre en compte toute évolution légale, réglementaire, jurisprudentielle et/ou technique.</p>
                <p>Les CGU en vigueur dans leur dernière version sont celles consultables sur la Plateforme via le lien <Link to="/a-propos/notice-information-et-consentement" target="_blank" rel="noopener noreferrer">https://www.meddoc.mg/a-propos/notice-information-et-consentement</Link>  accessible depuis le Site par l’Utilisateur qui le reconnait expressément.</p>
                <p>En cas de modification significative de la présente Notice, notamment relatives aux finalités poursuivies, à l’exercice des droits des Utilisateurs au transfert des Données Personnelles, MEDDoC s’engage à en informer les Utilisateurs par tout moyen écrit dans un délai minimum de trente (30) jours avant leur date de prise d’effet, délai durant lequel les Utilisateurs en désaccord avec la nouvelle Notice pourront supprimer leur compte MEDDoC. Passé ce délai, tout accès et utilisation des Services sera soumis à la nouvelle Notice.</p>
                <p>Pour éviter toute ambiguïté, le transfert des CGU au profit d’un tiers du choix de MEDDoC ne constitue pas une modification au sens du présent article.</p>
            </div>
            
        )
    }
}
export default InformationConsentement;