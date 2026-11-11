interface LinkButtonProps {
  label: string
  url: string
}

export function LinkButton({ label, url }: LinkButtonProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-14 items-center justify-center rounded-lg border border-stroke bg-surface text-md font-medium transition-colors hover:bg-surface-hover"
    >
      {label}
    </a>
  )
}
