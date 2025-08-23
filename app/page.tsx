import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, MessageSquare, ArrowRight, Star, TrendingUp, Award } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-indigo-950/20"></div>
        <div className="relative container mx-auto text-center animate-fade-in">
          {/* <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-yellow-400 text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2" color="currentColor" />
            Plataforma #1 em Educação Digital
          </div> */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Acelera Jovem
            <span className="gradient-text block">Educação Digital</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Conecte-se com conteúdos premium, participe de fóruns interativos e acelere seu aprendizado com nossa trilha
            de ensino personalizada. Transforme sua carreira com educação de qualidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/cadastro">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Começar Agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/conteudos-freemium">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-700 dark:hover:bg-blue-950/30 bg-transparent"
              >
                Explorar Conteúdos
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">10k+</div>
              <div className="text-sm text-muted-foreground">Estudantes Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">500+</div>
              <div className="text-sm text-muted-foreground">Cursos Disponíveis</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400">95%</div>
              <div className="text-sm text-muted-foreground">Taxa de Satisfação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Recursos da Plataforma</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubra todas as ferramentas que tornam nossa plataforma única e eficaz para seu aprendizado
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 dark:bg-gray-900/5 backdrop-blur-sm">
              <CardHeader className="pb-8">
                <div className="relative pb-5">
                  <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-full w-20 h-20 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"></div>
                  <BookOpen className="relative h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4 z-10" />
                </div>
                <CardTitle className="text-xl mb-3">Conteúdos Premium</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Acesse materiais exclusivos e conteúdos freemium de alta qualidade criados por especialistas da
                  indústria
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 dark:bg-gray-900/5 backdrop-blur-sm">
              <CardHeader className="pb-8">
                <div className="relative pb-5">
                  <div className="absolute inset-0 bg-purple-100 dark:bg-purple-900/30 rounded-full w-20 h-20 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"></div>
                  <MessageSquare className="relative h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4 z-10" />
                </div>
                <CardTitle className="text-xl mb-3">Fórum Interativo</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Participe de discussões enriquecedoras e tire dúvidas com outros estudantes e professores
                  especialistas
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 dark:bg-gray-900/5 backdrop-blur-sm">
              <CardHeader className="pb-8">
                <div className="relative pb-5">
                  <div className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/30 rounded-full w-20 h-20 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"></div>
                  <Users className="relative h-12 w-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-4 z-10" />
                </div>
                <CardTitle className="text-xl mb-3">Rede de Parceiros</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Conecte-se com instituições parceiras renomadas e amplie suas oportunidades profissionais
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Por que escolher nossa plataforma?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Aprendizado Acelerado</h3>
                    <p className="text-muted-foreground">
                      Metodologia comprovada que acelera seu processo de aprendizado em até 3x
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Certificação Reconhecida</h3>
                    <p className="text-muted-foreground">
                      Certificados válidos e reconhecidos pelo mercado de trabalho
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Comunidade Ativa</h3>
                    <p className="text-muted-foreground">
                      Faça parte de uma comunidade engajada de mais de 10 mil estudantes
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative pb-5">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <BookOpen className="w-24 h-24 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">Sua jornada educacional começa aqui</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para começar sua jornada?</h2>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Junte-se a milhares de estudantes que já estão acelerando seu aprendizado e transformando suas carreiras
          </p>
          <Link href="/cadastro">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Cadastre-se Gratuitamente
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">Acelera Jovem</span>
              </div>
              <p className="text-muted-foreground">Transformando a educação através da tecnologia</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Plataforma</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/conteudos-freemium" className="hover:text-primary">
                    Conteúdos
                  </Link>
                </li>
                <li>
                  <Link href="/forum" className="hover:text-primary">
                    Fórum
                  </Link>
                </li>
                <li>
                  <Link href="/trilha-ensino" className="hover:text-primary">
                    Trilhas
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/sobre" className="hover:text-primary">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link href="/contato" className="hover:text-primary">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link href="/parceiros" className="hover:text-primary">
                    Parceiros
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/privacidade" className="hover:text-primary">
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/termos" className="hover:text-primary">
                    Termos
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Acelera Jovem. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
