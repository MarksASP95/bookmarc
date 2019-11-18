import React from 'react'

import './ChipsContainer.scss'

import Chip from './../Chip/Chip'

export default function ChipsContainer(props) {
    return (
        props.elements.length > 0 ?
            <div className="chips-container-component">
                {props.elements.map((element, idx) => (
                    <Chip key={idx} text={element} />
                ))}
            </div>
        :
        null
    )
}