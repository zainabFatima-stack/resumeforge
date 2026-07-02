import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TEMPLATES } from '../utils/templates'

export default function Templates() {
  const [filter, setFilter] = useState('All')
  const categories = ['All', ...new Set(TEMPLATES.map(t => t.category))]
  const filtered = filter === 'All' ? TEMPLATES : TEMPLATES.filter(t => t.category === filter)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <nav style={{ padding: '16px 24px', background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, background: 'var(--gradient-brand)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>📄</div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--text-primary)' }}>Resume<span style={{ color: 'var(--purple)' }}>Forge</span></span>
        </Link>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link to="/login" className="btn btn-ghost btn-sm">Sign In</Link>
          <Link to="/register" className="btn btn-primary btn-sm">Get Started Free</Link>
        </div>
      </nav>
      <div className="container" style={{ padding: '48px 24px', maxWidth: 1100 }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontSize: 42, fontFamily: 'var(--font-display)', marginBottom: 12 }}>Choose your <span className="text-gradient">perfect template</span></h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>15 professionally designed templates. All customizable, all free.</p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 36 }}>
          {categories.map(cat => (
            <button key={cat} className={filter === cat ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'} onClick={() => setFilter(cat)}>{cat}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
          {filtered.map(template => (
            <div key={template.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', transition: 'var(--transition)', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.borderColor='var(--purple)' }}
              onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor='var(--border)' }}>
              <div style={{ height: 160, background: template.preview_gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', fontSize: 40 }}>
                📄
                {template.popular && <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(108,99,255,0.9)', padding: '2px 10px', borderRadius: 20, fontSize: 10, color: 'white', fontWeight: 600 }}>🔥 POPULAR</div>}
              </div>
              <div style={{ padding: '16px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700 }}>{template.name}</h3>
                  <span style={{ fontSize: 10, background: 'rgba(108,99,255,0.15)', color: 'var(--purple-light)', padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>{template.category}</span>
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12, lineHeight: 1.5 }}>{template.description}</p>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 14 }}>
                  {template.tags.map(tag => <span key={tag} style={{ fontSize: 10, background: 'var(--bg-elevated)', color: 'var(--text-muted)', padding: '2px 8px', borderRadius: 20, border: '1px solid var(--border)' }}>{tag}</span>)}
                </div>
                <Link to="/register" className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>Use Template →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
