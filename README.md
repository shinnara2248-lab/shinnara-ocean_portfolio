# SHIN NARA — Ocean Portfolio

CSS(디자인)와 JavaScript(동작)를 분리한 React + Vite 포트폴리오입니다.

## 실행

Node.js 20.19+ 또는 22.12+ 환경에서 실행하세요.

```bash
npm ci
npm run dev
```

배포 파일 생성: `npm run build` → `dist/`.
배포 결과 확인: `npm run preview`.
`dist/index.html`은 파일 더블클릭 대신 HTTP 서버에서 열어주세요.

## 수정할 파일

| 용도 | 경로 |
| --- | --- |
| 현재 연결된 CSS | `src/styles/main.css` |
| 파도 이동·표정 애니메이션 | `src/scripts/otterController.js` |
| 이동 경로·충돌 계산 | `src/utils/otterMotion.js` |
| 모래 로고 애니메이션 | `src/scripts/sandLogo.js` |
| 히어로 스크롤 전환 | `src/scripts/diveTransition.js` |
| 심해 배경 스크롤 효과 | `src/scripts/deepSea.js` |
| 도구 체험 상태·초기화 | `src/hooks/useToolbox.js` |
| 도구 체험 소개 문구 | `src/data/toolDemos.js` |
| 프로젝트·연락처 문구와 링크 | `src/data/content.js` |
| 화면 마크업 | `src/components/` |
| 섹션 배치 | `src/App.jsx` |
| 모래사장·심해 SVG 장식 | `src/utils/buildBeach.js`, `src/utils/buildFloor.js` |

`main.jsx`에서 `styles/main.css`를 불러옵니다. 일반적인 디자인 수정은 이 CSS 파일에서 하세요.
React 컴포넌트는 마크업과 이벤트 연결을 담당하고, 애니메이션 실행과 정리는 `scripts/`에서 처리합니다.
슬라이더 값·좌표처럼 실시간으로 달라지는 값만 CSS 변수나 DOM 속성으로 전달합니다.

## 배포 파일도 CSS / JS 분리

```text
dist/
  index.html
  css/style-[hash].css
  js/main-[hash].js
  assets/
```

파일명의 hash는 새 배포에서 이전 CSS/JS가 캐시에 남지 않도록 합니다.
`dist/` 전체를 같은 폴더 구조로 업로드하세요.

## SCSS 원본 참고

기존 SCSS는 `src/styles/scss/`에 참고용으로 보관했습니다. 현재 앱에서 직접 불러오지는 않습니다.
SCSS 방식을 다시 사용하려면 `src/main.jsx`의 CSS import를 `./styles/scss/main.scss`로 변경하세요.
두 방식을 동시에 수정하지 말고 하나를 선택하세요.

## 현재 상태

- 로고: 진입 후 1초부터 모래가 올라옵니다.
- 파도: 화면 안에서 콘텐츠를 피해 마우스를 추적하며 클릭하면 반응합니다.
- 마지막 섹션: 큰 조개 없이 심해 아틀란티스와 바다 생물을 표시합니다.
- BYHEYDEY / HAEVICHI 기술 태그: JavaScript.
- 연락처·이력서·Apple TV URL은 `content.js`에서 실제 정보를 입력해야 합니다.

외부 프로젝트 미리보기와 외부 폰트는 인터넷 연결이 필요합니다.

## 소개 페이지 / 내 정보 수정

- 히어로 ‘소개와 역량 보기’ 또는 상단 About → `/#/about`.
- 메인 스크롤의 기존 About Me 섹션은 제거했습니다.
- 공개 기본 정보는 `src/data/profile.js`, 편집 동작은 `src/hooks/useProfile.js`, 화면은 `src/components/ProfilePage.jsx`입니다.
- 이름, 사진, 학력, 자격증, 수상, 경력, 연락처, 역량과 사용 도구를 페이지에서 편집할 수 있습니다.
- 브라우저 편집은 해당 브라우저의 localStorage에만 저장됩니다. 다른 방문자에게 반영되지는 않습니다.
- ‘내 정보 파일 받기’로 JSON(사진 포함)을 내보낼 수 있습니다. 공개 반영 시 이 자료를 기준으로 기본 정보를 업데이트하세요.
- 학력 등은 한 줄에 `기간 | 내용`으로 입력합니다. 사진은 JPG / PNG / WebP, 8MB 이하이며 저장 전에 960px 이내로 줄입니다.
"# shinnara-ocean_portfolio" 
