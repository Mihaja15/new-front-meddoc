import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ComingSoon.css';

const ComingSoon = () => {
    return(
        <div className='ComingSoon-container row col-12'>
            <div className='col-md-12'>
                <div className='col-md-2 col-sm12'>
                    <div className='cog-container'>
                        {/* <i></i><i></i> */}
                        <i className='first'><FontAwesomeIcon icon={faCog}/></i>
                        <i className='second'><FontAwesomeIcon icon={faCog}/></i>
                        <i className='third'><FontAwesomeIcon icon={faCog}/></i>
                    </div>
                </div>  
                <div className='coming-soon-text col-md-6 col-sm-12'>
                    <p>Page bientôt disponible...</p>
                    <span></span>
                </div>
            </div>
        </div>
    );
}

export default ComingSoon;