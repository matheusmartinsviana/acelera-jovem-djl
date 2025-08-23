export function initializeAppData() {
  // Initialize courses data
  if (!localStorage.getItem("eduplatform-courses")) {
    const sampleCourses = [
      {
        id: "1",
        title: "Introdução ao JavaScript",
        description: "Aprenda os fundamentos da linguagem JavaScript",
        progress: 75,
        category: "Programação",
        duration: "8h",
        level: "Iniciante",
        isFavorite: true,
      },
      {
        id: "2",
        title: "React para Iniciantes",
        description: "Construa aplicações web modernas com React",
        progress: 30,
        category: "Programação",
        duration: "12h",
        level: "Intermediário",
        isFavorite: false,
      },
      {
        id: "3",
        title: "Design UX/UI",
        description: "Princípios de design para interfaces digitais",
        progress: 0,
        category: "Design",
        duration: "6h",
        level: "Iniciante",
        isFavorite: true,
      },
      {
        id: "4",
        title: "Python para Data Science",
        description: "Análise de dados e machine learning com Python",
        progress: 60,
        category: "Data Science",
        duration: "15h",
        level: "Intermediário",
        isFavorite: true,
      },
      {
        id: "5",
        title: "Marketing Digital Estratégico",
        description: "Estratégias modernas de marketing digital",
        progress: 0,
        category: "Marketing",
        duration: "10h",
        level: "Iniciante",
        isFavorite: false,
      },
    ]
    localStorage.setItem("eduplatform-courses", JSON.stringify(sampleCourses))
  }

  // Initialize achievements data
  if (!localStorage.getItem("eduplatform-achievements")) {
    const sampleAchievements = [
      {
        id: "1",
        title: "Primeiro Curso",
        description: "Complete seu primeiro curso",
        icon: "🎓",
        earned: true,
        date: "2024-01-15",
      },
      {
        id: "2",
        title: "Sequência de 7 dias",
        description: "Estude por 7 dias consecutivos",
        icon: "🔥",
        earned: true,
        date: "2024-01-20",
      },
      {
        id: "3",
        title: "Especialista em JavaScript",
        description: "Complete 5 cursos de JavaScript",
        icon: "⚡",
        earned: false,
      },
      {
        id: "4",
        title: "Mentor da Comunidade",
        description: "Ajude 10 pessoas no fórum",
        icon: "🤝",
        earned: true,
        date: "2024-01-22",
      },
    ]
    localStorage.setItem("eduplatform-achievements", JSON.stringify(sampleAchievements))
  }

  // Initialize stats data
  if (!localStorage.getItem("eduplatform-stats")) {
    const sampleStats = {
      totalCourses: 5,
      completedCourses: 2,
      totalHours: 45,
      streak: 12,
    }
    localStorage.setItem("eduplatform-stats", JSON.stringify(sampleStats))
  }

  // Initialize forum categories
  if (!localStorage.getItem("eduplatform-forum-categories")) {
    const sampleCategories = [
      {
        id: "1",
        name: "Programação",
        description: "Discussões sobre linguagens de programação, frameworks e desenvolvimento",
        topicCount: 45,
        postCount: 234,
        lastPost: {
          title: "Dúvidas sobre React Hooks",
          author: "João Silva",
          date: "2024-01-25",
        },
      },
      {
        id: "2",
        name: "Design",
        description: "UX/UI, design gráfico e ferramentas de design",
        topicCount: 28,
        postCount: 156,
        lastPost: {
          title: "Melhores práticas de UX",
          author: "Maria Santos",
          date: "2024-01-24",
        },
      },
      {
        id: "3",
        name: "Data Science",
        description: "Análise de dados, machine learning e estatística",
        topicCount: 32,
        postCount: 189,
        lastPost: {
          title: "Algoritmos de ML para iniciantes",
          author: "Carlos Lima",
          date: "2024-01-23",
        },
      },
      {
        id: "4",
        name: "Carreira",
        description: "Dicas de carreira, networking e desenvolvimento profissional",
        topicCount: 67,
        postCount: 345,
        lastPost: {
          title: "Como se preparar para entrevistas",
          author: "Ana Costa",
          date: "2024-01-25",
        },
      },
      {
        id: "5",
        name: "Geral",
        description: "Discussões gerais sobre educação e aprendizado",
        topicCount: 89,
        postCount: 456,
        lastPost: {
          title: "Métodos de estudo eficazes",
          author: "Roberto Alves",
          date: "2024-01-24",
        },
      },
    ]
    localStorage.setItem("eduplatform-forum-categories", JSON.stringify(sampleCategories))
  }

  // Initialize forum topics
  if (!localStorage.getItem("eduplatform-forum-topics")) {
    const sampleTopics = [
      {
        id: "1",
        title: "Como começar com React em 2024?",
        content:
          "Estou começando a estudar React e gostaria de dicas sobre por onde começar. Já tenho conhecimento básico de JavaScript e HTML/CSS. Quais são os conceitos mais importantes para focar primeiro?",
        author: "João Silva",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        categoryId: "1",
        categoryName: "Programação",
        createdAt: "2024-01-25T10:30:00Z",
        updatedAt: "2024-01-25T14:20:00Z",
        replyCount: 12,
        viewCount: 89,
        isPinned: true,
        isLocked: false,
        lastReply: {
          author: "Maria Santos",
          date: "2024-01-25T14:20:00Z",
        },
      },
      {
        id: "2",
        title: "Melhores práticas de UX Design",
        content:
          "Vamos discutir as melhores práticas para criar experiências de usuário incríveis. Compartilhem suas dicas e ferramentas favoritas!",
        author: "Ana Costa",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        categoryId: "2",
        categoryName: "Design",
        createdAt: "2024-01-24T16:45:00Z",
        updatedAt: "2024-01-25T09:15:00Z",
        replyCount: 8,
        viewCount: 67,
        isPinned: false,
        isLocked: false,
        lastReply: {
          author: "Carlos Lima",
          date: "2024-01-25T09:15:00Z",
        },
      },
      {
        id: "3",
        title: "Python vs R para Data Science",
        content:
          "Qual linguagem vocês recomendam para quem está começando em Data Science? Estou em dúvida entre Python e R.",
        author: "Roberto Alves",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        categoryId: "3",
        categoryName: "Data Science",
        createdAt: "2024-01-23T14:20:00Z",
        updatedAt: "2024-01-24T11:30:00Z",
        replyCount: 15,
        viewCount: 123,
        isPinned: false,
        isLocked: false,
        lastReply: {
          author: "Lucia Ferreira",
          date: "2024-01-24T11:30:00Z",
        },
      },
      {
        id: "4",
        title: "Dicas para primeira entrevista de emprego",
        content:
          "Compartilhem suas experiências e dicas para quem vai fazer a primeira entrevista de emprego na área de tech!",
        author: "Lucia Ferreira",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        categoryId: "4",
        categoryName: "Carreira",
        createdAt: "2024-01-22T09:00:00Z",
        updatedAt: "2024-01-23T16:45:00Z",
        replyCount: 23,
        viewCount: 178,
        isPinned: false,
        isLocked: false,
        lastReply: {
          author: "João Silva",
          date: "2024-01-23T16:45:00Z",
        },
      },
    ]
    localStorage.setItem("eduplatform-forum-topics", JSON.stringify(sampleTopics))
  }

  // Initialize favorites data
  if (!localStorage.getItem("eduplatform-favorites")) {
    const sampleFavorites = [
      {
        id: "1",
        title: "Introdução ao JavaScript",
        description: "Aprenda os fundamentos da linguagem JavaScript",
        category: "Programação",
        duration: "8h",
        level: "Iniciante",
        addedAt: "2024-01-20",
      },
      {
        id: "3",
        title: "Design UX/UI",
        description: "Princípios de design para interfaces digitais",
        category: "Design",
        duration: "6h",
        level: "Iniciante",
        addedAt: "2024-01-22",
      },
      {
        id: "4",
        title: "Python para Data Science",
        description: "Análise de dados e machine learning com Python",
        category: "Data Science",
        duration: "15h",
        level: "Intermediário",
        addedAt: "2024-01-24",
      },
    ]
    localStorage.setItem("eduplatform-favorites", JSON.stringify(sampleFavorites))
  }

  // Initialize content library data
  if (!localStorage.getItem("eduplatform-content-library")) {
    const sampleContent = [
      {
        id: "1",
        title: "Fundamentos de JavaScript",
        description: "Curso completo sobre JavaScript moderno",
        category: "Programação",
        type: "Curso",
        status: "Publicado",
        author: "Maria Santos",
        createdAt: "2024-01-15",
        views: 1250,
        rating: 4.8,
      },
      {
        id: "2",
        title: "Guia de UX Design",
        description: "Princípios essenciais de experiência do usuário",
        category: "Design",
        type: "Artigo",
        status: "Publicado",
        author: "Ana Costa",
        createdAt: "2024-01-18",
        views: 890,
        rating: 4.6,
      },
      {
        id: "3",
        title: "Machine Learning com Python",
        description: "Introdução prática ao aprendizado de máquina",
        category: "Data Science",
        type: "Curso",
        status: "Rascunho",
        author: "Carlos Lima",
        createdAt: "2024-01-20",
        views: 0,
        rating: 0,
      },
    ]
    localStorage.setItem("eduplatform-content-library", JSON.stringify(sampleContent))
  }

  // Initialize learning paths data
  if (!localStorage.getItem("eduplatform-learning-paths")) {
    const samplePaths = [
      {
        id: "1",
        title: "Desenvolvedor Frontend",
        description: "Trilha completa para se tornar um desenvolvedor frontend",
        courses: ["HTML/CSS", "JavaScript", "React", "TypeScript"],
        duration: "120h",
        level: "Iniciante a Avançado",
        studentsEnrolled: 1250,
        progress: 45,
      },
      {
        id: "2",
        title: "UX/UI Designer",
        description: "Aprenda design de experiência e interface do usuário",
        courses: ["Fundamentos de Design", "Figma", "Prototipagem", "Usabilidade"],
        duration: "80h",
        level: "Iniciante a Intermediário",
        studentsEnrolled: 890,
        progress: 20,
      },
      {
        id: "3",
        title: "Cientista de Dados",
        description: "Trilha completa em ciência de dados e machine learning",
        courses: ["Python", "Estatística", "Machine Learning", "Deep Learning"],
        duration: "200h",
        level: "Intermediário a Avançado",
        studentsEnrolled: 650,
        progress: 0,
      },
    ]
    localStorage.setItem("eduplatform-learning-paths", JSON.stringify(samplePaths))
  }
}
