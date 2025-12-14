'use client'

import { useEffect, useState } from 'react'
import { Search, X } from 'lucide-react'
import { useAppDispatch } from '@/lib/hooks'
import { closeSearchModal, setQuery } from '@/lib/slices/searchSlice'

export default function SearchModal() {
  const [searchInput, setSearchInput] = useState('')
  const dispatch = useAppDispatch()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(closeSearchModal())
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [dispatch])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(setQuery(searchInput))
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start pt-20">
      <div className="w-full max-w-2xl mx-auto px-4 animate-in fade-in duration-200">
        <div className="bg-card rounded-lg shadow-lg">
          <form onSubmit={handleSearch} className="flex items-center gap-2 p-4 border-b border-border">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search courses, services, scholarships..."
              autoFocus
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
            <button
              type="button"
              onClick={() => dispatch(closeSearchModal())}
              className="p-1 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </form>

          <div className="p-4 max-h-96 overflow-y-auto">
            <div className="space-y-2">
              {[
                'Advanced Web Development',
                'Business Strategy Course',
                'Sustainable Development',
                'Data Science Fundamentals',
                'Digital Marketing Bootcamp',
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => dispatch(setQuery(item))}
                  className="w-full text-left px-4 py-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <span>{item}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
