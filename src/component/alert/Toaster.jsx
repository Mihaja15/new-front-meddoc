import { faCheckCircle, faExclamationCircle, faExclamationTriangle, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
// import {Toast, Fade} from 'react-bootstrap/Toast';
import {Collapse, Fade, Toast} from "react-bootstrap";
import './Toaster.css';

const Toaster = ({ type, bodyMsg,isShow,toggleShow}) => {
    // const [bgColor, setBgColor] = React.useState('#fff');
    // const [bodyText, setBodyText] = React.useState('');
    // const [headerText, setHeaderText] = React.useState('');
    // const [show, setShow] = React.useState(false);
    // React.useEffect(()=>{
    //     setBodyText(bodyMsg);
    //     setShow(isShow);
    //     alert(isShow)
    //     if(type.toLowerCase()==='success'){
    //         setBgColor('#82a64e');
    //         setHeaderText('Succès');
    //     }else if(type.toLowerCase()==='error'){
    //         setBgColor('#9a031e');
    //         setHeaderText('Erreur');
    //     }else if(type.toLowerCase()==='warning'){
    //         setBgColor('#ff6c0a');
    //         setHeaderText('Avertissement');
    //     }else if(type.toLowerCase()==='info'){
    //         setBgColor('#0065b3');
    //         setHeaderText('Information');
    //     }
    //     toggleShow(false);
    // },[]);
    function getHeaderText(){
        if(type.toLowerCase()==='success') return 'Succès';
        else if(type.toLowerCase()==='error') return 'Erreur';
        else if(type.toLowerCase()==='warning') return 'Avertissement';
        else if(type.toLowerCase()==='info') return 'Information';
    }
    function getIcon(){
        if(type.toLowerCase()==='success') return <FontAwesomeIcon icon={faCheckCircle}/>;
        else if(type.toLowerCase()==='error') return <FontAwesomeIcon icon={faExclamationTriangle}/>;
        else if(type.toLowerCase()==='warning') return <FontAwesomeIcon icon={faExclamationCircle}/>;
        else if(type.toLowerCase()==='info') return <FontAwesomeIcon icon={faInfoCircle}/>;
    }
    function getBackgroundColor(){
        if(type.toLowerCase()==='success') return '#82a64e';
        else if(type.toLowerCase()==='error') return '#9a031e';
        else if(type.toLowerCase()==='warning') return '#ff6c0a';
        else if(type.toLowerCase()==='info') return '#0065b3';
    }
    return(
        <div className='toaster-container'>
            <Toast show={isShow} style={{backgroundColor:getBackgroundColor()}} animation transition={Collapse} autohide={true} delay={5000} onClose={()=>toggleShow(false)} bg={'warning'}>
                <Toast.Header style={{backgroundColor:getBackgroundColor()}} closeButton={false}>
                    <strong style={{color:'#fff'}}>{getIcon()}{' '+getHeaderText()}</strong>
                    <span className='croix-toast' onClick={()=>toggleShow(false)}><FontAwesomeIcon icon={faTimes}/></span>
                </Toast.Header>
                <Toast.Body style={{backgroundColor:getBackgroundColor(),color:'#fff'}}>{bodyMsg}</Toast.Body>
            </Toast>
        </div>
    );
}

export default Toaster;