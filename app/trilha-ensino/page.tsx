"use client"

import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Star, ArrowRight, CheckCircle, Lock } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"

interface LearningPath {
  id: string
  title: string
  description: string
  category: string
  level: "Iniciante" | "Intermediário" | "Avançado"
  totalCourses: number
  completedCourses: number
  estimatedHours: number
  rating: number
  isEnrolled: boolean
  courses: Course[]
}

interface Course {
  id: string
  title: string
  description: string
  duration: string
  isCompleted: boolean
  isLocked: boolean
  order: number
}

export default function TrilhaEnsinoPage() {
  const { user } = useAuth()
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([])

  useEffect(() => {
    // Initialize with sample learning paths
    const samplePaths: LearningPath[] = [
      {
        id: "1",
        title: "Desenvolvedor Frontend Completo",
        description: "Aprenda HTML, CSS, JavaScript e React do zero ao avançado",
        category: "Programação",
        level: "Iniciante",
        totalCourses: 6,
        completedCourses: 2,
        estimatedHours: 48,
        rating: 4.8,
        isEnrolled: true,
        courses: [
          {
            id: "1-1",
            title: "HTML e CSS Fundamentais",
            description: "Base sólida em HTML e CSS",
            duration: "8h",
            isCompleted: true,
            isLocked: false,
            order: 1,
          },
          {
            id: "1-2",
            title: "JavaScript Essencial",
            description: "Fundamentos do JavaScript",
            duration: "12h",
            isCompleted: true,
            isLocked: false,
            order: 2,
          },
          {
            id: "1-3",
            title: "JavaScript Avançado",
            description: "Conceitos avançados e ES6+",
            duration: "10h",
            isCompleted: false,
            isLocked: false,
            order: 3,
          },
          {
            id: "1-4",
            title: "React Fundamentos",
            description: "Introdução ao React",
            duration: "8h",
            isCompleted: false,
            isLocked: true,
            order: 4,
          },
          {
            id: "1-5",
            title: "React Avançado",
            description: "Hooks, Context e padrões avançados",
            duration: "6h",
            isCompleted: false,
            isLocked: true,
            order: 5,
          },
          {
            id: "1-6",
            title: "Projeto Final",
            description: "Construa uma aplicação completa",
            duration: "4h",
            isCompleted: false,
            isLocked: true,
            order: 6,
          },
        ],
      },
      {
        id: "2",
        title: "Designer UX/UI Profissional",
        description: "Domine os princípios de design e ferramentas profissionais",
        category: "Design",
        level: "Intermediário",
        totalCourses: 5,
        completedCourses: 0,
        estimatedHours: 35,
        rating: 4.9,
        isEnrolled: false,
        courses: [
          {
            id: "2-1",
            title: "Fundamentos do Design",
            description: "Princípios básicos de design",
            duration: "6h",
            isCompleted: false,
            isLocked: false,
            order: 1,
          },
          {
            id: "2-2",
            title: "Pesquisa de Usuário",
            description: "Métodos de pesquisa e análise",
            duration: "8h",
            isCompleted: false,
            isLocked: true,
            order: 2,
          },
          {
            id: "2-3",
            title: "Prototipagem",
            description: "Criação de protótipos eficazes",
            duration: "7h",
            isCompleted: false,
            isLocked: true,
            order: 3,
          },
          {
            id: "2-4",
            title: "Design Systems",
            description: "Criação e manutenção de design systems",
            duration: "9h",
            isCompleted: false,
            isLocked: true,
            order: 4,
          },
          {
            id: "2-5",
            title: "Portfolio Profissional",
            description: "Monte seu portfolio de designer",
            duration: "5h",
            isCompleted: false,
            isLocked: true,
            order: 5,
          },
        ],
      },
      {
        id: "3",
        title: "Data Science com Python",
        description: "Análise de dados, machine learning e visualização",
        category: "Data Science",
        level: "Avançado",
        totalCourses: 7,
        completedCourses: 0,
        estimatedHours: 56,
        rating: 4.7,
        isEnrolled: false,
        courses: [
          {
            id: "3-1",
            title: "Python para Data Science",
            description: "Fundamentos do Python para análise",
            duration: "10h",
            isCompleted: false,
            isLocked: false,
            order: 1,
          },
          {
            id: "3-2",
            title: "Pandas e NumPy",
            description: "Manipulação de dados",
            duration: "8h",
            isCompleted: false,
            isLocked: true,
            order: 2,
          },
          {
            id: "3-3",
            title: "Visualização de Dados",
            description: "Matplotlib, Seaborn e Plotly",
            duration: "6h",
            isCompleted: false,
            isLocked: true,
            order: 3,
          },
          {
            id: "3-4",
            title: "Estatística Aplicada",
            description: "Conceitos estatísticos essenciais",
            duration: "8h",
            isCompleted: false,
            isLocked: true,
            order: 4,
          },
          {
            id: "3-5",
            title: "Machine Learning",
            description: "Algoritmos de aprendizado de máquina",
            duration: "12h",
            isCompleted: false,
            isLocked: true,
            order: 5,
          },
          {
            id: "3-6",
            title: "Deep Learning",
            description: "Redes neurais e deep learning",
            duration: "8h",
            isCompleted: false,
            isLocked: true,
            order: 6,
          },
          {
            id: "3-7",
            title: "Projeto Capstone",
            description: "Projeto final de data science",
            duration: "4h",
            isCompleted: false,
            isLocked: true,
            order: 7,
          },
        ],
      },
    ]

    setLearningPaths(samplePaths)

    // Load user progress from localStorage
    if (user) {
      const savedProgress = localStorage.getItem(`eduplatform-learning-paths-${user.id}`)
      if (savedProgress) {
        const progressData = JSON.parse(savedProgress)
        // Update paths with saved progress
        const updatedPaths = samplePaths.map((path) => {
          const savedPath = progressData.find((p: any) => p.id === path.id)
          return savedPath ? { ...path, ...savedPath } : path
        })
        setLearningPaths(updatedPaths)
      }
    }
  }, [user])

  const enrollInPath = (pathId: string) => {
    const updatedPaths = learningPaths.map((path) => (path.id === pathId ? { ...path, isEnrolled: true } : path))
    setLearningPaths(updatedPaths)

    // Save to localStorage
    if (user) {
      localStorage.setItem(`eduplatform-learning-paths-${user.id}`, JSON.stringify(updatedPaths))
    }
  }

  const getProgressPercentage = (path: LearningPath) => {
    return Math.round((path.completedCourses / path.totalCourses) * 100)
  }

  return (
    <div className="min-h-screen bg-background">


      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Trilhas de Ensino</h1>
          <p className="text-muted-foreground">
            Siga um caminho estruturado de aprendizado para dominar novas habilidades
          </p>
        </div>

        {/* Learning Paths Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {learningPaths.map((path) => (
            <Card key={path.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="secondary">{path.category}</Badge>
                      <Badge variant="outline">{path.level}</Badge>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm">{path.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="mb-2">{path.title}</CardTitle>
                    <CardDescription>{path.description}</CardDescription>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {path.totalCourses} cursos
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {path.estimatedHours}h
                  </div>
                </div>

                {path.isEnrolled && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progresso</span>
                      <span>
                        {path.completedCourses}/{path.totalCourses} cursos
                      </span>
                    </div>
                    <Progress value={getProgressPercentage(path)} />
                  </div>
                )}
              </CardHeader>

              <CardContent>
                {path.isEnrolled ? (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Cursos da Trilha:</h4>
                    <div className="space-y-2">
                      {path.courses.slice(0, 3).map((course) => (
                        <div key={course.id} className="flex items-center space-x-3 p-2 rounded-lg bg-muted/30">
                          <div className="flex-shrink-0">
                            {course.isCompleted ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : course.isLocked ? (
                              <Lock className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <div className="h-5 w-5 rounded-full border-2 border-primary" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{course.title}</p>
                            <p className="text-xs text-muted-foreground">{course.duration}</p>
                          </div>
                        </div>
                      ))}
                      {path.courses.length > 3 && (
                        <p className="text-xs text-muted-foreground text-center">
                          +{path.courses.length - 3} cursos adicionais
                        </p>
                      )}
                    </div>
                    <Link href={`/trilha-ensino/${path.id}`}>
                      <Button className="w-full">
                        Continuar Trilha
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center py-4">
                      <p className="text-sm text-muted-foreground mb-4">
                        Inscreva-se nesta trilha para começar sua jornada de aprendizado
                      </p>
                      {user ? (
                        <Button onClick={() => enrollInPath(path.id)} className="w-full">
                          Inscrever-se na Trilha
                        </Button>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Faça login para se inscrever</p>
                          <Link href="/login">
                            <Button className="w-full">Fazer Login</Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        {!user && (
          <Card className="mt-12">
            <CardContent className="text-center py-12">
              <BookOpen className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Comece sua jornada de aprendizado</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Crie uma conta gratuita para acessar nossas trilhas de ensino estruturadas e acompanhar seu progresso
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/cadastro">
                  <Button size="lg">Criar Conta Gratuita</Button>
                </Link>
                <Link href="/conteudos-freemium">
                  <Button variant="outline" size="lg">
                    Explorar Conteúdos
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
