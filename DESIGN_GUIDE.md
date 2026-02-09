# IEPON 패밀리룩 디자인 가이드

> iepon.site Tool 시리즈를 위한 통합 디자인 시스템 가이드  
> 작성일: 2026-01-25

---

## 1. 브랜드 아이덴티티

### 1.1 브랜드 컬러

#### Primary (주 색상)
| 용도 | 색상 | HSL | HEX | 사용처 |
|------|------|-----|-----|--------|
| **Primary** | Indigo-500 | `239 84% 67%` | `#6366F1` | 주요 버튼, 링크, 강조 |
| **Primary Hover** | Indigo-600 | `239 84% 57%` | `#4F46E5` | 호버 상태 |
| **Primary Light** | Indigo-50 | `239 100% 97%` | `#EEF2FF` | 배경 하이라이트 |

#### Secondary (보조 색상)
| 용도 | 색상 | HEX | 사용처 |
|------|------|-----|--------|
| **Success** | Green-500 | `#22C55E` | 완료, 성공 상태 |
| **Warning** | Amber-500 | `#F59E0B` | 경고, 주의 |
| **Error** | Red-500 | `#EF4444` | 에러, 삭제 |
| **Info** | Blue-500 | `#3B82F6` | 정보, 안내 |

#### Neutral (중립 색상)
| 용도 | 색상 | HEX | 사용처 |
|------|------|-----|--------|
| **Background** | White | `#FFFFFF` | 페이지 배경 |
| **Background Secondary** | Gray-50 | `#F9FAFB` | 섹션 배경 |
| **Border** | Gray-200 | `#E5E7EB` | 테두리 |
| **Text Primary** | Gray-900 | `#111827` | 제목, 본문 |
| **Text Secondary** | Gray-500 | `#6B7280` | 부가 설명 |
| **Text Disabled** | Gray-400 | `#9CA3AF` | 비활성 텍스트 |

#### 과목별 색상 (교육 도구용)
| 과목 | 색상 | HEX | 사용처 |
|------|------|-----|--------|
| **국어** | Blue-600 | `#2563EB` | 국어 영역 구분 |
| **수학** | Emerald-600 | `#059669` | 수학 영역 구분 |

---

## 2. 타이포그래피

### 2.1 폰트 패밀리
```css
/* 필수 import */
@import url('//fonts.googleapis.com/earlyaccess/notosanskr.css');

font-family: 'Noto Sans KR', sans-serif;
```

### 2.2 폰트 크기 체계
| 레벨 | 크기 | Weight | Line Height | Letter Spacing | 용도 |
|------|------|--------|-------------|----------------|------|
| **h1** | 2.25rem (36px) | 700 | 1.2 | -0.02em | 페이지 제목 |
| **h2** | 1.875rem (30px) | 600 | 1.3 | -0.01em | 섹션 제목 |
| **h3** | 1.5rem (24px) | 600 | 1.4 | 0 | 카드 제목 |
| **h4** | 1.25rem (20px) | 500 | 1.4 | 0 | 소제목 |
| **body** | 1rem (16px) | 400 | 1.7 | -0.01em | 본문 |
| **small** | 0.875rem (14px) | 400 | 1.5 | 0 | 부가 설명 |
| **caption** | 0.75rem (12px) | 400 | 1.4 | 0 | 캡션, 라벨 |

### 2.3 가독성 규칙
- **본문 최대 너비**: 65자 (`max-width: 65ch`)
- **줄 간격**: 1.6~1.7
- **문단 간격**: 1rem

---

## 3. 레이아웃 시스템

### 3.1 반응형 브레이크포인트 (PC 중심)
| 이름 | 범위 | 대상 기기 |
|------|------|-----------|
| **xs** | ~1280px | 소형 노트북 (FHD 150% 배율) |
| **sm** | 1280px~1535px | 노트북 (FHD 125% 배율) |
| **md** | 1536px~1919px | 데스크탑 (FHD 100% 배율) |
| **lg** | 1920px~2559px | 대형 모니터 |
| **xl** | 2560px+ | 와이드/4K 모니터 |

