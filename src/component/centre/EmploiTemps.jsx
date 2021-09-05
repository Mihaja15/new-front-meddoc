import React from 'react';
import './EmploiTemps.css';
import { utile } from '../../services/utile';
import { fetchGet, fetchPost} from '../../services/global.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default class EmploiTemps extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            jour:null,
            dateFirst:new Date(),
            dateRdv:'',
            heureRdv:'',
            showConfirmation:false,
            error:false
            
        }
    }
    componentDidMount(){
        //console.log(this.props);
        if(this.props.idProfessionnel!==null){
            fetchGet(this.props.link+'/'+this.props.idProfessionnel+'/'+this.state.dateFirst.getDay()+'/'+this.state.dateFirst.getFullYear()+'-'+(this.state.dateFirst.getMonth()+1)+'-'+this.state.dateFirst.getDate()).then(edt=>{
                this.setState({jour:edt},function(){
                    //console.log('EDT : ',this.state.jour);
                });
            });
        }
    }
    dateShow(date){
        const dates = new Date(date);
        return <>{utile.getWeekAbrev(dates.getDay())}<br/> {utile.autocompleteZero(dates.getDate(),2)} {utile.getMonthAbrev(dates.getMonth())}</>
    }
    formatTime(time){
        return time.split(':')[0]+':'+time.split(':')[1];
    }
    onClickPrevNext=(direction)=>{
        var jour = new Date(this.state.dateFirst.getTime() + (direction * 3 * 24 * 60 * 60 * 1000));
        this.setState({dateFirst:jour}, function(){
            fetchGet(this.props.link+'/'+this.props.idProfessionnel+'/'+this.state.dateFirst.getDay()+'/'+this.state.dateFirst.getFullYear()+'-'+(this.state.dateFirst.getMonth()+1)+'-'+this.state.dateFirst.getDate()).then(edt=>{
                this.setState({jour:edt},function(){
                    //console.log('EDT : ',this.state.jour);
                });
            });
        })
    }
    
    handleChange = (param, e) => {
        this.setState({ [param]: e.target.value })
    }
    takeAppointment=(date,heure)=>{
        this.props.setDataCentre(this.props.professionnel);
        // if(this.props.idUser===null||this.props.idUser===undefined){
        //     alert('Vous devez d\'abord vous connecter');
        //     return;
        // }
        // const dateNow = new Date();
        // //console.log(dateNow.getTime()+' > '+date.getTime());
        // if(dateNow.getTime() > date.getTime()){
        //     alert('La date de rendez-vous doit être ultérieurement!');
        // }else{
        //     if(this.state.typeRdv!==""&&this.state.motifRdv!==""&&this.state.motifRdv!==""){
        //         this.setState({dateRdv:date,heureRdv:heure,showConfirmation:true});   
        //     }else{
        //         alert('Tous les champs sont obligatoires!');
        //     }
        // }
    }
    handleClick=(validation)=>{
        // this.props.changeConfirmation(validation);
        this.setState({showConfirmation:false});
        const dateHeure = this.state.dateRdv.getFullYear()+"-"+utile.autocompleteZero(this.state.dateRdv.getMonth()+1,2)+"-"+utile.autocompleteZero(this.state.dateRdv.getDate(),2)+" "+this.state.heureRdv;
        if(validation){
            const data = { 
                dateHeureRdv : dateHeure ,
                idProfessionnel : this.props.idProfessionnel,
                idDmdUser:this.props.idUser,
                idPatient:this.props.idUser,
                motif : "Premier rendez-vous",
                statut:100
            };
            //console.log('prendre rdv : ',data);
            fetchPost('/covid/add-appointment',data).then(result=>{
                if(result.status === 200){
                    alert(''+result.message);
                    this.setState({etatErrorRdv : false, errorRdv : ''});
                }else{
                    this.setState({etatErrorRdv : true, errorRdv : ''+result.message});
                }
            });
            // fetchGet('/emploieTemps/by-medecin/'+this.props.medecinData.idMedecin+'/'+this.state.dateFirst.getDay()+'/'+this.state.dateFirst.getFullYear()+'-'+(this.state.dateFirst.getMonth()+1)+'-'+this.state.dateFirst.getDate()).then(edt=>{
                
            // });
        }
    }
    render(){
        return(
            <div className="emploi-temps-container">
                <div className="confirmation-content" style={{display:this.state.showConfirmation?"block":"none"}}>
                    <div className="dialog-box">
                        <div className="confirmation-header" style={{backgroundColor:"#1b7895"}}>
                            <h2>{'Confirmation de rendez-vous'}</h2>
                        </div>
                        <div className="confirmation-body">
                            <p>{'Voulez-vous confirmer votre rendez-vous au '+this.props.nomCentre+' le '+utile.formatDateText(new Date(this.state.dateRdv))+' à '+this.state.heureRdv}</p>
                        </div>
                        <div className="confirmation-footer">
                            <a className='btn-annulation' href="#0" onClick={()=>this.handleClick(false)}>Annuler</a>
                            <a className='btn-validation' href="#0" onClick={()=>this.handleClick(true)}>Accepter</a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <table>
                        <thead>
                            <tr>
                                <th><a href='#0' onClick={()=>this.onClickPrevNext(-1)}><FontAwesomeIcon icon={faChevronLeft}/></a></th>
                                <th>{this.state.jour!==null?this.dateShow(this.state.jour.date1):''}</th>
                                <th>{this.state.jour!==null?this.dateShow(this.state.jour.date2):''}</th>
                                <th>{this.state.jour!==null?this.dateShow(this.state.jour.date3):''}</th>
                                <th><a href='#0' onClick={()=>this.onClickPrevNext(1)}><FontAwesomeIcon icon={faChevronRight}/></a></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <ul>
                                        {
                                            this.state.jour!==null?this.state.jour.jour1.map((heure,i)=>{
                                                return <li key={i} onClick={()=>this.takeAppointment(new Date(this.state.jour.date1), heure)}>{this.formatTime(heure)}</li>
                                            }):''
                                        }
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                        {
                                            this.state.jour!==null?this.state.jour.jour2.map((heure,i)=>{
                                                return <li key={i} onClick={()=>this.takeAppointment(new Date(this.state.jour.date2), heure)}>{this.formatTime(heure)}</li>
                                            }):''
                                        }
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                        {
                                            this.state.jour!==null?this.state.jour.jour3.map((heure,i)=>{
                                                return <li key={i} onClick={()=>this.takeAppointment(new Date(this.state.jour.date3), heure)}>{this.formatTime(heure)}</li>
                                            }):''
                                        }
                                    </ul>
                                </td>
                                <td>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}