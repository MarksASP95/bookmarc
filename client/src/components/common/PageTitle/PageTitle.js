import React from 'react'

import './PageTitle.scss'

export default function PageTitle(props) {
    return (
        <div className="page-title-component">
            <h2>{props.title}</h2>
            <hr />
        </div>
    )
}