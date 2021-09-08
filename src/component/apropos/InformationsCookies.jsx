import React from 'react';
import {Link} from 'react-router-dom';
import './InformationsCookies.css';

class InformationsCookies extends React.Component{
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
                <h1>Informations sur les cookies</h1>
                <h1>Charte sur les cookies</h1>
                
                <h2>L’utilisation des Cookies lors de votre visite sur le site</h2>
                <p>Au cours de votre utilisation du Site, des Cookies peuvent être déposés sur votre terminal et notamment votre ordinateur, votre tablette ou encore votre smartphone.</p>
                <p>Nous utilisons ces Cookies pour nous aider à reconnaître votre navigateur ou votre appareil, conserver vos préférences, vous fournir certaines fonctionnalités, ou bien collecter des informations sur vos interactions avec nous, telles que la fréquentation de notre site.</p>
                <p>En donnant votre consentement, vous acceptez que le site puisse utiliser les Cookies. Vous pouvez à tout moment désactiver ces Cookies à partir de la console de paramétrage des Cookies.</p>
                
                <h2>Qu’est-ce qu’un Cookie et quelle est son utilité ?</h2>
                <p>Les Cookies sont de petits fichiers texte déposés sur votre ordinateur lors de la visite d’un site ou de la consultation d’une publicité. Ils ont notamment pour but de collecter des informations relatives à votre navigation sur les sites et de vous adresser des services personnalisés.</p>

                <h2>Les Cookies fonctionnels</h2>
                <p>Ces Cookies sont nécessaires au fonctionnement technique de notre Site et ne peuvent être désactivés, comme par exemple l’authentification des utilisateurs, ou la sauvegarde des choix fonctionnels des utilisateurs.</p>
                <p>Les Cookies fonctionnels déposés sur votre ordinateur sont les suivants : kd-jwt-patients.</p>

                <h2>Les Cookies optionnels</h2>
                <p>Notre site est susceptible de contenir des Cookies de mesure d’audience de services tiers, tels que ceux de Google Analytics. Ils permettent, pendant la durée de validité de ces Cookies, de suivre l’origine, le volume et les interactions de tous les visiteurs du site afin d’améliorer votre expérience utilisateur.</p>
                <p>L’émission et l’utilisation de ces cookies et autres traceurs par des tiers sont soumises à leur propre politique de protection de la vie privée. Pour plus d'informations concernant ces traitements, vous pouvez vous reporter à leur politique de confidentialité. Google Analytics : https://marketingplatform.google.com/about/analytics/terms/fr/</p>
                <p>Les cookies tiers susceptibles d’être déposés sur votre ordinateurs sont les suivants : _ga, _gat, _gid, __utma, __utmb, __utmc, __utmt, __utmz</p>

                <h2>Accepter ou refuser les Cookies</h2>
                <p>Vous pouvez à tout moment choisir de désactiver ces cookies depuis la console de paramétrage des Cookies présente sur le Site. Vous pouvez accepter ou refuser les cookies au cas par cas ou bien les refuser systématiquement une fois pour toutes.</p>
                <p>Votre navigateur peut également être paramétré pour vous signaler les cookies qui sont déposés dans votre ordinateur et vous demander de les accepter ou non.</p>

                <h2>Plus d’informations sur les Cookies</h2>
                <p>Pour connaître les modalités applicables à la gestion des Cookies stockés dans votre navigateur, nous vous invitons à consulter le menu d’aide de votre navigateur ainsi que la rubrique « Vos traces » du site de la CNIL (Commission Nationale de l’Informatique & des Libertés).</p>
                <p>Pour toute demande d’accès, de rectification, de suppression, d’opposition au traitement de vos données à caractère personnel, à la limitation du traitement ainsi que votre droit à la portabilité de vos données <Link>link</Link></p>
            </div>
            
        )
    }
}
export default InformationsCookies;