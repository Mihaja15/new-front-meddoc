import React from 'react';
import './Dashboard.css';
import {DiscreteColorLegend,XYPlot, XAxis, YAxis, HorizontalGridLines,VerticalBarSeries, VerticalGridLines,Hint,MarkSeries, LineSeries, LineMarkSeries, AreaSeries, Crosshair} from 'react-vis';
// import DiscreteColorLegend from 'legends/discrete-color-legend';
import 'react-vis/dist/style.css';
import 'react-vis/dist/dist.min.js';
import { ProgressBar } from 'react-bootstrap';
import { utile } from '../../services/utile';

const ITEMS = [
    {title: 'Apples', color: "#82a64e", strokeWidth: 15},
    {title: 'Bananas', color: '#ffca3a', strokeWidth: 15},
    {title: 'Cranberries', color: '#673c4f', strokeWidth: 15}
  ];
export default class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            totalVaccine:0,
            usedVaccine:0,
            unusedVaccine:0,
            vaccinedPeople:0,
            unvaccinedPeople:0,
            totalPeople:0,
            crosshairValues:[],
            dataChart:[],
            vaccinDataChart:[],
            citoyenDataChart:[],
            hintValue:null,
            affichage:'jour'
        }
    }
    componentDidMount(){
        this.setState({
            totalVaccine:25780,
            usedVaccine:15530,
            unusedVaccine:10250,
            vaccinedPeople:15530,
            unvaccinedPeople:32650,
            totalPeople:48180,
            dataChart:[
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
                ]
        });
    }
    getColorPourcentage(pourcentage){
        if(pourcentage>=75 && pourcentage<=100)
            return 'success';
        else if(pourcentage>=50 && pourcentage<75)
            return 'warning';
        else if(pourcentage>=0 && pourcentage<50)
            return 'danger';
        else
            return 'dark';
    }
    getColorPourcentageInvert(pourcentage){
        if(pourcentage>=0 && pourcentage<50)
            return 'success';
        else if(pourcentage>=50 && pourcentage<75)
            return 'warning';
        else if(pourcentage>=75 && pourcentage<=100)
            return 'danger';
        else
            return 'dark';
    }
    onMouseLeave = () => this.setState({crosshairValues: []});
    onNearestX = (value, {index}) =>{
        // console.log(this.state.dataChart[index])
        this.setState({ crosshairValues: this.state.dataChart});
    } 
    _forgetValue = () => {
        this.setState({
          hintValue: null
        });
    };
    
      _rememberValue = value => {
        this.setState({hintValue:value});
    };
    handleChange = (param, e) => {
        console.log(e.target.value);
        this.setState({ [param]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
    }
    render(){
        return(
            <div className="dashboard-container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="col-md-6 stat-vaccine">
                            <span className="col-md-12 header-stat-value">Vaccins</span>
                            <span className="col-md-6 left-stat-value">utilisés<br/>{utile.numStr(this.state.usedVaccine)}</span>
                            <span className="col-md-6 right-stat-value">disponibles<br/>{utile.numStr(this.state.unusedVaccine)}</span>
                            <span className="col-md-12 progressbar-stat"><ProgressBar height={25} variant={this.getColorPourcentageInvert(utile.getPercent(this.state.usedVaccine,this.state.totalVaccine))} now={utile.getPercent(this.state.usedVaccine,this.state.totalVaccine)} label={`${utile.getPercent(this.state.usedVaccine,this.state.totalVaccine)}%`}/></span>
                            <span className="col-md-12 center-stat-value">Total<br/>{utile.numStr(this.state.totalVaccine)}</span>
                        </div>
                        <div className="col-md-6 stat-citoyen">
                            <span className="col-md-12 header-stat-value">Citoyens</span>
                            <span className="col-md-6 left-stat-value">vaccinés<br/>{utile.numStr(this.state.vaccinedPeople)}</span>
                            <span className="col-md-6 right-stat-value">en attente<br/>{utile.numStr(this.state.unvaccinedPeople)}</span>
                            <span className="col-md-12 progressbar-stat"><ProgressBar height={25} variant={this.getColorPourcentage(utile.getPercent(this.state.vaccinedPeople,this.state.totalPeople))} now={utile.getPercent(this.state.vaccinedPeople,this.state.totalPeople)} label={`${utile.getPercent(this.state.vaccinedPeople,this.state.totalPeople)}%`}/></span>
                            <span className="col-md-12 center-stat-value">Total inscrits<br/>{utile.numStr(this.state.totalPeople)}</span>
                        </div>
                    </div>
                    <div className="col-md-12 stat-chart-filter row">
                        <div className="col-md-12 row select-filter">    
                            <label className="col-md-4">Filtre par:</label>
                            <select className="col-md-6">
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <div className="chart-stat col-md-11">
                        <div className="col-md-12 row checkbox-filter" onChange={this.handleChange.bind(this, 'affichage')}>
                            <span className="col-md-3">Axe horizontal:</span>
                            <span className="col-md-3">
                                <label className="special-radio" htmlFor="jour">Jour
                                    <input type="radio" id="jour" checked={this.state.affichage==="jour"} value="jour" name="radio"/>
                                    <span className="special-radio-checkmark"></span>
                                </label>
                            </span>
                            <span className="col-md-3">
                                <label className="special-radio" htmlFor="mois">Mois
                                    <input type="radio" id="mois" checked={this.state.affichage==="mois"} value="mois" name="radio"/>
                                    <span className="special-radio-checkmark"></span>
                                </label>
                            </span>
                            <span className="col-md-3">
                                <label className="special-radio" htmlFor="annee">Année
                                    <input type="radio" id="annee" checked={this.state.affichage==="annee"} value="annee" name="radio"/>
                                    <span className="special-radio-checkmark"></span>
                                </label>
                            </span>
                        </div>
                        <div className="statistique-chart">
                            <XYPlot xType="ordinal" onMouseLeave={this.onMouseLeave} width={800} height={300}>
                                <HorizontalGridLines />
                                <VerticalGridLines />
                                <VerticalBarSeries
                                    color="#82a64e"
                                    data={[
                                    {x: '', y: 10}
                                    ]}
                                />
                                <VerticalBarSeries
                                    color="#ffca3a"
                                    data={[
                                    {x: '', y: 2}
                                    ]}/>
                                <VerticalBarSeries
                                    color="#673c4f"
                                    data={[
                                    {x: '', y: 11}
                                    ]}/>
                                <DiscreteColorLegend orientation="horizontal" width={800} items={ITEMS} />
                                {/* <LineSeries
                                    curve={'curveMonotoneX'}
                                    getNull={d => d.y !== null}
                                    data={this.state.dataChart}
                                    /> */}
                                {/* <LineMarkSeries
                                    animation
                                    // onValueMouseOver={(d) => this.setState({hoverData: d})}
                                    // key={name}
                                    curve={'curveMonotoneX'}
                                    getNull={d => d.y !== null}
                                    data={this.state.dataChart}
                                    onValueMouseOver={this._rememberValue}
                                    onValueMouseOut={this._forgetValue}
                                    /> */}
                                {/* <AreaSeries
                                    getNull={d => d.y !== null}
                                    onNearestX={this.onNearestX}
                                    data={this.state.dataChart}
                                    curve={'curveMonotoneX'}
                                    /> */}
                                {/* <MarkSeries
                                    onValueMouseOver={this._rememberValue}
                                    onValueMouseOut={this._forgetValue}
                                    data={this.state.dataChart}
                                    /> */}
                                {/* <Crosshair values={this.state.crosshairValues} /> */}
                                
                                {this.state.hintValue!==null ? <Hint value={this.state.hintValue} /> : null}
                                <XAxis 
                                    title="X Axis"
                                    style={{
                                        line: {stroke: '#2b3a3b'},
                                        ticks: {stroke: '#000000'},
                                        text: {stroke: 'none', fill: '#322e18', fontWeight: 600}
                                    }}/>
                                <YAxis 
                                    title="X Axis"
                                    style={{
                                        line: {stroke: '#2b3a3b'},
                                        ticks: {stroke: '#000000'},
                                        text: {stroke: 'none', fill: '#322e18', fontWeight: 600}
                                    }}/>
                            </XYPlot>
                        </div>
                        <p className="col-md-12" style={{textAlign:'center'}}>Suivi nombre d'injections journalière</p>
                    </div>
                </div>
            </div>
        );
    }
}