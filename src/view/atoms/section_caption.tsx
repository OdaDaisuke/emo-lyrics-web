import * as React from 'react'
import { bind } from 'bind-decorator'
import { css, StyleSheet } from 'aphrodite'
import { utils } from '../styles'

export interface ISectionCaptionProps {
  className?: string
  isWhite?: boolean
}

export class SectionCaption extends React.Component<ISectionCaptionProps, any> {
    render(): JSX.Element {
        return (
            <h2 className={this.textClass}>{this.props.children}</h2>
        )
    }

    get textClass() {
        return [
            css(this.styles.caption),
            this.props.isWhite && css(this.styles.textWhite),
            this.props.className || "",
        ].join(" ")
    }

    get styles() {
        return StyleSheet.create({
            caption: {
                color: '#3f3f3f',
                fontWeight: 500,
                letterSpacing: 2,
                lineHeight: 1.82,
                marginTop: '1.5em',
                marginBottom: '1em',
            },
            textWhite: {
                color: '#fff',
            },
        })
    }

}
