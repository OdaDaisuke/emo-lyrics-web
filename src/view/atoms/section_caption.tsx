import * as React from 'react'
import { css, StyleSheet } from 'aphrodite/no-important'

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
                fontsize: '1.146em',
                fontWeight: 500,
                letterSpacing: 2,
                lineHeight: 1.82,
                marginTop: '1em',
                marginBottom: '1em',
            },
            textWhite: {
                color: '#fff !important',
            },
        })
    }

}
