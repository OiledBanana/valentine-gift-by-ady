
"use client";
import { useState, useEffect } from 'react';

export default function Home() {
  const [pixels, setPixels] = useState([]);
  const [bloomed, setBloomed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [butterflies, setButterflies] = useState([]);
  const [bees, setBees] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const createSunflowerPixels = (offsetX, bottomY, scale, id) => {
    const basePixels = [
      { x: 4, y: 0, color: '#FFD700', part: 'flower' },
      { x: 3, y: 1, color: '#FFD700', part: 'flower' }, { x: 5, y: 1, color: '#FFD700', part: 'flower' },
      { x: 2, y: 2, color: '#FFD700', part: 'flower' }, { x: 6, y: 2, color: '#FFD700', part: 'flower' },
      { x: 1, y: 3, color: '#FFC107', part: 'flower' }, { x: 7, y: 3, color: '#FFC107', part: 'flower' },
      { x: 0, y: 4, color: '#FFD700', part: 'flower' }, { x: 8, y: 4, color: '#FFD700', part: 'flower' },
      { x: 0, y: 5, color: '#FFC107', part: 'flower' }, { x: 8, y: 5, color: '#FFC107', part: 'flower' },
      { x: 1, y: 6, color: '#FFC107', part: 'flower' }, { x: 7, y: 6, color: '#FFC107', part: 'flower' },
      { x: 2, y: 7, color: '#FFD700', part: 'flower' }, { x: 6, y: 7, color: '#FFD700', part: 'flower' },
      { x: 3, y: 8, color: '#FFD700', part: 'flower' }, { x: 5, y: 8, color: '#FFD700', part: 'flower' },
      { x: 4, y: 9, color: '#FFD700', part: 'flower' },
      { x: 3, y: 3, color: '#8B4513', part: 'flower' }, { x: 4, y: 3, color: '#654321', part: 'flower' }, { x: 5, y: 3, color: '#8B4513', part: 'flower' },
      { x: 2, y: 4, color: '#654321', part: 'flower' }, { x: 3, y: 4, color: '#4a2c0a', part: 'flower' }, { x: 4, y: 4, color: '#8B4513', part: 'flower' }, { x: 5, y: 4, color: '#4a2c0a', part: 'flower' }, { x: 6, y: 4, color: '#654321', part: 'flower' },
      { x: 2, y: 5, color: '#8B4513', part: 'flower' }, { x: 3, y: 5, color: '#654321', part: 'flower' }, { x: 4, y: 5, color: '#4a2c0a', part: 'flower' }, { x: 5, y: 5, color: '#654321', part: 'flower' }, { x: 6, y: 5, color: '#8B4513', part: 'flower' },
      { x: 3, y: 6, color: '#8B4513', part: 'flower' }, { x: 4, y: 6, color: '#654321', part: 'flower' }, { x: 5, y: 6, color: '#8B4513', part: 'flower' },
      { x: 4, y: 10, color: '#228B22', part: 'stem' },
      { x: 4, y: 11, color: '#2E8B2E', part: 'stem' },
      { x: 4, y: 12, color: '#228B22', part: 'stem' },
      { x: 4, y: 13, color: '#2E8B2E', part: 'stem' },
      { x: 4, y: 14, color: '#228B22', part: 'stem' },
      { x: 4, y: 15, color: '#2E8B2E', part: 'stem' },
      { x: 4, y: 16, color: '#228B22', part: 'stem' },
      { x: 2, y: 12, color: '#228B22', part: 'leaf' }, { x: 3, y: 12, color: '#2E8B2E', part: 'leaf' },
      { x: 5, y: 14, color: '#2E8B2E', part: 'leaf' }, { x: 6, y: 14, color: '#228B22', part: 'leaf' },
    ];
    const pixelSize = 5 * scale;
    const flowerHeight = 17 * pixelSize;
    const startY = bottomY - flowerHeight;
    return basePixels.map(function(p) {
      return { x: p.x * pixelSize + offsetX, y: p.y * pixelSize + startY, color: p.color, size: pixelSize, part: p.part, flowerId: id };
    });
  };

  const flowerPositions = [
    { x: 8, bottom: 195, scale: 0.9 }, { x: 45, bottom: 200, scale: 1.1 },
    { x: 85, bottom: 198, scale: 1.0 }, { x: 125, bottom: 202, scale: 1.2 },
    { x: 165, bottom: 196, scale: 1.0 }, { x: 205, bottom: 200, scale: 1.1 },
    { x: 245, bottom: 198, scale: 0.95 }, { x: 280, bottom: 202, scale: 1.0 },
  ];

  const getAllPixels = function() {
    let result = [];
    for (let i = 0; i < flowerPositions.length; i++) {
      const pos = flowerPositions[i];
      const flowerPixels = createSunflowerPixels(pos.x, pos.bottom, pos.scale, i);
      result = result.concat(flowerPixels);
    }
    return result;
  };

  useEffect(function() {
    if (!bloomed) return;
    setButterflies([
      { id: 1, x: 50, y: 80, dx: 1.5, dy: 0.8 },
      { id: 2, x: 200, y: 60, dx: -1.2, dy: 1 },
      { id: 3, x: 150, y: 100, dx: 1, dy: -0.7 },
    ]);
    setBees([
      { id: 1, x: 100, y: 70, dx: 1.8, dy: 0.5 },
      { id: 2, x: 250, y: 90, dx: -1.5, dy: 0.8 },
    ]);
    const interval = setInterval(function() {
      setButterflies(function(prev) {
        return prev.map(function(b) {
          let newX = b.x + b.dx;
          let newY = b.y + b.dy + Math.sin(Date.now() / 200 + b.id) * 0.5;
          let newDx = b.dx;
          let newDy = b.dy;
          if (newX < 10 || newX > 300) newDx = -newDx;
          if (newY < 30 || newY > 140) newDy = -newDy;
          return { id: b.id, x: newX, y: newY, dx: newDx, dy: newDy };
        });
      });
      setBees(function(prev) {
        return prev.map(function(b) {
          let newX = b.x + b.dx;
          let newY = b.y + b.dy + Math.sin(Date.now() / 150 + b.id * 2) * 0.8;
          let newDx = b.dx;
          let newDy = b.dy;
          if (newX < 10 || newX > 300) newDx = -newDx;
          if (newY < 40 || newY > 130) newDy = -newDy;
          return { id: b.id, x: newX, y: newY, dx: newDx, dy: newDy };
        });
      });
    }, 30);
    return function() { clearInterval(interval); };
  }, [bloomed]);

  const bloom = function() {
    if (bloomed) return;
    setBloomed(true);
    const allPixels = getAllPixels();
    const sortedPixels = allPixels.slice().sort(function(a, b) { return b.y - a.y; });
    let i = 0;
    const interval = setInterval(function() {
      if (i < sortedPixels.length) {
        const pixel = sortedPixels[i];
        setPixels(function(prev) { return prev.concat([pixel]); });
        i++;
      } else {
        clearInterval(interval);
        setTimeout(function() { setShowMessage(true); }, 500);
      }
    }, 5);
  };

  const reset = function() {
    setBloomed(false);
    setPixels([]);
    setShowMessage(false);
    setButterflies([]);
    setBees([]);
  };

  const getAnim = function(id, part) {
    if (part === 'flower') return 'sway' + ((id % 3) + 1) + ' ' + (2 + (id % 3) * 0.5) + 's ease-in-out infinite';
    if (part === 'leaf') return 'sway' + (((id + 1) % 3) + 1) + ' ' + (2.5 + (id % 2) * 0.3) + 's ease-in-out infinite';
    return 'none';
  };

  if (!mounted) return null;

  const grass = [];
  for (let i = 0; i < 40; i++) {
    grass.push(
      <div key={i} style={{
        position: 'absolute',
        bottom: 56,
        left: i * 8 + 2,
        width: 3,
        height: 6 + (i % 4) * 3,
        backgroundColor: i % 2 === 0 ? '#22c55e' : '#16a34a',
        borderRadius: '2px 2px 0 0',
        animation: 'grassWave ' + (1.5 + (i % 3) * 0.3) + 's ease-in-out infinite',
        animationDelay: (i * 0.05) + 's',
      }} />
    );
  }

  const wildflowers = bloomed ? [30, 70, 140, 190, 260].map(function(l, i) {
    return <div key={i} style={{ position: 'absolute', bottom: 58, left: l, fontSize: 12, animation: 'bobble 2s ease-in-out infinite' }}>{i % 2 === 0 ? '🌸' : '🌼'}</div>;
  }) : null;

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>
      <h1 style={styles.title}>💝 Happy Valentine&apos;s Day! 💝</h1>
      <p style={styles.subtitle}>A living sunflower garden just for you</p>
      <div style={styles.garden} onClick={bloom}>
        <div style={styles.sun} />
        <div style={{ position: 'absolute', background: 'white', borderRadius: 50, opacity: 0.8, top: 24, left: 32, width: 56, height: 20, animation: 'sway1 8s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', background: 'white', borderRadius: 50, opacity: 0.7, top: 32, left: 64, width: 40, height: 16, animation: 'sway2 7s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', background: 'white', borderRadius: 50, opacity: 0.75, top: 20, left: 144, width: 64, height: 20, animation: 'sway3 9s ease-in-out infinite' }} />
        {butterflies.map(function(b) { return <div key={b.id} style={{ position: 'absolute', fontSize: 18, animation: 'flutter 0.3s ease-in-out infinite', left: b.x, top: b.y }}>🦋</div>; })}
        {bees.map(function(b) { return <div key={b.id} style={{ position: 'absolute', fontSize: 14, animation: 'bobble 0.2s ease-in-out infinite', left: b.x, top: b.y }}>🐝</div>; })}
        <div style={styles.ground} />
        <div style={styles.grassBase} />
        {grass}
        {pixels.map(function(p, i) { return <div key={i} style={{ position: 'absolute', borderRadius: 2, transformOrigin: 'bottom center', left: p.x, top: p.y, width: p.size, height: p.size, backgroundColor: p.color, boxShadow: '0 0 2px ' + p.color, animation: getAnim(p.flowerId, p.part) }} />; })}
        {wildflowers}
        {!bloomed && <div style={styles.promptContainer}><div style={styles.prompt}><p style={styles.promptText}>🌱 Click to grow the garden!</p><p style={styles.promptSubtext}>Watch nature come alive</p></div></div>}
      </div>
      {showMessage && <div style={styles.message}><p style={styles.messageTitle}>🌻 You make my heart bloom! 🌻</p><p style={styles.messageText}>Like this garden, my love for you grows every day 💕</p><button style={styles.resetBtn} onClick={reset}>Bloom Again 🌸</button></div>}
      <p style={styles.footer}>Made with 💖 for you</p>
    </div>
  );
}

