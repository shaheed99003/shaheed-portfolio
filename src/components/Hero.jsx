import { useEffect, useState } from 'react';
import MagneticButton from './MagneticButton';

export default function Hero() {
  const [isDark, setIsDark] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const hasDarkClass = document.documentElement.classList.contains('dark') || 
                          document.body.classList.contains('dark') ||
                          document.documentElement.getAttribute('data-theme') === 'dark';
      setIsDark(hasDarkClass);
    };
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    
    checkTheme(); checkMobile();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    window.addEventListener('resize', checkMobile);
    
    return () => { observer.disconnect(); window.removeEventListener('resize', checkMobile); }
  }, []);

  return (
    <section style={{
      minHeight: '100vh',
      minHeight: '100dvh',
      position: 'relative',
      background: 'transparent',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '80px',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '100vw'
    }}>
      {/* Left Text */}
      <div style={{ 
        paddingLeft: isMobile ? '20px' : '8%', 
        width: isMobile ? '100%' : '38%', 
        zIndex: 10,
        position: 'relative',
        paddingRight: isMobile ? '20px' : 0
      }}>
        <h1 style={{ 
          fontSize: isMobile ? 'clamp(32px, 9vw, 42px)' : 'clamp(40px, 4vw, 54px)', 
          lineHeight: 0.95, 
          fontWeight: 800, 
          margin: 0, 
          color: isDark ? 'white' : 'black',
          fontFamily: 'serif',
          transition: 'color 0.3s',
          maxWidth: '100%'
        }}>
          I build digital<br/>experiences<br/>
          <i style={{fontWeight:400}}>with code &<br/>creativity.</i>
        </h1>
        <p style={{ 
          marginTop: 16, 
          color: isDark ? '#bbb' : '#555', 
          fontSize: isMobile ? 15 : 14, 
          lineHeight: 1.6, 
          maxWidth: isMobile ? '100%' : 300,
          transition: 'color 0.3s'
        }}>
          I'm Shaheed Khan R, a BCA student passionate about software development and modern interfaces.
        </p>

        {/* MAGNETIC BUTTONS - Added */}
        <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <MagneticButton 
            className="btn btn-black" 
            onClick={()=> document.getElementById('projects')?.scrollIntoView({behavior:'smooth'})}
            style={{ background: isDark ? 'white' : 'black', color: isDark ? 'black' : 'white' }}
          >
            Explore Work <span>→</span>
          </MagneticButton>
          <MagneticButton 
            className="btn btn-white"
            onClick={()=> document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}
            style={{ border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : '#ece9e3'}`, background: isDark ? '#121212' : 'white', color: isDark ? 'white' : 'black' }}
          >
            Let's Talk
          </MagneticButton>
        </div>
      </div>

      {/* Center 3D Image */}
      <div style={{
        position: isMobile ? 'relative' : 'absolute',
        left: isMobile ? 'auto' : '50%',
        top: isMobile ? 'auto' : '55%',
        transform: isMobile ? 'none' : 'translate(-50%, -50%)',
        width: isMobile ? '90vw' : '650px',
        height: isMobile ? '380px' : '650px',
        zIndex: 2,
        pointerEvents: 'none',
        filter: isDark ? 'invert(1)' : 'none',
        transition: 'filter 0.3s',
        margin: isMobile ? '20px auto 0' : 0,
        order: isMobile ? 3 : 0
      }}>
        <img src="/torus3d.png" alt="3d" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>

      {/* Right Profile - only show nicely on mobile below */}
      <div style={{ 
        position: isMobile ? 'relative' : 'absolute', 
        right: isMobile ? 'auto' : '35px', 
        top: isMobile ? 'auto' : '110px', 
        zIndex: 9,
        margin: isMobile ? '20px auto 0' : 0,
        display: 'flex',
        justifyContent: isMobile ? 'center' : 'flex-end',
        width: isMobile ? '100%' : 'auto'
      }}>
        <img
          src="/shaheed.png"
          alt="Shaheed"
          style={{
            width: isMobile ? '200px' : '280px',
            height: isMobile ? '240px' : '340px',
            objectFit: 'cover',
            objectPosition: 'top center',
            borderRadius: '24px',
            border: 'none',
            display: 'block'
          }}
        />
      </div>

      {/* Mobile Stack Fix */}
      <style>{`
        @media(max-width:768px){
          section{ flex-direction: column; align-items: flex-start !important; padding-top: 90px !important; padding-bottom: 40px; }
        }
      `}</style>
    </section>
  )
}