import { useCallback } from 'react';
import { useGoogleReCaptcha} from 'react-google-recaptcha-v3';

const ButtonCaptcha = ({setCaptchaToken, disableButton, classButton, hiddenButton}) => {
    const { executeRecaptcha } = useGoogleReCaptcha();
  
    // Create an event handler so you can call the verification on button click event or form submit
    const reCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) {
            setCaptchaToken(null);
        }else{
            const token = await executeRecaptcha('inscription_professionnel');
            setCaptchaToken(token);
        }
    }, [executeRecaptcha, setCaptchaToken]);
  
    return (
        // <>
                <button type="submit" hidden={hiddenButton} className={classButton} id="" onClick={reCaptchaVerify}>Terminer</button>
            
        // </>
    );
  };
  export default ButtonCaptcha;