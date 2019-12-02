import React from 'react'

import { format } from 'timeago.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import postBanner from '../../../assets/images/test/network.jpg'
import userPicture from '../../../assets/images/test/marcoasp.PNG'

import './PostCardMain.scss'
import './PostCardRegular.scss'
import './PostCardView.scss'
import '../../../constants/styles/common/border.scss'

const PostCard = (props) => {

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]

    let tags = []
    props.tags.forEach(tag => {
        tags.push(<span className="tag">#{tag}</span>)
    })

    const getPostMetaData = () => {

        const bannerDiv = <div className="post-banner" style={{backgroundImage:`url(${postBanner})`}}></div>
        const userPictureDiv = <div className="user-picture" style={{backgroundImage:`url(${userPicture})`}}></div>
        const postMetaMainP = 
            <p className="post-meta-main">
                {`${props.author} - ${months[props.date.getMonth()]} ${props.date.getDate()} (${format(props.date)})`}
            </p>
        const postFeedbackContainer = 
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
        const byUserSpan = <span className="by">by {props.author}</span>

        switch(props.type) {
            case 'main':
                return {
                    bannerElement: bannerDiv,
                    userPictureElement: userPictureDiv,
                    metaMainElement: postMetaMainP,
                    feedbackElement: postFeedbackContainer,
                    byUserElement: null
                }
            case 'regular':
                return {
                    bannerElement: null,
                    userPictureElement: userPictureDiv,
                    metaMainElement: null,
                    feedbackElement: null,
                    byUserElement: byUserSpan
                }
            case 'view':
                return {
                    bannerElement: bannerDiv,
                    userPictureElement: null,
                    metaMainElement: postMetaMainP,
                    feedbackElement: null,
                    byUserElement: null
                }
        }
    }

    const postMetaData = getPostMetaData()

    return (
        <div className={`postcard-component ${props.type} aqua-black-border shadow-side`} onClick={props.onClick}>
            {postMetaData.bannerElement}
            <div className="post-meta">
                <h2 className="post-title">{props.title}</h2>
                {postMetaData.userPictureElement}
                {postMetaData.metaMainElement}
                <div className="tags">{tags}</div>
                {postMetaData.feedbackElement}
                {postMetaData.byUserElement}
                <span className="read-minutes">{`${props.read_minutes} minute read`}</span>
            </div>
        </div>
    )
}

export default PostCard;
