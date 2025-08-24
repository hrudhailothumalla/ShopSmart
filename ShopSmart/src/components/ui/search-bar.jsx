import React, { useState, useEffect, useRef } from 'react'
import { Input } from './input'
import { Button } from './button'
import { Search, X } from 'lucide-react'

export const SearchBar = ({ 
  placeholder = "Search...", 
  onSearch, 
  suggestions = [], 
  className = "",
  value = "",
  onChange,
  onSuggestionSelect,
  showSuggestions = true
}) => {
  const [query, setQuery] = useState(value)
  const [showSuggestionsList, setShowSuggestionsList] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef(null)
  const suggestionsRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    setQuery(value)
  }, [value])

  const handleInputChange = (e) => {
    const newValue = e.target.value
    setQuery(newValue)
    setSelectedIndex(-1)
    
    // Maintain focus after input change
    if (inputRef.current && document.activeElement !== inputRef.current) {
      inputRef.current.focus()
    }
    
    if (onChange) {
      onChange(newValue)
    }
    
    if (newValue.trim() && suggestions.length > 0 && showSuggestions) {
      setShowSuggestionsList(true)
    } else {
      setShowSuggestionsList(false)
    }
  }

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query)
    }
    setShowSuggestionsList(false)
  }

  const handleFocus = () => {
    setIsFocused(true)
    if (query.trim() && filteredSuggestions.length > 0 && showSuggestions) {
      setShowSuggestionsList(true)
    }
  }

  const handleBlur = (e) => {
    // Only blur if not clicking within the container
    if (containerRef.current && !containerRef.current.contains(e.relatedTarget)) {
      setIsFocused(false)
      // Delay hiding suggestions to allow for clicks
      setTimeout(() => setShowSuggestionsList(false), 200)
    }
  }

  const handleKeyDown = (e) => {
    if (!showSuggestionsList) {
      if (e.key === 'Enter') {
        e.preventDefault()
        handleSearch()
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleSuggestionClick(filteredSuggestions[selectedIndex])
        } else {
          handleSearch()
        }
        break
      case 'Escape':
        setShowSuggestionsList(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion)
    setShowSuggestionsList(false)
    setSelectedIndex(-1)
    
    if (onSuggestionSelect) {
      onSuggestionSelect(suggestion)
    }
    if (onChange) {
      onChange(suggestion)
    }
    
    // Keep focus on input after selection
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 10)
  }

  const clearSearch = () => {
    setQuery('')
    setShowSuggestionsList(false)
    setSelectedIndex(-1)
    if (onChange) {
      onChange('')
    }
    inputRef.current?.focus()
  }

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5)

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <Input 
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`pr-20 ${isFocused ? 'ring-2 ring-green-500 border-green-500' : ''}`}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
          {query && (
            <Button 
              size="icon" 
              variant="ghost"
              className="h-6 w-6"
              onClick={clearSearch}
              type="button"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
          <Button 
            size="icon" 
            variant="ghost"
            className="h-6 w-6"
            onClick={handleSearch}
            type="button"
          >
            <Search className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      {showSuggestionsList && filteredSuggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto suggestions-container"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                index === selectedIndex ? 'bg-gray-100' : ''
              }`}
              onMouseDown={(e) => {
                e.preventDefault() // Prevent input blur
                handleSuggestionClick(suggestion)
              }}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <span className="text-sm">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar

