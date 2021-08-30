import './Error404.css';
import img404 from '../../assets/img/404.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faHome } from '@fortawesome/free-solid-svg-icons';
const Error404 = () => {
    return(
        <div className='Error404-container row col-12'>
            <div className='col-md-12 row'>
                {/* <div className='col-md-3 col-sm12'>
                        <i className='first'>4</i>
                        <i className='second'>0</i>
                        <i className='third'>4</i>
                </div>  
                <div className='error-404-text col-md-3 col-sm-12'>
                    <p>Page introuvable</p>
                    <span></span>
                </div> */}
                <div className='error-404-text row col-md-12 col-sm-12'>
                    <a className='error-back' href='#back' onClick={()=>window.history.back()}><FontAwesomeIcon icon={faArrowAltCircleLeft}/> Revenir</a>
                    <a className='error-home' href='/'><FontAwesomeIcon icon={faHome}/> Accueil</a>
                    <p className='col-12'>Oops!</p>
                    <p className='col-12'>Page introuvable</p>
                </div>
                <div className='error-404-img col-12'>
                    <img className="col-md-12" src={img404} alt={'Page introuvable'}/>
                </div>
            </div>
        </div>
    );
}

export default Error404;