import { ReactNode, useState } from 'react'
import {
  Box,
  Text,
  VStack,
  Heading,
  SimpleGrid,
  GridItem,
  List,
  ListItem,
  Button,
} from '@chakra-ui/react'
import { Shift } from '../../lib/models'
import { ShiftTile } from '../ShiftTile'

export type ShiftListPanelProps = {
  shifts: Shift[]
  onRemove: (shifts: Shift[]) => void
}

export const ShiftListPanel = ({ shifts, onRemove }: ShiftListPanelProps) => {
  const [selectedShifts, setSelectedShifts] = useState<Shift[]>([])

  function addShift(shift: Shift) {
    setSelectedShifts([...selectedShifts, shift])
  }
  function removeShift(shift: Shift) {
    setSelectedShifts(selectedShifts.filter((s) => s !== shift))
  }

  return (
    <VStack
      id="shift-list-panel"
      role="section"
      aria-live="polite"
      align="flex-start"
      spacing={4}
      sx={{ pt: 4 }}
    >
      <Box>
        <Heading as="h2">Shifts</Heading>
        {selectedShifts.length > 0 && (
          <>
            <Text as="span" textStyle="roboto-regular">
              {`${selectedShifts.length} selected shift${
                selectedShifts.length > 1 ? 's' : ''
              } `}
              (
              <Button
                variant="link"
                textStyle="roboto-regular"
                onClick={() => {
                  onRemove(selectedShifts)
                  setSelectedShifts([])
                }}
              >
                <Text
                  as="span"
                  textStyle="roboto-regular"
                  sx={{ color: 'brand.red' }}
                >
                  remove
                </Text>
              </Button>
              )
            </Text>
          </>
        )}
      </Box>

      <SimpleGrid
        as={List}
        gap={4}
        columns={{ base: 1, sm: 2, lg: 3 }}
        sx={{ width: '100%' }}
      >
        {shifts.map((shift, idx) => (
          <Checkbox
            key={idx}
            defaultValue={selectedShifts.includes(shift)}
            onChange={(checked) => {
              if (checked) addShift(shift)
              else removeShift(shift)
            }}
          >
            <ShiftTile {...shift} />
          </Checkbox>
        ))}
      </SimpleGrid>
    </VStack>
  )
}

type CheckboxProps = {
  defaultValue?: boolean
  children: ReactNode
  onChange: (checked: boolean) => void
}

const Checkbox = ({ defaultValue, children, onChange }: CheckboxProps) => {
  const [checked, setChecked] = useState(defaultValue || false)

  function onToggle() {
    setChecked(!checked)
    onChange(!checked)
  }

  return (
    <GridItem
      as={ListItem}
      colSpan={1}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.code === 'Space') onToggle()
      }}
      sx={{
        cursor: 'pointer',
        ...(checked && {
          borderRadius: 'base',
          boxShadow: 'outline',
        }),
      }}
    >
      {children}
    </GridItem>
  )
}
