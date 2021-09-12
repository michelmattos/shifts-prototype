import { FormEvent, useState } from 'react'
import { format, parse } from 'date-fns'
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
} from '@chakra-ui/react'
import { Note, Shift } from '../../lib/models'

const dateTimeFormat = "yyyy-MM-dd'T'HH:mm"

export type ShiftFormProps = {
  onAddShift: (shift: Shift) => void
}

export const ShiftForm = ({ onAddShift }: ShiftFormProps) => {
  const [role, setRole] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [lowAlerts, setLowAlerts] = useState(0)
  const [criticalAlerts, setCriticalAlerts] = useState(0)

  function onSubmit(e: FormEvent<HTMLDivElement>) {
    e.preventDefault()

    const now = new Date()
    onAddShift({
      role,
      start: parse(start, dateTimeFormat, now),
      end: parse(end, dateTimeFormat, now),
      notes: [
        ...Array.from(new Array(lowAlerts)).map((_) => {
          return { type: 'low' } as Note
        }),
        ...Array.from(new Array(criticalAlerts)).map((_) => {
          return { type: 'critical' } as Note
        }),
      ],
    })

    setRole('')
    setStart('')
    setEnd('')
    setLowAlerts(0)
    setCriticalAlerts(0)
  }

  return (
    <VStack
      as="form"
      role="section"
      aria-controls="shift-list-panel"
      spacing={4}
      align="flex-start"
      onSubmit={onSubmit}
      sx={{
        borderColor: 'brand.mediumGrey',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRadius: 'base',
        bg: 'brand.lightGrey',
        p: 4,
      }}
    >
      <Heading as="h2">Add Shift</Heading>

      <FormControl id="role" isRequired>
        <FormLabel>Role</FormLabel>
        <Input
          type="text"
          placeholder="Chef"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          sx={{ bg: 'white' }}
        />
      </FormControl>

      <FormControl id="start" isRequired>
        <FormLabel>Start Date/Time</FormLabel>
        <Input
          type="datetime-local"
          min={format(new Date(), dateTimeFormat)}
          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          sx={{ bg: 'white' }}
        />
      </FormControl>

      <FormControl id="end" isRequired>
        <FormLabel>End Date/Time</FormLabel>
        <Input
          type="datetime-local"
          min={start}
          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          sx={{ bg: 'white' }}
        />
      </FormControl>

      <FormControl id="lowAlerts">
        <FormLabel>Number of Low Alerts</FormLabel>
        <NumberInput
          min={0}
          value={lowAlerts}
          onChange={(_, val) => setLowAlerts(val)}
          sx={{ bg: 'white' }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <FormControl id="criticalAlerts">
        <FormLabel>Number of Critical Alerts</FormLabel>
        <NumberInput
          min={0}
          value={criticalAlerts}
          onChange={(_, val) => setCriticalAlerts(val)}
          sx={{ bg: 'white' }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <Button type="submit">Add</Button>
    </VStack>
  )
}
