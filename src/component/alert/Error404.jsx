import './Error404.css';
import img404 from '../../assets/img/404.jpg';
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
                <div className='error-404-text col-md-12 col-sm-12'>
                    <p>Oops!</p>
                </div>
                <img className="col-md-12" src={img404} alt={'Page introuvable'}/>
            </div>
        </div>
    );
}

export default Error404;