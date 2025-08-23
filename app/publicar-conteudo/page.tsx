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
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Save, Upload } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface ContentForm {
  title: string
  description: string
  category: string
  type: "course" | "article" | "video"
  content: string
  isPremium: boolean
  tags: string
  duration: string
  difficulty: "Iniciante" | "Intermediário" | "Avançado"
}

export default function PublicarConteudoPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [form, setForm] = useState<ContentForm>({
    title: "",
    description: "",
    category: "",
    type: "course",
    content: "",
    isPremium: false,
    tags: "",
    duration: "",
    difficulty: "Iniciante",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const categories = ["Programação", "Design", "Marketing", "Data Science", "Produtividade", "Negócios"]

  const handleSubmit = async (e: React.FormEvent, status: "draft" | "published") => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    // Validation
    if (!form.title || !form.description || !form.category || !form.content) {
      setError("Por favor, preencha todos os campos obrigatórios")
      setIsLoading(false)
      return
    }

    try {
      // Get existing content
      const existingContent = localStorage.getItem("eduplatform-content-library")
      const contentList = existingContent ? JSON.parse(existingContent) : []

      const authorName = user?.name || "Autor Visitante"

      // Create new content item
      const newContent = {
        id: Date.now().toString(),
        title: form.title,
        description: form.description,
        category: form.category,
        type: form.type,
        status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: authorName,
        views: 0,
        likes: 0,
        isPremium: form.isPremium,
        content: form.content,
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        duration: form.duration,
        difficulty: form.difficulty,
      }

      // Add to content list
      contentList.push(newContent)

      // Save to localStorage
      localStorage.setItem("eduplatform-content-library", JSON.stringify(contentList))

      setSuccess(
        status === "published" ? "Conteúdo publicado com sucesso!" : "Conteúdo salvo como rascunho com sucesso!",
      )

      // Redirect after success
      setTimeout(() => {
        router.push("/biblioteca-conteudo")
      }, 2000)
    } catch (err) {
      setError("Erro ao salvar conteúdo. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!user || (user.role !== "teacher" && user.role !== "admin")) {
    return (
      <div className="min-h-screen bg-background">

        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Acesso Restrito</h2>
            <p className="text-muted-foreground mb-4">Apenas professores e administradores podem publicar conteúdo</p>
            <Link href="/login">
              <Button>Fazer Login</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">


      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Publicar Conteúdo</h1>
            <p className="text-muted-foreground">Crie e publique materiais educacionais</p>
          </div>

          {/* Form */}
          <form className="space-y-8">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-200 bg-green-50 text-green-800">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
                <CardDescription>Defina as informações principais do seu conteúdo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título *</Label>
                    <Input
                      id="title"
                      placeholder="Digite o título do conteúdo"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria *</Label>
                    <Select value={form.category} onValueChange={(value) => setForm({ ...form, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição *</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva brevemente o conteúdo"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Conteúdo</Label>
                    <Select value={form.type} onValueChange={(value: any) => setForm({ ...form, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="course">Curso</SelectItem>
                        <SelectItem value="article">Artigo</SelectItem>
                        <SelectItem value="video">Vídeo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Dificuldade</Label>
                    <Select
                      value={form.difficulty}
                      onValueChange={(value: any) => setForm({ ...form, difficulty: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Iniciante">Iniciante</SelectItem>
                        <SelectItem value="Intermediário">Intermediário</SelectItem>
                        <SelectItem value="Avançado">Avançado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duração</Label>
                    <Input
                      id="duration"
                      placeholder="ex: 2h 30min"
                      value={form.duration}
                      onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="Separe as tags por vírgula (ex: javascript, react, frontend)"
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="premium"
                    checked={form.isPremium}
                    onCheckedChange={(checked) => setForm({ ...form, isPremium: checked })}
                  />
                  <Label htmlFor="premium">Conteúdo Premium</Label>
                </div>
              </CardContent>
            </Card>

            {/* Content */}
            <Card>
              <CardHeader>
                <CardTitle>Conteúdo</CardTitle>
                <CardDescription>Escreva o conteúdo do seu material educacional</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="content">Conteúdo *</Label>
                  <Textarea
                    id="content"
                    placeholder="Escreva o conteúdo completo aqui..."
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="min-h-[400px]"
                  />
                  <p className="text-sm text-muted-foreground">Você pode usar Markdown para formatar o texto</p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <Link href="/biblioteca-conteudo">
                <Button variant="outline">Cancelar</Button>
              </Link>

              <div className="flex items-center space-x-4">
                <Button type="button" variant="outline" onClick={(e) => handleSubmit(e, "draft")} disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Rascunho
                </Button>

                <Button type="button" onClick={(e) => handleSubmit(e, "published")} disabled={isLoading}>
                  <Upload className="h-4 w-4 mr-2" />
                  {isLoading ? "Publicando..." : "Publicar"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
