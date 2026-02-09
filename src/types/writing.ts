export type WritingType = 
  | 'picture-diary' 
  | 'observation' 
  | 'letter' 
  | 'field-trip' 
  | 'self-intro' 
  | 'book-report';

export type QuestionType = 
  | 'text' 
  | 'textarea' 
  | 'date' 
  | 'select' 
  | 'emoji'
  | 'select-with-custom'  // 선택 + 직접입력
  | 'color-select'        // 색상 선택
  | 'size-select'         // 크기 선택 (시각적)
  | 'star-rating'         // 별점 선택
  | 'date-weather'        // 날짜+날씨 병합
  | 'compound';           // 2개 하위 질문 병합 (예: 누구랑+어디서)

export interface Option {
  label: string;
  value: string;
  icon?: string;      // 이모지 또는 아이콘 경로
  color?: string;     // 색상 선택용 (hex 코드)
  isCustom?: boolean; // 직접 입력 옵션 여부
}

// 동적 옵션 생성 함수 타입
export type DynamicOptionsFn = (answers: Record<string, string>) => Option[];

// compound 타입의 하위 질문
export interface SubQuestion {
  id: string;
  label: string;
  type: 'emoji' | 'text' | 'select';
  options?: Option[];
  dynamicOptions?: DynamicOptionsFn;
  placeholder?: string;
}

export interface Question {
  id: string;
  label: string;
  description?: string;
  type: QuestionType;
  placeholder?: string;
  options?: Option[];
  dynamicOptions?: DynamicOptionsFn; // 이전 답변 기반 동적 옵션
  required?: boolean;
  allowCustom?: boolean;  // 직접 입력 허용 여부
  customPlaceholder?: string; // 직접 입력 placeholder
  sentenceTemplate?: string; // Level 1 문장 자동 생성용 템플릿
  feedbackMessage?: string;  // 선택 완료 시 격려 메시지
  subQuestions?: SubQuestion[]; // compound 타입용 하위 질문
}

export interface WritingStep {
  questions: Question[];
}

export type WritingLevel = 'level1' | 'level2';

export interface LevelConfig {
  title: string;
  description: string;
  steps: Question[];
  resultTemplate?: string; // Level 1 결과물 생성용 전체 템플릿
}

export interface WritingConfig {
  id: WritingType;
  title: string;
  description: string;
  icon: string;
  color: string;
  curriculumArea?: string; // 2022 개정 교육과정 연계 영역
  levels: {
    level1: LevelConfig; // 골라서 쓰기
    level2: LevelConfig; // 생각해서 쓰기
  };
}

export interface WritingSession {
  id: string;
  type: WritingType;
  answers: Record<string, string>;
  generatedText?: string;
  createdAt: number;
  updatedAt: number;
}
