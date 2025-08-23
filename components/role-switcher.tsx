"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/auth-context"
import { User, GraduationCap, Building2, Shield, Eye } from "lucide-react"
import { useRouter } from "next/navigation"

const roles = [
  {
    id: "student",
    name: "Estudante",
    icon: User,
    color: "bg-blue-500",
    user: { id: "1", name: "DLJ", email: "dlj@example.com", role: "student" as const },
  },
  {
    id: "teacher",
    name: "Professor",
    icon: GraduationCap,
    color: "bg-green-500",
    user: { id: "2", name: "Prof. Maria", email: "maria@example.com", role: "teacher" as const },
  },
  {
    id: "institution",
    name: "Instituição",
    icon: Building2,
    color: "bg-purple-500",
    user: { id: "3", name: "UFPE", email: "admin@ufpe.edu.br", role: "institution" as const },
  },
  {
    id: "admin",
    name: "Admin",
    icon: Shield,
    color: "bg-red-500",
    user: { id: "4", name: "Admin", email: "admin@acelerajovem.com", role: "admin" as const },
  },
]

export function RoleSwitcher() {
  const { user } = useAuth()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const switchRole = (newRole: (typeof roles)[0]) => {
    // Update user in localStorage
    const newUser = {
      ...newRole.user,
      avatar: "/placeholder.svg?height=40&width=40",
    }

    localStorage.setItem("eduplatform-user", JSON.stringify(newUser))

    // Force page reload to update auth context
    window.location.reload()
  }

  const currentRole = roles.find((role) => role.id === user?.role)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="bg-background/95 backdrop-blur border-2 shadow-lg hover:shadow-xl transition-all duration-200 gap-2"
          >
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Visão:</span>
            <Badge variant="secondary" className={`${currentRole?.color} text-white border-0 px-2 py-0.5`}>
              {currentRole?.name}
            </Badge>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur">
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium">Alternar Visão (MVP)</p>
            <p className="text-xs text-muted-foreground">Atalho para demonstração</p>
          </div>
          <DropdownMenuSeparator />

          {roles.map((role) => {
            const Icon = role.icon
            const isActive = user?.role === role.id

            return (
              <DropdownMenuItem
                key={role.id}
                onClick={() => switchRole(role)}
                className={`flex items-center gap-3 cursor-pointer ${isActive ? "bg-primary/10 text-primary" : ""}`}
              >
                <div className={`p-1.5 rounded-full ${role.color}`}>
                  <Icon className="h-3 w-3 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{role.name}</p>
                  <p className="text-xs text-muted-foreground">{role.user.name}</p>
                </div>
                {isActive && (
                  <Badge variant="outline" className="text-xs">
                    Ativo
                  </Badge>
                )}
              </DropdownMenuItem>
            )
          })}

          <DropdownMenuSeparator />
          <div className="px-2 py-1.5">
            <p className="text-xs text-muted-foreground">💡 Cada visão tem dashboard e funcionalidades específicas</p>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
