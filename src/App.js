import React, { Component } from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import Landing from './features/Issues/Landing';
import Issues from './features/Issues/Issues';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Route render={({location}) => (
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            timeout={500}
            classNames="fade"
          >
            <Switch location={location}>
              <Route exact path="/" component={Landing} />
              <Route exact path="/:owner/:repo" component={Issues} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )} />
      </div>
    );
  }
}

export default App;
