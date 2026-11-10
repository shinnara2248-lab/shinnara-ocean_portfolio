// 길이가 긴 부드러운 파도 3겹. 윗겹은 모래색 위에서 투명하게 시작해 민트색으로 번지고,
// 맨 아랫겹은 바다 영역의 첫 색(#a8ddd0)과 같아서 끊김 없이 이어집니다.
const wave = (b, a, inv) => {
  const u = inv ? b + a : b - a;
  const v = inv ? b - a : b + a;
  return `M0 ${b}C150 ${u} 450 ${v} 600 ${b}C750 ${u} 1050 ${v} 1200 ${b}`;
};

const LAYERS = [
  { b: 56, a: 34, fill: 'url(#wg1)', line: 0.6, style: { '--b': '8s', '--s': '30s' } },
  { b: 88, a: 36, inv: true, fill: 'url(#wg2)', line: 0.55, style: { '--b': '6s', '--s': '22s', '--dir': 'reverse' } },
  { b: 118, a: 26, fill: '#a8ddd0', line: 0.4, style: { animation: 'none', '--s': '36s' } },
];

export default function Waves() {
  return (
    <div className="waves" aria-hidden="true">
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="wg1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#bfe3d6" stopOpacity="0" />
            <stop offset=".3" stopColor="#bfe3d6" stopOpacity=".6" />
            <stop offset="1" stopColor="#a8ddd0" stopOpacity=".9" />
          </linearGradient>
          <linearGradient id="wg2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#b3dfd2" stopOpacity=".55" />
            <stop offset="1" stopColor="#a8ddd0" stopOpacity=".95" />
          </linearGradient>
        </defs>
      </svg>
      {LAYERS.map((L, i) => {
        const d = wave(L.b, L.a, L.inv);
        return (
          <div key={i} className="wl" style={L.style}>
            <svg viewBox="0 0 1200 160" preserveAspectRatio="none">
              <path d={`${d}V160H0Z`} fill={L.fill} />
              <path d={d} fill="none" stroke={`rgba(255,255,255,${L.line})`} strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
