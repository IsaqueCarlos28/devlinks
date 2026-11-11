import { MoonStars, Sun } from '@phosphor-icons/react'
import type { Theme } from '../../hooks/useTheme'

interface ThemeToggleProps {
  theme: Theme
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isDark}
      aria-label={isDark ? 'Mudar para o tema claro' : 'Mudar para o tema escuro'}
      className="relative h-10 w-16 rounded-full border border-stroke bg-surface transition-colors hover:bg-surface-hover"
    >
      <span
        className={`absolute top-1/2 left-1 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-highlight transition-transform ${
          isDark ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {isDark ? (
          <MoonStars size={20} aria-hidden="true" />
        ) : (
          <Sun size={20} aria-hidden="true" />
        )}
      </span>
    </button>
  )
}
