'use client';

import { Question, Option, WritingLevel, SubQuestion } from '@/types/writing';
import { clsx } from 'clsx';
import { useState, useEffect } from 'react';
import { resolveTemplate } from '@/lib/hangul';

interface QuestionStepProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  answers?: Record<string, string>; // 이전 답변들 (동적 템플릿용)
  level?: WritingLevel; // 현재 글쓰기 수준
}

// 색상 옵션 (관찰일기용)
const COLOR_OPTIONS = [
  { label: '빨강', value: '빨간색', color: '#EF4444', icon: '🔴' },
  { label: '주황', value: '주황색', color: '#F97316', icon: '🟠' },
  { label: '노랑', value: '노란색', color: '#EAB308', icon: '🟡' },
  { label: '초록', value: '초록색', color: '#22C55E', icon: '🟢' },
  { label: '파랑', value: '파란색', color: '#3B82F6', icon: '🔵' },
  { label: '보라', value: '보라색', color: '#A855F7', icon: '🟣' },
  { label: '분홍', value: '분홍색', color: '#EC4899', icon: '🩷' },
  { label: '갈색', value: '갈색', color: '#92400E', icon: '🟤' },
  { label: '검정', value: '검은색', color: '#1F2937', icon: '⚫' },
  { label: '하양', value: '흰색', color: '#F9FAFB', icon: '⚪' },
];

// 크기 옵션 (관찰일기용)
const SIZE_OPTIONS = [
  { label: '아주 작아요', value: '아주 작음', icon: '🐜', size: 'text-xl' },
  { label: '작아요', value: '작음', icon: '🐁', size: 'text-2xl' },
  { label: '보통이에요', value: '보통', icon: '🐈', size: 'text-3xl' },
  { label: '커요', value: '큼', icon: '🐕', size: 'text-4xl' },
  { label: '아주 커요', value: '아주 큼', icon: '🐘', size: 'text-5xl' },
];

