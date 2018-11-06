import { MediaBreakPointUp } from './breakpoints'

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
