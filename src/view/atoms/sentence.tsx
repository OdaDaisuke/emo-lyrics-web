import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { MediaBreakPointUp } from '../styles'

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
            this.props.center && css(this.styles.textCenter),
            this.props.className || "",
        ].join(" ")
    }

    get styles() {        
        return StyleSheet.create({
            p: {
                fontSize: 12,
                letterSpacing: 2,
                lineHeight: 2,
                fontWeight: 300,
                [MediaBreakPointUp.SM]: {
                    fontSize: '0.9rem',
                },    
            },
            textCenter: {
                textAlign: 'center',
            },
        })
    }

}
