import { startDeepSea } from '../scripts/deepSea.js';
import { useEffect, useMemo, useRef } from 'react';

const rg = (a, b) => a + Math.random() * (b - a);

// 화면에 고정된 심해 배경: 아틀란티스 유적, 물고기 떼, 고래·상어, 기포.
// 아래로 스크롤할수록 서서히 짙어집니다(opacity).
export default function DeepSea() {
  const ref = useRef(null);

  const { fish, bubbles } = useMemo(() => {
    const fish = [];
    for (let g = 0; g < 4; g += 1) {
      const y = rg(15, 70);
      const dl = -rg(0, 40);
      const d = rg(26, 46);
      for (let i = 0; i < 5; i += 1) {
        fish.push({ y: y + rg(-4, 4), s: rg(14, 26), d: d + rg(-2, 2), dl: dl - i * 0.6 });
      }
    }
    const bubbles = Array.from({ length: 14 }, () => ({ left: rg(0, 100), size: rg(4, 12), d: rg(12, 26), dl: -rg(0, 20) }));
    return { fish, bubbles };
  }, []);

  useEffect(() => {
    return startDeepSea(ref.current);
  }, []);

  return (
    <div id="deep" ref={ref} aria-hidden="true">
      <svg className="deep-scene" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="ray" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#9fe3ff" stopOpacity=".22" />
            <stop offset="1" stopColor="#9fe3ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g fill="url(#ray)">
          <path d="M180 0h70l140 600H60zM560 0h80l200 600H520z" />
        </g>
        <g fill="rgba(83,168,175,.08)">
          <rect x="90" y="330" width="26" height="270" />
          <rect x="170" y="350" width="26" height="250" />
          <path d="M90 330a53 60 0 0 1 106 0z" />
          <rect x="480" y="300" width="30" height="300" />
          <rect x="590" y="300" width="30" height="300" />
          <path d="M480 300a70 80 0 0 1 140 0z" />
          <path d="M450 300h200l-100-60z" />
          <rect x="800" y="380" width="22" height="220" />
          <rect x="860" y="400" width="22" height="200" />
          <path d="M800 380h82l-41-40z" />
          <rect x="300" y="450" width="110" height="150" />
          <path d="M300 450h110l-55-40z" />
        </g>
      </svg>

      {fish.map((f, i) => (
        <svg key={i} className="fish" viewBox="0 0 40 20" style={{ '--y': `${f.y}%`, '--s': `${f.s}px`, '--d': `${f.d}s`, '--dl': `${f.dl}s` }}>
          <use href="#fish" />
        </svg>
      ))}

      <svg className="big" viewBox="0 0 300 100" style={{ top: '30%', width: 340, '--d': '90s', '--dl': '-30s', fill: 'rgba(100,174,192,.15)' }}>
        <path d="M10 50C60 10 200 10 260 48l36-26-6 34 10 30-40-14C200 100 60 96 10 50z" />
      </svg>
      <svg className="big" viewBox="0 0 220 70" style={{ top: '62%', width: 210, '--d': '48s', '--dl': '-10s', fill: 'rgba(81,150,177,.18)' }}>
        <path d="M4 40C50 8 130 8 180 34l36-22-8 28 8 26-34-14C130 62 50 66 4 40zM90 14l14-12 6 14z" />
      </svg>

      {bubbles.map((b, i) => (
        <i key={i} className="bub" style={{ left: `${b.left}%`, width: b.size, height: b.size, '--d': `${b.d}s`, '--dl': `${b.dl}s` }} />
      ))}


    </div>
  );
}
