import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { RoleSwitcher } from "@/components/role-switcher"
import { MainNav } from "@/components/main-nav"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Acelera Jovem - Plataforma Educacional Completa",
  description: "Conecte-se com conteúdos premium, participe de fóruns e acelere seu aprendizado",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <MainNav />
          <main className="min-h-screen">{children}</main>
          <RoleSwitcher />
        </AuthProvider>
      </body>
    </html>
  )
}
