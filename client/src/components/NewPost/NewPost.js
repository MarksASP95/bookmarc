import React, { Component } from 'react'

import './NewPost.scss'

import PageTitle from './../common/PageTitle/PageTitle'
import Chip from './../common/Chip/Chip'
import { Formik } from 'formik'
import * as Yup from 'yup'

export default class NewPost extends Component {


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
        return (
            <div className="new-post-component">

                <PageTitle title="New post!" />

                <Formik
                    initialValues={{ title: '', content: '', tagsStr: '', tags: [] }}
                    // validationSchema={this.postSchema}
                    onSubmit={(values, actions) => {
                        alert(values.title)
                    }}
                    >
                    {props => (
                        <form onSubmit={props.handleSubmit}>
                            <div className="form-control">
                                <label className="bm-label">Title</label>
                                <input 
                                    className="bm-input" 
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.title}
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
                                    name="tags"/>
                            </div>
                
                            <button type="submit">Publish</button>
                        </form>
                    )}
                </Formik>

            </div>
        )
    }
}
