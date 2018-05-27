export enum breakpoints {
  sm = '@media (max-width: 576px)',
}

export const styles = {
  // constants
  bg_default: '#ffffff',
  baseColor: '#b19f00',

  // style objects
  characterStyle: {
    '-webkit-font-smoothing': 'antialiased'
  },

  // grid
  col6: {
    flex: '1 1 50%'
  },

  container: {
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: '1150px',
    width: '80%',
  },

  p: {
    fontSize: '1rem',
    fontWeight: '200',
    letterSpacing: '2px',
    lineHeight: '1.75',
    [breakpoints.sm]: {
      fontSize: '0.9rem',
    },
  },

  button: {
    backgroundImage: 'linear-gradient(90deg, #2196F3, #51b1fd)',
    borderWidth: 0,
    borderRadius: '2px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1.05rem',
    letterSpacing: '2px',
    marginTop: '10px',
    marginRight: '10px',
    marginBottom: '10px',
    marginLeft: '10px',
    outline: 'none',
    paddingTop: '12px',
    paddingRight: '40px',
    paddingBottom: '16px',
    paddingLeft: '40px',
    transition: 'all 0.2s',
    ':hover': {
        transform: 'scale(1.03)',
    },
  },

  tweetButton: {
    backgroundColor: '#2196f3',
    borderRadius: '100px',
    borderStyle: 'none',
    color: '#fff',
    cursor: 'pointer',
    display: 'inline-block',
    fontSize: '0.85rem',
    letterSpacing: '1px',
    margin: '10px',
    paddingTop: '8px',
    paddingRight: '22px',
    paddingBottom: '8px',
    paddingLeft: '22px',
    textDecoration: 'none',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#3fafff',
    },
  },

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

  buttonStyle: {
    // borderWidth: '1px',
    // borderStyle: 'solid',
    // borderColor: '#fff',
    backgroundColor: '#2889d6',
    borderRadius: '3px',
    outline: 'none',
    color: '#fff',
    cursor: 'pointer',
    padding: '13px 32px !important',
    fontSize: '14px',
    letterSpacing: '1px',
    fontWeight: 'lighter',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#fff',
      color: '#2889d6'
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
