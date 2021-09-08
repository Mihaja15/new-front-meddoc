import React from 'react';
import './ConditionsUtilisations.css';
import {Link} from 'react-router-dom';

class ConditionsUtilisations extends React.Component{
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
                <h1>Conditions générales d'utilisation</h1>
                <p>Dernière mise à jour : septembre 2021</p>
                <p>MEDDoC, SARLU au capital de 1.000.000 MGA, immatriculée au Registre du Commerce et des Sociétés sous le numéro 2020B00629, dont le siège social est situé à KENTIA DOMICILIATION - Immeuble Jacaranda Ambatonakanga</p>

                <p>Les termes accompagnés d’une majuscule utilisés dans la présente CGU sont définis <Link to="/a-propos/lexique">ici</Link>.</p>

                <h2>1 - MENTIONS LÉGALES</h2>
                <p>Les Services proposés par MEDDoC sont accessibles à l’adresse URL : <a href="https://www.meddoc.mg" rel="noopener noreferrer" target="_blank">www.meddoc.mg</a></p>
                
                <p>Editeur : MEDDoC, SARLU au capital de 1.000.000 MGA, immatriculée au Registre du Commerce et des Sociétés sous le numéro 2020B00629, dont le siège social est situé à KENTIA DOMICILIATION - Immeuble Jacaranda Ambatonakanga</p>
                
                <p>Tél : 032 65 031 58</p>
                <p>email: <a href="mailto:contact@meddoc.mg">contact@meddoc.mg</a></p>
                <ul>
                    <li>Pour toute demande support, accompagnement pour utiliser la solution : envoyer votre demande à support@meddoc.mg</li>
                    <li>Pour toute demande d’accès, de rectification, de suppression, d’opposition au traitement de vos données à caractère personnel, à la limitation du traitement ainsi que votre droit à la portabilité de vos données : </li>
                    <li>Pour toute demande d’information commerciale ou partenariat: <a href="mailto:contact@meddoc.mg">contact@meddoc.mg</a></li>
                </ul>
                <p>Directeur de la publication : Le directeur de la publication est Monsieur Dominique Andriamahefasoa MANOVA, CEO - Fondateur de MEDDoC</p>
                
