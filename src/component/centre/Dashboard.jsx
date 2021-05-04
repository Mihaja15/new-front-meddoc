import React from 'react';
import './Dashboard.css';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';
import 'react-vis/dist/style.css';
import 'react-vis/dist/dist.min.js';

export default class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return(
            <div className="dashboard-container">
                <div className="row">
                    <div className="col-md-9 row">
                        <div className="col-md-12">
                            <div className="statistique-chart">
                                <XYPlot width={500} height={250}>
                                    <HorizontalGridLines />
                                    <LineSeries
                                        data={[
                                        {x: 0, y: 10},
                                        {x: 1, y: 10},
                                        {x: 2, y: 7},
                                        {x: 3, y: 13},
                                        {x: 4, y: 12},
                                        {x: 5, y: 11},
                                        {x: 6, y: 8},
                                        {x: 7, y: 1},
                                        {x: 8, y: 5},
                                        {x: 9, y: 50}
                                        ]}/>
                                    <XAxis />
                                    <YAxis />
                                </XYPlot>
                                <p>Suivi nombre d'injections journalière</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="statistique col-md-12">
                            <h2>500</h2>
                            <p>Total injections</p>
                        </div>
                        <div className="statistique col-md-12">
                            <h2>20</h2>
                            <p>Moyenne injections journalière</p>
                        </div>
                        <div className="statistique col-md-12">
                            <h2>3</h2>
                            <p>Complication d'injection</p>
                        </div>
                        <div className="statistique col-md-12">
                            <h2>5</h2>
                            <p>Vaccinateur</p>
                        </div>
                        <div className="statistique col-md-12">
                            <h2>1000</h2>
                            <p>Rendez-vous pris</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}