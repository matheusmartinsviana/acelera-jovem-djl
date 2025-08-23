"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  Users,
  BookOpen,
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Building2,
  GraduationCap,
  Settings,
  BarChart3,
} from "lucide-react"

export default function AdminPanel() {
  const { user } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    pendingApprovals: 0,
    activeForumPosts: 0,
    systemHealth: 0,
  })

  useEffect(() => {
    // Load admin stats from localStorage
    const adminStats = localStorage.getItem("admin_stats")
    if (adminStats) {
      setStats(JSON.parse(adminStats))
    } else {
      // Initialize with demo data
      const demoStats = {
        totalUsers: 2847,
        totalCourses: 156,
        pendingApprovals: 23,
        activeForumPosts: 89,
        systemHealth: 98,
      }
      setStats(demoStats)
      localStorage.setItem("admin_stats", JSON.stringify(demoStats))
    }
  }, [user, router])

  const recentActivities = [
    {
      id: 1,
      type: "user",
      message: "Nova instituição cadastrada: TechEdu Solutions",
      time: "30 min atrás",
      status: "pending",
    },
    {
      id: 2,
      type: "content",
      message: 'Curso "Advanced React" enviado para aprovação',
      time: "1 hora atrás",
      status: "pending",
    },
    {
      id: 3,
      type: "forum",
      message: 'Post reportado no fórum: "Dúvida sobre JavaScript"',
      time: "2 horas atrás",
      status: "review",
    },
    {
      id: 4,
      type: "system",
      message: "Backup automático concluído com sucesso",
      time: "3 horas atrás",
      status: "success",
    },
  ]

  const pendingApprovals = [
    { id: 1, type: "course", title: "Python para Data Science", author: "Prof. Maria Silva", submitted: "2024-01-15" },
    {
      id: 2,
      type: "institution",
      title: "CodeAcademy Brasil",
      contact: "contato@codeacademy.br",
      submitted: "2024-01-14",
    },
    {
      id: 3,
      type: "teacher",
      title: "João Santos - Frontend Developer",
      email: "joao@email.com",
      submitted: "2024-01-13",
    },
    {
      id: 4,
      type: "content",
      title: 'Artigo: "Tendências em UX Design"',
      author: "Ana Costa",
      submitted: "2024-01-12",
    },
  ]

  const userStats = [
    { role: "student", count: 2156, growth: "+12%", color: "blue" },
    { role: "teacher", count: 89, growth: "+8%", color: "purple" },
    { role: "institution", count: 34, growth: "+15%", color: "green" },
    { role: "admin", count: 5, growth: "0%", color: "orange" },
  ]

  const displayUser = user || { name: "Administrador Demo" }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-red-600 to-purple-600 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                Painel Administrativo
              </h1>
              <p className="text-slate-600">Bem-vindo, {displayUser.name}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-blue-600 mt-1">+8% este mês</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Total de Cursos</CardTitle>
              <BookOpen className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">{stats.totalCourses}</div>
              <p className="text-xs text-purple-600 mt-1">+5 novos</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Aprovações Pendentes</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">{stats.pendingApprovals}</div>
              <p className="text-xs text-orange-600 mt-1">Requer atenção</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Posts Ativos</CardTitle>
              <MessageSquare className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">{stats.activeForumPosts}</div>
              <p className="text-xs text-green-600 mt-1">No fórum</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-700">Saúde do Sistema</CardTitle>
              <TrendingUp className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-900">{stats.systemHealth}%</div>
              <Progress value={stats.systemHealth} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              Visão Geral
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              Usuários
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              Conteúdo
            </TabsTrigger>
            <TabsTrigger
              value="moderation"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              Moderação
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
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
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    Atividades Recentes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                      <div
                        className={`p-1 rounded-full ${
                          activity.status === "pending"
                            ? "bg-orange-100"
                            : activity.status === "success"
                              ? "bg-green-100"
                              : "bg-blue-100"
                        }`}
                      >
                        {activity.status === "pending" ? (
                          <Clock className="h-3 w-3 text-orange-600" />
                        ) : activity.status === "success" ? (
                          <CheckCircle className="h-3 w-3 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-3 w-3 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">{activity.message}</p>
                        <p className="text-xs text-slate-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Pending Approvals */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    Aprovações Pendentes
                  </CardTitle>
                  <CardDescription>Itens aguardando sua aprovação</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pendingApprovals.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1 bg-orange-100 rounded-full">
                          {item.type === "course" && <BookOpen className="h-3 w-3 text-orange-600" />}
                          {item.type === "institution" && <Building2 className="h-3 w-3 text-orange-600" />}
                          {item.type === "teacher" && <GraduationCap className="h-3 w-3 text-orange-600" />}
                          {item.type === "content" && <BookOpen className="h-3 w-3 text-orange-600" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{item.title}</p>
                          <p className="text-xs text-slate-600">{item.submitted}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 border-green-200 hover:bg-green-50 bg-transparent"
                        >
                          Aprovar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                        >
                          Rejeitar
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {userStats.map((stat) => (
                <Card key={stat.role} className="border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium capitalize">{stat.role}s</CardTitle>
                    <Users className={`h-4 w-4 text-${stat.color}-600`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.count.toLocaleString()}</div>
                    <p className={`text-xs text-${stat.color}-600 mt-1`}>{stat.growth} este mês</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Gerenciamento de Usuários</CardTitle>
                <CardDescription>Visualize e gerencie todos os usuários da plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Gestão Avançada de Usuários</h3>
                  <p className="text-slate-600 mb-4">Visualize, edite e gerencie todos os usuários da plataforma</p>
                  <Button className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700">
                    Ver Todos os Usuários
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Gerenciamento de Conteúdo</CardTitle>
                <CardDescription>Modere e aprove conteúdos da plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Moderação de Conteúdo</h3>
                  <p className="text-slate-600 mb-4">Aprove, rejeite e gerencie todos os conteúdos enviados</p>
                  <Button className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700">
                    Ver Conteúdos Pendentes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="moderation" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Moderação do Fórum</CardTitle>
                <CardDescription>Gerencie posts reportados e moderação geral</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Moderação Ativa</h3>
                  <p className="text-slate-600 mb-4">Gerencie posts reportados e mantenha a qualidade das discussões</p>
                  <Button className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700">
                    Ver Posts Reportados
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Configurações do Sistema</CardTitle>
                <CardDescription>Gerencie configurações globais da plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Configurações Gerais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700">Nome da Plataforma</label>
                        <p className="text-slate-900 mt-1">Acelera Jovem</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">Versão</label>
                        <p className="text-slate-900 mt-1">v2.1.0</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700">
                      <Settings className="mr-2 h-4 w-4" />
                      Configurações Avançadas
                    </Button>
                    <Button variant="outline">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Relatórios do Sistema
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
