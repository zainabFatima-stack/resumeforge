export default function ResumePreview({ resume, template }) {
  if (!resume || !template) return null
  const info = resume.personal_info || {}

  const styles = {
    midnight_pro: () => <MidnightPro resume={resume} info={info} colors={template.colors} />,
    aurora: () => <Aurora resume={resume} info={info} colors={template.colors} />,
    clean_slate: () => <CleanSlate resume={resume} info={info} colors={template.colors} />,
    neo_tokyo: () => <NeoTokyo resume={resume} info={info} colors={template.colors} />,
    botanical: () => <LightTemplate resume={resume} info={info} colors={template.colors} accentStyle="botanical" />,
    royal_navy: () => <ClassicTemplate resume={resume} info={info} colors={template.colors} accentStyle="royal_navy" />,
    sunset_warm: () => <LightTemplate resume={resume} info={info} colors={template.colors} accentStyle="sunset_warm" />,
    mono_grid: () => <MonoGrid resume={resume} info={info} colors={template.colors} />,
    neon_pulse: () => <NeonPulse resume={resume} info={info} colors={template.colors} />,
    paper_craft: () => <LightTemplate resume={resume} info={info} colors={template.colors} accentStyle="paper_craft" />,
    silicon_valley: () => <LightTemplate resume={resume} info={info} colors={template.colors} accentStyle="silicon_valley" />,
    rose_gold: () => <LightTemplate resume={resume} info={info} colors={template.colors} accentStyle="rose_gold" />,
    executive: () => <ExecutiveTemplate resume={resume} info={info} colors={template.colors} />,
    glassmorphism: () => <Glassmorphism resume={resume} info={info} colors={template.colors} />,
    retro_wave: () => <RetroWave resume={resume} info={info} colors={template.colors} />,
  }

  const render = styles[template.id] || styles.midnight_pro
  return (
    <div style={{
      background: 'white',
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      fontFamily: 'Georgia, serif',
      fontSize: 14,
    }}>
      {render()}
    </div>
  )
}

// ============================================
// TEMPLATE 1: Midnight Pro (Dark Modern)
// ============================================
function MidnightPro({ resume, info, colors }) {
  return (
    <div style={{ background: '#0A0A0F', color: '#F0F0FF', minHeight: 800, fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1A1A2E, #16213E)', padding: '36px 40px', borderBottom: '2px solid #6C63FF' }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: 2, margin: 0, color: 'white' }}>
          {info.full_name || 'YOUR NAME'}
        </h1>
        {info.title && <div style={{ color: '#6C63FF', fontSize: 14, marginTop: 4, fontWeight: 600, letterSpacing: 1 }}>{info.title}</div>}
        <div style={{ display: 'flex', gap: 16, marginTop: 12, flexWrap: 'wrap' }}>
          {[info.email, info.phone, info.location, info.github, info.linkedin].filter(Boolean).map((c,i) => (
            <span key={i} style={{ color: '#9090B0', fontSize: 11 }}>• {c}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: '28px 40px' }}>
        {resume.summary && <Section title="SUMMARY" color="#6C63FF"><p style={{ color: '#C0C0E0', lineHeight: 1.7, fontSize: 13 }}>{resume.summary}</p></Section>}
        {resume.experience?.length > 0 && <Section title="EXPERIENCE" color="#6C63FF">
          {resume.experience.map((exp,i) => <ExpItem key={i} exp={exp} primaryColor="#6C63FF" textColor="#C0C0E0" bgColor="rgba(108,99,255,0.08)" />)}
        </Section>}
        {resume.education?.length > 0 && <Section title="EDUCATION" color="#6C63FF">
          {resume.education.map((edu,i) => <EduItem key={i} edu={edu} primaryColor="#6C63FF" textColor="#C0C0E0" />)}
        </Section>}
        {resume.skills?.length > 0 && <Section title="SKILLS" color="#6C63FF">
          {resume.skills.map((sg,i) => <SkillGroup key={i} sg={sg} primaryColor="#6C63FF" tagBg="rgba(108,99,255,0.15)" tagColor="#6C63FF" />)}
        </Section>}
        {resume.projects?.length > 0 && <Section title="PROJECTS" color="#6C63FF">
          {resume.projects.map((proj,i) => <ProjectItem key={i} proj={proj} primaryColor="#6C63FF" textColor="#C0C0E0" />)}
        </Section>}
      </div>
    </div>
  )
}

// ============================================
// TEMPLATE 2: Aurora (Gradient/Colorful)
// ============================================
function Aurora({ resume, info, colors }) {
  return (
    <div style={{ background: '#0F0A1E', color: '#F8F8FF', minHeight: 800, fontFamily: 'Arial, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #4C1D95, #1D4ED8, #0891B2)', padding: '36px 40px' }}>
        <h1 style={{ fontSize: 30, fontWeight: 900, margin: 0, color: 'white', letterSpacing: 1 }}>{info.full_name || 'YOUR NAME'}</h1>
        {info.title && <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 6 }}>{info.title}</div>}
        <div style={{ display: 'flex', gap: 16, marginTop: 12, flexWrap: 'wrap' }}>
          {[info.email, info.phone, info.location].filter(Boolean).map((c,i) => (
            <span key={i} style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: 20 }}>{c}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: '28px 40px' }}>
        {resume.summary && <Section title="ABOUT" color="#A855F7"><p style={{ color: '#C0C0D8', lineHeight: 1.7, fontSize: 13 }}>{resume.summary}</p></Section>}
        {resume.experience?.length > 0 && <Section title="EXPERIENCE" color="#A855F7">
          {resume.experience.map((exp,i) => <ExpItem key={i} exp={exp} primaryColor="#A855F7" textColor="#C0C0D8" bgColor="rgba(168,85,247,0.08)" />)}
        </Section>}
        {resume.education?.length > 0 && <Section title="EDUCATION" color="#A855F7">
          {resume.education.map((edu,i) => <EduItem key={i} edu={edu} primaryColor="#A855F7" textColor="#C0C0D8" />)}
        </Section>}
        {resume.skills?.length > 0 && <Section title="SKILLS" color="#A855F7">
          {resume.skills.map((sg,i) => <SkillGroup key={i} sg={sg} primaryColor="#A855F7" tagBg="rgba(168,85,247,0.15)" tagColor="#A855F7" />)}
        </Section>}
      </div>
    </div>
  )
}

