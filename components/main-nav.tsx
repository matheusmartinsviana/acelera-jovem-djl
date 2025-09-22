"use client"

import { useState } from "react"
import logo from "@/public/width_800.webp"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  Menu,
  X,
  Users,
  MessageSquare,
  User,
  Library,
  Building2,
  GraduationCap,
  Shield,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import Image from "next/image"

const navigation = [
  { name: "Home", href: "/", icon: BookOpen },
  { name: "Trilha de Ensino", href: "/conteudos-freemium", icon: BookOpen },
  // { name: "", href: "/trilha-ensino", icon: BookOpen },
  { name: "Fórum", href: "/forum", icon: MessageSquare },
]

const moreNavigation = [
  { name: "Novidades", href: "/novidades", icon: BookOpen },
  { name: "Parceiros", href: "/parceiros", icon: Users },
  { name: "Acelera Jovem", href: "/acelera-jovem", icon: BookOpen },
  { name: "Sobre Nós", href: "/sobre", icon: User },
  { name: "Contato", href: "/contato", icon: MessageSquare },
]

const userNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: BookOpen },
  { name: "Perfil", href: "/perfil", icon: User },
  { name: "Favoritos", href: "/favoritos", icon: BookOpen },
]

const teacherNavigation = [
  { name: "Dashboard", href: "/dashboard-professor", icon: GraduationCap },
  { name: "Biblioteca", href: "/biblioteca-conteudo", icon: Library },
  { name: "Publicar", href: "/publicar-conteudo", icon: BookOpen },
]

const institutionNavigation = [
  { name: "Dashboard", href: "/dashboard-instituicao", icon: Building2 },
  { name: "Parcerias", href: "/parcerias", icon: Users },
]

