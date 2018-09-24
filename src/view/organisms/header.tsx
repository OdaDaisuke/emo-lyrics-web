import * as React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { FaBars, FaTimes } from 'react-icons/fa'
import { bind } from 'bind-decorator'
import { MediaBreakPointUp } from '../styles'
import { Logo } from '../atoms'
import { Menu } from '../molecules'
import { utils } from '../styles'

export interface HeaderProps {
    isAuthed: boolean
}

export interface HeaderState {
    isDrawerOpen: boolean
}

export class Header extends React.Component<HeaderProps, HeaderState> {
    state = {
        isDrawerOpen: false,
    }

    render(): JSX.Element {
        return (
            <header className={css(this.styles.header)}>
                <div className={css(this.styles.container)}>
                    <Logo />
                    <div className={css(this.styles.toggleIcon)} onClick={this.onClickToggleMenu}>
                        {this.iconInnerContent}
                    </div>
                    <Menu
                        isAuthed={this.props.isAuthed}
                        isDrawerOpen={this.state.isDrawerOpen}
                        toggleMenu={this.onClickToggleMenu}
                    />
                </div>
            </header>
        )
    }

    get iconInnerContent() {
        if(this.state.isDrawerOpen) {
            return <FaTimes color="#fff" />
        } else {
            return <FaBars color="#3f3f3f" />
        }
    }

    get styles() {
        return StyleSheet.create({
            header: {
                backgroundColor: '#ffffff',
                boxShadow: '0 1px 30px -17px #3f3f3f',
                color: "#fff",
                position: 'relative',
                zIndex: 100,
                [MediaBreakPointUp.SM]: {
                    paddingTop: '5px',
                    paddingBottom: '5px',    
                },
            },
            container: Object.assign({}, utils.container, {
                display: 'flex',
            }),
            toggleIcon: {
                position: 'absolute',
                right: '5%',
                top: '50%',
                transform: 'translate(0, -50%)',
                zIndex: 200,
                [MediaBreakPointUp.MD]: {
                    display: 'none',
                },
            },
        })
    }

    @bind
    onClickToggleMenu() {
        this.setState({
            isDrawerOpen: !this.state.isDrawerOpen,
        })
    }

}
