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

export default class Centre extends React.Component{
    constructor(props){
        super();
        this.state={
            page:0,
            size:10,
            nbElement:0,
            totalPage:1,
            text:'',
            district:'',
            listDistrict:[],
            listCentre:[],
            hiddenMap:true,
            position:[0.0,0.0],
            centreDetail:null,
            stateShow:1,
            idUser:null,
            dateHeure:null
        }
    }    
    getUrlPhoto(photo){
        try {
            if(photo!==null && photo!==undefined && photo!==''){
                return <img src={"/assets/upload/"+photo} alt="image_profile" className="photo-centre-search"/>
            }
        } catch (error) { }
        return <img src={"/assets/upload/profile-centre.png"} alt="image_profile" className="photo-centre-search"/>
    }
    getDataHtmlResultatRecherche(listCentre){
        if(listCentre.length>0){
            return (
                <>
                    {
                        (listCentre).map((data,i)=>{
                            return (
                                <div className="row each-line-search" key={i} onMouseOver={()=>{this.setState({indiceIcon :i, setIcon : true, position : [data.adresse.latitude,data.adresse.longitude]})}}>
                                    <div className="col-md-4 col-sm-12 each-line-search-detail">
                                        <div className="">
                                            {this.getUrlPhoto(data.photo)}
                                        </div>
                                        <p className="">{data.adresse.addrValue}</p>
                                        <a href='#0' onClick={()=>this.setState({centreDetail:data,stateShow:2})}>{data.nomCentre}</a>
                                        {/* <a href='#0' onClick={()=>this.setState({medecinDetail:dataTmp.medecinData,stateShow:2,medecinEdt:dataTmp.emploiDuTemps})}></a> */}
                                        {/* <div className="adresseMedecinRechercheMedecin">{data.medecinData.user.adresse.addrValue}</div> */}
                                        {/* <div className="buttonMedecinRechercheMedecin"><a className=" popup-with-move-anim a1" href="#0" onClick={()=>this.setState({medecinDetail:data.medecinData,stateShow:2,medecinEdt:data.emploiDuTemps})}>Prendre rendez-vous</a></div> */}
                                    </div>
                                    <div className="col-md-8 col-sm-12 each-line-search-emploi-temps">
                                        <EmploiTemps centre={data} idCentre={data.idCentre} link={"/covid/schedule"} setDataCentre={this.changeCentre} /*changeStateShow={this.changeStateShow}*//>
                                        {/* <EmploiTemps idCentre={data.idCentre} idUser={this.state.idUser} nomCentre={data.nomCentre} link={"/covid/schedule"}/> */}
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
        }
        return <div>Aucun résultat trouvé</div>
    }//info medecin
    getMap(listCentre){
        if(listCentre.length>0){
            return (
                <MapContainer center={this.state.position} zoom={10} scrollWheelZoom={true}>
                    <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        listCentre.map((data,i)=>{
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
                                            {data.nomCentre}
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
                                            {data.nomCentre}
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
        if(window.location.pathname.split('/')[1]==='recherche-centre')
            window.history.pushState("object or string", "Title", '/recherche-centre/'+decodeURI(this.state.text.toString())+'/'+this.state.district);
        else
            window.history.pushState("object or string", "Title", '/profil/recherche/'+decodeURI(this.state.text.toString())+'/'+this.state.district);
        const text = this.state.text===""?"----":this.state.text;
        const  urls='/covid/recherche/'+this.state.district+'/'+text+'/'+this.state.page+'/'+this.state.size;
        fetchGet(urls).then(data=>{
            if(data!==null && data!==undefined){
                if(data.content !==null && data.content !==undefined){
                    const dataTmp=data.content;
                    this.setState({listCentre : data.content,page : data.page, totalPage : data.nbPage, nbElement : data.nbElement});
                    console.log('rechercherNew : ', data);
                    if(dataTmp.length > 0){
                        this.setState({hiddenMap:false,position:[dataTmp[0].adresse.latitude,dataTmp[0].adresse.longitude]});
                    } else this.setState({hiddenMap:true});
                }
            }
        });
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
                const  urls='/covid/recherche/0/----/'+this.state.page+'/'+this.state.size;
                fetchGet(urls).then(data=>{
                    if(data!==null && data!==undefined){
                        if(data.content !==null && data.content !==undefined){
                            const dataTmp=data.content;
                            this.setState({listCentre : data.content,page : data.page, totalPage : data.nbPage, nbElement : data.nbElement});
                            console.log('rechercherNew : ', data);
                            if(dataTmp.length > 0){
                                this.setState({hiddenMap:false,position:[dataTmp[0].adresse.latitude,dataTmp[0].adresse.longitude]});
                            } else this.setState({hiddenMap:true});
                        }
                    }
                });
            }else{
                this.setState({text:decodeURI(this.props.dataFind.text.toString()),district:this.props.dataFind.district},function(){
                    const text = this.state.text===""?"----":this.state.text;
                    const  urls='/covid/recherche/'+this.state.district+'/'+text+'/'+this.state.page+'/'+this.state.size;
                    fetchGet(urls).then(data=>{
                        if(data!==null && data!==undefined){
                            if(data.content !==null && data.content !==undefined){
                                const dataTmp=data.content;
                                this.setState({listCentre : data.content,page : data.page, totalPage : data.nbPage, nbElement : data.nbElement});
                                console.log('rechercherNew : ', data);
                                if(dataTmp.length > 0){
                                    this.setState({hiddenMap:false,position:[dataTmp[0].adresse.latitude,dataTmp[0].adresse.longitude]});
                                } else this.setState({hiddenMap:true});
                            }
                        }
                    });
                })
            }
            console.log('rechercherNew : ', this.props.dataFind);
        }else{
            const urls='/covid/recherche/0/----/'+this.state.page+'/'+this.state.size;
            fetchGet(urls).then(data=>{
                if(data!==null && data!==undefined){
                    if(data.content !==null && data.content !==undefined){
                        const dataTmp=data.content;
                        this.setState({listCentre : data.content,page : data.page, totalPage : data.nbPage, nbElement : data.nbElement});
                        console.log('rechercherNew : ', data);
                        if(dataTmp.length > 0){
                            this.setState({hiddenMap:false,position:[dataTmp[0].adresse.latitude,dataTmp[0].adresse.longitude]});
                        } else this.setState({hiddenMap:true});
                    }
                }
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
        this.setState({centreDetail:data, stateShow:2});
    }
    handlePageChange=(pageNumber)=> {
        this.scrollToTop();
        const text = this.state.text===""?"----":this.state.text;
        const  urls='/covid/recherche/'+this.state.district+'/'+text+'/'+(pageNumber-1)+'/'+this.state.size;
        fetchGet(urls+'/'+pageNumber).then(data=>{
            if(data!==null && data!==undefined){
                if(data.content !==null && data.content !==undefined){
                    this.setState({listCentre : data.content,activePage : pageNumber, totalPage : data.nbPage,nbElement : data.nbElement}, function(){
                        console.log('count : ', this.state.listCentre.length);
                        if(this.state.listCentre.length > 0) this.setState({hiddenMap:false});
                        else this.setState({hiddenMap:true});
                    });
                    console.log('rechercherNew : ', data);
                }
                if(data.content.length > 0) this.setState({hiddenMap:false});
                else this.setState({hiddenMap:true});
            }
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
            <div className="centre-container">
                {this.state.stateShow===1?(
                <>
                    <div className="divRecherchePrincipaleRechercheMedecin">
                        <div className="divSearchBar row">
                            <input className="inputSearch col-md-4" name="text" type="text" value={this.state.text} onChange={this.searchOnChange.bind(this,'text')} placeholder="Rechercher un centre de vaccination" />
                            {/* <select className="selectSearch col-md-4" name="district" value={this.state.district} onChange={this.searchOnChange.bind(this,'district')}>
                                <option value="0">Votre district</option>
                                { 
                                    this.state.listDistrict.map((data,i)=>{
                                        return <option value={data.value}  key={i}>{data.label}</option>
                                    })
                                }
                            </select> */}
                            <Select styles={customStyles} isClearable className="" options={this.state.listDistrict} onChange={this.searchOnChange.bind(this,"district")}/>
                            <button href='#sendMessage' className="buttonSearch col-md-2" onClick={()=>this.search()}><FontAwesomeIcon icon={faSearch}/></button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-sm-12 fathermapsRechercheMedecin">
                        {/* style={{position : `${this.state.nav}`,top:`${this.state.tops}`,width:'400px'}} */}
                            <div hidden={this.state.hiddenMap} className="mapsRechercheMedecin">
                                {this.getMap(this.state.listCentre)}
                            </div>
                        </div>
                        <div className="col-md-7 col-sm-12 listeMedecinRechercheMedecin">
                            {this.getDataHtmlResultatRecherche(this.state.listCentre)}
                            
                        </div>
                    </div>
                </>):(this.state.centreDetail!==null?<DetailCentre setStateShow={this.changeStateShow} centreData={this.state.centreDetail}/>:'')
                }
            </div>
        )
    }
}