'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { WRITING_TYPES } from '@/lib/questions';
import { WritingLevel } from '@/types/writing';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/StepProgress';
import QuestionStep from '@/components/QuestionStep';
import { ChevronLeft, ChevronRight, Wand2, MousePointer, PenTool } from 'lucide-react';

export default function WritingPage() {
  const router = useRouter();
  const params = useParams();
  const typeId = params.type as string;
  const config = WRITING_TYPES[typeId];

  const [level, setLevel] = useState<WritingLevel | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // 현재 수준의 질문 세트
  const currentLevelConfig = level ? config?.levels[level] : null;
  const steps = currentLevelConfig?.steps || [];

  // 초기 로딩 및 유효성 검사
  useEffect(() => {
    if (!config) {
      router.replace('/');
      return;
    }
    
    // LocalStorage에서 데이터 복원
    const saved = localStorage.getItem(`writing-${typeId}`);
    if (saved) {
      try {
        const { answers: savedAnswers, step, savedLevel } = JSON.parse(saved);
        if (savedLevel) {
          setLevel(savedLevel);
          setAnswers(savedAnswers);
          setCurrentStep(step);
        }
      } catch (e) {
        console.error('Failed to load saved progress', e);
      }
    }
    setIsLoaded(true);
  }, [config, typeId, router]);

  // 수준 선택
  const handleLevelSelect = (selectedLevel: WritingLevel) => {
    setLevel(selectedLevel);
    setCurrentStep(0);
    setAnswers({});
    localStorage.removeItem(`writing-${typeId}`);
  };

  // 답변 저장
  const handleAnswer = (value: string) => {
    if (!steps[currentStep]) return;
    const question = steps[currentStep];
    let newAnswers = { ...answers };

    // compound 타입의 하위 질문 처리: __sub__아이디__값 형식
    if (value.startsWith('__sub__')) {
      const match = value.match(/^__sub__(.+?)__(.*)$/);
      if (match) {
        const [, subId, subValue] = match;
        newAnswers[subId] = subValue;
        // compound 질문 자체의 value는 하위 답변 존재 여부로 표시
        const allSubsFilled = question.subQuestions?.every(sq => newAnswers[sq.id]);
        newAnswers[question.id] = allSubsFilled ? 'completed' : '';
      }
    }
    // date-weather 타입 처리: 날짜|||날씨 형식
    else if (question.type === 'date-weather' && value.includes('|||')) {
      const [dateVal, weatherVal] = value.split('|||');
      if (dateVal) newAnswers['date'] = dateVal;
      if (weatherVal) newAnswers['weather'] = weatherVal;
      // date-weather 질문 자체의 value는 둘 다 채워졌을 때 completed
      newAnswers[question.id] = (newAnswers['date'] && newAnswers['weather']) ? 'completed' : '';
    }
    else {
      newAnswers[question.id] = value;
    }

    setAnswers(newAnswers);
    
    // 자동 저장
    localStorage.setItem(`writing-${typeId}`, JSON.stringify({
      answers: newAnswers,
      step: currentStep,
      savedLevel: level,
      updatedAt: Date.now()
    }));
  };

  // 다음 단계로
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // 마지막 단계에서 결과 페이지로 이동
      router.push(`/${typeId}/result?level=${level}`);
    }
  };

  // 이전 단계로
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      // 수준 선택 화면으로 돌아가기
      setLevel(null);
    }
  };

  if (!isLoaded || !config) return null;

  // 수준 선택 화면
  if (!level) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center narrow-container py-8">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">{config.icon}</div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">{config.title}</h1>
          <p className="text-neutral-600">{config.description}</p>
        </div>

        <div className="w-full max-w-md space-y-4">
          <h2 className="text-xl font-semibold text-center mb-6">어떻게 글을 써볼까요?</h2>
          
          {/* Level 1: 골라서 쓰기 */}
          <button
            onClick={() => handleLevelSelect('level1')}
            className="w-full p-4 sm:p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl hover:border-green-400 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <MousePointer className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <div className="text-left flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-0.5 sm:mb-1">🟢 골라서 쓰기</h3>
                <p className="text-green-600 text-xs sm:text-sm">{config.levels.level1.description}</p>
              </div>
            </div>
          </button>

          {/* Level 2: 생각해서 쓰기 */}
          <button
            onClick={() => handleLevelSelect('level2')}
            className="w-full p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl hover:border-blue-400 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <PenTool className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <div className="text-left flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-0.5 sm:mb-1">🔵 생각해서 쓰기</h3>
                <p className="text-blue-600 text-xs sm:text-sm">{config.levels.level2.description}</p>
              </div>
            </div>
          </button>

          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="w-full mt-6 text-neutral-500"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            돌아가기
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = steps[currentStep];
  if (!currentQuestion) return null;
  
  const currentValue = answers[currentQuestion.id] || '';
  const isLastStep = currentStep === steps.length - 1;
  // compound/date-weather는 'completed'로 채워짐, 일반 질문은 value 존재 여부
  const canProceed = currentQuestion.required ? !!currentValue : true;

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col narrow-container py-8">
      {/* 상단 수준 표시 + 진행바 */}
      <div className="mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            level === 'level1' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-blue-100 text-blue-700'
          }`}>
            {level === 'level1' ? '🟢 골라서 쓰기' : '🔵 생각해서 쓰기'}
          </span>
        </div>
        <ProgressBar 
          current={currentStep + 1} 
          total={steps.length} 
        />
      </div>

      {/* 질문 영역 (가운데 정렬) */}
      <div className="flex-1 flex items-center mb-12">
        <QuestionStep
          question={currentQuestion}
          value={currentValue}
          onChange={handleAnswer}
          answers={answers}
          level={level}
        />
      </div>

      {/* 하단 네비게이션 */}
      <div className="flex justify-between items-center pt-6 border-t border-neutral-200">
        <Button 
          variant="ghost" 
          onClick={handlePrev}
          className="text-neutral-500 hover:text-neutral-700"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          {currentStep === 0 ? '수준 선택' : '이전'}
        </Button>

        <Button
          variant="primary"
          size="lg"
          onClick={handleNext}
          disabled={!canProceed}
          className="w-32 sm:w-40"
        >
          {isLastStep ? (
            <>
              <Wand2 className="w-5 h-5 mr-2" />
              글 만들기
            </>
          ) : (
            <>
              다음
              <ChevronRight className="w-5 h-5 ml-1" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
