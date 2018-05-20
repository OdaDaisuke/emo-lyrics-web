import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'react-hot-loader/patch'
import createBrowserHistory from 'history/createBrowserHistory'
import { hot } from 'react-hot-loader'
import { css, StyleSheet } from 'aphrodite'
import * as configs from './configs'
import { AppRoute } from './route'

export class AppContainer {
  initialize(): void {

    const history = createBrowserHistory()

    ReactDOM.render(
      <div className={css(this.styles.body)}>
        <AppRoute history={history} />
      </div>,
      document.querySelector('#app-container'),
    )
  }

  get styles() {
    return StyleSheet.create({
        body: {
            backgroundColor: configs.styles.bg_default,
            fontFamily: 'Noto Sans Japanese',
            margin: 0,
            minHeight: '100vh',
            padding: 0,
        },
        '*': {
            boxSizing: 'border-box',
        },
        'p, span': {
            '-webkit-font-smoothing': 'antialiased',
        },
    })
  }
}

new AppContainer().initialize()
