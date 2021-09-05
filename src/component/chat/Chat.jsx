
import React, {Component} from 'react';
import './Chat.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faInfo, faPaperPlane, faSearch} from '@fortawesome/free-solid-svg-icons';
import { fetchGet } from '../../services/global.service';
import { authUser } from '../../services/authUser';
import { utile } from '../../services/utile';
import urlConf from '../../config';
const Stomp = require('stompjs');

var stompClient = null;
var write = false;
class Chat extends Component{
    constructor(props){
        super();
        this.state = {
            text : '',
            broadcast : null,
            userDiscusion : null,
            listMessage : [],
            listUserChat : [],
            dataUser : null,
            listBroadcast : [],
            nombreDeMessage : 0,
            countMessage : 0,
            searchInput:''
        }
    }
    connect = () => {
        var SockJS = require('sockjs-client');
        SockJS = new SockJS(urlConf()+'/ws')
        stompClient = Stomp.over(SockJS);
        stompClient.connect({}, this.onConnected, this.onError);
    }
    deconnection () {
        if(stompClient){
            stompClient.disconnect = (callback, headers) => {
                //console.log("deconnecter stomp");
                //stompDisconnect(callback, headers);
                //SockJS. close();
            }
        }
    }
    onConnected = () => {
        if (stompClient) {
            // Subscribing to the public topic : send message
            stompClient.subscribe('/topic/pubic', this.onMessageReceived);

            // Subscribing to the broadcast : entraint d'ecrire
            stompClient.subscribe('/topic/broadcastMessage', this.onBroadCast);

            // Subscribing to the vue : vue de message
            stompClient.subscribe('/topic/vueMessage', this.onVueMessage);
        }
    
    }
    onVueMessage = (payload) => {
        const vueMess = JSON.parse(payload.body);
        if(vueMess !==null && vueMess!==undefined && this.state.dataUser!==null && this.state.dataUser!==undefined){
            if(vueMess.activation && (''+vueMess.idUserSender === ''+this.state.dataUser.idUser || ''+vueMess.idUserReceved === ''+this.state.dataUser.idUser)){
                const list = this.state.listMessage;let size = list.length;
                for (let i = 0; i < size; i++) {
                    if(list[i].etatMessage === 1){
                        list[i].etatMessage = 11;
                    }
                }
                this.setState({listMessage : list});
            }
        }
    }
    sendMessage = () => {
        if(stompClient && this.state.dataUser!==null && this.state.dataUser!==undefined) {
            let size = this.state.listMessage.length;
            if(size<=0){
                size=1;
            }
            const chatMessage = {
                idMessage : 0,
                idUserSend : this.state.dataUser.idUser,
                idUserReceved : this.state.userDiscusion.user.idUser,
                message : this.state.text,
                etatMessage : 1
            };
            // send public message
            //console.log( 'chatMessage : ' , chatMessage)
            stompClient.send("/app/sendMessage", {}, JSON.stringify(chatMessage));
            this.setState({text : ''});write = false;this.onWrite(false,this.state.dataUser.idUser,this.state.userDiscusion.user.idUser);
        }else{
            alert('Erreur socket');
        }
    }
    onMessageReceived = (payload) => {
        const message = JSON.parse(payload.body);
        const data = this.state.listMessage;
        if(message !==null && message!==undefined && this.state.dataUser !==null && this.state.dataUser!==undefined){
            if(''+message.idUserSend === ''+this.state.dataUser.idUser || ''+message.idUserReceved === ''+this.state.dataUser.idUser){
                data.push(message);
                //console.log('---------------------------------------------------------');
                //console.log('tous les messages : ',data);
                //console.log('---------------------------------------------------------');
                this.setState({listMessage : data});
                /*fetchGet('/discussion/lsitDiscussion/'+authUser.getToken()+'/'+message.idUserSend+'/0').then(data=>{
                    //this.setState({listMessage : data.reverse()});
                    fetchGet('/discussion/nombreDeDiscussion/'+authUser.getToken()+'/'+message.idUserSend).then(dataV2=>{
                        if(utile.parseStringToInt(''+dataV2)>0){
                            this.setState({nombreDeMessage : dataV2-5});
                            //console.log('nombreDeMessage :',dataV2-5)
                        }
                    }); 
                });*/
                if(''+message.idUserReceved === ''+this.state.dataUser.idUser){
                    if(stompClient) {
                        const data = {
                            idUserSender : message.idUserSend,
                            idUserReceved : message.idUserReceved,
                            activation : false
                        }
                        // send public message
                        stompClient.send("/app/vueMessage", {}, JSON.stringify(data));
                    }else{
                        alert('Erreur socket');
                    }
                }
            }
            
        }
    }
    onBroadCast = (payload) => {
        const broad = JSON.parse(payload.body);
        if(broad !==null && broad!==undefined && this.state.dataUser !==null && this.state.dataUser!==undefined){
            if(''+broad.idUserSender === ''+this.state.dataUser.idUser || ''+broad.idUserReceved === ''+this.state.dataUser.idUser){
                const list =this.state.listBroadcast;let size= list.length;let test = false;
                for(let i=0; i < size; i++){
                    if(''+list[i].idUserSender === ''+broad.idUserSender && ''+list[i].idUserReceved === ''+broad.idUserReceved){
                        const tmp = list[i];test=true;
                        tmp.activation = broad.activation;
                        list[i] = tmp;break;
                    }
                }
                if(!test){
                    list.push(broad);
                }
                this.setState({listBroadcast : list});
                //console.log('broadCast : ',list);
            }
        }
    }
    onWrite(etat,idUserSender,idUserReceved){
        if (stompClient) {
            const data = {
                idUserSender : idUserSender,
                idUserReceved : idUserReceved,
                activation : etat
            }
          // send public message
          stompClient.send("/app/broadcastMessage", {}, JSON.stringify(data));
        }else{
            alert('Erreur socket');
        }
    }
    handleChangeText=(e,userDiscusion)=>{
        if(userDiscusion !== null && userDiscusion !== undefined && this.state.dataUser!==null && this.state.dataUser !== undefined){
            const valeur = e.target.value;
            if(valeur!== null && valeur !==undefined && valeur !== ''){
                if(!write){
                    this.onWrite(true,this.state.dataUser.idUser,userDiscusion.user.idUser);
                    write= true;
                }
                this.setState({text : valeur});
            }else{
                if(write){
                    this.onWrite(false,this.state.dataUser.idUser,userDiscusion.user.idUser);
                    write= false;
                }
                this.setState({text : ''});
            }
        }
    }
    getDataHtmlBroadCast(list){
        let size = list.length;
        if(size>0 && this.state.dataUser !==null && this.state.dataUser!==undefined){
            for(let i = 0; i < size; i++){
                if(list[i].idUserReceved === this.state.dataUser.idUser && list[i].activation){
                    return <div className="divWriterChat"><Loader type="ThreeDots" color="#1b7895" height={80} width={80} /></div>
                }
            }
        }
        //console.log('broadCast : ',list);
        return <div></div>
    }
    getUrlPhotos(photo){
        try {
            if(photo!==null && photo!==undefined && photo!==''){
                return <img src={"/uploads/"+photo} className="imgListeChat" alt="profile"/>
            }
        } catch (error) { }
        return <img src={"/uploads/profile.jpg"} className="imgListeChat" alt="profile"/>
    }
    getUrlPhotosChat(photo){
        try {
            if(photo!==null && photo!==undefined && photo!==''){
                return <img src={"/uploads/"+photo} className="NewimgListeChat" alt="profile"/>
            }
        } catch (error) { }
        return <img src={"/uploads/profile.jpg"} className="NewimgListeChat" alt="profile"/>
    }
    getUrlPhotosChatMessage(photo){
        try {
            if(photo!==null && photo!==undefined && photo!==''){
                return <img src={"/uploads/"+photo} className="imgListeChat imgListeChatTwo" alt="profile"/>
            }
        } catch (error) { }
        return <img src={"/uploads/profile.jpg"} className="imgListeChat imgListeChatTwo" alt="profile"/>
    }
    getNameUser(nom,prenoms){
        if(nom!==null && nom!==undefined && prenoms!==null && prenoms!==undefined){
            return nom+' '+prenoms;
        }
        return '';
    }
    getInfoUserToDiscussion(userDiscusion){
        if(userDiscusion!==null && userDiscusion!==undefined){
            return (
                <div className="row profilUserChat">
                    <div className=" col-sm-12 col-md-3 imageProfilUserChat">{this.getUrlPhotosChat(userDiscusion.user.profilPicture)}</div>
                    <div className=" col-sm-12 col-md-6 textNomUserProfilChat">{this.getNameUser(userDiscusion.user.nom,userDiscusion.user.prenoms)}</div>
                    <div className=" col-sm-12 col-md-3 iconTitleChat">
                        <ul className="newListChatv2">
                            <li className="iconDiscusionChat"><span className="badge badge-info bageInformationUserChat"><FontAwesomeIcon icon={faInfo}/></span></li>
                        </ul>
                    </div>
                </div>
            )
        }
        return  <div className="row profilUserChat"></div>
    }
    getButtonSendMessage(userDiscusion,text){
        if(userDiscusion !== null || userDiscusion !== undefined || text!==null || text!==undefined || text!==''){
            return <li className="ilOneSmsSizeChat"><button className="sendMessageInChat btn btn-primary form-control" disabled={false} onClick={()=>this.sendMessage()}><FontAwesomeIcon icon={faPaperPlane}/></button></li>;
        }
        return <li className="ilOneSmsSizeChat"><button className="sendMessageInChat btn btn-primary form-control" disabled={true} onClick={()=>this.sendMessage()}><FontAwesomeIcon icon={faPaperPlane}/></button></li>
    }
    getDataHtmlVuMessage(etat){
        if(etat > 1){
            return "vue";
        }
        return "non vue";
    }
    getDataHtmlChat(userDiscusion,listMessages){
        const listMessage = listMessages;
        if(userDiscusion !== null && userDiscusion !== undefined && this.state.dataUser!==null && this.state.dataUser !== undefined){
            return (
                <div className="col-md-7 col-sm-12">
                    {this.getInfoUserToDiscussion(userDiscusion)}
                    <div className="NewchampsChat">
                        <div className="allSmsChat" ref="messageBox">
                            <div className="iconvoirMessagePlusChat" hidden={this.state.nombreDeMessage<=0}><div className="soniconvoirMessagePlusChat" onClick={()=>this.addLastMessage(userDiscusion)}><FontAwesomeIcon className="sonofChildiconvoirMessagePlusChat" icon={faArrowUp}/></div></div>
                                {
                                    (listMessage).map((messages,i)=>{
                                        return (
                                            <div key={i}>
                                                {
                                                    (''+messages.idUserSend === ''+this.state.dataUser.idUser && ''+messages.idUserReceved === ''+userDiscusion.user.idUser)?
                                                    (
                                                        <ul className="newListChat ulSmsChat">
                                                            <li className="ilTwoSmsSizeChat"><p className="textSmsChatRight">{messages.message}</p><p className="dateSmsChatV2">{utile.getDateCompletWithHoureAndMinute(messages.dateMessage)} &ensp;&ensp;&ensp; {this.getDataHtmlVuMessage(messages.etatMessage)}</p></li>
                                                            <li className="rightliSmsChat ilOneSmsSizeChat">{this.getUrlPhotosChatMessage(this.state.dataUser.profilPicture)} <br/></li>
                                                        </ul>
                                                    ): (<div></div>) 
                                                }

                                                {
                                                    (''+messages.idUserReceved === ''+this.state.dataUser.idUser && ''+messages.idUserSend === ''+userDiscusion.user.idUser) ?
                                                    (
                                                        <ul className="newListChat ulSmsChat">
                                                            <li className="letfliSmsChat ilOneSmsSizeChat">{this.getUrlPhotosChatMessage(userDiscusion.user.profilPicture)}</li>
                                                            <li className="ilTwoSmsSizeChat"><p className="textSmsChat">{messages.message}</p><p className="dateSmsChatV1">{utile.getDateCompletWithHoureAndMinute(messages.dateMessage)} &ensp;&ensp;&ensp; {this.getDataHtmlVuMessage(messages.etatMessage)}</p></li>
                                                        </ul>
                                                    ): (<div></div>)
                                                }
                                            </div>
                                        )
                                    })
                                } 
                            </div>
                        {this.getDataHtmlBroadCast(this.state.listBroadcast)}
                    </div>
                    <div className="saisiSmsChat">
                        <ul className="newListChat ulSmsChat">
                            <li className="ilTwoSmsSizeChat"><textarea rows="2" className="form-control" onChange={(e)=>this.handleChangeText(e,this.state.userDiscusion)} placeholder="Saisissez votre message"></textarea></li>
                            {this.getButtonSendMessage(this.state.userDiscusion,this.state.text)}
                        </ul>
                    </div>
                </div>
            )
        }
        return <div></div>
    }
    scrollToBottom = () => {
        var object = this.refs.messageBox;
        if (object){object.scrollTop = object.scrollHeight;}
    }
    addLastMessage=(userDiscusion)=>{
        let count = this.state.countMessage;count=count+5;
        let nombreDeMessage= this.state.nombreDeMessage-5;
        fetchGet('/discussion/lsitDiscussion/'+authUser.getToken()+'/'+userDiscusion.user.idUser+'/'+count).then(data=>{
            //console.log('listTouslesMessageV2 : ',data); const dataTmp = data.reverse();
            const list =this.state.listMessage;let size= list.length;
            for(let i = 0; i < size; i++){
                dataTmp.push(list[i]);
            }
            if(nombreDeMessage<=0){
                nombreDeMessage = 0;
            }
            this.setState({countMessage : count,listMessage : dataTmp, nombreDeMessage : nombreDeMessage});
        });
    }
    getDataMessageUserAndUserRecevedMessage=(dataReceved)=>{
        fetchGet('/discussion/lsitDiscussion/'+authUser.getToken()+'/'+dataReceved.user.idUser+'/0').then(data=>{
            //console.log('listTouslesMessage : ',data);
            this.setState({userDiscusion : dataReceved,listMessage : data.reverse()});
            fetchGet('/discussion/nombreDeDiscussion/'+authUser.getToken()+'/'+dataReceved.user.idUser).then(dataV2=>{
                if(utile.parseStringToInt(''+dataV2)>0){
                    this.setState({nombreDeMessage : dataV2-5});
                    //console.log('nombreDeMessage :',dataV2-5);
                    if(stompClient && this.state.dataUser!==null && this.state.dataUser!==undefined) {
                        const data = {
                            idUserSender : this.state.dataUser.idUser,
                            idUserReceved : dataReceved.user.idUser,
                            activation : false
                        }
                        // send public message
                        stompClient.send("/app/vueMessage", {}, JSON.stringify(data));
                    }else{
                        alert('Erreur socket');
                    }
                }
            }); 
        });
        /*fetchGet('/discussion/vueDiscussion/'+authUser.getToken()+'/'+dataReceved.user.idUser).then(data=>{
            if(data.resultat){
                fetchGet('/discussion/lsitDiscussion/'+authUser.getToken()+'/'+dataReceved.user.idUser+'/0').then(data=>{
                    //console.log('listTouslesMessage : ',data);
                    this.setState({userDiscusion : dataReceved,listMessage : data.reverse()});
                    fetchGet('/discussion/nombreDeDiscussion/'+authUser.getToken()+'/'+dataReceved.user.idUser).then(dataV2=>{
                        if(utile.parseStringToInt(''+dataV2)>0){
                            this.setState({nombreDeMessage : dataV2-5});
                            //console.log('nombreDeMessage :',dataV2-5)
                        }
                    }); 
                });
            }else{
                fetchGet('/discussion/lsitDiscussion/'+authUser.getToken()+'/'+dataReceved.user.idUser+'/0').then(data=>{
                    //console.log('listTouslesMessage : ',data);
                    this.setState({userDiscusion : dataReceved,listMessage : data.reverse()});
                    fetchGet('/discussion/nombreDeDiscussion/'+authUser.getToken()+'/'+dataReceved.user.idUser).then(dataV2=>{
                        if(utile.parseStringToInt(''+dataV2)>0){
                            this.setState({nombreDeMessage : dataV2-5});
                            //console.log('nombreDeMessage :',dataV2-5)
                        }
                    }); 
                });
            }
        });*/
    }
    getAllMedecin(){
        fetchGet('/medecin/allConsultedMedecin/'+authUser.getToken()).then(data=>{
            if(data!=null){
                //console.log('list medecin ',data)
                this.setState({ listUserChat: data });
            }
        });
    }    
    componentDidUpdate(prevProps, prevState) {
        this.scrollToBottom();
       /*varif(this.props.etatDeconnecterSocket !== null && this.props.etatDeconnecterSocket!==undefined){
           if(this.props.etatDeconnecterSocket){
                alert('Deconnection')
           }
       }*/
    }
    
