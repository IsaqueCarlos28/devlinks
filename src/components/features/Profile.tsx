import type { Profile } from '../../data/profile'
import type { Theme } from '../../hooks/useTheme'

interface ProfileProps {
  profile: Profile
  theme: Theme
}

export function Profile({ profile, theme }: ProfileProps) {
  const avatar = theme === 'dark' ? profile.avatarDark : profile.avatarLight

  return (
    <header className="flex h-[192px] flex-col items-center pt-6">
      <img
        src={avatar}
        alt={profile.avatarAlt}
        className="size-28 rounded-full border-2 border-stroke"
      />
      <p className="mt-2 text-md font-normal">{profile.username}</p>
    </header>
  )
}
