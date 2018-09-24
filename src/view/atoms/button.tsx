import * as React from 'react'
import { bind } from 'bind-decorator'
import { css, StyleSheet } from 'aphrodite'
import { utils } from '../styles'

export interface IButtonProps {
  onClick?: (event: React.FormEvent<any>) => void,
}

export class Button extends React.Component<IButtonProps, any> {
    render(): JSX.Element {
        return (
            <button
                className={css(this.styles.button)}
                onClick={this.onClick}
            >
                {this.label}
            </button>
        )
    }

    @bind
    onClick(event: React.FormEvent<any>) {
        this.props.onClick && this.props.onClick(event)
    }

    get label() {
        return this.props.children ? this.props.children : ''
    }

    get styles() {
        return StyleSheet.create({
            button: utils.button,
        })
    }

}
