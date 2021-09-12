import { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from '../components/ThemeProvider'

const AllTheProviders: FC = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) =>
  render(ui, {
    wrapper: AllTheProviders,
    ...options,
  })

export * from '@testing-library/react'
export { customRender as render }

export { default as userEvent } from '@testing-library/user-event'
