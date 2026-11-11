import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'devlinks-theme'

/** Lê o tema salvo no localStorage; em caso de erro ou valor inválido, usa 'light'. */
export function getStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

/** Aplica o tema no elemento raiz via atributo data-theme. */
export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme
}

/**
 * Fonte única da verdade do tema: guarda o valor no estado,
 * sincroniza com o documento (data-theme) e persiste no localStorage.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getStoredTheme)

  useEffect(() => {
    applyTheme(theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Sem localStorage (ex.: modo privado): o tema vale apenas para esta sessão
    }
  }, [theme])

  function toggleTheme() {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }

  return { theme, toggleTheme }
}
