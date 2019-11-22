import React, { Component } from 'react'

import './NewPost.scss'
import '../../constants/styles/common/button.scss'

import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import PageTitle from './../common/PageTitle/PageTitle'
import ChipsContainer from './../common/ChipsContainer/ChipsContainer'
import LoadingBar from './../common/LoadingBar/LoadingBar';

export default class NewPost extends Component {
    
    constructor(props) {

        super(props)

        this.state = {
            tags: [],
            redirect: false,
            isPosting: false
        }

    }

    addTagHandler(e, newTag) {
        if(e.which !== 13) {
            return
        }

        // format tag (replace spaces for _)
        newTag = newTag.replace(new RegExp(' ', 'g'), '_')

        // add tag
        if(newTag !== '') {
            this.setState({
                tags: [...new Set([...this.state.tags, newTag])]
            })
        }
    }

    deleteTag(idx) {
        let tags = this.state.tags
        tags.splice(idx, 1);
        this.setState({tags: tags})
    }

    handlePostResult(success) {

        let onError = () => {
            alert("Error al subir el post")
            // anything else you wanna do
        }

        setTimeout(() => {
            if(!success) { onError() }
            this.setState({isPosting: success})
        }, 600);
    }


    sendCreatePostRequest(data) {
        this.setState({isPosting: true})
        axios.post('http://localhost:4000/api/posts', {
            title: data.title,
            author: "5dc2e5bab8b6602b943087db",
            content: data.content,
            tags: data.tags
        })
        .then(response => {
            this.handlePostResult(true)
        })
        .catch(error => {
            this.handlePostResult(false)
        })
    }

    postSchema = Yup.object().shape({
        title: Yup.string()
            .min(2, 'Too short')
            .max(100, 'Too long')
            .required('A post needs a name!'),
        content: Yup.string()
            .min(200, 'Too short')
            .required('Uuh yeah, you have to write something'),
        tagsStr: Yup.string(),
        tags: Yup.array()
            .min(2, 'At least 2 tags')
            .required()
    })

    render() {

        let cursorClass = this.state.isPosting ? 'not-allowed' : null
        
        return (
            <div className="new-post-component">
                {this.state.isPosting ? <LoadingBar /> : null}
                <PageTitle title="New post!" />

                <Formik
                    initialValues={{ title: '', content: '', tagsStr: '', tags: [] }}
                    // validationSchema={this.postSchema}
                    onSubmit={(values, actions) => {
                        values.tags = this.state.tags
                        
                        this.sendCreatePostRequest(values)
                    }}
                    >
                    {props => (
                        <React.Fragment>
                            <form onSubmit={props.handleSubmit}>
                                <div className="form-control">
                                    <label className="bm-label">Title</label>
                                    <input 
                                        className="bm-input" 
                                        type="text"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.title}
                                        autoComplete="off"
                                        name="title"/>
                                </div>
                                
                                <div className="form-control">
                                    <label className="bm-label">Write your post</label>
                                    <textarea 
                                        className="bm-textarea"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.content}
                                        name="content">
                                    </textarea>
                                </div>
                    
                                <div className="form-control">
                                    <label className="bm-label">Tags <span className="bm-label-note">(max. 25 characters each)</span></label>
                                    <input 
                                        placeholder="press enter on each" 
                                        className="bm-input tags" 
                                        type="text"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.tagsStr}
                                        onKeyPress={(e) => {
                                            this.addTagHandler(e, props.values.tagsStr)
                                            props.values.tagsStr = ""
                                        }}
                                        autoComplete="off"
                                        name="tagsStr"/>
                                    <ChipsContainer onDeleteItem={this.deleteTag.bind(this)} items={this.state.tags} />
                                </div>
                               <div className="button-container">
                                    <button 
                                        className={`bm-button main medium publish-post-button ${cursorClass}`}
                                        type="button"
                                        onClick={props.handleSubmit}
                                        disabled={this.state.isPosting}
                                        >
                                        Publish
                                    </button>
                                    <button 
                                        className={`bm-button secondary medium save-post-button ${cursorClass}`}
                                        type="button"
                                        disabled={this.state.isPosting}
                                        >
                                        Save
                                    </button>
                                    <button 
                                        className={`bm-button danger medium cancel-post-button ${cursorClass}`} 
                                        type="button" 
                                        onClick={() => this.setState({redirect:true})}
                                        disabled={this.state.isPosting}
                                        >
                                        Cancel
                                    </button>
                               </div>
                            </form>
                            {this.state.redirect ? <Redirect to="/" /> : null}
                        </React.Fragment>
                    )}
                </Formik>

            </div>
        )
    }
}
