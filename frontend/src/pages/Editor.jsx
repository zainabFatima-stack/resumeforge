import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { resumeAPI, aiAPI, exportAPI } from '../utils/api'
import { TEMPLATES, getTemplate } from '../utils/templates'
import ResumePreview from '../components/ResumePreview'
import toast from 'react-hot-toast'

const TABS = ['Personal', 'Summary', 'Experience', 'Education', 'Skills', 'Projects', 'Certifications']

function genId() { return Math.random().toString(36).slice(2, 8) }

export default function Editor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('Personal')
  const [showPreview, setShowPreview] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    resumeAPI.get(id).then(res => {
      const d = res.data
      if (!d.personal_info) d.personal_info = {}
      if (!d.experience) d.experience = []
      if (!d.education) d.education = []
      if (!d.skills) d.skills = []
      if (!d.projects) d.projects = []
      if (!d.certifications) d.certifications = []
      if (!d.languages) d.languages = []
      setResume(d)
    }).catch(() => { toast.error('Resume not found'); navigate('/dashboard') })
      .finally(() => setLoading(false))
  }, [id])

  const save = useCallback(async (data) => {
    setSaving(true)
    try {
      await resumeAPI.update(id, data)
    } catch { toast.error('Save failed') }
    finally { setSaving(false) }
  }, [id])

  const update = (field, value) => {
    const updated = { ...resume, [field]: value }
    setResume(updated)
    save(updated)
  }

  const updatePersonal = (key, value) => {
    const pi = { ...resume.personal_info, [key]: value }
    update('personal_info', pi)
  }

  const downloadDocx = async () => {
    setExporting(true)
    try {
      const blob = await exportAPI.downloadDocx(id)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a'); a.href = url
      a.download = `${resume.title}.docx`; a.click()
      URL.revokeObjectURL(url)
      toast.success('Downloaded as .docx!')
    } catch { toast.error('Export failed') }
    finally { setExporting(false) }
  }

  const downloadPdf = async () => {
    setExporting(true)
    try {
      const blob = await exportAPI.downloadPdf(id)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a'); a.href = url
      a.download = `${resume.title}.pdf`; a.click()
      URL.revokeObjectURL(url)
      toast.success('Downloaded as PDF!')
    } catch { toast.error('Export failed') }
    finally { setExporting(false) }
  }

  const enhanceBullet = async (expIndex, bulletIndex, text) => {
    if (!text.trim()) return toast.error('Enter a bullet point first')
    setAiLoading(true)
    try {
      const res = await aiAPI.enhanceBullet({ bullet: text, job_title: resume.experience[expIndex]?.position })
      const newExp = [...resume.experience]
      newExp[expIndex].description[bulletIndex] = res.data.enhanced
      update('experience', newExp)
      toast.success('✨ AI enhanced!')
    } catch { toast.error('AI unavailable - add Groq API key') }
    finally { setAiLoading(false) }
  }

  const generateSummary = async () => {
    const skills = resume.skills?.flatMap(sg => sg.items || []) || []
    setAiLoading(true)
    try {
      const res = await aiAPI.generateSummary({
        job_title: resume.personal_info?.title || 'Professional',
        years_experience: 3,
        skills: skills.slice(0, 8),
      })
      const summaryText = res.data.summary || res.data.enhanced || res.data
      update('summary', typeof summaryText === 'string' ? summaryText : JSON.stringify(summaryText))
      toast.success('✨ Summary generated!')
    } catch (err) {
      console.log('AI error:', err.response?.data)
      toast.error('AI unavailable - add Groq API key')
    } finally { setAiLoading(false) }
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="animate-spin" style={{ width: 40, height: 40, border: '3px solid var(--purple)', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 16px' }} />
        <p style={{ color: 'var(--text-secondary)' }}>Loading your resume...</p>
      </div>
    </div>
  )

  const template = getTemplate(resume.template_id)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      {/* Top Bar */}
      <div style={{
        padding: '12px 20px', background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 12,
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/dashboard')}>← Back</button>

        <input
          value={resume.title}
          onChange={e => update('title', e.target.value)}
          style={{
            background: 'transparent', border: 'none', outline: 'none',
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 16, color: 'var(--text-primary)', minWidth: 200,
          }}
        />

        <div style={{ flex: 1 }} />

        {saving && <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Saving...</span>}
        {!saving && <span style={{ fontSize: 12, color: 'var(--green)' }}>✓ Saved</span>}

        {/* Template picker */}
        <div style={{ position: 'relative' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setShowTemplates(!showTemplates)}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: template.preview_gradient, display: 'inline-block' }} />
            {template.name}
          </button>
          {showTemplates && (
            <div style={{
              position: 'absolute', top: '100%', right: 0, marginTop: 8,
              background: 'var(--bg-elevated)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: 12,
              display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: 8,
              zIndex: 200, boxShadow: 'var(--shadow-lg)',
            }}>
              {TEMPLATES.map(t => (
                <div key={t.id} onClick={() => { update('template_id', t.id); setShowTemplates(false) }}
                  style={{
                    cursor: 'pointer', borderRadius: 8, overflow: 'hidden',
                    border: `2px solid ${t.id === resume.template_id ? 'var(--purple)' : 'transparent'}`,
                    transition: 'var(--transition)',
                  }}>
                  <div style={{ height: 40, background: t.preview_gradient }} />
                  <div style={{ padding: '4px 6px', fontSize: 9, fontWeight: 600, color: 'var(--text-secondary)', background: 'var(--bg-card)', textAlign: 'center' }}>{t.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="btn btn-secondary btn-sm" onClick={() => setShowPreview(!showPreview)}>
          {showPreview ? '✏️ Edit' : '👁️ Preview'}
        </button>

        <div style={{ position: 'relative' }}>
          <button className="btn btn-primary btn-sm" onClick={downloadDocx} disabled={exporting}>
            {exporting ? '...' : '⬇️ DOCX'}
          </button>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={downloadPdf} disabled={exporting}>
          {exporting ? '...' : '⬇️ PDF'}
        </button>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Editor Panel */}
        {!showPreview && (
          <div style={{
            width: showPreview ? 0 : '50%', minWidth: 380,
            background: 'var(--bg-secondary)',
            borderRight: '1px solid var(--border)',
            overflowY: 'auto', flexShrink: 0,
          }}>
            {/* Section Tabs */}
            <div style={{
              display: 'flex', gap: 2, padding: '12px 16px',
              borderBottom: '1px solid var(--border)',
              overflowX: 'auto', flexShrink: 0,
            }}>
              {TABS.map(tab => (
                <button key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '6px 12px', fontSize: 12, fontWeight: 600,
                    borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: activeTab === tab ? 'var(--purple)' : 'transparent',
                    color: activeTab === tab ? 'white' : 'var(--text-secondary)',
                    whiteSpace: 'nowrap', transition: 'var(--transition)',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div style={{ padding: 20 }}>
              {/* Personal Info */}
              {activeTab === 'Personal' && (
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 16, fontSize: 16 }}>Personal Information</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {[
                      { key: 'full_name', label: 'Full Name', placeholder: 'Alex Johnson' },
                      { key: 'title', label: 'Job Title', placeholder: 'Software Engineer' },
                      { key: 'email', label: 'Email', placeholder: 'alex@email.com' },
                      { key: 'phone', label: 'Phone', placeholder: '+1 (555) 000-0000' },
                      { key: 'location', label: 'Location', placeholder: 'New York, NY' },
                      { key: 'website', label: 'Website', placeholder: 'alexjohnson.dev' },
                      { key: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/alex' },
                      { key: 'github', label: 'GitHub', placeholder: 'github.com/alexj' },
                    ].map(field => (
                      <div key={field.key} className="form-group">
                        <label className="form-label">{field.label}</label>
                        <input className="form-input" placeholder={field.placeholder}
                          value={resume.personal_info?.[field.key] || ''}
                          onChange={e => updatePersonal(field.key, e.target.value)} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Summary */}
              {activeTab === 'Summary' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16 }}>Professional Summary</h3>
                    <button className="btn btn-secondary btn-sm" onClick={generateSummary} disabled={aiLoading}
                      style={{ fontSize: 11, gap: 4 }}>
                      {aiLoading ? '...' : '🤖 AI Generate'}
                    </button>
                  </div>
                  <textarea className="form-textarea"
                    placeholder="Write a compelling professional summary..."
                    value={resume.summary || ''} rows={6}
                    onChange={e => update('summary', e.target.value)}
                    style={{ minHeight: 140 }}
                  />
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
                    💡 Click "AI Generate" to auto-write your summary using your profile info
                  </p>
                </div>
              )}

              {/* Experience */}
              {activeTab === 'Experience' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16 }}>Work Experience</h3>
                    <button className="btn btn-primary btn-sm" onClick={() => {
                      update('experience', [...(resume.experience || []), {
                        id: genId(), company: '', position: '', start_date: '', end_date: 'Present',
                        location: '', description: [''], current: true,
                      }])
                    }}>+ Add</button>
                  </div>
                  {(resume.experience || []).map((exp, ei) => (
                    <div key={exp.id || ei} className="card" style={{ marginBottom: 12, padding: 14 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>Position #{ei + 1}</span>
                        <button className="btn btn-danger btn-sm" style={{ padding: '3px 8px', fontSize: 11 }}
                          onClick={() => update('experience', resume.experience.filter((_, i) => i !== ei))}>
                          Remove
                        </button>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        <div className="form-group">
                          <label className="form-label">Company</label>
                          <input className="form-input" placeholder="Google" value={exp.company}
                            onChange={e => { const n=[...resume.experience]; n[ei]={...n[ei],company:e.target.value}; update('experience',n) }} />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Position</label>
                          <input className="form-input" placeholder="Software Engineer" value={exp.position}
                            onChange={e => { const n=[...resume.experience]; n[ei]={...n[ei],position:e.target.value}; update('experience',n) }} />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Start Date</label>
                          <input className="form-input" placeholder="Jan 2022" value={exp.start_date}
                            onChange={e => { const n=[...resume.experience]; n[ei]={...n[ei],start_date:e.target.value}; update('experience',n) }} />
                        </div>
                        <div className="form-group">
                          <label className="form-label">End Date</label>
                          <input className="form-input" placeholder="Present" value={exp.end_date}
                            onChange={e => { const n=[...resume.experience]; n[ei]={...n[ei],end_date:e.target.value}; update('experience',n) }} />
                        </div>
                        <div className="form-group" style={{ gridColumn: '1/-1' }}>
                          <label className="form-label">Location</label>
                          <input className="form-input" placeholder="Mountain View, CA" value={exp.location || ''}
                            onChange={e => { const n=[...resume.experience]; n[ei]={...n[ei],location:e.target.value}; update('experience',n) }} />
                        </div>
                      </div>
                      {/* Bullet points */}
                      <div style={{ marginTop: 10 }}>
                        <label className="form-label" style={{ marginBottom: 6, display: 'block' }}>Bullet Points</label>
                        {(exp.description || ['']).map((bullet, bi) => (
                          <div key={bi} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                            <textarea className="form-textarea" placeholder="• Increased API performance by 40%..."
                              value={bullet} rows={2} style={{ flex: 1, minHeight: 0 }}
                              onChange={e => {
                                const n=[...resume.experience]; n[ei]={...n[ei]};
                                n[ei].description=[...n[ei].description]; n[ei].description[bi]=e.target.value;
                                update('experience',n)
                              }}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                              <button title="AI Enhance" style={{ padding: '4px 6px', fontSize: 12, background: 'rgba(108,99,255,0.15)', border: '1px solid var(--purple)', borderRadius: 6, cursor: 'pointer', color: 'var(--purple)' }}
                                onClick={() => enhanceBullet(ei, bi, bullet)} disabled={aiLoading}>
                                {aiLoading ? '...' : '🤖'}
                              </button>
                              <button title="Remove" style={{ padding: '4px 6px', fontSize: 12, background: 'rgba(255,60,60,0.1)', border: '1px solid rgba(255,60,60,0.2)', borderRadius: 6, cursor: 'pointer', color: '#FF6060' }}
                                onClick={() => {
                                  const n=[...resume.experience]; n[ei]={...n[ei]};
                                  n[ei].description=n[ei].description.filter((_,i)=>i!==bi);
                                  if(!n[ei].description.length) n[ei].description=[''];
                                  update('experience',n)
                                }}>✕</button>
                            </div>
                          </div>
                        ))}
                        <button style={{ fontSize: 11, color: 'var(--purple)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                          onClick={() => { const n=[...resume.experience]; n[ei]={...n[ei],description:[...(n[ei].description||[]),'']};update('experience',n) }}>
                          + Add bullet
                        </button>
                      </div>
                    </div>
                  ))}
                  {!resume.experience?.length && (
                    <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)', fontSize: 13 }}>
                      No experience added yet. Click "+ Add" to start.
                    </div>
                  )}
                </div>
              )}

              {/* Education */}
              {activeTab === 'Education' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16 }}>Education</h3>
                    <button className="btn btn-primary btn-sm" onClick={() => update('education', [...(resume.education||[]), { id: genId(), institution:'',degree:'',field:'',start_date:'',end_date:'',gpa:'' }])}>+ Add</button>
                  </div>
                  {(resume.education||[]).map((edu, ei) => (
                    <div key={edu.id||ei} className="card" style={{ marginBottom: 12, padding: 14 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>Education #{ei+1}</span>
                        <button className="btn btn-danger btn-sm" style={{ padding: '3px 8px', fontSize: 11 }}
                          onClick={() => update('education', resume.education.filter((_,i)=>i!==ei))}>Remove</button>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        {[
                          { key:'institution', label:'University/School', placeholder:'MIT', full:true },
                          { key:'degree', label:'Degree', placeholder:'Bachelor of Science' },
                          { key:'field', label:'Field of Study', placeholder:'Computer Science' },
                          { key:'start_date', label:'Start Year', placeholder:'2018' },
                          { key:'end_date', label:'End Year', placeholder:'2022' },
                          { key:'gpa', label:'GPA (optional)', placeholder:'3.8' },
                        ].map(f => (
                          <div key={f.key} className="form-group" style={f.full ? {gridColumn:'1/-1'} : {}}>
                            <label className="form-label">{f.label}</label>
                            <input className="form-input" placeholder={f.placeholder} value={edu[f.key]||''}
                              onChange={e => { const n=[...resume.education]; n[ei]={...n[ei],[f.key]:e.target.value}; update('education',n) }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills */}
              {activeTab === 'Skills' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16 }}>Skills</h3>
                    <button className="btn btn-primary btn-sm" onClick={() => update('skills', [...(resume.skills||[]), { id:genId(), category:'Technical Skills', items:[] }])}>+ Add Category</button>
                  </div>
                  {(resume.skills||[]).map((sg, si) => (
                    <div key={sg.id||si} className="card" style={{ marginBottom: 12, padding: 14 }}>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                        <input className="form-input" placeholder="Category (e.g. Languages)" value={sg.category}
                          style={{ flex: 1 }}
                          onChange={e => { const n=[...resume.skills]; n[si]={...n[si],category:e.target.value}; update('skills',n) }} />
                        <button className="btn btn-danger btn-sm" onClick={() => update('skills', resume.skills.filter((_,i)=>i!==si))}>✕</button>
                      </div>
                      <input className="form-input"
                        placeholder="React, Node.js, Python (comma separated)"
                        value={(sg.items||[]).join(', ')}
                        onChange={e => {
                          const n=[...resume.skills]; n[si]={...n[si],items:e.target.value.split(',').map(s=>s.trim()).filter(Boolean)};
                          update('skills',n)
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Projects */}
              {activeTab === 'Projects' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16 }}>Projects</h3>
                    <button className="btn btn-primary btn-sm" onClick={() => update('projects', [...(resume.projects||[]), { id:genId(),name:'',description:'',technologies:[],url:'',github:'' }])}>+ Add</button>
                  </div>
                  {(resume.projects||[]).map((proj, pi) => (
                    <div key={proj.id||pi} className="card" style={{ marginBottom: 12, padding: 14 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>Project #{pi+1}</span>
                        <button className="btn btn-danger btn-sm" style={{ padding: '3px 8px', fontSize: 11 }}
                          onClick={() => update('projects', resume.projects.filter((_,i)=>i!==pi))}>Remove</button>
                      </div>
                      <div style={{ display: 'grid', gap: 10 }}>
                        {[
                          { key:'name', label:'Project Name', placeholder:'ResumeForge' },
                          { key:'url', label:'Live URL', placeholder:'https://...' },
                          { key:'github', label:'GitHub URL', placeholder:'https://github.com/...' },
                        ].map(f => (
                          <div key={f.key} className="form-group">
                            <label className="form-label">{f.label}</label>
                            <input className="form-input" placeholder={f.placeholder} value={proj[f.key]||''}
                              onChange={e => { const n=[...resume.projects]; n[pi]={...n[pi],[f.key]:e.target.value}; update('projects',n) }} />
                          </div>
                        ))}
                        <div className="form-group">
                          <label className="form-label">Technologies</label>
                          <input className="form-input" placeholder="React, FastAPI, PostgreSQL"
                            value={(proj.technologies||[]).join(', ')}
                            onChange={e => { const n=[...resume.projects]; n[pi]={...n[pi],technologies:e.target.value.split(',').map(s=>s.trim()).filter(Boolean)}; update('projects',n) }} />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Description</label>
                          <textarea className="form-textarea" placeholder="What did you build and why?" rows={3}
                            value={proj.description||''}
                            onChange={e => { const n=[...resume.projects]; n[pi]={...n[pi],description:e.target.value}; update('projects',n) }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Certifications */}
              {activeTab === 'Certifications' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16 }}>Certifications</h3>
                    <button className="btn btn-primary btn-sm" onClick={() => update('certifications', [...(resume.certifications||[]), { id:genId(),name:'',issuer:'',date:'',url:'' }])}>+ Add</button>
                  </div>
                  {(resume.certifications||[]).map((cert, ci) => (
                    <div key={cert.id||ci} className="card" style={{ marginBottom: 12, padding: 14 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        {[
                          { key:'name', label:'Certification Name', placeholder:'AWS Solutions Architect' },
                          { key:'issuer', label:'Issuing Body', placeholder:'Amazon' },
                          { key:'date', label:'Date', placeholder:'Dec 2023' },
                          { key:'url', label:'Credential URL', placeholder:'https://...' },
                        ].map(f => (
                          <div key={f.key} className="form-group">
                            <label className="form-label">{f.label}</label>
                            <input className="form-input" placeholder={f.placeholder} value={cert[f.key]||''}
                              onChange={e => { const n=[...resume.certifications]; n[ci]={...n[ci],[f.key]:e.target.value}; update('certifications',n) }} />
                          </div>
                        ))}
                      </div>
                      <div style={{ textAlign: 'right', marginTop: 8 }}>
                        <button className="btn btn-danger btn-sm" onClick={() => update('certifications', resume.certifications.filter((_,i)=>i!==ci))}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Preview Panel */}
        <div style={{ flex: 1, overflowY: 'auto', background: '#1A1A2E', padding: 24, minWidth: 0 }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <ResumePreview resume={resume} template={template} />
          </div>
        </div>
      </div>
    </div>
  )
}
