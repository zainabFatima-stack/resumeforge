import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

export default function Register() {
  const [form, setForm] = useState({ full_name: '', username: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password || !form.username) return toast.error('Fill in all required fields')
    if (form.password.length < 8) return toast.error('Password must be at least 8 characters')
    if (form.username.length < 3) return toast.error('Username must be at least 3 characters')

    setLoading(true)
    try {
      await register(form)
      toast.success('Account created! Let\'s build your resume 🚀')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const strength = form.password.length === 0 ? 0
    : form.password.length < 6 ? 1
    : form.password.length < 10 ? 2 : 3

  const strengthColors = ['transparent', '#FF6060', '#FFD60A', '#00E5A0']
  const strengthLabels = ['', 'Weak', 'Good', 'Strong 💪']

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500, height: 300,
        background: 'radial-gradient(ellipse, rgba(0,217,255,0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 40, height: 40, background: 'var(--gradient-brand)', borderRadius: 10, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📄</div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: 'var(--text-primary)' }}>
              Resume<span style={{ color: 'var(--purple)' }}>Forge</span>
            </span>
          </Link>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 36 }}>
          <h1 style={{ fontSize: 26, fontFamily: 'var(--font-display)', marginBottom: 6 }}>Create your account ✨</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 28 }}>
            Free forever. No credit card required.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: 14 }}>
              <label className="form-label">Full Name</label>
              <input className="form-input" name="full_name" placeholder="Alex Johnson" value={form.full_name} onChange={handleChange} />
            </div>

            <div className="form-group" style={{ marginBottom: 14 }}>
              <label className="form-label">Username <span style={{ color: 'var(--pink)' }}>*</span></label>
              <input className="form-input" name="username" placeholder="alexj" value={form.username} onChange={handleChange} required />
            </div>

            <div className="form-group" style={{ marginBottom: 14 }}>
              <label className="form-label">Email <span style={{ color: 'var(--pink)' }}>*</span></label>
              <input className="form-input" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
            </div>

            <div className="form-group" style={{ marginBottom: 8 }}>
              <label className="form-label">Password <span style={{ color: 'var(--pink)' }}>*</span></label>
              <div style={{ position: 'relative' }}>
                <input
                  className="form-input" type={showPass ? 'text' : 'password'}
                  name="password" placeholder="Min. 8 characters"
                  value={form.password} onChange={handleChange} required
                  style={{ paddingRight: 44 }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 16 }}>
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {form.password.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                  {[1,2,3].map(i => (
                    <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= strength ? strengthColors[strength] : 'var(--border)', transition: 'var(--transition)' }} />
                  ))}
                </div>
                <span style={{ fontSize: 11, color: strengthColors[strength] }}>{strengthLabels[strength]}</span>
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px', marginTop: form.password.length > 0 ? 0 : 20 }} disabled={loading}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="animate-spin" style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', display: 'block' }}></span>
                  Creating account...
                </span>
              ) : '🚀 Create Free Account'}
            </button>
          </form>

          <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--border)', textAlign: 'center', fontSize: 14, color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--purple)', fontWeight: 600 }}>Sign in →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
