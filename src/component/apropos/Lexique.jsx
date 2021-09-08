import React from 'react';
// import './Lexique.css';

class Lexique extends React.Component{
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
                <h1>Lexique</h1>
                
                <h2>Définitions</h2>
                <p><b>Abonné :</b> Tout Professionnel de santé ayant souscrit aux CGA pour utiliser les Services dans le cadre de l’exercice de sa profession.</p>
                <p><b>Abonnement :</b> Fait, pour l’Abonné, de souscrire au service de base de MEDDoC, à savoir l’Agenda médical, par l’acceptation des CGA et paiement du prix.</p>
                <p><b>Annuaire médical en ligne :</b> Fonctionnalité de la Plateforme permettant à l’Utilisateur de rechercher et d’identifier un Professionnel de Santé.</p>
                <p><b>Annexe Protection des Données Personnelles :</b> Annexe, formant partie des CGA, définissant les conditions dans lesquelles MEDDoC s’engage à effectuer pour le compte de l’Abonné les traitements de Données Personnelles des Utilisateurs dans le cadre des Services.</p>
                <p><b>Agenda médical en ligne :</b> Fonctionnalité du Site Internet permettant (i) à l’Utilisateur de planifier un rendez-vous sur la Plateforme auprès du Professionnel de Santé de son choix et de suivre la planification de ses rendez-vous, (ii) au Professionnel de Santé de gérer en ligne ses rendez-vous. Il s’agit du service de base de MEDDoC.</p>
                <p><b>CNIL :</b> Commission nationale de l’informatique et des libertés, autorité de contrôle française compétente en matière de protection des Données Personnelles.</p>
                <p><b>Conditions Générales d’Abonnement de la Plateforme ou CGA :</b> Document précisant les conditions d’Abonnement aux Services.</p>
                <p><b>Conditions Générales d’Utilisation ou CGU :</b> Document définissant les conditions d’utilisation de la Plateforme et des Services MEDDoC par l’Utilisateur.</p>
                <p><b>Données Personnelles :</b> Toute information se rapportant à une personne physique identifiée ou identifiable. Est réputée être une « personne physique identifiable » toute personne physique qui peut être identifiée, directement ou indirectement, notamment par référence à un identifiant, tel qu’un nom, un numéro d’identification, des données de localisation, un identifiant en ligne, ou à un ou plusieurs éléments spécifiques propres à son identité physique, physiologique, génétique, psychique, économique, culturelle ou sociale.</p>
                <p><b>Identifiant :</b> L’identifiant utilisé par l’Utilisateur, lui permettant d’accéder aux Services sur la Plateforme. Il s’agit de son adresse électronique ou son numéro de téléphone et de son mot de passe.</p>
                <p><b>Information(s) confidentielle(s) :</b> Toutes données y compris Donnée personnelle, informations de nature financière, juridique, commerciale, technique, informatique ou administrative que les Parties pourraient se communiquer, directement ou indirectement, par écrit ou oralement, sous quelque forme que ce soit en raison de leur nature ou des circonstances de leur divulgation qui peuvent être raisonnablement considérées comme confidentielles.</p>
                <p><b>MEDDoC :</b> MEDDoC, SARLU au capital de 1.000.000 MGA, immatriculée au Registre du Commerce et des Sociétés sous le numéro 2020B00629, dont le siège social est situé à KENTIA DOMICILIATION - Immeuble Jacaranda Ambatonakanga</p>
                <p>Tél : 032 65 031 58 / email: <a href="mailto:contact@meddoc.mg">contact@meddoc.mg</a></p>
                <p><b>Règlementation Applicable :</b> Le RGPD, la Loi Informatique et Libertés ainsi que toutes autres règles, normes, codes, référentiels et guides applicables à la protection des Données Personnelles.</p>
                <p><b>Notice d’Information sur la Protection des Données Personnelles des Utilisateurs :</b> Notice décrivant les conditions dans lesquelles les Données Personnelles sont traitées via la Plateforme.</p>
                <p><b>Partie(s) :</b> Au singulier MEDDoC  ou l’Abonné, et au pluriel, MEDDoC et l’Abonné.</p>
                <p><b>Personnel(s) Autorisé(s) :</b> Tout tiers dûment autorisé par l’Abonné à utiliser les Services.</p>
                <p><b>Professionnel(s) de Santé :</b> Tout praticien de santé exerçant à titre libéral, tout centre ou établissement de santé, personne morale de droit privé ou personne morale de droit public, que l’Utilisateur peut contacter via la Plateforme.</p>
                <p><b>Responsable de traitement :</b> Au sens de la Loi, la personne qui détermine les moyens et les finalités du traitement. Le Professionnel de Santé et MEDDoC sont respectivement Responsable de traitement pour certaines finalités distinctes :</p>
                <ul>
                    <li>MEDDoC intervient comme Sous-traitant pour le compte de chaque Professionnel de Santé abonné aux Services, s’agissant des Données Personnelles que ceux-ci traitent pour la gestion de leur agenda médical en ligne </li>
                    <li>MEDDoC intervient comme Responsable de Traitement s’agissant des Données Personnelles qu’elle traite pour la gestion de l’annuaire médical en ligne, la gestion du Site Internet, la gestion de l’agenda médical des patients s’étant inscrits directement sur la Plateforme.</li>
                </ul>
                <p><b>RGPD :</b> Réglementation relative à la protection des données personnelles.</p>
                <p><b>Service(s) :</b> Ensemble des offres de services proposées aux Utilisateurs et aux Professionnels de Santé, leur permettant d’accéder à :</p>
                <ul>
                    <li>l’Annuaire médical en ligne, permettant :
                        <ul>
                            <li>à l’Utilisateur de rechercher et d’identifier un professionnel de Santé ;</li>
                            <li>au Professionnel de Santé de publier son profil professionnel et identifier un autre professionnel de Santé;</li>
                        </ul>
                    </li>
                    <li>l’Agenda médical en ligne permettant :
                        <ul>
                            <li>à l’Utilisateur de planifier un rendez-vous sur la Plateforme auprès du Professionnel de Santé de son choix, de suivre la planification de ses rendez-vous, avec un suivi automatique par SMS ou par email;</li>
                            <li>au Professionnel de Santé de gérer ses rendez-vous et sa patientèle, avec un suivi automatique par SMS ou par email, obtenir des statistiques sur son activité, et disposer d’un espace privé d’échanges au sein de son cabinet ;</li>
                        </ul>
                    </li>
                    <li>Pharmaclic:
                        <ul>
                            <li>la parapharmacie en ligne</li>
                        </ul>
                    </li>
                </ul>
                <p><b>Sous-Traitant(s) :</b> Au sens de la réglementation, la personne qui traite des Données Personnelles pour le compte, sur instruction et sous l’autorité d’un Responsable de Traitement. MEDDoC intervient comme Sous-traitant pour le compte des Professionnel de Santé pour certaines finalités.</p>
                <p><b>Sous-Traitant(s) Ultérieur(s) :</b> Au sens de la réglementation, la personne à laquelle le sous-traitant peut faire appel pour mener certaines activités de traitement pour le compte du Responsable de traitement. MEDDoC peut faire appel à des Sous-Traitants Ultérieurs pour certaines prestations réalisées pour le compte des Professionnel de Santé.</p>
                <p><b>Carnet de santé numérique (CSN) :</b> Dossier médical concernant l’Utilisateur</p>
                <p><b>Traitement(s) :</b> Toute opération ou tout ensemble d’opérations effectué ou non à l’aide de procédés automatisés et appliqué à des Données Personnelles, telles que la collecte, l’enregistrement, l’organisation, la structuration, la conservation, l’adaptation ou la modification, l’extraction, la consultation, l’utilisation, la communication par transmission, la diffusion ou toute autre forme de mise à disposition, le rapprochement ou l’interconnexion, la limitation, l’effacement ou la destruction.</p>
                <p><b>Plateforme :</b> Site Internet MEDDoC incluant les services proposés</p>
                <p><b>Utilisateur(s) :</b> Toute personne physique utilisant la Plateforme, bénéficiant ou non d’un compte Utilisateur.</p>
                <p><b>Violation(s) de Données Personnelles :</b> Toute violation de sécurité entraînant, de manière accidentelle ou illicite, la destruction, la perte, l’altération, la divulgation non autorisée de Données personnelles transmises, traitées ou conservées de façon non conforme aux instructions de l’Abonné et à la Règlementation Applicable, ou accès non autorisé à de telles Données Personnelles.</p>
            </div>
            
        )
    }
}
export default Lexique;