const adminNavigation = [
  { name: "Admin Panel", href: "/admin", icon: Shield },
  { name: "Usuários", href: "/admin/usuarios", icon: Users },
  { name: "Conteúdos", href: "/admin/conteudos", icon: Library },
]

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useAuth()

  const getDashboardLink = () => {
    if (!user) return "/dashboard"
    switch (user.role) {
      case "teacher":
        return "/dashboard-professor"
      case "institution":
        return "/dashboard-instituicao"
      case "admin":
        return "/admin"
      default:
        return "/dashboard"
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex h-16 sm:h-18 lg:h-20 items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0 min-w-0">
            <Image src={logo} alt="Logo" width={90} height={80} />
            <Link href="/" className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-foreground truncate">
              AceleraJovem
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-2 xl:space-x-4 flex-1 justify-center max-w-5xl mx-4">
            <div className="flex items-center space-x-2 xl:space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm xl:text-base font-medium transition-colors hover:text-primary whitespace-nowrap px-2 py-1 rounded-md hover:bg-primary/5",
                    pathname === item.href ? "text-primary bg-primary/10" : "text-muted-foreground",
                  )}
                >
                  {item.name}
                </Link>
              ))}

              <div className="relative">
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className={cn(
                    "flex items-center space-x-1 text-sm xl:text-base font-medium transition-colors hover:text-primary whitespace-nowrap px-2 py-1 rounded-md hover:bg-primary/5",
                    moreNavigation.some((item) => pathname === item.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground",
                  )}
                >
                  <span>Mais</span>
                  <ChevronDown className={cn("h-4 w-4 transition-transform", isMoreOpen && "rotate-180")} />
                </button>

                {isMoreOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-background border rounded-lg shadow-lg py-1 z-50">
                    {moreNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMoreOpen(false)}
                        className={cn(
                          "flex items-center space-x-2 px-3 py-2 text-sm transition-colors hover:bg-primary/5",
                          pathname === item.href
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-primary",
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {user && user.role === "student" && (
                <div className="flex items-center space-x-1 xl:space-x-2 border-l pl-2 xl:pl-4 ml-2 xl:ml-4">
                  {userNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "text-sm xl:text-base font-medium transition-colors hover:text-primary whitespace-nowrap px-2 py-1 rounded-md hover:bg-primary/5",
                        pathname === item.href ? "text-primary bg-primary/10" : "text-muted-foreground",
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
              {user && user.role === "teacher" && (
                <div className="flex items-center space-x-1 xl:space-x-2 border-l pl-2 xl:pl-4 ml-2 xl:ml-4">
                  {teacherNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "text-sm xl:text-base font-medium transition-colors hover:text-primary whitespace-nowrap px-2 py-1 rounded-md hover:bg-primary/5",
                        pathname === item.href ? "text-primary bg-primary/10" : "text-muted-foreground",
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
              {user && user.role === "institution" && (
                <div className="flex items-center space-x-1 xl:space-x-2 border-l pl-2 xl:pl-4 ml-2 xl:ml-4">
                  {institutionNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "text-sm xl:text-base font-medium transition-colors hover:text-primary whitespace-nowrap px-2 py-1 rounded-md hover:bg-primary/5",
                        pathname === item.href ? "text-primary bg-primary/10" : "text-muted-foreground",
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
              {user && user.role === "admin" && (
                <div className="flex items-center space-x-1 xl:space-x-2 border-l pl-2 xl:pl-4 ml-2 xl:ml-4">
                  {adminNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "text-sm xl:text-base font-medium transition-colors hover:text-primary whitespace-nowrap px-2 py-1 rounded-md hover:bg-primary/5",
                        pathname === item.href ? "text-primary bg-primary/10" : "text-muted-foreground",
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="hidden sm:flex items-center space-x-1 sm:space-x-2 lg:space-x-3 flex-shrink-0">
            {!user ? (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-xs sm:text-sm px-2 sm:px-3">
                    Login
                  </Button>
                </Link>
                <Link href="/cadastro">
                  <Button size="sm" className="text-xs sm:text-sm px-2 sm:px-3">
                    Cadastrar
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-1 sm:space-x-2">
                <span className="text-xs sm:text-sm text-muted-foreground hidden md:block truncate max-w-20 lg:max-w-none">
                  Olá, {user.name.split(" ")[0]}
                </span>
                <Link href={getDashboardLink()}>
                  <Button size="sm" className="text-xs sm:text-sm px-2 sm:px-3">
                    Dashboard
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden p-1.5 sm:p-2 h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden border-b bg-background/95 backdrop-blur">
          <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-3 sm:px-4 py-3 space-y-1">
              {/* Navegação Principal */}
              <div className="space-y-1">
                <div className="px-3 py-2 mb-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Navegação</p>
                </div>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-3 text-sm sm:text-base font-medium rounded-lg transition-colors",
                      pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Menu "Mais" expandido no mobile */}
              <div className="border-t pt-3 mt-3">
                <div className="px-3 py-2 mb-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Mais Páginas</p>
                </div>
                {moreNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-3 text-sm sm:text-base font-medium rounded-lg transition-colors",
                      pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* User-specific Navigation */}
              {user && (
                <div className="border-t pt-3 mt-3">
                  <div className="px-3 py-2 mb-2">
                    <p className="text-sm font-medium text-foreground">Área do Usuário</p>
                  </div>
                  {user.role === "student" &&
                    userNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "flex items-center space-x-3 px-3 py-3 text-sm sm:text-base font-medium rounded-lg transition-colors",
                          pathname === item.href
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-primary hover:bg-primary/5",
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  {user.role === "teacher" &&
                    teacherNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "flex items-center space-x-3 px-3 py-3 text-sm sm:text-base font-medium rounded-lg transition-colors",
                          pathname === item.href
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-primary hover:bg-primary/5",
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  {user.role === "institution" &&
                    institutionNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "flex items-center space-x-3 px-3 py-3 text-sm sm:text-base font-medium rounded-lg transition-colors",
                          pathname === item.href
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-primary hover:bg-primary/5",
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  {user.role === "admin" &&
                    adminNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "flex items-center space-x-3 px-3 py-3 text-sm sm:text-base font-medium rounded-lg transition-colors",
                          pathname === item.href
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-primary hover:bg-primary/5",
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                </div>
              )}

              {/* Auth Section */}
              <div className="border-t pt-4 mt-4">
                {!user ? (
                  <div className="space-y-2">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full justify-start h-12">
                        <User className="h-4 w-4 mr-2" />
                        Login
                      </Button>
                    </Link>
                    <Link href="/cadastro" onClick={() => setIsOpen(false)}>
                      <Button size="sm" className="w-full h-12">
                        Cadastrar-se
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="px-3 py-2">
                    <p className="text-sm text-muted-foreground">Logado como</p>
                    <p className="text-base font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {isMoreOpen && <div className="fixed inset-0 z-40" onClick={() => setIsMoreOpen(false)} />}
    </header>
  )
}
