import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showForgot, setShowForgot] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/dashboard')
    }, 1200)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e3a6e 0%, #2A4B8D 50%, #1a5276 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      {/* Background pattern */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(76,175,80,0.1) 0%, transparent 50%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 440, position: 'relative' }}>
        {/* Card */}
        <div style={{ background: 'white', borderRadius: 16, padding: 40, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, #4CAF50, #2A4B8D)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 18, color: '#1a2332' }}>StoreBuild AI</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>Supplier Portal</div>
            </div>
          </div>

          {!showForgot ? (
            <>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1a2332', marginBottom: 6 }}>Welcome back</h2>
              <p style={{ fontSize: 14, color: '#64748b', marginBottom: 28 }}>Sign in to your supplier account</p>

              <form onSubmit={handleLogin}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Email address</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="supplier@company.co.za"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div style={{ marginBottom: 8 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Password</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
                  <button type="button" onClick={() => setShowForgot(true)} style={{ fontSize: 13, color: '#2A4B8D', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}>
                    Forgot password?
                  </button>
                </div>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: 15, fontWeight: 600 }}
                  disabled={loading}
                >
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                      Signing in...
                    </span>
                  ) : 'Sign in'}
                </button>
              </form>

              <div style={{ marginTop: 24, padding: 16, background: '#F4F6FA', borderRadius: 8, fontSize: 13, color: '#64748b' }}>
                <strong style={{ color: '#374151' }}>Demo access:</strong> Use any email + password to sign in
              </div>
            </>
          ) : (
            <>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1a2332', marginBottom: 6 }}>Reset password</h2>
              <p style={{ fontSize: 14, color: '#64748b', marginBottom: 28 }}>Enter your email to receive reset instructions</p>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Email address</label>
                <input type="email" className="form-input" placeholder="supplier@company.co.za" />
              </div>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: 15 }}>Send reset link</button>
              <button onClick={() => setShowForgot(false)} style={{ display: 'block', width: '100%', textAlign: 'center', marginTop: 16, fontSize: 14, color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}>
                ← Back to sign in
              </button>
            </>
          )}
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
          © 2025 StoreBuild AI · Proudly South African 🇿🇦
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
