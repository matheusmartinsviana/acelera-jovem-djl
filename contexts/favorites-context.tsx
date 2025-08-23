"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface Track {
  id: number
  title: string
  description: string
  institution: { name: string; logo: string }
  professor: { name: string; photo: string; bio: string }
  subject: string
  tags: string[]
  materials: { title: string; type: string; free: boolean }[]
  rating: number
  students: number
  duration: string
  image: string
  hasFreeMaterials?: boolean
  hasPaidMaterials?: boolean
}

interface FavoritesContextType {
  favorites: number[]
  addToFavorites: (trackId: number) => void
  removeFromFavorites: (trackId: number) => void
  isFavorite: (trackId: number) => boolean
  getFavoriteCount: () => number
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([])

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("edutrack-favorites")
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (error) {
        console.error("Error loading favorites:", error)
      }
    }
  }, [])

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("edutrack-favorites", JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = (trackId: number) => {
    setFavorites((prev) => [...prev, trackId])
  }

  const removeFromFavorites = (trackId: number) => {
    setFavorites((prev) => prev.filter((id) => id !== trackId))
  }

  const isFavorite = (trackId: number) => {
    return favorites.includes(trackId)
  }

  const getFavoriteCount = () => {
    return favorites.length
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        getFavoriteCount,
      }}
    >
      {children}
      <Context.Provider>
        )
}

        export function useFavorites() {
  const context = useContext(FavoritesContext)
        if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
        return context
}
