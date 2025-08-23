"use client"

import { useAuth } from "@/contexts/auth-context"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, BookOpen, Clock, Star } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface FavoriteContent {
  id: string
  title: string
  description: string
  category: string
  duration: string
  level: "Iniciante" | "Intermediário" | "Avançado"
  rating: number
  type: "course" | "article" | "video"
  addedDate: string
}

export default function FavoritosPage() {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState<FavoriteContent[]>([])

  useEffect(() => {
    // Load favorites from localStorage
    const userId = user?.id || "guest"
    const savedFavorites = localStorage.getItem(`eduplatform-favorites-${userId}`)
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    } else {
      // Initialize with sample data
      const sampleFavorites: FavoriteContent[] = [
        {
          id: "1",
          title: "Introdução ao JavaScript",
          description: "Aprenda os fundamentos da linguagem JavaScript do zero",
          category: "Programação",
          duration: "8h",
          level: "Iniciante",
          rating: 4.8,
          type: "course",
          addedDate: "2024-01-15",
        },
        {
          id: "2",
          title: "Design UX/UI Moderno",
          description: "Princípios de design para criar interfaces incríveis",
          category: "Design",
          duration: "6h",
          level: "Intermediário",
          rating: 4.9,
          type: "course",
          addedDate: "2024-01-20",
        },
        {
          id: "3",
          title: "Como ser mais produtivo",
          description: "Dicas e técnicas para aumentar sua produtividade",
          category: "Produtividade",
          duration: "15min",
          level: "Iniciante",
          rating: 4.5,
          type: "article",
          addedDate: "2024-01-22",
        },
      ]
      setFavorites(sampleFavorites)
      localStorage.setItem(`eduplatform-favorites-${userId}`, JSON.stringify(sampleFavorites))
    }
  }, [user])

  const removeFavorite = (id: string) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id)
    setFavorites(updatedFavorites)
    const userId = user?.id || "guest"
    localStorage.setItem(`eduplatform-favorites-${userId}`, JSON.stringify(updatedFavorites))
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "course":
        return <BookOpen className="h-4 w-4" />
      case "video":
        return <BookOpen className="h-4 w-4" />
      case "article":
        return <BookOpen className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "course":
        return "Curso"
      case "video":
        return "Vídeo"
      case "article":
        return "Artigo"
      default:
        return "Conteúdo"
    }
  }

  return (
    <div className="min-h-screen bg-background">


      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Meus Favoritos</h1>
            <p className="text-muted-foreground">Conteúdos que você salvou para estudar depois</p>
          </div>

          {/* Favorites List */}
          {favorites.length > 0 ? (
            <div className="space-y-6">
              {favorites.map((favorite) => (
                <Card key={favorite.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getTypeIcon(favorite.type)}
                          <Badge variant="secondary">{getTypeLabel(favorite.type)}</Badge>
                          <Badge variant="outline">{favorite.category}</Badge>
                          <Badge variant="outline">{favorite.level}</Badge>
                        </div>

                        <h3 className="text-xl font-semibold text-foreground mb-2">{favorite.title}</h3>
                        <p className="text-muted-foreground mb-4">{favorite.description}</p>

                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {favorite.duration}
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                            {favorite.rating}
                          </div>
                          <div>Adicionado em {new Date(favorite.addedDate).toLocaleDateString("pt-BR")}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <Button size="sm">Acessar</Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFavorite(favorite.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Heart className="h-4 w-4 fill-current" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nenhum favorito ainda</h3>
                <p className="text-muted-foreground mb-6">
                  Comece a favoritar conteúdos para criar sua biblioteca pessoal de estudos
                </p>
                <Link href="/conteudos-freemium">
                  <Button>Explorar Conteúdos</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
