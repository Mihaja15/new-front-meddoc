import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
const SelectInput = ({ options, value,onChange,name,className}) => {
    const handleChange=(e)=>{
        onChange(name,e)
    }
    return(
        <div className={'select-input-component'+(className?' '+className:'')}>
            {console.log(name)}
            {/* <div className="row"> */}
                {/* <div className="col-12"> */}
                    <input type='text' className=""/>
                    <span><FontAwesomeIcon icon={faTimes}/></span>
                    <select value={value} name={name} onChange={handleChange.bind(this)}>
                        {options.map((option, i)=>{
                            return <option key={i} value={option.value}>{option.label}</option>
                        })}
                    </select>
                {/* </div> */}

            {/* </div> */}
        </div>
    );
}

export default SelectInput;

