import React from 'react'

import { format } from 'timeago.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import postBanner from '../../../assets/images/test/network.jpg'
import userPicture from '../../../assets/images/test/marcoasp.PNG'

import './PostCardMain.scss'
import './PostCardRegular.scss'
import '../../../constants/styles/common/border.scss'

const PostCard = (props) => {

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]

    let tags = ""
    props.tags.forEach(tag => {
        tags = `${tags} #${tag}`
    })

    return (
        <div className={`postcard-component ${props.type} aqua-black-border shadow-side`}>
            {props.main ? <div className="post-banner" style={{backgroundImage:`url(${postBanner})`}}></div> : null}
            <div className="post-meta">
                <h2 className="post-title">{props.title}</h2>
                <div className="user-picture" style={{backgroundImage:`url(${userPicture})`}}></div>
                {
                    props.main ? 
                    <p className="post-meta-main">
                        {`${props.author} - ${months[props.date.getMonth()]} ${props.date.getDate()} (${format(props.date)})`}
                    </p>
                    : 
                    null
                }
                <p className="tags">{tags}</p>
                {
                    props.main ? 
                    <React.Fragment>
                        <div className="likes feedback">
                            <FontAwesomeIcon icon="heart" />
                            <span>{props.num_likes}</span>
                        </div>
                        <div className="comments feedback">
                            <FontAwesomeIcon icon="comment"/>
                            <span>{props.num_comments}</span>
                        </div>
                    </React.Fragment>
                    :
                    <span className="by">by {props.author}</span>
                }
                <span className="read-minutes">{`${props.read_minutes} minute read`}</span>
            </div>
        </div>
    )
}

export default PostCard;
