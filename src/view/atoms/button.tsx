import * as React from 'react'
import { bind } from 'bind-decorator'
import { css, StyleSheet } from 'aphrodite'
import { MediaBreakPointUp } from '../styles'

export interface IButtonProps {
  onClick?: (event: React.FormEvent<any>) => void,
  isSignin?: boolean
  isRadius?: boolean
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
            this.props.isRadius && css(this.styles.radius),
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
                boxShadow: '0 2px 15px -5px #3f3f3f',
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
                backgroundImage: 'linear-gradient(55deg, rgb(79, 150, 230) 0%, rgb(25, 171, 226) 53%, rgb(42, 240, 251) 100%) !important',
                fontSize: '1.15em',
                marginRight: 'auto',
                marginLeft: 'auto',
                borderRadius: '40px',
                padding: '18px 25px 20px',
                position: 'relative',
                width: '90%',
                [MediaBreakPointUp.SM]: {
                    padding: '18px 50px 20px',
                    width: 'auto',
                },
            },
            nextArrow: {
                ':before': {
                    content: "'>'",
                    fontSize: 14,
                    fontWeight: 300,
                    position: 'absolute',
                    right: 15,
                    top: '50%',
                    transform: 'translate(0, -50%)',
                },
            },
            radius: {
                backgroundImage: 'linear-gradient(65deg, rgb(232, 69, 125), rgb(224, 67, 110), rgb(239, 137, 99))',
                borderRadius: '40px',
                fontWeight: 700,
                fontSize: '0.98em',
                minWidth: '250px',
                padding: '16px 32px',
                [MediaBreakPointUp.SM]: {
                    fontSize: '1.14em',
                    minWidth: '300px',
                    padding: '19px 36px',
                },
            },
        })
    }

}
