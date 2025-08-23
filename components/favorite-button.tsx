"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useFavorites } from "@/contexts/favorites-context"
import { cn } from "@/lib/utils"

interface FavoriteButtonProps {
  trackId: number
  size?: "sm" | "default" | "lg"
  variant?: "ghost" | "outline" | "default"
  className?: string
}

export function FavoriteButton({ trackId, size = "sm", variant = "ghost", className }: FavoriteButtonProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites()
  const favorite = isFavorite(trackId)

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (favorite) {
      removeFromFavorites(trackId)
    } else {
      addToFavorites(trackId)
    }
  }

  return (
    <Button
      size={size}
      variant={variant}
      onClick={handleToggle}
      className={cn("transition-colors duration-200", favorite && "text-red-500 hover:text-red-600", className)}
      title={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      <Heart className={cn("h-4 w-4", favorite && "fill-current")} />
    </Button>
  )
}
