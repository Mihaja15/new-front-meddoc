import React from 'react';
import './ContactUs.css';
import { fetchPostNotLogged } from '../../services/global.service';
import Toaster from '../alert/Toaster';

export default class ContactUs extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email : '',
            name:'',
            objet:'',
            message:'',
            erreurMessage:'',
            erreurEtat:false,
            typeError:'success',
            disableButton:false,
        }
    }
    handleChange = (param, e) => {
        this.setState({ [param]: e.target.value })
    }
    changeShow=(value)=>{
        this.setState({erreurEtat:value});
    }
    sendMailToUs(e){
        e.preventDefault();
        this.setState({disableButton:true});
        if(this.state.email===''){
            this.setState({typeError:'error', erreurEtat:true, erreurMessage:'Adresse e-mail: champ obligatoire!', disableButton:false});
            return;
        }else{
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if(!pattern.test(this.state.email)){
                this.setState({typeError:'error', erreurEtat:true, erreurMessage:'Adresse e-mail invalide!', disableButton:false});
                return;
            }
        }
        if(this.state.name===''){
            this.setState({typeError:'error', erreurEtat:true, erreurMessage:'Saisissez votre nom!', disableButton:false});
            return;
        }
        if(this.state.objet===''){
            this.setState({typeError:'error', erreurEtat:true, erreurMessage:"Saisissez l'objet d'email!", disableButton:false});
            return;
        }
        if(this.state.message===''){
            this.setState({typeError:'error', erreurEtat:true, erreurMessage:'Ecrivez votre message!', disableButton:false});
            return;
        }
        let mailParams = {
            email: this.state.email,
            body: this.state.message,
            subject: this.state.objet,
            name:this.state.name,
            reply:true
        }
        fetchPostNotLogged('/email/send', mailParams
        ).then((result)=>{
            console.log(result.message);
            this.setState({typeError:'success', erreurEtat:true, erreurMessage:'Votre message a été envoyé avec succès.', disableButton:false});
            window.location.reload();
        }, (error)=>{
            console.log(error);
            this.setState({typeError:'error', erreurEtat:true, erreurMessage:'Une erreur s\'est produite!', disableButton:false});
        });
    }
    render(){
        return(
            <div className="contact-us-container">
                <div className="container">
                    <div className="row">
                        <h4 className="col-md-12">Contactez-nous pour plus d'info</h4>
                        <div className="col-md-8">
                            <form id="contactForm" method="post" onSubmit={this.sendMailToUs.bind(this)}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input type="email" className="form-control" id="mail" name="to_mail" value={this.state.email} onChange={this.handleChange.bind(this, 'email')} placeholder="Votre adresse e-mail" required={false} data-error="Veuillez écrire votre adresse e-mail"/>
                                            <div className="help-block with-errors"></div>
                                        </div>                                 
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" id="name" name="from_name" value={this.state.name} onChange={this.handleChange.bind(this, 'name')} placeholder="Votre nom" required={false} data-error="Veuillez écrire votre nom"/>
                                            <div className="help-block with-errors"></div>
                                        </div>                                 
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" placeholder="L'objet du message" id="objet" className="form-control" name="subject" value={this.state.objet} onChange={this.handleChange.bind(this, 'objet')} required={false} data-error="Veuillez écrire l'objet du message"/>
                                            <div className="help-block with-errors"></div>
                                        </div> 
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group"> 
                                        <textarea className="form-control" id="message"  name="message" value={this.state.message} onChange={this.handleChange.bind(this, 'message')} placeholder="Ecrire un message" rows="4" data-error="Veuillez écrire un message" required={false}></textarea>
                                        <div className="help-block with-errors"></div>
                                        </div>
                                        <div className="submit-button">
                                        <button className="form-control btn btn-info" hidden={this.state.disableButton} id="submit" type="submit">ENVOYER</button>
                                        <div hidden={!this.state.disableButton} className="login-loader"></div>
                                        {this.state.erreurEtat?<Toaster type={this.state.typeError} bodyMsg={this.state.erreurMessage} isShow={this.state.erreurEtat} toggleShow={this.changeShow}/>:''}
                                        <div id="msgSubmit" className="h3 hidden"></div> 
                                        <div className="clearfix"></div> 
                                        </div>
                                    </div>
                                </div>            
                            </form>
                        </div>
                        <div className="col-md-4">
                            <div className="row">
                                <p className="col-md-12"><b>e-mail :</b> <a href="mailto:contact@meddoc.mg">contact@meddoc.mg</a></p>
                                <p className="col-md-12"><b>Tél :</b> <a href="tel:0326503158">032 65 031 58</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}