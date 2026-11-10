export default function CareerNav({ paused, setPaused }) {
  return <><a className="skip-link" href="#projects">프로젝트로 바로 가기</a><nav className="career-nav" aria-label="주요 메뉴"><a className="nav-brand" href="#page" aria-label="처음으로">SHIN<span>NARA</span></a><div className="nav-links"><a href="#projects">Projects</a><a href="#/about">About</a><a href="#contact">Contact</a></div><div className="nav-controls"><button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? '파도 깨우기' : '파도 쉬기'}</button></div></nav></>;
}