                <p>Hébergeur : Les données sont hébergées par Amazon Web Services (AWS) certifiée hébergeur de données santé dits “HDS”</p>
                
                
                <h2>2- OBJET ET CHAMP D’APPLICATION DES CONDITIONS GÉNÉRALES D’UTILISATION</h2>
                <p>Les présentes Conditions Générales d’Utilisations ou CGU ont pour objet de définir les conditions d’utilisation de la Plateforme et des Services MEDDoC par l’utilisateur.</p>
                <p>L’utilisateur peut accéder en ligne aux Services via la Plateforme afin de :</p>
                <ul>
                    <li>rechercher et identifier un Professionnel de Santé inscrit sur l’Annuaire médical en ligne ;</li>
                    <li>programmer un rendez-vous sur l’Agenda médical en ligne d’un Professionnel de santé puis bénéficier d’un suivi de la programmation des rendez-vous ;</li>
                    <li>de découvrir d’autres services comme la parapharmacie en ligne</li>
                </ul>
                <h2>3.CAPACITÉ JURIDIQUE, ACCEPTATION ET OPPOSABILITE</h2>
                <p>L’utilisateur s’engage à prendre connaissance des présentes CGU avant d’utiliser les Services de la Plateforme, et disposer de toutes les compétences techniques nécessaires pour y accéder et l’utiliser normalement dans le respect des CGU.</p>
                <p>L’utilisateur déclare avoir obtenu toutes les informations nécessaires concernant les Services et adhère pleinement et sans réserve aux présentes CGU, qu’il s’engage à respecter.</p>
                <p>L’utilisateur reconnaît disposer de la capacité juridique lui permettant de s’engager au titre des présentes CGU.</p>
                <p>L’utilisateur peut utiliser les Services au bénéfice de mineur(s) de moins de quinze ans ou pour le compte de tiers vis-à-vis desquels il est titulaire de l’autorité parentale ou pour lesquels il est reconnu tuteur ou curateur conformément au droit français. MEDDoC se réserve la possibilité de demander à l’utilisateur tout justificatif de nature à établir l’autorité parentale à l’égard du mineur bénéficiaire.</p>
                <p>L’utilisateur ne peut bénéficier des Services proposés sur la Plateforme que sous réserve de l’acceptation des présentes CGU. Les CGU sont acceptées via une case à cocher par l’utilisateur sur la Plateforme, lors de la création de son compte utilisateur. L’utilisateur reconnaît et accepte que son engagement ne nécessite pas de signature manuscrite ou électronique. Les CGU sont opposables dès leur acceptation par l’utilisateur.</p>
                <p>MEDDoC se réserve la faculté de modifier les présentes CGU dans les conditions précisées à l’article « Modifications » des CGU.</p>
                <h2>4.MODALITES D’ACCES A LA PLATEFORME</h2>
                <h3>4.2.  Matériels et configurations prérequis</h3>
                <p>Les Services requièrent la disponibilité d’une configuration internet suffisamment rapide ainsi que d’équipements et moyens matériels permettant d’accéder et de naviguer sur la Plateforme, à la charge et aux frais de l’utilisateur.</p>
                <p>MEDDoC ne pourra être tenue responsable d’un mauvais fonctionnement des Services, ou des conséquences découlant d’un dysfonctionnement ou d’un accès restreint ou dégradé à internet.</p>
                <h3>4.3.  Accès à la Plateforme et création d’un compte utilisateur</h3>
                <p>La plateforme offre différents services en ligne (Annuaire médical en ligne, Agenda médical en ligne).</p>
                <p>L’utilisateur doit créer un compte sur la plateforme pour utiliser les services dans l’ensemble de leurs fonctionnalités.</p>
                <p>Lors de la création de son compte utilisateur sur la plateforme, l’utilisateur est invité à renseigner via un formulaire ses prénom, nom, adresse email et mot de passe, en appliquant à son mot de passe toutes les précautions et mesure de sécurité requises. L’utilisateur s’engage à fournir des informations véridiques, exactes, loyales et non trompeuses, et à veiller à ce que les informations de son compte utilisateur sur la plateforme</p>
                <p>L’utilisateur s’engage à saisir lesdites données sous son entière responsabilité, son contrôle et sa direction et s’engage à ne pas usurper l’identité d’un tiers.</p>
                <p>En tant que simple prestataire technique fournissant la Plateforme, MEDDoC ne contrôle pas l’exactitude des données communiquées par l’utilisateur. MEDDoC se réserve néanmoins le droit de suspendre l’accès au compte de l’utilisateur ou à des Services, dans les conditions prévues à l’Article « Responsabilité » des CGU, dans le cas où l’utilisateur aurait communiqué des données fausses, inexactes, ou non mises à jour.</p>
                
                
                <h3>4.4.  Disponibilité</h3>
                <p>MEDDoC fournit ses meilleurs efforts pour que les services soient accessibles 24/24 heures, 7/7 jours, sous réserve des périodes de suspension, notamment pour des impératifs de maintenance.</p>
                <p>Cependant, l’utilisateur reconnaît et accepte que les systèmes informatiques et de télécommunication ne sont pas exempts de défauts.</p>
                <p>En cas d’interruption ou d’impossibilité d’utilisation des Services, l’utilisateur peut s’adresser à MEDDoC pour obtenir des informations.</p>
                <h3>4.5.  Limites d’utilisation</h3>
                <p>L’accès aux Services est strictement réservé à l’utilisateur qui bénéficie à ce titre d’un droit d’usage privé personnel, non transmissible et exclusif. L’utilisateur est seul responsable de son accès aux Services.</p>
                <p>Les Services ne doivent pas être utilisés de façon abusive et malveillante. Ainsi et de manière générale, l’utilisateur s’engage à utiliser les Services :</p>
                <ul>
                    <li>dans le respect des lois, réglementations et droits des tiers, notamment les droits de propriété intellectuelle de MEDDoC tels que définis à l’Article « Propriété Intellectuelle » des CGU ;</li>
                    <li>de manière loyale et conformément à leur destination ;</li>
                    <li>sous sa responsabilité exclusive.</li>
                </ul>
                <p>MEDDoC se réserve le droit de suspendre l’accès au compte de l’utilisateur ou à des Services, dans les conditions prévues à l’Article « Responsabilité » des CGU, dans le cas où l’utilisateur en ferait un usage abusif ou malveillant.</p>
                <h3>4.6.  Sécurité</h3>
                <p>MEDDoC fait ses meilleurs efforts pour sécuriser la plateforme au regard des risques encourus et de la nature des données qui y sont traitées. En particulier, les Services sont hébergés par un prestataire certifié hébergeur de données de santé: Amazon Web Services (AWS)</p>
                <p>Il est interdit à l'utilisateur d’accéder ou de se maintenir frauduleusement dans tout ou partie de la plateforme, de supprimer ou modifier les données contenues sur la plateforme, d’y introduire frauduleusement des données, d’altérer la Plateforme ou de perturber son bon fonctionnement.</p>
                <p>L’attention de l’utilisateur est attirée sur le fait que son compte utilisateur contient des données susceptibles d’être qualifiées de données de santé, notamment s’agissant du Télédossier. A ce titre, il est alerté sur la nécessité de prendre toutes les précautions pour sécuriser ses données et veiller à ce qu’aucun tiers n’ait accès à son compte.</p>
                <p>L’utilisateur s’engage à accéder et utiliser la Plateforme via une connexion ou un réseau sécurisé. Il s’engage à prendre toutes les mesures appropriées de façon à protéger ses données et matériels de la contamination par des virus ou autres formes d’attaques. Il est responsable de la sécurité de ses données et de son réseau qu’il utilise à ses propres risques.</p>
                <p>L’utilisateur a conscience des risques inhérents à l’utilisation du réseau internet tels qu’un éventuel détournement ; il en accepte les limites et les risques.</p>
                <p>L’utilisateur s'engage à accéder et utiliser les services en respectant les consignes de sécurité, les règles de gestion des accès notamment les éléments d’authentification qu’il garde confidentiels. Il s’engage à modifier ses mots de passe au moins à chaque fois qu’il suspecte une utilisation frauduleuse de son compte.</p>
                <p>L’utilisateur s’engage à avertir immédiatement MEDDoC de toute utilisation non autorisée de son mot de passe et de son identifiant de connexion (adresse email de l’utilisateur), ou de toute connexion en violation de la sécurité de l’accès à son compte.</p>
                <p>Au titre des obligations de sécurité ci-dessus définies, l’utilisateur reconnait et accepte que la responsabilité de MEDDoC ne puisse être engagée notamment en cas d’intrusion, d’altération ou de détournement des données, de toute utilisation illicite ou préjudiciable à l’utilisateur ou à un tiers du réseau.</p>
                