### 3.2 컨테이너 클래스
```css
/* 일반 콘텐츠용 (max-width: 1440px) */
.main-container {
  width: 100%;
  max-width: 1440px;
  min-width: 1024px;
  margin: 0 auto;
  padding: 0 24px;
}

/* 대시보드/워크플로우용 (max-width: 1600px) */
.wide-container {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 32px;
}

/* 텍스트/폼 중심용 (max-width: 1200px) */
.narrow-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
```

### 3.3 그리드 시스템
```css
/* 기본 그리드 */
gap: 24px;          /* lg 이상 */
gap: 16px;          /* sm~md */
gap: 12px;          /* xs */

/* 카드 그리드 */
grid-cols-1         /* 모바일 */
md:grid-cols-2      /* 태블릿 */
lg:grid-cols-3      /* 데스크탑 */
xl:grid-cols-4      /* 와이드 */
```

---

## 4. 컴포넌트 스타일

### 4.1 버튼

#### 크기
| 사이즈 | 높이 | 패딩 | 용도 |
|--------|------|------|------|
| **sm** | 32px | px-3 | 인라인, 보조 액션 |
| **default** | 36px | px-4 | 일반 버튼 |
| **lg** | 40px | px-6 | 주요 CTA |

#### 변형
```jsx
// Primary (기본)
<Button>기본 버튼</Button>

// Outline
<Button variant="outline">테두리 버튼</Button>

// Ghost
<Button variant="ghost">투명 버튼</Button>

// Destructive
<Button variant="destructive">삭제</Button>
```

#### 스타일 규칙
- **border-radius**: 6px (`rounded-md`)
- **transition**: 200ms ease-in-out
- **disabled**: opacity 50%
- **focus**: ring-2 with primary color

### 4.2 카드
```jsx
<Card>
  <CardHeader>
    <CardTitle>제목</CardTitle>
    <CardDescription>설명</CardDescription>
  </CardHeader>
  <CardContent>
    {/* 내용 */}
  </CardContent>
  <CardFooter>
    {/* 액션 버튼 */}
  </CardFooter>
</Card>
```

#### 스타일 규칙
- **border-radius**: 12px (`rounded-xl`)
- **border**: 1px solid gray-200
- **shadow**: `shadow-sm` (기본), `shadow-md` (호버)
- **padding**: 24px

### 4.3 입력 필드
```css
/* 기본 스타일 */
height: 36px;
padding: 0 12px;
border: 1px solid gray-200;
border-radius: 6px;

/* 포커스 상태 */
outline: 2px solid indigo-500;
outline-offset: 2px;
box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
```

---

## 5. 아이콘 시스템

### 5.1 아이콘 라이브러리
```bash
# 필수 설치
pnpm add lucide-react
```

### 5.2 아이콘 크기
| 용도 | 크기 | 클래스 |
|------|------|--------|
| **인라인** | 16px | `w-4 h-4` |
| **버튼 내** | 16~20px | `w-4 h-4` ~ `w-5 h-5` |
| **독립 아이콘** | 24px | `w-6 h-6` |
| **대형 아이콘** | 32~48px | `w-8 h-8` ~ `w-12 h-12` |

### 5.3 자주 사용하는 아이콘
```jsx
import {   
  Sparkles,      // AI 기능
  CheckCircle,   // 완료
  AlertCircle,   // 경고
  ArrowRight,    // 진행
  RefreshCw,     // 새로고침
  Download,      // 다운로드
  Upload,        // 업로드
  Settings,      // 설정
  Home,          // 홈
  BookOpen,      // 국어
  Calculator,    // 수학
} from 'lucide-react';
```

---

## 6. 기술 스택

### 6.1 필수 스택
| 분류 | 기술 | 버전 | 용도 |
|------|------|------|------|
| **프레임워크** | Next.js | 16.x | App Router |
| **언어** | TypeScript | 5.x | 타입 안전성 |
| **스타일** | Tailwind CSS | 4.x | 유틸리티 CSS |
| **상태관리** | Zustand | 5.x | 클라이언트 상태 |
| **서버 상태** | TanStack Query | 5.x | API 캐싱 |
| **백엔드** | Supabase | 2.x | DB, Auth |
| **AI** | OpenAI | 5.x | GPT-4o |

