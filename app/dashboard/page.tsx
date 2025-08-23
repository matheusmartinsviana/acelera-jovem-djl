"use client"

import { useAuth } from "@/contexts/auth-context"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Heart, Trophy, Clock, ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Course {
  id: string
  title: string
  description: string
  progress: number
  category: string
  duration: string
  level: "Iniciante" | "Intermediário" | "Avançado"
  isFavorite: boolean
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earned: boolean
  date?: string
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [courses, setCourses] = useState<Course[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    totalHours: 0,
    streak: 0,
  })

  useEffect(() => {
    // Load data from localStorage
    const savedCourses = localStorage.getItem("eduplatform-courses")
    const savedAchievements = localStorage.getItem("eduplatform-achievements")
    const savedStats = localStorage.getItem("eduplatform-stats")

    if (savedCourses) {
      setCourses(JSON.parse(savedCourses))
    } else {
      // Initialize with sample data
      const sampleCourses: Course[] = [
        {
          id: "1",
          title: "Introdução ao JavaScript",
          description: "Aprenda os fundamentos da linguagem JavaScript",
          progress: 75,
          category: "Programação",
          duration: "8h",
          level: "Iniciante",
          isFavorite: true,
        },
        {
          id: "2",
          title: "React para Iniciantes",
          description: "Construa aplicações web modernas com React",
          progress: 30,
          category: "Programação",
          duration: "12h",
          level: "Intermediário",
          isFavorite: false,
        },
        {
          id: "3",
          title: "Design UX/UI",
          description: "Princípios de design para interfaces digitais",
          progress: 0,
          category: "Design",
          duration: "6h",
          level: "Iniciante",
          isFavorite: true,
        },
      ]
      setCourses(sampleCourses)
      localStorage.setItem("eduplatform-courses", JSON.stringify(sampleCourses))
    }

    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements))
    } else {
      // Initialize with sample achievements
      const sampleAchievements: Achievement[] = [
        {
          id: "1",
          title: "Primeiro Curso",
          description: "Complete seu primeiro curso",
          icon: "🎓",
          earned: true,
          date: "2024-01-15",
        },
        {
          id: "2",
          title: "Sequência de 7 dias",
          description: "Estude por 7 dias consecutivos",
          icon: "🔥",
          earned: true,
          date: "2024-01-20",
        },
        {
          id: "3",
          title: "Especialista em JavaScript",
          description: "Complete 5 cursos de JavaScript",
          icon: "⚡",
          earned: false,
        },
      ]
      setAchievements(sampleAchievements)
      localStorage.setItem("eduplatform-achievements", JSON.stringify(sampleAchievements))
    }

    if (savedStats) {
      setStats(JSON.parse(savedStats))
    } else {
      // Initialize with sample stats
      const sampleStats = {
        totalCourses: 3,
        completedCourses: 1,
        totalHours: 26,
        streak: 7,
      }
      setStats(sampleStats)
      localStorage.setItem("eduplatform-stats", JSON.stringify(sampleStats))
    }
  }, [])

  const displayUser = user || { name: "Usuário Visitante" }

  return (
    <div className="min-h-screen bg-background">


      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Olá, {displayUser.name}!</h1>
          <p className="text-muted-foreground">Continue sua jornada de aprendizado</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cursos Inscritos</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCourses}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cursos Concluídos</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedCourses}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Horas de Estudo</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalHours}h</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sequência</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.streak} dias</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Courses in Progress */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cursos em Andamento</CardTitle>
                <CardDescription>Continue de onde parou</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {courses
                  .filter((course) => course.progress > 0 && course.progress < 100)
                  .map((course) => (
                    <div key={course.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{course.description}</p>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="secondary">{course.category}</Badge>
                          <Badge variant="outline">{course.level}</Badge>
                          <span className="text-sm text-muted-foreground">{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={course.progress} className="flex-1" />
                          <span className="text-sm font-medium">{course.progress}%</span>
                        </div>
                      </div>
                      <Button size="sm">
                        Continuar
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                {courses.filter((course) => course.progress > 0 && course.progress < 100).length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Nenhum curso em andamento</p>
                    <Link href="/conteudos-freemium">
                      <Button className="mt-4">Explorar Cursos</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/conteudos-freemium">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Explorar Conteúdos
                  </Button>
                </Link>
                <Link href="/favoritos">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Heart className="mr-2 h-4 w-4" />
                    Meus Favoritos
                  </Button>
                </Link>
                <Link href="/forum">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Fórum
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Conquistas Recentes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements
                  .filter((achievement) => achievement.earned)
                  .slice(0, 3)
                  .map((achievement) => (
                    <div key={achievement.id} className="flex items-center space-x-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{achievement.title}</h4>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
