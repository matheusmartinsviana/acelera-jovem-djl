"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { initializeAppData } from "@/lib/init-data"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "student" | "teacher" | "institution" | "admin"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, userType?: string) => Promise<{ success: boolean; error?: string }>
  signup: (
    name: string,
    email: string,
    password: string,
    role?: string,
  ) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const mockUsers = [
  {
    id: "1",
    name: "DLJ",
    email: "dlj@example.com",
    password: "123456",
    role: "student" as const,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@example.com",
    password: "123456",
    role: "teacher" as const,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Universidade Federal",
    email: "admin@ufpe.edu.br",
    password: "123456",
    role: "institution" as const,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Admin Sistema",
    email: "admin@acelerajovem.com",
    password: "admin123",
    role: "admin" as const,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: "1",
    name: "DLJ",
    email: "dlj@example.com",
    role: "student",
    avatar: "/placeholder.svg?height=40&width=40",
  })
  const [isLoading, setIsLoading] = useState(false)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("eduplatform-user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error loading user:", error)
        localStorage.removeItem("eduplatform-user")
        setUser({
          id: "1",
          name: "DLJ",
          email: "dlj@example.com",
          role: "student",
          avatar: "/placeholder.svg?height=40&width=40",
        })
      }
    } else {
      const defaultUser = {
        id: "1",
        name: "DLJ",
        email: "dlj@example.com",
        role: "student" as const,
        avatar: "/placeholder.svg?height=40&width=40",
      }
      localStorage.setItem("eduplatform-user", JSON.stringify(defaultUser))
      setUser(defaultUser)
    }

    initializeAppData()
    setIsLoading(false)
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("eduplatform-user", JSON.stringify(user))
    } else {
      localStorage.removeItem("eduplatform-user")
    }
  }, [user])

  const login = async (
    email: string,
    password: string,
    userType?: string,
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.email === email && u.password === password)

    // If userType is specified, filter by role
    if (userType && foundUser) {
      const roleMap: { [key: string]: string } = {
        student: "student",
        teacher: "teacher",
        institution: "institution",
        admin: "admin",
      }

      if (foundUser.role !== roleMap[userType]) {
        setIsLoading(false)
        return { success: false, error: "Tipo de usuário incorreto para estas credenciais" }
      }
    }

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      setIsLoading(false)
      return { success: true }
    } else {
      setIsLoading(false)
      return { success: false, error: "Email ou senha incorretos" }
    }
  }

  const signup = async (
    name: string,
    email: string,
    password: string,
    role = "student",
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email)
    if (existingUser) {
      setIsLoading(false)
      return { success: false, error: "Este email já está cadastrado" }
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: role as "student" | "teacher" | "institution" | "admin",
      avatar: "/placeholder.svg?height=40&width=40",
    }

    mockUsers.push(newUser)

    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    setIsLoading(false)
    return { success: true }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
