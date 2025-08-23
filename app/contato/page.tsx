import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-background">


      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Entre em Contato</h1>
            <p className="text-xl text-muted-foreground">
              Estamos aqui para ajudar. Entre em contato conosco através dos canais abaixo
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Envie uma Mensagem</CardTitle>
                <CardDescription>Preencha o formulário e entraremos em contato em até 24 horas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" placeholder="Seu nome completo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Assunto</Label>
                  <Input id="subject" placeholder="Como podemos ajudar?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea id="message" placeholder="Descreva sua dúvida ou sugestão..." rows={4} />
                </div>
                <Button className="w-full">Enviar Mensagem</Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <Mail className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">contato@acelerajovem.com.br</p>
                  <p className="text-muted-foreground">suporte@acelerajovem.com.br</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Phone className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Telefone</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">(11) 3000-0000</p>
                  <p className="text-muted-foreground">WhatsApp: (11) 99999-9999</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <MapPin className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Endereço</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Av. Paulista, 1000
                    <br />
                    São Paulo - SP
                    <br />
                    CEP: 01310-100
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