// ============================================
// TEMPLATE 3: Clean Slate (White/Minimal)
// ============================================
function CleanSlate({ resume, info, colors }) {
  return (
    <div style={{ background: 'white', color: '#1E293B', minHeight: 800, fontFamily: '"Helvetica Neue", sans-serif' }}>
      <div style={{ borderLeft: '5px solid #3B82F6', padding: '32px 40px', background: '#F8FAFC' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, color: '#1E293B', letterSpacing: 0.5 }}>{info.full_name || 'YOUR NAME'}</h1>
        {info.title && <div style={{ color: '#3B82F6', fontSize: 14, marginTop: 4 }}>{info.title}</div>}
        <div style={{ display: 'flex', gap: 16, marginTop: 10, flexWrap: 'wrap', fontSize: 12, color: '#64748B' }}>
          {[info.email, info.phone, info.location, info.linkedin].filter(Boolean).map((c,i) => <span key={i}>{c}</span>)}
        </div>
      </div>
      <div style={{ padding: '24px 40px' }}>
        {resume.summary && <LightSection title="PROFESSIONAL SUMMARY" color="#3B82F6"><p style={{ color: '#475569', lineHeight: 1.7, fontSize: 13 }}>{resume.summary}</p></LightSection>}
        {resume.experience?.length > 0 && <LightSection title="EXPERIENCE" color="#3B82F6">
          {resume.experience.map((exp,i) => <ExpItem key={i} exp={exp} primaryColor="#3B82F6" textColor="#475569" bgColor="#EFF6FF" light />)}
        </LightSection>}
        {resume.education?.length > 0 && <LightSection title="EDUCATION" color="#3B82F6">
          {resume.education.map((edu,i) => <EduItem key={i} edu={edu} primaryColor="#3B82F6" textColor="#475569" light />)}
        </LightSection>}
        {resume.skills?.length > 0 && <LightSection title="SKILLS" color="#3B82F6">
          {resume.skills.map((sg,i) => <SkillGroup key={i} sg={sg} primaryColor="#3B82F6" tagBg="#DBEAFE" tagColor="#1D4ED8" light />)}
        </LightSection>}
      </div>
    </div>
  )
}

