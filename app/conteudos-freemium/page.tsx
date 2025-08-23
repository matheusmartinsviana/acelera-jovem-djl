"use client"

import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Clock, Star, Heart, Search, Filter } from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"

interface Content {
  id: string
  title: string
  description: string
  category: string
  duration: string
  level: "Iniciante" | "Intermediário" | "Avançado"
  rating: number
  type: "course" | "article" | "video"
  isPremium: boolean
  instructor: string
  thumbnail: string
}

export default function ConteudosFreemiumPage() {
  const { user } = useAuth()
  const [contents, setContents] = useState<Content[]>([])
  const [filteredContents, setFilteredContents] = useState<Content[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    // Initialize with sample content
    const sampleContents: Content[] = [
      {
        id: "1",
        title: "Introdução ao JavaScript",
        description: "Aprenda os fundamentos da linguagem JavaScript do zero",
        category: "Programação",
        duration: "8h",
        level: "Iniciante",
        rating: 4.8,
        type: "course",
        isPremium: false,
        instructor: "Prof. João Silva",
        thumbnail: "/javascript-course.png",
      },
      {
        id: "2",
        title: "React Avançado",
        description: "Domine conceitos avançados do React",
        category: "Programação",
        duration: "12h",
        level: "Avançado",
        rating: 4.9,
        type: "course",
        isPremium: true,
        instructor: "Prof. Maria Santos",
        thumbnail: "/react-advanced-course.png",
      },
      {
        id: "3",
        title: "Design UX/UI Moderno",
        description: "Princípios de design para criar interfaces incríveis",
        category: "Design",
        duration: "6h",
        level: "Intermediário",
        rating: 4.7,
        type: "course",
        isPremium: false,
        instructor: "Prof. Ana Costa",
        thumbnail: "/ux-ui-design-course.png",
      },
      {
        id: "4",
        title: "Python para Data Science",
        description: "Análise de dados com Python e suas bibliotecas",
        category: "Data Science",
        duration: "10h",
        level: "Intermediário",
        rating: 4.6,
        type: "course",
        isPremium: true,
        instructor: "Prof. Carlos Lima",
        thumbnail: "/python-data-science.png",
      },
      {
        id: "5",
        title: "Marketing Digital Básico",
        description: "Fundamentos do marketing digital",
        category: "Marketing",
        duration: "4h",
        level: "Iniciante",
        rating: 4.5,
        type: "course",
        isPremium: false,
        instructor: "Prof. Lucia Ferreira",
        thumbnail: "/digital-marketing-strategy.png",
      },
      {
        id: "6",
        title: "Como ser mais produtivo",
        description: "Dicas e técnicas para aumentar sua produtividade",
        category: "Produtividade",
        duration: "15min",
        level: "Iniciante",
        rating: 4.4,
        type: "article",
        isPremium: false,
        instructor: "Prof. Roberto Alves",
        thumbnail: "/productivity-tips-concept.png",
      },
    ]
    setContents(sampleContents)
    setFilteredContents(sampleContents)

    // Load favorites
    if (user) {
      const savedFavorites = localStorage.getItem(`eduplatform-favorites-${user.id}`)
      if (savedFavorites) {
        const favoritesData = JSON.parse(savedFavorites)
        setFavorites(favoritesData.map((fav: any) => fav.id))
      }
    }
  }, [user])

  useEffect(() => {
    // Filter contents based on search and filters
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
      // Remove from favorites
      favoritesData = favoritesData.filter((fav: any) => fav.id !== contentId)
      setFavorites(favorites.filter((id) => id !== contentId))
    } else {
      // Add to favorites
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Conteúdos Freemium</h1>
          <p className="text-muted-foreground">Explore nossos cursos e materiais gratuitos e premium</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContents.map((content) => (
            <Card key={content.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={content.thumbnail || "/placeholder.svg"}
                  alt={content.title}
                  className="w-full h-48 object-cover"
                />
                {content.isPremium && <Badge className="absolute top-2 left-2 bg-primary">Premium</Badge>}
                {user && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 h-8 w-8 p-0 bg-background/80 hover:bg-background"
                    onClick={() => toggleFavorite(content.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${favorites.includes(content.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                        }`}
                    />
                  </Button>
                )}
              </div>

              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{getTypeLabel(content.type)}</Badge>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm">{content.rating}</span>
                  </div>
                </div>
                <CardTitle className="line-clamp-2">{content.title}</CardTitle>
                <CardDescription className="line-clamp-2">{content.description}</CardDescription>
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
                  <Button size="sm" disabled={content.isPremium && user?.role !== "premium"}>
                    {content.isPremium && user?.role !== "premium" ? "Premium" : "Acessar"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredContents.length === 0 && (
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
