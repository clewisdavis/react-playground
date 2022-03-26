// ColorChangeButton.js
import React from 'react'

function ColorChangeButton (props) {
    console.log(props);
    return (
        <button type={props.type} className={props.color} onClick={() => props.setColor(props.color)}>
            {props.color}
        </button>
    )
}

export default ColorChangeButton