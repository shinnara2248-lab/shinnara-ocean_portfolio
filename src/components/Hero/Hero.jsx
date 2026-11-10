import { useEffect, useRef } from 'react';
import { startDiveTransition } from '../../scripts/diveTransition.js';
import Beach from './Beach.jsx';
import SandLogo from './SandLogo.jsx';
import Waves from './Waves.jsx';

export default function Hero({ quiet = false }) {
  const ref = useRef(null);
  useEffect(() => {
    return startDiveTransition(ref.current, quiet);
  }, [quiet]);
  return <div className="dive-stage" ref={ref}>
    <header className="hero">
      <Beach />
      <div className="inner"><SandLogo quiet={quiet} /><div className="hero-intro"><p className="role-label">UI/UX DESIGN · FRONTEND</p><h1>사용자를 생각하고,<br />화면으로 구현하는 신나라입니다.</h1><p>디자인과 개발을 연결하며, 작은 디테일까지 편안한 경험을 만듭니다.</p><div className="career-actions"><a href="#projects">프로젝트 보기 ↓</a><a href="#/about">소개와 역량 보기 ↗</a></div></div></div>
      <Waves />
    </header>
  </div>;
}
