import React, { Component } from 'react'

import './NewPost.scss'

import PageTitle from './../common/PageTitle/PageTitle'
import { Formik } from 'formik'
import * as Yup from 'yup'
import ChipsContainer from './../common/ChipsContainer/ChipsContainer'

export default class NewPost extends Component {
    
    constructor(props) {

        super(props)

        this.state = {
            tags: []
        }

    }

    addTagHandler(e, newTag) {
        if(e.which !== 13) {
            return
        }

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
                        values.tags = this.state.tags;
                        alert(values.tags)
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
                                        name="tagsStr"/>
                                    <ChipsContainer onDeleteItem={this.deleteTag.bind(this)} items={this.state.tags} />
                                </div>
                                <button onClick={props.handleSubmit} type="button">Publish</button>
                            </form>
                        </React.Fragment>
                    )}
                </Formik>

            </div>
        )
    }
}
