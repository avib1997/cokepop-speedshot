// app/layout.tsx
import type { Metadata } from 'next'
import './globals.scss'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'CokePop SpeedShot',
  description: 'משחק קוויז מהיר בן 5 שניות על Coca-Cola'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he">
      <body>
        {children}

        <footer className="siteFooter">
          <a href="https://brotechstudio.com" target="_blank" rel="noopener noreferrer" className="brandLink">
            <Image src="/images/BroTechLogoF.png" alt="הלוגו שלי" width={40} height={40} className="brandLogo" />
            BroTech
          </a>
        </footer>
      </body>
    </html>
  )
}
