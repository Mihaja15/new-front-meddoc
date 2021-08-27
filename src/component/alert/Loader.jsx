import './Loader.css';

const Loader = () => {
    return(
        <div className='Loader-container col-12'>
            {/* <div class="fancy-spinner">
                <div class="ring"></div>
                <div class="ring"></div>
                <div class="dot"></div>
            </div> */}
            <div className="loading"> 
                <svg className='' width="15px" height="15px">
                    <polyline id="back" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
                    <polyline id="front" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
                </svg>
                <span className=''>CHARGEMENT</span>
                <svg className=' right' width="15px" height="15px">
                    <polyline id="back" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
                    <polyline id="front" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
                </svg>
            </div>
        </div>
    );
}

export default Loader;