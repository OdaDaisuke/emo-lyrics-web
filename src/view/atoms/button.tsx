import * as React from 'react'
import { bind } from 'bind-decorator'
import { css, StyleSheet } from 'aphrodite'
import { utils } from '../styles'

export interface IButtonProps {
  onClick?: (event: React.FormEvent<any>) => void,
  isSignin?: boolean
}

export class Button extends React.Component<IButtonProps, any> {
    render(): JSX.Element {
        return (
            <button
                className={this.buttonClass}
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

    get buttonClass() {
        return [
            css(this.styles.button),
            this.props.isSignin && css(this.styles.signinButton),
        ].join(" ")
    }

    get label() {
        return this.props.children ? this.props.children : ''
    }

    get styles() {
        return StyleSheet.create({
            button: utils.button,
            signinButton: {
                backgroundColor: '#4F9DF7',
                backgroundImage: 'linear-gradient(#4F9DF7, #4F9DF7) !important'
            },
        })
    }

}
