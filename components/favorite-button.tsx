"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface FavoriteButtonProps {
  trackId: number
  size?: "sm" | "default" | "lg"
  variant?: "ghost" | "outline" | "default"
  className?: string
}

// Mock implementations for demo purposes
function isFavorite(trackId: number) {
  return false
}
function addToFavorites(trackId: number) {}
function removeFromFavorites(trackId: number) {}

export function FavoriteButton({ trackId, size = "sm", variant = "ghost", className }: FavoriteButtonProps) {
  const favorite = isFavorite(trackId)

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // No-op for demo
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
