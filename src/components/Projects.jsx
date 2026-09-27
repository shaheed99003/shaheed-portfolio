import { useEffect, useState } from 'react'

const projects = [
  { title: 'OTT Platform - UI/UX Design', tag: 'UI/UX · Figma', desc: 'Premium OTT streaming platform design in Figma. Dark cinematic UI, movie browsing, player screen, modern Netflix-style experience.', icon: '🎬', live: 'https://www.figma.com/proto/WlY8vHIPZiYxIl3iJ2D16A/Untitled?node-id=242-62&p=f&t=XIVIRCeaDHXcEA14-1', buttonText: 'View Figma →' },
  { title: 'EduNova - Student Management', tag: 'Full Stack · Live', desc: 'Complete student management system - attendance, grades, fees, dashboard. Deployed live on Render.', icon: '🎓', live: 'https://edunova-61oh.onrender.com/', buttonText: 'Live Demo →' },
  { title: 'Hospital Management System', tag: 'Hackathon · 2nd Prize', desc: 'Full stack HMS with patient records, appointments, billing and doctor dashboard. Built in 24hr hackathon.', icon: '🏥', live: 'https://github.com/shaheed99003', buttonText: 'View GitHub →' },
  { title: 'Heart Disease Prediction', tag: 'Machine Learning', desc: 'ML model that predicts heart disease with 89% accuracy using patient data. Python + Scikit-learn.', icon: '❤️', live: 'https://github.com/shaheed99003', buttonText: 'View GitHub →' },
  { title: 'Portfolio v2', tag: 'Personal Project', desc: 'This portfolio itself - custom cursor, magnetic buttons, Lenis smooth scroll, 3D blob.', icon: '✦', live: 'https://github.com/shaheed99003', buttonText: 'View GitHub →' },
]

export default function Showcase(){
  const [isMobile, setIsMobile] = useState(false)
  const [active, setActive] = useState(null)
  const [isDark, setIsDark] = useState(false)

  useEffect(()=>{
    setIsMobile(window.innerWidth < 768)
    const checkTheme = () => {
      const dark = document.documentElement.classList.contains('dark') ||
                   document.body.classList.contains('dark') ||
                   document.documentElement.getAttribute('data-theme') === 'dark' ||
                   localStorage.getItem('theme') === 'dark'
      setIsDark(dark)
    }
    checkTheme()
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class','data-theme'] })
    window.addEventListener('storage', checkTheme)
    return ()=>{ observer.disconnect(); window.removeEventListener('storage', checkTheme) }
  },[])

  useEffect(()=>{
    document.body.style.overflow = active? 'hidden' : ''
    return ()=>{ document.body.style.overflow = '' }
  },[active])

  return (
    <>
      <section id="showcase" style={{
        maxWidth:1150, width:'92%', margin:'80px auto', borderRadius:28,
        padding: isMobile? '32px 22px' : '52px 40px',
        position:'relative', zIndex:2,
        backdropFilter: 'blur(32px) saturate(200%)',
        WebkitBackdropFilter: 'blur(32px) saturate(200%)',
        background: isDark? 'rgba(28,28,32,0.58)' : 'rgba(255,255,255,0.92)',
        border: isDark? '1px solid rgba(255,255,255,0.14)' : '1px solid rgba(0,0,0,0.08)',
        boxShadow: isDark? '0 24px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.10)' : '0 24px 80px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,1)'
      }}>
        <div style={{position:'absolute', top:-80, right:-60, width:340, height:340, background:'radial-gradient(circle, rgba(124,58,237,0.18), transparent 70%)', filter:'blur(40px)', pointerEvents:'none'}} />
        <div style={{fontSize:11, letterSpacing:'0.22em', color: isDark? '#9ca3af' : '#6b7280', marginBottom:14, fontWeight:700}}>— SELECTED WORK</div>
        <h2 style={{fontSize: isMobile?'34px':'54px', margin:'0 0 36px 0', color: isDark? '#ffffff' : '#0f0f0f', letterSpacing:'-0.03em', lineHeight:0.9, fontWeight:800}}>Projects that <em style={{fontWeight:500, color: isDark? '#a78bfa' : '#7c3aed', fontStyle:'italic'}}>matter</em></h2>

        <div style={{display:'grid', gridTemplateColumns: isMobile? '1fr' : 'repeat(3,1fr)', gap:16}}>
          {projects.map((p,i)=>(
            <div key={i} onClick={()=>setActive(p)} style={{
              borderRadius:20, padding:22, cursor:'pointer', transition:'0.28s',
              background: isDark? 'rgba(38,38,42,0.70)' : '#ffffff',
              border: isDark? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.08)',
              boxShadow: isDark? '0 8px 24px rgba(0,0,0,0.4)' : '0 8px 24px rgba(0,0,0,0.05)',
              backdropFilter: isDark? 'blur(20px)' : 'none'
            }}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18, gap:12}}>
                <div style={{width:44, height:44, borderRadius:12, background: isDark? '#fff' : '#111', color: isDark? '#111' : '#fff', display:'grid', placeItems:'center', fontSize:18}}>{p.icon}</div>
                <span style={{fontSize:10, fontWeight:700, padding:'6px 12px', borderRadius:100, background: isDark? 'rgba(167,139,250,0.15)' : '#f3f0ff', border:'1px solid rgba(124,58,237,0.15)', color: isDark? '#c4b5fd' : '#5b21b6'}}>{p.tag}</span>
              </div>
              <div style={{fontSize:16, fontWeight:700, color: isDark? '#fff' : '#111', marginBottom:8}}>{p.title}</div>
              <div style={{fontSize:13, color: isDark? '#a1a1aa' : '#4b5563', lineHeight:1.6}}>{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {active && (
        <div onClick={()=>setActive(null)} style={{position:'fixed', inset:0, zIndex:9999, background: isDark? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.45)', backdropFilter:'blur(18px)', display:'flex', alignItems:'center', justifyContent:'center', padding:16}}>
          <div onClick={e=>e.stopPropagation()} style={{background: isDark? '#1e1e20' : '#fff', borderRadius:22, maxWidth:480, width:'100%', padding:28, border: isDark? '1px solid rgba(255,255,255,0.14)' : '1px solid rgba(0,0,0,0.08)'}}>
            <div style={{fontSize:28, marginBottom:14}}>{active.icon}</div>
            <div style={{fontSize:10, color: isDark? '#c4b5fd' : '#6b7280', marginBottom:8, letterSpacing:'0.1em', fontWeight:700, textTransform:'uppercase'}}>{active.tag}</div>
            <h3 style={{fontSize:21, fontWeight:800, color: isDark? '#ffffff' : '#111', margin:'0 0 10px 0'}}>{active.title}</h3>
            <p style={{fontSize:13.5, color: isDark? '#e4e4e7' : '#4b5563', lineHeight:1.7, margin:0}}>{active.desc}</p>
            <div style={{display:'flex', gap:10, marginTop:20}}>
              <a href={active.live} target="_blank" rel="noreferrer" style={{flex:1, padding:12, borderRadius:100, background: isDark? '#fff' : '#111', color: isDark? '#111' : '#fff', textAlign:'center', textDecoration:'none', fontSize:13, fontWeight:600}}>{active.buttonText}</a>
              <button onClick={()=>setActive(null)} style={{flex:1, padding:12, borderRadius:100, border: isDark? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(0,0,0,0.12)', background: isDark? 'rgba(255,255,255,0.08)' : '#fff', color: isDark? '#fff' : '#111', cursor:'pointer', fontWeight:600}}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}