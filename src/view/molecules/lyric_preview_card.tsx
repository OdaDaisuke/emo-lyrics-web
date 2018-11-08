import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { Button, PlayButton } from '../atoms'
import { MediaBreakPointUp } from '../styles'

interface ILyricPreviewCardProps {
    lyric?: string
    isRistrict?: boolean
    onClickSignin?: () => void
    isAuthed?: boolean
    onClickToTL?: () => void
}

export class LyricPreviewCard extends React.Component<ILyricPreviewCardProps, any> {
    render() {
        return (
            <li className={this.containerStyle}>
                {this.innerContent}
            </li>
        )
    }

    get innerContent() {
        if(this.props.isRistrict) {
            if(this.props.isAuthed) {
                return (
                    <div>
                        <span className={css(this.styles.restrictLabel)}>もっと見るには</span>
                        <Button onClick={this.props.onClickToTL}>タイムラインへ</Button>
                    </div>
                )
            } else {
                return (
                    <div className={css(this.styles.restrictedContainer)}>
                        <span className={css(this.styles.restrictLabel)}>続きを見るには</span>
                        <Button
                            isSignin={true}
                            onClick={this.props.onClickSignin}
                        >Twitterログイン</Button>
                    </div>
                )
            }
        }

        return (
            <React.Fragment>
                <p className={css(this.styles.lyric)}>{this.props.lyric}</p>
                <footer className={css(this.styles.footer)}>
                    <PlayButton black link="https://youtube.com/watch?v=2Kajce92A" />
                    <div className={css(this.styles.lyricDetail)}>
                        <span className={css(this.styles.title)}>瞬き</span>
                        <span className={css(this.styles.artist)}>back number</span>
                    </div>
                </footer>
            </React.Fragment>
        )
    }

    get containerStyle() {
        return [
            css(this.styles.container),
            this.props.isRistrict && css(this.styles.restrictedContainer),
        ].join(' ')
    }

    get styles() {
        return StyleSheet.create({
            container: {
                backgroundColor: 'transparent',
                border: '1px solid #fff',
                borderRadius: 2,
                boxShadow: '3px 3px 0 #fff',
                boxSizing: 'border-box',
                flex: '1 0 275px',
                marginBottom: 8,
                marginRight: 15,
                padding: '1em 1.12em 1.3em 1em',
                textAlign: 'left',
                width: '275px',
                ':first-child': {
                    marginLeft: 30,
                },
                ':last-child': {
                    marginRight: 30,
                },
                [MediaBreakPointUp.SM]: {
                    flex: '1 0 48%',
                    margin: '0 1% 8px 0 !important',
                    width: '48%',
                },
                [MediaBreakPointUp.MD]: {
                    flex: '1 0 40%',
                    width: '40%',
                },
                [MediaBreakPointUp.LG]: {
                    flex: '1 0 30%',
                    width: '30%',
                },
            },
            restrictedContainer: {
                alignContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                padding: '0.75em 0',
                textAlign: 'center',
                width: '90%',
            },
            footer: {
                display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'flex-start',
            },
            lyric: {
                color: '#20203f',
                fontSize: 16,
                fontWeight: 300,
                letterSpacing: '1px',
                lineHeight: '2.05',
                marginTop: 0,
                marginBottom: 8,
                [MediaBreakPointUp.SM]: {
                    fontSize: 20,
                },
            },
            restrictLabel: {
                color: '#6f6f7f',
                display: 'block',
                fontSize: '0.9em',
                fontWeight: 400,
                letterSpacing: '1px',
                marginBottom: 22,
                textAlign: 'center',
                width: '100%',
            },
            lyricDetail: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            title: {
                color: '#20203f',
                flex: '1 0 100%',
                fontSize: '0.68em',
                fontWeight: 600,
                letterSpacing: '1px',
                marginBottom: 0,
            },
            artist: {
                color: '#20203f',
                fontSize: '0.68em',
                fontWeight: 200,
                letterSpacing: '1px',
            },
        })
    }
}