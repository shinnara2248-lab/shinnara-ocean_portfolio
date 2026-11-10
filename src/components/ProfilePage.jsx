import { useEffect } from 'react';
import { useProfile } from '../hooks/useProfile.js';

const SECTIONS = [['experience', 'EXPERIENCE', '경력·활동']];
const toLines = entries => entries.map(item => [item.period, item.description].filter(Boolean).join(' | ')).join('\n');
const fromLines = text => text.split('\n').filter(line => line.trim()).map(line => {
  const [period, ...rest] = line.split('|');
  return rest.length ? { period: period.trim(), description: rest.join('|').trim() } : { period: '', description: period.trim() };
});
function ProfileList({ label, title, items }) {
  return <section className="profile-block"><h2><span>{label}</span><small>{title}</small></h2>{items.length ? <ul className="profile-timeline">{items.map((item, i) => <li key={i}><time>{item.period}</time><p>{item.description}</p></li>)}</ul> : <p className="profile-empty">{title} 정보를 추가해 주세요.</p>}</section>;
}
export default function ProfilePage() {
  const model = useProfile();
  const { profile: p, draft: d, editing } = model;
  useEffect(() => {
    if (editing) {
      document.getElementById('profile-edit-title')?.scrollIntoView({ behavior: 'instant', block: 'start' });
      document.querySelector('.profile-editor input')?.focus({ preventScroll: true });
    } else window.scrollTo({ top: 0, behavior: 'instant' });
  }, [editing]);
  return <main className="profile-page" id="profile-top">
    <header className="profile-toolbar"><a href="#page">← 포트폴리오로 돌아가기</a><a className="profile-wordmark" href="#page">NARA / PROFILE</a><button type="button" onClick={model.open}>내 정보 편집</button></header>
    <article className="profile-sheet" aria-label="신나라 소개와 역량">
      <aside className="profile-identity"><p className="profile-about">ABOUT</p><div className="profile-portrait">{p.photo ? <img src={p.photo} alt={`${p.name} 프로필 사진`} /> : <div className="portrait-placeholder"><svg viewBox="0 0 120 140" aria-hidden="true"><circle cx="60" cy="44" r="24"/><path d="M16 135v-19a44 44 0 0 1 88 0v19"/></svg><span>YOUR PHOTO</span><small>내 사진을 넣어주세요</small></div>}</div><p className="profile-me">ME</p><h1>{p.name || '이름을 입력해 주세요'}</h1><p className="profile-en">{p.englishName}</p><p className="profile-role">{p.role}</p><p className="profile-introduction">{p.introduction}</p><dl className="profile-contact">{[['EMAIL',p.email],['PHONE',p.phone],['LINK',p.website]].map(([key,value]) => <div key={key}><dt>{key}</dt><dd>{value || '정보 추가 예정'}</dd></div>)}</dl></aside>
      <div className="profile-details"><section className="profile-block"><h2><span>KEY COMPETENCIES</span><small>핵심 역량</small></h2><ul className="profile-competencies">{p.competencies.map((item,i)=><li key={i}>{item}</li>)}</ul></section><ProfileList label="EXPERIENCE" title="경력·활동" items={p.experience}/><section className="profile-block profile-skills"><h2><span>SKILLS</span><small>사용 도구</small></h2><div className="profile-skill-groups">{p.skillGroups.map(group=><div className="profile-skill-group" key={group.title}><h3>{group.title}</h3><ul>{group.items.filter(item=>item.trim()).map((item,i)=><li key={i}>{item}</li>)}</ul></div>)}</div></section></div>
    </article>
    <footer className="profile-bottom"><span>DESIGN WITH EMPATHY · BUILD WITH CURIOSITY</span><a href="#projects">프로젝트 보러 가기 ↗</a></footer>
    <div className="profile-edit-note"><p>이름·사진·경력·역량은 ‘내 정보 편집’에서 바꿀 수 있어요. 편집 내용은 이 브라우저에만 저장됩니다.</p><button type="button" onClick={model.exportProfile}>내 정보 파일 받기 ↓</button></div>
    {model.message && <p className="profile-feedback" role="status">{model.message}</p>}
    {editing && <section className="profile-editor" aria-labelledby="profile-edit-title"><div className="profile-editor-heading"><div><span>EDIT YOUR PROFILE</span><h2 id="profile-edit-title">내 정보 편집</h2></div><button type="button" onClick={model.cancel}>편집 닫기 ×</button></div><p>참고 이미지 속 인물의 정보는 사용하지 않았습니다. 내 정보를 입력하고 저장해 보세요.</p><form onSubmit={model.save}><div className="profile-form-grid">{[['name','이름'],['englishName','영문 이름'],['role','직무·분야'],['email','이메일'],['phone','연락처'],['website','웹사이트·SNS']].map(([key,label])=><label key={key}>{label}<input value={d[key]} type={key==='email'?'email':'text'} onChange={e=>model.update(key,e.target.value)} maxLength={180}/></label>)}<label className="profile-form-wide">소개 문구<textarea value={d.introduction} onChange={e=>model.update('introduction',e.target.value)} rows={3}/></label><label className="profile-form-wide">프로필 사진 (JPG·PNG·WebP, 최대 8MB)<input type="file" accept="image/jpeg,image/png,image/webp" onChange={model.uploadPhoto}/></label>{d.photo&&<div className="profile-photo-preview"><img src={d.photo} alt="변경할 프로필 사진"/><button type="button" onClick={()=>model.update('photo','')}>사진 제거</button></div>}{SECTIONS.map(([key,,label])=><label key={key}>{label}<small>한 줄에 ‘기간 | 내용’으로 입력하세요.</small><textarea rows={4} defaultValue={toLines(d[key])} onChange={e=>model.update(key,fromLines(e.target.value))} placeholder="기간 | 내용"/></label>)}<label>핵심 역량<small>한 줄에 한 항목</small><textarea rows={4} value={d.competencies.join('\n')} onChange={e=>model.update('competencies',e.target.value.split('\n'))}/></label>{d.skillGroups.map((group,index)=><label key={group.title}>{group.title}<small>한 줄에 한 스킬</small><textarea rows={4} value={group.items.join('\n')} onChange={e=>{const groups=d.skillGroups.map((g,i)=>i===index?{...g,items:e.target.value.split('\n')}:g);model.update('skillGroups',groups);model.update('skills',groups.flatMap(g=>g.items).filter(item=>item.trim()));}}/></label>)}</div><div className="profile-editor-actions"><button type="submit">내 브라우저에 저장</button><button type="button" onClick={model.exportProfile}>입력한 정보 파일 받기</button><button type="button" onClick={model.cancel}>취소</button><button type="button" onClick={model.reset}>기본 정보로 초기화</button></div></form><p className="profile-editor-help">다른 방문자에게도 보이게 하려면 받은 정보 파일과 사진을 전달해 주세요. 소스에서는 <code>src/data/profile.js</code>를 수정할 수 있습니다.</p></section>}
  </main>;
}
