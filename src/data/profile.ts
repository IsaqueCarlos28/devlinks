import avatarDark from '../assets/avatar-dark.png'
import avatarLight from '../assets/avatar-light.png'

/**
 * ⚠️ PLACEHOLDERS
 * Os textos e URLs abaixo são provisórios e devem ser substituídos
 * pelos valores reais do projeto (Figma/brief). As URLs usam o domínio
 * example.com (reservado para exemplos) e NÃO são destinos oficiais.
 */

export interface Profile {
  username: string
  avatarLight: string
  avatarDark: string
  avatarAlt: string
  footer: string
}

export interface LinkItem {
  id: string
  label: string
  url: string
}

export interface SocialLink {
  id: string
  /** Nome do ícone do Ionicons registrado no app (ex.: 'logo-github') */
  icon: string
  url: string
  ariaLabel: string
}

export const profile: Profile = {
  username: '@seu.perfil',
  avatarLight,
  avatarDark,
  avatarAlt: 'Foto de perfil de @seu.perfil',
  footer: 'Feito com ♥ por @seu.perfil',
}

export const links: LinkItem[] = [
  { id: 'link-1', label: 'Link 1', url: 'https://example.com/link-1' },
  { id: 'link-2', label: 'Link 2', url: 'https://example.com/link-2' },
  { id: 'link-3', label: 'Link 3', url: 'https://example.com/link-3' },
  { id: 'link-4', label: 'Link 4', url: 'https://example.com/link-4' },
]

export const socials: SocialLink[] = [
  {
    id: 'github',
    icon: 'logo-github',
    url: 'https://example.com/github',
    ariaLabel: 'Abrir perfil no GitHub',
  },
  {
    id: 'instagram',
    icon: 'logo-instagram',
    url: 'https://example.com/instagram',
    ariaLabel: 'Abrir perfil no Instagram',
  },
  {
    id: 'linkedin',
    icon: 'logo-linkedin',
    url: 'https://example.com/linkedin',
    ariaLabel: 'Abrir perfil no LinkedIn',
  },
  {
    id: 'youtube',
    icon: 'logo-youtube',
    url: 'https://example.com/youtube',
    ariaLabel: 'Abrir canal no YouTube',
  },
]