// ============================================
// TEMPLATE 4: Neo Tokyo (Cyberpunk)
// ============================================
function NeoTokyo({ resume, info, colors }) {
  return (
    <div style={{ background: '#020010', color: 'white', minHeight: 800, fontFamily: '"Courier New", monospace' }}>
      <div style={{ background: 'linear-gradient(135deg, #1A0030, #020010)', padding: '36px 40px', borderBottom: '1px solid #FF006E', position: 'relative' }}>
        <div style={{ color: '#00FF9F', fontSize: 10, marginBottom: 6, letterSpacing: 3 }}>// RESUME.EXE</div>
        <h1 style={{ fontSize: 30, fontWeight: 900, margin: 0, color: '#FF006E', letterSpacing: 3, textShadow: '0 0 20px #FF006E' }}>{(info.full_name || 'YOUR NAME').toUpperCase()}</h1>
        {info.title && <div style={{ color: '#00FF9F', fontSize: 12, marginTop: 6, letterSpacing: 2 }}>{'> '}{info.title}</div>}
        <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
          {[info.email, info.phone, info.location].filter(Boolean).map((c,i) => (
            <span key={i} style={{ color: '#8888CC', fontSize: 10, background: 'rgba(255,0,110,0.1)', border: '1px solid rgba(255,0,110,0.3)', padding: '2px 8px', borderRadius: 2 }}>{c}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: '28px 40px' }}>
        {resume.summary && <Section title="> OBJECTIVE" color="#FF006E"><p style={{ color: '#9999BB', lineHeight: 1.7, fontSize: 12 }}>{resume.summary}</p></Section>}
        {resume.experience?.length > 0 && <Section title="> EXPERIENCE" color="#FF006E">
          {resume.experience.map((exp,i) => <ExpItem key={i} exp={exp} primaryColor="#00FF9F" textColor="#9999BB" bgColor="rgba(0,255,159,0.05)" />)}
        </Section>}
        {resume.skills?.length > 0 && <Section title="> SKILLS" color="#FF006E">
          {resume.skills.map((sg,i) => <SkillGroup key={i} sg={sg} primaryColor="#00FF9F" tagBg="rgba(0,255,159,0.1)" tagColor="#00FF9F" />)}
        </Section>}
        {resume.education?.length > 0 && <Section title="> EDUCATION" color="#FF006E">
          {resume.education.map((edu,i) => <EduItem key={i} edu={edu} primaryColor="#00FF9F" textColor="#9999BB" />)}
        </Section>}
      </div>
    </div>
  )
}

// Generic Light Template (used for botanical, sunset, etc.)
function LightTemplate({ resume, info, colors, accentStyle }) {
  const c = colors.primary
  const bg = colors.bg
  return (
    <div style={{ background: bg, color: colors.text, minHeight: 800, fontFamily: 'Arial, sans-serif' }}>
      <div style={{ background: `linear-gradient(135deg, ${c}20, ${c}08)`, padding: '32px 40px', borderBottom: `3px solid ${c}` }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, color: colors.text }}>{info.full_name || 'YOUR NAME'}</h1>
        {info.title && <div style={{ color: c, fontSize: 14, marginTop: 4 }}>{info.title}</div>}
        <div style={{ display: 'flex', gap: 16, marginTop: 10, flexWrap: 'wrap', fontSize: 12, color: `${colors.text}99` }}>
          {[info.email, info.phone, info.location].filter(Boolean).map((x,i) => <span key={i}>{x}</span>)}
        </div>
      </div>
      <div style={{ padding: '24px 40px' }}>
        {resume.summary && <LightSection title="SUMMARY" color={c}><p style={{ lineHeight: 1.7, fontSize: 13, color: `${colors.text}CC` }}>{resume.summary}</p></LightSection>}
        {resume.experience?.length > 0 && <LightSection title="EXPERIENCE" color={c}>
          {resume.experience.map((exp,i) => <ExpItem key={i} exp={exp} primaryColor={c} textColor={`${colors.text}CC`} bgColor={`${c}10`} light />)}
        </LightSection>}
        {resume.education?.length > 0 && <LightSection title="EDUCATION" color={c}>
          {resume.education.map((edu,i) => <EduItem key={i} edu={edu} primaryColor={c} textColor={`${colors.text}CC`} light />)}
        </LightSection>}
        {resume.skills?.length > 0 && <LightSection title="SKILLS" color={c}>
          {resume.skills.map((sg,i) => <SkillGroup key={i} sg={sg} primaryColor={c} tagBg={`${c}20`} tagColor={c} light />)}
        </LightSection>}
        {resume.projects?.length > 0 && <LightSection title="PROJECTS" color={c}>
          {resume.projects.map((proj,i) => <ProjectItem key={i} proj={proj} primaryColor={c} textColor={`${colors.text}CC`} light />)}
        </LightSection>}
      </div>
    </div>
  )
}

