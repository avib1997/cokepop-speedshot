import type { Metadata } from 'next'
import './globals.scss'
import Image from 'next/image'
import AudioProvider from './AudioProvider'
import MuteButton from './MuteButton'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: 'CokePop SpeedShot',
  description: 'משחק קוויז מהיר בן 5 שניות על Coca-Cola'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he">
      <body>
        <AudioProvider>
          {children}

          <footer className="siteFooter">
            <a href="https://brotechstudio.com" target="_blank" rel="noopener noreferrer" className="brandLink">
              <Image src="/images/BroTechLogoF.png" alt="הלוגו שלי" width={40} height={40} className="brandLogo" />
              BroTech
            </a>
            <MuteButton />
          </footer>
        </AudioProvider>
      </body>
    </html>
  )
}
