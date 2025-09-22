"use client"

import { Roadmap } from "@/components/Roadmap"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { sampleContents } from "@/lib/contents"
import { Content } from "@/types/IContent"
import { ArrowRight, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

// COMPONENTE DE SKELETON
function TrailSkeleton() {
    return (
        <div className="animate-pulse space-y-8">
            {/* Hero Skeleton */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12 px-6 rounded-b-2xl">
                <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8">
                    <div className="w-[400px] h-[250px] bg-gray-300 rounded-xl" />
                    <div className="flex-1 space-y-4">
                        <div className="h-8 w-2/3 bg-gray-300 rounded" />
                        <div className="h-4 w-full bg-gray-300 rounded" />
                        <div className="flex space-x-3">
                            <div className="h-6 w-20 bg-gray-300 rounded-full" />
                            <div className="h-6 w-14 bg-gray-300 rounded-full" />
                            <div className="h-6 w-12 bg-gray-300 rounded-full" />
                        </div>
                        <div className="h-10 w-40 bg-gray-300 rounded" />
                    </div>
                </div>
            </div>

            {/* Stats Skeleton */}
            <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i}>
                        <CardContent className="py-6 flex flex-col items-center space-y-2">
                            <div className="h-6 w-12 bg-gray-300 rounded" />
                            <div className="h-4 w-20 bg-gray-200 rounded" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Cursos Skeleton */}
            <div className="container mx-auto space-y-6">
                <div className="h-6 w-1/3 bg-gray-300 rounded" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <Card key={i} className="p-4 space-y-3">
                            <div className="h-5 w-1/2 bg-gray-300 rounded" />
                            <div className="h-4 w-full bg-gray-200 rounded" />
                            <div className="flex space-x-2">
                                <div className="h-6 w-16 bg-gray-200 rounded-full" />
                                <div className="h-6 w-10 bg-gray-200 rounded-full" />
                            </div>
                            <div className="h-2 w-full bg-gray-200 rounded" />
                            <div className="h-8 w-24 bg-gray-300 rounded" />
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default function TrailDetailPage() {
    const { id } = useParams()
    const [trail, setTrail] = useState<Content | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulando delay de carregamento
        setTimeout(() => {
            const found = sampleContents.find((t) => t.id === id)
            if (found) setTrail(found)
            setLoading(false)
        }, 1000)
    }, [id])

    if (loading) return <TrailSkeleton />
    if (!trail) return <p className="text-center py-10">Trilha não encontrada</p>

    return (
        <div className="bg-background">
            {/* Hero */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12 px-6 rounded-b-2xl">
                <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8">
                    <Image
                        src={trail.thumbnail}
                        alt={trail.title}
                        width={400}
                        height={250}
                        className="rounded-xl shadow-lg"
                    />
                    <div className="flex-1 space-y-4">
                        <h1 className="text-4xl font-bold">{trail.title}</h1>
                        <p className="opacity-90">{trail.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                            <Badge variant="secondary">{trail.level}</Badge>
                            <span>{trail.duration}</span>
                            <span className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                {trail.rating}
                            </span>
                        </div>
                        <p className="text-sm">
                            Instrutor: <span className="font-medium">{trail.instructor}</span> · {trail.institution}
                        </p>
                        <Button size="lg" asChild className="bg-white text-black hover:bg-gray-100">
                            <Link href="#courses">Quero Estudar</Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="container mx-auto py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">{trail.duration}</CardTitle>
                    </CardHeader>
                    <CardContent>Para conclusão</CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">{trail.courses?.length}</CardTitle>
                    </CardHeader>
                    <CardContent>Cursos</CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">12</CardTitle>
                    </CardHeader>
                    <CardContent>Vídeos extras</CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">10</CardTitle>
                    </CardHeader>
                    <CardContent>Artigos</CardContent>
                </Card>
            </div>

            {/* O que você vai aprender */}
            <div className="container mx-auto py-10 space-y-4">
                <h2 className="text-2xl font-semibold">O que você vai aprender?</h2>
                <p className="text-muted-foreground">
                    Com esta trilha você vai do básico ao avançado, dominando desde lógica de programação até práticas avançadas.
                </p>
                <Progress value={calcTrailProgress(trail.courses || [])} />
                <p className="text-sm text-muted-foreground mt-2">
                    {trail.courses?.filter((c) => c.progress === 100).length} de {trail.courses?.length} cursos concluídos
                </p>
            </div>

            <Roadmap
                steps={[
                    {
                        id: 1,
                        title: "Primeiros passos",
                        description: "Lógica, Git e fundamentos",
                        completed: true,
                    },
                    {
                        id: 2,
                        title: "APIs em Java",
                        description: "Criação de APIs com Spring Boot",
                    },
                    {
                        id: 3,
                        title: "Arquitetura avançada",
                        description: "Microsserviços, mensageria e boas práticas",
                    },
                ]}
            />

            {/* Passo a passo */}
            <div className="bg-muted py-10">
                <div className="container mx-auto space-y-6">
                    <h2 className="text-2xl font-semibold">Passo a passo</h2>
                    <ol className="list-decimal list-inside space-y-4">
                        <li><strong>Primeiros passos</strong> – lógica, Git e fundamentos</li>
                        <li><strong>APIs</strong> – crie aplicações com Spring Boot</li>
                        <li><strong>Arquitetura</strong> – microsserviços, mensageria e boas práticas</li>
                    </ol>
                </div>
            </div>

            {/* Cursos */}
            <div id="courses" className="container mx-auto py-10 space-y-6">
                <h2 className="text-2xl font-semibold">Cursos da Trilha</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {trail.courses?.map((course) => (
                        <Card key={course.id} className="hover:shadow-md transition">
                            <CardHeader>
                                <CardTitle>{course.title}</CardTitle>
                                <CardDescription>{course.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center space-x-2 mb-2">
                                    <Badge>{course.level}</Badge>
                                    <span className="text-sm text-muted-foreground">{course.duration}</span>
                                </div>
                                <Progress value={course.progress} className="mb-2" />
                                <Link href={`/conteudo/${course.id}`}>
                                    <Button size="sm">
                                        {course.progress > 0 ? "Continuar" : "Começar"}
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Instrutores */}
            <div className="container mx-auto py-10 space-y-4">
                <h2 className="text-2xl font-semibold">Com quem você vai aprender</h2>
                <div className="flex flex-wrap gap-6">
                    {trail.instructors?.map((instructor, i) => (
                        <div key={i} className="p-4 border rounded-lg w-56 h-auto text-center flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center mb-3 bg-gray-100">
                                <Image src={instructor.avatar || "/prof1.png"} alt={instructor.name} width={96} height={96} className="rounded-full object-cover w-full h-full" />
                            </div>
                            <p className="font-medium">{instructor.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Final */}
            <div className="bg-primary text-white py-10">
                <div className="container mx-auto text-center space-y-4">
                    <h2 className="text-2xl font-bold">Comece essa formação agora mesmo 🚀</h2>
                    <p>Acesse todo o conteúdo e prepare-se para seu próximo projeto!</p>
                    <Button size="lg" variant="secondary" asChild>
                        <Link href="/planos">Conheça os Planos</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

/* Função auxiliar */
function calcTrailProgress(courses: { progress: number }[]): number {
    if (!courses.length) return 0
    const total = courses.reduce((acc, c) => acc + c.progress, 0)
    return Math.round(total / courses.length)
}
