import React from 'react';
import './Button.css';


const Button = ({title, text, style={}, disabled, onClick}) => {
    return(
        <button title={title} onClick={onClick} disabled={disabled} style={style} className='button-26' role='button'>
            {text}
        </button>
    );
};

export default Button;