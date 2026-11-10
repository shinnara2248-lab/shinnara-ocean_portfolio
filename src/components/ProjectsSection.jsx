import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';
import { PROJECTS } from '../data/content.js';

// url이 없으면 임의의 주소를 만들지 않고, 클릭해도 이동하지 않는 '확인 필요' 상태로 둡니다.
const linkProps = (url) =>
  url
    ? { href: url, target: '_blank', rel: 'noopener noreferrer' }
    : { href: '#', 'aria-disabled': true, onClick: (e) => e.preventDefault() };

export default function ProjectsSection() {
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const trigger = useRef(null);
  useEffect(() => { if (selected) dialog.current?.showModal(); }, [selected]);
  const open = (project, event) => { trigger.current = event.currentTarget; setSelected(project); };
  const close = () => { dialog.current?.close(); setSelected(null); trigger.current?.focus(); };
  const total = String(PROJECTS.length).padStart(2, '0');
  return (
    <>
      <Reveal className="phead ob">
        <div>
          <div className="eyebrow2">
            01 / SELECTED PROJECTS <i />
          </div>
          <h2>
            작은 발견이 모여
            <br />
            <em>좋은 경험</em>이 됩니다.
          </h2>
        </div>
        <p>
          관찰부터 설계, 구현까지.
          <br />
          고민의 과정이 담긴 프로젝트를 소개합니다.
        </p>
      </Reveal>

      <div id="projects" className="ob">
        {PROJECTS.map((p, i) => {
          const n = String(i + 1).padStart(2, '0');
          const link = linkProps(p.url);
          return (
            <Reveal as="article" key={p.title} className={`pcard ${p.screenshot ? 'has-preview has-screenshot' : ''} project-${i + 1}${i % 2 ? ' rev' : ''}`}>
              <button type="button" className="pv" onClick={e => open(p, e)} style={{ '--g': p.gradient, '--b': p.ball }} aria-label={`${p.title} 프로젝트 보기`}>
                <span className="cnt">
                  {n} / {total}
                </span>
                <span className="project-flow" aria-hidden="true">↗</span>
                {p.screenshot && <img className="project-screen" src={p.screenshot} alt={`${p.title} 프로젝트 대표 이미지`} width="430" height="300" loading="lazy" />}
                {p.screenshot && <span className="project-image-title" aria-hidden="true">{p.title}</span>}
                <span className="ring" />
                <span className="ball" />
                <span className="win">
                  <b>{p.title}</b>
                  <em>{p.tagline}</em>
                </span>
                <span className="lbl">{p.label}</span>
              </button>
              <div className="pt stg">
                <div className="pmeta">
                  <span>{p.category}</span>
                  <span>{n}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="tags">
                  {p.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="project-facts">{p.role && <span>담당 · {p.role}</span>}{p.period && <span>기간 · {p.period}</span>}{p.team && <span>팀 · {p.team}</span>}</div>
                <div className="project-actions"><button className="more" type="button" onClick={e => open(p, e)}>프로젝트 소개 <span>↗</span></button>{p.url ? <a className="more" {...link}>사이트 방문 ↗</a> : <span className="pending-info">사이트 공개 준비 중</span>}</div>
              </div>
            </Reveal>
          );
        })}
      </div>
      {selected && <dialog className="project-dialog" ref={dialog} onCancel={e => { e.preventDefault(); close(); }} onClick={e => { if(e.target === dialog.current) close(); }} aria-labelledby="detail-title" onClose={() => { setSelected(null); trigger.current?.focus(); }}><div className="detail-body"><button className="detail-close" type="button" onClick={close} aria-label="프로젝트 소개 닫기">닫기 ×</button><p className="eyebrow">PROJECT OVERVIEW</p><h2 id="detail-title">{selected.title}</h2><p className="detail-lead">{selected.desc}</p><div className="tags">{selected.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div><dl className="detail-facts">{[['작업 기간',selected.period],['팀 구성',selected.team],['담당 역할',selected.role],['직접 작업한 범위',selected.contribution]].filter(([,v])=>v).map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl><section><h3>프로젝트 방향</h3><p>{selected.focus}</p></section><section><h3>작업 분야</h3><p>{selected.tags.join(' · ')}</p></section>{selected.caseStudy ? <section><h3>문제 해결 과정과 회고</h3><p>{selected.caseStudy}</p></section> : <p className="detail-status">세부 작업 과정과 회고는 정리 후 추가할 예정입니다.</p>}{selected.url ? <a className="detail-visit" {...linkProps(selected.url)}>완성 사이트 방문 ↗</a> : <p className="detail-status">사이트 공개 준비 중</p>}</div></dialog>}
    </>
  );
}
