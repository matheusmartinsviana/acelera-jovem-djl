export interface Content {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string; // tempo total (ex: "24h")
  level:
    | "Iniciante ao Avançado"
    | "Iniciante"
    | "Iniciante ao Intermediário"
    | "Avançado"
    | "Intermediário"
    | "Intermediário ao Avançado";
  rating: number; // média das avaliações (ex: 4.7)
  type: "course" | "article" | "video" | "trilha";
  isPremium: boolean;
  instructor: string; // principal ou responsável
  institution: string;
  thumbnail: string;

  // já existente
  courses?: Course[];

  // complementos para deixar tipo Alura:
  totalHours?: number;
  totalCourses?: number;
  videosExtras?: number;
  podcasts?: number;
  articles?: number;

  // instrutores da trilha
  instructors?: Instructor[];

  // passo a passo
  steps?: Step[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  progress: number; // percentage from 0 to 100
  duration: string; // e.g., "10h"
  level: "Iniciante" | "Intermediário" | "Avançado";
}

export interface Instructor {
  name: string;
  avatar?: string; // opcional para exibir foto
  bio?: string;
}

export interface Step {
  title: string;
  description: string;
}
