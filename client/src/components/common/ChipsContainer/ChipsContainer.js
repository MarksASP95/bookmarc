import React from 'react'

import './ChipsContainer.scss'

import Chip from './../Chip/Chip'

export default function ChipsContainer(props) {

    const deleteItem = (idx) => {
        props.onDeleteItem(idx)
    }

    return (
        props.items.length > 0 ?
            <div className="chips-container-component" style={{flexWrap:"wrap"}}>
                {props.items.map((item, idx) => (
                    <Chip onClick={() => deleteItem(idx)} key={idx} text={item} />
                ))}
            </div>
        :
        null
    )
}