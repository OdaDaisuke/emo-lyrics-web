import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { Button, PlayButton } from '../atoms'
import { MediaBreakPointUp } from '../styles'

interface ILyricPreviewCardProps {
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
                <p className={css(this.styles.lyric)}>幸せとは星が降る夜と眩しい朝が繰り返すようなものじゃなく大切な人に降りかかった雨に傘を差せる事だ</p>
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
                backgroundColor: 'rgba(255,255,255,0.92)',
                borderRadius: 8,
                boxShadow: '0 2px 20px -8px rgba(0,0,0,0.62), 0 -1px 20px -8px rgba(0,0,0,0.62)',
                boxSizing: 'border-box',
                flex: '1 0 275px',
                marginRight: 10,
                marginBottom: 8,
                padding: '0.66em 1.12em 0.72em 1em',
                textAlign: 'left',
                width: '275px',
                ':first-child': {
                    marginLeft: 30,
                },
                ':last-child': {
                    marginRight: 30,
                },
                [MediaBreakPointUp.SM]: {
                    boxShadow: '0 2px 20px -10px rgba(0,0,0,0.62), 0 -1px 20px -10px rgba(0,0,0,0.62)',
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
                fontWeight: 400,
                letterSpacing: '1px',
                lineHeight: '2.05',
                marginTop: 0,
                marginBottom: 15,
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
                marginBottom: 5,
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