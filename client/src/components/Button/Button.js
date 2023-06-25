import React from 'react';
import './Button.css';


const Button = ({text, style={}, disabled, onClick}) => {
    return(
        <button onClick={onClick} disabled={disabled} style={style} className='button-21' role='button'>
            {text}
        </button>
    );
};

export default Button;