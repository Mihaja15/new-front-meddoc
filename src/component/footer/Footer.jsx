import React from 'react';
// import './Footer.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import meddoc from '../../assets/logo/MEDDOC.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpen, faHome, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';

class Footer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            copyright : new Date()
        }
    }
    render(){
        return(
            <div className="page-footer footer-area">

                <div className="footer-container row">

                    <div className="col-md-12 footer-front row">

                        <div className="col-md-3 col-lg-3 mr-auto my-md-4 my-0 mt-4 mb-1">

                            <div><img src={meddoc} alt="icon meddoc" className="imageFooter" /></div>

                        </div>
                        <div className="col-md-4 col-lg-3 mx-auto my-md-4 my-0 mt-4 mb-1">

                            <h5 className="font-weight-bold text-uppercase mb-4 titleH5Footer">A propos</h5>
                            <hr className="hrFooter"/>
                            <ul className="list-unstyled">
                                <li className="pListeFooter">
                                    <a href="/inscription-professionnel-sante">Inscription centre de vaccination</a>
                                </li>
                                <li className="pListeFooter">
                                    <a href="/connexion-centre">Connexion centre de vaccination</a>
                                </li>
                                <li className="pListeFooter">
                                    <a href="/landing-page">Qui sommes-nous ?</a>
                                </li>
                                <li className="pListeFooter">
                                    <a href="/landing-page">Nous contacter</a>
                                </li>
                                {/* <li className="pListeFooter">
                                    <a href="/">FAQ</a>
                                </li> */}
                                <li className="pListeFooter">
                                    <a href="/">Conditions générales d'utilisation</a>
                                </li>
                                <li className="pListeFooter">
                                    <a href="/">Charte de confidentialité</a>
                                </li>
                            </ul>

                        </div>

                        <hr className="clearfix w-100 d-md-none"/>

                        <div className="col-md-3 col-lg-4 mx-auto my-md-4 my-0 mt-4 mb-1">

                            <h5 className="font-weight-bold text-uppercase mb-4 titleH5Footer">Adresse</h5>
                            <hr className="hrFooter"/>
                            <ul className="list-unstyled">
                                <li>
                                    <p className="pListeFooter"><FontAwesomeIcon icon={faHome}/> Immeuble Jacaranda : KENTIA Domiciliation Ambatonankanga Antananarivo 101 Madagascar</p>
                                </li>
                                <li>
                                    <p className="pListeFooter"><FontAwesomeIcon icon={faEnvelopeOpen}/> contact@meddoc.mg</p>
                                </li>
                                <li>
                                    <p className="pListeFooter"><FontAwesomeIcon icon={faPhoneAlt}/> +261 32 65 031 58</p>
                                </li>
                            </ul>

                        </div>
                        <hr className="clearfix w-100 d-md-none"/>

                        <div className="col-md-2 col-lg-2 text-center mx-auto my-4">

                            <h5 className="font-weight-bold text-uppercase mb-4 titleH5Footer">Nous suivre</h5>
                            <hr className="hrFooter"/>
                            <div className="row rowDivIconFooter">
                                <div className="col-sm-6 iconColoSmFooter">
                                    <a type="button" href="#!" onClick={()=> window.open("https://www.facebook.com/MEDDOCHC", "_blank")} className="btn-floating btn-fb fbiconFooter fabDesignIconFooter">
                                        <svg fill="#fff" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" width="30" height="30"><path d="M 19.253906 2 C 15.311906 2 13 4.0821719 13 8.8261719 L 13 13 L 8 13 L 8 18 L 13 18 L 13 30 L 18 30 L 18 18 L 22 18 L 23 13 L 18 13 L 18 9.671875 C 18 7.884875 18.582766 7 20.259766 7 L 23 7 L 23 2.2050781 C 22.526 2.1410781 21.144906 2 19.253906 2 z"/></svg>
                                    </a>
                                </div>
                                <div className="col-sm-6 iconColoSmFooter">
                                    <a type="button" href="#!" onClick={()=> window.open("https://twitter.com/MEDDOCHC?fbclid=IwAR22YiLf9igYnGtTKCK6OeTQqOCavZAeOC_rDO2bv2366c7ZyuEy1JwTueY", "_blank")} className="btn-floating btn-tw fabDesignIconFooter">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="30" height="30" viewBox="0 0 24 24">
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                        </svg>
                                    </a>
                                </div>
                                <div className="col-sm-6 iconColoSmFooter">
                                    <a type="button" href="#!" onClick={()=> window.open("https://www.linkedin.com/company/meddocmadagascar/", "_blank")} className="btn-floating btn-tw fabDesignIconFooter">
                                        <svg className="fab" xmlns="http://www.w3.org/2000/svg" fill="#fff" width="30" height="30" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-12 footer-back"></div>
                </div>
                <div className="footer-copyright text-center py-3">Copyright  ©  {this.state.copyright.getFullYear()} <span className="copyrightFooter"><b>MEDDoC</b></span></div>
                {/* <div className="row">
                    <div className="col-md-3"></div>
                </div> */}
            </div>
        );
    }
}
export default Footer;