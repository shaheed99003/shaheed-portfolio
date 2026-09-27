import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Loader({ onFinish }){
  const loaderRef = useRef(null)
  const barRef = useRef(null)
  const nameRef = useRef(null)
  const [percent, setPercent] = useState(0)

  useEffect(()=>{
    const obj = { val: 0 }
    gsap.to(obj, {
      val: 100,
      duration: 2.4,
      ease: 'power2.inOut',
      onUpdate: () => setPercent(Math.floor(obj.val))
    })

    gsap.fromTo(barRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 2.4, ease: 'power2.inOut', transformOrigin: 'left' }
    )

    gsap.fromTo(nameRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.1 }
    )

    setTimeout(()=>{
      gsap.to(loaderRef.current, {
        yPercent: -100,
        duration: 1.1,
        ease: 'power4.inOut',
        onComplete: onFinish
      })
    }, 2800)

  },[onFinish])

  return (
    <div ref={loaderRef} style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: '#050507',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      width: '100vw', height: '100vh',
      overflow: 'hidden'
    }}>
      {/* SAME SPOTLIGHT AS YOUR SITE */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none'
      }} />

      {/* FILM GRAIN - same as site */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.045,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* CENTERED NAME - MATCHES YOUR HERO FONT VIBE */}
      <div ref={nameRef} style={{
        display: 'flex', alignItems: 'baseline', gap: '14px',
        zIndex: 2
      }}>
        <span style={{
          fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 900,
          letterSpacing: '-0.05em', color: 'white', lineHeight: 1
        }}>SHAHEED</span>
        <span style={{
          fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 200,
          fontFamily: 'serif', fontStyle: 'italic',
          color: 'rgba(255,255,255,0.6)', lineHeight: 1
        }}>KHAN</span>
      </div>

      {/* GLASS BAR - same as your cards */}
      <div style={{
        marginTop: 36, width: 220, height: 1,
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(10px)',
        overflow: 'hidden', position: 'relative', zIndex: 2
      }}>
        <div ref={barRef} style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, white, rgba(255,255,255,0.6))',
          transformOrigin: 'left'
        }} />
      </div>

      <div style={{
        marginTop: 16, fontSize: 10, letterSpacing: '0.4em',
        opacity: 0.3, color: 'white', zIndex: 2
      }}>{percent}% — CRAFTING EXPERIENCE</div>
    </div>
  )
}