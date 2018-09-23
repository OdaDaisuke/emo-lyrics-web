import { MediaBreakPointUp } from '../view/styles'

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
      opacity: 0.8,
    },
    [MediaBreakPointUp.SM]: {
      fontSize: '0.9rem',
    },
}

export const styles = {
  bg_default: '#ffffff',
  baseColor: '#00ae78',

  container: {
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: '1150px',
    width: '85%',
  },

  p: {
    fontSize: '1rem',
    letterSpacing: '2px',
    lineHeight: '1.85',
    [MediaBreakPointUp.SM]: {
      fontSize: '0.9rem',
    },
  },

  button: Object.assign({}, buttonBaseStyle, {
    boxShadow: '0 1px 15px -5px #027350',
    borderRadius: '30px',
    color: '#00ae78',
    fontSize: '1.08em',
    fontWeight: 'bold',
    letterSpacing: '2px',
    margin: '10px',
    padding: '10px 40px 12px',
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
