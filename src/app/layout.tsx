import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/shared/Navigation'
import { headers } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Thesis',
  description: 'Know what you know. See what you don\'t.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || ''

  // 登录/注册页面不显示导航栏
  const isAuthPage = pathname.startsWith('/auth') || pathname === '/'
  const showNav = !isAuthPage

  return (
    <html lang="zh">
      <body className={inter.className} style={{ margin: 0, backgroundColor: '#f9f7f4' }}>
        {showNav ? (
          <div style={{ display: 'flex' }}>
            <Navigation />
            <main style={{
              marginLeft: '220px',
              flex: 1,
              minHeight: '100vh',
              padding: '32px',
            }}>
              {children}
            </main>
          </div>
        ) : (
          <main>{children}</main>
        )}
      </body>
    </html>
  )
}