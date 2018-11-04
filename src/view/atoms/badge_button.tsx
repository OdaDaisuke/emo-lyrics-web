import * as React from 'react'
import { bind } from 'bind-decorator'
import { css, StyleSheet } from 'aphrodite'

export interface IBadgeButtonProps {
  onClick?: (event: React.FormEvent<any>) => void,
  type?: string
  fill?: boolean
  className?: string
  link: string
}

export class BadgeButton extends React.Component<IBadgeButtonProps, any> {
    render(): JSX.Element {
        return (
            <a
                onClick={this.onClick}
                href={this.props.link}
                className={this.buttonClass}
                target="_blank"
            >
                {this.label}
            </a>
        )
    }

    get buttonClass() {
        return [
            css(this.styles.tweetButton),
            this.props.className || "",
        ].join(' ')
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
            tweetButton: {
                backgroundColor: '#2196f3',
                backgroundImage: '#2196f3',
                borderRadius: 4,
                color: '#fff',
                fontSize: '0.87rem',
                letterSpacing: 1,
                margin: 2,
                padding: '14px 45px 12px',
                ':hover': {
                    backgroundColor: '#2196f3',
                    color: '#ffffff',
                },
                display: 'inline-block',
            },
        })
    }

}
