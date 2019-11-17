import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faBell, faUser, faHeart, faComment } from '@fortawesome/free-solid-svg-icons'

import Header from './components/Header/Header'
import PostCard from './components/Feed/PostCard/PostCard'
import Container from './components/Container/Container';
import Display from './components/Display/Display';
import Feed from './components/Feed/Feed';

function App() {

  library.add(faPlus, faBell, faUser, faHeart, faComment)

  return (
    <div className="App">
      <Router>
        <Header />
        {/* <Route path="/" exact component={Feed} /> */}
        <Container>
          <Display>
            <Feed />
          </Display>
        </Container>
      </Router>
    </div>
  );
}

export default App;
