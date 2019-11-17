import React, { Component } from 'react'

import './Feed.scss'

import postList from './postList'
import topicList from './topicList'
import PostCard from './PostCard/PostCard'
import Posts from './Posts/Posts'
import Topics from './Topics/Topics'

export default class Feed extends Component {

    state = {
        posts: postList,
        topics: topicList
    }

    render() {
        return (
            <div className="feed-component">
                <Posts posts={this.state.posts} />
                <Topics topics={this.state.topics} />
                
            </div>
        )
    }
}
