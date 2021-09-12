import { render, screen } from '../../lib/test-utils'
import { ShiftTile, ShiftTileProps } from './ShiftTile'

describe('Shift Description', () => {
  test('shows role', () => {
    const start = new Date(2021, 10, 17, 9)
    const end = new Date(2021, 10, 17, 17)

    render(<ShiftTile role="Chef" start={start} end={end} />)

    const shiftTile = screen.getByTestId('shift-tile')
    expect(shiftTile).toHaveTextContent(/Chef/)
  })

  test('shows description for same day shift', () => {
    const start = new Date(2021, 10, 17, 9)
    const end = new Date(2021, 10, 17, 17)

    render(<ShiftTile role="Chef" start={start} end={end} />)

    const shiftTile = screen.getByTestId('shift-tile')
    expect(shiftTile).toHaveTextContent(/9:00am - 5:00pm/)
    expect(shiftTile).toHaveAccessibleName(
      /chef to work from wednesday, november 17th, 2021 at 9:00 am to 5:00 pm/i,
    )
  })

  test('shows description for multi days shift', () => {
    const start = new Date(2021, 10, 17, 9)
    const end = new Date(2021, 10, 18, 9)

    render(<ShiftTile role="Chef" start={start} end={end} />)

    const shiftTile = screen.getByTestId('shift-tile')
    expect(shiftTile).toHaveTextContent(/9:00am - 9:00am \(\+1 day\)/)
    expect(shiftTile).toHaveAccessibleName(
      /chef to work from wednesday, november 17th, 2021 at 9:00 am to thursday, november 18th, 2021 at 9:00 am/i,
    )
  })
})

describe('Shift Notes', () => {
  test('shows critical alerts', () => {
    const start = new Date(2021, 10, 17, 9)
    const end = new Date(2021, 10, 17, 17)
    const notes: ShiftTileProps['notes'] = [
      { type: 'critical' },
      { type: 'critical' },
      { type: 'critical' },
    ]

    render(<ShiftTile role="Chef" start={start} end={end} notes={notes} />)

    const shiftTile = screen.getByTestId('shift-tile')
    expect(shiftTile).toHaveTextContent(/3 critical alerts/i)
    expect(shiftTile).toHaveAccessibleName(
      /there are 3 critical alerts for this shift/i,
    )
  })

  test('shows low alerts', () => {
    const start = new Date(2021, 10, 17, 9)
    const end = new Date(2021, 10, 17, 17)
    const notes: ShiftTileProps['notes'] = [{ type: 'low' }, { type: 'low' }]

    render(<ShiftTile role="Chef" start={start} end={end} notes={notes} />)

    const shiftTile = screen.getByTestId('shift-tile')
    expect(shiftTile).toHaveTextContent(/2 low alerts/i)
    expect(shiftTile).toHaveAccessibleName(
      /there are 2 low alerts for this shift/i,
    )
  })

  test('shows both critical and low alerts', () => {
    const start = new Date(2021, 10, 17, 9)
    const end = new Date(2021, 10, 17, 17)
    const notes: ShiftTileProps['notes'] = [
      { type: 'low' },
      { type: 'low' },
      { type: 'critical' },
      { type: 'critical' },
      { type: 'critical' },
    ]

    render(<ShiftTile role="Chef" start={start} end={end} notes={notes} />)

    const shiftTile = screen.getByTestId('shift-tile')
    expect(shiftTile).toHaveTextContent(/3 critical alerts/i)
    expect(shiftTile).toHaveTextContent(/2 low alerts/i)
    expect(shiftTile).toHaveAccessibleName(
      /there are 3 critical alerts and 2 low alerts for this shift/i,
    )
  })
})