export default function QuestionStep({ question, value, onChange, answers = {}, level }: QuestionStepProps) {
  // 동적 템플릿 처리된 질문 정보
  const resolvedLabel = resolveTemplate(question.label, answers);
  const resolvedDescription = question.description ? resolveTemplate(question.description, answers) : undefined;
  const resolvedPlaceholder = question.placeholder ? resolveTemplate(question.placeholder, answers) : undefined;
  // 직접 입력 모드 상태
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customValue, setCustomValue] = useState('');
  // 격려 메시지 표시 상태
  const [showFeedback, setShowFeedback] = useState(false);
  // 달력 표시 월 상태 (date 타입용)
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  
  // value가 옵션에 없으면 직접 입력된 값으로 간주
  useEffect(() => {
    const allOptions = question.dynamicOptions ? question.dynamicOptions(answers) : question.options;
    if (value && allOptions) {
      const isOptionValue = allOptions.some(opt => opt.value === value);
      if (!isOptionValue && value !== '') {
        setIsCustomMode(true);
        setCustomValue(value);
      }
    }
  }, []);

  // 격려 메시지 표시 핸들러
  const handleSelectWithFeedback = (val: string) => {
    onChange(val);
    if (question.feedbackMessage) {
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 1500);
    }
  };

  // 동적 옵션 해석: dynamicOptions가 있으면 함수 호출, 없으면 정적 options
  const resolvedOptions = question.dynamicOptions ? question.dynamicOptions(answers) : question.options;

  // compound 하위 질문의 emoji 그리드 렌더
  const renderSubEmojiGrid = (sub: SubQuestion, subValue: string, onSubChange: (v: string) => void) => {
    const subOptions = sub.dynamicOptions ? sub.dynamicOptions(answers) : sub.options;
    return (
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-neutral-700 mb-2 sm:mb-3">{sub.label}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          {subOptions?.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onSubChange(opt.value)}
              className={clsx(
                "flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border-2 transition-all hover:scale-105 active:scale-95 bg-white",
                subValue === opt.value
                  ? "border-primary-500 bg-primary-50 ring-2 ring-primary-200"
                  : "border-neutral-200 hover:border-primary-300"
              )}
            >
              <span className="text-2xl sm:text-3xl mb-1">{opt.icon}</span>
              <span className={clsx(
                "text-xs sm:text-sm font-medium text-center break-keep",
                subValue === opt.value ? "text-primary-700" : "text-neutral-600"
              )}>
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderInput = () => {
    switch (question.type) {
      // 날짜+날씨 병합 타입
      case 'date-weather': {
        const today = new Date();
        const formatDate = (date: Date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1);
          const day = String(date.getDate());
          return `${year}년 ${month}월 ${day}일`;
        };
        const dateOptions = [
          { label: '오늘', icon: '📅', date: new Date(today) },
          { label: '어제', icon: '⬅️', date: new Date(today.getTime() - 86400000) },
          { label: '그제', icon: '⏪', date: new Date(today.getTime() - 86400000 * 2) },
        ];
        const weatherOptions = [
          { label: '맑아요', value: '맑은 날이에요', icon: '☀️' },
          { label: '흐려요', value: '흐린 날이에요', icon: '☁️' },
          { label: '비와요', value: '비가 왔어요', icon: '🌧️' },
          { label: '눈와요', value: '눈이 왔어요', icon: '❄️' },
        ];
        const currentDate = answers['date'] || '';
        const currentWeather = answers['weather'] || '';

        return (
          <div className="space-y-6">
            {/* 날짜 선택 */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-neutral-700 mb-2 sm:mb-3">📅 날짜</h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {dateOptions.map((opt) => {
                  const dateStr = formatDate(opt.date);
                  return (
                    <button
                      key={opt.label}
                      onClick={() => {
                        onChange(`${dateStr}|||${currentWeather}`);
                      }}
                      className={clsx(
                        "flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border-2 transition-all hover:scale-105 active:scale-95",
                        currentDate === dateStr
                          ? "border-primary-500 bg-primary-50 ring-2 ring-primary-200"
                          : "border-neutral-200 bg-white hover:border-primary-300"
                      )}
                    >
                      <span className="text-2xl sm:text-3xl mb-1">{opt.icon}</span>
                      <span className={clsx(
                        "text-sm sm:text-base font-bold",
                        currentDate === dateStr ? "text-primary-700" : "text-neutral-800"
                      )}>
                        {opt.label}
                      </span>
                      <span className="text-[10px] sm:text-xs text-neutral-500">{dateStr}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            {/* 날씨 선택 */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-neutral-700 mb-2 sm:mb-3">🌤️ 날씨</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {weatherOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      onChange(`${currentDate}|||${opt.value}`);
                    }}
                    className={clsx(
                      "flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border-2 transition-all hover:scale-105 active:scale-95",
                      currentWeather === opt.value
                        ? "border-primary-500 bg-primary-50 ring-2 ring-primary-200"
                        : "border-neutral-200 bg-white hover:border-primary-300"
                    )}
                  >
                    <span className="text-2xl sm:text-3xl mb-1">{opt.icon}</span>
                    <span className={clsx(
                      "text-xs sm:text-sm font-medium",
                      currentWeather === opt.value ? "text-primary-700" : "text-neutral-600"
                    )}>
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      }

      // compound 타입: 2개 하위 질문을 한 화면에
      case 'compound': {
        if (!question.subQuestions || question.subQuestions.length === 0) return null;
        return (
          <div className="space-y-6">
            {question.subQuestions.map((sub) => {
              const subValue = answers[sub.id] || '';
              if (sub.type === 'text') {
                return (
                  <div key={sub.id}>
                    <h3 className="text-base sm:text-lg font-semibold text-neutral-700 mb-2 sm:mb-3">{sub.label}</h3>
                    <input
                      type="text"
                      value={subValue}
                      onChange={(e) => onChange(`__sub__${sub.id}__${e.target.value}`)}
                      placeholder={sub.placeholder}
                      className="w-full p-3 sm:p-4 text-base sm:text-lg border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-colors placeholder:text-neutral-400"
                    />
                  </div>
                );
              }
              return (
                <div key={sub.id}>
                  {renderSubEmojiGrid(sub, subValue, (v) => onChange(`__sub__${sub.id}__${v}`))}
                </div>
              );
            })}
          </div>
        );
      }
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={resolvedPlaceholder}
            className="w-full p-3 sm:p-4 text-base sm:text-lg border border-neutral-200 rounded-md focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none transition-colors placeholder:text-neutral-400"
          />
        );
      
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={resolvedPlaceholder}
            rows={5}
            className="w-full p-3 sm:p-4 text-base sm:text-lg border border-neutral-200 rounded-md focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none transition-colors resize-none placeholder:text-neutral-400"
          />
        );

      case 'date': {
        const today = new Date();
        const calYear = calendarMonth.getFullYear();
        const calMonthIdx = calendarMonth.getMonth();
        const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

        const formatDate = (d: Date) =>
          `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;

        const daysInMonth = new Date(calYear, calMonthIdx + 1, 0).getDate();
        const firstDayOfWeek = new Date(calYear, calMonthIdx, 1).getDay();

        const isToday = (day: number) => {
          const d = new Date(calYear, calMonthIdx, day);
          return d.toDateString() === today.toDateString();
        };
        const isFuture = (day: number) => {
          const d = new Date(calYear, calMonthIdx, day);
          d.setHours(0, 0, 0, 0);
          const t = new Date(today);
          t.setHours(0, 0, 0, 0);
          return d > t;
        };
        const isSelected = (day: number) =>
          value === formatDate(new Date(calYear, calMonthIdx, day));

        const canGoNext =
          new Date(calYear, calMonthIdx + 1, 1) <=
          new Date(today.getFullYear(), today.getMonth(), 1);

        const cells: (number | null)[] = [];
        for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
        for (let i = 1; i <= daysInMonth; i++) cells.push(i);

        return (
          <div className="select-none">
            {/* 월 이동 헤더 */}
            <div className="flex items-center justify-between mb-3 px-1">
              <button
                onClick={() => setCalendarMonth(new Date(calYear, calMonthIdx - 1, 1))}
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-neutral-100 text-neutral-600 text-xl font-bold"
              >
                ‹
              </button>
              <span className="text-base sm:text-lg font-bold text-neutral-800">
                {calYear}년 {calMonthIdx + 1}월
              </span>
              <button
                onClick={() => canGoNext && setCalendarMonth(new Date(calYear, calMonthIdx + 1, 1))}
                disabled={!canGoNext}
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-neutral-100 text-neutral-600 text-xl font-bold disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ›
              </button>
            </div>

            {/* 요일 헤더 */}
            <div className="grid grid-cols-7 mb-1">
              {DAY_LABELS.map((d, i) => (
                <div
                  key={d}
                  className={clsx(
                    'text-center text-xs font-semibold py-1',
                    i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-neutral-500'
                  )}
                >
                  {d}
                </div>
              ))}
            </div>

            {/* 날짜 셀 */}
            <div className="grid grid-cols-7 gap-0.5">
              {cells.map((day, i) => (
                <button
                  key={i}
                  onClick={() => day && !isFuture(day) && onChange(formatDate(new Date(calYear, calMonthIdx, day)))}
                  disabled={!day || isFuture(day)}
                  className={clsx(
                    'h-9 sm:h-10 flex items-center justify-center rounded-lg text-sm sm:text-base font-medium transition-all',
                    !day && 'invisible pointer-events-none',
                    day && isFuture(day) && 'text-neutral-300 cursor-not-allowed',
                    day && !isFuture(day) && isSelected(day) &&
                      'bg-primary-500 text-white font-bold ring-2 ring-primary-300 scale-105',
                    day && !isFuture(day) && isToday(day) && !isSelected(day) &&
                      'text-primary-600 font-bold bg-primary-50 border border-primary-200',
                    day && !isFuture(day) && !isToday(day) && !isSelected(day) &&
                      'hover:bg-neutral-100',
                    day && !isFuture(day) && !isSelected(day) && i % 7 === 0 && 'text-red-500',
                    day && !isFuture(day) && !isSelected(day) && i % 7 === 6 && 'text-blue-500',
                    day && !isFuture(day) && !isSelected(day) && i % 7 > 0 && i % 7 < 6 &&
                      !isToday(day) && 'text-neutral-700'
                  )}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* 선택된 날짜 표시 */}
            {value && (
              <div className="mt-4 p-3 bg-primary-50 rounded-xl border border-primary-200 text-center">
                <span className="text-primary-700 font-semibold text-sm sm:text-base">
                  📅 {value} 선택됨
                </span>
              </div>
            )}
          </div>
        );
      }

      case 'select':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {question.options?.map((option) => (
              <button
                key={option.value}
                onClick={() => onChange(option.value)}
                className={clsx(
                  "p-3 sm:p-4 text-left rounded-lg border transition-all hover:bg-neutral-50 text-base sm:text-lg",
                  value === option.value
                    ? "border-primary-500 bg-primary-50 text-primary-700 font-medium ring-1 ring-primary-500"
                    : "border-neutral-200 text-neutral-700 hover:border-primary-200"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        );

      case 'emoji':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {resolvedOptions?.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelectWithFeedback(option.value)}
                className={clsx(
                  "flex flex-col items-center justify-center p-4 sm:p-6 rounded-xl border-2 transition-all hover:scale-105 active:scale-95 bg-white",
                  value === option.value
                    ? "border-primary-500 bg-primary-50 ring-2 ring-primary-200"
                    : "border-neutral-200 hover:border-primary-300"
                )}
              >
                <span className="text-3xl sm:text-4xl mb-1 sm:mb-2">{option.icon}</span>
                <span className={clsx(
                  "text-sm sm:text-base font-medium text-center break-keep",
                  value === option.value ? "text-primary-700" : "text-neutral-600"
                )}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        );

      // 🆕 선택 + 직접입력 하이브리드
      case 'select-with-custom':
        // 생각해서 쓰기(level2)에서는 텍스트 입력만 제공
        if (level === 'level2') {
          return (
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={question.customPlaceholder || question.placeholder || '직접 써 주세요'}
              rows={3}
              className="w-full p-3 sm:p-4 text-base sm:text-lg border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-colors resize-none placeholder:text-neutral-400"
              autoFocus
            />
          );
        }
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {question.options?.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setIsCustomMode(false);
                    setCustomValue('');
                    onChange(option.value);
                  }}
                  className={clsx(
                    "flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border-2 transition-all hover:scale-105 active:scale-95",
                    value === option.value && !isCustomMode
                      ? "border-primary-500 bg-primary-50 ring-2 ring-primary-200"
                      : "border-neutral-200 bg-white hover:border-primary-300"
                  )}
                >
                  {option.icon && <span className="text-2xl sm:text-3xl mb-1 sm:mb-2">{option.icon}</span>}
                  <span className={clsx(
                    "text-xs sm:text-sm font-medium text-center break-keep",
                    value === option.value && !isCustomMode ? "text-primary-700" : "text-neutral-700"
                  )}>
                    {option.label}
                  </span>
                </button>
              ))}
              
              {/* 직접 입력 버튼 */}
              <button
                onClick={() => {
                  setIsCustomMode(true);
                  onChange(customValue);
                }}
                className={clsx(
                  "flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border-2 border-dashed transition-all hover:scale-105 active:scale-95",
                  isCustomMode
                    ? "border-primary-500 bg-primary-50 ring-2 ring-primary-200"
                    : "border-neutral-300 bg-neutral-50 hover:border-primary-300"
                )}
              >
                <span className="text-2xl sm:text-3xl mb-1 sm:mb-2">✏️</span>
                <span className={clsx(
                  "text-xs sm:text-sm font-medium",
                  isCustomMode ? "text-primary-700" : "text-neutral-600"
                )}>
                  직접 입력
                </span>
              </button>
            </div>
            
            {/* 직접 입력 필드 */}
            {isCustomMode && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <input
                  type="text"
                  value={customValue}
                  onChange={(e) => {
                    setCustomValue(e.target.value);
                    onChange(e.target.value);
                  }}
                  placeholder={question.customPlaceholder || "직접 입력해 주세요"}
                  className="w-full p-3 sm:p-4 text-base sm:text-lg border-2 border-primary-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-colors placeholder:text-neutral-400"
                  autoFocus
                />
              </div>
            )}
          </div>
        );

      // 🆕 색상 선택
      case 'color-select':
        const colorOpts = question.options?.length ? question.options : COLOR_OPTIONS;
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-4 xs:grid-cols-5 gap-2 sm:gap-3">
              {colorOpts.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setIsCustomMode(false);
                    onChange(opt.value);
                  }}
                  className={clsx(
                    "flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl border-2 transition-all hover:scale-110 active:scale-95",
                    value === opt.value && !isCustomMode
                      ? "border-primary-500 ring-2 ring-primary-200 scale-110"
                      : "border-neutral-200 hover:border-primary-300"
                  )}
                >
                  <span className="text-2xl sm:text-3xl mb-0.5 sm:mb-1">{opt.icon}</span>
                  <span className="text-[10px] sm:text-xs font-medium text-neutral-600 break-keep text-center">{opt.label}</span>
                </button>
              ))}
            </div>
            
            {/* 직접 입력 옵션 */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCustomMode(!isCustomMode)}
                className={clsx(
                  "px-3 py-2 sm:px-4 sm:py-2 rounded-lg border-2 border-dashed text-xs sm:text-sm font-medium transition-all whitespace-nowrap",
                  isCustomMode
                    ? "border-primary-500 bg-primary-50 text-primary-700"
                    : "border-neutral-300 text-neutral-600 hover:border-primary-300"
                )}
              >
                ✏️ 다른 색
              </button>
              {isCustomMode && (
                <input
                  type="text"
                  value={customValue}
                  onChange={(e) => {
                    setCustomValue(e.target.value);
                    onChange(e.target.value);
                  }}
                  placeholder="예: 연두색"
                  className="flex-1 p-2 text-sm sm:text-base border-2 border-primary-300 rounded-lg focus:border-primary-500 focus:outline-none"
                  autoFocus
                />
              )}
            </div>
          </div>
        );

      // 🆕 크기 선택 (시각적)
      case 'size-select':
        const sizeOpts = question.options?.length ? question.options : SIZE_OPTIONS;
        return (
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-end justify-center gap-1.5 sm:gap-4 w-full">
              {sizeOpts.map((opt, idx) => (
                <button
                  key={opt.value}
                  onClick={() => onChange(opt.value)}
                  className={clsx(
                    "flex flex-col items-center justify-end p-1.5 sm:p-3 rounded-xl border-2 transition-all hover:scale-105 active:scale-95",
                    value === opt.value
                      ? "border-primary-500 bg-primary-50 ring-2 ring-primary-200"
                      : "border-neutral-200 bg-white hover:border-primary-300"
                  )}
                  style={{ minHeight: `${50 + idx * 15}px`, height: 'auto' }}
                >
                  <span className={clsx(
                    (opt as any).size || `text-${idx + 1}xl sm:text-${idx + 2}xl`
                  )}>{opt.icon}</span>
                  <span className="text-[10px] sm:text-xs font-medium text-neutral-600 mt-0.5 sm:mt-1 text-center break-keep">
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );

      // 🆕 별점 선택
      case 'star-rating':
        const maxStars = 5;
        const currentRating = parseInt(value) || 0;
        return (
          <div className="flex flex-col items-center gap-4 sm:gap-6">
            <div className="flex gap-1 sm:gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => onChange(String(star))}
                  className={clsx(
                    "text-4xl xs:text-5xl sm:text-6xl transition-all hover:scale-125 active:scale-95 p-1",
                    star <= currentRating ? "drop-shadow-lg" : "opacity-30 hover:opacity-60"
                  )}
                >
                  {star <= currentRating ? '⭐' : '☆'}
                </button>
              ))}
            </div>
            <div className="text-center">
              <span className={clsx(
                "text-lg sm:text-xl font-bold",
                currentRating >= 4 ? "text-amber-500" : currentRating >= 2 ? "text-neutral-600" : "text-neutral-400"
              )}>
                {currentRating === 5 && "최고예요! 👍"}
                {currentRating === 4 && "좋아요! 😊"}
                {currentRating === 3 && "보통이에요 🙂"}
                {currentRating === 2 && "조금 아쉬워요 😐"}
                {currentRating === 1 && "별로예요 😕"}
                {currentRating === 0 && "별을 눌러주세요"}
              </span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 sm:mb-8 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 mb-2 sm:mb-3 break-keep">
          {resolvedLabel}
        </h2>
        {resolvedDescription && (
          <p className="text-base sm:text-lg text-neutral-600 break-keep">
            {resolvedDescription}
          </p>
        )}
      </div>

      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-sm border border-neutral-200">
        {renderInput()}
      </div>

      {/* 격려 메시지 */}
      {showFeedback && question.feedbackMessage && (
        <div className="mt-4 text-center animate-in fade-in zoom-in duration-300">
          <span className="inline-block px-4 py-2 bg-green-50 text-green-700 rounded-full text-base sm:text-lg font-semibold border border-green-200">
            {question.feedbackMessage}
          </span>
        </div>
      )}
    </div>
  );
}
