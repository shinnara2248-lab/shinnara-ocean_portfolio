// 물고기 심볼 (심해 배경·바다 바닥·툴박스 막대에서 <use>로 재사용)
export default function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <symbol id="fish" viewBox="0 0 40 20">
          <path d="M2 10C10 0 26 0 32 10 26 20 10 20 2 10zM30 10l9-8v16z" />
          <path d="M12 4l5-4 6 4M13 16l5 4 5-4" opacity=".65" />
          <path d="M8 7Q17 3 25 7" stroke="#e5fff3" strokeOpacity=".35" strokeWidth="1" fill="none" />
          <path d="M21 9l5 2-5 3" stroke="#ebfffa" strokeOpacity=".35" strokeWidth="1" fill="none" />
          <circle cx="8" cy="9" r="1.1" fill="#143e50" />
        </symbol>
        <symbol id="clown" viewBox="0 0 40 22">
          <path d="M3 11C10 0 28 0 33 11 28 22 10 22 3 11zM31 11l8-8v16z" fill="#ff8a2a" />
          <path d="M13 2.5v17M23 3.5v15" stroke="#fff" strokeWidth="3" />
          <path d="M31 11l8-8v16z" fill="none" stroke="#2a1a10" strokeWidth="1" />
        </symbol>
      </defs>
    </svg>
  );
}
