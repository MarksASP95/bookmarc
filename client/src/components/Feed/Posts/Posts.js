import React, { Component } from 'react'

import PostCard from './../PostCard/PostCard';

import './Posts.scss'

export default class Posts extends Component {
    render() {
        return (
            <div className="posts-component">
                {this.props.posts.map((post, index) => (
                    <PostCard
                        main={index === 0}
                        title={post.title}
                        author={post.author.username}
                        date={new Date(post.date)}
                        tags={post.tags}
                        num_likes={post.num_likes}
                        num_comments={post.comments.length}
                        read_minutes={Math.ceil(post.content.split(" ").length / 220)}
                    />
                ))}
            </div>
        )
    }
}