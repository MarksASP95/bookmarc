import React, { useState, useEffect } from 'react' 

import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import bbCodeParser from 'js-bbcode-parser'
import parse from 'html-react-parser'

import PostCard from '../Feed/PostCard/PostCard'

import './PostView.scss'

export default function PostView(props) {

    const [post, setPost] = useState(null);
    const [likeButtonIO, setLikeButtonIO] = useState(false)

    const postId = props.match.params.post_id

    useEffect(() => {
        const getPost = async () => {

            const result = await axios.get(`http://localhost:4000/api/posts/${postId}`)

            setPost(result.data)
        }

        getPost()
    }, [])

    const getPostContent = () => {
        return parse(bbCodeParser.parse(post.content))
    }

    const toggleLike = () => {
        setLikeButtonIO(!likeButtonIO)
    }

    
    return (
        <div className='post-view-component'>
            {post ?
            <React.Fragment>
                <PostCard
                    type='view'
                    title={post.title}
                    author={post.author.name}
                    date={new Date(post.date)}
                    tags={post.tags}
                    num_likes={post.num_likes}
                    num_comments={post.comments.length}
                    read_minutes={Math.ceil(post.content.split(" ").length / 220)}
                /> 
                <div className="post-content">
                    {getPostContent()}
                </div>
                <div className="feedback-container aqua-black-border shadow-side">
                    <p className="feedback-instruction">Did you like this post?</p>
                    <div className="heart-button" onClick={toggleLike}>
                        <span className={likeButtonIO ? 'on' : 'off'}><FontAwesomeIcon icon="heart"></FontAwesomeIcon></span>
                    </div>
                </div>
            </React.Fragment>
            :
            null
            }



        </div>
    )
}
