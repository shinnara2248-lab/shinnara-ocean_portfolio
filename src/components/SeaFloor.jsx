import { useMemo } from 'react';
import { buildFloor } from '../utils/buildFloor.js';

// 바다 바닥: 아틀란티스 유적·바위 절벽·모래길·산호·해초·물고기·기포 (코드로 그린 SVG)
export default function SeaFloor() {
  const html = useMemo(() => buildFloor(), []);
  return <div className="floorbg" aria-hidden="true" dangerouslySetInnerHTML={{ __html: html }} />;
}
