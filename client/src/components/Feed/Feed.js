import React, { Component } from 'react'

import './Feed.scss'

import axios from 'axios'

import postList from './postList'
import topicList from './topicList'
import PostCard from './PostCard/PostCard'
import Posts from './Posts/Posts'
import Topics from './Topics/Topics'

export default class Feed extends Component {

    state = {
        posts: [],
        topics: topicList,
    }

    getPosts() {
        axios.get('http://localhost:4000/api/posts')
            .then(posts => {
                console.log(posts.data)
                this.setState({posts: posts.data})
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount() {
        this.getPosts()
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
