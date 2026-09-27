import { useEffect, useState, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Scene from './components/Scene'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Showcase from './components/Showcase'
import Experience from './components/Experience'
import Stats from './components/Stats'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FilmGrain from './components/FilmGrain'
import Loader from './components/Loader'
import Admin from './pages/Admin'

gsap.registerPlugin(ScrollTrigger)

function CustomCursor(){
  const cursorRef = useRef(null)
  const spotlightRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(()=>{
    const mobile = window.innerWidth < 768 || 'ontouchstart' in window
    setIsMobile(mobile)
    if(mobile) return
    const onMove = (e) => {
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.25, ease: 'power3.out' })
      gsap.to(spotlightRef.current, { x: e.clientX, y: e.clientY, duration: 0.8, ease: 'power2.out' })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  },[])
  if(isMobile) return null
  return (
    <>
      <div ref={spotlightRef} style={{ position: 'fixed', top:0, left:0, width: 700, height: 700, background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 5, transform: 'translate(-50%, -50%)' }} />
      <div ref={cursorRef} style={{ position: 'fixed', top:0, left:0, width: 28, height: 28, border: '1px solid rgba(255,255,255,0.4)', borderRadius: '50%', pointerEvents: 'none', zIndex: 2147483646, mixBlendMode: 'difference' }} />
    </>
  )
}

function Marquee(){
  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', padding: '14px 0', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(10px)', maxWidth: '100vw' }}>
      <div style={{ display: 'inline-flex', animation: 'marquee 20s linear infinite' }}>
        {Array(6).fill(' AVAILABLE FOR FREELANCE • REMOTE WORLDWIDE • LET\'S BUILD SOMETHING COOL • ').map((t,i)=>(<span key={i} style={{ fontSize: 12, letterSpacing: '0.2em', opacity: 0.4, paddingRight: 40 }}>{t}</span>))}
      </div>
      <style>{`@keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>
    </div>
  )
}

function FadeSection({ children }){
  const ref = useRef(null)
  useEffect(()=>{
    gsap.fromTo(ref.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } })
  },[])
  return <div ref={ref}>{children}</div>
}

export default function App(){
  const [progress, setProgress] = useState(0)
  const [fullImg, setFullImg] = useState(null)
  const [loading, setLoading] = useState(true)
  const isAdmin = window.location.pathname === '/admin'

  useEffect(()=>{
    if(isAdmin) return
    const lenis = new Lenis({ duration: 1.4, easing: t=>Math.min(1,1.001-Math.pow(2,-10*t)), touchMultiplier: 1.5, smoothTouch: false })
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    lenis.on('scroll', ()=>{ const p = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight); setProgress(p); ScrollTrigger.update() })
    return ()=> lenis.destroy()
  },[isAdmin])

  useEffect(()=>{
    const onImgClick = (e) => {
      const el = e.target
      if (el.tagName === 'IMG' && el.src &&!el.closest('nav')) { if(el.width > 100){ setFullImg(el.src) } }
    }
    document.addEventListener('click', onImgClick)
    return () => document.removeEventListener('click', onImgClick)
  },[])

  if(isAdmin) return <Admin />

  return (<>
    {loading && <Loader onFinish={()=>setLoading(false)} />}
    <FilmGrain />
    <Navbar progress={progress} />
    <CustomCursor />
    <div className="canvas" style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', height: '100dvh' }}><Scene progress={progress} /></div>
    <main className="content" style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
      <FadeSection><Hero /></FadeSection>
      <FadeSection><About /></FadeSection>
      <FadeSection><Skills /></FadeSection>
      <Marquee />
      <FadeSection><Showcase /></FadeSection>
      <FadeSection><Experience /></FadeSection>
      <FadeSection><Stats /></FadeSection>
      <FadeSection><Contact /></FadeSection>
      <Footer />
    </main>
    {fullImg && (
      <div onClick={() => setFullImg(null)} style={{position:'fixed',inset:0,zIndex:2147483647,background:'rgba(5,5,10,0.85)',backdropFilter:'blur(30px)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'zoom-out', padding: 20}}>
        <img src={fullImg} onClick={(e)=>e.stopPropagation()} style={{maxWidth:'92vw',maxHeight:'75vh', borderRadius:24, zIndex:2, boxShadow:'0 30px 90px rgba(0,0,0,0.8)', background:'white', objectFit: 'contain'}} />
        <div onClick={() => setFullImg(null)} style={{position:'absolute',top:20,right:20,zIndex:3,width:44,height:44,borderRadius:'50%',background:'rgba(255,255,255,0.12)',border:'1px solid rgba(255,255,255,0.2)',color:'white',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>✕</div>
      </div>
    )}
  </>)
}