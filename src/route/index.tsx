import * as React from 'react'
import *  as ReactDOM from 'react-dom'
import { Route, Switch } from 'react-router'
import { Router } from 'react-router-dom'
import { Header } from '../view/molecules/header'

import { NotFound } from '../view/pages'
import Lyric from '../view/pages/lyric'
import Home from '../view/pages/home'
import TwitterVerification from '../view/pages/twitter_verification'
import Thanks from '../view/pages/thanks'

export interface AppRouteProps {
  history: any
}

export class AppRoute extends React.Component<AppRouteProps, any> {
  render(): JSX.Element {
    return (
      <React.Fragment>
        <Router history={this.props.history}>
          <div>
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/lyric" component={Lyric} />
	      <Route path="/thanks" component={Thanks} />
	      <Route path="/twitter_code_verification" component={TwitterVerification} />
	      <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </Router>
      </React.Fragment>
    )
  }
}