    componentDidMount(){
        fetchGet('/users/dataUser/'+authUser.getToken()).then(data=>{
            //console.log('type-medecin/list : ',data);
            this.setState({ dataUser: data }); 
        });
        this.getAllMedecin();
        this.connect();
        //console.log('props : ', this.props)
    }
    handleChange = (param, e) => {
        this.setState({ [param]: e.target.value })
    }
    rechercheInChat=()=>{
        alert(this.state.searchInput)
    }
    keyPressed=(e)=>{
        if(e.keyCode===13)
            this.rechercheInChat();
    }
    render(){
        return (
            <div className="AllChat">
               <h1 className="titleChat"> <b>Causette</b></h1>
               <div className="row">
                   <div className="col-md-5 col-sm-12">
                        <div className="champsChat">
                            <div className="row">                        
                                <div className="col-sm-12">                   
                                    <div className="input-group">
                                    <input type="text" className="form-control inputSearchChat" name='searchInput'  onKeyDown={this.keyPressed.bind(this)} value={this.state.searchInput} onChange={this.handleChange.bind(this,'searchInput')} placeholder="Recherche" />
                                    <span className="input-group-btn"><button className="btn buttonSearchChat" onClick={this.rechercheInChat} type="button"><FontAwesomeIcon icon={faSearch}/></button></span>
                                    </div>
                                </div>
                            </div>
                            <hr className="brChat" />
                            <div className="allListChat">
                                
                                {
                                    this.state.listUserChat.map((data,i)=>{
                                        return (
                                            <div className="divAllListChat" key={i} onClick={()=>this.getDataMessageUserAndUserRecevedMessage(data)}>
                                                <ul className="newListChat">
                                                    <li className="TmpRiNewNomListChat">{this.getUrlPhotos(data.user.profilPicture)}<br/><span className="NewNomListChat"><span className="badge badge-success">En ligne</span></span></li>
                                                    <li className="liNewNomListChat"><span className="NewNomListChat">{this.getNameUser(data.user.nom,data.user.prenoms)} <br/> <span className="badge badge-info">Médecin</span> <br/> <span className="badge badge-primary">4 sms</span></span></li>
                                                </ul>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                   </div>

                   {/*Chat*/}
                   {this.getDataHtmlChat(this.state.userDiscusion,this.state.listMessage)}
               </div>
            </div>
        )
    }
}
export default Chat;