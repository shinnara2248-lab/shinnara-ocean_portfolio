import { useCallback, useEffect, useRef, useState } from 'react';
import sprites from '../assets/pado-sprites.webp';
import { startOtter } from '../scripts/otterController.js';

const REACTIONS = [
  {state:'wave',message:'안녕! 나는 파도야. 나라의 포트폴리오를 함께 탐험해 보자!'},
  {state:'jump',message:'좋은 경험을 발견하면 이렇게 신나! 아래에서 프로젝트를 만나 봐.'},
  {state:'think',message:'어떻게 하면 더 편하게 쓸 수 있을까? 나라와 함께 고민 중이야.'},
  {state:'review',message:'작은 디테일까지 꼼꼼하게! 콘텐츠는 가리지 않고 옆에서 살펴볼게.'},
];

export default function Otter() {
  const ref=useRef(null), spriteRef=useRef(null), reactionRef=useRef(null);
  const indexRef=useRef(0), timer=useRef(null), hoverRef=useRef(false);
  const [reaction,setReaction]=useState(null);
  const calm=useCallback(()=>{clearTimeout(timer.current);reactionRef.current=null;setReaction(null);},[]);
  const talk=useCallback(()=>{
    clearTimeout(timer.current);
    const next=REACTIONS[indexRef.current++%REACTIONS.length];
    reactionRef.current=next;setReaction(next);
    timer.current=setTimeout(calm,5200);
  },[calm]);

  useEffect(()=>{
    const outside=e=>{if(!ref.current?.contains(e.target)) calm();};
    const escape=e=>{if(e.key==='Escape')calm();};
    document.addEventListener('pointerdown',outside);document.addEventListener('keydown',escape);
    return()=>{clearTimeout(timer.current);document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape);};
  },[calm]);

  useEffect(() => startOtter({
    ot: ref.current, sprite: spriteRef.current, reactionRef, hoverRef,
  }), []);

  return <div id="otter" ref={ref} data-state="idle" role="button" tabIndex={0}
    aria-label="해달 파도: 클릭하면 동작과 말풍선이 바뀝니다" aria-expanded={!!reaction} aria-controls="say"
    onPointerEnter={()=>{hoverRef.current=true;}} onPointerLeave={()=>{hoverRef.current=false;}}
    onClick={talk} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();talk();}}}>
    <div id="say" className={reaction?'on':''} aria-live="polite">{(reaction?.message||'').replace(/([.!?。！？]+)\s*(?=[^.!?。！？\s])/gu, '$1\n')}</div>
    <span id="oi" ref={spriteRef} role="img" aria-label="조개를 안고 있는 흰색 해달 파도" style={{backgroundImage:`url(${sprites})`}} />
  </div>;
}
