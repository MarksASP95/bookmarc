import React from 'react';
import logo from './logo.svg';
import './App.scss';

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faBell, faUser, faHeart, faComment, faUpload, faTimes } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'

import Header from './components/Header/Header'
import Container from './components/Container/Container'
import Display from './components/Display/Display'
import Feed from './components/Feed/Feed'
import NewPost from './components/NewPost/NewPost'
import Popup from './components/common/Popup/Popup'
import PostView from './components/PostView/PostView'

library.add(faPlus, faBell, faUser, faHeart, faComment, faUpload, faTimes)

class App extends React.Component {

  state = {
    showPopup: false,
    popupTitle: null,
    popupContent: null,
    popupList: null
  }
  

  render() {
    return (
      <div className="App">
        <Router>
          { this.props.showPopup ? 
            <Popup title={this.props.popupTitle} content={this.props.popupContent} list={this.props.popupList} />
            :
            null
          }
          <Header />
          <Container>
            <Display>
              <Route path="/" exact component={Feed} />
              <Route path="/create-post" component={NewPost} />
              <Route path="/post/:post_id" component={PostView} />
            </Display>
          </Container>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    showPopup: state.showPopup,
    popupTitle: state.popupTitle,
    popupContent: state.popupContent,
    popupList: state.popupList
  }
}

export default connect(mapStateToProps, null)(App);
