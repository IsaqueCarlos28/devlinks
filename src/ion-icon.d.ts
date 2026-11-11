import type { DetailedHTMLProps, HTMLAttributes } from 'react'

// Tipa o web component <ion-icon> (Ionicons) para uso direto no JSX
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        name: string
      }
    }
  }
}
