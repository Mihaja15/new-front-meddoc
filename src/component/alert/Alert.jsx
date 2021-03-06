import React from 'react';
import './Alert.css';

const Alert = ({ header, bodyMsg , error}) => {
    const [show, setShow] = React.useState(true);
    const [err, setErr] = React.useState(error);
    function handleClick(){
        setShow(false);
        if(!err)
            window.location.reload();
        setErr(false)
    }
    return(
        <div className="alert-content" style={{display:show?"block":"none"}}>
            <div className="dialog-box">
                <div className="alert-header" style={{backgroundColor:err?" #ea526a":"#1b7895"}}>
                    <h2>{header}</h2>
                </div>
                <div className="alert-body">
                    <p>{bodyMsg}</p>
                </div>
                <div className="alert-footer">
                    <a href="#0" onClick={handleClick}>OK</a>
                </div>
            </div>
        </div>
    );
}

export default Alert;