import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { addIcons } from 'ionicons'
import { defineCustomElements } from 'ionicons/loader'
import {
  logoGithub,
  logoInstagram,
  logoLinkedin,
  logoYoutube,
} from 'ionicons/icons'
import App from './App.tsx'
import { applyTheme, getStoredTheme } from './hooks/useTheme.ts'
import './index.css'

// Registra os ícones de redes sociais usados na página (Ionicons)
addIcons({ logoGithub, logoInstagram, logoLinkedin, logoYoutube })
defineCustomElements()

// Aplica o tema salvo antes do primeiro render para evitar
// o "flash" do tema errado na primeira pintura da página
applyTheme(getStoredTheme())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
