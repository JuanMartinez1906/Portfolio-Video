export const projects = [
  {
    id: 1,
    title: "Comidas Mediocres",
    category: "Creator Content",
    description: "Contenido de formato corto con storytelling cómico sobre comida del día a día",
    videoFile: "Comidas mediocres.mp4",
  },
  {
    id: 2,
    title: "Sudado de Pollo",
    category: "Creator Content",
    description: "Contenido gastronómico mostrando la cocina tradicional colombiana",
    videoFile: "Sudado de Pollo.mp4",
  },
  {
    id: 3,
    title: "Probando la Nueva Bondiola King",
    category: "Creator Content",
    description: "Contenido gastronómico con storytelling dinámico",
    videoFile: "Probando la nueva bondiola king.mp4",
  },
  {
    id: 4,
    title: "Como 1 Ingeniero y 2 Financieros",
    category: "Creator Content",
    description: "Contenido de marca con narrativa dinámica y formato de storytelling",
    videoFile: "Como 1 ingeniero y 2 financieros.mp4",
  },
  {
    id: 5,
    title: "Como 3 Compañeros WALKA",
    category: "Creator Content",
    description: "Contenido de marca para campaña de redes sociales con enfoque narrativo",
    videoFile: "Como 3 companeros WALKA.MP4",
  },
  {
    id: 6,
    title: "Como Hacer que tu Marca sea Diferente",
    category: "Creator Content",
    description: "Contenido educativo sobre diferenciación de marca para emprendedores",
    videoFile: "Como hacer para que su marca sea diferente.mp4",
  },
  {
    id: 7,
    title: "Tengo 5 Semanas para Hacer este Zapato Viral",
    category: "Creator Content",
    description: "Contenido documental de un reto viral diseñando zapatillas en 5 semanas",
    videoFile: "Tengo 5 semanas para hacer este zapato viral.mp4",
  },
  {
    id: 8,
    title: "Nike Colombiano",
    category: "Creator Content",
    description: "Contenido de marca para WALKA con identidad cultural local",
    videoFile: "Nike Colombiano.MP4",
  },
  {
    id: 9,
    title: "WALKA Dinamic",
    category: "Meta Ads",
    description: "Creative de performance para campaña de Meta Ads",
    videoFile: "IMG_4637.MP4",
  },
  {
    id: 10,
    title: "Icon",
    category: "Meta Ads",
    description: "Creative de Meta Ads optimizado para pruebas de performance",
    videoFile: "Icon Test.mp4",
  },
] as const;

export type Project = (typeof projects)[number];

export const stats = [
  { value: 5, suffix: "+", label: "Years Editing" },
  { value: 350, suffix: "K+", label: "Instagram Followers" },
  { value: 1.4, suffix: "M+", label: "TikTok Followers" },
  { value: 149, suffix: "K+", label: "YouTube Subscribers" },
] as const;

export const skills = [
  "After Effects",
  "Premiere Pro",
  "Meta Ads",
  "Illustrator",
  "Short-form Content",
] as const;

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
];
