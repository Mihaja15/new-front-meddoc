
import React, {Component} from 'react';
import './RechercheMedecin.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { fetchGet } from '../../services/global.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft, faChevronCircleRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { utile } from '../../services/utile';
import L from 'leaflet';
import Pagination from "react-js-pagination";
import DetailMedecin from '../medecin/DetailMedecin';
import blueIcon from '../../assets/icon/marker-icon-2x-blue.png';
import redIcon from '../../assets/icon/marker-icon-2x-red.png';
// require("bootstrap-less/bootstrap/bootstrap.less");

class RechercheMedecin extends Component{
    constructor(props){
        super();
        this.state={
            nav: 'absolute',
            tops: '0px',
            listLangue : [],
            dataMedecin: [],
            listeProvince : [],
            listTypeMedecin : [],
            listTypeDeConsultation : [],
            showModalProfilMedecin : false,
            indiceIcon : -1,
            setIcon : false,
            province : '', 
            text : '',
            count : [],
            activePage : 1,
            totalPage : 5,
            nbElement : 20,
            url : '',
            position : [-18.911014807267343,47.51621369091749],
            hiddenMap:true,
            typeConsultation:'a',
            typeMedecin:'a',
            semaine:'a',
            langue:'a',
            medecinDetail:null,
            medecinEdt:null,
            stateShow:1
        }
    }
    setValueProvince(e,champs){
        if(champs){
            this.setState({text : e.target.value})
        }else{
            this.setState({province : e.target.value});
        }
    }
    search=()=>{
        if(window.location.pathname.split('/')[1]==='recherche-medecin')
            window.history.pushState("object or string", "Title", '/recherche-medecin/'+decodeURI(this.state.text.toString())+'/'+this.state.province);
        else
            window.history.pushState("object or string", "Title", '/profil/recherche/'+decodeURI(this.state.text.toString())+'/'+this.state.province);
            // window.location.pathname='/profil/recherche/'+this.state.text.toString().replace('%20',' ')+'/'+this.state.province;
            // window.location.pathname='/recherche-medecin/'+this.state.text.toString().replace('%20',' ')+'/'+this.state.province;
        this.searchTextAndProvince(this.state.text,this.state.province);
    }
    
