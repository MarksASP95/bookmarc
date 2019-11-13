import React from 'react'

import './Display.scss'

const Display = (props) => {
    return (
        <div className="display-component">
            {props.children}
        </div>
    );
}

export default Display