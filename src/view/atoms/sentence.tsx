import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { utils } from '../styles'

export interface ISentenceProps {
  center?: boolean
  className?: string
}

export class Sentence extends React.Component<ISentenceProps, any> {
    render(): JSX.Element {
        return (
            <p className={this.wrapperClass}>
                {this.props.children}
            </p>
        )
    }

    get wrapperClass() {
        return [
            css(this.styles.p),
            this.props.className || "",
        ].join(" ")
    }

    get styles() {
    	const centering = this.props.center
        return StyleSheet.create({
            p: Object.assign({}, utils.p, {
                fontWeight: '100',
                textAlign: (centering) ? 'center': 'left',
            })
        })
    }

}
