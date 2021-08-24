import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default class Footer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            copyright: new Date()
        }
    }
    render(){
        return(
            <div className="footer-content">
                <div className="container-fluid">
                    <ul className="footer_content_container_fluid_ul">
                        <li className="footer_content_container_fluid_ul_li">
                            <h5 className="footer_content_container_fluid_row_col_h5 footer_content_container_fluid_row_col_h5_v3">À propos de MEDDoC</h5>
                            <ul className="footer_content_container_fluid_row_col_ul">
                                <li>Qui sommes-nous ?</li>
                                <li>Mentions légales et CGU</li>
                                <li>Charte de confidentialité</li>
                                <li>Presse</li>
                                <li>Blog</li>
                            </ul>
                        </li>
                        <li  className="footer_content_container_fluid_ul_li">
                            <h5 className="footer_content_container_fluid_row_col_h5 footer_content_container_fluid_row_col_h5_v3">Nos services</h5>
                            <ul className="footer_content_container_fluid_row_col_ul">
                                <li>Prise de rendez-vous en ligne</li>
                                <li>Pharmaclic</li>
                            </ul>
                        </li>
                        <li className="footer_content_container_fluid_ul_li">
                            <h5 className="footer_content_container_fluid_row_col_h5 footer_content_container_fluid_row_col_h5_v3">Vous êtes ?</h5>
                            <ul className="footer_content_container_fluid_row_col_ul">
                                <li>Un professionnel de santé ?</li>
                                <li>Une pharmacie ?</li>
                            </ul>
                        </li>
                        <li className="footer_content_container_fluid_ul_li">
                            <h5 className="footer_content_container_fluid_row_col_h5 footer_content_container_fluid_row_col_h5_v3">Rejoignez-nous !</h5>
                            <ul className="footer_content_container_fluid_row_col_ul_v2 ">
                                <li className="footer_content_container_fluid_row_col_ul_v2_li">
                                    <a type="button" href="#!" onClick={()=> window.open("https://www.facebook.com/MEDDOCHC", "_blank")} className="btn-floating btn-fb fbiconFooter fabDesignIconFooter">
                                        <svg fill="#b2d1db" className="footer_content_container_fluid_row_col_ul_v2_li_svg" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" width="30" height="30"><path d="M 19.253906 2 C 15.311906 2 13 4.0821719 13 8.8261719 L 13 13 L 8 13 L 8 18 L 13 18 L 13 30 L 18 30 L 18 18 L 22 18 L 23 13 L 18 13 L 18 9.671875 C 18 7.884875 18.582766 7 20.259766 7 L 23 7 L 23 2.2050781 C 22.526 2.1410781 21.144906 2 19.253906 2 z"/></svg>
                                    </a>
                                </li>
                                <li className="footer_content_container_fluid_row_col_ul_v2_li">
                                    <a type="button" href="#!" onClick={()=> window.open("https://twitter.com/MEDDOCHC?fbclid=IwAR22YiLf9igYnGtTKCK6OeTQqOCavZAeOC_rDO2bv2366c7ZyuEy1JwTueY", "_blank")} className="btn-floating btn-tw fabDesignIconFooter">
                                        <svg xmlns="http://www.w3.org/2000/svg"  className="footer_content_container_fluid_row_col_ul_v2_li_svg" fill="#b2d1db" width="30" height="30" viewBox="0 0 24 24">
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                        </svg>
                                    </a>
                                </li>
                                <li className="footer_content_container_fluid_row_col_ul_v2_li">
                                    <a type="button" href="#!" onClick={()=> window.open("https://www.linkedin.com/company/meddocmadagascar/", "_blank")} className="btn-floating btn-tw fabDesignIconFooter">
                                        <svg className="fab"  className="footer_content_container_fluid_row_col_ul_v2_li_svg" xmlns="http://www.w3.org/2000/svg" fill="#b2d1db" width="30" height="30" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                            <h5 className="footer_content_container_fluid_row_col_h5 footer_content_container_fluid_row_col_h5_v2">Nous contacter</h5>
                            <div className="footer_content_container_fluid_row_col_ul_v2_div_v2"><FontAwesomeIcon className="footer_content_container_fluid_row_col_ul_v2_li_FontAwesomeIcon" icon={faEnvelope}/></div>
                        </li>
                        <li className="footer_content_container_fluid_ul_li">
                            <h5 className="footer_content_container_fluid_row_col_h5 footer_content_container_fluid_row_col_h5_v3 footer_content_container_fluid_row_col_h5_v4">Newsletter</h5>
                            <div className="footer_content_container_fluid_row_col_h5_v3_divinput"><input type="text" className="footer_content_container_fluid_row_col_h5_v3_input" placeholder="Votre adresse email" /></div>
                            <div className="footer_content_container_fluid_row_col_h5_v3_divtext">Je m'inscris !</div>
                        </li>
                    </ul>
                    <div className="footer_content_container_fluid_bas_footer footer-copyright col-md-12 text-center py-3">Copyright  ©  {this.state.copyright.getFullYear()} <span className="copyrightFooter"><b>MEDDoC</b></span></div>
                </div>
            </div>
        )
    }
}