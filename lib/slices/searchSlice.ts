'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SearchState {
  query: string
  isOpen: boolean
  results: string[]
}

const initialState: SearchState = {
  query: '',
  isOpen: false,
  results: [],
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    toggleSearchModal: (state) => {
      state.isOpen = !state.isOpen
    },
    closeSearchModal: (state) => {
      state.isOpen = false
    },
    setResults: (state, action: PayloadAction<string[]>) => {
      state.results = action.payload
    },
  },
})

export const { setQuery, toggleSearchModal, closeSearchModal, setResults } = searchSlice.actions
export default searchSlice.reducer
