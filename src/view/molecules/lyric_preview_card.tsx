import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { FaPlay } from 'react-icons/fa'
import { Button } from '../atoms'
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
            <div className={this.containerStyle}>
                {this.innerContent}
            </div>
        )
    }

    get innerContent() {
        if(this.props.isRistrict) {
            if(this.props.isAuthed) {
                return (
                    <div className={css(this.styles.restrictedContainer)}>
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
                    <a
                        className={css(this.styles.link)}
                        href="https://youtube.com/watch?v=2Kajce92A"
                        target="_blank"
                    >
                        <FaPlay />
                    </a>
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
                backgroundColor: '#fff',
                backgroundImage: 'linear-gradient(-135deg, #F24E86 0%, #D42360 100%)',
                borderRadius: '3px',
                boxShadow: '0 2px 20px -10px rgba(0,0,0,0.50)',
                boxSizing: 'border-box',
                flex: '1 0 265px',
                marginRight: 10,
                padding: '0.75em 1.32em 1.5em',
                textAlign: 'left',
                width: '265px',
                [MediaBreakPointUp.SM]: {
                    flex: '1 0 48%',
                    margin: '0 1% 0 0',
                    width: '48%',
                },
                [MediaBreakPointUp.MD]: {
                    flex: '1 0 40%',
                    margin: '0 1% 0 0',
                    width: '40%',
                },
                [MediaBreakPointUp.LG]: {
                    flex: '1 0 30%',
                    margin: '0 1% 0 0',
                    width: '30%',
                },
            },
            restrictedContainer: {
                alignContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                padding: '0.75em 0.5em',
                textAlign: 'center',
                width: '90%',
            },
            footer: {
                display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'flex-start',
            },
            lyric: {
                color: '#fff',
                fontSize: 14,
                fontWeight: 400,
                letterSpacing: '1px',
                lineHeight: '2.05',
                marginTop: 8,
                marginBottom: 15,
                [MediaBreakPointUp.SM]: {
                    fontSize: '14px',
                },
            },
            restrictLabel: {
                color: '#fff',
                fontSize: '0.8em',
                letterSpacing: '1px',
                textAlign: 'center',
                width: '100%',
            },
            link: {
                color: '#fff',
                flex: '0 1 auto',
                fontSize: '1.62em',
                marginRight: 15,
                textAlign: 'center',
                textDecoration: 'none',
            },
            lyricDetail: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            title: {
                color: '#fff',
                flex: '1 0 100%',
                fontSize: '0.68em',
                fontWeight: 600,
                letterSpacing: '1px',
                marginBottom: 5,
            },
            artist: {
                color: '#fff',
                fontSize: '0.68em',
                fontWeight: 200,
                letterSpacing: '1px',
            },
        })
    }
}