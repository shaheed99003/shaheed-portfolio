export default function Marquee(){
  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '14px 0', background: 'rgba(255,255,255,0.02)' }}>
      <div style={{ display: 'inline-flex', animation: 'marquee 20s linear infinite', gap: 40 }}>
        {[1,2,3,4].map(i=>(
          <span key={i} style={{ display: 'inline-flex', gap: 40, fontSize: 13, letterSpacing: '0.2em', opacity: 0.6 }}>
            <span>OPEN TO WORK</span><span>•</span><span>AVAILABLE FOR FREELANCE</span><span>•</span><span>REMOTE WORLDWIDE</span><span>•</span><span>LET'S BUILD SOMETHING COOL</span><span>•</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>
    </div>
  )
}