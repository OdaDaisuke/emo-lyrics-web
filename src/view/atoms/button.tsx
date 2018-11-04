import * as React from 'react'
import { bind } from 'bind-decorator'
import { css, StyleSheet } from 'aphrodite'
import { MediaBreakPointUp } from '../styles'

export interface IButtonProps {
  onClick?: (event: React.FormEvent<any>) => void,
  isSignin?: boolean
  className?: string
  enableNextArrow?: boolean
  enablePrevArrow?: boolean
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
            this.props.enableNextArrow && css(this.styles.nextArrow),
            this.props.isSignin && css(this.styles.signinButton),
            this.props.className || "",
        ].join(" ")
    }

    get label() {
        return this.props.children ? this.props.children : ''
    }

    get styles() {
        return StyleSheet.create({
            button: {
                backgroundImage: 'linear-gradient(135deg, #ef5489, #f7417f, #c11c54)',
                borderRadius: 4,
                boxShadow: '0 2px 15px -3px #3f3f3f',
                color: '#fff',
                cursor: 'pointer',
                display: 'inline-block',
                fontSize: '1.05em',
                marginRight: 'auto',
                marginLeft: 'auto',
                position: 'relative',
                borderWidth: 0,
                fontWeight: 'bold',
                letterSpacing: 2,
                outline: 'none',
                padding: '14px 38px',
                textDecoration: 'none',
                transition: 'all 0.2s',
                willChange: 'transform',
                ':hover': {
                    opacity: 0.8,
                },
                [MediaBreakPointUp.SM]: {
                  fontSize: '1.08em',
                  padding: '16px 48px 18px',
                },
            },
            signinButton: {
                backgroundColor: '#4F9DF7',
                backgroundImage: 'linear-gradient(90deg, #7CB9FF 0%, #3A9CF9 53%, #56E5FF 100%) !important',
                fontSize: '1.15em',
                marginRight: 'auto',
                marginLeft: 'auto',
                borderRadius: '40px',
                padding: '18px 50px 20px',
                position: 'relative',
                width: '90%',
                [MediaBreakPointUp.SM]: {
                    width: 'auto',
                },
            },
            nextArrow: {
                ':before': {
                    content: "'>'",
                    fontSize: 14,
                    fontWeight: 200,
                    position: 'absolute',
                    right: 10,
                    top: '50%',
                    transform: 'translate(0, -50%)',
                },
            },
        })
    }

}
