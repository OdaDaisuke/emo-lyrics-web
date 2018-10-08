import * as React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { FaStar } from 'react-icons/fa'

interface IFavoriteButtonProps {
    onClick: () => void
    className?: string
    favorited: boolean
}

export const FavoriteButton = (props: IFavoriteButtonProps) => {
    const styles = StyleSheet.create({
        icon: {
            color: "#eeace2",
            flex: '0 1 auto',
            fontSize: '1.62em',
            marginRight: 15,
            textAlign: 'center',
            textDecoration: 'none',
        },
        favoitedIcon: {
            color: '#fff',
        },
    })

    const className = [
        css(styles.icon),
        props.favorited && css(styles.favoitedIcon),
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