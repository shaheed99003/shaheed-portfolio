import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function Skills(){
  const sectionRef = useRef(null)
  const [isDark, setIsDark] = useState(true)
  
  const skills = [
    { id: '01', title: 'PROGRAMMING', items: ['Python', 'Java', 'C'] },
    { id: '02', title: 'WEB DEV', items: ['HTML', 'CSS', 'JavaScript', 'Django'] },
    { id: '03', title: 'MOBILE DEV', items: ['Flutter', 'Cross-platform'] },
    { id: '04', title: 'UI/UX & TOOLS', items: ['Figma', 'Git / GitHub', 'MongoDB', 'DBMS'] },
  ]

  useEffect(()=>{
    const checkTheme = () => {
      const d = document.documentElement.getAttribute('data-theme') === 'dark' || document.documentElement.classList.contains('dark')
      setIsDark(d)
    }
    checkTheme()
    const obs = new MutationObserver(checkTheme)
    obs.observe(document.documentElement, {attributes:true, attributeFilter:['class','data-theme']})
    gsap.fromTo('.skill-card', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' } })
    return ()=> obs.disconnect()
  },[])

  return (
    <section ref={sectionRef} id="skills" style={{ padding: '80px 8%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 36 }}>
        <span style={{ width: 40, height: 2, background: isDark? '#fff':'#111' }} />
        <h2 style={{ fontSize: 32, fontWeight: 800, margin: 0, color: isDark? '#fff':'#111' }}>MY SKILLS</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
        {skills.map((cat)=>(
          <div key={cat.id} className="skill-card" style={{
            position: 'relative', borderRadius: 22, padding: '26px 22px',
            // GLASSY
            background: isDark? 'rgba(18,18,20,0.55)' : 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: isDark? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.7)',
            boxShadow: isDark? '0 10px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)' : '0 10px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,1)',
          }}>
            <div style={{ fontSize: 10, fontWeight:700, opacity:0.5, marginBottom:10, color: isDark? '#888':'#666' }}>{cat.id}</div>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing:'0.06em', marginBottom: 20, color: isDark? '#fff':'#111' }}>{cat.title}</div>

            <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
              {cat.items.map(s=>(
                <span key={s} style={{
                  fontSize:13, fontWeight:500, padding:'9px 16px', borderRadius:100,
                  // GLASSY PILL
                  background: isDark? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.7)',
                  backdropFilter:'blur(12px) saturate(180%)', WebkitBackdropFilter:'blur(12px) saturate(180%)',
                  border: isDark? '1px solid rgba(255,255,255,0.14)' : '1px solid rgba(0,0,0,0.08)',
                  color: isDark? '#e8e8e8' : '#1a1a1a',
                  boxShadow: isDark? 'inset 0 1px 0 rgba(255,255,255,0.08)' : '0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1)',
                  display:'inline-flex', alignItems:'center', gap:8, cursor:'default'
                }}>
                  <span style={{width:6, height:6, borderRadius:50, background:'#a78bfa', boxShadow:'0 0 10px #a78bfa'}} />
                  {s}
                </span>
              ))}
            </div>

            {/* GLASS REFLECTION */}
            <div style={{
              position:'absolute', top:0, left:0, right:0, height:1,
              background:'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              opacity: isDark? 0.6 : 0.9
            }} />
          </div>
        ))}
      </div>

      <style>{`
        .skill-card { transition: all 0.35s ease; }
        .skill-card:hover { 
          transform: translateY(-6px); 
          background: ${isDark? 'rgba(28,28,32,0.7)' : 'rgba(255,255,255,0.8)'} !important;
          border-color: ${isDark? 'rgba(167,139,250,0.3)' : 'rgba(124,58,237,0.25)'} !important;
          box-shadow: ${isDark? '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(167,139,250,0.15)' : '0 20px 60px rgba(0,0,0,0.12)'} !important;
        }
        .skill-card span:hover {
          background: ${isDark? 'rgba(167,139,250,0.18)' : 'rgba(255,255,255,0.95)'} !important;
          border-color: rgba(167,139,250,0.4) !important;
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(167,139,250,0.2);
        }
      `}</style>
    </section>
  )
}