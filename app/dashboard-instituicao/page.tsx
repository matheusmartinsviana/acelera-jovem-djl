"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, BookOpen, TrendingUp, Award, Building2, UserCheck, Calendar, BarChart3 } from "lucide-react"

export default function DashboardInstituicao() {
  const { user } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeCourses: 0,
    completionRate: 0,
    partnerships: 0,
  })

  useEffect(() => {
    const userId = user?.id || "guest"
    const institutionStats = localStorage.getItem(`institution_stats_${userId}`)
    if (institutionStats) {
      setStats(JSON.parse(institutionStats))
    } else {
      // Initialize with demo data
      const demoStats = {
        totalStudents: 1247,
        activeCourses: 23,
        completionRate: 78,
        partnerships: 12,
      }
      setStats(demoStats)
      localStorage.setItem(`institution_stats_${userId}`, JSON.stringify(demoStats))
    }
  }, [user, router])

  const recentActivities = [
    { id: 1, type: "student", message: "Novo estudante cadastrado: Maria Silva", time: "2 horas atrás" },
    { id: 2, type: "course", message: 'Curso "React Avançado" foi concluído por 15 alunos', time: "4 horas atrás" },
    { id: 3, type: "partnership", message: "Nova parceria estabelecida com TechCorp", time: "1 dia atrás" },
    { id: 4, type: "achievement", message: "85% de taxa de conclusão alcançada", time: "2 dias atrás" },
  ]

  const partnerships = [
    { id: 1, name: "TechCorp Solutions", status: "active", students: 156, since: "2023" },
    { id: 2, name: "Digital Innovations", status: "active", students: 89, since: "2024" },
    { id: 3, name: "StartupHub", status: "pending", students: 0, since: "2024" },
    { id: 4, name: "EduTech Partners", status: "active", students: 234, since: "2022" },
  ]

  const displayUser = user || { name: "Instituição Demo" }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dashboard Institucional
              </h1>
              <p className="text-slate-600">Bem-vindo, {displayUser.name}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total de Estudantes</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{stats.totalStudents.toLocaleString()}</div>
              <p className="text-xs text-blue-600 mt-1">+12% este mês</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Cursos Ativos</CardTitle>
              <BookOpen className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">{stats.activeCourses}</div>
              <p className="text-xs text-purple-600 mt-1">+3 novos cursos</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Taxa de Conclusão</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">{stats.completionRate}%</div>
              <Progress value={stats.completionRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Parcerias</CardTitle>
              <Award className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">{stats.partnerships}</div>
              <p className="text-xs text-orange-600 mt-1">2 pendentes</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              Visão Geral
            </TabsTrigger>
            <TabsTrigger
              value="partnerships"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              Parcerias
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Atividades Recentes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                      <div className="p-1 bg-blue-100 rounded-full">
                        <UserCheck className="h-3 w-3 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">{activity.message}</p>
                        <p className="text-xs text-slate-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                  <CardDescription>Gerencie sua instituição</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Users className="mr-2 h-4 w-4" />
                    Gerenciar Estudantes
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-blue-200 hover:bg-blue-50 bg-transparent"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Adicionar Novo Curso
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent"
                  >
                    <Award className="mr-2 h-4 w-4" />
                    Nova Parceria
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-green-200 hover:bg-green-50 bg-transparent"
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Relatórios
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="partnerships" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Parcerias Institucionais</CardTitle>
                <CardDescription>Gerencie suas parcerias educacionais</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {partnerships.map((partnership) => (
                    <div
                      key={partnership.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Building2 className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">{partnership.name}</h3>
                          <p className="text-sm text-slate-600">
                            {partnership.students} estudantes • Desde {partnership.since}
                          </p>
                        </div>
                      </div>
                      <Badge variant={partnership.status === "active" ? "default" : "secondary"}>
                        {partnership.status === "active" ? "Ativa" : "Pendente"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Analytics e Relatórios</CardTitle>
                <CardDescription>Acompanhe o desempenho da sua instituição</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Analytics Avançados</h3>
                  <p className="text-slate-600 mb-4">
                    Visualize dados detalhados sobre o desempenho dos estudantes e cursos
                  </p>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Ver Relatórios Completos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Configurações da Instituição</CardTitle>
                <CardDescription>Gerencie as configurações da sua conta institucional</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Informações Básicas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700">Nome da Instituição</label>
                        <p className="text-slate-900 mt-1">{displayUser.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">Email</label>
                        <p className="text-slate-900 mt-1">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Atualizar Configurações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
