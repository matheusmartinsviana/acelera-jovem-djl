"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Search, Star } from "lucide-react"
import { UserMenu } from "@/components/user-menu"
import { useState } from "react"

// Mock professors data
const professors = [
  {
    id: 1,
    name: "Ana Silva",
    slug: "ana-silva",
    photo: "/placeholder.svg?height=120&width=120",
    title: "Desenvolvedora Full Stack Senior",
    institution: "TechEdu Brasil",
    bio: "Desenvolvedora Full Stack com 8 anos de experiência em React, Node.js e arquitetura de sistemas. Especialista em desenvolvimento ágil e mentoria técnica.",
    specialties: ["React", "Node.js", "JavaScript", "Full Stack"],
    experience: "8 anos",
    students: 1250,
    tracks: 3,
    rating: 4.8,
    education: "Mestrado em Ciência da Computação - USP",
    featured: true,
  },
  {
    id: 2,
    name: "Carlos Santos",
    slug: "carlos-santos",
    photo: "/placeholder.svg?height=120&width=120",
    title: "Especialista em IoT e Sistemas Embarcados",
    institution: "Instituto IoT",
    bio: "Engenheiro eletrônico com foco em Internet das Coisas e automação industrial. Pioneiro em projetos de smart cities e indústria 4.0.",
    specialties: ["IoT", "Arduino", "Sensores", "Automação"],
    experience: "12 anos",
    students: 890,
    tracks: 4,
    rating: 4.6,
    education: "PhD em Engenharia Eletrônica - UNICAMP",
    featured: true,
  },
  {
    id: 3,
    name: "Dra. Maria Oliveira",
    slug: "maria-oliveira",
    photo: "/placeholder.svg?height=120&width=120",
    title: "Médica e Especialista em Tecnologia Médica",
    institution: "MedTech University",
    bio: "Médica cardiologista com especialização em medicina digital. Pesquisadora em telemedicina e inteligência artificial aplicada à saúde.",
    specialties: ["Telemedicina", "IA em Saúde", "Medicina Digital"],
    experience: "15 anos",
    students: 650,
    tracks: 2,
    rating: 4.9,
    education: "Doutorado em Medicina - FMUSP",
    featured: true,
  },
  {
    id: 4,
    name: "Prof. João Costa",
    slug: "joao-costa",
    photo: "/placeholder.svg?height=120&width=120",
    title: "PhD em Ciência da Computação",
    institution: "DataScience Academy",
    bio: "Professor universitário e pesquisador em machine learning e ciência de dados. Autor de diversos artigos científicos sobre IA.",
    specialties: ["Python", "Machine Learning", "Data Science"],
    experience: "10 anos",
    students: 2100,
    tracks: 5,
    rating: 4.7,
    education: "PhD em Ciência da Computação - MIT",
    featured: false,
  },
  {
    id: 5,
    name: "Laura Mendes",
    slug: "laura-mendes",
    photo: "/placeholder.svg?height=120&width=120",
    title: "Designer UX/UI Senior",
    institution: "Creative Design School",
    bio: "Designer com 10 anos de experiência em grandes empresas de tecnologia. Especialista em design systems e pesquisa com usuários.",
    specialties: ["UX", "UI", "Figma", "Design Systems"],
    experience: "10 anos",
    students: 1800,
    tracks: 6,
    rating: 4.8,
    education: "Mestrado em Design - ESDI/UERJ",
    featured: false,
  },
  {
    id: 6,
    name: "Prof. Roberto Lima",
    slug: "roberto-lima",
    photo: "/placeholder.svg?height=120&width=120",
    title: "Engenheiro Mecatrônico e Educador",
    institution: "Instituto IoT",
    bio: "Engenheiro mecatrônico especializado em robótica educacional. Desenvolve metodologias inovadoras para ensino de STEM.",
    specialties: ["Robótica", "LEGO", "Arduino", "Educação"],
    experience: "7 anos",
    students: 420,
    tracks: 2,
    rating: 4.5,
    education: "Mestrado em Engenharia Mecatrônica - ITA",
    featured: false,
  },
]

export default function ProfessorsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProfessors = professors.filter(
    (professor) =>
      professor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      professor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      professor.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      professor.specialties.some((specialty) => specialty.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">EduTracks</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-700 hover:text-indigo-600 font-medium">
                Início
              </a>
              <a href="/search" className="text-gray-700 hover:text-indigo-600 font-medium">
                Trilhas
              </a>
              <a href="/favorites" className="text-gray-700 hover:text-indigo-600 font-medium">
                Favoritos
              </a>
              <a href="/institutions" className="text-gray-700 hover:text-indigo-600 font-medium">
                Instituições
              </a>
              <a href="/professors" className="text-indigo-600 font-medium">
                Professores
              </a>
            </nav>
            <UserMenu />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossos Professores</h2>
          <p className="text-gray-600 mb-6">
            Conheça os especialistas que criam e ministram as trilhas de aprendizado em nossa plataforma.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Buscar professores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-indigo-600 mb-2">{professors.length}</div>
              <div className="text-sm text-gray-600">Professores</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-indigo-600 mb-2">
                {professors.reduce((sum, prof) => sum + prof.students, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Estudantes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-indigo-600 mb-2">
                {professors.reduce((sum, prof) => sum + prof.tracks, 0)}
              </div>
              <div className="text-sm text-gray-600">Trilhas</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-indigo-600 mb-2">
                {(professors.reduce((sum, prof) => sum + prof.rating, 0) / professors.length).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Avaliação Média</div>
            </CardContent>
          </Card>
        </div>

        {/* Professors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfessors.map((professor) => (
            <Card key={professor.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={professor.photo || "/placeholder.svg"}
                    alt={professor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <CardTitle className="text-xl">{professor.name}</CardTitle>
                    <div className="text-sm text-gray-600">{professor.title}</div>
                    <div className="text-sm text-indigo-600">{professor.institution}</div>
                  </div>
                </div>
                <CardDescription className="text-gray-600 line-clamp-3">{professor.bio}</CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Specialties */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {professor.specialties.slice(0, 3).map((specialty) => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                    {professor.specialties.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{professor.specialties.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{professor.students.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Estudantes</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{professor.tracks}</div>
                    <div className="text-xs text-gray-500">Trilhas</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-semibold text-gray-900">{professor.rating}</span>
                    </div>
                    <div className="text-xs text-gray-500">Avaliação</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{professor.experience} de experiência</span>
                  {professor.featured && (
                    <Badge variant="secondary" className="text-xs">
                      Destaque
                    </Badge>
                  )}
                </div>

                <Button className="w-full" asChild>
                  <a href={`/professors/${professor.slug}`}>Ver Perfil</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProfessors.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum professor encontrado</h3>
            <p className="text-gray-600">Tente ajustar sua busca para encontrar mais resultados.</p>
          </div>
        )}
      </div>
    </div>
  )
}
