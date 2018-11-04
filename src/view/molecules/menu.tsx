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
                { to: "/favorites", label: "お気に入り", },
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

    get activeContainerKeyframes() {
        return {
            '0%': {
                right: '-100vw',
            },
            '100%': {
                right: 0,
            },
        }
    }

    get styles() {
        return StyleSheet.create({
            container: {
                alignContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.94)',
                boxShadow: '0 2px 15px -5px #5f5f5f',
                display: 'none',
                flexWrap: 'wrap',
                height: `100vh`,
                justifyContent: 'center',
                position: 'fixed',
                right: '-100vw',
                top: 0,
                width: '100vw',
                zIndex: 10000,
                [MediaBreakPointUp.MD]: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    display: 'flex',
                    height: 'auto',
                    marginLeft: 50,
                    position: 'relative',
                    right: 0,
                    width: 'auto',
                },
            },
            innerContainer: {
            },
            activeContainer: {
                animationName: 'activeContainer',
                animationDuration: '1s',
                animationTimingFunction: 'linear',
                animationIterationCount: 10,
                display: 'flex',
                right: 0,
            },
            link: {
                boxSizing: 'border-box',
                color: '#fff',
                display: 'block',
                fontSize: '1.25em',
                letterSpacing: '2px',
                marginBottom: '10px',
                padding: '1em 1.25em',
                textAlign: 'center',
                textDecoration: 'none',
                ':not(:last-child)': {
                    borderBottom: '1px solid #fff',
                },
                [MediaBreakPointUp.MD]: {
                    flex: '1 0 auto',
                    fontSize: '0.92em',
                    marginBottom: 0,
                    padding: '0.8em 1.5em'
                },
            },
            '@keyframes activeContainer': this.activeContainerKeyframes,
        })
    }

}