import * as React from 'react'
import { Route, Switch } from 'react-router'
import { Router } from 'react-router-dom'
import { DomainFactory } from '../domain/factory'
import { Header } from '../view/organisms/header'
import { PageFactory } from '../view/pages'
import { RouteController } from './controller'

export interface IAppRouteProps {
  history: any
}

export default class AppRoute extends React.Component<IAppRouteProps, any> {
  domainFactory: DomainFactory
  pf: PageFactory

  constructor(props: IAppRouteProps) {
    super(props)
    this.domainFactory = new DomainFactory(this.props.history)
    this.pf = new PageFactory(this.domainFactory, this.props.history)
  }

  render(): JSX.Element {
    return (
      <Router history={this.props.history}>
        <div>
          <Header isAuthed={this.domainFactory.router.isAuthed} />
          <Switch>
            <Route path="/lyric" component={this.pf.LyricPage} />
            <Route path="/signout" exact component={this.pf.SignoutPage} />
            <Route path="/me" exact component={this.pf.MePage} />
            <Route path="/" exact component={this.pf.HomePage} />
            <Route path="*" component={this.pf.NotFoundPage} />
          </Switch>
        </div>
      </Router>
    )
  }
}
