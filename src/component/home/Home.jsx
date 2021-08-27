import React from 'react';
import './Home.css';
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import im1 from '../../assets/img/im1.png';
import im2 from '../../assets/img/im2.png';
import im3 from '../../assets/img/im3.png';
import im4 from '../../assets/img/im4.png';
import '../../assets/fonts/Font.css';
import { fetchGet } from '../../services/global.service';
import imgrdv from '../../assets/background/imgrdv.jpg';
import pharmatie from '../../assets/background/pharmatie.jpg';
import africa from '../../assets/africa.png';
import ofab from '../../assets/partenaire/ofab.png';
import usaid from '../../assets/partenaire/shops-plus.png';
import zafy_tody from '../../assets/partenaire/zafy_tody.png';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
          selectFind:'',
          textFind:'',
          listDistrict:[]
        }
    }
    handleChange = (param, e) => {
        // this.setState({ [param]: e.target.value });
        if(param==="selectFind"){
            if(e!==null)
                this.setState({[param]:e.value});
            else
                this.setState({[param]:'0'});
        }else
            this.setState({[param]:e.target.value});
    }
    componentDidMount(){
        fetchGet('/adresse/find-district-part/all').then(data=>{
            this.setState({listDistrict: data});
        });
    }
    render(){
        return(
            <div className="container-fluid home-container">
                <div className="row col-md-12 banner-top">
                    <div className="col-md-12 overlay row home_container_title">
                        <div className="col-md-12 home-text">
                            <div className="search-bar">
                                <h1>Prenez rendez-vous <br/>avec <b>un médecin</b> proche de chez vous!</h1>
                                <ul className="home_container_search_bar_ul col-md-12 row">
                                    <li className="home_container_search_bar_ul_li_v1 col-md-6 col-sm-12"><input type="text" className="home_container_search_bar_ul_li_v1_input" value={this.state.textFind} placeholder="Spécialité, médecin, établissement ..." onChange={this.handleChange.bind(this,"textFind")}/></li>
                                    <li className="home_container_search_bar_ul_li_v2 col-md-4 col-sm-12"><input type="text" className="home_container_search_bar_ul_li_v2_input" value={this.state.textFind} placeholder="Où ?" onChange={this.handleChange.bind(this,"textFind")}/></li>
                                    <li className="home_container_search_bar_ul_li_v3 col-md-2 col-sm-12"><button type="submit" className="home_container_search_bar_ul_li_v3_button"><FontAwesomeIcon icon={faSearch} onClick={()=>{window.location.pathname='/recherche-centre/'+this.state.textFind+'/0'}}/></button></li>
                                </ul>
                            </div>
                        </div>
                        <div className="custom-shape-divider-bottom-1629768645">
                            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
                            </svg>
                        </div>
                    </div>
                    
                    {/* <div className="col-md-12 back-overlay"></div> */}
                    {/* <div className="col-md-12" id="pulsing">
                        <div className="col-md-12 heart-oscil">
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="750px" height="150px" viewBox="0 0 150 73" enableBackground="new 0 0 150 73" xmlSpace="preserve">
                                <polyline fill="none" stroke="#1b7895" strokeWidth="3" strokeMiterlimit="15" points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"
                                />
                            </svg>
                            <div className="go-in"></div>
                            <div className="go-out"></div>
                        </div>
                        <div className="col-md-12" id="heartBeat"></div>
                    </div> */}
                </div>
                <div className="first-content row">
                    <div className="why-meddoc col-md-12" >
                        <div className="col-lg-12">
                            <h2 className="section-titles">Tout ce dont vous avez besoin. Et même plus.</h2>
                            <div className="row">
                                <div className="col-sm-12 col-lg-3">
                                    <div style={{textAlign: "center"}}><div className='animateBorder'></div><img src={im1} alt="carnet" className="imgAccueilTest"/></div>
                                    <h6 className="subtitle-img">Recherchez un professionnel de santé</h6>
                                    <p className="text-img">Accédez aux disponibilités de plusieurs professionnels de santé</p>
                                </div>
                                <div className="col-sm-12 col-lg-3">
                                    <div style={{textAlign: "center"}}><div className='animateBorder'></div><img src={im2} alt="carnet" className="imgAccueilTest"/></div>
                                    <h6 className="subtitle-img">Prenez rendez-vous</h6>
                                    <p className="text-img">Prenez rendez-vous en ligne, 24h/24h et 7j/7j</p>
                                </div>
                                <div className="col-sm-12 col-lg-3">
                                    <div style={{textAlign: "center"}}><div className='animateBorder'></div><img src={im3} alt="carnet" className="imgAccueilTest"/></div>
                                    <h6 className="subtitle-img">Rappel de vos rendez-vous</h6>
                                    <p className="text-img">Un SMS et un mail de rappel avec toutes les informations pratiques sont envoyés la veille de votre rendez-vous</p>
                                </div>
                                <div className="col-sm-12 col-lg-3">
                                    <div style={{textAlign: "center"}}><div className='animateBorder'></div><img src={im4} alt="carnet" className="imgAccueilTest"/></div>
                                    <h6 className="subtitle-img">Le carnet de santé numérique (CSN)</h6>
                                    <p className="text-img">Retrouvez vos données de santé protégées, partout quand vous voulez! </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 back-why-meddoc"></div>
                </div>
                <div className="row col-md-12 rowHelperTemporaireAcceuil">
                    
                    <div className="col-lg-12 col-sm-12 nos-services"><h2 className="col-md-12 section-titles">Nos services</h2></div>

                    <div className="col-lg-6 col-sm-12 textHelperAcceuil textAuMilieu">
                        <h2 className="h2m turquoise turquoiseTmp" id="prise-rdv-titre">Prenez rendez-vous avec vos médecins à tout moment</h2>
                        <div className="textHelperTemporaireAcceuil">
                        En cabinet ou à domicile, consultez votre docteur, médecin généraliste,
                        spécialiste ou professionnel paramédical).
                        Prenez rendez-vous pour faire vos analyses (biologiques…)
                        et vos radiologies (IRM, scanner, échographie…)</div>
                        <div className="textHelperTemporaireAcceuil_div_button"><button className="home_container_prise_rdv_btn_button"><a className="home_container_prise_rdv_btn_button_a" href="/recherche-medecin">Prendre rendez-vous</a></button></div>
                    </div> 
                    <div className="col-lg-6 col-sm-12">
                        <div className="image-container newInspirationDominiceAcceuille">
                            <img className="img-fluid newImageInspirationDominiceAcceuille" src={imgrdv} alt="alternative"/>
                        </div>
                    </div>
                </div>
                <div className="row col-md-12 rowHelperTemporaireAcceuil_v2">
                    <div className="col-lg-6 col-sm-12">
                        <div className="image-container newInspirationDominiceAcceuille">
                            <img className="img-fluid newImageInspirationDominiceAcceuille newImageInspirationDominiceAcceuille_v2" src={pharmatie} alt="alternative"/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 textAuMilieu">
                        <h2 className="h2m turquoise turquoiseTmp" id="prise-rdv-titre">PHARMACLIC, la parapharmacie en ligne</h2>
                        <div className="textHelperTemporaireAcceuil">
                            Découvrez tous les produits de paraharmacie, au meilleur prix dans les pharmacies à proximité dans toutes les catégories: soins du visage,
                            bébé, enfants et maternité, soins du corps, bouche et dents, matériel médical,
                            cheveux, santé, sexualité....
                        </div>
                        <div className="textHelperTemporaireAcceuil_div_button"><button className="home_container_prise_rdv_btn_button"><a className="home_container_prise_rdv_btn_button_a" href="/inscription-patient">Découvrez nos produits</a></button></div>
                    </div>
                </div>
                <div className="col-md-12">
                    <section id="services" className="why row">
                        <div className="overlay-two">
                            {/* <span></span>
                            <span></span> */}
                        </div>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-lg-3 col-md-3 col-xs-3">
                                            <div className="services-item text-center">
                                                <div className="icon">
                                                    <i className="lni-emoji-smile"></i>
                                                </div>
                                                <h4>Simple</h4>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-xs-3">
                                            <div className="services-item text-center">
                                                <div className="icon">
                                                    <i className="lni-sun"></i>
                                                </div>
                                                <h4>Gratuit</h4>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-xs-3">
                                            <div className="services-item text-center">
                                                <div className="icon">
                                                    <i className="lni-lock"></i>
                                                </div>
                                                <h4>Sécurisé</h4>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-xs-3">
                                            <div className="services-item text-center">
                                                <div className="icon">
                                                    <i className="lni-timer"></i>
                                                </div>
                                                <h4>24h/7j</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="soutien" className="partenaire row">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="contact-text section-header text-center">  
                                        <div>   
                                            <h2 className="section-titles">Ils nous soutiennent</h2>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-6 col-xs-12">
                                    <div className="single-team">
                                        <div className="team-thumb">
                                            <a href="https://africabyincubme.com/" rel="noopener noreferrer" target="_blank"><img src={africa} style={{padding: '9%'}}  className="img-fluid" alt=""/></a>
                                        </div>
                                        <div className="team-details">
                                            <div className="team-inner text-center">
                                                <h5 className="team-title">AFRICA By IncubeMe</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-xs-12">
                                    <div className="single-team">
                                        <div className="team-thumb">
                                            <a href="https://orangefab.mg/fr/" rel="noopener noreferrer" target="_blank"><img src={ofab} className="img-fluid" alt=""/></a>
                                        </div>
                                        <div className="team-details">
                                            <div className="team-inner text-center">
                                                <h5 className="team-title">Orange Fab Madagascar</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-xs-12">
                                    <div className="single-team">
                                        <div className="team-thumb">
                                            <a href="https://www.shopsplusproject.org/where-we-work/africa/madagascar" rel="noopener noreferrer" target="_blank"><img src={usaid} className="img-fluid" alt=""/></a>
                                        </div>
                                        <div className="team-details">
                                            <div className="team-inner text-center">
                                                <h5 className="team-title">USAID - SHOPS Plus</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-xs-12">
                                    <div className="single-team">
                                        <div className="team-thumb">
                                            <a href="https://zafytody.mg/" rel="noopener noreferrer" target="_blank"><img src={zafy_tody} className="img-fluid" alt=""/></a>
                                        </div>
                                        <div className="team-details">
                                            <div className="team-inner text-center">
                                                <h5 className="team-title">Zafy Tody</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}
export default Home;