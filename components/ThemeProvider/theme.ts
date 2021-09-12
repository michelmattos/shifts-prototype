import { extendTheme } from '@chakra-ui/react'

const fonts = {
  heading: 'Roboto',
  body: 'Roboto',
}

const colors = {
  brand: {
    lightGrey: '#fafbfc',
    mediumGrey: '#e0e8ee',
    darkGrey: '#2f313a',
    red: '#d0021b',
    yellow: '#f8e71c',
  },
}

const textStyles = {
  'roboto-regular': {
    fontFamily: 'Roboto',
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '167%',
    letterSpacing: '0',
  },
  'roboto-medium': {
    fontFamily: 'Roboto',
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '167%',
    letterSpacing: '0',
  },
  'roboto-bold': {
    fontFamily: 'Roboto',
    fontSize: '10px',
    fontWeight: '700',
    lineHeight: '200%',
    letterSpacing: '0',
  },
}

export const theme = extendTheme({
  // fonts,
  colors,
  textStyles,
})
