'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { href: '/home', label: 'Home', emoji: '🏠' },
  { href: '/knowledge', label: 'Knowledge', emoji: '🧠' },
  { href: '/health', label: 'Health', emoji: '📊' },
  { href: '/settings', label: 'Settings', emoji: '⚙️' },
]

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <>
      {/* 桌面：左侧竖向导航栏 */}
      <nav style={{
        width: '220px',
        height: '100vh',
        backgroundColor: 'white',
        borderRight: '1px solid #eee',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 16px',
        position: 'fixed',
        left: 0,
        top: 0,
      }}>
        <div style={{ fontSize: '20px', fontWeight: '700', padding: '0 8px', marginBottom: '32px' }}>
          Thesis
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map(item => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: isActive ? '600' : '400',
                  color: isActive ? '#5a8a6a' : '#444',
                  backgroundColor: isActive ? '#eef4f0' : 'transparent',
                }}
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: '10px 12px',
            backgroundColor: 'transparent',
            border: '1px solid #ddd',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#666',
            textAlign: 'left',
          }}
        >
          登出
        </button>
      </nav>

      {/* 移动端：底部 tab bar */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTop: '1px solid #eee',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '8px 0',
        zIndex: 100,
      }} className="mobile-nav">
        {navItems.map(item => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                textDecoration: 'none',
                color: isActive ? '#5a8a6a' : '#888',
                fontSize: '12px',
              }}
            >
              <span style={{ fontSize: '20px' }}>{item.emoji}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}