"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Search, MapPin } from "lucide-react"
import { UserMenu } from "@/components/user-menu"
import { useState } from "react"

// Mock institutions data
const institutions = [
  {
    id: 1,
    name: "TechEdu Brasil",
    slug: "techedu-brasil",
    logo: "/placeholder.svg?height=80&width=80",
    description:
      "Líder em educação tecnológica no Brasil, oferecendo cursos de programação, desenvolvimento web e ciência de dados.",
    location: "São Paulo, SP",
    founded: 2018,
    students: 15000,
    professors: 45,
    tracks: 28,
    specialties: ["Tecnologia", "Programação", "Data Science"],
    featured: true,
  },
  {
    id: 2,
    name: "Instituto IoT",
    slug: "instituto-iot",
    logo: "/placeholder.svg?height=80&width=80",
    description:
      "Especializado em Internet das Coisas e sistemas embarcados, formando profissionais para a indústria 4.0.",
    location: "Campinas, SP",
    founded: 2020,
    students: 8500,
    professors: 22,
    tracks: 15,
    specialties: ["IoT", "Engenharia", "Automação"],
    featured: true,
  },
  {
    id: 3,
    name: "MedTech University",
    slug: "medtech-university",
    logo: "/placeholder.svg?height=80&width=80",
    description:
      "Pioneira em medicina digital e telemedicina, conectando tecnologia e saúde para o futuro da medicina.",
    location: "Rio de Janeiro, RJ",
    founded: 2019,
    students: 5200,
    professors: 18,
    tracks: 12,
    specialties: ["Medicina", "Saúde Digital", "Telemedicina"],
    featured: true,
  },
  {
    id: 4,
    name: "DataScience Academy",
    slug: "datascience-academy",
    logo: "/placeholder.svg?height=80&width=80",
    description: "Academia especializada em ciência de dados, machine learning e inteligência artificial.",
    location: "Belo Horizonte, MG",
    founded: 2017,
    students: 12000,
    professors: 35,
    tracks: 22,
    specialties: ["Data Science", "Machine Learning", "IA"],
    featured: false,
  },
  {
    id: 5,
    name: "Creative Design School",
    slug: "creative-design-school",
    logo: "/placeholder.svg?height=80&width=80",
    description: "Escola de design focada em UX/UI, design gráfico e experiência do usuário.",
    location: "Porto Alegre, RS",
    founded: 2021,
    students: 3800,
    professors: 15,
    tracks: 18,
    specialties: ["Design", "UX/UI", "Design Gráfico"],
    featured: false,
  },
]

export default function InstitutionsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredInstitutions = institutions.filter(
    (institution) =>
      institution.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      institution.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      institution.specialties.some((specialty) => specialty.toLowerCase().includes(searchQuery.toLowerCase())),
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
              <a href="/institutions" className="text-indigo-600 font-medium">
                Instituições
              </a>
              <a href="/professors" className="text-gray-700 hover:text-indigo-600 font-medium">
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Instituições Parceiras</h2>
          <p className="text-gray-600 mb-6">
            Conheça as instituições de ensino que fazem parte da nossa plataforma e oferecem as melhores trilhas de
            aprendizado.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Buscar instituições..."
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
              <div className="text-2xl font-bold text-indigo-600 mb-2">{institutions.length}</div>
              <div className="text-sm text-gray-600">Instituições</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-indigo-600 mb-2">
                {institutions.reduce((sum, inst) => sum + inst.students, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Estudantes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-indigo-600 mb-2">
                {institutions.reduce((sum, inst) => sum + inst.professors, 0)}
              </div>
              <div className="text-sm text-gray-600">Professores</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-indigo-600 mb-2">
                {institutions.reduce((sum, inst) => sum + inst.tracks, 0)}
              </div>
              <div className="text-sm text-gray-600">Trilhas</div>
            </CardContent>
          </Card>
        </div>

        {/* Institutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstitutions.map((institution) => (
            <Card key={institution.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={institution.logo || "/placeholder.svg"}
                    alt={institution.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <CardTitle className="text-xl">{institution.name}</CardTitle>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {institution.location}
                    </div>
                  </div>
                </div>
                <CardDescription className="text-gray-600">{institution.description}</CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Specialties */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {institution.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{institution.students.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Estudantes</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{institution.professors}</div>
                    <div className="text-xs text-gray-500">Professores</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{institution.tracks}</div>
                    <div className="text-xs text-gray-500">Trilhas</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>Fundada em {institution.founded}</span>
                  {institution.featured && (
                    <Badge variant="secondary" className="text-xs">
                      Destaque
                    </Badge>
                  )}
                </div>

                <Button className="w-full" asChild>
                  <a href={`/institutions/${institution.slug}`}>Ver Instituição</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredInstitutions.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma instituição encontrada</h3>
            <p className="text-gray-600">Tente ajustar sua busca para encontrar mais resultados.</p>
          </div>
        )}
      </div>
    </div>
  )
}
