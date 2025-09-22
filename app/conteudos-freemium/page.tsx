"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"
import { sampleContents } from "@/lib/contents"
import { Content } from "@/types/IContent"
import { BookOpen, Clock, Filter, Heart, Search, Star } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

// Skeleton de carregamento
function ContentSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="w-full h-48 bg-gray-200" />
          <CardHeader>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-16 bg-gray-200 rounded" />
              <div className="h-4 w-10 bg-gray-200 rounded" />
            </div>
            <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-1/2 bg-gray-200 rounded" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-3">
              <div className="h-4 w-16 bg-gray-200 rounded" />
              <div className="h-4 w-16 bg-gray-200 rounded" />
            </div>
            <div className="flex justify-between items-center">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-8 w-20 bg-gray-300 rounded" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function ConteudosFreemiumPage() {
  const { user } = useAuth()
  const [contents, setContents] = useState<Content[]>([])
  const [filteredContents, setFilteredContents] = useState<Content[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [favorites, setFavorites] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulando carregamento
    setTimeout(() => {
      setContents(sampleContents)
      setFilteredContents(sampleContents)
      setLoading(false)

      // Carrega favoritos
      if (user) {
        const savedFavorites = localStorage.getItem(`eduplatform-favorites-${user.id}`)
        if (savedFavorites) {
          const favoritesData = JSON.parse(savedFavorites)
          setFavorites(favoritesData.map((fav: any) => fav.id))
        }
      }
    }, 1200)
  }, [user])

  useEffect(() => {
    if (!contents.length) return
    let filtered = contents

    if (searchTerm) {
      filtered = filtered.filter(
        (content) =>
          content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          content.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          content.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((content) => content.category === selectedCategory)
    }

    if (selectedLevel !== "all") {
      filtered = filtered.filter((content) => content.level === selectedLevel)
    }

    setFilteredContents(filtered)
  }, [searchTerm, selectedCategory, selectedLevel, contents])

  const toggleFavorite = (contentId: string) => {
    if (!user) return

    const content = contents.find((c) => c.id === contentId)
    if (!content) return

    const savedFavorites = localStorage.getItem(`eduplatform-favorites-${user.id}`)
    let favoritesData = savedFavorites ? JSON.parse(savedFavorites) : []

    const isAlreadyFavorite = favoritesData.some((fav: any) => fav.id === contentId)

    if (isAlreadyFavorite) {
      favoritesData = favoritesData.filter((fav: any) => fav.id !== contentId)
      setFavorites(favorites.filter((id) => id !== contentId))
    } else {
      const favoriteContent = {
        id: content.id,
        title: content.title,
        description: content.description,
        category: content.category,
        duration: content.duration,
        level: content.level,
        rating: content.rating,
        type: content.type,
        addedDate: new Date().toISOString(),
      }
      favoritesData.push(favoriteContent)
      setFavorites([...favorites, contentId])
    }

    localStorage.setItem(`eduplatform-favorites-${user.id}`, JSON.stringify(favoritesData))
  }

  const categories = ["all", ...Array.from(new Set(contents.map((content) => content.category)))]
  const levels = ["all", "Iniciante", "Intermediário", "Avançado"]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Explore novos conteúdos</h1>
          <p className="text-muted-foreground">
            Explore nossas trilhas de aprendizado e materiais gratuitos
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar conteúdos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {categories.slice(1).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os níveis</SelectItem>
                  {levels.slice(1).map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        {loading ? (
          <ContentSkeletonGrid />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContents.map((content) => (
              <Card key={content.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={content.thumbnail || "/placeholder.svg"}
                    alt={content.title}
                    className="w-full h-48 object-cover"
                  />
                  {content.isPremium && (
                    <Badge className="absolute top-2 left-2 bg-primary">Exclusivo</Badge>
                  )}
                  {user && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 h-8 w-8 p-0 bg-background/80 hover:bg-background"
                      onClick={() => toggleFavorite(content.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${favorites.includes(content.id)
                          ? "fill-red-500 text-red-500"
                          : "text-muted-foreground"
                          }`}
                      />
                    </Button>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">Trilha</Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm">{content.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2">{content.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {content.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {content.duration}
                    </div>
                    <Badge variant="outline">{content.level}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{content.instructor}</p>
                      <Badge variant="outline" className="mt-1">
                        {content.category}
                      </Badge>
                    </div>
                    <Button size="sm" disabled={content.isPremium}>
                      {!content.isPremium ? (
                        <Link href={`/trilhas/${content.id}`}>Acessar</Link>
                      ) : (
                        <>Acessar</>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredContents.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nenhum conteúdo encontrado</h3>
            <p className="text-muted-foreground">Tente ajustar os filtros ou termos de busca</p>
          </div>
        )}
      </div>
    </div>
  )
}
