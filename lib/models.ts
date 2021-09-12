export type Note = {
  type: 'low' | 'critical'
}

export type Shift = {
  role: string
  start: Date
  end: Date
  notes?: Note[]
}
