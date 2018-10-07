import { MediaBreakPointUp } from './breakpoints'

const buttonBaseStyle = {
    backgroundImage: 'linear-gradient(135deg, #ef5489, #f7417f, #c11c54) !important',
    borderWidth: 0,
    color: '#2196f3',
    cursor: 'pointer',
    letterSpacing: 2,
    margin: 10,
    outline: 'none',
    paddingTop: 8,
    paddingRight: 24,
    paddingBottom: 8,
    paddingLeft: 24,
    textDecoration: 'none',
    transition: 'all 0.2s',
    willChange: 'transform',
    ':hover': {
      opacity: 0.8,
    },
    [MediaBreakPointUp.SM]: {
      fontSize: '0.9rem',
    },
}

export const utils = {
  container: {
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: '1060px',
    width: '85%',
    [MediaBreakPointUp.SM]: {
      width: '80%',
    },
  },

  p: {
    fontSize: 12,
    letterSpacing: '2px',
    lineHeight: 2,
    [MediaBreakPointUp.SM]: {
      fontSize: '0.9rem',
    },
  },

  button: Object.assign({}, buttonBaseStyle, {
    boxShadow: '0 2px 15px -3px #3f3f3f',
    color: '#fff',
    fontSize: '0.95em',
    borderRadius: 2,
    fontWeight: 500,
    letterSpacing: 1.5,
    margin: '10px',
    padding: '15px 32px 17px',
    [MediaBreakPointUp.SM]: {
      fontSize: '1.08em',
      padding: '16px 48px 18px',
    },
  }),

  tweetButton: {
    backgroundColor: '#2196f3',
    backgroundImage: '#2196f3',
    borderRadius: 4,
    color: '#fff',
    fontSize: '0.87rem',
    letterSpacing: 1,
    margin: 2,
    padding: '14px 45px 12px',
    ':hover': {
      backgroundColor: '#2196f3',
      color: '#ffffff',
    },
  },

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
    [MediaBreakPointUp.SM]: {
      paddingTop: '50px',
      paddingBottom: '50px',
    },
  },

  containerPaddingYs: {
    paddingTop: '50px',
    paddingBottom: '50px',
    [MediaBreakPointUp.SM]: {
      paddingTop: '25px',
      paddingBottom: '25px',
    },
  },
}