// Classic Template (Royal Navy style)
function ClassicTemplate({ resume, info, colors }) {
  const c = '#1E3A5F'; const gold = '#C9A84C'
  return (
    <div style={{ background: '#FAFAFA', color: '#1A1A2E', minHeight: 800, fontFamily: 'Georgia, serif' }}>
      <div style={{ background: c, padding: '32px 40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, color: 'white', letterSpacing: 2 }}>{info.full_name || 'YOUR NAME'}</h1>
        {info.title && <div style={{ color: gold, fontSize: 13, marginTop: 6, letterSpacing: 1 }}>{info.title}</div>}
        <div style={{ display: 'flex', gap: 16, marginTop: 12, flexWrap: 'wrap', justifyContent: 'center', fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>
          {[info.email, info.phone, info.location].filter(Boolean).map((x,i) => <span key={i}>{x}</span>)}
        </div>
      </div>
      <div style={{ padding: '24px 40px' }}>
        {resume.summary && <LightSection title="PROFESSIONAL PROFILE" color={gold}><p style={{ lineHeight: 1.7, fontSize: 13, color: '#444' }}>{resume.summary}</p></LightSection>}
        {resume.experience?.length > 0 && <LightSection title="PROFESSIONAL EXPERIENCE" color={gold}>
          {resume.experience.map((exp,i) => <ExpItem key={i} exp={exp} primaryColor={c} textColor="#555" bgColor="#F0F4F8" light />)}
        </LightSection>}
        {resume.education?.length > 0 && <LightSection title="EDUCATION" color={gold}>
          {resume.education.map((edu,i) => <EduItem key={i} edu={edu} primaryColor={c} textColor="#555" light />)}
        </LightSection>}
        {resume.skills?.length > 0 && <LightSection title="CORE COMPETENCIES" color={gold}>
          {resume.skills.map((sg,i) => <SkillGroup key={i} sg={sg} primaryColor={c} tagBg="#E8EEF7" tagColor={c} light />)}
        </LightSection>}
      </div>
    </div>
  )
}

function MonoGrid({ resume, info }) {
  return (
    <div style={{ background: 'white', color: 'black', minHeight: 800, fontFamily: '"Helvetica Neue", sans-serif' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3px 2fr' }}>
        <div style={{ padding: '32px 24px', background: '#F5F5F5' }}>
          <h1 style={{ fontSize: 20, fontWeight: 900, margin: '0 0 4px', letterSpacing: 1 }}>{info.full_name || 'NAME'}</h1>
          {info.title && <div style={{ fontSize: 12, color: '#FF0000', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase' }}>{info.title}</div>}
          <div style={{ fontSize: 10, lineHeight: 1.8, color: '#333' }}>
            {[info.email, info.phone, info.location, info.github].filter(Boolean).map((c,i) => <div key={i}>{c}</div>)}
          </div>
          {resume.skills?.length > 0 && <>
            <div style={{ fontWeight: 900, fontSize: 10, letterSpacing: 2, marginTop: 24, marginBottom: 8, borderBottom: '2px solid black', paddingBottom: 4 }}>SKILLS</div>
            {resume.skills.map((sg,i) => <div key={i} style={{ marginBottom: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 10, color: '#FF0000', marginBottom: 2 }}>{sg.category}</div>
              <div style={{ fontSize: 10, color: '#444' }}>{(sg.items||[]).join(', ')}</div>
            </div>)}
          </>}
        </div>
        <div style={{ background: 'black' }} />
        <div style={{ padding: '32px 28px' }}>
          {resume.summary && <><div style={{ fontWeight: 900, fontSize: 10, letterSpacing: 2, marginBottom: 6 }}>PROFILE</div><p style={{ fontSize: 12, lineHeight: 1.6, color: '#333', marginBottom: 16 }}>{resume.summary}</p></>}
          {resume.experience?.map((exp,i) => <div key={i} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 900, fontSize: 12 }}>{exp.company}</span>
              <span style={{ fontSize: 10, color: '#666' }}>{exp.start_date}–{exp.end_date}</span>
            </div>
            <div style={{ fontSize: 11, color: '#FF0000', fontWeight: 700, marginBottom: 4 }}>{exp.position}</div>
            {(exp.description||[]).map((b,j) => b && <div key={j} style={{ fontSize: 10, color: '#555', lineHeight: 1.6 }}>• {b}</div>)}
          </div>)}
          {resume.education?.map((edu,i) => <div key={i} style={{ marginBottom: 8, fontSize: 11 }}>
            <span style={{ fontWeight: 700 }}>{edu.institution}</span> — {edu.degree}{edu.field && ` in ${edu.field}`}
          </div>)}
        </div>
      </div>
    </div>
  )
}

function NeonPulse({ resume, info }) {
  return (
    <div style={{ background: '#0D0014', color: '#FAF5FF', minHeight: 800, fontFamily: 'Arial, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #2D0057, #1A0030)', padding: '36px 40px', borderBottom: '2px solid #7C3AED', boxShadow: '0 4px 30px rgba(124,58,237,0.4)' }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0, color: '#F0ABFC', textShadow: '0 0 20px rgba(240,171,252,0.5)' }}>{info.full_name || 'YOUR NAME'}</h1>
        {info.title && <div style={{ color: '#A78BFA', fontSize: 13, marginTop: 6 }}>{info.title}</div>}
        <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap', fontSize: 11, color: '#C4B5FD' }}>
          {[info.email, info.phone, info.location].filter(Boolean).map((c,i) => <span key={i} style={{ background: 'rgba(124,58,237,0.2)', padding: '2px 8px', borderRadius: 20, border: '1px solid rgba(124,58,237,0.4)' }}>{c}</span>)}
        </div>
      </div>
      <div style={{ padding: '28px 40px' }}>
        {resume.summary && <Section title="ABOUT" color="#7C3AED"><p style={{ color: '#C4B5FD', lineHeight: 1.7, fontSize: 13 }}>{resume.summary}</p></Section>}
        {resume.experience?.length > 0 && <Section title="EXPERIENCE" color="#7C3AED">
          {resume.experience.map((exp,i) => <ExpItem key={i} exp={exp} primaryColor="#A78BFA" textColor="#C4B5FD" bgColor="rgba(124,58,237,0.08)" />)}
        </Section>}
        {resume.skills?.length > 0 && <Section title="SKILLS" color="#7C3AED">
          {resume.skills.map((sg,i) => <SkillGroup key={i} sg={sg} primaryColor="#A78BFA" tagBg="rgba(167,139,250,0.15)" tagColor="#A78BFA" />)}
        </Section>}
        {resume.education?.length > 0 && <Section title="EDUCATION" color="#7C3AED">
          {resume.education.map((edu,i) => <EduItem key={i} edu={edu} primaryColor="#A78BFA" textColor="#C4B5FD" />)}
        </Section>}
      </div>
    </div>
  )
}

function ExecutiveTemplate({ resume, info }) {
  return (
    <div style={{ background: '#0D1B2A', color: '#F0F4FF', minHeight: 800, fontFamily: 'Georgia, serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #1E3A5F, #0D1B2A)', padding: '40px', borderBottom: '3px solid #C9A84C' }}>
        <h1 style={{ fontSize: 30, fontWeight: 700, margin: 0, color: '#F0F4FF', letterSpacing: 3 }}>{(info.full_name||'YOUR NAME').toUpperCase()}</h1>
        {info.title && <div style={{ color: '#C9A84C', fontSize: 13, marginTop: 8, letterSpacing: 2, textTransform: 'uppercase' }}>{info.title}</div>}
        <div style={{ display: 'flex', gap: 20, marginTop: 14, fontSize: 11, color: 'rgba(240,244,255,0.6)' }}>
          {[info.email, info.phone, info.location].filter(Boolean).map((c,i) => <span key={i}>{c}</span>)}
        </div>
      </div>
      <div style={{ padding: '32px 40px' }}>
        {resume.summary && <Section title="EXECUTIVE SUMMARY" color="#C9A84C"><p style={{ color: 'rgba(240,244,255,0.75)', lineHeight: 1.8, fontSize: 13 }}>{resume.summary}</p></Section>}
        {resume.experience?.length > 0 && <Section title="CAREER EXPERIENCE" color="#C9A84C">
          {resume.experience.map((exp,i) => <ExpItem key={i} exp={exp} primaryColor="#C9A84C" textColor="rgba(240,244,255,0.75)" bgColor="rgba(201,168,76,0.08)" />)}
        </Section>}
        {resume.education?.length > 0 && <Section title="EDUCATION" color="#C9A84C">
          {resume.education.map((edu,i) => <EduItem key={i} edu={edu} primaryColor="#C9A84C" textColor="rgba(240,244,255,0.75)" />)}
        </Section>}
        {resume.skills?.length > 0 && <Section title="AREAS OF EXPERTISE" color="#C9A84C">
          {resume.skills.map((sg,i) => <SkillGroup key={i} sg={sg} primaryColor="#C9A84C" tagBg="rgba(201,168,76,0.12)" tagColor="#C9A84C" />)}
        </Section>}
      </div>
    </div>
  )
}

function Glassmorphism({ resume, info }) {
  return (
    <div style={{ background: 'linear-gradient(135deg, #1E1B4B, #312E81)', color: '#F0F0FF', minHeight: 800, fontFamily: 'Arial, sans-serif' }}>
      <div style={{ margin: '0', padding: '36px 40px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, color: 'white' }}>{info.full_name || 'YOUR NAME'}</h1>
        {info.title && <div style={{ color: '#818CF8', fontSize: 14, marginTop: 4 }}>{info.title}</div>}
        <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap', fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>
          {[info.email, info.phone, info.location].filter(Boolean).map((c,i) => <span key={i} style={{ background: 'rgba(255,255,255,0.08)', padding: '3px 10px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.12)' }}>{c}</span>)}
        </div>
      </div>
      <div style={{ padding: '28px 40px' }}>
        {resume.summary && <Section title="ABOUT" color="#818CF8"><p style={{ color: 'rgba(240,240,255,0.75)', lineHeight: 1.7, fontSize: 13 }}>{resume.summary}</p></Section>}
        {resume.experience?.length > 0 && <Section title="EXPERIENCE" color="#818CF8">
          {resume.experience.map((exp,i) => <ExpItem key={i} exp={exp} primaryColor="#818CF8" textColor="rgba(240,240,255,0.75)" bgColor="rgba(129,140,248,0.08)" />)}
        </Section>}
        {resume.skills?.length > 0 && <Section title="SKILLS" color="#818CF8">
          {resume.skills.map((sg,i) => <SkillGroup key={i} sg={sg} primaryColor="#818CF8" tagBg="rgba(129,140,248,0.15)" tagColor="#818CF8" />)}
        </Section>}
        {resume.education?.length > 0 && <Section title="EDUCATION" color="#818CF8">
          {resume.education.map((edu,i) => <EduItem key={i} edu={edu} primaryColor="#818CF8" textColor="rgba(240,240,255,0.75)" />)}
        </Section>}
      </div>
    </div>
  )
}

function RetroWave({ resume, info }) {
  return (
    <div style={{ background: '#1A0030', color: '#FDF0FF', minHeight: 800, fontFamily: '"Courier New", monospace' }}>
      <div style={{ background: 'linear-gradient(0deg, #1A0030 0%, #4A0080 100%)', padding: '36px 40px', textAlign: 'center', borderBottom: '2px solid #F472B6', position: 'relative' }}>
        <div style={{ fontSize: 10, letterSpacing: 4, color: '#FBBF24', marginBottom: 8 }}>✦ ✦ ✦ RESUME ✦ ✦ ✦</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0, color: '#F472B6', textShadow: '0 0 20px rgba(244,114,182,0.6)', letterSpacing: 3 }}>{info.full_name || 'YOUR NAME'}</h1>
        {info.title && <div style={{ color: '#FBBF24', fontSize: 12, marginTop: 8, letterSpacing: 2 }}>{info.title}</div>}
        <div style={{ display: 'flex', gap: 16, marginTop: 12, justifyContent: 'center', flexWrap: 'wrap', fontSize: 10, color: '#D8A0E8' }}>
          {[info.email, info.phone, info.location].filter(Boolean).map((c,i) => <span key={i}>{c}</span>)}
        </div>
      </div>
      <div style={{ padding: '28px 40px' }}>
        {resume.summary && <Section title="✦ ABOUT" color="#F472B6"><p style={{ color: '#D8A0E8', lineHeight: 1.7, fontSize: 12 }}>{resume.summary}</p></Section>}
        {resume.experience?.length > 0 && <Section title="✦ EXPERIENCE" color="#F472B6">
          {resume.experience.map((exp,i) => <ExpItem key={i} exp={exp} primaryColor="#FBBF24" textColor="#D8A0E8" bgColor="rgba(244,114,182,0.08)" />)}
        </Section>}
        {resume.skills?.length > 0 && <Section title="✦ SKILLS" color="#F472B6">
          {resume.skills.map((sg,i) => <SkillGroup key={i} sg={sg} primaryColor="#FBBF24" tagBg="rgba(251,191,36,0.1)" tagColor="#FBBF24" />)}
        </Section>}
        {resume.education?.length > 0 && <Section title="✦ EDUCATION" color="#F472B6">
          {resume.education.map((edu,i) => <EduItem key={i} edu={edu} primaryColor="#FBBF24" textColor="#D8A0E8" />)}
        </Section>}
      </div>
    </div>
  )
}

// ============================================
// Shared Components
// ============================================
function Section({ title, color, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ borderBottom: `2px solid ${color}`, paddingBottom: 4, marginBottom: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: 2 }}>{title}</span>
      </div>
      {children}
    </div>
  )
}

function LightSection({ title, color, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ borderBottom: `2px solid ${color}`, paddingBottom: 4, marginBottom: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: 1.5 }}>{title}</span>
      </div>
      {children}
    </div>
  )
}

function ExpItem({ exp, primaryColor, textColor, bgColor, light }) {
  return (
    <div style={{ marginBottom: 14, padding: '10px 12px', background: bgColor || 'transparent', borderRadius: 6, borderLeft: `3px solid ${primaryColor}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span style={{ fontWeight: 700, fontSize: 13, color: light ? '#1E293B' : 'white' }}>{exp.company}</span>
          <span style={{ fontSize: 11, color: primaryColor, display: 'block', marginTop: 2, fontStyle: 'italic' }}>{exp.position}{exp.location && ` • ${exp.location}`}</span>
        </div>
        <span style={{ fontSize: 10, color: textColor, flexShrink: 0, marginLeft: 8 }}>{exp.start_date} – {exp.end_date}</span>
      </div>
      <div style={{ marginTop: 6 }}>
        {(exp.description||[]).filter(Boolean).map((b,i) => (
          <div key={i} style={{ fontSize: 11, color: textColor, lineHeight: 1.6, marginTop: 2 }}>• {b}</div>
        ))}
      </div>
    </div>
  )
}

function EduItem({ edu, primaryColor, textColor, light }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 700, fontSize: 13, color: light ? '#1E293B' : 'white' }}>{edu.institution}</span>
        <span style={{ fontSize: 10, color: textColor }}>{edu.start_date}{edu.end_date && ` – ${edu.end_date}`}</span>
      </div>
      <div style={{ fontSize: 12, color: primaryColor, fontStyle: 'italic' }}>
        {edu.degree}{edu.field && ` in ${edu.field}`}{edu.gpa && ` • GPA: ${edu.gpa}`}
      </div>
    </div>
  )
}

function SkillGroup({ sg, primaryColor, tagBg, tagColor, light }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: light ? '#374151' : 'white', marginRight: 8 }}>{sg.category}:</span>
      {(sg.items||[]).map((item,i) => (
        <span key={i} style={{ display: 'inline-block', margin: '2px 3px', padding: '2px 8px', background: tagBg, color: tagColor, borderRadius: 20, fontSize: 10, fontWeight: 500 }}>{item}</span>
      ))}
    </div>
  )
}

function ProjectItem({ proj, primaryColor, textColor, light }) {
  return (
    <div style={{ marginBottom: 12, padding: '8px 12px', borderLeft: `3px solid ${primaryColor}` }}>
      <div style={{ fontWeight: 700, fontSize: 13, color: light ? '#1E293B' : 'white' }}>
        {proj.name}
        {(proj.technologies||[]).length > 0 && <span style={{ fontSize: 10, color: primaryColor, marginLeft: 8, fontWeight: 400 }}>{proj.technologies.join(', ')}</span>}
      </div>
      {proj.description && <div style={{ fontSize: 11, color: textColor, lineHeight: 1.6, marginTop: 3 }}>{proj.description}</div>}
      {proj.url && <div style={{ fontSize: 10, color: primaryColor, marginTop: 2 }}>🔗 {proj.url}</div>}
    </div>
  )
}
