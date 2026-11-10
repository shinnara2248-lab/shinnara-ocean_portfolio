import Reveal from './Reveal.jsx';
export default function AboutSection() {
 return <section id="about" className="about-section"><div className="inner"><Reveal className="about-panel glass"><div><div className="eyebrow">02 / ABOUT ME</div><h2>생각에서 화면까지,<br />경험을 연결합니다.</h2><p>안녕하세요, 신나라입니다. UI/UX 디자인과 프론트엔드 구현을 함께 다루며, 보기 좋은 화면을 넘어 사용하기 편한 흐름을 고민합니다.</p></div><div className="strengths"><article><span>01 / STRUCTURE</span><h3>이해하기 쉬운 흐름</h3><p>정보의 우선순위를 정리하고 탐색하기 쉬운 화면을 설계합니다.</p></article><article><span>02 / SYSTEM</span><h3>일관된 인터페이스</h3><p>컴포넌트와 반응형 레이아웃으로 다양한 화면의 경험을 연결합니다.</p></article><article><span>03 / INTERACTION</span><h3>디테일을 담은 구현</h3><p>상태 변화와 인터랙션까지 직접 구현하며 디자인을 구체화합니다.</p></article></div></Reveal></div></section>;
}