    getDataDisponibilite(){
        const newData= [];const tmp= utile.getAllSemaine();let size = tmp.length;
        for (let i = 0; i <= size; i++) {
            newData.push({ value : i,label : tmp[i]});
        }
        return newData;
    }
    getUrlPhoto(photo){
        try {
            if(photo!==null && photo!==undefined && photo!==''){
                return <img src={"/uploads/"+photo} alt="image_profile" className="imageProfilelisteMedecinRechercheMedecin"/>
            }
        } catch (error) { }
        return <img src={"/uploads/profile.jpg"} alt="image_profile" className="imageProfilelisteMedecinRechercheMedecin"/>
    }
    getSpecialite(dataTmp){
        if(dataTmp.length>0){
            return (
                <>
                    {
                        dataTmp.map((tmp,i)=>{
                            return (
                                <div key={i}>Médecin {tmp.typeMedecin.libelleTypeMedecin} {tmp.typeConsultation.libelleTypeConsultation}</div>
                            )
                        })
                    }
                </>   
            )
        }
        return <div></div>
    }
    createDateEmploiDuTemps(date){
        const dates = new Date(date);
        return <div className="themploiDuTempsRechercheMedecin">{utile.getAllSemaine()[dates.getDay()]}, <br/> {dates.getDate()} {utile.getAllMoisBreviation(dates.getMonth())} {dates.getFullYear()}</div>
    }
    nextOrPriveiw(nextTruePriviewFalse,dataTmp,indice){
        const count= this.state.count;let date=count[indice].countNP
        if(nextTruePriviewFalse===1){date.setDate(date.getDate()-3)}else {date.setDate(date.getDate()+3)}
        count[indice].countNP=date;
        fetchGet('/emploieTemps/emploiDuTempsNextOrPreview/'+dataTmp.idMedecin+'/'+date.getFullYear()+'/'+date.getMonth()+'/'+date.getDate()+'/'+date.getDay()).then(data=>{
            const list= this.state.dataMedecin;
            list[indice].emploiDuTemps=data;
            this.setState({dataMedecin : list,count:count});
        });
    }
    getDateTmp(dateTmp,change){
        if(change){
            const date=new Date(dateTmp);
            return ''+date.toISOString();
        }
        const date=new Date();
        return ''+date.toISOString(); 
    }
    getDataHtmlResultatRecherche(dataMedecin){
        if(dataMedecin.length>0){
            return (
                <>
                    {
                        (dataMedecin).map((dataTmp,i)=>{
                            return (
                                <div className="row listeOneMedecinRechercheMedecin" key={i} onMouseOver={()=>{this.setState({indiceIcon :i, setIcon : true, position : [dataTmp.medecinData.user.adresse.latitude,dataTmp.medecinData.user.adresse.longitude]})}}>
                                    <div className="col-md-4 col-sm-12 fatherimageProfilelisteMedecinRechercheMedecin">
                                        <div className="sonOffatherimageProfilelisteMedecinRechercheMedecin">
                                            {this.getUrlPhoto(dataTmp.medecinData.user.profilPicture)}
                                        </div>
                                        <div className="specialiteMedecinRechercheMedecin">{this.getSpecialite(dataTmp.medecinData.fraisConsultation)}</div>
                                        <div className="nameMedecinRechercheMedecin"><Link to='#0' onClick={()=>this.setState({medecinDetail:dataTmp.medecinData,stateShow:2,medecinEdt:dataTmp.emploiDuTemps})}>{dataTmp.medecinData.user.nom+' '+dataTmp.medecinData.user.prenoms}</a></div>
                                        <div className="adresseMedecinRechercheMedecin">{dataTmp.medecinData.user.adresse.addrValue}</div>
                                        <div className="buttonMedecinRechercheMedecin"><a className=" popup-with-move-anim a1" href="#0" onClick={()=>this.setState({medecinDetail:dataTmp.medecinData,stateShow:2,medecinEdt:dataTmp.emploiDuTemps})}>Prendre rendez-vous</a></div>
                                    </div>
                                    <div className="col-md-8 col-sm-12">
                                        <div className="emploiDuTempsRechercheMedecin">
                                            <ul className="fathertitleEmploiDuTempsRechercheMedecin">
                                                <li className="sontitleOneemploiDuTempsRechercheMedecin" onClick={()=>this.nextOrPriveiw(1,dataTmp.medecinData,i)}><FontAwesomeIcon icon={faChevronCircleLeft}/></li>
                                                <li  className="sontitletwomploiDuTempsRechercheMedecin">Emploi du temps</li>
                                                <li  className="sontitlethreemploiDuTempsRechercheMedecin" onClick={()=>this.nextOrPriveiw(0,dataTmp.medecinData,i)}><FontAwesomeIcon icon={faChevronCircleRight}/></li>
                                            </ul>
                                            
                                        </div>
                                        <div>
                                            <table className=" table table-border tableEmploiDuTempsRechercheMedecin">
                                                
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        {
                                                            dataTmp.emploiDuTemps.map((dataEmploi,i)=>{
                                                                return (<th className="thV2emploiDuTempsRechercheMedecin" key={i}>{this.createDateEmploiDuTemps(dataEmploi.dateJour)}</th>);
                                                            })
                                                        }
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Matin</td>
                                                        {
                                                        dataTmp.emploiDuTemps.map((dataEmploi,i)=>{
                                                                if(dataEmploi.timeStartTop>0 && dataEmploi.timeStopTop>0){
                                                                    return <td key={i} className="thV2emploiDuTempsRechercheMedecin"><Link to={'/prendre-rdv?'+dataTmp.medecinData.idMedecin+'&'+this.getDateTmp(''+dataEmploi.dateJour,true)+'&matin'}><div className="tdemploiDuTempsRechercheMedecin">{dataEmploi.timeStartTop}h à {dataEmploi.timeStopTop}h</div></a></td>
                                                                }else{
                                                                    return <td className="thV2emploiDuTempsRechercheMedecin" key={i}><div className="tdemploiDuTempsRechercheMedecin">indisponible</div></td>
                                                                }
                                                                
                                                            }) 
                                                        }
                                                    </tr>
                                                    <tr>
                                                        <td>Midi</td>
                                                        {
                                                        dataTmp.emploiDuTemps.map((dataEmploi,i)=>{
                                                                if(dataEmploi.timeStartBottom>0 && dataEmploi.timeStopBottom>0){
                                                                    return <td key={i} className="thV2emploiDuTempsRechercheMedecin"><Link to={'/prendre-rdv?'+dataTmp.medecinData.idMedecin+'&'+this.getDateTmp(''+dataEmploi.dateJour,true)+'&midi'}><div className="tdemploiDuTempsRechercheMedecin">{dataEmploi.timeStartBottom}h à {dataEmploi.timeStopBottom}h</div></a></td>
                                                                }else{
                                                                    return <td className="thV2emploiDuTempsRechercheMedecin" key={i}><div className="tdemploiDuTempsRechercheMedecin">indisponible</div></td>
                                                                }
                                                                
                                                            }) 
                                                        }
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    
                                </div>
                            )
                        })
                    }
                    <div className='divPagination'>
                        <Pagination
                            activeClass='paginationClassActive'
                            itemClassNext='paginationClassNext'
                            itemClassPrev='paginationClassPrev'
                            itemClassFirst='paginationClassFirst'
                            itemClassLast='paginationClassLast'
                            itemClass='paginationClassItemTmp'
                            prevPageText='< Précédant'
                            nextPageText='> Suivant'
                            activePage={this.state.activePage}
                            itemsCountPerPage={5}
                            totalItemsCount={this.state.nbElement}
                            pageRangeDisplayed={10}
                            onChange={(pageNumber)=>this.handlePageChange(pageNumber)}
                        />
                    </div>
                </>
            )
        }
        return <div>Aucun résultat trouvé</div>
    }//info medecin
    getMap(dataMedecin){
        if(dataMedecin.length>0){
            return (
                <MapContainer center={this.state.position} zoom={10} scrollWheelZoom={true}>
                    <TileLayer
                    attribution='&copy; <Link to="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        dataMedecin.map((data,i)=>{
                            if(this.state.setIcon && this.state.indiceIcon === i){
                                return (
                                    <Marker position={[data.medecinData.user.adresse.latitude,data.medecinData.user.adresse.longitude]}  icon={new L.Icon({
                                        iconUrl: redIcon,
                                        iconRetinaUrl: redIcon,
                                        iconSize: [25, 41],
                                        iconAnchor: [12, 41],
                                        popupAnchor: [1, -34],
                                        shadowSize: [41, 41]
                                    })} key={i} >
                                        <Popup>
                                            {data.medecinData.user.nom} {data.medecinData.user.prenoms}
                                        </Popup>
                                    </Marker>
                                )
                            }else{
                                return (
                                    <Marker position={[data.medecinData.user.adresse.latitude,data.medecinData.user.adresse.longitude]}  icon={new L.Icon({
                                        iconUrl: blueIcon,
                                        iconRetinaUrl: blueIcon,
                                        iconSize: [25, 41],
                                        iconAnchor: [12, 41],
                                        popupAnchor: [1, -34],
                                        shadowSize: [41, 41]
                                    })} key={i} >
                                        <Popup>
                                            {data.medecinData.user.nom} {data.medecinData.user.prenoms}
                                        </Popup>
                                    </Marker>
                                )
                            }
                            
                        })
                    }
                    
