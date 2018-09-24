import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { Link } from 'react-router-dom'
import { MediaBreakPointUp } from '../styles'

interface MenuProps {
    isDrawerOpen: boolean
    isAuthed: boolean
    toggleMenu: () => void
}

export class Menu extends React.Component<MenuProps, any> {
    render(): JSX.Element {
        return (
            <nav className={this.containerClass}>
                <div className={css(this.styles.innerContainer)}>
                    {this.innerContent}
                </div>
            </nav>
        )
    }

    get innerContent() {
        let linkSummaries = this.linkSummaries.default
        if(this.props.isAuthed) {
            linkSummaries = this.linkSummaries.authed
        }

        return linkSummaries.map(linkSummary => {
            return (
                <Link
                    onClick={this.props.toggleMenu}
                    to={linkSummary.to}
                    className={css(this.styles.link)}
                    key={linkSummary.to}
                >{linkSummary.label}</Link>
            )
        })
    }

    get linkSummaries() {
        return {
            default: [
                { to: "/signin", label: "ログイン", },
            ],
            authed: [
                { to: "/me", label: "マイページ", },
                { to: "/signout", label: "ログアウト", },
            ],
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
                    right: '-100vw',
                },
                '100%': {
                    right: 0,
                },
            },
            container: {
                alignContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.84)',
                boxShadow: '0 2px 15px -5px #5f5f5f',
                display: 'none',
                flexWrap: 'wrap',
                height: `100vh`,
                justifyContent: 'center',
                position: 'fixed',
                right: '-100vw',
                top: 0,
                width: '100vw',
                zIndex: 100,
                [MediaBreakPointUp.MD]: {
                    backgroundColor: '#fff',
                    boxShadow: 'none',
                    display: 'flex',
                    height: 'auto',
                    position: 'relative',
                    right: 0,
                    width: 'auto',
                },
            },
            innerContainer: {
                display: 'flex',
                flex: '1 0 100%',
                flexWrap: 'wrap',
            },
            activeContainer: {
                display: 'flex',
                right: 0,
                animationName: 'activeContainer',
                animationDuration: '1s',
            },
            link: {
                boxSizing: 'border-box',
                color: '#fff',
                display: 'block',
                flex: '0 0 50%',
                fontSize: '1.25em',
                letterSpacing: '2px',
                marginBottom: '10px',
                padding: '1em 1.25em',
                textAlign: 'center',
                textDecoration: 'none',
                ':nth-child(odd)': {
                    borderRight: '1px solid #fff',
                },
                [MediaBreakPointUp.MD]: {
                    color: '#3f3f3f',
                    flex: '1 0 auto',
                    fontSize: '0.92em',
                    marginBottom: 0,
                    padding: '0.8em 1.5em'
                },
            },
        })
    }

}