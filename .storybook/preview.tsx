import * as React from 'react'
import { StoryContext } from '@storybook/react'
import { ThemeProvider } from '../components/ThemeProvider'

const withChakra = (StoryFn: Function, context: StoryContext) => (
  <ThemeProvider>
    <style>
      @import
      url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
    </style>
    <div id="story-wrapper" style={{ minHeight: '100vh' }}>
      <StoryFn />
    </div>
  </ThemeProvider>
)

export const decorators = [withChakra]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
