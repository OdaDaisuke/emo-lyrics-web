import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { css, StyleSheet } from 'aphrodite'
import { NotFoundCard, NotFoundCardVM } from '../organisms'

export class NotFound extends React.Component<any, any> {

  render():JSX.Element {
    return (
      <div>
        <NotFoundCard vm={new NotFoundCardVM()} />
      </div>
    )
  }

}
