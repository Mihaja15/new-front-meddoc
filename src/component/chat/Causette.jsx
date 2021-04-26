
import React, {Component} from 'react';
import './Causette.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSearch, faEdit,faInbox} from '@fortawesome/free-solid-svg-icons';
import { fetchGet } from '../../services/global.service';
import { authUser } from '../../services/authUser';
import { utile } from '../../services/utile';
import urlConf from '../../config';
const Stomp = require('stompjs');

var stompClient = null;
// var write = false;
class Causette extends Component{
    constructor(props){
        super();
        this.state = {
            broadcast : null,
            userDiscussion : null,
            listMessage : [],
            listDiscussion : [],
            dataUser : null,
            listBroadcast : [],
            nombreDeMessage : 0,
            countMessage : 0,
            searchInput:'',
            messageInput:'',
            toInput:'',
            showToInput:false,
            listToInput:[],
            showListToInput:false,
            max:5,
            showPlus:false
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
                console.log("deconnecter stomp");
            }
        }
    }
    onConnected = () => {
        if (stompClient) {
            // Subscribing to the public topic : send message
            stompClient.subscribe('/topic/public', this.onMessageReceived);
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
        if(stompClient && this.state.dataUser!==null && this.state.dataUser!==undefined && this.state.userDiscussion!==null && this.state.userDiscussion!==undefined) {
            let size = this.state.listMessage.length;
            if(size<=0){
                size=1;
            }
            const discussion = {
                userSender : {
                    idUser:this.state.dataUser.idUser
                },
                userReceiver : {
                    idUser:this.state.userDiscussion.idUser
                },
                contents : this.state.messageInput,
                status : 1
            };
            // let liste = this.state.listDiscussion;
            // liste.push(discussion);
            // this.setState({listDiscussion:liste});
            // send public message
            console.log( 'chatMessage : ' , discussion)
            stompClient.send("/app/sendNewMessage", {}, JSON.stringify(discussion));
            this.setState({messageInput : ''});
            // write = false;
            this.onWrite(false,this.state.dataUser.idUser,this.state.userDiscussion.idUser);
        }else{
            alert('Erreur socket');
        }
    }  
    onMessageReceived = (payload) => {
        const message = JSON.parse(payload.body);
        console.log(message)
        const dataList = this.state.listMessage;
        if(message !==null && message!==undefined && this.state.dataUser !==null && this.state.dataUser!==undefined){
            if(''+message.userSender.idUser === ''+this.state.dataUser.idUser || ''+message.userReceiver.idUser === ''+this.state.dataUser.idUser){
                console.log(dataList);
                dataList.unshift(message);
                console.log(dataList);
                // dataList[this.state.listMessage.length] = message;
                fetchGet('/discussion/listDiscussionByUser/'+authUser.getToken()+'/ /'+this.state.max).then(data=>{
                    this.setState({listMessage : dataList,listDiscussion:data});
                });
                 if(''+message.userReceiver.idUser === ''+this.state.dataUser.idUser){
                    if(stompClient) {
                        const data = {
                            idUserSender : message.userSender.idUser,
                            idUserReceved : message.userReceiver.idUser,
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
                console.log('broadCast : ',list);
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
    handleChange = (param, e) => {
        this.setState({ [param]: e.target.value })
    }
    rechercheInChat=()=>{
        if(this.state.searchInput.toString().trim()!=='')
            fetchGet('/discussion/listDiscussionByUser/'+authUser.getToken()+'/'+this.state.searchInput+'/'+this.state.max).then(data=>{
                this.setState({listDiscussion:data});
            });
        else
            fetchGet('/discussion/listDiscussionByUser/'+authUser.getToken()+'/ /'+this.state.max).then(data=>{
                this.setState({listDiscussion:data});
            });
    }
    keyPressed=(e)=>{
        if(e.keyCode!==13)
            this.rechercheInChat();
    }
    searchUserKeyPressed=(e)=>{
        if(e.keyCode!==13){
            // alert(e.keyCode)
            if(this.state.toInput==='')
            this.setState({listToInput:[]});
            fetchGet('/users/search-user-discussion/'+authUser.getToken()+'/'+this.state.toInput+'/'+this.state.dataUser.typeUser.idTypeUser+'/'+this.state.max).then(liste=>{
                this.setState({listToInput:liste});
            });
        }
    }
    viewOlderMessage=()=>{
        this.setState({max:this.state.max+5,showPlus:true},function(){
            fetchGet('/discussion/listMessageByUser/'+authUser.getToken()+'/'+this.state.userDiscussion.idUser+'/'+this.state.max).then(messages=>{
                this.setState({listMessage:messages,showPlus:false});
            });
        })
    }
    componentDidMount(){
		fetchGet('/users/dataUser/'+authUser.getToken()).then(data=>{
            console.log('type-medecin/list : ',data);
            this.setState({ dataUser: data },function(){
				fetchGet('/discussion/listDiscussionByUser/'+authUser.getToken()+'/ /'+this.state.max).then(data=>{
					this.setState({listDiscussion:data},function(){
						// if(this.state.listDiscussion.length>0){
                        //     this.setState({userDiscussion:this.state.listDiscussion[0].user},function(){
                        //         fetchGet('/discussion/listMessageByUser/'+authUser.getToken()+'/'+this.state.userDiscussion.idUser+'/'+this.state.max).then(messages=>{
                        //             console.log(messages);
                        //             this.setState({listMessage:messages});
                        //         });
                        //     });
						// }
					});
				});
			}); 
        });
        this.connect();
    }
    onClickDiscussion=(userDiscuss)=>{
        this.setState({userDiscussion:userDiscuss,max:5,showToInput:false},function(){
            fetchGet('/discussion/listMessageByUser/'+authUser.getToken()+'/'+this.state.userDiscussion.idUser+'/'+this.state.max).then(messages=>{
                console.log(messages);
                fetchGet('/discussion/nombreDeDiscussion/'+authUser.getToken()+'/'+this.state.userDiscussion.idUser).then(nb=>{
                    this.setState({nombreDeMessage : nb});
                    this.setState({listMessage:messages});
                });
            });
        })
    }
    onSelectUser=(userDiscuss)=>{
        this.setState({userDiscussion:userDiscuss,max:5,showToInput:false,listToInput:[]},function(){
            fetchGet('/discussion/listMessageByUser/'+authUser.getToken()+'/'+this.state.userDiscussion.idUser+'/'+this.state.max).then(messages=>{
                console.log(messages);
                fetchGet('/discussion/nombreDeDiscussion/'+authUser.getToken()+'/'+this.state.userDiscussion.idUser).then(nb=>{
                    this.setState({nombreDeMessage : nb});
                    this.setState({listMessage:messages});
                });
            });
        })
    }
    render(){
        return(
            <div className='causette-container'>
                <div className="container">
                    <div className="row chat__container">
                        <div className='col-md-4 list-discussion'>
                            <div className="card-header">
                                <div className='row'>
                                    <div className="input-group col-md-9">
                                        <input type="text" className="form-control inputSearchChat" name='searchInput' onKeyUp={this.keyPressed.bind(this)} value={this.state.searchInput} onChange={this.handleChange.bind(this,'searchInput')} placeholder="Recherche" />
                                        <a href='#0' className="btn searchButtonChat" onClick={this.rechercheInChat} type="button"><FontAwesomeIcon icon={faSearch}/></a>
                                    </div>
                                    <div className='col-md-3'><a className='btn newMessageButton' onClick={()=>this.setState({showToInput:!this.state.showToInput})} href='#0' type='button'><FontAwesomeIcon icon={faEdit}/></a></div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="discussion-list">
                                    <ul className="">
                                        {
                                            this.state.listDiscussion.map((discussion,i)=>{
                                                return (
                                                    <li key={i} onClick={()=>this.onClickDiscussion(discussion.user)} className="row">
                                                        <div className='col-md-3 profile-place'>
                                                            <img src={`/uploads/${discussion.user.profilPicture!==null?discussion.user.profilPicture:'profile.jpg'}`} alt='causette profile'/>
                                                        </div>
                                                        <div className='row col-md-9 discussion-detail-place'>
                                                            <span className='col-md-8 name-place'>{discussion.user.nom+' '+discussion.user.prenoms}</span><br/><span className='col-md-4 date-place'>{utile.formatDate(new Date(discussion.sentTime))}</span>
                                                            <span className='col-md-12 message-place'>{discussion.type==='out'?'Vous:':''}{discussion.contents}</span>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-8 message-content'>
                            <div className="card-header">
                                <div className="row" style={{visibility:this.state.userDiscussion===null||this.state.showToInput?'hidden':'visible'}}>
                                    <div className='col-md-3'><img src={`/uploads/${this.state.userDiscussion!==null?this.state.userDiscussion.profilPicture:'profile.jpg'}`} alt='causette header profile'/></div>
                                    <div className='col-md-6'><h2>{this.state.userDiscussion!==null?this.state.userDiscussion.nom+' '+this.state.userDiscussion.prenoms:''}</h2></div>
                                    <div className='col-md-3'></div>
                                </div>
                                <div className="row list-users-discussion" style={{display:this.state.showToInput?'block':'none'}}>
                                    <div className='col-md-12 row'>
                                        <div className="input-group">
                                            <label classNme='col-md-4'>Envoyer à:</label>
                                            <input classNme='col-md-8' value={this.state.toInput} onChange={this.handleChange.bind(this,'toInput')} onKeyUp={this.searchUserKeyPressed.bind(this)} name='toInput'/>
                                        </div>
                                        <div className="users-list" style={{display:this.state.listToInput.length!==0?'block':'none'}}>
                                            <ul>
                                                {
                                                    this.state.listToInput.map((one,i)=>{
                                                        return(
                                                            <li key={i} onClick={()=>this.onSelectUser(one)}>{one.nom+' '+one.prenoms}</li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className='selection-message row' style={{visibility:this.state.userDiscussion!==null?'hidden':'visible'}}>
                                    <span className='col-md-12'>Veuillez sélectionner une discussion à gauche</span>
                                    <span className='col-md-12'><FontAwesomeIcon icon={faInbox}/></span>
                                </div>
                                <div class="chat" style={{visibility:this.state.userDiscussion===null?'hidden':'visible'}}>
                                    <a href='#0' style={{display:this.state.nombreDeMessage!==this.state.listMessage.length?'block':'none'}} onClick={this.viewOlderMessage}>Voir plus</a>
                                    <span className='loader-show-plus' style={{display:this.state.showPlus?'inline-block':'none'}}></span>
                                        <div class="chat__wrapper">
                                        {
                                            this.state.listMessage.map((messages,i)=>{
                                                let own = messages.userSender.idUser!==undefined?this.state.dataUser.idUser===messages.userSender.idUser?'-own':'':this.state.dataUser.idUser===messages.userSender?'-own':'';
												return(
                                                    <div className={"chat__message chat__message"+own}>
                                                        <div className='content__message'>{messages.contents}</div>
                                                        <div className="date__message">{utile.formatDateTextWithTime(new Date(messages.sentTime))}</div>
                                                    </div>
                                                )
                                            }) 
                                        }
                                    </div>
                                </div>
                                        
                            </div>
                            <div className='card-footer'>
                                <div class="chat__form" style={{visibility:this.state.userDiscussion===null?'hidden':'visible'}}>
                                    <div className="chat__form_input">
                                        <input id="text-message" name='messageInput' value={this.state.messageInput} onChange={this.handleChange.bind(this,'messageInput')} type="text" placeholder="Ecrire votre message ..."/>
                                        <button href='#sendMessage' onClick={this.sendMessage}><FontAwesomeIcon icon={faPaperPlane}/></button>
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
export default Causette