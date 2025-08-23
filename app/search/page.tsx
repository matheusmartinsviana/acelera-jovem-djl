"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Users, Clock, BookOpen, Search } from "lucide-react"
import { UserMenu } from "@/components/user-menu"
import { FavoriteButton } from "@/components/favorite-button"
import { useState } from "react"

const allTracks = [
  {
    id: 1,
    title: "Desenvolvimento Web Full Stack",
    slug: "desenvolvimento-web-full-stack",
    description:
      "Aprenda a criar aplicações web completas do zero, desde o frontend até o backend, usando tecnologias modernas como React, Node.js e bancos de dados.",
    institution: { name: "TechEdu Brasil", logo: "/placeholder.svg?height=40&width=40" },
    professor: {
      name: "Ana Silva",
      photo: "/placeholder.svg?height=48&width=48",
      bio: "Desenvolvedora Full Stack com 8 anos de experiência",
    },
    subject: "Tecnologia",
    tags: ["React", "Node.js", "JavaScript", "Full Stack"],
    materials: [
      { title: "Introdução ao React", type: "video", duration: "2h", free: true },
      { title: "Node.js Fundamentals", type: "video", duration: "3h", free: false },
      { title: "Projeto Prático", type: "slides", duration: "1h", free: true },
    ],
    rating: 4.8,
    students: 1250,
    duration: "40h",
    level: "Intermediário",
    price: "R$ 299",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "Internet das Coisas (IoT) na Prática",
    slug: "iot-na-pratica",
    description:
      "Explore o mundo da IoT criando projetos reais com Arduino, sensores e conectividade. Aprenda desde conceitos básicos até implementações avançadas.",
    institution: { name: "Instituto IoT", logo: "/placeholder.svg?height=40&width=40" },
    professor: {
      name: "Carlos Santos",
      photo: "/placeholder.svg?height=48&width=48",
      bio: "Especialista em IoT e Sistemas Embarcados",
    },
    subject: "Engenharia",
    tags: ["IoT", "Arduino", "Sensores", "Conectividade"],
    materials: [
      { title: "Fundamentos de IoT", type: "video", duration: "1.5h", free: true },
      { title: "Programação Arduino", type: "book", duration: "4h", free: false },
      { title: "Projeto Smart Home", type: "game", duration: "2h", free: true },
    ],
    rating: 4.6,
    students: 890,
    duration: "32h",
    level: "Iniciante",
    price: "R$ 199",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "Medicina Digital e Telemedicina",
    slug: "medicina-digital-telemedicina",
    description:
      "Descubra como a tecnologia está revolucionando a medicina. Aprenda sobre prontuários eletrônicos, telemedicina e inteligência artificial na saúde.",
    institution: { name: "MedTech University", logo: "/placeholder.svg?height=40&width=40" },
    professor: {
      name: "Dra. Maria Oliveira",
      photo: "/placeholder.svg?height=48&width=48",
      bio: "Médica e especialista em tecnologia médica",
    },
    subject: "Medicina",
    tags: ["Telemedicina", "IA", "Saúde Digital", "Prontuário Eletrônico"],
    materials: [
      { title: "Introdução à Medicina Digital", type: "video", duration: "2h", free: true },
      { title: "Casos Clínicos Digitais", type: "slides", duration: "3h", free: false },
      { title: "Simulador de Diagnóstico", type: "game", duration: "1h", free: false },
    ],
    rating: 4.9,
    students: 650,
    duration: "28h",
    level: "Avançado",
    price: "R$ 399",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "Python para Ciência de Dados",
    slug: "python-ciencia-dados",
    description:
      "Domine Python aplicado à análise de dados, machine learning e visualização. Trabalhe com pandas, numpy, matplotlib e scikit-learn.",
    institution: { name: "DataScience Academy", logo: "/placeholder.svg?height=40&width=40" },
    professor: {
      name: "Prof. João Costa",
      photo: "/placeholder.svg?height=48&width=48",
      bio: "PhD em Ciência da Computação, especialista em ML",
    },
    subject: "Tecnologia",
    tags: ["Python", "Data Science", "Machine Learning", "Pandas"],
    materials: [
      { title: "Python Básico", type: "video", duration: "3h", free: true },
      { title: "Análise de Dados", type: "video", duration: "4h", free: true },
      { title: "Projeto ML", type: "slides", duration: "2h", free: true },
    ],
    rating: 4.7,
    students: 2100,
    duration: "45h",
    level: "Intermediário",
    price: "R$ 249",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 5,
    title: "Design UX/UI Moderno",
    slug: "design-ux-ui-moderno",
    description:
      "Aprenda os princípios fundamentais do design de experiência do usuário e interface. Crie protótipos e designs que encantam usuários.",
    institution: { name: "Creative Design School", logo: "/placeholder.svg?height=40&width=40" },
    professor: {
      name: "Laura Mendes",
      photo: "/placeholder.svg?height=48&width=48",
      bio: "Designer UX/UI com 10 anos de mercado",
    },
    subject: "Design",
    tags: ["UX", "UI", "Figma", "Prototipagem"],
    materials: [
      { title: "Fundamentos de UX", type: "video", duration: "2.5h", free: false },
      { title: "Design System", type: "slides", duration: "2h", free: false },
      { title: "Projeto Prático", type: "game", duration: "3h", free: false },
    ],
    rating: 4.8,
    students: 1800,
    duration: "35h",
    level: "Intermediário",
    price: "R$ 349",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 6,
    title: "Robótica Educacional",
    slug: "robotica-educacional",
    description:
      "Introdução à robótica usando LEGO Mindstorms e Arduino. Perfeito para educadores e estudantes interessados em robótica.",
    institution: { name: "Instituto IoT", logo: "/placeholder.svg?height=40&width=40" },
    professor: {
      name: "Prof. Roberto Lima",
      photo: "/placeholder.svg?height=48&width=48",
      bio: "Engenheiro mecatrônico e educador",
    },
    subject: "Engenharia",
    tags: ["Robótica", "LEGO", "Arduino", "Educação"],
    materials: [
      { title: "Introdução à Robótica", type: "video", duration: "1.5h", free: true },
      { title: "Programação LEGO", type: "book", duration: "3h", free: true },
      { title: "Projetos Práticos", type: "slides", duration: "2h", free: true },
    ],
    rating: 4.5,
    students: 420,
    duration: "25h",
    level: "Iniciante",
    price: "R$ 179",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 7,
    title: "Inteligência Artificial Aplicada",
    slug: "inteligencia-artificial-aplicada",
    description:
      "Mergulhe no mundo da IA com aplicações práticas em visão computacional, processamento de linguagem natural e deep learning.",
    institution: { name: "DataScience Academy", logo: "/placeholder.svg?height=40&width=40" },
    professor: {
      name: "Prof. João Costa",
      photo: "/placeholder.svg?height=48&width=48",
      bio: "PhD em Ciência da Computação, especialista em ML",
    },
    subject: "Tecnologia",
    tags: ["IA", "Deep Learning", "Computer Vision", "NLP"],
    materials: [
      { title: "Fundamentos de IA", type: "video", duration: "3h", free: true },
      { title: "Redes Neurais", type: "video", duration: "4h", free: false },
      { title: "Projeto Chatbot", type: "slides", duration: "2h", free: false },
    ],
    rating: 4.9,
    students: 1650,
    duration: "50h",
    level: "Avançado",
    price: "R$ 449",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 8,
    title: "Marketing Digital Estratégico",
    slug: "marketing-digital-estrategico",
    description:
      "Domine as estratégias de marketing digital, desde SEO e redes sociais até análise de dados e automação de marketing.",
    institution: { name: "TechEdu Brasil", logo: "/placeholder.svg?height=40&width=40" },
    professor: {
      name: "Carla Rodrigues",
      photo: "/placeholder.svg?height=48&width=48",
      bio: "Especialista em Marketing Digital com 12 anos de experiência",
    },
    subject: "Marketing",
    tags: ["SEO", "Redes Sociais", "Google Ads", "Analytics"],
    materials: [
      { title: "Fundamentos do Marketing Digital", type: "video", duration: "2h", free: true },
      { title: "Estratégias de SEO", type: "video", duration: "3h", free: false },
      { title: "Campanha Prática", type: "slides", duration: "1.5h", free: false },
    ],
    rating: 4.6,
    students: 980,
    duration: "30h",
    level: "Intermediário",
    price: "R$ 279",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")

  const filteredTracks = allTracks
    .filter((track) => {
      const matchesSearch =
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesSubject = selectedSubject === "all" || track.subject === selectedSubject
      const matchesLevel = selectedLevel === "all" || track.level === selectedLevel

      return matchesSearch && matchesSubject && matchesLevel
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "students":
          return b.students - a.students
        case "duration":
          return Number.parseInt(a.duration) - Number.parseInt(b.duration)
        default:
          return 0
      }
    })

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
              <a href="/search" className="text-indigo-600 font-medium">
                Trilhas
              </a>
              <a href="" className="text-gray-700 hover:text-indigo-600 font-medium">
                Favoritos
              </a>
              <a href="/institutions" className="text-gray-700 hover:text-indigo-600 font-medium">
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Explore Nossas Trilhas</h2>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Buscar trilhas por título, descrição ou tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-4">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Área" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as áreas</SelectItem>
                  <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Engenharia">Engenharia</SelectItem>
                  <SelectItem value="Medicina">Medicina</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os níveis</SelectItem>
                  <SelectItem value="Iniciante">Iniciante</SelectItem>
                  <SelectItem value="Intermediário">Intermediário</SelectItem>
                  <SelectItem value="Avançado">Avançado</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevância</SelectItem>
                  <SelectItem value="rating">Avaliação</SelectItem>
                  <SelectItem value="students">Estudantes</SelectItem>
                  <SelectItem value="duration">Duração</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <p className="text-gray-600">
            {filteredTracks.length} trilha{filteredTracks.length !== 1 ? "s" : ""} encontrada
            {filteredTracks.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTracks.map((track) => (
            <Card
              key={track.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <div className="relative">
                <img
                  src={track.image || "/placeholder.svg"}
                  alt={track.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <FavoriteButton trackId={track.id} className="absolute top-3 right-3 bg-white/90 hover:bg-white" />
                <Badge className="absolute top-3 left-3 bg-indigo-600">{track.level}</Badge>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2 mb-2">
                  <img
                    src={track.institution.logo || "/placeholder.svg"}
                    alt={track.institution.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-gray-600">{track.institution.name}</span>
                </div>

                <CardTitle className="text-lg mb-2 group-hover:text-indigo-600 transition-colors">
                  {track.title}
                </CardTitle>
                <CardDescription className="text-gray-600 line-clamp-2">{track.description}</CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Professor */}
                <div className="flex items-center space-x-2 mb-3">
                  <img
                    src={track.professor.photo || "/placeholder.svg"}
                    alt={track.professor.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium">{track.professor.name}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {track.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {track.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{track.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{track.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{track.students}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{track.duration}</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-indigo-600">{track.price}</span>
                  <Button size="sm" asChild>
                    <a href={`/tracks/${track.slug}`}>Ver Trilha</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTracks.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma trilha encontrada</h3>
            <p className="text-gray-600">Tente ajustar seus filtros para encontrar mais resultados.</p>
          </div>
        )}
      </div>
    </div>
  )
}
