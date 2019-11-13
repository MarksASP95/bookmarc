import React, { Component } from 'react'

import './Feed.scss'

import postList from './postList'
import PostCard from './PostCard/PostCard';

export default class Feed extends Component {

    state = {
        posts: postList
    }

    render() {
        return (
            <div className="feed-component">
                {this.state.posts.map((post, index) => (
                    <PostCard
                        main={index === 0}
                        title={post.title}
                        author={post.author}
                        date={post.date}
                        tags={post.tags}
                        num_likes={post.num_likes}
                        num_comments={post.num_comments}
                        read_minutes={post.read_minutes}
                    />
                ))}
            </div>
        )
    }
}
