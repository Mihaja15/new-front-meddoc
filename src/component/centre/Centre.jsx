import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Centre.css';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Pagination from "react-js-pagination";
// import DetailMedecin from '../medecin/DetailMedecin';
import blueIcon from '../../assets/icon/marker-icon-2x-blue.png';
import redIcon from '../../assets/icon/marker-icon-2x-red.png';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { fetchGet } from '../../services/global.service';
import EmploiTemps from './EmploiTemps';
import DetailCentre from './DetailCentre';
import Select from 'react-select';
import Loader from '../alert/Loader';
import { utile } from '../../services/utile';

export default class Centre extends React.Component{
    constructor(props){
        super();
        this.state={
            page:0,
            size:10,
            nbElement:0,
            totalPage:1,
            text:'',
            district:'0',
            listDistrict:[],
            listResultSearch:[],
            hiddenMap:true,
            position:[0.0,0.0],
            professionnelDetail:null,
            stateShow:1,
            idUser:null,
            dateHeure:null,
            showResult:false
        }
    }    
    getUrlPhoto(photo){
        try {
            if(photo!==null && photo!==undefined && photo!==''){
                return <img src={"/assets/upload/"+photo} alt="image_profile" className="photo-centre-search"/>
            }
        } catch (error) { }
        return <img src={"/assets/upload/profile-centre.jpg"} alt="image_profile" className="photo-centre-search"/>
    }
    getDataHtmlResultatRecherche(listResultSearch){
        // console.log(listResultSearch)
        if(listResultSearch.length>0){
            return (
                <>
                    {
                        (listResultSearch).map((data,i)=>{
                            return (
                                <div className="row each-line-search" key={i} onMouseOver={()=>{this.setState({indiceIcon :i, setIcon : true, position : [data.adresse.latitude,data.adresse.longitude]})}}>
                                    <div className="col-md-4 col-sm-12 each-line-search-detail">
                                        <div className="">
                                            {this.getUrlPhoto()}
                                            {/* <span className="initial-centre-icon">{this.getInitial(data.nomCentre)}</span> */}
                                        </div>
                                        <p className="">{data.adresse.informationAdresse}</p>
                                        {/* <a href='#0' onClick={()=>this.setState({professionnelDetail:data,stateShow:2})}>{data.pseudo}</a> */}
                                        <a href={`/${utile.valueToLink(data.adresse.district.nomDistrict.toLowerCase())+'/'+utile.valueToLink(data.specialite.toLowerCase())+'/'+utile.valueToLink(data.pseudo.toLowerCase())}`}>{data.pseudo}</a>
                                        {/* <a href='#0' onClick={()=>this.setState({medecinDetail:dataTmp.medecinData,stateShow:2,medecinEdt:dataTmp.emploiDuTemps})}></a> */}
                                        {/* <div className="adresseMedecinRechercheMedecin">{data.medecinData.user.adresse.addrValue}</div> */}
                                        {/* <div className="buttonMedecinRechercheMedecin"><a className=" popup-with-move-anim a1" href="#0" onClick={()=>this.setState({medecinDetail:data.medecinData,stateShow:2,medecinEdt:data.emploiDuTemps})}>Prendre rendez-vous</a></div> */}
                                    </div>
                                    <div className="col-md-8 col-sm-12 each-line-search-emploi-temps">
                                        <EmploiTemps professionnel={data} idProfessionnel={data.idUser} link={"/professionnel/schedule"} setDataCentre={this.changeCentre} /*changeStateShow={this.changeStateShow}*//>
                                        {/* <EmploiTemps idCentre={data.idCentre} idUser={this.state.idUser} nomCentre={data.nomCentre} link={"/professionnel/schedule"}/> */}
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
                            activePage={this.state.page}
                            itemsCountPerPage={this.state.size}
                            totalItemsCount={this.state.nbElement}
                            pageRangeDisplayed={10}
                            onChange={(pageNumber)=>this.handlePageChange(pageNumber)}
                        />
                    </div>
                </>
            )
        }else
            return <div style={{textAlign:"center", width:"100%"}}>Aucun résultat trouvé</div>
    }//info medecin
    getMap(listResultSearch){
        if(listResultSearch.length>0){
            return (
                <MapContainer center={this.state.position} zoom={10} scrollWheelZoom={true}>
                    <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        listResultSearch.map((data,i)=>{
                            if(this.state.setIcon && this.state.indiceIcon === i){
                                return (
                                    <Marker position={[data.adresse.latitude,data.adresse.longitude]}  icon={new L.Icon({
                                        iconUrl: redIcon,
                                        iconRetinaUrl: redIcon,
                                        iconSize: [25, 41],
                                        iconAnchor: [12, 41],
                                        popupAnchor: [1, -34],
                                        shadowSize: [41, 41]
                                    })} key={i} >
                                        <Popup>
                                            {data.pseudo}
                                        </Popup>
                                    </Marker>
                                )
                            }else{
                                return (
                                    <Marker position={[data.adresse.latitude,data.adresse.longitude]}  icon={new L.Icon({
                                        iconUrl: blueIcon,
                                        iconRetinaUrl: blueIcon,
                                        iconSize: [25, 41],
                                        iconAnchor: [12, 41],
                                        popupAnchor: [1, -34],
                                        shadowSize: [41, 41]
                                    })} key={i} >
                                        <Popup>
                                            {data.pseudo}
                                        </Popup>
                                    </Marker>
                                )
                            }
                            
                        })
                    }
                    
                </MapContainer>
            )
        }
    }
    
    search=()=>{
        this.setState({showResult:false});
        if(window.location.pathname.split('/')[1]==='recherche')
            window.history.pushState("object or string", "Title", '/recherche/'+decodeURI(this.state.text.toString())+'/'+this.state.district);
        else
            window.history.pushState("object or string", "Title", '/profil-patient/recherche/'+decodeURI(this.state.text.toString())+'/'+this.state.district);
        const text = this.state.text===""?"----":this.state.text;
        const  urls='/professionnel/recherche/'+this.state.district+'/'+text+'/'+this.state.page+'/'+this.state.size;
        fetchGet(urls).then(data=>{
            if(data!==null && data!==undefined){
                if(data.content !==null && data.content !==undefined){
                    const dataTmp=data.content;
                    this.setState({listResultSearch : data.content,page : data.page, totalPage : data.nbPage, nbElement : data.nbElement});
                    console.log('rechercherNew : ', data);
                    if(dataTmp.length > 0){
                        this.setState({hiddenMap:false,position:[dataTmp[0].adresse.latitude,dataTmp[0].adresse.longitude]});
                    } else this.setState({hiddenMap:true});
                }
            }
            this.setState({showResult:true});
        });
    }
    getInitial=(complete)=>{
        const initials = complete.trim().split(' ');
        var init = '';
        for(let i = 0; i < initials.length; i++){
            init+=initials[i][0]+' ';
        }
        return init;
    }
    componentDidMount(){
        if(localStorage.getItem('idUser')!==null){
            this.setState({idUser:localStorage.getItem('idUser')});
        }
        fetchGet('/adresse/find-district-part/all').then(data=>{
            // const newData= [];
            // for (let i = 0; i < data.length; i++) {
            //     newData.push({ value : data[i].idDistrict,label :data[i].nomDistrict});
            // }
            this.setState({listDistrict: data});
        });
        console.log(this.props.dataFind)
        if(this.props.dataFind!==null){
            if(this.props.dataFind.text==="" && this.props.dataFind.district==="0"){
                const  urls='/professionnel/recherche/0/----/'+this.state.page+'/'+this.state.size;
                fetchGet(urls).then(data=>{
                    console.log(data)
                    if(data!==null && data!==undefined){
                        if(data.content !==null && data.content !==undefined){
                            const dataTmp=data.content;
                            this.setState({listResultSearch : data.content,page : data.page, totalPage : data.nbPage, nbElement : data.nbElement});
                            console.log('rechercherNew : ', data);
                            if(dataTmp.length > 0){
                                this.setState({hiddenMap:false,position:[dataTmp[0].adresse.latitude,dataTmp[0].adresse.longitude]});
                            } else this.setState({hiddenMap:true});
                        }
                    }
                    this.setState({showResult:true});
                });
            }else{
                this.setState({text:decodeURI(this.props.dataFind.text.toString()),district:this.props.dataFind.district},function(){
                    const text = this.state.text===""?"----":this.state.text;
                    const  urls='/professionnel/recherche/'+this.state.district+'/'+text+'/'+this.state.page+'/'+this.state.size;
                    fetchGet(urls).then(data=>{
                        console.log(data)
                        if(data!==null && data!==undefined){
                            if(data.content !==null && data.content !==undefined){
                                const dataTmp=data.content;
                                this.setState({listResultSearch : data.content,page : data.page, totalPage : data.nbPage, nbElement : data.nbElement});
                                console.log('rechercherNew : ', data);
                                if(dataTmp.length > 0){
                                    this.setState({hiddenMap:false,position:[dataTmp[0].adresse.latitude,dataTmp[0].adresse.longitude]});
                                } else this.setState({hiddenMap:true});
                            }
                        }
                        this.setState({showResult:true});
                    });
                })
            }
            console.log('rechercherNew : ', this.props.dataFind);
        }else{
            const urls='/professionnel/recherche/0/----/'+this.state.page+'/'+this.state.size;
            fetchGet(urls).then(data=>{
                if(data!==null && data!==undefined){
                    if(data.content !==null && data.content !==undefined){
                        const dataTmp=data.content;
                        this.setState({listResultSearch : data.content,page : data.page, totalPage : data.nbPage, nbElement : data.nbElement});
                        console.log('rechercherNew : ', data);
                        if(dataTmp.length > 0){
                            this.setState({hiddenMap:false,position:[dataTmp[0].adresse.latitude,dataTmp[0].adresse.longitude]});
                        } else this.setState({hiddenMap:true});
                    }
                }
                this.setState({showResult:true});
            });
        }
    }
    searchOnChange=(param, e)=>{
        if(param==="district"){
            if(e!==null)
                this.setState({[param]:e.value});
            else
                this.setState({[param]:'0'});
        }else
            this.setState({[param]:e.target.value});
    }
    changeStateShow=(status)=>{
        this.setState({stateShow:status});
    }
    changeCentre=(data)=>{
        this.setState({professionnelDetail:data, stateShow:2});
    }
    scrollToTop() {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
    }
    handlePageChange=(pageNumber)=> {
        this.scrollToTop();
        const text = this.state.text===""?"----":this.state.text;
        const  urls='/professionnel/recherche/'+this.state.district+'/'+text+'/'+(pageNumber-1)+'/'+this.state.size;
        fetchGet(urls+'/'+pageNumber).then(data=>{
            console.log(data)
            if(data!==null && data!==undefined){
                if(data.content !==null && data.content !==undefined){
                    this.setState({listResultSearch : data.content,activePage : pageNumber, totalPage : data.nbPage,nbElement : data.nbElement}, function(){
                        console.log('count : ', this.state.listResultSearch.length);
                        if(this.state.listResultSearch.length > 0) this.setState({hiddenMap:false});
                        else this.setState({hiddenMap:true});
                    });
                    console.log('rechercherNew : ', data);
                }
                if(data.content.length > 0) this.setState({hiddenMap:false});
                else this.setState({hiddenMap:true});
            }
            this.setState({showResult:true});
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
                width: '100%',
                height: '51px',
                borderRadius: '0 !important',
                backgroundColor: '#fff',
                marginLeft: 0,
                // border:'1px solid #38a3a5'
                border:'none',
                boxShadow:'0px 0px 5px 5px #f1f1f1'
            }),
            container: base => ({
                ...base,
                // flex: 1,
                height:51,
                padding:0
                // margin:'0 auto',

              })
        }
        return(
            <div className="search-centre-container">
                {this.state.stateShow===1?(
                <>
                    <div className={this.props.show?"divRecherchePrincipaleRechercheMedecinProfil":"divRecherchePrincipaleRechercheMedecin"}>
                        <div className="divSearchBar row">
                            <input className="inputSearch col-md-4" name="text" type="text" value={this.state.text} onChange={this.searchOnChange.bind(this,'text')} placeholder="Rechercher un professionnel de santé" />
                            {/* <select className="selectSearch col-md-4" name="district" value={this.state.district} onChange={this.searchOnChange.bind(this,'district')}>
                                <option value="0">Votre district</option>
                                { 
                                    this.state.listDistrict.map((data,i)=>{
                                        return <option value={data.value}  key={i}>{data.label}</option>
                                    })
                                }
                            </select> */}
                            <Select styles={customStyles} isClearable className="col-md-4" options={this.state.listDistrict} onChange={this.searchOnChange.bind(this,"district")}/>
                            <button href='#sendMessage' className="buttonSearch col-md-2" onClick={()=>this.search()}><FontAwesomeIcon icon={faSearch}/></button>
                        </div>
                    </div>
                    <div className="row">
                        {!this.state.showResult?<div style={{textAlign:"center", width:"100%"}}><Loader/></div>:<>
                            <div className="col-md-4 col-sm-12 fathermapsRechercheMedecin">
                            {/* style={{position : `${this.state.nav}`,top:`${this.state.tops}`,width:'400px'}} */}
                                <div hidden={this.state.hiddenMap} className="mapsRechercheMedecin">
                                    {this.getMap(this.state.listResultSearch)}
                                </div>
                            </div>
                            <div className="col-md-8 col-sm-12 listeMedecinRechercheMedecin">
                                <span className="ccol-md-12 text-before-list" hidden={this.state.hiddenMap}>Prenez rendez-vous en ligne avec un médecin partout à Madagascar</span>
                                {this.getDataHtmlResultatRecherche(this.state.listResultSearch)}
                                
                            </div>
                            </>}
                    </div>
                </>):(this.state.professionnelDetail!==null?<DetailCentre setStateShow={this.changeStateShow} professionnelData={this.state.professionnelDetail}/>:'')
                }
            </div>
        )
    }
}