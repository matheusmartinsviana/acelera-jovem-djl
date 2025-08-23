"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Users, Clock, BookOpen, Heart } from "lucide-react"
import { useFavorites } from "@/contexts/favorites-context"
import { FavoriteButton } from "@/components/favorite-button"
import { UserMenu } from "@/components/user-menu"

// moved allTracks data back to local scope to fix import error
const allTracks = [
  {
    id: 1,
    title: "Desenvolvimento Web Full Stack",
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
      { title: "Introdução ao React", type: "video", free: true },
      { title: "Node.js Fundamentals", type: "video", free: false },
      { title: "Projeto Prático", type: "slides", free: true },
    ],
    rating: 4.8,
    students: 1250,
    duration: "40h",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "Internet das Coisas (IoT) na Prática",
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
      { title: "Fundamentos de IoT", type: "video", free: true },
      { title: "Programação Arduino", type: "book", free: false },
      { title: "Projeto Smart Home", type: "game", free: true },
    ],
    rating: 4.6,
    students: 890,
    duration: "32h",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "Medicina Digital e Telemedicina",
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
      { title: "Introdução à Medicina Digital", type: "video", free: true },
      { title: "Casos Clínicos Digitais", type: "slides", free: false },
      { title: "Simulador de Diagnóstico", type: "game", free: false },
    ],
    rating: 4.9,
    students: 650,
    duration: "28h",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "Python para Ciência de Dados",
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
      { title: "Python Básico", type: "video", free: true },
      { title: "Análise de Dados", type: "video", free: true },
      { title: "Projeto ML", type: "slides", free: true },
    ],
    rating: 4.7,
    students: 2100,
    duration: "45h",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 5,
    title: "Design UX/UI Moderno",
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
      { title: "Fundamentos de UX", type: "video", free: false },
      { title: "Design System", type: "slides", free: false },
      { title: "Projeto Prático", type: "game", free: false },
    ],
    rating: 4.8,
    students: 1800,
    duration: "35h",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 6,
    title: "Robótica Educacional",
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
      { title: "Introdução à Robótica", type: "video", free: true },
      { title: "Programação LEGO", type: "book", free: true },
      { title: "Projetos Práticos", type: "slides", free: true },
    ],
    rating: 4.5,
    students: 420,
    duration: "25h",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export default function FavoritesPage() {
  const { favorites } = useFavorites()

  // Filter tracks to show only favorites
  const favoriteTracks = allTracks.filter((track) => favorites.includes(track.id))

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
              <a href="/favorites" className="text-indigo-600 font-medium">
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
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Heart className="h-8 w-8 text-red-500 fill-current" />
            <h2 className="text-3xl font-bold text-gray-900">Meus Favoritos</h2>
          </div>
          <p className="text-gray-600">
            {favoriteTracks.length === 0
              ? "Você ainda não tem trilhas favoritas. Explore nossa plataforma e adicione trilhas que interessam você!"
              : `Você tem ${favoriteTracks.length} trilha${favoriteTracks.length !== 1 ? "s" : ""} salva${favoriteTracks.length !== 1 ? "s" : ""} nos seus favoritos.`}
          </p>
        </div>

        {/* Empty State */}
        {favoriteTracks.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-6" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhuma trilha favorita ainda</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Comece explorando nossas trilhas e clique no ícone de coração para salvar suas favoritas aqui.
            </p>
            <div className="space-x-4">
              <Button asChild>
                <a href="/search">Explorar Trilhas</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/">Voltar ao Início</a>
              </Button>
            </div>
          </div>
        ) : (
          /* Favorites Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteTracks.map((track) => (
              <Card key={track.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img src={track.image || "/placeholder.svg"} alt={track.title} className="w-full h-48 object-cover" />
                  <FavoriteButton trackId={track.id} className="absolute top-3 right-3 bg-white/90 hover:bg-white" />
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={track.institution.logo || "/placeholder.svg"}
                      alt={track.institution.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm text-gray-600">{track.institution.name}</span>
                  </div>

                  <CardTitle className="text-xl mb-2">{track.title}</CardTitle>
                  <CardDescription className="text-gray-600 line-clamp-3">{track.description}</CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Professor Info */}
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={track.professor.photo || "/placeholder.svg"}
                      alt={track.professor.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-sm">{track.professor.name}</p>
                      <p className="text-xs text-gray-500">{track.professor.bio}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
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

                  {/* Materials Preview */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Materiais inclusos:</p>
                    <div className="space-y-1">
                      {track.materials.slice(0, 2).map((material, index) => (
                        <div key={index} className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">{material.title}</span>
                          <div className="flex items-center space-x-1">
                            <Badge variant={material.free ? "default" : "secondary"} className="text-xs px-2 py-0">
                              {material.free ? "Gratuito" : "Pago"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                      {track.materials.length > 2 && (
                        <p className="text-xs text-gray-500">+{track.materials.length - 2} mais materiais</p>
                      )}
                    </div>
                  </div>

                  <Button className="w-full">Ver Trilha</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
