import { useState } from 'react'
import { Box, Center, Flex, Text } from '@chakra-ui/react'
import { format, differenceInCalendarDays } from 'date-fns'

const longFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
const shortFormat = 'K:mmaaa'
const descriptiveFormat = 'PPPPp'

type Note = {
  type: 'low' | 'critical'
}

export type ShiftTileProps = {
  role: string
  start: Date
  end: Date
  notes?: Note[]
}

export const ShiftTile = ({ role, start, end, notes = [] }: ShiftTileProps) => {
  const differenceInShiftDays = differenceInCalendarDays(end, start)
  const descriptiveEnd =
    differenceInShiftDays > 0
      ? format(end, descriptiveFormat)
      : format(end, 'K:mm a')
  const shiftDescription = `${role} to work from ${format(
    start,
    descriptiveFormat,
  )} to ${descriptiveEnd}`

  const criticalAlerts = notes.filter((notes) => notes.type === 'critical')
  const lowAlerts = notes.filter((notes) => notes.type === 'low')
  const showAlerts = lowAlerts.length > 0 || criticalAlerts.length > 0
  let notesDescription = ''
  if (criticalAlerts.length > 0)
    notesDescription += `There are ${criticalAlerts.length} critical alert${
      criticalAlerts.length > 1 ? 's' : ''
    }`
  if (lowAlerts.length > 0)
    notesDescription += `${criticalAlerts.length > 0 ? ' and' : 'There are'} ${
      lowAlerts.length
    } low alert${lowAlerts.length > 1 ? 's' : ''}`
  if (showAlerts) notesDescription += ' for this shift'

  const [focused, setFocused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const isRevealed = focused || hovered

  return (
    <Flex
      data-testid="shift-tile"
      aria-label={`${shiftDescription}. ${notesDescription}`}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box
        sx={{
          bg: 'brand.lightGrey',
          borderColor: 'brand.mediumGrey',
          borderStyle: 'solid',
          borderRadius: 'base',
          borderWidth: '1px',
          flexGrow: 1,
          minWidth: 9,
          overflow: 'hidden',
          px: 2,
          py: 0.5,
          ...(showAlerts && {
            borderRight: 'none',
            borderRightRadius: 'none',
          }),
        }}
      >
        <Text textStyle="roboto-medium" sx={{ whiteSpace: 'nowrap' }}>
          <Box as="time" dateTime={format(start, longFormat)}>
            {format(start, shortFormat)}
          </Box>
          {' - '}
          <Box as="time" dateTime={format(end, longFormat)}>
            {format(end, shortFormat)}{' '}
            {differenceInShiftDays > 0 &&
              `(+${differenceInShiftDays} day${
                differenceInShiftDays > 1 ? 's' : ''
              })`}
          </Box>
        </Text>
        <Text textStyle="roboto-regular" sx={{ whiteSpace: 'nowrap' }}>
          {role}
        </Text>
      </Box>
      {showAlerts && (
        <Flex
          direction="column"
          sx={{
            maxWidth: 32,
            minWidth: 2,
            width: isRevealed ? '100%' : 2,
            transition: 'width .5s',
          }}
        >
          {criticalAlerts.length > 0 && (
            <Center
              sx={{
                bg: 'brand.red',
                borderRightRadius: 'base',
                flexGrow: 1,
                justifyContent: 'flex-start',
                pl: 2,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              <Text textStyle="roboto-bold" sx={{ color: 'white' }}>
                {criticalAlerts.length} CRITICAL ALERT
                {criticalAlerts.length > 1 && 'S'}
              </Text>
            </Center>
          )}
          {lowAlerts.length > 0 && (
            <Center
              sx={{
                bg: 'brand.yellow',
                borderRightRadius: 'base',
                flexGrow: 1,
                justifyContent: 'flex-start',
                pl: 2,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              <Text textStyle="roboto-bold" sx={{ color: 'brand.darkGrey' }}>
                {lowAlerts.length} LOW ALERT
                {lowAlerts.length > 1 && 'S'}
              </Text>
            </Center>
          )}
        </Flex>
      )}
    </Flex>
  )
}
