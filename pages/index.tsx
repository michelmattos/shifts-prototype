import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Box, SimpleGrid, GridItem, Heading } from '@chakra-ui/react'
import { Shift } from '../lib/models'
import { ShiftForm } from '../components/ShiftForm'
import { ShiftListPanel } from '../components/ShiftListPanel'

const Home: NextPage = () => {
  const [shifts, setShifts] = useState<Shift[]>([])

  function addShift(shift: Shift) {
    setShifts([...shifts, shift])
  }
  function removeShifts(removedShifts: Shift[]) {
    setShifts(shifts.filter((shift) => !removedShifts.includes(shift)))
  }

  return (
    <Box as="main" sx={{ p: 4 }}>
      <Head>
        <title>Shifts and Notes</title>
      </Head>

      <Heading as="h1" sx={{ mb: 10 }}>
        Shifts and Notes
      </Heading>

      <SimpleGrid spacing={4} columns={{ base: 1, md: 3, lg: 4 }}>
        <GridItem colSpan={{ md: 1 }}>
          <ShiftForm onAddShift={addShift} />
        </GridItem>

        <GridItem colSpan={{ md: 2, lg: 3 }}>
          <ShiftListPanel shifts={shifts} onRemove={removeShifts} />
        </GridItem>
      </SimpleGrid>
    </Box>
  )
}

export default Home
