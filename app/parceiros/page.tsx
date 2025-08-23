import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Award, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ParceirosPage() {
  const partners = [
    {
      name: "Universidade Federal de São Paulo",
      type: "Universidade",
      students: "45.000+",
      courses: "120+",
      description: "Parceria em cursos de tecnologia e inovação",
    },
    {
      name: "Instituto Tecnológico de Aeronáutica",
      type: "Instituto",
      students: "12.000+",
      courses: "45+",
      description: "Colaboração em engenharia e ciências exatas",
    },
    {
      name: "Fundação Getúlio Vargas",
      type: "Fundação",
      students: "30.000+",
      courses: "85+",
      description: "Parceria em administração e economia",
    },
  ]

  return (
    <div className="min-h-screen bg-background">


      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Instituições Parceiras</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Conectamos você às melhores instituições de ensino do país
            </p>
            <Link href="/cadastro">
              <Button size="lg">
                Torne-se um Parceiro
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>150+ Instituições</CardTitle>
                <CardDescription>Universidades, faculdades e institutos parceiros em todo o Brasil</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>500K+ Estudantes</CardTitle>
                <CardDescription>Milhares de estudantes conectados através de nossas parcerias</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>1000+ Cursos</CardTitle>
                <CardDescription>Ampla variedade de cursos e especializações disponíveis</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center mb-8">Principais Parceiros</h2>
            {partners.map((partner, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{partner.name}</CardTitle>
                      <CardDescription className="mt-2">{partner.description}</CardDescription>
                    </div>
                    <Badge variant="secondary">{partner.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{partner.students} estudantes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      <span>{partner.courses} cursos</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle>Quer ser nosso parceiro?</CardTitle>
                <CardDescription>
                  Junte-se à nossa rede de instituições parceiras e amplie o alcance da sua instituição
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/contato">
                  <Button>Entre em Contato</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
