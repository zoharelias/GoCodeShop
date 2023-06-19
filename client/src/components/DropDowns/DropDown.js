import './DropDown.css';

export const DropDowns = ({label, optionsArray, onChange}) => {
    console.log('label',label);
    return (
        <div>
            <div className='collection-sort'>
                <label>{label}</label>
                <select onChange={onChange}>
                    {(label === 'filter')? <option value={"All"}>All Products</option>: ""}
                 {optionsArray.map((option)=> <option value={option}>{option}</option> )}
                </select>
            </div>
        </div>
    );
}

