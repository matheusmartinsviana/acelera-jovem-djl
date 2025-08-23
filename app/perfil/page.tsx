"use client"

import { useAuth } from "@/contexts/auth-context"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Trophy, BookOpen, Calendar } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface UserProfile {
  bio: string
  location: string
  website: string
  joinDate: string
  interests: string[]
}

export default function PerfilPage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile>({
    bio: "",
    location: "",
    website: "",
    joinDate: "2024-01-01",
    interests: [],
  })
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const userId = user?.id || "guest"
    const savedProfile = localStorage.getItem(`eduplatform-profile-${userId}`)
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    } else {
      const defaultProfile: UserProfile = {
        bio: "Estudante apaixonado por tecnologia e aprendizado contínuo.",
        location: "Brasil",
        website: "",
        joinDate: "2024-01-01",
        interests: ["JavaScript", "React", "Design"],
      }
      setProfile(defaultProfile)
      localStorage.setItem(`eduplatform-profile-${userId}`, JSON.stringify(defaultProfile))
    }
  }, [user])

  const handleSaveProfile = () => {
    const userId = user?.id || "guest"
    localStorage.setItem(`eduplatform-profile-${userId}`, JSON.stringify(profile))
    setIsEditing(false)
  }

  const displayUser = user || {
    name: "Usuário Visitante",
    email: "visitante@exemplo.com",
    role: "student",
    avatar: "/placeholder.svg",
  }

  const initials = displayUser.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="min-h-screen bg-background">


      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={displayUser.avatar || "/placeholder.svg"} alt={displayUser.name} />
                  <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-foreground">{displayUser.name}</h1>
                  <p className="text-muted-foreground mb-2">{displayUser.email}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Membro desde {new Date(profile.joinDate).toLocaleDateString("pt-BR")}
                    </div>
                    <Badge variant="secondary" className="capitalize">
                      {displayUser.role === "student" ? "Aluno" : displayUser.role}
                    </Badge>
                  </div>
                </div>

                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {isEditing ? "Salvar" : "Editar Perfil"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="courses">Cursos</TabsTrigger>
              <TabsTrigger value="achievements">Conquistas</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sobre</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <Textarea
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        placeholder="Conte um pouco sobre você..."
                        className="min-h-[100px]"
                      />
                    ) : (
                      <p className="text-muted-foreground">{profile.bio || "Nenhuma biografia adicionada."}</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Informações</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Localização</Label>
                      {isEditing ? (
                        <Input
                          value={profile.location}
                          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                          placeholder="Sua localização"
                        />
                      ) : (
                        <p className="text-muted-foreground">{profile.location || "Não informado"}</p>
                      )}
                    </div>

                    <div>
                      <Label>Website</Label>
                      {isEditing ? (
                        <Input
                          value={profile.website}
                          onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                          placeholder="https://seusite.com"
                        />
                      ) : (
                        <p className="text-muted-foreground">
                          {profile.website ? (
                            <a
                              href={profile.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary"
                            >
                              {profile.website}
                            </a>
                          ) : (
                            "Não informado"
                          )}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Interesses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                    {profile.interests.length === 0 && (
                      <p className="text-muted-foreground">Nenhum interesse adicionado.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses">
              <Card>
                <CardHeader>
                  <CardTitle>Meus Cursos</CardTitle>
                  <CardDescription>Cursos que você está fazendo ou já completou</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">Seus cursos aparecerão aqui</p>
                    <Link href="/conteudos-freemium">
                      <Button>Explorar Cursos</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle>Conquistas</CardTitle>
                  <CardDescription>Suas conquistas e marcos de aprendizado</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">Suas conquistas aparecerão aqui</p>
                    <Link href="/dashboard">
                      <Button>Ver Dashboard</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações da Conta</CardTitle>
                  <CardDescription>Gerencie suas preferências e configurações</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Nome</Label>
                    <Input value={displayUser.name} disabled />
                  </div>

                  <div>
                    <Label>Email</Label>
                    <Input value={displayUser.email} disabled />
                  </div>

                  <div>
                    <Label>Tipo de Conta</Label>
                    <Input value={displayUser.role === "student" ? "Aluno" : displayUser.role} disabled />
                  </div>

                  <div className="pt-4">
                    <Button variant="destructive">Excluir Conta</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
