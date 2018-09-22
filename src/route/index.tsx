import * as React from 'react'
import *  as ReactDOM from 'react-dom'
import { Route, Switch } from 'react-router'
import { Router } from 'react-router-dom'
import { DomainFactory } from '../domain/factory'
import { Header } from '../view/molecules/header'
import { PageFactory } from '../view/pages'

export interface IAppRouteProps {
  history: any
}

export default class AppRoute extends React.Component<IAppRouteProps, any> {
  domainFactory: DomainFactory
  pf: PageFactory

  constructor(props: IAppRouteProps) {
    super(props)
    this.domainFactory = new DomainFactory()
    this.pf = new PageFactory(this.domainFactory, this.props.history)
  }

  render(): JSX.Element {
    return (
      <Router history={this.props.history}>
        <div>
          <Header />
          <Switch>
            <Route path="/lyric" component={this.pf.LyricPage} />
            <Route path="/thanks" component={this.pf.ThanksPage} />
            <Route path="/" exact component={this.pf.HomePage} />
            <Route path="*" component={this.pf.NotFoundPage} />
          </Switch>
        </div>
      </Router>
    )
  }
}
