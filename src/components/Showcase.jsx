import { useEffect, useRef, useState } from "react";

const projects = [
  { n: "01", title: "OTT Platform — UI/UX", meta: "Figma · 2024", desc: "A modern Netflix-inspired OTT platform interface designed in Figma with a clean entertainment-focused user experience.", link: "https://www.figma.com/proto/WlY8vHIPZiYxIl3iJ2D16A/Untitled?node-id=242-62&p=f&t=XIVIRCeaDHXcEA14-1", type: "Design" },
  { n: "02", title: "EduNova", meta: "Live · Full Stack", desc: "A student management platform designed to manage academic information through a simple and responsive interface.", link: "https://edunova-61oh.onrender.com/", type: "Web App" },
  { n: "03", title: "Hospital HMS", meta: "Hackathon · 2nd Prize", desc: "A hospital management system developed during a college hackathon to simplify hospital-related management workflows.", link: "https://github.com/shaheed99003", type: "Hackathon" },
  { n: "04", title: "Heart Disease ML", meta: "Machine Learning", desc: "A machine learning project using Python and Scikit-learn to predict the possibility of heart disease from medical attributes.", link: "https://github.com/shaheed99003", type: "ML" },
  { n: "05", title: "Portfolio v2", meta: "Personal · 2025", desc: "An interactive personal portfolio exploring smooth motion, magnetic interactions and immersive 3D web experiences.", link: "https://github.com/shaheed99003", type: "Portfolio" },
];

