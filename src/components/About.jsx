import { useEffect, useState, useRef } from 'react'

export default function About(){
  const [isMobile, setIsMobile] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [showFull, setShowFull] = useState(false)
  const scrollY = useRef(0)

  useEffect(()=>{
    const onResize = () => setIsMobile(window.innerWidth < 900)
    onResize()
    window.addEventListener('resize', onResize)
    const check = () => {
      const theme = document.documentElement.getAttribute('data-theme')
      setIsDark(theme === 'dark' || document.documentElement.classList.contains('dark'))
    }
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.documentElement, {attributes:true, attributeFilter:['class','data-theme']})
    return ()=>{ obs.disconnect(); window.removeEventListener('resize', onResize) }
  },[])

  useEffect(()=>{
    if(showFull){
      scrollY.current = window.scrollY
      document.body.style.position='fixed'
      document.body.style.top=`-${scrollY.current}px`
      document.body.style.width='100%'
      document.body.style.overflow='hidden'
    } else {
      document.body.style.position=''
      document.body.style.top=''
      document.body.style.width=''
      document.body.style.overflow=''
      if(scrollY.current) window.scrollTo(0, scrollY.current)
    }
  },[showFull])

  const textMain = isDark? '#fff' : '#0a0a0a'
  const textBody = isDark? '#d4d4d4' : '#2a2a2a'
  const textMuted = isDark? '#888' : '#666'
  const accent = '#a78bfa'

  return (
    <>
      <section id="about" style={{maxWidth:1200, width:'92%', margin:'140px auto'}}>
        <div style={{display:'grid', gridTemplateColumns: isMobile? '1fr':'1.15fr 0.85fr', gap: isMobile? '40px':'80px'}}>
          <div>
            <div style={{fontSize:12, letterSpacing:'0.25em', color:textMuted, marginBottom:20, fontWeight:600}}>— MORE THAN A STUDENT</div>
            <h2 style={{fontSize: isMobile? '44px':'68px', color:textMain, lineHeight:0.9, margin:'0 0 24px 0', fontWeight:800}}>About<br/><em style={{fontWeight:400, color:accent}}>Me</em></h2>
            <p style={{fontSize:17, color:textBody, lineHeight:1.7, marginBottom:16}}>Hello, I'm <b style={{color:textMain}}>Shaheed Khan</b>, BCA student at KLE GH BCA College, Haveri. Passionate about tech and development.</p>
            <p style={{fontSize:15, color:textMuted, lineHeight:1.8, marginBottom:28}}>Currently focusing on improving my programming skills and building meaningful projects. Recently secured 2nd place in a college Hackathon...</p>
            <button onClick={()=>setShowFull(true)} style={{padding:'14px 26px', borderRadius:100, background: isDark?'#fff':'#111', color: isDark?'#111':'#fff', border:'none', fontWeight:600, cursor:'pointer'}}>Read full story → ✦</button>
          </div>
          <div style={{paddingTop: isMobile? 0:90}}>
            <div style={{fontSize:18, fontStyle:'italic', color:textMain, borderLeft:`3px solid ${accent}`, paddingLeft:16}}>“Every new experience is an opportunity to learn something valuable.”</div>
          </div>
        </div>
      </section>

      {showFull && (
        <div onClick={()=>setShowFull(false)} style={{
          position:'fixed', inset:0, zIndex:9999,
          background: isDark? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.5)',
          backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)',
          display:'flex', alignItems:'center', justifyContent:'center',
          padding: isMobile? '12px':'32px', overflowY:'auto'
        }}>
          <div onClick={e=>e.stopPropagation()} style={{
            width:'100%', maxWidth:1100,
            maxHeight: isMobile? '92vh':'85vh', overflowY:'auto',
            borderRadius:'28px',
            background: isDark? 'rgba(22,22,22,0.88)' : 'rgba(255,255,255,0.94)',
            backdropFilter:'blur(28px) saturate(180%)', WebkitBackdropFilter:'blur(28px) saturate(180%)',
            border: isDark? '1px solid rgba(255,255,255,0.12)':'1px solid rgba(255,255,255,0.9)',
            boxShadow: isDark? '0 30px 90px rgba(0,0,0,0.7)':'0 30px 90px rgba(0,0,0,0.2)',
            padding: isMobile? '28px 20px 24px':'44px 44px 32px',
            position:'relative'
          }}>
            <button onClick={()=>setShowFull(false)} style={{position:'absolute', top:16, right:16, width:36, height:36, borderRadius:100, background: isDark?'rgba(255,255,255,0.1)':'rgba(0,0,0,0.06)', border:'none', cursor:'pointer', color:textMain, fontSize:18}}>✕</button>

            <div style={{fontSize:11, letterSpacing:'0.2em', color:textMuted, fontWeight:600, marginBottom:16}}>SHAHEED KHAN — FULL STORY</div>
            
            <h1 style={{fontSize: isMobile? '36px':'56px', color:textMain, lineHeight:0.9, margin:'0 0 32px 0', fontWeight:800}}>More than just a <em style={{color:accent, fontWeight:400, fontStyle:'italic'}}>student</em></h1>

            {/* HORIZONTAL CONTENT */}
            <div style={{
              display:'grid',
              gridTemplateColumns: isMobile? '1fr':'1.2fr 0.8fr',
              gap: isMobile? '28px':'60px',
              alignItems:'start'
            }}>
              <div style={{display:'flex', flexDirection:'column', gap:18, fontSize: isMobile? '15px':'17px', lineHeight:1.9}}>
                <p style={{margin:0, color:textBody}}>Hello, I'm <b style={{color:textMain}}>Shaheed Khan</b>, a BCA student at <span style={{color:accent, fontWeight:600}}>KLE GH BCA College, Haveri</span>. I'm passionate about technology, software development, and continuously learning new skills that can help me grow as a developer.</p>
                <p style={{margin:0, color:textMuted}}>Currently, I'm focusing on improving my programming skills, technical knowledge, and communication skills. My goal is to become a skilled Software Developer and build a successful career in a reputed technology company.</p>
                <p style={{margin:0, color:textMuted}}>I enjoy exploring new technologies, working on projects, and participating in college events. Recently, I participated in a college-level Hackathon with my team, where we secured <b style={{color:textMain, background: isDark?'rgba(167,139,250,0.18)':'rgba(124,58,237,0.1)', padding:'2px 10px', borderRadius:100}}>2nd place 🏆</b>.</p>
              </div>

              <div style={{display:'flex', flexDirection:'column', gap:20}}>
                <div>
                  <h3 style={{fontSize:18, color:textMain, margin:'0 0 8px 0', fontWeight:700}}>Outside academics</h3>
                  <p style={{color:textMuted, margin:0, fontSize:15, lineHeight:1.7}}>Travelling, exploring new places, watching web series, listening to music, and playing outdoor games. Every new experience is an opportunity to learn.</p>
                </div>
                <div>
                  <h3 style={{fontSize:18, color:textMain, margin:'0 0 8px 0', fontWeight:700}}>My Vision</h3>
                  <p style={{color:textMuted, margin:0, fontSize:15, lineHeight:1.7}}>Continuously improve, learn new technologies, build meaningful projects, and become a confident and skilled software developer.</p>
                </div>
                <div style={{padding:'16px 18px', borderRadius:14, background: isDark?'rgba(167,139,250,0.1)':'rgba(124,58,237,0.06)', borderLeft:`3px solid ${accent}`, fontStyle:'italic', color:textMain, fontWeight:500}}>
                  “Every new experience is an opportunity to learn something valuable.”
                </div>
                <button onClick={()=>setShowFull(false)} style={{width:'100%', padding:'14px', borderRadius:100, background: isDark?'#fff':'#111', color: isDark?'#111':'#fff', border:'none', fontWeight:600, cursor:'pointer'}}>Close & go back</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}