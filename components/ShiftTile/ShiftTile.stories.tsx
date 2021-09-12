import { ComponentStory, ComponentMeta } from '@storybook/react'
import { parse } from 'date-fns'
import { ShiftTile } from './ShiftTile'

export default {
  title: 'Components/ShiftTile',
  component: ShiftTile,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ShiftTile>

const Template: ComponentStory<typeof ShiftTile> = (args) => (
  <ShiftTile {...args} />
)

const start = parse('2021-11-17 09:00', 'yyyy-MM-dd HH:mm', new Date())
const end = parse('2021-11-17 17:00', 'yyyy-MM-dd HH:mm', new Date())

export const Basic = Template.bind({})
Basic.args = {
  role: 'Cleaner',
  start,
  end,
}

export const WithNotes = Template.bind({})
WithNotes.args = {
  role: 'Cleaner',
  start,
  end,
  notes: [
    { type: 'low' },
    { type: 'low' },
    { type: 'critical' },
    { type: 'critical' },
    { type: 'critical' },
  ],
}
