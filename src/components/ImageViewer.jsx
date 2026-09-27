import { useState, useEffect } from 'react';

export default function ImageViewer() {
  const [img, setImg] = useState(null);

  useEffect(() => {
    const onClick = (e) => {
      const target = e.target;
      if (target.tagName === 'IMG' && !target.closest('a') && !target.closest('button')) {
        // don't open small icons, only big project images
        if (target.naturalWidth > 100) {
          setImg(target.src);
        }
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  if (!img) return null;

  return (
    <div onClick={() => setImg(null)} style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'zoom-out', padding: 20
    }}>
      <img src={img} style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: 20, boxShadow: '0 20px 80px black' }} />
      <div style={{ position: 'absolute', top: 20, right: 20, color: 'white', fontSize: 30, cursor: 'pointer' }}>✕</div>
    </div>
  );
}