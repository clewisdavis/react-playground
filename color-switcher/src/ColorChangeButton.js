// ColorChangeButton.js
import React from 'react'

function ColorChangeButton (props) {
    console.log(props.color);
    return (
        <button className={props.color}>
            {props.color}
        </button>
    )
}

export default ColorChangeButton