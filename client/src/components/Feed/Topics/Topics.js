import React from 'react'

import './Topics.scss'

const Topics = (props) => {
    return (
        <div className="topics-component aqua-black-border shadow-side">
            <h3><span>topics</span></h3>
            <ul>
                {props.topics.map(topic => {
                    return <li className="topic"><span>#</span>{topic}</li>
                })}
            </ul>
        </div>
    )
}

export default Topics
