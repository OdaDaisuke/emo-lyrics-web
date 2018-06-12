import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { css, StyleSheet } from 'aphrodite'
import * as configs from '../../configs'

export interface ISentenceProps {
  center?: boolean
}

export class Sentence extends React.Component<ISentenceProps, any> {
    render(): JSX.Element {
        return (
            <p className={css(this.style.p)}>
                {this.props.children}
            </p>
        )
    }


    get style() {
	const centering = this.props.center
        return StyleSheet.create({
            p: Object.assign({}, configs.styles.p, {
	      fontWeight: '100',
	      textAlign: (centering) ? 'center': 'left',
	    })
        })
    }

}
