import * as React from 'react'
import *  as ReactDOM from 'react-dom'
import { Route, Switch } from 'react-router'
import { Router } from 'react-router-dom'
import { DomainFactory } from '../domain/factory'
import { Stores } from '../stores/factory'
import { Header } from '../view/molecules/header'
import { PageFactory } from '../view/pages'

export interface IAppRouteProps {
  history: any
}

export default class AppRoute extends React.Component<IAppRouteProps, any> {
  domainFactory: DomainFactory
  stores: Stores
  pf: PageFactory

  constructor(props: IAppRouteProps) {
    super(props)
    this.domainFactory = new DomainFactory()
    this.stores = new Stores()
    this.pf = new PageFactory(this.domainFactory, this.props.history, this.stores)
  }

  render(): JSX.Element {
    return (
      <React.Fragment>
        <Router history={this.props.history}>
          <div>
            <Header />
            <Switch>
              <Route path="/" exact component={this.pf.HomePage} />
              <Route path="/lyric" component={this.pf.LyricPage} />
              <Route path="/thanks" component={this.pf.ThanksPage} />
      	      <Route path="*" component={this.pf.NotFoundPage} />
            </Switch>
          </div>
        </Router>
      </React.Fragment>
    )
  }
}