export default function Showcase() {
  const [isDark, setIsDark] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const startX = useRef(0);
  const startRotation = useRef(0);
  const rotationRef = useRef(0);
  const autoRotateRef = useRef(null);
  const wasDragging = useRef(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    const checkTheme = () => {
      const dark = document.documentElement.classList.contains("dark") || document.body.classList.contains("dark") || document.documentElement.getAttribute("data-theme") === "dark";
      setIsDark(dark);
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    return () => {
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      clearInterval(autoRotateRef.current);
    };
  }, []);

  useEffect(() => {
    if (isDragging || showAll) return;
    autoRotateRef.current = setInterval(() => {
      rotationRef.current -= 0.18;
      setRotation(rotationRef.current);
    }, 32);
    return () => clearInterval(autoRotateRef.current);
  }, [isDragging, showAll]);

  useEffect(() => {
    if (!showAll) return;
    const handleOutside = (e) => {
      if (wrapperRef.current &&!wrapperRef.current.contains(e.target)) setShowAll(false);
    };
    const handleEsc = (e) => e.key === "Escape" && setShowAll(false);
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [showAll]);

  const getPointerX = (e) => e.touches?.[0]?.clientX?? e.clientX;
  const handlePointerDown = (e) => {
    startX.current = getPointerX(e);
    startRotation.current = rotationRef.current;
    setIsDragging(true);
    wasDragging.current = false;
    clearInterval(autoRotateRef.current);
  };
  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const x = getPointerX(e);
    if (Math.abs(x - startX.current) > 3) wasDragging.current = true;
    rotationRef.current = startRotation.current + (x - startX.current) * 0.35;
    setRotation(rotationRef.current);
  };
  const handlePointerUp = () => {
    setIsDragging(false);
    setTimeout(() => (wasDragging.current = false), 100);
  };
  const openProject = (p) => {
    if (wasDragging.current) return;
    window.open(p.link, "_blank", "noopener,noreferrer");
  };

  const colors = {
    text: isDark? "#ffffff" : "#111111",
    secondary: isDark? "#a1a1aa" : "#71717a",
    muted: isDark? "#71717a" : "#a1a1aa",
    card: isDark? "rgba(28,28,32,0.96)" : "rgba(255,255,255,0.98)",
    border: isDark? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)",
    panel: isDark? "rgba(18,18,20,0.6)" : "rgba(255,255,255,0.75)",
    btn: isDark? "#ffffff" : "#111111",
    btnText: isDark? "#111111" : "#ffffff",
  };

  const radius = isMobile? 210 : 380;
  const angle = 360 / projects.length;
  const activeIndex = Math.round((((-rotation % 360) + 360) % 360) / angle) % projects.length;

  return (
    <section id="projects" style={{ width: "92%", maxWidth: 1180, margin: "160px auto", position: "relative", zIndex: 2, scrollMarginTop: "100px" }}>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", color: colors.muted, marginBottom: 20, textTransform: "uppercase" }}>Selected Work</div>
          <h2 style={{ margin: 0, fontSize: "clamp(48px, 6.5vw, 80px)", lineHeight: 1, fontWeight: 400, letterSpacing: "-0.02em", color: colors.text, fontFamily: "'Instrument Serif', Georgia, serif" }}>
            Projects<span style={{ color: colors.muted }}>.</span>
          </h2>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", color: colors.muted, paddingBottom: 8 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: colors.text }} />
          {showAll? "Click outside to close" : "Drag to explore"}
        </div>
      </div>

      <div ref={wrapperRef}>
        {!showAll && (
          <>
            <div
              onMouseDown={handlePointerDown} onMouseMove={handlePointerMove} onMouseUp={handlePointerUp} onMouseLeave={handlePointerUp}
              onTouchStart={handlePointerDown} onTouchMove={handlePointerMove} onTouchEnd={handlePointerUp}
              style={{
                width: "100%", height: isMobile? 380 : 440, position: "relative", perspective: "1300px",
                cursor: isDragging? "grabbing" : "grab", overflow: "hidden", borderRadius: 36,
                background: colors.panel, border: `1px solid ${colors.border}`, backdropFilter: "blur(20px)",
                touchAction: "pan-y", userSelect: "none",
              }}
            >
              <div style={{ width: "100%", height: "100%", position: "relative", transformStyle: "preserve-3d", transform: `rotateY(${rotation}deg)`, willChange: "transform" }}>
                {projects.map((project, index) => (
                  <article key={project.n} onClick={() => openProject(project)} style={{
                    position: "absolute", left: "50%", top: "50%", width: isMobile? 280 : 340, height: 210,
                    marginLeft: isMobile? -140 : -170, marginTop: -105,
                    transform: `rotateY(${index * angle}deg) translateZ(${radius}px)`,
                    background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 26, padding: 26,
                    display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer",
                    boxShadow: isDark? "0 20px 60px rgba(0,0,0,0.4)" : "0 20px 60px rgba(0,0,0,0.08)",
                    backfaceVisibility: "hidden",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", color: colors.muted }}>{project.n} <span style={{ margin: "0 6px" }}>·</span> {project.type}</span>
                      <span style={{ width: 32, height: 32, borderRadius: "50%", border: `1px solid ${colors.border}`, display: "grid", placeItems: "center", fontSize: 13, color: colors.text }}>↗</span>
                    </div>
                    <div style={{ marginTop: 12 }}>
                      <h3 style={{ margin: "0 0 12px", fontSize: 22, fontWeight: 400, lineHeight: 1.2, color: colors.text, fontFamily: "'Instrument Serif', Georgia, serif" }}>{project.title}</h3>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 400, color: colors.secondary, lineHeight: 1.7 }}>{project.desc}</p>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, paddingTop: 16, borderTop: `1px solid ${colors.border}` }}>
                      <span style={{ fontSize: 11, fontWeight: 500, color: colors.muted }}>{project.meta}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: colors.text }}>Open ↗</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 28 }}>
              {projects.map((_, i) => (
                <div key={i} style={{ width: activeIndex === i? 28 : 7, height: 6, borderRadius: 20, background: activeIndex === i? colors.text : colors.border, transition: "all 0.4s ease" }} />
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: 36 }}>
              <button onClick={() => setShowAll(true)} style={{ padding: "16px 32px", borderRadius: 100, border: `1px solid ${colors.border}`, background: colors.btn, color: colors.btnText, fontSize: 14, fontWeight: 500, cursor: "pointer", letterSpacing: "0.01em" }}>
                See all projects ({projects.length}) →
              </button>
            </div>
          </>
        )}

        {showAll && (
          <div style={{ background: colors.panel, border: `1px solid ${colors.border}`, borderRadius: 32, padding: isMobile? 20 : 32, backdropFilter: "blur(20px)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
              <h3 style={{ margin: 0, fontSize: 32, fontWeight: 400, color: colors.text, fontFamily: "'Instrument Serif', Georgia, serif", letterSpacing: "-0.02em" }}>All Projects</h3>
              <button onClick={() => setShowAll(false)} style={{ padding: "10px 20px", borderRadius: 100, border: `1px solid ${colors.border}`, background: "transparent", color: colors.text, cursor: "pointer", fontSize: 13, fontWeight: 500 }}>✕ Close</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
              {projects.map((p) => (
                <div key={p.n} onClick={() => openProject(p)} style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 22, padding: 24, cursor: "pointer", transition: "transform 0.2s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                    <span style={{ fontSize: 11, fontWeight: 500, color: colors.muted }}>{p.n} — {p.type}</span>
                    <span style={{ fontSize: 14 }}>↗</span>
                  </div>
                  <h4 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: 400, color: colors.text, fontFamily: "'Instrument Serif', Georgia, serif", lineHeight: 1.2 }}>{p.title}</h4>
                  <p style={{ margin: "0 0 20px", fontSize: 13, color: colors.secondary, lineHeight: 1.7 }}>{p.desc}</p>
                  <div style={{ fontSize: 11, fontWeight: 500, color: colors.muted, borderTop: `1px solid ${colors.border}`, paddingTop: 14 }}>{p.meta}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
        html{scroll-behavior:smooth}
        #projects{scroll-margin-top:110px}
      `}</style>
    </section>
  );
}