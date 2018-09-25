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
                        <Button onClick={this.props.onClickSignin}>ログイン</Button>
                    </div>
                )
            }
        }

        return (
            <React.Fragment>
                <div className={css(this.styles.innerContainer)}>
                    <p className={css(this.styles.lyric)}>歌詞データがここに入ります。歌詞データがここに入ります。</p>
                    <span className={css(this.styles.artist)}>歌手名</span>
                </div>
                <footer className={css(this.styles.footer)}>
                    <a
                        className={css(this.styles.link)}
                        href="https://youtube.com/watch?v=2Kajce92A"
                        target="_blank"
                    >
                        <FaPlay />
                    </a>
                    <div className={css(this.styles.fav)}>
                        <span>♡</span>
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
                borderRadius: '3px',
                boxShadow: '0 2px 15px -8px #3f3f3f',
                boxSizing: 'border-box',
                flex: '1 0 90%',
                margin: '0 auto 1em',
                minWidth: '200px',
                textAlign: 'left',
                width: '90%',
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
                padding: '0.75em 1em 0.75em',
                textAlign: 'center',
                width: '90%',
            },
            innerContainer: {
                padding: '0.75em 1.45em 1em',
            },
            footer: {
                borderTop: '1px solid #efefef',
                display: 'flex',
            },
            link: {
                borderRight: '1px solid #efefef',
                color: '#5f5f5f',
                flex: '0 1 50%',
                fontSize: '0.8em',
                padding: '12px 0 8px',
                textAlign: 'center',
                textDecoration: 'none',
            },
            fav: {
                color: '6f6f6f',
                flex: '0 1 50%',
                padding: '10px 0',
                textAlign: 'center',
            },
            lyric: {
                color: '#3f3456',
                fontSize: '0.9em',
                fontStyle: 'italic',
                fontWeight: 500,
                letterSpacing: '1px',
                lineHeight: '1.78',
                marginTop: 5,
                marginBottom: 5,
                [MediaBreakPointUp.SM]: {
                    fontSize: '1.25em',
                },
            },
            restrictLabel: {
                color: '#5f5f5f',
                fontSize: '0.8em',
                letterSpacing: '1px',
                textAlign: 'center',
                width: '100%',
            },
            artist: {
                color: '#a0a0a0',
                fontSize: '0.68em',
                letterSpacing: '1px',
            },
        })
    }
}