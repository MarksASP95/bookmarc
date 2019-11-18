import React from 'react'

import './Chip.scss'

export default function Chip(props) {
    return (
        <div className="chip-component">
            <span>{props.text}</span>
        </div>
    )
}
