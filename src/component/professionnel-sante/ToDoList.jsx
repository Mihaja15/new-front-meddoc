import { faCheckCircle, faExclamationTriangle, faLock, faLockOpen, faPlusCircle, faSave, faTimesCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { fetchGetHandler, fetchPostHeader } from '../../services/global.service';
import { utile } from '../../services/utile';
import './ToDoList.css';

export default class ToDoList extends React.Component{
    constructor(props){
        super();
        this.state={
            listToDo:[],
            tacheNumero:1
        }
    }
    componentDidMount(){
        fetchGetHandler('/extra/toDoList/get').then(data=>{
            if(utile.hasValue(data)){
                console.log(data);
                this.setState({ listToDo: data });
            }
        });
    }
    addToDo=()=>{
        // const data = this.state.listToDo;
        // data.push({
        //     titre:'',
        //     texte:'',
        //     locked:false
        // });
        this.setState({tacheNumero:(this.state.listToDo.length+1)},function(){                
            const data = [{
                titre:'Nouvelle tâche '+this.state.tacheNumero,
                texte:'',
                locked:false,
                saved:false
            }].concat(this.state.listToDo);
            fetchPostHeader('/extra/toDoList/save',data[0]).then(response=>{
                if(utile.hasValue(response)){
                    console.log(response);
                    // const data= this.state.listToDo;
                    // data[indice].idToDoList= response.idToDoList;
                    this.setState({ listToDo: response });
                }
            });
            // this.setState({listToDo: data});
        })
    }
    removeToDo=(indice)=>{
        const data = this.state.listToDo;
        if(!data[indice].locked){
            if(window.confirm('Voulez vous vraiment supprimer? il n\'y aura pas de sauvegarde.')){
                if(utile.hasValue(data[indice])&&utile.hasValue(data[indice].idToDoList)){
                    var id = data[indice].idToDoList;
                    data.splice(indice, 1);
                    fetchGetHandler('/extra/toDoList/delete/'+id).then(data=>{
                        console.log(data)
                        if(utile.hasValue(data))
                            this.setState({listToDo: data});
                    });
                }
                else{
                    data.splice(indice, 1);
                    this.setState({listToDo: data});
                }
            }
        }
    }
    saveToDo=(indice)=>{
        const data = this.state.listToDo;
        // alert(utile.hasValue(data[indice].saved))
        if(!data[indice].saved){
            fetchPostHeader('/extra/toDoList/saveAll',data).then(response=>{
                console.log(response)
                if(utile.hasValue(response))
                    this.setState({listToDo: response});
            });
        }
    }
    changeToDoTexte=(indice, event)=>{
        const data= this.state.listToDo;
        data[indice].texte= event.target.value;
        data[indice].saved= false;
        this.setState({listToDo: data});
        // fetchPostHeader('/extra/toDoList/save',data[indice]).then(response=>{
        //     if(utile.hasValue(response)){
        //         console.log(response);
        //         this.setState({ listToDo: response });
        //     }
        // });
    }
    changeToDoTitre=(indice, event)=>{
        const data= this.state.listToDo;
        data[indice].titre= event.target.value;
        data[indice].saved= false;
        this.setState({listToDo: data});
		// fetchPostHeader('/extra/toDoList/save',data[indice]).then(response=>{
        //     if(utile.hasValue(response)){
        //         console.log(response);
        //         this.setState({ listToDo: response });
        //     }
        // });
    }
    changeToDoLocked=(indice)=>{
        const data= this.state.listToDo;
        data[indice].locked= !data[indice].locked;
		fetchPostHeader('/extra/toDoList/save',data[indice]).then(response=>{
            if(utile.hasValue(response)){
                console.log(response);
                this.setState({ listToDo: response });
            }
        });
    }
    render(){
        return(
            <div className="to-do-list-container" hidden={this.props.show}>
                <a href="#add" className="add-to-do-list" onClick={()=>this.addToDo()}><FontAwesomeIcon icon={faPlusCircle}/> Ajouter</a>
                <a href="#clos" className="close-to-do-list" onClick={()=>this.props.optionShow()}><FontAwesomeIcon icon={faTimesCircle}/> Fermer</a>
                <div className="row col-md-12">
                    {
                        this.state.listToDo.map((one,i)=>{
                            return(
                                <div className="single-to-do-list col-md-4 row" key={i}>
                                    <div className="header-to-do-list col-md-12">
                                        <FontAwesomeIcon style={{color:one.saved||utile.noValue(one.saved)?"green":"red"}} icon={one.saved||utile.noValue(one.saved)?faCheckCircle:faExclamationTriangle}/>
                                        <a href="#save" className="save-to-do-list" onClick={()=>this.saveToDo(i)}><FontAwesomeIcon icon={faSave}/></a>
                                        <a href="#lock" className="lock-to-do-list" onClick={()=>this.changeToDoLocked(i)}><FontAwesomeIcon icon={one.locked?faLock:faLockOpen}/></a>
                                        <a href="#delete" className="delete-to-do-list" onClick={()=>this.removeToDo(i)}><FontAwesomeIcon icon={faTrashAlt}/></a>
                                    </div>
                                    <div className="title-to-do-list col-md-12">
                                        <input type="text" name={"titre"+i} value={one.titre} onChange={this.changeToDoTitre.bind(this,i)}/>
                                    </div>
                                    <div className="text-to-do-list col-md-12">
                                        <textarea rows="10" className="" name={"texte"+i} value={one.texte} onChange={this.changeToDoTexte.bind(this,i)}></textarea>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}