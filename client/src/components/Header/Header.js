import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Header.scss'

import Container from './../Container/Container'

export default class Header extends Component {

    render() {
        return (
            <header className="header-component">
                <Container>
                    <div className="header-content">
                        <Link to='/'>
                            <h1>bookmarc</h1>
                        </Link>

                        <Formik
                            initialValues={{ search: '' }}
                            onSubmit={(values, actions) => {
                                // make search
                            }}
                            >
                            {props => (
                                <form className="search" onSubmit={props.handleSubmit}>
                                <input
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.search}
                                    name="search"
                                    placeholder="Search "
                                />
                                </form>
                            )}
                        </Formik>
                        
                        <div className="header-buttons">
                            <div className="header-button create-post-button">
                                
                                <Link to="/create-post">
                                    <FontAwesomeIcon icon="plus" />
                                    <span>Create post</span>
                                </Link>
                            </div>
                            <div className="header-button notifications-button">
                                <Link to="/notifications">
                                    <FontAwesomeIcon icon="bell" />
                                </Link>
                            </div>
                            <div className="header-button user-button">
                                <Link to={`/users/${this.username}`}>
                                    <FontAwesomeIcon icon="user" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </Container>
            </header>
        )
    }
}