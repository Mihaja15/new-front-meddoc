import React from 'react';
import './Home.css';
// import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPhone, faSearch, faVirus } from '@fortawesome/free-solid-svg-icons';
import vaccin from '../../assets/img/vaccin.png';
import im1 from '../../assets/img/im1.png';
import im2 from '../../assets/img/im2.png';
import im3 from '../../assets/img/im3.png';
import im4 from '../../assets/img/im4.png';
import details1officeworker from '../../assets/img/who.jpg';
import img1 from '../../assets/img/discussion.png';
import egm from '../../assets/partenaire/egm.png';
import mnsp from '../../assets/partenaire/mnsp.png';
import presidence from '../../assets/partenaire/presidence.png';
import '../../assets/fonts/Font.css';
import { fetchGet } from '../../services/global.service';
import Select from 'react-select';
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
        const customStyles = {
            option: (provided, state) => ({
              ...provided,
              borderBottom: '1px dotted pink',
              color: state.isSelected ? '#fff' : '#1b7895'
            }),
            control: (provided) => ({
              // none of react-select's styles are passed to <Control />
                ...provided,
                width: 330,
                height: 51,
                borderRadius: '0 !important',
                backgroundColor: '#fff',
                marginRight: 5,
                marginLeft: 0
            })
        }
        return(
            <div className="home-container">
                <div className="info-covid" style={{display:this.state.close?'none':'block'}}>
                    <span><FontAwesomeIcon icon={faVirus}/></span>
                    <a className="close" href="#0" onClick={()=>this.setState({close:!this.state.close})}>x</a>
                    <h5>Information COVID-19:</h5>
                    <p>MEDDoC propose la prise de rendez-vous pour une vaccination contre la COVID-19</p>
                    <a href="#0" onClick={()=>this.setState({showMore:!this.state.showMore})}>En savoir plus<FontAwesomeIcon icon={faChevronDown}/></a>
                    <div style={{display:!this.state.showMore?'none':'block',height:this.state.showMore?'21vh':'15vh'}}>
                        <p>Vérifiez si vous êtes éligibles <a href="/tout-savoir-sur-la-campagne-de-vaccination-contre-la-Covid-19-a-Madagascar/actualites" target="_blank">ici</a></p>
                        <ul>
                            <li>Recherchez un centre de vaccination près de chez vous.</li>
                            <li>Choisissez la date et l'heure qui vous convient selon les disponibilités.</li>
                            <li>Déclarez s'il s'agit de vous ou d'un proche.</li>
                            <li>Ou appelez le 911 pour une prise de rendez-vous téléphonique</li>
                        </ul>
                    </div>
                </div>
                <div className="rdv-telephonique">
                    <p>Ou appeler le 911 </p>
                    <span><FontAwesomeIcon icon={faPhone}/></span>
                </div>
                <div className="row">
                    <div className="banner-home">
                        <div className="banner-start">
                            <div className="input-group search-bar">
                                <div>MEDD<span>o</span>C</div>
                                <p>s'engage pour la campagne de vaccination contre la Covid-19 à Madagascar</p>
                                <h1>Trouvez un centre de vaccination et prenez rendez-vous</h1>
                                {/* <form> */}
                                    <input type="text" className="" value={this.state.textFind} placeholder="Rechercher un centre de vaccination" onChange={this.handleChange.bind(this,"textFind")}/>
                                    {/* <select className="" value={this.state.selectFind} onChange={this.handleChange.bind(this,"selectFind")}>
                                        <option value="">Votre District</option>
                                        { 
                                            this.state.listDistrict.map((data,i)=>{
                                                return <option value={data.idDistrict} key={i}>{data.nomDistrict}</option>
                                            })
                                        }
                                    </select> */}
                                    {/* <Select styles={customStyles} isClearable className="" options={this.state.listDistrict} onChange={this.handleChange.bind(this,"selectFind")}/> */}
                                    <button type="submit"><FontAwesomeIcon icon={faSearch} onClick={()=>window.location.replace('/recherche-centre/'+this.state.textFind+'/0')}/></button>
                                {/* </form> */}
                            </div>
                            <div className="vaccin-about row">
                                <div className="vaccin-about-img col-md-3 col-sm-12"><img src={vaccin} alt="vaccion show"/></div>
                                <div className="vaccin-about-text col-md-9 col-sm-12">
                                    <p>Découvrez si vous remplissez les conditions pour la vaccination Covid-19 <a href="/tout-savoir-sur-la-campagne-de-vaccination-contre-la-Covid-19-a-Madagascar/actualites" target="_blank">ici</a>.
                                    <br/>Vous pouvez également trouver votre RDV sur MEDDoC</p>
                                    <a className="vaccin-about-link" href="/">Lieux de vaccination près de chez vous</a>
                                </div>
                            </div>
                        </div>
                        <div className="banner-end">
                            <div className="why-meddoc row" >
                                <div className="col-lg-12">
                                    <h2 className="section-titles">Tout ce dont vous avez besoin. Et même plus.</h2>
                                    <div className="row">
                                        <div className="col-sm-12 col-lg-3">
                                            <div style={{textAlign: "center"}}><div className='animateBorder'></div><img src={im1} alt="carnet" className="imgAccueilTest"/></div>
                                            <h6 className="subtitle-img">Recherchez un centre de vaccination</h6>
                                            <p className="text-img">Accédez aux disponibilités de plusieurs centre de vaccination</p>
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
                        </div>
                    </div>
                </div>
                <div className="first-content row">
                    <div className="col-md-6 col-sm-12 text-first-content">
                        <h2 className="">Qui est concerné par la vaccination?</h2>
                        <div className="">
                            <p>Vous êtes des professionnels de santé sur le front dans la lutte contre la Covid-19? Ou agent des forces de défense et de sécurité? Vous êtes diabétique ou avez une maladie chronique pouvant être un facteur de comorbidité? Une personne  de 60 ans et plus quel que soit votre lieu de vie et votre état de santé? Prenez rendez-vous pour vous faire vacciner!</p>
                        </div>
                        <a className="bouton-solid-reg popup-with-move-anim a1" href="/recherche-medecin">Prendre rendez-vous</a>
                    </div> 
                    <div className="col-md-6 col-sm-12 img-first-content">
                        <div className="image-container">
                            <img className="img-fluid" src={details1officeworker} alt="alternative"/>
                        </div>
                    </div>
                </div>
                <div id="services" className="why">
                    <div className="overlay-two">
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5 col-md-12 col-sm-12 p-0">
                                <div className="intro-img">
                                    <img src={img1} alt=""/>
                                </div>
                            </div>
                            <div className="col-lg-7">
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
                                            <h4>24H/7J</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="soutien" className="partenaire">
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
                            <div className="each-col-soutien col-lg-4 col-md-6 col-xs-12">
                                <div className="single-team">
                                    <div className="team-thumb">
                                        <img src={presidence} className="img-fluid" alt=""/>
                                    </div>
                                    <div className="team-details">
                                        <div className="team-inner text-center">
                                            <h5 className="team-title"><a href="#!" onClick={()=> window.open("http://presidence.gov.mg/", "_blank")}>Présidence de la République de Madagascar</a></h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="each-col-soutien col-lg-4 col-md-6 col-xs-12">
                                <div className="single-team">
                                    <div className="team-thumb">
                                        <img src={mnsp} className="img-fluid" alt=""/>
                                    </div>
                                    <div className="team-details">
                                        <div className="team-inner text-center">
                                            <h5 className="team-title"><a href="#!" onClick={()=> window.open("http://sante.gov.mg/", "_blank")}>Ministère de la Santé Publique</a></h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="each-col-soutien col-lg-4 col-md-6 col-xs-12">
                                <div className="single-team">
                                    <div className="team-thumb">
                                        <img src={egm} className="img-fluid" alt=""/>
                                    </div>
                                    <div className="team-details">
                                        <div className="team-inner text-center">
                                            <h5 className="team-title"><a href="#!" onClick={()=> window.open("http://digital.gov.mg/", "_blank")}>e-Gouvernance de Madagascar</a></h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;