import React, { Component } from 'react'

import './NewPost.scss'

import PageTitle from './../common/PageTitle/PageTitle'
import Chip from './../common/Chip/Chip'

export default class NewPost extends Component {
    render() {
        return (
            <div className="new-post-component">

                <PageTitle title="New post!" />

                <div className="form-control">
                    <label className="bm-label">Title <span className="bm-label-note">(just a label note)</span></label>
                    <input className="bm-input" />
                </div>
                <Chip text="javascript" />
                
                <div className="form-control">
                    <label className="bm-label">Write your post</label>
                    <textarea className="bm-textarea"></textarea>
                </div>
            </div>
        )
    }
}
