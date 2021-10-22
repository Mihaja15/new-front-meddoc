import React from 'react';
import './Footer.css';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { fetchPostNotLogged } from '../../services/global.service';
import Toaster from '../alert/Toaster';

export default class Footer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            copyright: new Date(),
            email:'',
            erreurMessage:'',
            disableButton:false,
            erreurEtat:false,
            typeError:'success'
        }
    }
    handleChange = (param, e) => {
        this.setState({ [param]: e.target.value })
    }
    changeShow=(value)=>{
        this.setState({erreurEtat:value});
    }
    sendMailToUs=()=>{
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
        let mailParams = {
            email: this.state.email,
            body: 'Cet adresse email a souscrit à MEDDoC: ',
            subject: 'Souscription Meddoc',
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
            <div className="footer-content">
                <div className="container-fluid">
                    <ul className="footer_content_container_fluid_ul">
                        <li className="footer_content_container_fluid_ul_li">
                            <h5 className="footer_content_container_fluid_row_col_h5 footer_content_container_fluid_row_col_h5_v3">À propos de MEDDoC</h5>
                            <ul className="footer_content_container_fluid_row_col_ul">
                                <li><Link to="/a-propos/qui-sommes-nous">Qui sommes-nous ?</Link></li>
                                <li><Link to="/a-propos/mentions-legales">Mentions légales</Link></li>
                                <li><Link to="/a-propos/conditions-generales-d-utilisation">Conditions générales d'utilisation</Link></li>
                                {/* <li><Link to="/a-propos/chartes-de-confidentialite">Charte de confidentialité</Link></li> */}
                                <li><Link to="/a-propos/presse">Presse</Link></li>
                                <li><Link to="/blog">Blog</Link></li>
                            </ul>
                        </li>
                        <li  className="footer_content_container_fluid_ul_li">
                            <h5 className="footer_content_container_fluid_row_col_h5 footer_content_container_fluid_row_col_h5_v3">Nos services</h5>
                            <ul className="footer_content_container_fluid_row_col_ul">
                                <li>Prise de rendez-vous en ligne</li>
                                <li><a className="" href="https://www.pharmaclic.mg" rel="noopener noreferrer" target="_blank">Pharmaclic</a></li>
                            </ul>
                        </li>
                        <li className="footer_content_container_fluid_ul_li">
                            <h5 className="footer_content_container_fluid_row_col_h5 footer_content_container_fluid_row_col_h5_v3">Vous êtes ?</h5>
                            <ul className="footer_content_container_fluid_row_col_ul">
                                <li><Link to="/professionnel-de-sante">Un professionnel de santé ?</Link></li>
                                <li><Link to="/pharmacie">Une pharmacie ?</Link></li>
                            </ul>
                        </li>
                        <li className="footer_content_container_fluid_ul_li">
                            <h5 className="footer_content_container_fluid_row_col_h5 footer_content_container_fluid_row_col_h5_v3">Rejoignez-nous !</h5>
                            <ul className="footer_content_container_fluid_row_col_ul_v2 ">
                                <li className="footer_content_container_fluid_row_col_ul_v2_li">
                                    <a type="button" href="https://www.facebook.com/MEDDOCHC" rel="noopener noreferrer" target="_blank" className="btn-floating btn-fb fbiconFooter fabDesignIconFooter">
                                        <svg fill="#b2d1db" className="footer_content_container_fluid_row_col_ul_v2_li_svg" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" width="30" height="30"><path d="M 19.253906 2 C 15.311906 2 13 4.0821719 13 8.8261719 L 13 13 L 8 13 L 8 18 L 13 18 L 13 30 L 18 30 L 18 18 L 22 18 L 23 13 L 18 13 L 18 9.671875 C 18 7.884875 18.582766 7 20.259766 7 L 23 7 L 23 2.2050781 C 22.526 2.1410781 21.144906 2 19.253906 2 z"/></svg>
                                    </a>
                                </li>
                                <li className="footer_content_container_fluid_row_col_ul_v2_li">
                                    <a type="button" href="https://twitter.com/MEDDOCHC?fbclid=IwAR22YiLf9igYnGtTKCK6OeTQqOCavZAeOC_rDO2bv2366c7ZyuEy1JwTueY" rel="noopener noreferrer" target="_blank" className="btn-floating btn-tw fabDesignIconFooter">
                                        <svg xmlns="http://www.w3.org/2000/svg"  className="footer_content_container_fluid_row_col_ul_v2_li_svg" fill="#b2d1db" width="30" height="30" viewBox="0 0 24 24">
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                        </svg>
                                    </a>
                                </li>
                                <li className="footer_content_container_fluid_row_col_ul_v2_li">
                                    <a type="button" href="https://www.linkedin.com/company/meddocmadagascar/" rel="noopener noreferrer" target="_blank" className="btn-floating btn-tw fabDesignIconFooter">
                                        <svg  className="fab footer_content_container_fluid_row_col_ul_v2_li_svg" xmlns="http://www.w3.org/2000/svg" fill="#b2d1db" width="30" height="30" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                            <h5 className="footer_content_container_fluid_row_col_h5 footer_content_container_fluid_row_col_h5_v2">Nous contacter</h5>
                            <div className="footer_content_container_fluid_row_col_ul_v2_div_v2"><Link to="/nous-contacter"><FontAwesomeIcon className="footer_content_container_fluid_row_col_ul_v2_li_FontAwesomeIcon" icon={faEnvelope}/></Link></div>
                        </li>
                        <li className="footer_content_container_fluid_ul_li">
                            <h5 className="footer_content_container_fluid_row_col_h5 footer_content_container_fluid_row_col_h5_v3 footer_content_container_fluid_row_col_h5_v4">Newsletter</h5>
                            <div className="footer_content_container_fluid_row_col_h5_v3_divinput"><input type="text" value={this.state.email} onChange={this.handleChange.bind(this,'email')} className="footer_content_container_fluid_row_col_h5_v3_input"  placeholder="Votre adresse email" /></div>
                            <div className="footer_content_container_fluid_row_col_h5_v3_divtext"><Link onClick={()=>this.sendMailToUs()}>Je m'inscris !</Link></div>
                            {this.state.erreurEtat?<Toaster type={this.state.typeError} bodyMsg={this.state.erreurMessage} isShow={this.state.erreurEtat} toggleShow={this.changeShow}/>:''}
                        </li>
                    </ul>
                    <div className="footer_content_container_fluid_bas_footer footer-copyright col-md-12 text-center py-3">Copyright  ©  {this.state.copyright.getFullYear()} <span className="copyrightFooter"><b>MEDDoC</b></span></div>
                </div>
            </div>
        )
    }
}