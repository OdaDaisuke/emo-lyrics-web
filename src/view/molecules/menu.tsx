import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { Link } from 'react-router-dom'

interface MenuProps {
    isDrawerOpen: boolean
    isAuthed: boolean
}

export class Menu extends React.Component<MenuProps, any> {
    render(): JSX.Element {
        return (
            <nav className={this.containerClass}>
                {this.innerContent}
            </nav>
        )
    }

    get innerContent() {
        if(this.props.isAuthed) {
            return (
                <React.Fragment>
                    <Link to="/me" className={css(this.styles.link)}>マイページ</Link>
                    <Link to="/signout" className={css(this.styles.link)}>ログアウト</Link>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Link to="/signin" className={css(this.styles.link)}>ログイン</Link>
                </React.Fragment>
            )
        }
    }

    get containerClass() {
        return [
            css(this.styles.container),
            this.props.isDrawerOpen && css(this.styles.activeContainer),
        ].join(" ")
    }

    get styles() {
        return StyleSheet.create({
            '@keyframes activeContainer': {
                '0%': {
                    right: '-90vw',
                },
                '100%': {
                    right: 0,
                },
            },
            container: {
                alignContent: 'flex-start',
                alignItems: 'flex-start',
                backgroundColor: '#fff',
                boxShadow: '0 2px 15px -5px #5f5f5f',
                display: 'none',
                flexWrap: 'wrap',
                height: `100vh`,
                position: 'fixed',
                right: '-90vw',
                top: 0,
                width: '90vw',
                zIndex: 100,
            },
            activeContainer: {
                display: 'flex',
                right: 0,
                animationName: 'activeContainer',
                animationDuration: '1s',
            },
            link: {
                padding: '1em 1.25em',
                textDecoration: 'none',
                width: '100%',
            },
        })
    }

}