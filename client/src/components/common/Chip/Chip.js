import React from 'react'

import './Chip.scss'

export default function Chip(props) {
    return (
        <div onClick={props.onClick} className="chip-component">
            <span>{props.text}</span>
        </div>
    )
}
