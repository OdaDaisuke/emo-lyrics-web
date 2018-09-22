import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'

interface IFullWidthLayoutProps {
    className?: string
}

export class FullWidthLayout extends React.Component<IFullWidthLayoutProps, any> {
    render() {
        return(
            <div className={this.containerClass}>
                {this.props.children}
            </div>
        )
    }

    get containerClass() {
        return [
            css(this.styles.container),
            this.props.className || "",
        ].join(" ")
    }

    get styles() {
        return StyleSheet.create({
            container: {
            },
        })
    }

}