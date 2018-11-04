import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { Button } from '../atoms'
import { MediaBreakPointUp } from '../styles'

interface IPagingBtnGroupProps {
    isAtFirst: boolean
    isAtLast: boolean
    onClickPrev: () => void
    onClickNext: () => void
}

export const PagingBtnGroup = (props: IPagingBtnGroupProps) => {
    return (
        <div className={css(styles.container)}>
            <PrevButton isAtFirst={props.isAtFirst} onClickPrev={props.onClickPrev} />
            <NextButton isAtLast={props.isAtLast} onClickNext={props.onClickNext} />
        </div>
    )
}

/*----------------
Child components
------------------*/

interface IPrevButtonProps {
    isAtFirst: boolean
    onClickPrev: () => void
}
const PrevButton = (props: IPrevButtonProps) => {
    if(props.isAtFirst) {
        return null
    }
    return (
        <Button
            className={css(styles.prevButton)}
            onClick={props.onClickPrev}
        >{"戻る"}</Button>
    )
}

interface INextButtonProps {
    isAtLast: boolean
    onClickNext: () => void
}
const NextButton = (props: INextButtonProps) => {
    if(props.isAtLast) {
        return null
    }
    return (
        <Button
            enableNextArrow
            className={css(styles.nextButton)}
            onClick={props.onClickNext}
        >次の歌詞へ</Button>
    )
}

const styles = StyleSheet.create({
    container: {
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        paddingRight: '2.5%',
        paddingLeft: '2.5%',
        width: '100%',
        [MediaBreakPointUp.SM]: {},
    },
    prevButton: {
        backgroundImage: 'linear-gradient(-135deg, #B27D8F 0%, #7D5261 100%)',
        boxShadow: '0 2px 10px -4px rgba(0,0,0,0.50)',
        flex: '0 1 33.3%',
        marginRight: 10,
    },
    nextButton: {
        flex: '0 1 66.666%',
    },
})
