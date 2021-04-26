import React from 'react';
import './Header.css';
import logo from '../../assets/logo/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../assets/fonts/Font.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faUserAlt, faVirus } from '@fortawesome/free-solid-svg-icons';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state={
            close:false,
            showMore:false
        }
    }
    render(){
        return(
            <div className="root-header">
                <a href="/"><img src={logo} alt="logo meddoc"/></a>
                <ul>
                    <li><a href="/inscription"><FontAwesomeIcon icon={faUserAlt}/> se connecter / s'inscrire</a></li>
                </ul>
            </div>
        );
    }
}
export default Header;