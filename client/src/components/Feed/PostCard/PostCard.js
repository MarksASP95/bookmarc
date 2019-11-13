import React from 'react'

import { format } from 'timeago.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import postBanner from '../../../assets/images/test/network.jpg'
import userPicture from '../../../assets/images/test/marcoasp.PNG'
import './PostCard.scss'

const PostCard = (props) => {

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]

    let tags = ""
    props.tags.forEach(tag => {
        tags = `${tags} #${tag}`
    })

    return (
        <div className="postcard-component aqua-black-border shadow-side">
            <div className="post-banner" style={{backgroundImage:`url(${postBanner})`}}></div>
            <div className="post-meta">
                <h2 className="post-title">{props.title}</h2>
                <div className="user-picture" style={{backgroundImage:`url(${userPicture})`}}></div>
                <p className="post-meta-main">
                    {`${props.author} - ${months[props.date.getMonth()]} ${props.date.getDate()} (${format(props.date)})`}
                </p>
                <p className="tags">{tags}</p>
                <div className="likes feedback">
                    <FontAwesomeIcon icon="heart" />
                    <span>{props.num_likes}</span>
                </div>
                <div className="comments feedback">
                    <FontAwesomeIcon icon="comment"/>
                    <span>{props.num_comments}</span>
                </div>
                <span className="read-minutes">{`${props.read_minutes} minute read`}</span>
            </div>
        </div>
    )
}

export default PostCard;
