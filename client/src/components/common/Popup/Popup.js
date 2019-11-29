import React from 'react'

import { connect } from 'react-redux'
import Fade from 'react-reveal/Fade'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Popup.scss'

function Popup(props) {

    window.scrollTo(0, 0)
    document.body.style.overflow = 'hidden'

    const close = () => {
        document.body.style.overflow = 'initial' 
        props.onClose()
    }

    return (
        <Fade duration={400}>
            <div className="popup-component" onClick={close}>
                <div className="popup-text-container">
                    <button className="popup-close-button">
                        <FontAwesomeIcon icon="times" />
                    </button>
                    <h3 className="popup-title">{props.title}</h3>
                    <div className="popup-content">
                        <p>{props.content}</p>
                        {
                            props.list ? 
                            <ul className="popup-list">
                                {props.list.map(item => <li>{item}</li>)}    
                            </ul>
                            :
                            null
                        }
                    </div>
                </div>
            </div>
        </Fade>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onClose: () => dispatch({type: 'TOGGLE_POPUP'})
    }
}

export default connect(null, mapDispatchToProps)(Popup)
