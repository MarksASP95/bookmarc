import React, { useState, useEffect } from 'react' 

import axios from 'axios'

import PostCard from '../Feed/PostCard/PostCard'

import './PostView.scss'

export default function PostView(props) {

    const [post, setPost] = useState(null);

    const postId = '5dd44565a03fc40fc400eb9c'

    useEffect(() => {
        const getPost = async () => {

            const result = await axios.get(`http://localhost:4000/api/posts/${postId}`)

            setPost(result.data)
        }

        getPost()
    }, [])



    
    return (
        <div className='post-view-component'>
            {post ?
            <PostCard
                type='main'
                title={post.title}
                author={post.author.username}m
                date={new Date(post.date)}
                tags={post.tags}
                num_likes={post.num_likes}
                num_comments={post.comments.length}
                read_minutes={Math.ceil(post.content.split(" ").length / 220)}
            /> 
            // JSON.stringify(post.data)
            :
            null
            }

        </div>
    )
}
