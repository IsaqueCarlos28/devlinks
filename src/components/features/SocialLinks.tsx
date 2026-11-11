import type { SocialLink } from '../../data/profile'

interface SocialLinksProps {
  links: SocialLink[]
}

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <ul className="flex justify-center gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.ariaLabel}
            className="flex size-10 items-center justify-center rounded-lg border border-stroke bg-surface transition-colors hover:bg-surface-hover"
          >
            <ion-icon name={link.icon} aria-hidden="true" className="text-2xl" />
          </a>
        </li>
      ))}
    </ul>
  )
}
