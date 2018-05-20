import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { css, StyleSheet } from 'aphrodite'
import * as configs from '../../configs'

export interface ISentenceProps {
  label: string
}

export class Sentence extends React.Component<ISentenceProps, any> {
    render(): JSX.Element {
        return (
            <p className={css(this.style.p)}>
                {this.props.label}
            </p>
        )
    }

    get label() {
        return this.props.label ? this.props.label : '文字が入ります'
    }


    get style() {
        return StyleSheet.create({
            p: configs.styles.p
        })
    }

}