const keyframes = '@keyframes sway1 { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } } @keyframes sway2 { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(4deg); } } @keyframes sway3 { 0%, 100% { transform: rotate(2deg); } 50% { transform: rotate(-3deg); } } @keyframes flutter { 0%, 100% { transform: scaleX(1); } 50% { transform: scaleX(-1); } } @keyframes bobble { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } } @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } } @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } @keyframes grassWave { 0%, 100% { transform: skewX(-5deg); } 50% { transform: skewX(5deg); } }';

const styles = {
  container: { minHeight: '100vh', background: 'linear-gradient(to bottom, #fbcfe8, #fce7f3, #ffe4e6)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 16, fontFamily: 'system-ui, sans-serif' },
  title: { fontSize: '1.5rem', fontWeight: 'bold', color: '#e11d48', marginBottom: 8, textAlign: 'center' },
  subtitle: { color: '#f43f5e', marginBottom: 16, textAlign: 'center', fontSize: 14 },
  garden: { position: 'relative', background: 'linear-gradient(to bottom, #38bdf8, #7dd3fc, #bae6fd)', borderRadius: 16, boxShadow: '0 10px 25px rgba(0,0,0,0.15)', cursor: 'pointer', overflow: 'hidden', width: 320, height: 260 },
  sun: { position: 'absolute', top: 16, right: 20, width: 48, height: 48, background: '#fde047', borderRadius: '50%', boxShadow: '0 0 30px #fcd34d, 0 0 60px #fde047' },
  ground: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 64, background: 'linear-gradient(to top, #92400e, #b45309, #d97706)', borderRadius: '0 0 16px 16px' },
  grassBase: { position: 'absolute', bottom: 56, left: 0, right: 0, height: 32, background: 'linear-gradient(to top, #15803d, #22c55e)' },
  promptContainer: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  prompt: { background: 'rgba(255,255,255,0.9)', padding: '12px 20px', borderRadius: 12, boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textAlign: 'center', animation: 'pulse 2s ease-in-out infinite' },
  promptText: { color: '#f43f5e', fontWeight: 500, margin: 0 },
  promptSubtext: { color: '#fb7185', fontSize: 12, marginTop: 4 },
  message: { marginTop: 16, textAlign: 'center', animation: 'slideUp 0.5s ease-out forwards' },
  messageTitle: { fontSize: '1.25rem', color: '#e11d48', fontWeight: 'bold', marginBottom: 4 },
  messageText: { color: '#f43f5e', fontSize: 14 },
  resetBtn: { marginTop: 12, padding: '8px 20px', background: '#f43f5e', color: 'white', border: 'none', borderRadius: 50, cursor: 'pointer', fontSize: 14, boxShadow: '0 4px 10px rgba(244,63,94,0.3)' },
  footer: { marginTop: 24, color: '#fb7185', fontSize: 12 },
};
ENDOFFILE