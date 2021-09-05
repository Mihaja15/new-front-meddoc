import React from 'react';
import { fetchPost } from '../../services/global.service';

export default class ContactUs extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email : '',
            name:'',
            objet:'',
            message:''
        }
    }
    handleChange = (param, e) => {
        this.setState({ [param]: e.target.value })
    }
    sendMailToUs(e){
        e.preventDefault();
        let mailParams = {
            email: this.state.mail,
            body: this.state.message,
            subject: this.state.objet,
            name:this.state.name,
            reply:true
        }
        fetchPost('/email/send', mailParams
        ).then((result)=>{
            console.log(result.message);
            this.setState({
                sent:true,
                headerAlert:'Message d\'information',
                bodyAlert:'Votre message a été envoyé avec succès'
            });
        }, (error)=>{
            console.log(error);
            this.setState({
                sent:true,
                headerAlert:'Message d\'erreur',
                bodyAlert:'Une erreur s\'est produite',
                error:true
            });
        });
    }
    render(){
        return(
            <div className="contact-us-container">
                <div className="row">
                    <div className="col-md-12">
                        <form id="contactForm" method="post" onSubmit={this.sendMailToUs.bind(this)}>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input type="email" className="form-control" id="mail" name="to_mail" value={this.state.mail} onChange={this.handleChange.bind(this, 'mail')} placeholder="Votre adresse e-mail" required data-error="Veuillez écrire votre adresse e-mail"/>
                                        <div className="help-block with-errors"></div>
                                    </div>                                 
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="name" name="from_name" value={this.state.name} onChange={this.handleChange.bind(this, 'name')} placeholder="Votre nom" required data-error="Veuillez écrire votre nom"/>
                                        <div className="help-block with-errors"></div>
                                    </div>                                 
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" placeholder="L'objet du message" id="objet" className="form-control" name="subject" value={this.state.objet} onChange={this.handleChange.bind(this, 'objet')} required data-error="Veuillez écrire l'objet du message"/>
                                        <div className="help-block with-errors"></div>
                                    </div> 
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group"> 
                                    <textarea className="form-control" id="message"  name="message" value={this.state.message} onChange={this.handleChange.bind(this, 'message')} placeholder="Ecrire un message" rows="4" data-error="Veuillez écrire un message" required></textarea>
                                    <div className="help-block with-errors"></div>
                                    </div>
                                    <div className="submit-button">
                                    <button className="form-control btn btn-info" id="submit" type="submit">ENVOYER</button>
                                    <div id="msgSubmit" className="h3 hidden"></div> 
                                    <div className="clearfix"></div> 
                                    </div>
                                </div>
                            </div>            
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}