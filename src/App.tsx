import { LinkButton } from './components/features/LinkButton'
import { Profile } from './components/features/Profile'
import { SocialLinks } from './components/features/SocialLinks'
import { ThemeToggle } from './components/ui/ThemeToggle'
import { links, profile, socials } from './data/profile'
import { useTheme } from './hooks/useTheme'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <main className="mx-auto w-full max-w-[588px] px-6 pt-14">
      <Profile profile={profile} theme={theme} />

      <div className="flex h-10 justify-center">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>

      <nav aria-label="Meus links" className="flex h-[320px] flex-col gap-4 py-6">
        {links.map((link) => (
          <LinkButton key={link.id} label={link.label} url={link.url} />
        ))}
      </nav>

      <div className="flex h-[88px] justify-center pt-6">
        <SocialLinks links={socials} />
      </div>

      <footer className="flex h-[72px] justify-center pt-6">
        <p className="text-sm">{profile.footer}</p>
      </footer>
    </main>
  )
}

export default App
