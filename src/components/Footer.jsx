export default function Footer() {
  return (
    <footer style={{ padding: '0 8% 40px 8%', marginTop: 80 }}>
      
      <div className="footer-glass" style={{
        backdropFilter: 'blur(24px)',
        borderRadius: 32,
        padding: '60px 48px 36px 48px',
      }}>
        
        {/* TOP - BIG */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: 40, flexWrap: 'wrap' }}>
          
          <div>
            <h2 style={{ fontSize: 54, fontFamily: 'serif', fontWeight: 400, margin: '0 0 16px 0', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
              Let's build<br/>something<br/><i>cool together.</i>
            </h2>
            <p style={{ fontSize: 15, opacity: 0.6, lineHeight: 1.6, maxWidth: 380, margin: '20px 0 0 0' }}>
              I'm open for freelance projects, internships & collaborations. Drop a mail, let's talk!
            </p>

            {/* BIG EMAIL PILL */}
            <a href="mailto:shaheedkhan99003@gmail.com" style={{ textDecoration: 'none', display: 'inline-block', marginTop: 28 }}>
              <div className="email-pill" style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 22px', borderRadius: 999, fontSize: 15, fontWeight: 500,
                transition: 'all 0.3s', cursor: 'pointer'
              }}>
                <span style={{ fontSize: 18 }}>✉️</span> shaheedkhan99003@gmail.com
                <span style={{ opacity: 0.5 }}>↗</span>
              </div>
            </a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, justifyContent: 'center' }}>
            
            {/* CONNECT - BIG NOW */}
            <div>
              <div style={{ fontSize: 11, letterSpacing: '0.2em', opacity: 0.4, marginBottom: 18, fontWeight: 800 }}>CONNECT</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href="https://github.com" target="_blank" className="connect-link" style={{ textDecoration: 'none', fontSize: 18, fontWeight: 500, color: 'inherit', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderRadius: 16 }}>
                  GitHub <span>↗</span>
                </a>
                <a href="https://linkedin.com" target="_blank" className="connect-link" style={{ textDecoration: 'none', fontSize: 18, fontWeight: 500, color: 'inherit', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderRadius: 16 }}>
                  LinkedIn <span>↗</span>
                </a>
                <a href="https://instagram.com" target="_blank" className="connect-link" style={{ textDecoration: 'none', fontSize: 18, fontWeight: 500, color: 'inherit', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderRadius: 16 }}>
                  Instagram <span>↗</span>
                </a>
              </div>
            </div>

            <div>
              <div style={{ fontSize: 11, letterSpacing: '0.2em', opacity: 0.4, marginBottom: 12, fontWeight: 800 }}>LOCATION</div>
              <div style={{ fontSize: 14, opacity: 0.6, lineHeight: 1.5 }}>Bangalore, India<br/>Available for work worldwide 🌍</div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, paddingTop: 28, borderTop: '1px solid rgba(0,0,0,0.07)', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 13, opacity: 0.4, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 800 }}>shaheed.</span> © 2026 — Crafted with code & creativity
          </div>
          <div style={{ fontSize: 11, opacity: 0.3, letterSpacing: '0.1em' }}>DESIGNED & BUILT BY ME</div>
        </div>
      </div>

      <style>{`
        .footer-glass {
          background: rgba(255,255,255,0.7) !important;
          border: 1px solid rgba(0,0,0,0.08) !important;
          box-shadow: 0 20px 60px rgba(0,0,0,0.08) !important;
        }
        .email-pill {
          background: black !important;
          color: white !important;
        }
        .email-pill:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(0,0,0,0.2) !important; }
        .connect-link {
          background: rgba(0,0,0,0.04) !important;
          border: 1px solid rgba(0,0,0,0.06) !important;
          transition: all 0.2s !important;
        }
        .connect-link:hover {
          background: white !important;
          color: black !important;
          transform: translateX(4px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.06) !important;
        }

        /* DARK - VISIBLE */
        .dark .footer-glass, [data-theme="dark"] .footer-glass {
          background: rgba(255,255,255,0.11) !important;
          border: 1px solid rgba(255,255,255,0.16) !important;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1) !important;
        }
        .dark .email-pill {
          background: white !important;
          color: black !important;
        }
        .dark .connect-link {
          background: rgba(255,255,255,0.08) !important;
          border: 1px solid rgba(255,255,255,0.14) !important;
          color: white !important;
        }
        .dark .connect-link:hover {
          background: white !important;
          color: black !important;
        }
        @media(max-width: 800px) {
          .footer-glass > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}