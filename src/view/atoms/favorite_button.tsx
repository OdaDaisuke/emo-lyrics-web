import * as React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { FaStar } from 'react-icons/fa'

interface IFavoriteButtonProps {
    onClick: any
    className?: string
    favorited: boolean
}

export const FavoriteButton = (props: IFavoriteButtonProps) => {
    const styles = StyleSheet.create({
        link: {
            color: (props.favorited) ? "#fff" : "#feace2",
            flex: '0 1 auto',
            fontSize: '1.62em',
            marginRight: 15,
            textAlign: 'center',
            textDecoration: 'none',
        },
    })

    const className = [
        css(styles.link),
        props.className || "",
    ].join(" ")

    return (
        <div
            onClick={props.onClick}
            className={className}
        >
            <FaStar />
        </div>
    )
}