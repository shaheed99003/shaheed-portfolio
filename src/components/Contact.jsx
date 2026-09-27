import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Contact(){
  const btnRef = useRef(null)
  const glowRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [copied, setCopied] = useState(false)
  const email = "shaheedkhan99003@gmail.com"

  useEffect(()=>{
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    const btn = btnRef.current
    const glow = glowRef.current
    if(!btn || window.innerWidth < 768) return
    const move = (e) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width/2
      const y = e.clientY - rect.top - rect.height/2
      gsap.to(btn, { x: x*0.35, y: y*0.35, duration: 0.6, ease: 'power3.out' })
      gsap.to(glow, { x: x*0.5, y: y*0.5, duration: 0.6, ease: 'power3.out' })
    }
    const leave = () => {
      gsap.to([btn, glow], { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' })
    }
    btn.addEventListener('mousemove', move)
    btn.addEventListener('mouseleave', leave)
    return () => {
      btn.removeEventListener('mousemove', move)
      btn.removeEventListener('mouseleave', leave)
      window.removeEventListener('resize', check)
    }
  },[])

  const handleCopy = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(()=>setCopied(false), 2000)
  }

  return (
    <section id="contact" style={{ 
      padding: isMobile ? '80px 20px 60px' : '120px 8% 80px', 
      textAlign: 'center', position: 'relative', overflow: 'hidden',
      width: '100%', maxWidth: '100vw'
    }}>
      <div style={{
        position: 'absolute', top: '55%', left: '50%', 
        width: isMobile ? 300 : 500, height: isMobile ? 300 : 500,
        background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)', pointerEvents: 'none', filter: 'blur(30px)'
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.5, marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <span style={{width:24, height:1, background:'white', display:'inline-block', opacity:0.5}}></span>
          Get in touch
        </div>
        
        <h2 style={{ fontSize: isMobile ? 'clamp(36px, 10vw, 48px)' : 'clamp(40px, 6vw, 84px)', lineHeight: 0.9, marginBottom: isMobile ? 30 : 50, fontWeight: 400 }}>
          Let's build<br/><span style={{ fontFamily: 'serif', fontStyle: 'italic', fontWeight: 400, opacity: 0.9 }}>something cool</span>
        </h2>

        <div style={{ display: 'inline-block', position: 'relative', padding: isMobile ? '10px' : '40px' }}>
          <div ref={glowRef} style={{ position: 'absolute', inset: isMobile ? '5px' : '10px', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', filter: 'blur(20px)' }} />
          
          <button ref={btnRef} onClick={handleCopy} style={{
            position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: isMobile ? 10 : 16,
            padding: isMobile ? '16px 20px' : '20px 40px', borderRadius: '999px',
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)',
            backdropFilter: 'blur(20px)', color: 'rgba(255,255,255,0.9)', 
            fontSize: isMobile ? 14 : 17, fontWeight: 500, cursor: 'pointer', willChange: isMobile ? 'auto' : 'transform'
          }}>
            <span style={{ width: 34, height: 34, minWidth: 34, borderRadius: '50%', background: 'white', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{copied ? '✓' : '↗'}</span>
            <span>{copied ? 'Email Copied!' : email}</span>
          </button>
        </div>

        <p style={{ marginTop: isMobile ? 30 : 40, opacity: 0.3, fontSize: 11, letterSpacing: '0.15em' }}>
          {copied ? '✓ COPIED TO CLIPBOARD' : 'CLICK TO COPY · AVAILABLE FOR FREELANCE'}
        </p>
      </div>

      {copied && (
        <div style={{position:'fixed', bottom:30, left:'50%', transform:'translateX(-50%)', background:'white', color:'black', padding:'12px 24px', borderRadius:100, fontSize:13, fontWeight:600, zIndex:9999, boxShadow:'0 10px 30px rgba(0,0,0,0.3)'}}>
          📋 Email copied!
        </div>
      )}
    </section>
  )
}