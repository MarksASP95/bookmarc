import React from 'react'
import Fade from 'react-reveal/Fade'

import './Chip.scss'
import '../../../constants/styles/common/general.scss'

export default function Chip(props) {
    return (
        <Fade duration={100}>
            <div onClick={props.onClick} className="chip-component">
                <span className="unselectable">{props.text}</span>
            </div>
        </Fade>
    )
}
