import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor(){
  const cursorRef = useRef(null)
  const spotlightRef = useRef(null)
  const textRef = useRef(null)

  useEffect(()=>{
    const cursor = cursorRef.current
    const spot = spotlightRef.current
    const move = (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.3, ease: 'power3.out' })
      gsap.to(spot, { x: e.clientX, y: e.clientY, duration: 0.6, ease: 'power2.out' })
    }
    const enterImg = () => { 
      gsap.to(cursor, { scale: 3, duration: 0.3 })
      textRef.current.innerText = "View"
      textRef.current.style.opacity = 1
    }
    const leaveImg = () => { 
      gsap.to(cursor, { scale: 1, duration: 0.3 })
      textRef.current.style.opacity = 0
    }

    window.addEventListener('mousemove', move)
    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('mouseenter', enterImg)
      img.addEventListener('mouseleave', leaveImg)
    })
    return () => window.removeEventListener('mousemove', move)
  },[])

  return (
    <>
      {/* Spotlight glow that follows mouse - YOUR VIBE */}
      <div ref={spotlightRef} style={{
        position: 'fixed', top: 0, left: 0, width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 9998, transform: 'translate(-50%, -50%)'
      }} />
      {/* Custom cursor */}
      <div ref={cursorRef} style={{
        position: 'fixed', top: 0, left: 0, width: 32, height: 32,
        border: '1px solid rgba(255,255,255,0.5)', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 9999, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(4px)', background: 'rgba(255,255,255,0.1)'
      }}>
        <span ref={textRef} style={{fontSize: 8, fontWeight: 800, color: 'white', opacity: 0, letterSpacing: 1}}>View</span>
      </div>
    </>
  )
}