"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MessageSquare, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface Category {
  id: string
  name: string
}

export default function NovoTopicoPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [form, setForm] = useState({
    title: "",
    content: "",
    categoryId: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    // Load categories
    const savedCategories = localStorage.getItem("eduplatform-forum-categories")
    if (savedCategories) {
      const categoriesData = JSON.parse(savedCategories)
      setCategories(categoriesData.map((cat: any) => ({ id: cat.id, name: cat.name })))
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!form.title || !form.content || !form.categoryId) {
      setError("Por favor, preencha todos os campos")
      setIsLoading(false)
      return
    }

    try {
      // Get existing topics
      const existingTopics = localStorage.getItem("eduplatform-forum-topics")
      const topicsList = existingTopics ? JSON.parse(existingTopics) : []

      // Find category name
      const category = categories.find((cat) => cat.id === form.categoryId)

      const authorName = user?.name || "Usuário Visitante"
      const authorAvatar = user?.avatar || "/placeholder.svg?height=40&width=40"

      // Create new topic
      const newTopic = {
        id: Date.now().toString(),
        title: form.title,
        content: form.content,
        author: authorName,
        authorAvatar: authorAvatar,
        categoryId: form.categoryId,
        categoryName: category?.name || "Geral",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        replyCount: 0,
        viewCount: 0,
        isPinned: false,
        isLocked: false,
      }

      // Add to topics list
      topicsList.unshift(newTopic)

      // Save to localStorage
      localStorage.setItem("eduplatform-forum-topics", JSON.stringify(topicsList))

      // Update category stats
      const savedCategories = localStorage.getItem("eduplatform-forum-categories")
      if (savedCategories) {
        const categoriesData = JSON.parse(savedCategories)
        const updatedCategories = categoriesData.map((cat: any) =>
          cat.id === form.categoryId ? { ...cat, topicCount: cat.topicCount + 1 } : cat,
        )
        localStorage.setItem("eduplatform-forum-categories", JSON.stringify(updatedCategories))
      }

      // Redirect to the new topic
      router.push(`/forum/topico/${newTopic.id}`)
    } catch (err) {
      setError("Erro ao criar tópico. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">


      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <Link href="/forum">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Fórum
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Criar Novo Tópico</h1>
              <p className="text-muted-foreground">Inicie uma nova discussão na comunidade</p>
            </div>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Novo Tópico
              </CardTitle>
              <CardDescription>Preencha as informações abaixo para criar seu tópico</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título do Tópico *</Label>
                    <Input
                      id="title"
                      placeholder="Digite um título claro e descritivo"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria *</Label>
                    <Select value={form.categoryId} onValueChange={(value) => setForm({ ...form, categoryId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Conteúdo *</Label>
                  <Textarea
                    id="content"
                    placeholder="Descreva sua dúvida, compartilhe conhecimento ou inicie uma discussão..."
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="min-h-[200px]"
                    disabled={isLoading}
                  />
                  <p className="text-sm text-muted-foreground">
                    Seja claro e específico para obter melhores respostas da comunidade
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <Link href="/forum">
                    <Button variant="outline" disabled={isLoading}>
                      Cancelar
                    </Button>
                  </Link>

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Criando..." : "Criar Tópico"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Dicas para um bom tópico</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Use um título claro e específico que descreva bem sua dúvida ou discussão</li>
                <li>• Forneça contexto suficiente para que outros possam entender e ajudar</li>
                <li>• Pesquise se já existe um tópico similar antes de criar um novo</li>
                <li>• Seja respeitoso e construtivo em suas colocações</li>
                <li>• Escolha a categoria mais apropriada para seu tópico</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
