import React, { Component } from 'react'

import { Redirect } from 'react-router-dom'

import PostCard from './../PostCard/PostCard';

import './Posts.scss'


export default class Posts extends Component {

    state = {
        redirect: false,
        postId: null
    }



    render() {
        return (
            <div className="posts-component">
                {this.props.posts.map((post, index) => (
                    <PostCard
                        type={index === 0 ? 'main' : 'regular'}
                        title={post.title}
                        author={post.author.name}
                        date={new Date(post.date)}
                        tags={post.tags}
                        num_likes={post.num_likes}
                        num_comments={post.comments.length}
                        read_minutes={Math.ceil(post.content.split(" ").length / 220)}
                        onClick={() => this.setState({redirect: true, postId: post._id})}
                    />
                ))}
                {this.state.redirect ? <Redirect to={`/post/${this.state.postId}`} /> : null}
            </div>
        )
    }
}