### 6.2 UI 컴포넌트
| 라이브러리 | 용도 |
|------------|------|
| **Radix UI** | Headless 컴포넌트 |
| **class-variance-authority** | 컴포넌트 변형 |
| **clsx + tailwind-merge** | 클래스 병합 |
| **Sonner** | 토스트 알림 |
| **Lucide React** | 아이콘 |

### 6.3 패키지 매니저
```bash
# pnpm 사용 필수
pnpm install
pnpm dev
pnpm build
```

---

## 7. 접근성 가이드라인

### 7.1 키보드 네비게이션
```jsx
// 모든 인터랙티브 요소에 focus 스타일 필수
focus:outline-none
focus-visible:ring-2
focus-visible:ring-indigo-500
focus-visible:ring-offset-2
```

### 7.2 ARIA 속성
```jsx
// 버튼
<button aria-label="AI 영역 분배 시작">

// 진행 상태
<div role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}>

// 단계 네비게이션
<nav aria-label="교육계획 진행 단계">
  <button aria-current="step">현재 단계</button>
</nav>
```

### 7.3 색상 대비
- **텍스트**: 최소 4.5:1 대비율
- **대형 텍스트 (18px+)**: 최소 3:1 대비율
- **UI 컴포넌트**: 최소 3:1 대비율

### 7.4 반응형 폰트
```css
/* 1280px 이하에서 폰트 크기 미세 조정 */
@media (max-width: 1280px) {
  .responsive-text {
    font-size: 0.95em;
  }
}
```

---

## 8. 네이밍 컨벤션

### 8.1 파일/폴더
```
src/
├── app/                    # Next.js App Router
│   ├── (routes)/          # 라우트 그룹
│   ├── api/               # API 라우트
│   └── globals.css        # 전역 스타일
├── components/
│   ├── ui/                # 재사용 UI 컴포넌트 (PascalCase)
│   └── {feature}/         # 기능별 컴포넌트
├── lib/                   # 유틸리티
├── stores/                # Zustand 스토어
└── types/                 # TypeScript 타입
```

### 8.2 컴포넌트
```typescript
// 파일명: PascalCase
// 예: EducationPlanWorkflow.tsx

// 컴포넌트명: PascalCase
export function EducationPlanWorkflow() {}

// 훅: camelCase with use prefix
export function useEducationPlan() {}

// 스토어: camelCase with use prefix + Store suffix
export const useEducationPlanStore = create<...>()
```

### 8.3 CSS 클래스
```css
/* 유틸리티: kebab-case */
.main-container {}
.wide-container {}
.card-shadow {}

/* BEM 스타일 (필요시) */
.step-indicator {}
.step-indicator--active {}
.step-indicator__icon {}
```

---

## 9. 새 Tool 프로젝트 시작 체크리스트

### 9.1 초기 설정
```bash
# 1. 프로젝트 생성
pnpm create next-app@latest tool-name --typescript --tailwind --app

# 2. 필수 패키지 설치
pnpm add @radix-ui/react-slot class-variance-authority clsx tailwind-merge
pnpm add lucide-react sonner zustand @tanstack/react-query
pnpm add @supabase/supabase-js openai

# 3. 개발 의존성
pnpm add -D @tailwindcss/postcss tw-animate-css
```

### 9.2 globals.css 복사
iepon.site의 `globals.css`에서 다음 섹션 복사:
- [ ] CSS 변수 (`:root` 블록)
- [ ] 컨테이너 클래스
- [ ] 반응형 미디어 쿼리
- [ ] 타이포그래피 스타일
- [ ] 유틸리티 클래스

### 9.3 UI 컴포넌트 복사
`src/components/ui/`에서 복사:
- [ ] `button.tsx`
- [ ] `card.tsx`
- [ ] `input.tsx`
- [ ] `label.tsx`
- [ ] `badge.tsx`
- [ ] `alert.tsx`

### 9.4 공통 유틸리티
`src/lib/utils.ts`:
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## 10. 버전 관리

| 버전 | 날짜 | 변경사항 |
|------|------|----------|
| 1.0.0 | 2026-01-25 | 초기 가이드 작성 |

---

## 참고 자료

- [iepon.site 소스코드](https://github.com/IEP-ON/plp-creation-tool-clean)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [Radix UI 문서](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)