                <h2>5.DESCRIPTION DES SERVICES</h2>
                <h3>5.1.  Rappels préalables</h3>
                <p>Il est rappelé que les Services permettent à l’utilisateur de bénéficier :</p>
                <ul>
                    <li>de l’Annuaire médical en ligne ;</li>
                    <li>de l’Agenda médical en ligne ;</li>
                </ul>
                <p>MEDDoC se réserve le droit de compléter ou de modifier les Services à tout moment.</p>
                <p>Il est également rappelé à titre préalable, que MEDDoC est un simple prestataire technique dans le cadre de la mise à disposition des Services. L’utilisation des Services ne dilue, ne modifie, ou n’atténue, ni directement ni indirectement, la responsabilité et les obligations des Professionnels de santé vis-à-vis de l’utilisateur, chaque Professionnel de Santé exerçant sa pratique professionnelle en toute indépendance, selon ses obligations légales et règlementaires personnelles et sous sa responsabilité exclusive.</p>
                <p>Les Services sont fournis à l’utilisateur à titre gratuit.</p>
                <h3>5.2.  Annuaire médical en ligne</h3>
                <p>L’Annuaire médical en ligne permet à l’utilisateur, connecté ou non à son compte utilisateur, d’identifier des Professionnels de santé inscrits sur la Plateforme sur la base de paramètres de recherche préalablement saisis.</p>
                <p>Il est précisé que :</p>
                <ul>
                    <li>l’Annuaire médical en ligne ne contient pas tous les professionnels de santé compétents et disponibles dans la spécialité et la zone géographique sélectionnées par l’utilisateur, et qu’à ce titre, il appartient à l’utilisateur, s’il le souhaite, d’utiliser tout autre moyen pour identifier d’autres professionnels de santé de son choix ;</li>
                    <li>l’Annuaire médical ne constitue pas un service d’orientation vers un ou plusieurs Professionnels de santé, l’utilisateur conservant le libre choix de son professionnel de santé ;</li>
                    <li>en aucun cas, MEDDoC  ne valide, ne sélectionne ni ne vérifie la compétence des Professionnels de santé inscrits sur la Plateforme ;</li>
                    <li>l’utilisation des Services ne dilue, ne modifie, ou n’atténue, ni directement ni indirectement, la responsabilité et les obligations des Professionnels de santé vis-à-vis de l’utilisateur, chaque Professionnel de Santé exerçant sa pratique professionnelle en toute indépendance, selon ses obligations légales et règlementaires personnelles et sous sa responsabilité exclusive.</li>
                </ul>
                <h3>5.3.  Agenda médical en ligne</h3>
                <p>Après sélection d’un Professionnel de Santé, l’Agenda médical en ligne permet à l’utilisateur de prendre rendez-vous en ligne auprès du Professionnel de Santé qu’il a sélectionné puis de suivre la programmation de son rendez-vous via la réception de messages électroniques et/ou de SMS adressés à l’utilisateur par le Professionnel de Santé,</p>
                <p>Il est précisé que :</p>
                <ul>
                    <li>l’Agenda médical en ligne présente les plages (jours et horaires) de disponibilité des Professionnels de Santé dont ces derniers sont exclusivement responsables ; MEDDoC dégage toute responsabilité en cas d’indisponibilité du Professionnel de Santé ou d’annulation du rendez-vous programmé ;</li>
                    <li>l’utilisateur accepte de recevoir des messages électroniques et/ou des SMS pour les besoins du suivi de la programmation et/ou de l’annulation de son rendez-vous auprès du Professionnel de Santé, les Professionnels de santé étant seuls responsables du contenu, de l’objet, du nombre et de la périodicité des envois de messages électroniques et/ou des SMS à l’utilisateur.</li>
                    <li>la programmation d’un rendez-vous par l’utilisateur constitue un engagement ferme de sa part ; toute non présentation de l’utilisateur à un rendez-vous programmé doit faire l’objet d’une information préalable d’annulation ou de report auprès du Professionnel de santé via le système d’annulation proposé par le Service ou par tout moyen de contact du Professionnel de Santé; l’utilisateur reconnait être informé qu’il assume exclusivement les conséquences de sa non-présentation à un rendez-vous vis-à-vis du Professionnel de Santé concerné.</li>
                </ul>
                <h2>6.RESPONSABILITE</h2>
                <h3>6.1.  Responsabilité de l’utilisateur</h3>
                <p>De manière générale, l’utilisateur reconnait que son utilisation des fonctionnalités de la Plateforme, des Services,, se fait sous son seul contrôle, sa direction, et sa responsabilité exclusive.</p>
                <p>L’utilisateur s’engage à utiliser la Plateforme, son compte personnel et les informations auxquelles il aurait accès dans le respect des conditions d’utilisation des présentes CGU.</p>
                <p>L’utilisateur s’engage à utiliser les Services à des fins strictement personnelles ; il s’interdit d’utiliser les Services à d’autres fins que leur destination définie aux présentes CGU, et notamment il s’interdit de les utiliser à toute fin commerciale, professionnelle ou détournée.</p>
                <p>Dans le cas où l’utilisateur en ferait un usage contraire aux CGU, MEDDoC se réserve le droit de suspendre l’accès au compte de l’utilisateur ou à des Services, de manière temporaire ou définitive, sans préavis, mise en demeure ou indemnité de quelque nature que ce soit, sur simple notification à l’utilisateur via l’adresse email renseignée, ce que l’utilisateur accepte expressément.</p>
                <h3>6.2.  Responsabilité de MEDDoC</h3>
                <p>Il est rappelé à titre préalable, et l’utilisateur reconnaît que le rôle de MEDDoC se limite à celui d’un simple intermédiaire et prestataire technique dans le cadre de la mise à disposition des Services. Il n’est en aucun cas en mesure de procéder à la vérification, à la surveillance, à l’évaluation et/ou au contrôle des données saisies sur la plateforme par l’utilisateur ou par le Professionnel de Santé qui restent sous leurs seuls responsabilités et contrôles respectifs.</p>
                <p>MEDDoC est tenue à une simple obligation de moyens pour offrir à l’utilisateur des informations et une offre de service de qualité. Elle ne saurait être responsable de tout dommage direct ou indirect résultant notamment :</p>
                <ul>
                    <li>de l’utilisation des Services par l’utilisateur, notamment pour toute décision médicale, qui relèvent de la seule responsabilité des Professionnels de santé choisis par l’utilisateur ou de l’utilisateur lui-même ;</li>
                    <li>des éventuelles difficultés notamment d’accès ou dysfonctionnement tels que mentionnés à l’Article « Sécurité » des CGU ;</li>
                    <li>des développements mis à la disposition de l’utilisateur sur la Plateforme mais dont MEDDoC n’est pas propriétaire ;</li>
                    <li>d’une inexécution ou de la mauvaise exécution des CGU imputables à l’utilisateur.</li>
                </ul>
                <h3>6.3.  Responsabilité du Professionnel de Santé</h3>
                <p>De manière générale, l’utilisateur reconnait que MEDDoC n’est aucunement responsable de l’utilisation des fonctionnalités de la Plateforme, des Services, de l’Interface de Téléconsultation par le Professionnel de Santé ou son Personnel Autorisé. Cette utilisation par le Professionnel de Santé se fait sous son contrôle, sa direction, et sa responsabilité exclusifs.</p>
                <h2>7.PROPRIETE INTELLECTUELLE</h2>
                <p>Tous les éléments de la Plateforme et des Services, dans leurs versions actuelles ou futures, sont, sauf information publique ou mention contraire, la propriété intellectuelle exclusive de MEDDoC</p>
                <p>A ce titre, toute représentation totale ou partielle de la Plateforme et des Services, et, sans que cette liste soit limitative, toute adaptation, traduction, modification, non autorisée expressément par MEDDoC est interdite et constitue une contrefaçon sanctionnée conformément aux dispositions du Code de la propriété intellectuelle.</p>
                <p>Il en est de même, et sans que cette liste soit exhaustive, des bases de données, codes sources, fonctionnalités, marques, logo, design figurant sur la Plateforme.</p>
                <p>En tout état de cause, toute copie autorisée préalablement et expressément par MEDDoC, de tout ou partie du contenu de la Plateforme, devra porter la mention « Tous droits réservés à MEDDoC ».</p>
                <p>Sous réserve de ce qui précède et du parfait respect des termes des CGU et dans la stricte limite de ce qui est nécessaire à l’utilisation des Services et de la Plateforme par l’utilisateur, la Société concède à l’utilisateur qui l’accepte, à titre gratuit, le droit révocable, non-cessible, non-exclusif, non-transmissible, d’utiliser les Services et la Plateforme, dans le monde entier, pour une utilisation personnelle.</p>
                <p>L’utilisation des services par l’utilisateur ne peut en aucun cas être interprétée comme une cession de droits de propriété intellectuelle.</p>
                <h2>8.DONNEES PERSONNELLES & COOKIES</h2>
                <p>L’Utilisateur consent au traitement de ses données personnelles dans les conditions décrites dans la <Link>Notice d’information relative au traitement de vos données personnelles</Link> , ainsi que la <Link>Notice d’information sur les cookies</Link> qui détaillent également les droits dont l’Utilisateur dispose à ce titre.</p>
                <p>L’Utilisateur est expressément invité à prendre connaissance desdits documents.</p>
                <h2>9.MODIFICATIONS</h2>
                <p>MEDDoC est libre de procéder à tout moment à des modifications des présentes CGU, notamment afin de prendre en compte toute évolution légale, réglementaire, jurisprudentielle et/ou technique. L’utilisateur est invité à consulter régulièrement les CGU afin de prendre connaissance des modifications apportées.</p>
                <p>En cas de modification significative des CGU, MEDDoC s’engage à en informer l’utilisateur par tout moyen dans un délai minimum de trente (30) jours avant leur date de prise d’effet.</p>
                <p>Pour éviter toute ambiguïté, le transfert des CGU au profit d’un tiers du choix de MEDDoC ne constitue pas une modification au sens du présent article.</p>
                
