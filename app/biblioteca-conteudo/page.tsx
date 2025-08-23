"use client"

import { useAuth } from "@/contexts/auth-context"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Plus, Search, Filter, Edit, Trash2, Eye, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface ContentItem {
  id: string
  title: string
  description: string
  category: string
  type: "course" | "article" | "video"
  status: "draft" | "published" | "archived"
  createdAt: string
  updatedAt: string
  author: string
  views: number
  likes: number
  isPremium: boolean
}

export default function BibliotecaConteudoPage() {
  const { user } = useAuth()
  const [contents, setContents] = useState<ContentItem[]>([])
  const [filteredContents, setFilteredContents] = useState<ContentItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  useEffect(() => {
    // Load content from localStorage
    const savedContent = localStorage.getItem("eduplatform-content-library")
    if (savedContent) {
      const contentData = JSON.parse(savedContent)
      setContents(contentData)
      setFilteredContents(contentData)
    } else {
      // Initialize with sample data
      const sampleContent: ContentItem[] = [
        {
          id: "1",
          title: "Introdução ao JavaScript",
          description: "Curso completo sobre os fundamentos do JavaScript",
          category: "Programação",
          type: "course",
          status: "published",
          createdAt: "2024-01-15",
          updatedAt: "2024-01-20",
          author: "Prof. João Silva",
          views: 1250,
          likes: 89,
          isPremium: false,
        },
        {
          id: "2",
          title: "React Hooks Avançados",
          description: "Explorando hooks customizados e padrões avançados",
          category: "Programação",
          type: "course",
          status: "draft",
          createdAt: "2024-01-22",
          updatedAt: "2024-01-25",
          author: "Prof. Maria Santos",
          views: 0,
          likes: 0,
          isPremium: true,
        },
        {
          id: "3",
          title: "Princípios de UX Design",
          description: "Artigo sobre os fundamentos do design de experiência",
          category: "Design",
          type: "article",
          status: "published",
          createdAt: "2024-01-18",
          updatedAt: "2024-01-19",
          author: "Prof. Ana Costa",
          views: 856,
          likes: 67,
          isPremium: false,
        },
      ]
      setContents(sampleContent)
      setFilteredContents(sampleContent)
      localStorage.setItem("eduplatform-content-library", JSON.stringify(sampleContent))
    }
  }, [])

  useEffect(() => {
    // Filter contents
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

    if (selectedStatus !== "all") {
      filtered = filtered.filter((content) => content.status === selectedStatus)
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((content) => content.type === selectedType)
    }

    setFilteredContents(filtered)
  }, [searchTerm, selectedCategory, selectedStatus, selectedType, contents])

  const deleteContent = (id: string) => {
    const updatedContents = contents.filter((content) => content.id !== id)
    setContents(updatedContents)
    localStorage.setItem("eduplatform-content-library", JSON.stringify(updatedContents))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "published":
        return "Publicado"
      case "draft":
        return "Rascunho"
      case "archived":
        return "Arquivado"
      default:
        return status
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "course":
        return "Curso"
      case "article":
        return "Artigo"
      case "video":
        return "Vídeo"
      default:
        return type
    }
  }

  if (!user || (user.role !== "teacher" && user.role !== "admin")) {
    return (
      <div className="min-h-screen bg-background">

        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Acesso Restrito</h2>
            <p className="text-muted-foreground mb-4">
              Apenas professores e administradores podem acessar a biblioteca de conteúdo
            </p>
            <Link href="/login">
              <Button>Fazer Login</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const categories = ["all", ...Array.from(new Set(contents.map((content) => content.category)))]

  return (
    <div className="min-h-screen bg-background">


      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Biblioteca de Conteúdo</h1>
            <p className="text-muted-foreground">Gerencie seus materiais educacionais</p>
          </div>
          <Link href="/publicar-conteudo">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Conteúdo
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="library" className="space-y-6">
          <TabsList>
            <TabsTrigger value="library">Biblioteca</TabsTrigger>
            <TabsTrigger value="analytics">Análises</TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="space-y-6">
            {/* Search and Filters */}
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
                  <SelectTrigger className="w-[150px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {categories.slice(1).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="published">Publicado</SelectItem>
                    <SelectItem value="draft">Rascunho</SelectItem>
                    <SelectItem value="archived">Arquivado</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="course">Curso</SelectItem>
                    <SelectItem value="article">Artigo</SelectItem>
                    <SelectItem value="video">Vídeo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Content List */}
            <div className="space-y-4">
              {filteredContents.map((content) => (
                <Card key={content.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="secondary">{getTypeLabel(content.type)}</Badge>
                          <Badge className={getStatusColor(content.status)}>{getStatusLabel(content.status)}</Badge>
                          <Badge variant="outline">{content.category}</Badge>
                          {content.isPremium && <Badge className="bg-primary">Premium</Badge>}
                        </div>

                        <h3 className="text-xl font-semibold text-foreground mb-2">{content.title}</h3>
                        <p className="text-muted-foreground mb-4">{content.description}</p>

                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {content.views} visualizações
                          </div>
                          <div>{content.likes} curtidas</div>
                          <div>Por {content.author}</div>
                          <div>Atualizado em {new Date(content.updatedAt).toLocaleDateString("pt-BR")}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Visualizar
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteContent(content.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredContents.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Nenhum conteúdo encontrado</h3>
                    <p className="text-muted-foreground mb-6">
                      {contents.length === 0
                        ? "Comece criando seu primeiro conteúdo"
                        : "Tente ajustar os filtros ou termos de busca"}
                    </p>
                    <Link href="/publicar-conteudo">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Criar Conteúdo
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Conteúdos</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{contents.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Visualizações Totais</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{contents.reduce((sum, content) => sum + content.views, 0)}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Curtidas Totais</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{contents.reduce((sum, content) => sum + content.likes, 0)}</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Conteúdos Mais Populares</CardTitle>
                <CardDescription>Baseado no número de visualizações</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contents
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 5)
                    .map((content, index) => (
                      <div key={content.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-sm font-medium text-muted-foreground">#{index + 1}</div>
                          <div>
                            <h4 className="font-medium">{content.title}</h4>
                            <p className="text-sm text-muted-foreground">{content.category}</p>
                          </div>
                        </div>
                        <div className="text-sm font-medium">{content.views} visualizações</div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
