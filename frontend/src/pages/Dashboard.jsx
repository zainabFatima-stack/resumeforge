import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { resumeAPI } from '../utils/api'
import { getTemplate, TEMPLATES } from '../utils/templates'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [newTitle, setNewTitle] = useState('My Resume')
  const [selectedTemplate, setSelectedTemplate] = useState('midnight_pro')
  const [search, setSearch] = useState('')

  useEffect(() => { fetchResumes() }, [])

  const fetchResumes = async () => {
    try { const res = await resumeAPI.list(); setResumes(res.data) }
    catch { toast.error('Failed to load resumes') }
    finally { setLoading(false) }
  }

  const createResume = async () => {
    if (!newTitle.trim()) return toast.error('Enter a title')
    setCreating(true)
    try {
      const res = await resumeAPI.create({ title: newTitle, template_id: selectedTemplate })
      toast.success('Resume created! 🎉')
      setShowModal(false)
      navigate(`/editor/${res.data.id}`)
    } catch { toast.error('Failed to create') }
    finally { setCreating(false) }
  }

  const deleteResume = async (id, e) => {
    e.stopPropagation()
    if (!confirm('Delete this resume?')) return
    try { await resumeAPI.delete(id); setResumes(r => r.filter(x => x.id !== id)); toast.success('Deleted') }
    catch { toast.error('Failed to delete') }
  }

  const duplicateResume = async (id, e) => {
    e.stopPropagation()
    try { const res = await resumeAPI.duplicate(id); setResumes(r => [...r, res.data]); toast.success('Duplicated! 📋') }
    catch { toast.error('Failed to duplicate') }
  }

  const filtered = resumes.filter(r => r.title.toLowerCase().includes(search.toLowerCase()))
  const initials = (user?.full_name || user?.username || 'U').split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>

      {/* Sidebar */}
      <div style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: 220, background: 'var(--bg-secondary)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', zIndex: 50, padding: '20px 0' }}>
        <div style={{ padding: '0 20px 20px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{ width: 30, height: 30, background: 'var(--gradient-brand)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>📄</div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16 }}>Resume<span style={{ color: 'var(--purple)' }}>Forge</span></span>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[
            { icon: '🏠', label: 'Dashboard', active: true },
            { icon: '🎨', label: 'Templates', onClick: () => navigate('/templates') },
          ].map(item => (
            <button key={item.label} onClick={item.onClick}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, width: '100%', textAlign: 'left', background: item.active ? 'rgba(108,99,255,0.12)' : 'transparent', color: item.active ? 'var(--purple-light)' : 'var(--text-secondary)', transition: 'var(--transition)' }}
              onMouseEnter={e => { if(!item.active) { e.currentTarget.style.background='var(--bg-elevated)'; e.currentTarget.style.color='var(--text-primary)' }}}
              onMouseLeave={e => { if(!item.active) { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--text-secondary)' }}}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>

        {/* User profile */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'white', flexShrink: 0 }}>{initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.full_name || user?.username}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</div>
            </div>
            <button onClick={logout} title="Sign out" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 16, padding: 2 }}>↩</button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ marginLeft: 220, padding: '32px', minHeight: '100vh' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 26, fontFamily: 'var(--font-display)', marginBottom: 4, letterSpacing: '-0.3px' }}>My Resumes</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{resumes.length === 0 ? 'Create your first resume and land that job 🎯' : `${resumes.length} resume${resumes.length !== 1 ? 's' : ''}`}</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ New Resume</button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 28 }}>
          {[
            { label: 'Total Resumes', value: resumes.length, icon: '📄', color: 'var(--purple)' },
            { label: 'Templates Used', value: new Set(resumes.map(r => r.template_id)).size, icon: '🎨', color: 'var(--cyan)' },
            { label: 'AI Credits', value: '∞', icon: '🤖', color: 'var(--green)' },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 40, height: 40, background: s.color + '18', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-display)', color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Search */}
        {resumes.length > 0 && (
          <div style={{ position: 'relative', marginBottom: 20 }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: 16 }}>🔍</span>
            <input className="form-input" placeholder="Search resumes..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 36 }} />
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
            {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 200, borderRadius: 'var(--radius-lg)' }} />)}
          </div>
        ) : filtered.length === 0 && resumes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px', background: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', border: '2px dashed var(--border)' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🚀</div>
            <h3 style={{ fontSize: 20, marginBottom: 8, fontFamily: 'var(--font-display)' }}>No resumes yet</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24, fontSize: 14 }}>Create your first resume and start landing interviews</p>
            <button className="btn btn-primary btn-lg" onClick={() => setShowModal(true)}>+ Create Your First Resume</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
            {filtered.map(resume => {
              const t = getTemplate(resume.template_id)
              const date = new Date(resume.updated_at || resume.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
              return (
                <div key={resume.id} onClick={() => navigate(`/editor/${resume.id}`)}
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', cursor: 'pointer', transition: 'var(--transition)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--purple)'; e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 8px 30px rgba(108,99,255,0.15)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none' }}>
                  <div style={{ height: 90, background: t.preview_gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', fontSize: 28 }}>
                    📄
                    <div style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', padding: '2px 8px', borderRadius: 20, fontSize: 10, color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>{t.name}</div>
                  </div>
                  <div style={{ padding: '12px 14px' }}>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 3 }}>{resume.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12 }}>Edited {date}</div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center', fontSize: 12 }} onClick={e => { e.stopPropagation(); navigate(`/editor/${resume.id}`) }}>Edit</button>
                      <button className="btn btn-secondary btn-sm" title="Duplicate" onClick={e => duplicateResume(resume.id, e)}>📋</button>
                      <button className="btn btn-danger btn-sm" title="Delete" onClick={e => deleteResume(resume.id, e)}>🗑️</button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 28, width: '100%', maxWidth: 520, maxHeight: '85vh', overflowY: 'auto', animation: 'slideUp 0.25s ease-out both' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginBottom: 20 }}>Create New Resume ✨</h2>

            <div className="form-group" style={{ marginBottom: 20 }}>
              <label className="form-label">Resume Title</label>
              <input className="form-input" placeholder="e.g. Software Engineer at Google" value={newTitle} onChange={e => setNewTitle(e.target.value)} autoFocus onKeyDown={e => e.key === 'Enter' && createResume()} />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label className="form-label" style={{ marginBottom: 10, display: 'block' }}>Choose Template</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {TEMPLATES.map(t => (
                  <div key={t.id} onClick={() => setSelectedTemplate(t.id)}
                    style={{ borderRadius: 10, overflow: 'hidden', border: `2px solid ${selectedTemplate === t.id ? 'var(--purple)' : 'var(--border)'}`, cursor: 'pointer', transition: 'var(--transition)', boxShadow: selectedTemplate === t.id ? 'var(--shadow-glow)' : 'none' }}>
                    <div style={{ height: 44, background: t.preview_gradient }} />
                    <div style={{ padding: '4px 6px', background: 'var(--bg-elevated)', fontSize: 9, fontWeight: 600, textAlign: 'center', color: 'var(--text-secondary)' }}>{t.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" style={{ flex: 2, justifyContent: 'center' }} onClick={createResume} disabled={creating}>{creating ? 'Creating...' : '🚀 Create Resume'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
