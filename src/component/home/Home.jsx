import React from 'react';
import './Home.css';
// import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faClinicMedical, faFileMedical, faPhone, faSearch, faStoreAlt, faVirus } from '@fortawesome/free-solid-svg-icons';
import vaccin from '../../assets/img/vaccin.png';
import im1 from '../../assets/img/im1.png';
import im2 from '../../assets/img/im2.png';
import im3 from '../../assets/img/im3.png';
import im4 from '../../assets/img/im4.png';
import calendar from '../../assets/img/calendar-left.png';
import csn from '../../assets/img/csn-right.png';
import hospital from '../../assets/img/hospital-left.png';
import drugStore from '../../assets/img/drug-store-right.png';
import home from '../../assets/background/home.png';
import deviceRh from '../../assets/background/device-rh.png';
import details1officeworker from '../../assets/img/details-1-office-worker.svg';
import details2officeworker from '../../assets/img/details-2-office-team-work.svg';
import img1 from '../../assets/img/discussion.png';
import egm from '../../assets/partenaire/egm.png';
import mnsp from '../../assets/partenaire/mnsp.png';
import presidence from '../../assets/partenaire/presidence.png';
import '../../assets/fonts/Font.css';
import { fetchGet } from '../../services/global.service';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCartPlus, faCartArrowDown, faHandHoldingMedical, faClipboardList, faReceipt, faShoppingBasket, faShoppingBag } from '@fortawesome/free-solid-svg-icons';

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
            <div className="home-container">
                <div className="row col-md-12 banner-top">
                    <div className="col-md-12 overlay row">
                        <div className="col-md-6 home-text">
                            <div className="search-bar">
                                {/* <div>MEDD<span>o</span>C</div>
                                <p>s'engage pour la campagne de vaccination contre la Covid-19 à Madagascar</p> */}
                                <h1>Trouvez un <br/><b>professionnel de santé</b><br/> le plus tôt et le plus près de chez vous!</h1>
                                <p className="">Simple, gratuit et sécurisé</p>
                                {/* <form> */}
                                    <input type="text" className="" value={this.state.textFind} placeholder="Rechercher un professionel de santé" onChange={this.handleChange.bind(this,"textFind")}/>
                                    {/* <select className="" value={this.state.selectFind} onChange={this.handleChange.bind(this,"selectFind")}>
                                        <option value="">Votre District</option>
                                        { 
                                            this.state.listDistrict.map((data,i)=>{
                                                return <option value={data.idDistrict} key={i}>{data.nomDistrict}</option>
                                            })
                                        }
                                    </select> */}
                                    {/* <Select styles={customStyles} isClearable className="" options={this.state.listDistrict} onChange={this.handleChange.bind(this,"selectFind")}/> */}
                                    <button type="submit"><FontAwesomeIcon icon={faSearch} onClick={()=>{window.location.pathname='/recherche-centre/'+this.state.textFind+'/0'}}/></button>
                                {/* </form> */}
                            </div>
                        </div>
                        {/* <div className="col-md-6 home-background"><img src={home} alt="background"/></div> */}
                        <div className="col-md-6 home-background">
                            {/* <svg xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 350">
                                <path fill="#1b7895" d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z"/>
                            </svg> */}
                            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#1b7895" d="M39.7,-45.3C55.3,-34.3,74.4,-25.4,82.7,-9.9C91,5.6,88.5,27.6,78.6,46C68.7,64.3,51.4,79,31.7,85.4C12,91.9,-10.1,90.2,-29.6,82.5C-49.1,74.9,-66.1,61.4,-66.4,45.7C-66.8,29.9,-50.5,11.9,-46.1,-7.3C-41.7,-26.5,-49.1,-46.9,-43.4,-59.6C-37.7,-72.3,-18.8,-77.2,-3.4,-73.2C12.1,-69.2,24.2,-56.2,39.7,-45.3Z" transform="translate(100 100)" />
                            </svg>
                            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#1b7895" d="M39.7,-45.3C55.3,-34.3,74.4,-25.4,82.7,-9.9C91,5.6,88.5,27.6,78.6,46C68.7,64.3,51.4,79,31.7,85.4C12,91.9,-10.1,90.2,-29.6,82.5C-49.1,74.9,-66.1,61.4,-66.4,45.7C-66.8,29.9,-50.5,11.9,-46.1,-7.3C-41.7,-26.5,-49.1,-46.9,-43.4,-59.6C-37.7,-72.3,-18.8,-77.2,-3.4,-73.2C12.1,-69.2,24.2,-56.2,39.7,-45.3Z" transform="translate(100 100)" />
                            </svg>
                            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#1b7895" d="M39.7,-45.3C55.3,-34.3,74.4,-25.4,82.7,-9.9C91,5.6,88.5,27.6,78.6,46C68.7,64.3,51.4,79,31.7,85.4C12,91.9,-10.1,90.2,-29.6,82.5C-49.1,74.9,-66.1,61.4,-66.4,45.7C-66.8,29.9,-50.5,11.9,-46.1,-7.3C-41.7,-26.5,-49.1,-46.9,-43.4,-59.6C-37.7,-72.3,-18.8,-77.2,-3.4,-73.2C12.1,-69.2,24.2,-56.2,39.7,-45.3Z" transform="translate(100 100)" />
                            </svg>
                            <img src={calendar} alt="background"/>
                            <img src={csn} alt="background"/>
                            <img src={hospital} alt="background"/>
                            <img src={drugStore} alt="background"/>
                            <img src={deviceRh} alt="background"/>
                        </div>
                    </div>
                    <div className="col-md-12 back-overlay"></div>
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
                <div className="col-md-12 nos-services">
                    <div className="row">
                        <h2 className="col-md-12 section-titles">Nous vous proposons</h2>
                        <div className="col-md-4 all-single-service">
                            <div className="col-md-12 single-service">
                                <h6 className="col-md-12 subtitle-img">Prise de rendez-vous</h6>
                                <svg className="col-md-12 single-background" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#005569" d="M39.7,-45.3C55.3,-34.3,74.4,-25.4,82.7,-9.9C91,5.6,88.5,27.6,78.6,46C68.7,64.3,51.4,79,31.7,85.4C12,91.9,-10.1,90.2,-29.6,82.5C-49.1,74.9,-66.1,61.4,-66.4,45.7C-66.8,29.9,-50.5,11.9,-46.1,-7.3C-41.7,-26.5,-49.1,-46.9,-43.4,-59.6C-37.7,-72.3,-18.8,-77.2,-3.4,-73.2C12.1,-69.2,24.2,-56.2,39.7,-45.3Z" transform="translate(100 100)" />
                                </svg>
                                <span className="col-md-12 "><FontAwesomeIcon icon={faClinicMedical}/></span>
                            </div>
                            {/* <p className="col-md-12">Prenez votre rendez-vous où vous voulez.</p> */}
                        </div>
                        <div className="col-md-4 all-single-service">
                            <div className="col-md-12 single-service">
                                <h6 className="col-md-12 subtitle-img">Click & Collect</h6>
                                <svg className="col-md-12 single-background" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#82a64e" d="M39.7,-45.3C55.3,-34.3,74.4,-25.4,82.7,-9.9C91,5.6,88.5,27.6,78.6,46C68.7,64.3,51.4,79,31.7,85.4C12,91.9,-10.1,90.2,-29.6,82.5C-49.1,74.9,-66.1,61.4,-66.4,45.7C-66.8,29.9,-50.5,11.9,-46.1,-7.3C-41.7,-26.5,-49.1,-46.9,-43.4,-59.6C-37.7,-72.3,-18.8,-77.2,-3.4,-73.2C12.1,-69.2,24.2,-56.2,39.7,-45.3Z" transform="translate(100 100)" />
                                </svg>
                                <span className="col-md-12 "><FontAwesomeIcon icon={faStoreAlt}/></span>
                            </div>
                            {/* <p className="col-md-12">Faites votre commande de médicament et passez le prendre sans faire la queue.</p> */}
                        </div>
                        <div className="col-md-4 all-single-service">
                            <div className="col-md-12 single-service">
                                <h6 className="col-md-12 subtitle-img">Suivi médical</h6>
                                <svg className="col-md-12 single-background" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#fa9397" d="M39.7,-45.3C55.3,-34.3,74.4,-25.4,82.7,-9.9C91,5.6,88.5,27.6,78.6,46C68.7,64.3,51.4,79,31.7,85.4C12,91.9,-10.1,90.2,-29.6,82.5C-49.1,74.9,-66.1,61.4,-66.4,45.7C-66.8,29.9,-50.5,11.9,-46.1,-7.3C-41.7,-26.5,-49.1,-46.9,-43.4,-59.6C-37.7,-72.3,-18.8,-77.2,-3.4,-73.2C12.1,-69.2,24.2,-56.2,39.7,-45.3Z" transform="translate(100 100)" />
                                </svg>
                                <span className="col-md-12 "><FontAwesomeIcon icon={faFileMedical}/></span>
                            </div>
                            {/* <p className="col-md-12">Accédez à votre dossier médical à tout moment.</p> */}
                        </div>
                    </div>
                </div>
                <div className="row col-md-12 rowHelperTemporaireAcceuil">
                    <div className="col-lg-6 col-sm-12 textHelperAcceuil textAuMilieu">
                        <h2 className="h2m turquoise turquoiseTmp" id="prise-rdv-titre">Prenez rendez-vous avec vos professionnels de santé à tout moment</h2>
                        <div className="textHelperTemporaireAcceuil">
                        En cabinet ou à domicile, consultez votre docteur, médecin généraliste,
                        spécialiste (dentiste, dermatologue, gynécologue, cardiologue,pédiatre,
                        ophtalmologue...) ou professionnel paramédical (kinésithérapeute,
                        orthophoniste, orthoptiste, ostéopathe, diététicien, podologue...).
                        Prenez rendez-vous pour faire vos analyses (biologiques…)
                        et vos radiologies (IRM, scanner, échographie…)</div>
                        <a id="prise-rdv-btn" href="/recherche-medecin">Prendre rendez-vous</a>
                    </div> 
                    <div className="col-lg-6 col-sm-12">
                        <div className="image-container newInspirationDominiceAcceuille">
                            <img className="img-fluid newImageInspirationDominiceAcceuille" src={details1officeworker} alt="alternative"/>
                        </div>
                    </div>
                </div>
                <div className="row col-md-12 rowHelperTemporaireAcceuil">
                    <div className="col-lg-6 col-sm-12">
                        <div className="image-container newInspirationDominiceAcceuille">
                            <img className="img-fluid newImageInspirationDominiceAcceuille" src={details2officeworker} alt="alternative"/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 textAuMilieu">
                        <h2 className="h2m turquoise turquoiseTmp" id="click-collect-titre">Click & collect</h2>
                        <div className="textHelperTemporaireAcceuil">
                            Faites vos achats ou partagez vos ordonnances avec votre pharmacien et récupérez rapidement vos médicaments.
                        </div>
                        <a id="click-collect-btn" href="/inscription-patient">Trouver une pharmacie</a>
                    </div>
                </div>
                <div className="row col-md-12 rowHelperTemporaireAcceuil finHelperTemporaireAcceuil">
                    <div className="col-lg-6 col-sm-12 textAuMilieu">
                        <h2 className="h2m turquoise turquoiseTmp" id="suivi-medical-titre">Votre carnet de santé numérique (CSN), toujours avec vous</h2>
                        <div className="textHelperTemporaireAcceuil">
                            Confidentiel et sécurisé, il vous permet de les partager avec votre médecin traitant
                            et avec  tous les professionnels de santé qui vous prennent en charge, on retrouve
                            dans un même endroit vos antécédents médicaux, vos résultats d’examens,
                            vos comptes rendus d’hospitalisations, vos historiques de soins…
                        </div>
                        <a id="suivi-medical-btn" href="/inscription-patient">Créer votre carnet</a>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <div className="image-container newInspirationDominiceAcceuille">
                            <img className="img-fluid newImageInspirationDominiceAcceuille" src={details2officeworker} alt="alternative"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;