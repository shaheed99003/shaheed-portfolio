import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon, Download } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Navbar({ progress }){
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [active, setActive] = useState('')

  useEffect(()=>{
    const f=()=>setScrolled(window.scrollY>20)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)

    // FIXED: was ['about','skills','showcase'...] but your section id is 'projects'
    const onScroll = () => {
      const sections = ['about','skills','projects','experience','contact']
      for(let id of sections){
        const el = document.getElementById(id)
        if(el){
          const rect = el.getBoundingClientRect()
          if(rect.top <= 120 && rect.bottom >= 120){
            setActive(id)
            break
          }
        }
      }
    }

    checkMobile()
    window.addEventListener('scroll',f)
    window.addEventListener('scroll',onScroll)
    window.addEventListener('resize', checkMobile)
    return()=>{
      window.removeEventListener('scroll',f)
      window.removeEventListener('scroll',onScroll)
      window.removeEventListener('resize', checkMobile)
    }
  },[])

  useEffect(()=>{
    document.body.style.overflow = open? 'hidden' : 'auto'
    return ()=> document.body.style.overflow = 'auto'
  },[open])

  // FIXED: id was 'showcase' → should be 'projects' to match <section id="projects">
  const links = [
    {id:'about',label:'About'},
    {id:'skills',label:'Skills'},
    {id:'projects',label:'Projects'}, // FIXED HERE
    {id:'experience',label:'Experience'},
    {id:'contact',label:'Contact'}
  ]

  const scrollTo = (id)=>{
    const el = document.getElementById(id)
    if(el){
      el.scrollIntoView({behavior:'smooth', block:'start'})
    }
    setOpen(false)
  }

  return (
    <nav style={{
      position:'fixed',top:0,left:0,right:0,zIndex:30,
      background: scrolled? (theme==='dark'? 'rgba(5,5,7,0.84)' : 'rgba(251,250,248,0.84)') : 'transparent',
      backdropFilter: scrolled? 'blur(24px)' : 'none',
      WebkitBackdropFilter: scrolled? 'blur(24px)' : 'none',
      borderBottom:`1px solid ${scrolled? (theme==='dark'? 'rgba(255,255,255,0.08)' : '#ece9e3') : 'transparent'}`,
      transition:'all.5s',
      width: '100%', maxWidth: '100vw'
    }}>
      <div style={{height:2, background: theme==='dark'? 'white' : 'black', width:`${progress*100}%`, transition: 'width 0.1s'}} />

      <div style={{
        height: scrolled? (isMobile? 60 : 64) : (isMobile? 70 : 84),
        display:'flex',alignItems:'center',justifyContent:'space-between',
        transition:'height.5s', padding: isMobile? '0 20px' : '0 28px'
      }}>
        <div style={{fontWeight:700,fontSize:22,cursor:'pointer', letterSpacing: '-0.02em', zIndex:31}} onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>shaheed.</div>

        <div className="hide-m" style={{display:'flex',gap:28, alignItems:'center'}}>
          {links.map(l=><button key={l.id} onClick={()=>scrollTo(l.id)}
            style={{
              fontSize:13, cursor:'pointer', background:'none', border:0, fontWeight:500, transition:'color 0.2s',
              color: active===l.id? 'var(--text)' : 'var(--muted)',
              borderBottom: active===l.id? '1px solid var(--text)' : '1px solid transparent',
              paddingBottom:2
            }}
          >{l.label}</button>)}
          <a href="/resume.pdf" target="_blank" style={{fontSize:13, padding:'8px 16px', borderRadius:100, border:'1px solid var(--line)', textDecoration:'none', color:'var(--text)', display:'flex', alignItems:'center', gap:6, fontWeight:500}}>
            <Download size={14}/> Resume
          </a>
        </div>

        <div style={{display:'flex',gap:10,alignItems:'center', zIndex:31}}>
          <button onClick={toggle} style={{width:36,height:36,borderRadius:100,border:'1px solid var(--line)',display:'grid',placeItems:'center',background:'var(--card)',cursor:'pointer',color:'var(--text)'}}>{theme==='light'?<Moon size={16}/>:<Sun size={16}/>}</button>
          <button onClick={()=>scrollTo('contact')} className="hide-m" style={{padding:'10px 18px',fontSize:13, borderRadius:100, background:'var(--text)', color:'var(--bg)', border:0, cursor:'pointer', fontWeight:500}}>Let's Connect →</button>
          <button onClick={()=>setOpen(!open)} style={{background:'none',border:0,cursor:'pointer',color:'var(--text)', width:36, height:36, display:'grid', placeItems:'center'}} className="mobile-btn">{open?<X size={20}/>:<Menu size={20}/>}</button>
        </div>
      </div>

      {open && (
        <div style={{
          position:'fixed',inset:0,top:0,paddingTop: isMobile? 80 : 64,
          background: theme==='dark'? 'rgba(5,5,7,0.96)' : 'var(--bg)',
          backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
          paddingLeft:32, paddingRight:32, paddingBottom:32, zIndex:20,
          display:'flex', flexDirection:'column', width:'100vw', height:'100dvh',
          animation:'fadeIn 0.3s ease'
        }}>
          {links.map((l,i)=><button key={l.id} onClick={()=>scrollTo(l.id)}
            style={{
              display:'block',fontSize:'clamp(38px, 10vw, 56px)', fontFamily:'Instrument Serif',marginBottom:16,
              background:'none',border:0,cursor:'pointer', color: active===l.id? 'var(--text)' : 'var(--muted)',
              textAlign:'left', opacity:0, animation:`slideUp 0.4s ease forwards ${i*0.07}s`, letterSpacing:'-0.03em'
            }}>{l.label}</button>)}

          <div style={{marginTop:'auto', paddingTop:40, borderTop:'1px solid var(--line)', opacity:0, animation:'fadeIn 0.5s ease forwards 0.4s', display:'flex', flexDirection:'column', gap:12}}>
            <a href="/resume.pdf" target="_blank" style={{width:'100%', padding:'14px', borderRadius:100, background:'transparent', border:'1px solid var(--line)', color:'var(--text)', fontSize:15, fontWeight:600, textAlign:'center', textDecoration:'none', display:'flex', justifyContent:'center', gap:8, alignItems:'center'}}>
              <Download size={18}/> Download Resume
            </a>
            <button onClick={()=>scrollTo('contact')} style={{width:'100%', padding:'16px', borderRadius:100, background:'var(--text)', color:'var(--bg)', border:0, fontSize:16, fontWeight:600, cursor:'pointer'}}>Let's Connect →</button>
          </div>
        </div>
      )}

      <style>{`
        html{scroll-behavior:smooth}
        #projects,#about,#skills,#experience,#contact{scroll-margin-top:100px}
        @media(min-width:769px){.mobile-btn{display:none!important}}
        @media(max-width:768px){.hide-m{display:none!important}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0; transform: translateY(20px)}to{opacity:1; transform: translateY(0)}}
      `}</style>
    </nav>
  )
}