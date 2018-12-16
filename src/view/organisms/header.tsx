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
    isTransparent?: boolean
    className?: string
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
            <header className={this.containerClass}>
                <div className={css(this.styles.container)}>
                    <Logo
                        isWhite={this.props.isTransparent}
                    />
                    <div className={css(this.styles.toggleIcon)} onClick={this.onClickToggleMenu}>
                        {this.iconInnerContent}
                    </div>
                    <Menu
                        isWhite={this.props.isTransparent}
                        isAuthed={this.props.isAuthed}
                        isDrawerOpen={this.state.isDrawerOpen}
                        toggleMenu={this.onClickToggleMenu}
                    />
                </div>
            </header>
        )
    }

    get containerClass() {
        
        return [
            css(this.styles.header),
            this.props.isTransparent && css(this.styles.transparent),
        ].join(" ")
    }

    get iconInnerContent() {
        if(!this.props.isAuthed) {
            return
        }
        if(this.state.isDrawerOpen) {
            return <FaTimes size={20} color="#fff" />
        } else {
            const clr = this.props.isTransparent ? "#fff" : "#3f3f3f"
            return <FaBars size={20} color={clr} />
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
            transparent: {
                backgroundColor: 'transparent',
                paddingTop: 10,
            },
            container: Object.assign({}, utils.container, {
                display: 'flex',
            }),
            toggleIcon: {
                position: 'absolute',
                right: '8%',
                top: '50%',
                transform: 'translate(0, -50%)',
                zIndex: 100000,
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
