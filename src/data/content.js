import byheydeyImage from '../assets/byheydey-project.png';
import haevichiImage from '../assets/haevichi-project.png';

// 콘텐츠는 여기서만 수정하면 됩니다.

// url이 비어 있으면 링크가 동작하지 않습니다 → 실제 주소를 넣으면 이미지와 '자세히 보기'가 함께 연결됩니다.
export const PROJECTS = [
  {
    title: 'BYHEYDEY',
    period: '', team: '', role: '', contribution: '', screenshot: byheydeyImage,
    focus: '가구 브랜드의 분위기와 제품 탐색 경험을 연결하는 리디자인',
    category: 'FURNITURE · BRAND REDESIGN',
    desc: '브랜드의 분위기와 제품 탐색 경험을 연결한 가구 브랜드 리디자인',
    tags: ['UX/UI', 'Figma', 'JavaScript'],
    tagline: 'A softer everyday.',
    label: 'BRAND EXPERIENCE',
    gradient: 'linear-gradient(135deg,#efd9ae,#f6efd5 52%,#cfe6d6)',
    ball: '#f0d9a8',
    url: 'https://wjdqhal.github.io/byheydey-fin/index.html',
  },
  {
    title: 'HAEVICHI',
    period: '', team: '', role: '', contribution: '', screenshot: haevichiImage,
    focus: '브랜드의 여유로운 감성을 디지털 탐색 흐름으로 연결하는 경험',
    category: 'HOSPITALITY · DIGITAL EXPERIENCE',
    desc: '브랜드가 가진 여유로운 감성을 디지털 화면의 흐름으로 풀어낸 프로젝트',
    tags: ['UX Research', 'UI Design', 'JavaScript'],
    tagline: 'Stay in the moment.',
    label: 'DIGITAL EXPERIENCE',
    gradient: 'linear-gradient(135deg,#b6e2de,#8fd0cf 50%,#d5ebe0)',
    ball: '#e8e0c0',
    url: 'https://hellolucy0901.github.io/team-haevichi/index.html',
  },
  {
    title: 'Apple TV',
    period: '', team: '', role: '', contribution: '', screenshot: '',
    focus: '취향에 맞는 콘텐츠를 탐색하고 발견하는 React 기반 화면',
    category: 'WEB · CONTENT DISCOVERY',
    desc: '취향에 맞는 콘텐츠를 탐색하고 발견하는 흐름을 구현한 React 프로젝트',
    tags: ['React', 'API', 'SCSS'],
    tagline: 'Find your next story.',
    label: '',
    gradient: 'linear-gradient(135deg,#aec9d9,#cfe0e2 55%,#e2edea)',
    ball: '#f6efd5',
    url: '',
  },
];

export const STEPS = ['문제 정의', '사용자 리서치', '정보 구조', '와이어프레임', 'UI 디자인', '프로토타입', '사용성 개선'];
export const STEP_DESC = {
  0: '해결할 문제와 목표를 정리합니다.',
  1: '사용자의 행동과 니즈를 관찰하고, 개선의 단서를 찾습니다.',
  2: '정보의 우선순위와 탐색 경로를 정리해 이해하기 쉬운 구조를 만듭니다.',
  3: '핵심 화면의 구성과 흐름을 설계하며 아이디어를 구체화합니다.',
  4: '색상, 타이포그래피, 컴포넌트로 일관된 화면 경험을 만듭니다.',
  5: '화면을 연결하고 인터랙션을 더해 실제 사용 흐름을 확인합니다.',
  6: '사용 과정의 불편을 살피고 피드백을 반영해 경험을 다듬습니다.',
};

// level: 숙련도 막대(%)
export const TOOLS = [
  { name: 'HTML', desc: '의미 있는 구조 설계', level: 86 },
  { name: 'CSS / SCSS', desc: '반응형 레이아웃과 모션', level: 84 },
  { name: 'JavaScript', desc: '인터랙션과 상태 처리', level: 71 },
  { name: 'React', desc: '컴포넌트 기반 UI 구현', level: 73 },
  { name: 'Figma', desc: '와이어프레임 · 프로토타입', level: 88 },
  { name: 'Photoshop / Illustrator', desc: '이미지 편집과 그래픽 작업', level: 67 },
];

export const OTTER_MESSAGES = ['안녕! 🌊', '같이 헤엄칠래?', '어떤 프로젝트가 궁금해?', '여기까지 왔네!', '반가워요~', '더 내려가 봐요!'];

// 연락처 영역 (이메일은 임시값)
export const CONTACT = {
  title: 'Last Wave',
  text: '가장 깊은 곳까지 와주셔서 고마워요. 함께 만들고 싶은 이야기가 있다면 편하게 연락 주세요.',
  email: '',
  resumeUrl: '',
};
