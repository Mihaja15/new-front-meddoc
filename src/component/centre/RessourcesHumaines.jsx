import React from 'react';
import './RessourcesHumaines.css';

export default class RessourcesHumaines extends React.Component{
    constructor(props){
        super(props);
        this.state={
            listVaccinateur:[]
        }
    }
    componentDidMount(){
        
    }
    render(){
        return(
            <div className="personal-container">
                <div className="col-md-12">
                    {/* <div className="card"> */}
                        <div className="card-body">
                            <h4 className="card-title"> </h4>
                            <div class="table-responsive">
                                <table className=" table col-md-12">
                                    <thead>
                                        <tr>
                                            <th>Nom et prénoms</th>
                                            <th>E-mail</th>
                                            <th>Téléphone</th>
                                            <th>Mot de passe</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.listVaccinateur.map((one, i)=>{
                                            return(
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    {/* </div> */}
                </div>
            </div>
        );
    }
}