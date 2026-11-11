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
      className="relative h-10 w-16 rounded-full transition-colors hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      {/* Track do switch (64x24, centralizado na base 64x40) */}
      <span className="absolute left-0 top-2 h-6 w-16 rounded-full border border-stroke bg-surface backdrop-blur-[4px]" />
      {/* Knob (32x32, topo em 4px, centralizado verticalmente) */}
      <span
        className={`absolute left-0 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-highlight transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 ${
          isDark
            ? 'translate-x-0 shadow-[0_2px_8px_rgba(0,0,0,0.25)]'
            : 'translate-x-8 shadow-[0_2px_8px_rgba(0,0,0,0.1)]'
        }`}
      >
        {isDark ? (
          <MoonStars size={16} aria-hidden="true" />
        ) : (
          <Sun size={16} aria-hidden="true" />
        )}
      </span>
    </button>
  )
}
