import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { Header } from '../organisms/'

interface IFullWidthLayoutProps {
    className?: string
    transparentHeader?: boolean
    isAuthed: boolean
}

export class FullWidthLayout extends React.Component<IFullWidthLayoutProps, any> {
    render() {
        return(
            <div className={this.containerClass}>
                <Header
                    isAuthed={this.props.isAuthed}
                    isTransparent={this.props.transparentHeader}
                />
                <div className={css(this.styles.innerContainer)}>
                    {this.props.children}
                </div>
            </div>
        )
    }

    get containerClass() {
        return [
            css(this.styles.container),
            this.props.className || ""
        ].join(" ")
    }

    get styles() {
        return StyleSheet.create({
            container: {
                position: 'relative',
            },
            innerContainer: {},
        })
    }

}