import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function MagneticButton({ children, className = "", style = {}, ...props }) {
  const btnRef = useRef(null)
  const textRef = useRef(null)

  useEffect(()=>{
    const btn = btnRef.current
    if(!btn || window.innerWidth < 768) return // No magnet on mobile

    const onMove = (e) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      
      // Magnet strength
      gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.6, ease: 'power3.out' })
      gsap.to(textRef.current, { x: x * 0.15, y: y * 0.15, duration: 0.6, ease: 'power3.out' })
    }

    const onLeave = () => {
      gsap.to([btn, textRef.current], { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1,0.3)' })
    }

    btn.addEventListener('mousemove', onMove)
    btn.addEventListener('mouseleave', onLeave)

    return () => {
      btn.removeEventListener('mousemove', onMove)
      btn.removeEventListener('mouseleave', onLeave)
    }
  },[])

  return (
    <button 
      ref={btnRef} 
      className={className} 
      style={{ willChange: 'transform', ...style }}
      {...props}
    >
      <span ref={textRef} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, willChange: 'transform' }}>
        {children}
      </span>
    </button>
  )
}