"use client"

import type React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Rocket, Target, Users, Trophy, Clock, Star, ArrowRight, Calendar, MapPin, Phone, Mail } from "lucide-react"

const programBenefits = [
  {
    icon: Target,
    title: "Foco no Mercado",
    description: "Cursos direcionados para as demandas atuais do mercado de trabalho",
  },
  {
    icon: Users,
    title: "Mentoria Especializada",
    description: "Acompanhamento individual com profissionais experientes",
  },
  {
    icon: Trophy,
    title: "Certificação Reconhecida",
    description: "Certificados validados por empresas parceiras",
  },
  {
    icon: Rocket,
    title: "Aceleração de Carreira",
    description: "Programa intensivo para resultados rápidos",
  },
]

const courses = [
  {
    id: 1,
    title: "Desenvolvimento Full Stack",
    description: "Aprenda React, Node.js, bancos de dados e deploy em 12 semanas",
    duration: "12 semanas",
    level: "Iniciante",
    spots: 25,
    startDate: "15 de Março",
    image: "/javascript-course.png",
    featured: true,
  },
  {
    id: 2,
    title: "Data Science & Analytics",
    description: "Python, Machine Learning, visualização de dados e estatística",
    duration: "16 semanas",
    level: "Intermediário",
    spots: 20,
    startDate: "22 de Março",
    image: "/python-data-science.png",
    featured: true,
  },
  {
    id: 3,
    title: "UX/UI Design",
    description: "Design thinking, prototipagem, Figma e pesquisa com usuários",
    duration: "10 semanas",
    level: "Iniciante",
    spots: 30,
    startDate: "29 de Março",
    image: "/ux-ui-design-course.png",
    featured: false,
  },
  {
    id: 4,
    title: "Marketing Digital",
    description: "SEO, redes sociais, Google Ads e análise de métricas",
    duration: "8 semanas",
    level: "Iniciante",
    spots: 35,
    startDate: "5 de Abril",
    image: "/digital-marketing-strategy.png",
    featured: false,
  },
]

const testimonials = [
  {
    name: "Ana Silva",
    role: "Desenvolvedora Full Stack",
    company: "TechCorp",
    content: "O Acelera Jovem mudou minha vida! Em 3 meses consegui meu primeiro emprego na área de tecnologia.",
    rating: 5,
  },
  {
    name: "Carlos Santos",
    role: "Data Analyst",
    company: "DataInsights",
    content: "Programa incrível! A mentoria personalizada fez toda a diferença no meu aprendizado.",
    rating: 5,
  },
  {
    name: "Maria Oliveira",
    role: "UX Designer",
    company: "DesignStudio",
    content: "Metodologia prática e professores experientes. Recomendo para quem quer acelerar a carreira!",
    rating: 5,
  },
]

export default function AceleraJovemPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simular envio do formulário
    alert("Inscrição enviada com sucesso! Entraremos em contato em breve.")
    setFormData({
      name: "",
      email: "",
      phone: "",
      course: "",
      message: "",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-orange-100 text-orange-800 border-orange-200 px-4 py-2">
              <Rocket className="h-4 w-4 mr-2" />
              Programa de Aceleração
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Acelera{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Jovem</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Transforme sua carreira em tempo recorde com nosso programa intensivo de capacitação profissional
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
                Inscreva-se Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 bg-transparent">
                Saiba Mais
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Por que escolher o Acelera Jovem?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Um programa completo pensado para acelerar sua entrada no mercado de trabalho
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programBenefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Cursos Disponíveis</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Escolha o curso que mais se alinha com seus objetivos profissionais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course) => (
              <Card
                key={course.id}
                className={`hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden ${course.featured ? "ring-2 ring-blue-500" : ""}`}
              >
                {course.featured && (
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-2">
                    <span className="text-sm font-semibold">✨ Mais Procurado</span>
                  </div>
                )}

                <div className="relative">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-gray-700">{course.level}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {course.spots} vagas
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <CardDescription className="text-gray-600">{course.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Início: {course.startDate}
                    </div>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Inscrever-se
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Histórias de Sucesso</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Veja como o Acelera Jovem transformou a carreira dos nossos alunos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>
                    {testimonial.role} • {testimonial.company}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Pronto para acelerar sua carreira?</h2>
              <p className="text-xl text-blue-100">Preencha o formulário e nossa equipe entrará em contato</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-6">Entre em Contato</h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-blue-200" />
                    <span>(11) 9999-9999</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-200" />
                    <span>acelera@eduplatform.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-200" />
                    <span>São Paulo, SP - Brasil</span>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-4">Próximas Turmas</h4>
                  <div className="space-y-2 text-blue-100">
                    <p>• Desenvolvimento Full Stack - 15/03</p>
                    <p>• Data Science - 22/03</p>
                    <p>• UX/UI Design - 29/03</p>
                    <p>• Marketing Digital - 05/04</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Inscreva-se Agora</CardTitle>
                  <CardDescription>Preencha seus dados e escolha o curso de interesse</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        name="name"
                        placeholder="Seu nome completo"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="border-gray-200 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Seu e-mail"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="border-gray-200 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <Input
                        name="phone"
                        placeholder="Seu telefone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="border-gray-200 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <select
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Escolha um curso</option>
                        <option value="fullstack">Desenvolvimento Full Stack</option>
                        <option value="datascience">Data Science & Analytics</option>
                        <option value="uxui">UX/UI Design</option>
                        <option value="marketing">Marketing Digital</option>
                      </select>
                    </div>

                    <div>
                      <Textarea
                        name="message"
                        placeholder="Conte-nos sobre seus objetivos (opcional)"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="border-gray-200 focus:border-blue-500"
                        rows={3}
                      />
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      Enviar Inscrição
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
