import { useCallback, useEffect } from 'react';
import {useGoogleReCaptcha} from 'react-google-recaptcha-v3';

const CaptchaButton = ({setCaptchaToken, disableButton, hiddenButton}) => {
    const { executeRecaptcha } = useGoogleReCaptcha();
  
    // Create an event handler so you can call the verification on button click event or form submit
    const reCaptchaVerify = useCallback(async () => {
        //console.log(executeRecaptcha);
        if (!executeRecaptcha) {
            //console.log('Execute recaptcha not yet available');
            setCaptchaToken(null);
        }else{
            const token = await executeRecaptcha('connexion');
            // alert(token)
            setCaptchaToken(token);
        }
        // Do whatever you want with the token
    }, [executeRecaptcha,setCaptchaToken]);
  
    // You can use useEffect to trigger the verification as soon as the component being loaded
    useEffect(() => {
        reCaptchaVerify();
    }, [reCaptchaVerify]);
    if(disableButton)
        return <a className="bouton-solid-reg popup-with-move-anim a1" style={{textAlign:"center"}} hidden={hiddenButton} id="sonboutonConnecter" href="#invalide">Se connecter</a>;
    else
        return <a className="bouton-solid-reg popup-with-move-anim a1" style={{textAlign:"center"}} hidden={hiddenButton} id="sonboutonConnecter" href="#details-lightbox-1" onClick={reCaptchaVerify}>Se connecter</a>;
  };
  export default CaptchaButton;