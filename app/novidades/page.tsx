"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Eye, Heart, Search, Tag, TrendingUp, Users } from "lucide-react"

const newsData = [
  {
    id: 1,
    title: "Nova Trilha de Desenvolvimento Web Completo",
    description: "Aprenda HTML, CSS, JavaScript, React e Node.js em uma trilha completa e prática.",
    category: "Programação",
    type: "Trilha",
    date: "2024-01-15",
    readTime: "5 min",
    views: 1250,
    likes: 89,
    image: "/javascript-course.png",
    featured: true,
  },
  {
    id: 2,
    title: "Webinar: Inteligência Artificial na Educação",
    description: "Descubra como a IA está transformando o ensino e aprendizagem no século XXI.",
    category: "Tecnologia",
    type: "Evento",
    date: "2024-01-12",
    readTime: "3 min",
    views: 890,
    likes: 67,
    image: "/react-advanced-course.png",
    featured: false,
  },
  {
    id: 3,
    title: "Novo Curso: Design UX/UI para Iniciantes",
    description: "Aprenda os fundamentos do design de experiência do usuário e interface.",
    category: "Design",
    type: "Curso",
    date: "2024-01-10",
    readTime: "4 min",
    views: 2100,
    likes: 156,
    image: "/ux-ui-design-course.png",
    featured: true,
  },
  {
    id: 4,
    title: "Parceria com Universidade Federal",
    description: "Nova parceria oferece certificações reconhecidas pelo MEC.",
    category: "Parceria",
    type: "Notícia",
    date: "2024-01-08",
    readTime: "2 min",
    views: 1580,
    likes: 203,
    image: "/python-data-science.png",
    featured: false,
  },
  {
    id: 5,
    title: "Atualização da Plataforma: Novo Fórum",
    description: "Sistema de fórum renovado com melhor organização e recursos avançados.",
    category: "Plataforma",
    type: "Atualização",
    date: "2024-01-05",
    readTime: "3 min",
    views: 950,
    likes: 78,
    image: "/digital-marketing-strategy.png",
    featured: false,
  },
  {
    id: 6,
    title: "Bootcamp Gratuito: Python para Data Science",
    description: "Evento especial de 3 dias com certificado de participação.",
    category: "Programação",
    type: "Evento",
    date: "2024-01-03",
    readTime: "4 min",
    views: 3200,
    likes: 287,
    image: "/productivity-tips-concept.png",
    featured: true,
  },
]

const categories = ["Todas", "Programação", "Design", "Tecnologia", "Parceria", "Plataforma"]
const types = ["Todos", "Curso", "Trilha", "Evento", "Notícia", "Atualização"]

export default function NovidadesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [selectedType, setSelectedType] = useState("Todos")

  const filteredNews = newsData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Todas" || item.category === selectedCategory
    const matchesType = selectedType === "Todos" || item.type === selectedType

    return matchesSearch && matchesCategory && matchesType
  })

  const featuredNews = filteredNews.filter((item) => item.featured)
  const regularNews = filteredNews.filter((item) => !item.featured)

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Programação: "bg-blue-100 text-blue-800 border-blue-200",
      Design: "bg-purple-100 text-purple-800 border-purple-200",
      Tecnologia: "bg-green-100 text-green-800 border-green-200",
      Parceria: "bg-orange-100 text-orange-800 border-orange-200",
      Plataforma: "bg-gray-100 text-gray-800 border-gray-200",
    }
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Curso":
        return <TrendingUp className="h-4 w-4" />
      case "Trilha":
        return <Tag className="h-4 w-4" />
      case "Evento":
        return <Calendar className="h-4 w-4" />
      case "Notícia":
        return <Users className="h-4 w-4" />
      case "Atualização":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <Tag className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Novidades da Plataforma</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fique por dentro das últimas atualizações, novos cursos, eventos e parcerias da nossa plataforma
            educacional.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar novidades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-blue-500"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="border-gray-200 focus:border-blue-500">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="border-gray-200 focus:border-blue-500">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("Todas")
                setSelectedType("Todos")
              }}
              variant="outline"
              className="border-gray-200 hover:bg-gray-50"
            >
              Limpar Filtros
            </Button>
          </div>
        </div>

        {/* Featured News */}
        {featuredNews.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-6 w-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-900">Destaques</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredNews.map((item) => (
                <Card
                  key={item.id}
                  className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={`${getCategoryColor(item.category)} border`}>{item.category}</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/90 text-gray-700">
                        {getTypeIcon(item.type)}
                        <span className="ml-1">{item.type}</span>
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">{item.title}</CardTitle>
                    <CardDescription className="text-gray-600">{item.description}</CardDescription>
                  </CardHeader>

                  <CardFooter className="flex items-center justify-between pt-0">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(item.date).toLocaleDateString("pt-BR")}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {item.readTime}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {item.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {item.likes}
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular News */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Tag className="h-6 w-6 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-900">Todas as Novidades</h2>
            <Badge variant="secondary" className="ml-2">
              {regularNews.length} {regularNews.length === 1 ? "item" : "itens"}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularNews.map((item) => (
              <Card
                key={item.id}
                className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className={`${getCategoryColor(item.category)} border text-xs`}>{item.category}</Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90 text-gray-700 text-xs">
                      {getTypeIcon(item.type)}
                      <span className="ml-1">{item.type}</span>
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 line-clamp-2">{item.description}</CardDescription>
                </CardHeader>

                <CardFooter className="pt-0">
                  <div className="w-full">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(item.date).toLocaleDateString("pt-BR")}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {item.readTime}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {item.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {item.likes}
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhuma novidade encontrada</h3>
            <p className="text-gray-600 mb-4">Tente ajustar os filtros ou termos de busca.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("Todas")
                setSelectedType("Todos")
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
