import { useRef, useState } from 'react';
import Reveal from './Reveal.jsx';
import { STEPS, STEP_DESC } from '../data/content.js';

export default function ProcessCard() {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const select = (index, focus = false) => {
    setActive(index);
    if (focus) tabs.current[index]?.focus({ preventScroll: true });
  };
  return (
    <Reveal className="glass process">
      <div className="eyebrow">02 / DESIGN APPROACH</div>
      <h2>문제에서 사용성 개선까지</h2><p className="approach-note">프로젝트의 목적에 따라 필요한 단계를 선택하고, 설계와 구현을 오가며 다듬습니다.</p>
      <div className="steps" role="tablist" aria-label="디자인 프로세스 단계">
        {STEPS.map((label, i) => (
          <button key={label} ref={el => { tabs.current[i] = el; }} id={`process-tab-${i}`}
            type="button" role="tab" aria-selected={i === active} aria-controls="process-panel"
            tabIndex={i === active ? 0 : -1} className={i === active ? 'act' : undefined}
            onClick={() => select(i)} onKeyDown={e => {
              const next = e.key === 'ArrowRight' ? (i + 1) % STEPS.length :
                e.key === 'ArrowLeft' ? (i + STEPS.length - 1) % STEPS.length :
                e.key === 'Home' ? 0 : e.key === 'End' ? STEPS.length - 1 : null;
              if (next !== null) { e.preventDefault(); select(next, true); }
            }}>
            <b>0{i + 1}</b><span>{label}</span>
          </button>
        ))}
      </div>
      <div id="process-panel" role="tabpanel" aria-labelledby={`process-tab-${active}`} aria-live="polite">
        <p id="desc">{STEP_DESC[active]}</p>
      </div>
    </Reveal>
  );
}
