'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useReactToPrint } from 'react-to-print';
import { Button } from '@/components/ui/Button';
import { HandwritingGrid } from '@/components/print/HandwritingGrid';
import { Loader2, Printer, Home, RefreshCw } from 'lucide-react';
import { WRITING_TYPES } from '@/lib/questions';

import { saveToHistory } from '@/lib/storage';
import { WritingType, WritingLevel } from '@/types/writing';

export default function ResultPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const typeId = params.type as WritingType;
  const level = (searchParams.get('level') as WritingLevel) || 'level1';
  const config = WRITING_TYPES[typeId];
  const levelConfig = config?.levels[level];
  
  const [content, setContent] = useState<string>('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [textOpacity, setTextOpacity] = useState(0.2);
  
  const printRef = useRef<HTMLDivElement>(null);

  // 인쇄 기능
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `글쓰기_${config?.title || typeId}_${new Date().toLocaleDateString()}`,
  });

  useEffect(() => {
    const loadData = async () => {
      const saved = localStorage.getItem(`writing-${typeId}`);
      if (!saved) {
        router.replace(`/${typeId}`);
        return;
      }

      const parsed = JSON.parse(saved);
      setAnswers(parsed.answers);

      if (parsed.generatedText) {
        setContent(parsed.generatedText);
        setIsLoading(false);
        // 이미 생성된 글도 히스토리 최신화
        saveToHistory({
          type: typeId,
          title: `${new Date().toLocaleDateString()} ${config?.title || ''}`,
          content: parsed.generatedText,
          answers: parsed.answers,
        });
      } else {
        generateText(parsed.answers);
      }
    };

    if (config) {
      loadData();
    } else {
      router.replace('/');
    }
  }, [typeId, router, config]);

  const generateText = async (currentAnswers: Record<string, string>) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: typeId,
          answers: currentAnswers,
          level: level,
          resultTemplate: levelConfig?.resultTemplate,
        }),
      });

      const data = await response.json();
      
      if (data.error) throw new Error(data.error);
      
      setContent(data.content);
      
      // 결과 저장 (임시 저장소)
      const saved = localStorage.getItem(`writing-${typeId}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        localStorage.setItem(`writing-${typeId}`, JSON.stringify({
          ...parsed,
          generatedText: data.content,
          updatedAt: Date.now()
        }));
      }

      // 히스토리 저장
      saveToHistory({
        type: typeId,
        title: `${new Date().toLocaleDateString()} ${config?.title || ''}`,
        content: data.content,
        answers: currentAnswers,
      });

    } catch (error) {
      console.error('Generation failed:', error);
      alert('글 생성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsGenerating(false);
      setIsLoading(false);
    }
  };

  if (isLoading || isGenerating) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Loader2 className="w-12 h-12 text-primary-500 animate-spin mb-4" />
        <p className="text-xl font-medium text-neutral-900">
          AI 선생님이 글을 다듬고 있어요...
        </p>
        <p className="text-sm text-neutral-500 mt-2">
          잠시만 기다려주세요!
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8 sm:py-12 px-4">
      <div className="main-container">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-6 sm:mb-8 gap-6 lg:gap-4 no-print">
          <div className="flex-1 w-full lg:w-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 break-keep">
              완성된 글 확인하기
            </h1>
            <p className="text-neutral-600 mt-2 text-sm sm:text-base break-keep">
              인쇄 버튼을 눌러 종이에 출력할 수 있어요.
            </p>
            
            {/* 글자 농도 조절 */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full max-w-md bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
              <label className="text-sm font-medium text-neutral-700 whitespace-nowrap flex items-center gap-2">
                <span>🖨️ 글자 진하기</span>
              </label>
              <div className="flex items-center gap-3 flex-1">
                <span className="text-xs text-neutral-400">연하게</span>
                <input
                  type="range"
                  min="10"
                  max="80"
                  step="10"
                  value={textOpacity * 100}
                  onChange={(e) => setTextOpacity(Number(e.target.value) / 100)}
                  className="flex-1 h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
                <span className="text-xs text-neutral-400">진하게</span>
              </div>
              <span className="text-sm font-bold text-primary-600 w-12 text-right">
                {Math.round(textOpacity * 100)}%
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-end">
            <Button variant="outline" onClick={() => router.push('/')} className="flex-1 sm:flex-none justify-center">
              <Home className="w-4 h-4 mr-2" />
              처음으로
            </Button>
            <Button variant="outline" onClick={() => generateText(answers)} className="flex-1 sm:flex-none justify-center">
              <RefreshCw className="w-4 h-4 mr-2" />
              다시 쓰기
            </Button>
            <Button variant="primary" onClick={() => handlePrint && handlePrint()} className="w-full sm:w-auto justify-center">
              <Printer className="w-4 h-4 mr-2" />
              인쇄하기
            </Button>
          </div>
        </div>

        {/* 미리보기 영역 */}
        <div className="flex justify-center overflow-hidden bg-neutral-200/50 p-4 sm:p-8 rounded-2xl shadow-inner border border-neutral-200 min-h-[500px]">
          <div className="scale-[0.45] xs:scale-[0.5] sm:scale-[0.6] md:scale-[0.8] lg:scale-100 origin-top transition-transform duration-300 ease-out will-change-transform">
            <HandwritingGrid
              ref={printRef}
              content={content}
              hasPictureArea={typeId === 'picture-diary'}
              date={answers['date']}
              textOpacity={textOpacity}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
