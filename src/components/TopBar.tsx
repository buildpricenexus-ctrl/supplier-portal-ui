import { useState } from 'react'

interface Props {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export default function TopBar({ title, subtitle, actions }: Props) {
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <header style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', gap: 16, position: 'sticky', top: 0, zIndex: 10, minWidth: 0 }}>
      <div style={{ flex: '1 1 0', minWidth: 0, overflow: 'hidden' }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: '#1a2332', lineHeight: '1.2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 13, color: '#64748b', marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{subtitle}</p>}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        {actions}

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <input
            placeholder="Search..."
            className="form-input"
            style={{ width: 200, paddingLeft: 36, height: 36, fontSize: 13 }}
          />
          <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
        </div>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false) }}
            style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
          >
            <svg width="16" height="16" fill="none" stroke="#64748b" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
            </svg>
            <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, background: '#E53935', borderRadius: '50%', border: '2px solid white' }} />
          </button>
          {notifOpen && (
            <div className="card" style={{ position: 'absolute', right: 0, top: 44, width: 320, zIndex: 100, padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '14px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>Notifications</span>
                <span style={{ fontSize: 12, color: '#2A4B8D', cursor: 'pointer', fontWeight: 500 }}>Mark all read</span>
              </div>
              {[
                { title: 'New order received', desc: 'Order #ORD-2847 from BuildMart SA', time: '2 min ago', unread: true },
                { title: 'Low stock alert', desc: 'Steel Beam 100x50 — only 12 units left', time: '1 hr ago', unread: true },
                { title: 'OCR completed', desc: 'Catalogue_Q4_2025.pdf processed', time: '3 hr ago', unread: false },
              ].map((n, i) => (
                <div key={i} style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', cursor: 'pointer', background: n.unread ? '#f8fafc' : 'white', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.unread ? '#2A4B8D' : 'transparent', marginTop: 5, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1a2332' }}>{n.title}</div>
                    <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{n.desc}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false) }}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 10px 4px 4px', borderRadius: 8, border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer' }}
          >
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #4CAF50, #2A4B8D)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontSize: 11, fontWeight: 700 }}>AS</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#1a2332' }}>Cape Steel Supplies</span>
            <svg width="12" height="12" fill="none" stroke="#94a3b8" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
          </button>
          {profileOpen && (
            <div className="card" style={{ position: 'absolute', right: 0, top: 44, width: 200, zIndex: 100, padding: 8 }}>
              {[['Profile', '/settings'], ['Settings', '/settings'], ['Help & Support', '/settings']].map(([label, path]) => (
                <a key={label} href={path} style={{ display: 'block', padding: '8px 12px', borderRadius: 6, fontSize: 14, color: '#374151', textDecoration: 'none', transition: 'background 0.1s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>{label}</a>
              ))}
              <div style={{ borderTop: '1px solid #e2e8f0', margin: '4px 0' }} />
              <a href="/login" style={{ display: 'block', padding: '8px 12px', borderRadius: 6, fontSize: 14, color: '#E53935', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#fee2e2')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>Sign out</a>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close */}
      {(notifOpen || profileOpen) && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9 }} onClick={() => { setNotifOpen(false); setProfileOpen(false) }} />
      )}
    </header>
  )
}
