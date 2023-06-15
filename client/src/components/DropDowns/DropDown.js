import './DropDown.css';

export const DropDowns = ({caption, optionsArray, onChange}) => {
    return (
        <div>
            <div className='collection-sort'>
                <label>{caption}</label>
                <select onChange={onChange}>
                    {optionsArray.map((option)=> <option value={option}>{option}</option> )}
                </select>
            </div>
        </div>
    );
}

