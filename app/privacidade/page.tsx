import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-background">


      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Política de Privacidade</h1>
            <p className="text-xl text-muted-foreground">Última atualização: Janeiro de 2024</p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Informações que Coletamos</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>Coletamos informações que você nos fornece diretamente, como:</p>
                <ul>
                  <li>Dados de cadastro (nome, email, telefone)</li>
                  <li>Informações de perfil educacional</li>
                  <li>Conteúdo que você cria ou compartilha</li>
                  <li>Comunicações conosco</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Como Usamos suas Informações</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>Utilizamos suas informações para:</p>
                <ul>
                  <li>Fornecer e melhorar nossos serviços</li>
                  <li>Personalizar sua experiência de aprendizado</li>
                  <li>Comunicar sobre atualizações e novidades</li>
                  <li>Garantir a segurança da plataforma</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Compartilhamento de Informações</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>Não vendemos suas informações pessoais. Podemos compartilhar dados apenas:</p>
                <ul>
                  <li>Com seu consentimento explícito</li>
                  <li>Com instituições parceiras (quando aplicável)</li>
                  <li>Para cumprir obrigações legais</li>
                  <li>Para proteger nossos direitos e segurança</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Seus Direitos</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>Você tem o direito de:</p>
                <ul>
                  <li>Acessar suas informações pessoais</li>
                  <li>Corrigir dados incorretos</li>
                  <li>Solicitar exclusão de seus dados</li>
                  <li>Portabilidade de dados</li>
                  <li>Revogar consentimentos</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Segurança</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p>
                  Implementamos medidas técnicas e organizacionais apropriadas para proteger suas informações pessoais
                  contra acesso não autorizado, alteração, divulgação ou destruição.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Contato</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Para questões sobre esta política de privacidade, entre em contato conosco em:
                  <strong> privacidade@acelerajovem.com.br</strong>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
