import './globals.css'

export const metadata = {
  title: 'NavigoX | Plataforma potenciadora de experiencias',
  description: 'NavigoX recomienda, reserva, cobra, liquida y aprende conectando al turista con el factor humano.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600;700&family=Roboto:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <svg className="noise-overlay" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
        </svg>
      </body>
    </html>
  )
}
