declare global {
  interface SocialItem {
    href: string
    label: string
  }

  interface SignatureFields {
    logoUrl: string
    name: string
    title: string
    email: string
    address: string
    website: string
    phone: string
    phoneAlt: string
    socialText: string
    disclaimer: string
    social: SocialItem[]
    showEmail: boolean
    showSocial: boolean
    showLogo: boolean
  }
}

export {}
