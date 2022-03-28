// ColorChangeButton.js
import React from 'react'

function ColorChangeButton (props) {
    console.log(props);
    return (
        <button 
            type={props.type} 
            className={props.color}
            onClick={function() {
                props.setColor(props.color);
                console.log('function here and a ' + props.active);
                props.setActive(props.active);
            }
            }>
            {props.color}
        </button>
    )
}

export default ColorChangeButton