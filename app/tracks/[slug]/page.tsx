import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Star, BookOpen, Play, FileText, Gamepad2, ArrowLeft, CheckCircle } from "lucide-react"
import { UserMenu } from "@/components/user-menu"
import { FavoriteButton } from "@/components/favorite-button"
import { notFound } from "next/navigation"

const allTracks = [
  {
    id: 1,
    title: "Desenvolvimento Web Full Stack",
    slug: "desenvolvimento-web-full-stack",
    description:
      "Aprenda a criar aplicações web completas do zero, desde o frontend até o backend, usando tecnologias modernas como React, Node.js e bancos de dados.",
    longDescription:
      "Este curso abrangente de Desenvolvimento Web Full Stack foi projetado para transformar iniciantes em desenvolvedores completos. Você aprenderá desde os fundamentos do HTML, CSS e JavaScript até tecnologias avançadas como React, Node.js, Express e bancos de dados. O curso inclui projetos práticos reais que você pode adicionar ao seu portfólio, preparando-o para o mercado de trabalho. Nossa metodologia hands-on garante que você não apenas aprenda a teoria, mas também desenvolva as habilidades práticas necessárias para construir aplicações web modernas e escaláveis.",
    institution: { name: "TechEdu Brasil", logo: "/placeholder.svg?height=40&width=40" },
    professor: {
      name: "Ana Silva",
      photo: "/placeholder.svg?height=48&width=48",
      bio: "Desenvolvedora Full Stack com 8 anos de experiência",
      fullBio:
        "Ana Silva é uma desenvolvedora Full Stack sênior com mais de 8 anos de experiência em empresas de tecnologia. Formada em Ciência da Computação pela USP, ela trabalhou em startups e grandes corporações, desenvolvendo aplicações web escaláveis. Ana é especialista em React, Node.js e arquitetura de microsserviços, e já treinou mais de 2000 desenvolvedores ao longo de sua carreira como instrutora.",
    },
    subject: "Tecnologia",
    tags: ["React", "Node.js", "JavaScript", "Full Stack", "MongoDB", "Express"],
    materials: [
      {
        title: "Introdução ao React",
        type: "video",
        duration: "2h",
        free: true,
        description: "Fundamentos do React e JSX",
      },
      {
        title: "Node.js Fundamentals",
        type: "video",
        duration: "3h",
        free: false,
        description: "Servidor backend com Node.js",
      },
      {
        title: "Projeto Prático",
        type: "slides",
        duration: "1h",
        free: true,
        description: "Construindo uma aplicação completa",
      },
      {
        title: "Banco de Dados MongoDB",
        type: "video",
        duration: "2.5h",
        free: false,
        description: "Modelagem e operações com MongoDB",
      },
      {
        title: "Deploy e DevOps",
        type: "video",
        duration: "1.5h",
        free: false,
        description: "Publicando sua aplicação",
      },
    ],
    rating: 4.8,
    students: 1250,
    duration: "40h",
    level: "Intermediário",
    price: "R$ 299",
    originalPrice: "R$ 399",
    image: "/placeholder.svg?height=400&width=800",
    prerequisites: ["Conhecimento básico de HTML/CSS", "Lógica de programação", "Familiaridade com JavaScript"],
    whatYouWillLearn: [
      "Desenvolver aplicações web completas do zero",
      "Dominar React para criação de interfaces modernas",
      "Construir APIs RESTful com Node.js e Express",
      "Trabalhar com bancos de dados MongoDB",
      "Implementar autenticação e autorização",
      "Fazer deploy de aplicações em produção",
    ],
    modules: [
      { title: "Fundamentos Web", lessons: 8, duration: "6h" },
      { title: "React Essentials", lessons: 12, duration: "10h" },
      { title: "Backend com Node.js", lessons: 10, duration: "8h" },
      { title: "Banco de Dados", lessons: 6, duration: "5h" },
      { title: "Projeto Final", lessons: 8, duration: "11h" },
    ],
  },
  // ... outros tracks com estrutura similar
]

interface TrackPageProps {
  params: {
    slug: string
  }
}

export default function TrackPage({ params }: TrackPageProps) {
  const track = allTracks.find((t) => t.slug === params.slug)

  if (!track) {
    notFound()
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />
      case "slides":
        return <FileText className="h-4 w-4" />
      case "game":
        return <Gamepad2 className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

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
              <a href="/professors" className="text-gray-700 hover:text-indigo-600 font-medium">
                Professores
              </a>
            </nav>
            <UserMenu />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <a href="/search" className="hover:text-indigo-600 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar às trilhas
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div className="relative">
              <img
                src={track.image || "/placeholder.svg"}
                alt={track.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-end">
                <div className="p-6 text-white">
                  <Badge className="mb-2 bg-indigo-600">{track.level}</Badge>
                  <h1 className="text-3xl font-bold mb-2">{track.title}</h1>
                  <p className="text-lg opacity-90">{track.description}</p>
                </div>
              </div>
            </div>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>Sobre esta trilha</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{track.longDescription}</p>
              </CardContent>
            </Card>

            {/* What you'll learn */}
            <Card>
              <CardHeader>
                <CardTitle>O que você vai aprender</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {track.whatYouWillLearn?.map((item, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Content */}
            <Card>
              <CardHeader>
                <CardTitle>Conteúdo do curso</CardTitle>
                <CardDescription>
                  {track.modules?.length} módulos • {track.materials.length} aulas • {track.duration} de conteúdo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {track.modules?.map((module, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{module.title}</h4>
                        <span className="text-sm text-gray-500">{module.duration}</span>
                      </div>
                      <p className="text-sm text-gray-600">{module.lessons} aulas</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Materials */}
            <Card>
              <CardHeader>
                <CardTitle>Materiais inclusos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {track.materials.map((material, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getTypeIcon(material.type)}
                        <div>
                          <h5 className="font-medium">{material.title}</h5>
                          <p className="text-sm text-gray-600">{material.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{material.duration}</span>
                        <Badge variant={material.free ? "default" : "secondary"}>
                          {material.free ? "Gratuito" : "Premium"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Prerequisites */}
            <Card>
              <CardHeader>
                <CardTitle>Pré-requisitos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {track.prerequisites?.map((prereq, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                      <span>{prereq}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-3xl font-bold text-indigo-600">{track.price}</span>
                    {track.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">{track.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">Acesso vitalício</p>
                </div>

                <div className="space-y-4 mb-6">
                  <Button className="w-full" size="lg">
                    Matricular-se agora
                  </Button>
                  <div className="flex space-x-2">
                    <FavoriteButton trackId={track.id} className="flex-1" />
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Compartilhar
                    </Button>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Stats */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Avaliação</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{track.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Estudantes</span>
                    <span className="font-medium">{track.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Duração</span>
                    <span className="font-medium">{track.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Nível</span>
                    <Badge variant="outline">{track.level}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professor Card */}
            <Card>
              <CardHeader>
                <CardTitle>Instrutor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={track.professor.photo || "/placeholder.svg"}
                    alt={track.professor.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{track.professor.name}</h4>
                    <p className="text-sm text-gray-600">{track.professor.bio}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{track.professor.fullBio}</p>
              </CardContent>
            </Card>

            {/* Institution Card */}
            <Card>
              <CardHeader>
                <CardTitle>Instituição</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <img
                    src={track.institution.logo || "/placeholder.svg"}
                    alt={track.institution.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{track.institution.name}</h4>
                    <Button variant="link" className="p-0 h-auto text-sm">
                      Ver mais trilhas
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