                </MapContainer>
            )
        }
    }// google map
    ValueSearsh=(e,type)=>{
        //console.log(e.target.value)
        this.setState({ [type]: e.target.value },function (){
            const date=new Date();
            //console.log('specialite:'+this.state.typeMedecin+' type consultation:'+this.state.typeConsultation+' disponibilite:'+this.state.semaine+' langue:'+this.state.langue)
            // const  urls='/medecin/searchMedecin/'+type+'/'+e.value+'/'+date.getFullYear()+'/'+date.getMonth()+'/'+date.getDate();
            const  urls='/medecin/recherche-avancee-medecin/'+this.state.typeMedecin+'/'+this.state.typeConsultation+'/'+this.state.semaine+'/'+this.state.langue+'/'+this.state.province+'/'+this.state.text+'/'+date.getFullYear()+'/'+date.getMonth()+'/'+date.getDate();
            fetchGet(urls+'/1').then(data=>{
                if(data!==null && data!==undefined){
                    if(data.content !==null && data.content !==undefined){
                        this.setState({dataMedecin : data.content,url : urls,activePage : 1, totalPage : data.nbPage,nbElement : data.nbElement});
                        //console.log('rechercherNew : ', data);
                    }
                }
            });
        })
        // const date=new Date();
        // //console.log('specialite:'+this.state.typeMedecin+' type consultation:'+this.state.typeConsultation+' disponibilite:'+this.state.semaine+' langue:'+this.state.langue)
        // // const  urls='/medecin/searchMedecin/'+type+'/'+e.value+'/'+date.getFullYear()+'/'+date.getMonth()+'/'+date.getDate();
        // const  urls='/medecin/recherche-avancee-medecin/'+type+'/'+e.value+'/'+date.getFullYear()+'/'+date.getMonth()+'/'+date.getDate();
        // fetchGet(urls+'/1').then(data=>{
        //     if(data!==null && data!==undefined){
        //         if(data.content !==null && data.content !==undefined){
        //             this.setState({dataMedecin : data.content,url : urls,activePage : 1, totalPage : data.nbPage,nbElement : data.nbElement});
        //             //console.log('rechercherNew : ', data);
        //         }
        //     }
        // });
    }
    scrollToTop() {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
    }
    handlePageChange=(pageNumber)=> {
        this.scrollToTop();
        fetchGet(this.state.url+'/'+pageNumber).then(data=>{
            if(data!==null && data!==undefined){
                if(data.content !==null && data.content !==undefined){
                    this.setState({dataMedecin : data.content,url : this.state.url,activePage : pageNumber, totalPage : data.nbPage,nbElement : data.nbElement}, function(){
                        //console.log('count : ', this.state.dataMedecin.length);
                        if(this.state.dataMedecin.length > 0) this.setState({hiddenMap:false});
                        else this.setState({hiddenMap:true});
                    });
                    //console.log('rechercherNew : ', data);
                }
                if(data.content.length > 0) this.setState({hiddenMap:false});
                else this.setState({hiddenMap:true});
            }
        });
        
    }
    handleScroll=()=> {
        // let scrollHeight = Math.max(
        //     document.body.scrollHeight, document.documentElement.scrollHeight,
        //     document.body.offsetHeight, document.documentElement.offsetHeight,
        //     document.body.clientHeight, document.documentElement.clientHeight
        //   );
        // if (window.pageYOffset >= 0 && window.pageYOffset <= 140) {
        //     this.setState({ nav: 'absolute' , tops: '0px'});
        // }else if (window.pageYOffset > 140 && window.pageYOffset < (scrollHeight-window.innerHeight-260)) {
        //     this.setState({ nav: 'fixed' , tops: '100px'});
        // }else{
        //     //console.log('ato')
        //     this.setState({ nav: 'absolute' , tops:(scrollHeight-window.innerHeight-480)+'px'});
        // }
    }
    searchTextAndProvince(text,province){
        this.setState({text:decodeURI(text.toString())});
        // window.location.pathname='/recherche-medecin/'+text+'/'+province;
        const date = new Date();
        // let url = '';
        // if(text!=='' && (province!=='' || province!==0)){
        //     url= '/provinceText/'+province+'/'+text+'/';
        // }else if(text!=='' && (province==='' || province===0)){
        //     url= '/text/0/'+text+'/';
        // }else if(text==='' && province!==''){
        //     url= '/province/'+province+'/text/';
        // }else{
        //     url= '/all/province/text/';
        // }
        // let urls = '/medecin/recherche-medecin'+url+date.getFullYear()+'/'+date.getMonth()+'/'+date.getDate();
        const  urls='/medecin/recherche-avancee-medecin/'+this.state.typeMedecin+'/'+this.state.typeConsultation+'/'+this.state.semaine+'/'+this.state.langue+'/'+this.state.province+'/'+this.state.text+'/'+date.getFullYear()+'/'+date.getMonth()+'/'+date.getDate();
        fetchGet(urls+"/1").then(data=>{
            if(data!==null && data!==undefined){
                if(data.content !==null && data.content !==undefined){
                    const dataTmp=data.content;let size=dataTmp.length;const counts=[];
                    for (let a = 0; a < size; a++) {
                        counts.push({indice : a,countNP : new Date()});
                    }
                    this.setState({dataMedecin : data.content,count : counts,url : urls,activePage : 1, totalPage : data.nbPage,nbElement : data.nbElement});
                    //console.log('rechercherNew : ', data);
                    if(dataTmp.length > 0){
                        this.setState({hiddenMap:false,position:[dataTmp[0].medecinData.user.adresse.latitude,dataTmp[0].medecinData.user.adresse.longitude]});
                    } else this.setState({hiddenMap:true});
                }
            }
        });
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.dataMedecin !== this.state.dataMedecin) {
            if(this.state.dataMedecin.length > 0) this.setState({hiddenMap:false});
            else this.setState({hiddenMap:true});
        }
        if(prevProps.dataFind !== this.props.dataFind){
            // this.setState({text:this.props.dataFind.text.toString().replace('%20',' '),province:this.props.dataFind.province},function(){
            //     this.searchTextAndProvince(this.state.text,this.state.province);
            // })
        }
    }
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        // const values = window.location.pathname.split('/');
        //console.log(this.props.dataFind);
        // if(values[2]!==null || values[3]!==null || values[2]!==undefined || values[3]!==undefined || values[2]!=='' || values[3]!==''){
        if(this.props.dataFind!==null){
            this.setState({text:decodeURI(this.props.dataFind.text.toString()),province:this.props.dataFind.province},function(){
                this.searchTextAndProvince(this.state.text,this.state.province);
            })
            //console.log('rechercherNew : ', this.props.dataFind);
            // this.searchTextAndProvince(values[2],values[3]);
            // this.searchTextAndProvince(this.props.dataFind.text,this.props.dataFind.province);
        }else{
            //yyyy-MM-dd
            const date=new Date();
            const urls='/medecin/searchMedecin/all/2/'+date.getFullYear()+'/'+date.getMonth()+'/'+date.getDate();
            fetchGet(urls+'/1').then(data=>{
                if(data!==null && data!==undefined){
                    if(data.content !==null && data.content !==undefined){
                        const dataTmp=data.content;let size=dataTmp.length;const counts=[];
                        for (let a = 0; a < size; a++) {
                            counts.push({indice : a,countNP : new Date()});
                        }
                        this.setState({dataMedecin : data.content,count : counts,url : urls,activePage : 1, totalPage : data.nbPage,nbElement : data.nbElement});
                        //console.log('activePage : '+data.page +', totalPage : '+data.nbPage+' , nbElement : '+data.nbElement+'  , rechercherNew : ', data);
                    }
                }
            });
        }
        fetchGet('/adresse/province/all').then(data=>{
            const newData= [];let size = data.length;
            for (let i = 0; i < size; i++) {
                newData.push({ value : data[i].idProvince,label :data[i].nomProvince})
            }
            this.setState({listeProvince: newData});
        });
        fetchGet('/type-consultation/newlist').then(data=>{
            const newData= [];let size = data.length;
            for (let i = 0; i < size; i++) {
                newData.push({ value : data[i].idTypeConsultation,label :data[i].libelleTypeConsultation})
            }
            this.setState({listTypeDeConsultation: newData});
		});
		fetchGet('/type-medecin/list').then(data=>{
            const newData= [];let size = data.length;
            for (let i = 0; i < size; i++) {
                newData.push({ value : data[i].idTypeMedecin,label :data[i].libelleTypeMedecin})
            }
            this.setState({listTypeMedecin: newData});
        });
        fetchGet('/langue/list').then(data=>{
            const list = [];let size = data.length;
            for (let i = 0; i < size; i++) {
                list.push({ value: data[i].idLangue, label: data[i].libelleLangue});
            }
            this.setState({ listLangue: list });
        });
    }
    changeStateShow=(status)=>{
        this.setState({stateShow:status});
    }
    render(){
        return (
            <div className="allDivRechercheMedecin">
                {
                    this.state.stateShow===1?(
                    <div>
                        <div className="divRecherchePrincipaleRechercheMedecin">
                            <div className="divSearchBar row">
                                <input className="inputSearch col-md-4" type="text"value={this.state.text} onChange={(e)=>this.setValueProvince(e,true)} placeholder="Rechercher un centre de vaccination" />
                                <select className="selectSearch col-md-4" name="province" value={this.state.province} onChange={(e)=>this.ValueSearsh(e,'province')}>
                                    <option value="">Votre province</option>
                                    { 
                                        this.state.listeProvince.map((data,i)=>{
                                            return <option value={data.value}  key={i}>{data.label}</option>
                                        })
                                    }
                                </select>
                                <button href='#sendMessage' className="buttonSearch col-md-2" onClick={()=>this.search()}><FontAwesomeIcon icon={faSearch}/></button>
                            </div>
                            {/* <div className="divlistMenuRechercheMedecin">
                                <ul className="listMenuRechercheMedecins">
                                    <li className="col-md-3">
                                        <select name="typeMedecin" value={this.state.typeMedecin} onChange={(e)=>this.ValueSearsh(e,'typeMedecin')}>
                                            <option>Spécialité</option>
                                            { 
                                                this.state.listTypeMedecin.map((data,i)=>{
                                                    return <option value={data.value}  key={i}>{data.label}</option>
                                                })
                                            }
                                        </select>
                                    </li>
                                    <li className="col-md-3">
                                        <select name="typeConsultation" value={this.state.typeConsultation} onChange={(e)=>this.ValueSearsh(e,'typeConsultation')}>
                                            <option>Type de consultation</option>
                                            { 
                                                this.state.listTypeDeConsultation.map((data,i)=>{
                                                    return <option value={data.value}  key={i}>{data.label}</option>
                                                })
                                            }
                                        </select>
                                    </li>
                                    <li className="col-md-3">
                                        <select name="typeConsultation" value={this.state.semaine} onChange={(e)=>this.ValueSearsh(e,'semaine')}>
                                            <option>Disponibilité</option>
                                            { 
                                                this.getDataDisponibilite().map((data,i)=>{
                                                    return <option value={data.value}  key={i}>{data.label}</option>
                                                })
                                            }
                                        </select>
                                    </li>
                                    <li className="col-md-3">
                                        <select name="langue" value={this.state.langue} onChange={(e)=>this.ValueSearsh(e,'langue')}>
                                            <option>Langues</option>
                                            { 
                                                this.state.listLangue.map((data,i)=>{
                                                    return <option value={data.value}  key={i}>{data.label}</option>
                                                })
                                            }
                                        </select>
                                    </li>
                                </ul>
                            </div> */}
                        </div>
                        <div>
                            <div className="row">
                                <div className="col-md-4 col-sm-12 fathermapsRechercheMedecin">
                                {/* style={{position : `${this.state.nav}`,top:`${this.state.tops}`,width:'400px'}} */}
                                    <div hidden={this.state.hiddenMap} className="mapsRechercheMedecin">
                                        {this.getMap(this.state.dataMedecin)}
                                    </div>
                                </div>
                                <div className="col-md-8 col-sm-12 listeMedecinRechercheMedecin">
                                    {this.getDataHtmlResultatRecherche(this.state.dataMedecin)}
                                    
                                </div>
                            </div>
                        </div>
                    </div>)
                    :(this.state.medecinDetail!==null?<DetailMedecin medecinEmploiTemps={this.state.medecinEdt} setStateShow={this.changeStateShow} medecinData={this.state.medecinDetail}/>:'')
                }
            </div>
            
        )
    }
}
export default RechercheMedecin;