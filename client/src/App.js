import React from 'react';
import logo from './logo.svg';
import './App.scss';

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faBell, faUser, faHeart, faComment } from '@fortawesome/free-solid-svg-icons'

import Header from './components/Header/Header'
import Container from './components/Container/Container'
import Display from './components/Display/Display'
import Feed from './components/Feed/Feed'
import NewPost from './components/NewPost/NewPost'

function App() {

  library.add(faPlus, faBell, faUser, faHeart, faComment)

  return (
    <div className="App">
      <Router>
        <Header />
        <Container>
          <Display>
            <Route path="/" exact component={Feed} />
            <Route path="/create-post" component={NewPost} />
          </Display>
        </Container>
      </Router>
    </div>
  );
}

export default App;
