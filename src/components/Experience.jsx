export default function Experience(){
  const items = [
    {
      year: '2024 - 2027',
      role: 'Bachelor of Computer Applications (BCA)',
      place: 'KLE GH BCA College, Haveri • CGPA 8.58',
      desc: 'Learning software development, web technologies, UI/UX design and mobile app development with Flutter & Django.'
    },
    {
      year: '2024 • 2nd Place',
      role: 'Hospital Management System - Hackathon',
      place: 'KLE GH BCA College',
      desc: 'Built modules for patient records, appointments, doctor management & billing in 24hrs. Won 2nd place for UI & functionality.'
    },
    {
      year: '2024',
      role: 'Heart Disease Prediction System',
      place: 'Academic Project • Machine Learning',
      desc: 'Developed ML model to predict heart disease using healthcare data. Handled data preprocessing & model evaluation.'
    },
  ]

  return (
    <section id="experience" style={{
      padding:'60px 40px', 
      maxWidth:1100, 
      margin:'60px auto', // gap from top/bottom, center only
      width:'90%', // not full screen
      borderRadius:'32px', // 4 SIDE RADIUS
      background:'rgba(255,255,255,0.75)',
      backdropFilter:'blur(16px)',
      WebkitBackdropFilter:'blur(16px)',
      border:'1px solid rgba(0,0,0,0.06)',
      boxShadow:'0 12px 40px rgba(0,0,0,0.06)',
      position:'relative',
      zIndex:2
    }}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:48, flexWrap:'wrap', gap:10}}>
        <h2 style={{fontSize:'clamp(32px,6vw,52px)', fontFamily:'serif', margin:0, color:'#111'}}>Experience & <i style={{fontWeight:400, color:'#7c3aed'}}>Education</i></h2>
        <span style={{fontSize:11, letterSpacing:'0.15em', opacity:0.4}}>2024 — 2027 JOURNEY</span>
      </div>

      <div style={{position:'relative', display:'flex', flexDirection:'column', gap:32}}>
        <div style={{position:'absolute', left:7, top:0, bottom:0, width:1, background:'#e5e5e5'}} />
        {items.map((it,i)=>(
          <div key={i} style={{display:'grid', gridTemplateColumns:'16px 1fr', gap:16}}>
            <div style={{width:15, height:15, borderRadius:100, background:'#111', border:'3px solid #fff', boxShadow:'0 0 0 1px #e5e5e5', marginTop:4}} />
            <div>
              <div style={{display:'flex', gap:8, flexWrap:'wrap', marginBottom:8}}>
                <span style={{fontSize:11, padding:'4px 10px', borderRadius:100, border:'1px solid #ddd'}}>{it.year}</span>
                <span style={{fontSize:11, opacity:0.5}}>{it.place}</span>
              </div>
              <h3 style={{margin:'0 0 8px 0', fontSize:18, fontWeight:700}}>{it.role}</h3>
              <p style={{margin:0, fontSize:14, opacity:0.6, lineHeight:1.6, maxWidth:600}}>{it.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* DARK MODE - auto glassy */}
      <style>{`
        @media (prefers-color-scheme: dark) {
          #experience {
            background: rgba(20,20,20,0.75) !important;
            border: 1px solid rgba(255,255,255,0.08) !important;
            box-shadow: 0 12px 40px rgba(0,0,0,0.4) !important;
            color: #fff !important;
          }
          #experience h2, #experience h3, #experience span, #experience p {
            color: #fff !important;
          }
          #experience p { opacity: 0.6 !important; }
        }
      `}</style>
    </section>
  )
}