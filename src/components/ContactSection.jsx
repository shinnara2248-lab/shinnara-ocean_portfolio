import Reveal from './Reveal.jsx';
import { CONTACT } from '../data/content.js';

export default function ContactSection() {
  return (
    <section id="contact">
      <div className="inner">
        <Reveal className="glass contact">
          <div className="eyebrow">04 / CONTACT</div>
          <h2>{CONTACT.title}</h2>
          <p>{CONTACT.text}</p>
          <div className="career-actions">{CONTACT.email ? <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> : <span className="pending-info">연락처 업데이트 예정</span>}{CONTACT.resumeUrl ? <a href={CONTACT.resumeUrl} target="_blank" rel="noopener noreferrer">이력서 보기 ↗</a> : <span className="pending-info">이력서 준비 중</span>}</div>
        </Reveal>
        <div className="copy">© 2026 NARA SHIN</div>
      </div>
    </section>
  );
}
