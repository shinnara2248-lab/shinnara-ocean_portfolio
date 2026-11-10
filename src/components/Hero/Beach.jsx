import { useMemo } from 'react';
import { buildBeach } from '../../utils/buildBeach.js';

// 모래사장 장식 — SVG 문자열 생성기를 한 번만 실행해 렌더링합니다.
export default function Beach() {
  const html = useMemo(() => buildBeach(), []);
  return (
    <svg
      className="beach"
      viewBox="0 0 1600 700"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
