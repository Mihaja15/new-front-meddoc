import React from 'react';
import {Link} from 'react-router-dom';
import Error404 from '../alert/Error404';
import ConditionsUtilisations from './ConditionsUtilisations';
import './Apropos.css';
import QuiSommesNous from './QuiSommesNous';
import history from '../../history';
import MentionsLegales from './MentionsLegales';
const link = ['qui-sommes-nous','presse','mentions-legales','conditions-generales-d-utilisation'];
class Apropos extends React.Component{
    constructor(props){
        super();
        this.state = {}
    }
    toShow(){
        const show = link.indexOf(window.location.pathname.split('/')[2]);
        // const show = link.indexOf(window.location.pathname.split('/')[2]);
        return show===0
                ?<QuiSommesNous/>
                :show===1
                ?<></>
                :show===2
                ?<MentionsLegales/>
                :show===3
                ?<ConditionsUtilisations/>
                :<Error404/>
    }
    isActive=(value)=>{
        const show = link.indexOf(window.location.pathname.split('/')[2]);
        // const show = link.indexOf(window.location.pathname.split('/')[2]);
        return show===value?'active':'';
    }
    componentWillMount() {
        this.unlisten = history.listen((location, action) => {
        //   alert(location.pathname);
        //   history.push(location)
        });
      }
    render(){
        return (
            <div className="apropos-container">
                <div className="container">
                    <div className="row">
                        <div className="apropos-left-menu col-md-3">
                            <ul>
                                <li><Link to="/">Accueil</Link></li>
                                <li><Link to="/a-propos/qui-sommes-nous" className={this.isActive(0)}>Qui sommes-nous?</Link></li>
                                <li><Link to="/a-propos/presse" className={this.isActive(1)}>Presse</Link></li>
                                <li><Link to="/a-propos/mentions-legales" className={this.isActive(2)}>Mentions légales</Link></li>
                                <li><Link to="/a-propos/conditions-generales-d-utilisation" className={this.isActive(3)}>Conditions générales d'utilisation</Link></li>
                            </ul>
                        </div>
                        <div className="apropos-content col-md-9">
                            {this.toShow()}
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}
export default Apropos;