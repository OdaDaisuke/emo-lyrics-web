export enum breakpoints {
  sm = '@media (max-width: 576px)',
}

const buttonBaseStyle = {
    backgroundColor: '#fff',
    borderWidth: 0,
    color: '#2196f3',
    cursor: 'pointer',
    letterSpacing: '2px',
    margin: '10px',
    outline: 'none',
    paddingTop: '6px',
    paddingRight: '22px',
    paddingBottom: '6px',
    paddingLeft: '22px',
    textDecoration: 'none',
    transition: 'all 0.2s',
    willChange: 'transform',
    ':hover': {
        transform: 'scale(1.03)',
    },
    [breakpoints.sm]: {
      fontSize: '0.9rem',
    },
}

export const styles = {
  bg_default: '#ffffff',
  baseColor: '#b19f00',

  container: {
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: '1150px',
    width: '80%',
  },

  p: {
    fontSize: '1rem',
    letterSpacing: '2px',
    lineHeight: '1.85',
    [breakpoints.sm]: {
      fontSize: '0.9rem',
    },
  },

    button: Object.assign({}, buttonBaseStyle, {
        backgroundImage: 'linear-gradient(90deg, #2196F3, #51b1fd)',
        borderRadius: '5px',
        color: '#fff',
	fontSize: '1.05rem',
	fontWeight: 'lighter',
        margin: '10px',
        paddingTop: '12px',
        paddingRight: '40px',
        paddingBottom: '16px',
        paddingLeft: '40px',
    }),

    tweetButton: Object.assign({}, buttonBaseStyle, {
        backgroundColor: '#fff',
        borderColor: '#2196f3',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRadius: '100px',
        color: '#2196f3',
	fontSize: '0.87rem',
	fontWeight: 'lighter',
        letterSpacing: '1px',
        paddingTop: '6px',
        paddingRight: '22px',
        paddingBottom: '6px',
        paddingLeft: '22px',
        ':hover': {
          backgroundColor: '#2196f3',
          color: '#ffffff',
	},
    }),

    tweetFilledButton: Object.assign({}, buttonBaseStyle, {
        backgroundColor: '#2196f3',
        borderRadius: '100px',
	color: '#fff',
	fontSize: '0.87rem',
	fontWeight: 'lighter',
    }),

  pageCaptionStyle: {
    fontSize: '28px',
    fontWeight: 'lighter',
    marginTop: '20px',
    marginBottom: '40px',
    paddingBottom: '20px',
    paddingLeft: '20px',
  },

  linkStyle: {
    color: '#3f3f3f',
    letterSpacing: '2px',
    fontSize: '14px',
    ':hover': {
      textDecoration: 'none',
      color: '#000'
    }
  },

    containerStyle: {
        marginRight: 'auto',
        marginLeft: 'auto',
        maxWidth: '1200px',
        width: '90%'
    },

    /*------ spacing ------ */
    containerPaddingY: {
        paddingTop: '100px',
	paddingBottom: '100px',
	[breakpoints.sm]: {
	  paddingTop: '50px',
	  paddingBottom: '50px',
	},
    },
    containerPaddingYs: {
        paddingTop: '50px',
	paddingBottom: '50px',
	[breakpoints.sm]: {
	  paddingTop: '25px',
	  paddingBottom: '25px',
	},
    },
}
