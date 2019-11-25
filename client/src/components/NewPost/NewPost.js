import React, { Component } from 'react'

import './NewPost.scss'
import '../../constants/styles/common/button.scss'

import coverImage from '../../assets/images/test/network.jpg'

import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import toastr from 'toastr'
import 'toastr/toastr.scss'

import PageTitle from './../common/PageTitle/PageTitle'
import ChipsContainer from './../common/ChipsContainer/ChipsContainer'
import LoadingBar from './../common/LoadingBar/LoadingBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class NewPost extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            tags: [],
            redirect: false,
            isAttemptingToPost: false,
            posted: false,
            gotImage: false
        }

        // settin toastr options
        toastr.options.timeOut = 7000
        toastr.options.showMethod = 'fadeIn'
        // disable click event on every toastr after it's hidden
        toastr.options.onHidden = () => {toastr.options.onCloseClick = null}
    }

    attemptUpload() {
        // implement upload here

        this.setState({gotImage: true})
    }

    deleteImage() {
        // implement delete here

        this.setState({gotImage: false})
    }

    addTagHandler(e, newTag, callback) {
        if(e.which !== 13) {
            return
        }

        if(newTag !== '') {
            // format tag (replace spaces for _)
            newTag = newTag.replace(new RegExp(' ', 'g'), '_')
            // create new tag list
            const newTags = [...new Set([...this.state.tags, newTag])]
            // update form tags
            callback(newTags)
            // update state tags
            this.setState({
                tags: newTags
            })
        }
        
    }

    deleteTag(idx) {
        let tags = this.state.tags
        tags.splice(idx, 1);
        this.setState({tags: tags})
    }

    handlePostResult(success) {

        const onError = () => {
            toastr.options.onclick = () => {
                // show possible reasons why the post was not submitted
            }
            toastr.error('Something wrong happened. Click for more info', 'Oops!')
        }

        const onSuccess = () => {
            toastr.success('Your post has been submitted! Readers can now find it.', 'Yay!')
        }

        setTimeout(() => {
            success ? onSuccess() : onError()
            this.setState({isAttemptingToPost: success, posted: success})
        }, 600);
    }


    sendCreatePostRequest(data) {
        this.setState({isAttemptingToPost: true})

        axios.post('http://localhost:4000/api/poss', {
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

    validateTags(tags) {
        let error;
        if(tags.length < 2) {
            error = 'Give us at least 2 tags'
        }
    }

    postSchema = Yup.object().shape({
        title: Yup.string()
            .min(2, 'This title is too short')
            .max(100, 'Woah! Less than 100 characters okay?')
            .required('A post needs a name!'),
        content: Yup.string()
            .min(200, 'A post should have at least 200 characters')
            .required('Uuh yeah, you have to write something'),
        tagsStr: Yup.string(),
        tags: Yup.array()
            .min(2, 'Give us at least 2 tags')
            .required('Give us at least 2 tags')
    })

    render() {

        let cursorClass = this.state.isAttemptingToPost ? 'not-allowed' : null

        if(this.state.posted){
            setTimeout(() => {
                this.setState({posted: false, redirect: true})
            }, 600)
        }
        
        return (
            <div className="new-post-component">
                {this.state.isAttemptingToPost ? <LoadingBar /> : null}
                <PageTitle title="New post!" />

                <Formik
                    initialValues={{ title: '', content: '', tagsStr: '', tags: [] }}
                    validationSchema={this.postSchema}
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
                                        className={`bm-input ${props.errors.title && props.touched.title ? 'error' : null}`}
                                        type="text"
                                        onChange={props.handleChange}
                                        value={props.values.title}
                                        autoComplete="off"
                                        name="title"/>
                                    {props.errors.title && props.touched.title && <p className="error">{props.errors.title}</p>}
                                </div>
                                
                                <div className="form-control">
                                    <label className="bm-label">Write your post</label>
                                    <textarea 
                                        className={`bm-textarea ${props.errors.content && props.touched.content ? 'error' : null}`}
                                        onChange={props.handleChange}
                                        value={props.values.content}
                                        name="content">
                                    </textarea>
                                    {props.errors.content && props.touched.content && <p className="error">{props.errors.content}</p>}
                                </div>
                    
                                <div className="form-control">
                                    <label className="bm-label">Tags <span className="bm-label-note">(max. 25 characters each)</span></label>
                                    <input 
                                        placeholder="press enter on each" 
                                        className="bm-input tags" 
                                        type="text"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        validate={this.validateTags(props.values.tags)}
                                        value={props.values.tagsStr}
                                        onKeyPress={(e) => {
                                            this.addTagHandler(e, props.values.tagsStr, (tags) => {
                                                props.values.tags = tags
                                            })
                                            props.values.tagsStr = ""
                                        }}
                                        autoComplete="off"
                                        name="tagsStr"/>
                                    {props.errors.tags && props.touched.tagsStr && <p className="error">{props.errors.tags}</p>}
                                    <ChipsContainer onDeleteItem={this.deleteTag.bind(this)} items={this.state.tags} />
                                </div>

                                <div className="button-container">
                                    <button 
                                        className={`bm-button main medium publish-post-button ${cursorClass}`}
                                        type="button"
                                        onClick={props.handleSubmit}
                                        disabled={this.state.isAttemptingToPost}
                                        >
                                        Publish
                                    </button>
                                    <button 
                                        className={`bm-button secondary medium save-post-button ${cursorClass}`}
                                        type="button"
                                        disabled={this.state.isAttemptingToPost}
                                        >
                                        Save
                                    </button>
                                    <button 
                                        className={`bm-button danger medium cancel-post-button ${cursorClass}`} 
                                        type="button" 
                                        onClick={() => this.setState({redirect:true})}
                                        disabled={this.state.isAttemptingToPost}
                                        >
                                        Cancel
                                    </button>
                               </div>
                            </form>
                            <div className="upload-image-container">
                                <label className="bm-label">
                                    Cover image <span className="bm-label-note">(make it a big one)</span>
                                </label>
                                {this.state.gotImage ?
                                    <React.Fragment>
                                        <div 
                                            className="image-container" 
                                            style={{backgroundImage:`url(${coverImage})`}}>
                                        </div>
                                        <div className="upload-image-controls">
                                            <button className="bm-button secondary" onClick={this.attemptUpload.bind(this)}>Change image</button>
                                            <button className="bm-button secondary medium" onClick={this.deleteImage.bind(this)}>Delete</button>
                                        </div>
                                    </React.Fragment>
                                    :
                                    <div className="upload-image-start">
                                        <button className="bm-button main large add-image-button" onClick={this.attemptUpload.bind(this)}>
                                            <span><FontAwesomeIcon icon="upload" /></span>
                                        </button>
                                    </div>
                                }
                            </div>
                            {this.state.redirect ? <Redirect to="/" /> : null}
                        </React.Fragment>
                    )}
                </Formik>

            </div>
        )
    }
}
