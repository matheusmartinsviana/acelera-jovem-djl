import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-background">


      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Termos de Uso</h1>
            <p className="text-xl text-muted-foreground">Última atualização: Janeiro de 2024</p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Aceitação dos Termos</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Ao acessar e usar a Acelera Jovem, você concorda em cumprir estes Termos de Uso. Se você não concordar
                  com qualquer parte destes termos, não deve usar nossos serviços.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Descrição do Serviço</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  A Acelera Jovemé uma plataforma educacional que conecta estudantes, professores e instituições,
                  oferecendo conteúdos, fóruns de discussão e ferramentas de aprendizado.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Cadastro e Conta</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <ul>
                  <li>Você deve fornecer informações precisas e atualizadas</li>
                  <li>É responsável pela segurança de sua conta e senha</li>
                  <li>Deve notificar imediatamente sobre uso não autorizado</li>
                  <li>Não pode transferir sua conta para terceiros</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Uso Aceitável</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>Você concorda em NÃO:</p>
                <ul>
                  <li>Usar a plataforma para fins ilegais ou não autorizados</li>
                  <li>Publicar conteúdo ofensivo, difamatório ou inadequado</li>
                  <li>Interferir no funcionamento da plataforma</li>
                  <li>Tentar acessar contas de outros usuários</li>
                  <li>Fazer engenharia reversa do software</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Propriedade Intelectual</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Todo o conteúdo da plataforma, incluindo textos, gráficos, logos e software, é propriedade da
                  Acelera Jovemou de seus licenciadores e está protegido por leis de direitos autorais.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Limitação de Responsabilidade</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  A Acelera Jovemnão será responsável por danos indiretos, incidentais ou consequenciais decorrentes do
                  uso da plataforma.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Modificações</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Reservamos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor
                  imediatamente após a publicação.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Contato</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Para questões sobre estes termos, entre em contato:
                  <strong> legal@acelerajovem.com.br</strong>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
