import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Target, Award } from "lucide-react"

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-background">


      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Sobre a Acelera Jovem</h1>
            <p className="text-xl text-muted-foreground">
              Transformando a educação através da tecnologia e conectando pessoas ao conhecimento
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <Target className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Nossa Missão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Democratizar o acesso à educação de qualidade, conectando estudantes, professores e instituições em
                  uma plataforma integrada que promove o aprendizado colaborativo e contínuo.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Nossa Visão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ser a principal plataforma educacional do Brasil, reconhecida pela excelência em conteúdo, inovação
                  tecnológica e impacto positivo na vida de milhões de estudantes.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Conteúdo de Qualidade</CardTitle>
                <CardDescription>
                  Materiais desenvolvidos por especialistas e validados pela comunidade acadêmica
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Comunidade Ativa</CardTitle>
                <CardDescription>
                  Milhares de estudantes, professores e instituições conectados em nossa rede
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Resultados Comprovados</CardTitle>
                <CardDescription>
                  Metodologia baseada em dados que acelera o aprendizado e melhora os resultados
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
