"use client"

import { useAuth } from "@/contexts/auth-context"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Plus, Search, Users, Clock, Pin, Lock } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface ForumCategory {
  id: string
  name: string
  description: string
  topicCount: number
  postCount: number
  lastPost?: {
    title: string
    author: string
    date: string
  }
}

interface ForumTopic {
  id: string
  title: string
  content: string
  author: string
  authorAvatar: string
  categoryId: string
  categoryName: string
  createdAt: string
  updatedAt: string
  replyCount: number
  viewCount: number
  isPinned: boolean
  isLocked: boolean
  lastReply?: {
    author: string
    date: string
  }
}

export default function ForumPage() {
  const { user } = useAuth()
  const [categories, setCategories] = useState<ForumCategory[]>([])
  const [recentTopics, setRecentTopics] = useState<ForumTopic[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Load forum data from localStorage
    const savedCategories = localStorage.getItem("eduplatform-forum-categories")
    const savedTopics = localStorage.getItem("eduplatform-forum-topics")

    if (savedCategories) {
      setCategories(JSON.parse(savedCategories))
    } else {
      // Initialize with sample categories
      const sampleCategories: ForumCategory[] = [
        {
          id: "1",
          name: "Programação",
          description: "Discussões sobre linguagens de programação, frameworks e desenvolvimento",
          topicCount: 45,
          postCount: 234,
          lastPost: {
            title: "Dúvidas sobre React Hooks",
            author: "João Silva",
            date: "2024-01-25",
          },
        },
        {
          id: "2",
          name: "Design",
          description: "UX/UI, design gráfico e ferramentas de design",
          topicCount: 28,
          postCount: 156,
          lastPost: {
            title: "Melhores práticas de UX",
            author: "Maria Santos",
            date: "2024-01-24",
          },
        },
        {
          id: "3",
          name: "Data Science",
          description: "Análise de dados, machine learning e estatística",
          topicCount: 32,
          postCount: 189,
          lastPost: {
            title: "Algoritmos de ML para iniciantes",
            author: "Carlos Lima",
            date: "2024-01-23",
          },
        },
        {
          id: "4",
          name: "Carreira",
          description: "Dicas de carreira, networking e desenvolvimento profissional",
          topicCount: 67,
          postCount: 345,
          lastPost: {
            title: "Como se preparar para entrevistas",
            author: "Ana Costa",
            date: "2024-01-25",
          },
        },
        {
          id: "5",
          name: "Geral",
          description: "Discussões gerais sobre educação e aprendizado",
          topicCount: 89,
          postCount: 456,
          lastPost: {
            title: "Métodos de estudo eficazes",
            author: "Roberto Alves",
            date: "2024-01-24",
          },
        },
      ]
      setCategories(sampleCategories)
      localStorage.setItem("eduplatform-forum-categories", JSON.stringify(sampleCategories))
    }

    if (savedTopics) {
      setRecentTopics(JSON.parse(savedTopics))
    } else {
      // Initialize with sample topics
      const sampleTopics: ForumTopic[] = [
        {
          id: "1",
          title: "Como começar com React em 2024?",
          content: "Estou começando a estudar React e gostaria de dicas sobre por onde começar...",
          author: "João Silva",
          authorAvatar: "/placeholder.svg?height=40&width=40",
          categoryId: "1",
          categoryName: "Programação",
          createdAt: "2024-01-25T10:30:00Z",
          updatedAt: "2024-01-25T14:20:00Z",
          replyCount: 12,
          viewCount: 89,
          isPinned: true,
          isLocked: false,
          lastReply: {
            author: "Maria Santos",
            date: "2024-01-25T14:20:00Z",
          },
        },
        {
          id: "2",
          title: "Melhores práticas de UX Design",
          content: "Vamos discutir as melhores práticas para criar experiências de usuário incríveis...",
          author: "Ana Costa",
          authorAvatar: "/placeholder.svg?height=40&width=40",
          categoryId: "2",
          categoryName: "Design",
          createdAt: "2024-01-24T16:45:00Z",
          updatedAt: "2024-01-25T09:15:00Z",
          replyCount: 8,
          viewCount: 67,
          isPinned: false,
          isLocked: false,
          lastReply: {
            author: "Carlos Lima",
            date: "2024-01-25T09:15:00Z",
          },
        },
        {
          id: "3",
          title: "Python vs R para Data Science",
          content: "Qual linguagem vocês recomendam para quem está começando em Data Science?",
          author: "Roberto Alves",
          authorAvatar: "/placeholder.svg?height=40&width=40",
          categoryId: "3",
          categoryName: "Data Science",
          createdAt: "2024-01-23T14:20:00Z",
          updatedAt: "2024-01-24T11:30:00Z",
          replyCount: 15,
          viewCount: 123,
          isPinned: false,
          isLocked: false,
          lastReply: {
            author: "Lucia Ferreira",
            date: "2024-01-24T11:30:00Z",
          },
        },
        {
          id: "4",
          title: "Dicas para primeira entrevista de emprego",
          content: "Compartilhem suas experiências e dicas para quem vai fazer a primeira entrevista...",
          author: "Lucia Ferreira",
          authorAvatar: "/placeholder.svg?height=40&width=40",
          categoryId: "4",
          categoryName: "Carreira",
          createdAt: "2024-01-22T09:00:00Z",
          updatedAt: "2024-01-23T16:45:00Z",
          replyCount: 23,
          viewCount: 178,
          isPinned: false,
          isLocked: false,
          lastReply: {
            author: "João Silva",
            date: "2024-01-23T16:45:00Z",
          },
        },
      ]
      setRecentTopics(sampleTopics)
      localStorage.setItem("eduplatform-forum-topics", JSON.stringify(sampleTopics))
    }
  }, [])

  const filteredTopics = recentTopics.filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.author.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Agora há pouco"
    if (diffInHours < 24) return `${diffInHours}h atrás`
    if (diffInHours < 48) return "Ontem"
    return date.toLocaleDateString("pt-BR")
  }

  return (
    <div className="min-h-screen bg-background">


      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Fórum da Comunidade</h1>
            <p className="text-muted-foreground">Conecte-se, aprenda e compartilhe conhecimento</p>
          </div>
          {user && (
            <Link href="/forum/novo-topico">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Tópico
              </Button>
            </Link>
          )}
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar tópicos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Categories */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Categorias</CardTitle>
                <CardDescription>Explore os diferentes tópicos de discussão</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories.map((category) => (
                    <Link key={category.id} href={`/forum/categoria/${category.id}`}>
                      <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{category.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              {category.topicCount}
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {category.postCount}
                            </div>
                          </div>
                          {category.lastPost && (
                            <div className="text-xs text-muted-foreground mt-1">
                              Último: {category.lastPost.title.substring(0, 30)}...
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Topics */}
            <Card>
              <CardHeader>
                <CardTitle>Tópicos Recentes</CardTitle>
                <CardDescription>
                  {searchTerm ? `Resultados para "${searchTerm}"` : "Discussões mais recentes da comunidade"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredTopics.map((topic) => (
                    <Link key={topic.id} href={`/forum/topico/${topic.id}`}>
                      <div className="flex items-start space-x-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={topic.authorAvatar || "/placeholder.svg"} alt={topic.author} />
                          <AvatarFallback>{topic.author.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            {topic.isPinned && <Pin className="h-4 w-4 text-primary" />}
                            {topic.isLocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                            <h3 className="font-semibold text-foreground truncate">{topic.title}</h3>
                          </div>

                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{topic.content}</p>

                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <Badge variant="secondary">{topic.categoryName}</Badge>
                            <div className="flex items-center">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              {topic.replyCount}
                            </div>
                            <div>{topic.viewCount} visualizações</div>
                            <div>Por {topic.author}</div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatDate(topic.updatedAt)}
                            </div>
                          </div>

                          {topic.lastReply && (
                            <div className="text-xs text-muted-foreground mt-1">
                              Última resposta por {topic.lastReply.author} em {formatDate(topic.lastReply.date)}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}

                  {filteredTopics.length === 0 && (
                    <div className="text-center py-8">
                      <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        {searchTerm ? "Nenhum tópico encontrado" : "Nenhum tópico ainda"}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {searchTerm ? "Tente ajustar os termos de busca" : "Seja o primeiro a iniciar uma discussão!"}
                      </p>
                      {user && (
                        <Link href="/forum/novo-topico">
                          <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Criar Primeiro Tópico
                          </Button>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Forum Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total de Tópicos</span>
                  <span className="font-semibold">{categories.reduce((sum, cat) => sum + cat.topicCount, 0)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total de Posts</span>
                  <span className="font-semibold">{categories.reduce((sum, cat) => sum + cat.postCount, 0)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Categorias</span>
                  <span className="font-semibold">{categories.length}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {user ? (
                  <>
                    <Link href="/forum/novo-topico">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Plus className="mr-2 h-4 w-4" />
                        Novo Tópico
                      </Button>
                    </Link>
                    <Link href="/forum/meus-topicos">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Meus Tópicos
                      </Button>
                    </Link>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground mb-4">Faça login para participar das discussões</p>
                    <Link href="/login">
                      <Button className="w-full">Fazer Login</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Forum Rules */}
            <Card>
              <CardHeader>
                <CardTitle>Regras do Fórum</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Seja respeitoso com outros membros</li>
                  <li>• Mantenha as discussões relevantes</li>
                  <li>• Não faça spam ou autopromoção</li>
                  <li>• Use títulos descritivos</li>
                  <li>• Pesquise antes de criar novos tópicos</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
