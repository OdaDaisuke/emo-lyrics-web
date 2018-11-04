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
                alignItems: 'center',
                backgroundColor: '#2196f3',
                backgroundImage: '#2196f3',
                borderRadius: '50%',
                color: '#fff',
                display: 'flex',
                fontSize: '0.85rem',
                height: 40,
                justifyContent: 'center',
                letterSpacing: 1,
                margin: 2,
                width: 40,
                ':hover': {
                    backgroundColor: '#2196f3',
                    color: '#ffffff',
                },
            },
        })
    }

}
