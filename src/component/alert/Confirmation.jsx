import React, { Component } from 'react';
// import './Confirmation.css';

// const Confirmation = ({ header, bodyMsg, error}) => {
//     const [show, setShow] = React.useState(true);
//     const [err, setErr] = React.useState(error);
//     function handleClick(validation){
//         setShow(false);
//         // if(!err)
//         //     window.location.reload();
//         setErr(false)
//         // valid(validation);
//     }
//     return(
//         <div className="confirmation-content" style={{display:show?"block":"none"}}>
//             <div className="dialog-box">
//                 <div className="confirmation-header" style={{backgroundColor:"#1b7895"}}>
//                     <h2>{header}</h2>
//                 </div>
//                 <div className="confirmation-body">
//                     <p>{bodyMsg}</p>
//                 </div>
//                 <div className="confirmation-footer">
//                     <a href="#0" onClick={handleClick}>Annuler</a>
//                     <a href="#0" onClick={handleClick}>Accepter</a>
//                 </div>
//             </div>
//         </div>
//     );
// }

class Confirmation extends Component {
    constructor(props){
        super();
        this.state={
            show:false
        }
    }
    handleClick=(validation)=>{
        // this.props.changeConfirmation(validation);
        this.setState({show:false});
    }
    componentDidMount(){
        this.setState({show:this.props.confirmation});
    }
    render(){
        return(
            <div className="confirmation-content" style={{display:this.state.show?"block":"none"}}>
                <div className="dialog-box">
                    <div className="confirmation-header" style={{backgroundColor:"#1b7895"}}>
                        <h2>{this.props.header}</h2>
                    </div>
                    <div className="confirmation-body">
                        <p>{this.props.body}</p>
                    </div>
                    <div className="confirmation-footer">
                        <a href="#0" onClick={this.handleClick(false)}>Annuler</a>
                        <a href="#0" onClick={this.handleClick(true)}>Accepter</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Confirmation;