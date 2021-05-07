import React, {Component} from 'react';
import './Assistance.css';
import Alert from '../alert/Alert';
import $ from 'jquery'; 
import { fetchPost } from '../../services/global.service';
class Assistance extends Component{
    constructor(props){
        super();
        this.state={
            nav: false,
            sent:false,
            error:false,
            headerAlert:'',
            bodyAlert:'',
            email : '',
            mail:'',
            name:'',
            objet:'',
            message:''
        }
    }
    sendMail(e){
        e.preventDefault();
        let mailParams = {
            email: this.state.email,
            body: 'Cet adresse email a souscrit à MEDDoC: ',
            subject: 'Souscription Meddoc',
            name:'User'
        }
        fetchPost('/email/send', mailParams
        ).then((result) => {
            console.log(result.text);
            this.setState({
                sent:true,
                headerAlert:'Message d\'information',
                bodyAlert:'Votre adresse adress email a été ajouté avec succès'
            });
        }, (error) => {
            console.log(error.message)
            this.setState({
                sent:true,
                headerAlert:'Message d\'erreur',
                bodyAlert:'Une erreur s\'est produite',
                error:true
            });
            // alert('Une erreur s\'est produite');
        });
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
            console.log('erreur : ',result.message);
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
    handleChange = (param, e) => {
        this.setState({ [param]: e.target.value })
    }
    componentDidMount(){
        window.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll= () => {
        if (window.pageYOffset > 190) {
                this.setState({ nav: true});
        }else{
                this.setState({ nav: false});
        }
        this.setState({scrollTop: $(window).scrollTop()});
    }
    scrollToTop() {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
    }
    goToContactUs(){
        let rect = document.getElementById('contactForm').getBoundingClientRect();
        console.log(rect);
        window.scrollTo({top: rect.top+rect.y, left:0, behavior: 'smooth' });
    }
    showAlert=()=>{
        if(this.state.sent){
            return <Alert header={this.state.headerAlert} bodyMsg={this.state.bodyAlert} error={this.state.error} />;
        }
    }
    render(){
        return (
           <div className=" container div-assistance-new">
                <div className="besoin-d-aide-assistance">Besoin d’aide?</div>
                <div className="besoin-text-assistance">Si vous éprouvez des difficultés pour prendre votre rendez-vous en ligne, demandez l’aide de vos proches ou consultez la page “Marche à suivre pour l’inscription à la vaccination contre la COVID-19” qui vous guidera étape par étape dans la prise de rendez-vous.</div>
                <div className="besoin-text-assistance">Au besoin, il est possible d’obtenir de l’aide en appelant de 8h à 20h du lundi au vendredi au : 0326503158.</div>
                <div className="row">
                    <div className="col-lg-2 col-md-12"></div>
                    <div className="col-lg-8 col-md-12 div-indisponsable-assistance">
                        <form id="contactForm" method="post" onSubmit={this.sendMailToUs.bind(this)}>
                            <div className="row">
                                <div className="col-md-12 big-title-champs-aide-assistance">Contactez-nous</div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input type="email" className="form-control" id="mail" name="to_mail" value={this.state.mail} onChange={this.handleChange.bind(this, 'mail')}placeholder="Votre adresse e-mail" required data-error="Veuillez écrire votre adresse e-mail"/>
                                        <div className="help-block with-errors"></div>
                                    </div>                                 
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="name" name="from_name" value={this.state.name}  onChange={this.handleChange.bind(this, 'name')} placeholder="Votre nom" required data-error="Veuillez écrire votre nom"/>
                                        <div className="help-block with-errors"></div>
                                    </div>                                 
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" placeholder="L'objet du message" id="objet" className="form-control" name="subject" value={this.state.objet} onChange={this.handleChange.bind(this, 'objet')}  required data-error="Veuillez écrire l'objet du message"/>
                                        <div className="help-block with-errors"></div>
                                    </div> 
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group"> 
                                    <textarea className="form-control" id="message"  name="message" value={this.state.message} onChange={this.handleChange.bind(this, 'message')}  placeholder="Ecrire un message" rows="4" data-error="Veuillez écrire un message" required></textarea>
                                    <div className="help-block with-errors"></div>
                                    </div>
                                    <div className="submit-button">
                                    <button className="form-control sendButton btn-info" id="submit" type="submit" style={{backgroundColor: "#39c3ef"}}>ENVOYER</button>
                                    <div id="msgSubmit" className="h3 hidden"></div> 
                                    <div className="clearfix"></div> 
                                    </div>
                                </div>
                            </div>            
                        </form>
                    </div>
                    <div className="col-lg-2 col-md-12"></div>
                </div>
           </div>
        )
    }
}
export default Assistance;