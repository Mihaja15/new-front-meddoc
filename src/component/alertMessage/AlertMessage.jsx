import React from 'react';
import './AlertMessage.css';

const AlertMessage = () => {
    const [show, setShow] = React.useState(true);
    function handleClick(){
        setShow(false);
        localStorage.removeItem('etatshowAvertissement');
    }
    return(
        <div className="alertContent-new-sms" style={{display:show?"block":"none"}}>
            <div className="dialogBox-new-sms">
                <div className="HHHheader-modal-box-head">
                    <div className="alertHeader-new-sms">
                        <h2>Attention</h2>
                    </div>
                </div>
                <div className="BBBody-modal-box-body">
                    <div className="alertBody-new-sms">
                        <div className="alertBody-new-sms-text-header-in-body">
                            Si vous ne faites pas partie des groupes de vaccination ci-dessous, évitez de prendre un rendez-vous ou de téléphoner pour vous faire vacciner. Vous serez informés lorsque votre groupe pourra commencer à prendre rendez-vous.
                        </div>
                        <div>
                            <div className="alertBody-new-sms-text-content-in-body">Quatres catégories ont été pris en compte dans la définition des populations prioritaires pour la vaccination:</div>
                            <ul className="alertBody-new-sms-text-content-ul-in-body">
                                <li>Les professionnels du secteur de la santé et du secteur médico-social</li>
                                <li>Les travailleurs en milieux à risques et de la sécurité publique (policiers, militaires, gendarmes, pompiers, surveillants pénitentiaires…)</li>
                                <li>Des personnes diabétiques ou qui ont des maladies chroniques pouvant être un facteur de comorbidité </li>
                                <li>Les Personnes de 60 ans et plus quel que soit leur lieu de vie et leur état de santé (avec ou sans comorbidités)  </li>
                            </ul>
                        </div>
                        <div className="alertBody-new-sms-text-content-nb-in-body">
                            <span>NB:</span> Vous pouvez prendre rendez-vous pour vos proches qui peuvent être éligible à la vaccination. ===> Onglets “ Mes proches”
                        </div>
                    </div>
                </div>
                <div className="FFFfooter-modal-box-modal">
                    <button className="btn btn-info form-control" onClick={handleClick}>OK</button>
                </div>
            </div>
        </div>
    );
}

export default AlertMessage;