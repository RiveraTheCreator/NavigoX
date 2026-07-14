# NavigoX - Plataforma Potenciadora de Experiencias

NavigoX es una plataforma innovadora diseñada para conectar al turista con el factor humano y los operadores locales, directamente desde la recepción del hotel. Nuestra propuesta de valor se centra en cinco pilares: **Recomienda, Reserva, Cobra, Liquida y Aprende**.

## 🚀 Características Principales

1. **Recomendaciones via WhatsApp**: Conecta al turista con operadores locales desde la recepción, ofreciendo el catálogo de NavigoX sin aplicaciones adicionales.
2. **Reserva y Cobro Instantáneo**: Transacciones fluidas y seguras sin fricción para el huésped.
3. **Liquidación Automática**: Aumenta los ingresos automáticamente mientras el sistema aprende de las preferencias de los usuarios.
4. **Lista de Espera (Piloto)**: Integración nativa con webhooks de n8n para captar usuarios interesados (Hoteles y Operadores).

## 🛠️ Tecnologías Utilizadas

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Librería UI**: [React 19](https://react.dev/)
- **Estilos**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Animaciones Cinematográficas**: [GSAP 3](https://gsap.com/) (con ScrollTrigger y text-splitting nativo)
- **Iconografía**: [Lucide React](https://lucide.dev/)
- **Infraestructura**: Docker (Multi-stage build), integración nativa para Vercel.

## 🐳 Ejecución Local (Docker)

El proyecto incluye un entorno de contenedor optimizado para compilar y ejecutar el servidor nativo de Next.js.

Para levantar el proyecto en tu máquina local, ejecuta en tu terminal:

```bash
docker-compose up --build
```

Esto iniciará el proceso de "build" y luego levantará la aplicación en **http://localhost:3000**.

## 📦 Despliegue en Vercel

La aplicación ha sido construida sobre Next.js, lo que permite un despliegue de **configuración cero** en Vercel. Simplemente empuja los cambios a la rama principal (main) y Vercel detectará el framework y realizará el despliegue automáticamente.

## 🎨 Guía Visual (Preset E: Crónica Raíz)

La interfaz ha sido desarrollada con una estética "Pixel Perfect 1:1" orientada a sentirse como un instrumento digital premium:
- **Esquema de Color**: Fondos profundos (`bg-background`) con contrastes orgánicos (`bg-surface`) y acentos de atención táctica (`bg-accent`).
- **Micro-interacciones**: Botones responsivos con efectos de revelado al `hover` (`hover-slide-bg`) y animaciones encadenadas controladas por el scroll (ScrollTrigger).
- **Tipografías**: Combinación refinada de `Inter` (UI/Sans), `Roboto` (Cuerpo de texto), `Cormorant Garamond` (Títulos de impacto/Drama) y `IBM Plex Mono` (Datos/Metadata).

## 📄 Estructura del Proyecto

- `app/` - Código fuente bajo el paradigma de Next.js App Router (`layout.jsx`, `page.jsx`, `globals.css`).
- `public/` - Assets estáticos (Logo corporativo).
- `Dockerfile` & `docker-compose.yml` - Configuración para despliegues contenerizados (Nodos independientes).
