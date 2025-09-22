"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Heart, Trophy, Clock, ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Trail {
  id: string
  title: string
  description: string
  progress: number
  totalCourses: number
  completedCourses: number
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
  const [trails, setTrails] = useState<Trail[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [stats, setStats] = useState({
    totalTrails: 0,
    completedTrails: 0,
    completedCourses: 0,
    totalHours: 0,
    streak: 0,
  })

  useEffect(() => {
    // Load from localStorage
    const savedTrails = localStorage.getItem("eduplatform-trails")
    const savedAchievements = localStorage.getItem("eduplatform-achievements")
    const savedStats = localStorage.getItem("eduplatform-stats")

    if (savedTrails) {
      setTrails(JSON.parse(savedTrails))
    } else {
      const sampleTrails: Trail[] = [
        {
          id: "t1",
          title: "Trilha Frontend",
          description: "HTML, CSS, JavaScript e React para iniciantes",
          progress: 40,
          totalCourses: 5,
          completedCourses: 2,
          duration: "30h",
          level: "Iniciante",
          isFavorite: true,
        },
        {
          id: "t2",
          title: "Trilha Backend",
          description: "Node.js, APIs e bancos de dados",
          progress: 10,
          totalCourses: 6,
          completedCourses: 0,
          duration: "40h",
          level: "Intermediário",
          isFavorite: false,
        },
      ]
      setTrails(sampleTrails)
      localStorage.setItem("eduplatform-trails", JSON.stringify(sampleTrails))
    }

    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements))
    } else {
      const sampleAchievements: Achievement[] = [
        {
          id: "1",
          title: "Primeira Trilha",
          description: "Complete sua primeira trilha",
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
          title: "Especialista em Frontend",
          description: "Conclua 3 trilhas de Frontend",
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
      const sampleStats = {
        totalTrails: 2,
        completedTrails: 0,
        completedCourses: 2,
        totalHours: 70,
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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Trilhas Ativas</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTrails || 2}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Trilhas Concluídas</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedTrails || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cursos Concluídos</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
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
          {/* Trails in Progress */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Trilhas em Andamento</CardTitle>
                <CardDescription>Siga seu caminho de aprendizado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {trails
                  .filter((trail) => trail.progress > 0 && trail.progress < 100)
                  .map((trail) => (
                    <div key={trail.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{trail.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{trail.description}</p>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="secondary">{trail.level}</Badge>
                          <span className="text-sm text-muted-foreground">{trail.duration}</span>
                          <span className="text-sm text-muted-foreground">
                            {trail.completedCourses}/{trail.totalCourses} cursos
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={trail.progress} className="flex-1" />
                          <span className="text-sm font-medium">{trail.progress}%</span>
                        </div>
                      </div>
                      <Button size="sm">
                        Continuar
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                {trails.filter((trail) => trail.progress > 0 && trail.progress < 100).length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Nenhuma trilha em andamento</p>
                    <Link href="/trilhas">
                      <Button className="mt-4">Explorar Trilhas</Button>
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
                <Link href="/trilhas">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Explorar Trilhas
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
