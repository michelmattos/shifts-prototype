import { ChakraProvider } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { theme } from './theme'

export type ThemeProviderProps = {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => (
  <ChakraProvider resetCSS theme={theme}>
    {children}
  </ChakraProvider>
)
