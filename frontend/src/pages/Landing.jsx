import { Link } from 'react-router-dom'
import { TEMPLATES } from '../utils/templates'

export default function Landing() {
  const featured = TEMPLATES.filter(t => t.popular).slice(0, 6)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', overflowX: 'hidden' }}>

      {/* ── NAV ── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '14px 32px', background: 'rgba(7,7,14,0.85)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, background: 'var(--gradient-brand)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, boxShadow: '0 4px 14px rgba(108,99,255,0.4)' }}>📄</div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 19, letterSpacing: '-0.3px' }}>Resume<span style={{ color: 'var(--purple)' }}>Forge</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link to="/templates" className="btn btn-ghost btn-sm">Templates</Link>
          <Link to="/login" className="btn btn-ghost btn-sm">Sign In</Link>
          <Link to="/register" className="btn btn-primary btn-sm">Get Started →</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px', position: 'relative', textAlign: 'center' }}>

        {/* Ambient glows */}
        <div style={{ position: 'absolute', top: '20%', left: '15%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)', pointerEvents: 'none', animation: 'float 6s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '40%', right: '10%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(0,217,255,0.08) 0%, transparent 70%)', pointerEvents: 'none', animation: 'float 8s ease-in-out infinite reverse' }} />
        <div style={{ position: 'absolute', bottom: '20%', left: '50%', width: 500, height: 200, transform: 'translateX(-50%)', background: 'radial-gradient(ellipse, rgba(108,99,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.25)', borderRadius: 'var(--radius-full)', fontSize: 12, fontWeight: 600, color: 'var(--purple-light)', marginBottom: 28, letterSpacing: '0.3px', animation: 'slideUp 0.5s ease-out both' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
          FREE • AI-POWERED • OPEN SOURCE
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px, 8vw, 86px)', fontWeight: 900, lineHeight: 1.0, marginBottom: 24, letterSpacing: '-2px', animation: 'slideUp 0.5s ease-out 0.1s both' }}>
          Resumes that<br />
          <span className="text-gradient">get you hired</span>
        </h1>

        <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 520, lineHeight: 1.75, marginBottom: 40, animation: 'slideUp 0.5s ease-out 0.2s both' }}>
          15 stunning templates. AI-powered content. One-click DOCX & PDF export.
          Stop getting ignored. Start getting interviews.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', animation: 'slideUp 0.5s ease-out 0.3s both' }}>
          <Link to="/register" className="btn btn-primary btn-lg">🚀 Build Your Resume Free</Link>
          <Link to="/templates" className="btn btn-secondary btn-lg">👀 See Templates</Link>
        </div>

        {/* Social proof */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 48, flexWrap: 'wrap', justifyContent: 'center', animation: 'slideUp 0.5s ease-out 0.4s both' }}>
          {[['✅','No credit card'], ['✅','100% free forever'], ['✅','DOCX & PDF'], ['✅','AI writing help']].map(([icon,text]) => (
            <span key={text} style={{ fontSize: 13, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>{icon} {text}</span>
          ))}
        </div>
      </section>

      {/* ── TEMPLATE SHOWCASE ── */}
      <section style={{ padding: '80px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: 'var(--purple)', marginBottom: 12, textTransform: 'uppercase' }}>15 Templates</div>
            <h2 style={{ fontSize: 38, fontFamily: 'var(--font-display)', marginBottom: 14, letterSpacing: '-0.5px' }}>
              Find your <span className="text-gradient">perfect vibe</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 440, margin: '0 auto' }}>From minimal to cyberpunk, dark to colorful — a template that matches your personality</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(175px, 1fr))', gap: 14 }}>
            {featured.map((t, i) => (
              <div key={t.id} style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)', transition: 'var(--transition)', cursor: 'pointer', animation: `slideUp 0.4s ease-out ${i*0.05}s both` }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.borderColor='var(--purple)'; e.currentTarget.style.boxShadow='0 12px 40px rgba(108,99,255,0.2)' }}
                onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.boxShadow='none' }}>
                <div style={{ height: 110, background: t.preview_gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, position: 'relative' }}>
                  📄
                  {t.popular && <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(108,99,255,0.9)', padding: '2px 7px', borderRadius: 20, fontSize: 9, color: 'white', fontWeight: 700, letterSpacing: '0.5px' }}>HOT</div>}
                </div>
                <div style={{ padding: '10px 12px', background: 'var(--bg-card)' }}>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.category}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <Link to="/templates" className="btn btn-secondary">View All 15 Templates →</Link>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: '96px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: 'var(--cyan)', marginBottom: 12, textTransform: 'uppercase' }}>Why ResumeForge</div>
            <h2 style={{ fontSize: 38, fontFamily: 'var(--font-display)', letterSpacing: '-0.5px' }}>Everything to <span className="text-gradient">land the job</span></h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 16 }}>
            {[
              { icon: '🤖', title: 'AI Writing Assistant', desc: 'Free Groq AI (llama3-70b) rewrites your bullet points, generates summaries, and boosts your ATS score automatically', color: '#6C63FF', glow: 'rgba(108,99,255,0.15)' },
              { icon: '🎨', title: '15 Pro Templates', desc: 'Dark mode, neon, minimal, corporate — every template is crafted to stop the recruiter mid-scroll', color: '#00D9FF', glow: 'rgba(0,217,255,0.12)' },
              { icon: '📄', title: 'DOCX & PDF Export', desc: 'One click and your resume downloads as a perfectly formatted Word doc or PDF — ready to send', color: '#00E5A0', glow: 'rgba(0,229,160,0.12)' },
              { icon: '🎯', title: 'ATS Optimizer', desc: 'Our AI analyzes your resume against job descriptions and tells you exactly which keywords to add', color: '#FF6B9D', glow: 'rgba(255,107,157,0.12)' },
              { icon: '⚡', title: 'Live Preview', desc: 'Watch your resume update in real-time as you type — what you see is exactly what you get', color: '#FFD60A', glow: 'rgba(255,214,10,0.12)' },
              { icon: '🔒', title: 'Secure & Private', desc: 'JWT auth, bcrypt passwords, PostgreSQL — your data is yours and properly protected', color: '#FF8C42', glow: 'rgba(255,140,66,0.12)' },
            ].map((f, i) => (
              <div key={f.title} className="card" style={{ background: `radial-gradient(ellipse at top left, ${f.glow}, transparent 60%), var(--bg-card)`, border: '1px solid var(--border)', animation: `slideUp 0.4s ease-out ${i*0.07}s both` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = f.color + '50'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}>
                <div style={{ width: 44, height: 44, background: f.color + '18', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 16, border: `1px solid ${f.color}25` }}>{f.icon}</div>
                <h3 style={{ fontSize: 16, marginBottom: 8, fontFamily: 'var(--font-display)' }}>{f.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '80px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 38, fontFamily: 'var(--font-display)', letterSpacing: '-0.5px' }}>Done in <span className="text-gradient">3 steps</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 0, position: 'relative' }}>
            {[
              { step: '01', title: 'Pick a template', desc: 'Choose from 15 stunning designs that match your field and personality', icon: '🎨' },
              { step: '02', title: 'Fill in your info', desc: 'Add your experience, skills and projects. Let AI enhance your bullet points', icon: '✍️' },
              { step: '03', title: 'Download & apply', desc: 'Export as DOCX or PDF and start applying to your dream jobs', icon: '🚀' },
            ].map((s, i) => (
              <div key={s.step} style={{ textAlign: 'center', padding: '32px 28px', position: 'relative' }}>
                {i < 2 && <div style={{ position: 'absolute', top: '50px', right: 0, width: '50%', height: 1, background: 'linear-gradient(90deg, var(--purple), transparent)', zIndex: 0 }} />}
                <div style={{ width: 56, height: 56, background: 'var(--gradient-brand)', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto 16px', boxShadow: '0 8px 24px rgba(108,99,255,0.4)', position: 'relative', zIndex: 1 }}>{s.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--purple)', letterSpacing: 2, marginBottom: 8 }}>STEP {s.step}</div>
                <h3 style={{ fontSize: 18, fontFamily: 'var(--font-display)', marginBottom: 8 }}>{s.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '96px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(108,99,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <h2 style={{ fontSize: 42, fontFamily: 'var(--font-display)', marginBottom: 16, letterSpacing: '-1px' }}>
            Your dream job is <span className="text-gradient">one resume away</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 36, fontSize: 17 }}>Free forever. No credit card. Takes 5 minutes.</p>
          <Link to="/register" className="btn btn-primary btn-lg" style={{ fontSize: 17, padding: '16px 36px' }}>
            🚀 Start Building Now — Free
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: '20px 24px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>Resume<span style={{ color: 'var(--purple)' }}>Forge</span></span>
        <div style={{ display: 'flex', gap: 20, fontSize: 13, color: 'var(--text-muted)' }}>
          <span>MIT License</span>
          <span>Open Source</span>
          <span>Made with ❤️</span>
        </div>
      </footer>
    </div>
  )
}