                <h2>10.RESILIATION</h2>
                <p>L’utilisateur peut à tout moment résilier de son compte en contactant MEDDoC.</p>
                <p>Chaque utilisateur reconnait être informé et accepte que MEDDoC suspend son compte immédiatement en cas de manquement à l’une quelconque des obligations décrites aux CGU ou à la législation en vigueur, sans préavis, ni mise en demeure, ni indemnité de quelque nature que ce soit, et sur simple notification à l’utilisateur via l’adresse email renseignée.</p> 
                <h2>11.STIPULATIONS DIVERSES</h2>
                <h3>11.1.  Sous-traitance et transfert</h3>
                <p>Les présentes CGU pourront faire l’objet d’une sous-traitance de la part de MEDDoC ou d’un transfert à toute entité qui viendrait aux droits et obligations de MEDDoC.</p>
                <h3>11.2.  Force majeure</h3>
                <p>Dans un premier temps, les cas de force majeure suspendront l’exécution des présentes CGU.</p>
                <p>Si les cas de force majeure ont une durée d’existence supérieure à trois mois, les présentes CGU seront résiliées automatiquement, sauf accord contraire lorsque le Professionnel de Santé a souscrit à cette option.</p>
                <p>Sont considérés comme cas de force majeure ou cas fortuits, ceux habituellement retenus par la jurisprudence des cours et tribunaux français.</p>
                <h3>11.3.  Interprétation</h3>
                <p>En cas de difficultés d’interprétation d’une quelconque stipulation présente dans les CGU, celle-ci sera déclarée inexistante.</p>
                <h3>11.5.  Preuve</h3>
                <p>En sus des dispositions légales reconnaissant la valeur probante de l’écrit numérique, l’utilisateur reconnait la validité et la force probante des courriers électroniques, des SMS, et des notifications effectuées par MEDDoC, des documents numérisés échangés entre eux dans le cadre des Services, de l’utilisation des fonctionnalités par l’utilisateur, ainsi que de tous enregistrements électroniques conservés par MEDDoC dans le cadre des Services.</p>
                <p>La conservation et l’archivage des informations et des données sont effectués sur un support fiable et durable conformément à l’article 1379 du Code Civil.</p> 

                <h2>12.DROIT APPLICABLE</h2>
                <p>Les présentes CGU sont soumises au droit malgache et à la compétence des tribunaux compétents d’Antananarivo</p>
                <p>Lorsqu’il utilise les Services, l’utilisateur étranger accepte expressément l’application de la loi française.</p>

            </div>
            
        )
    }
}
export default ConditionsUtilisations;