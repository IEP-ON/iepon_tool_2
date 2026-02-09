'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getHistory, HistoryItem, deleteHistoryItem, saveDraft } from '@/lib/storage';
import { Button } from '@/components/ui/Button';
import { Trash2, Edit, ArrowRight } from 'lucide-react';
import { WRITING_TYPES } from '@/lib/questions';

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      deleteHistoryItem(id);
      setHistory(getHistory());
    }
  };

  const handleLoad = (item: HistoryItem) => {
    // 현재 세션으로 데이터 복원
    saveDraft(item.type, {
      answers: item.answers,
      step: 0, // 처음부터 수정하거나
      generatedText: item.content, // 이미 생성된 텍스트 포함
      updatedAt: Date.now()
    });
    
    // 결과 페이지로 바로 이동할지, 첫 단계로 이동할지 선택
    // 여기서는 결과 페이지로 이동하여 '다시 쓰기' 등을 할 수 있게 함
    router.push(`/${item.type}/result`);
  };

  return (
    <div className="narrow-container py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
          내가 쓴 글 목록
        </h1>
        <Button variant="outline" onClick={() => router.push('/')} className="w-full sm:w-auto justify-center">
          <ArrowRight className="w-4 h-4 mr-2" />
          새 글 쓰기
        </Button>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-16 sm:py-20 bg-neutral-50 rounded-xl border border-neutral-200 border-dashed px-4">
          <p className="text-lg sm:text-xl text-neutral-500 mb-4">아직 작성한 글이 없어요.</p>
          <Button variant="primary" onClick={() => router.push('/')}>
            첫 번째 글 써보기
          </Button>
        </div>
      ) : (
        <div className="grid gap-3 sm:gap-4">
          {history.map((item) => {
            const config = WRITING_TYPES[item.type];
            return (
              <div 
                key={item.id}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:shadow-md hover:border-primary-200"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl shrink-0 ${config?.color || 'bg-neutral-100'}`}>
                    {config?.icon || '📝'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-base sm:text-lg text-neutral-900 mb-0.5 sm:mb-1 truncate">
                      {item.title}
                    </h3>
                    <p className="text-neutral-500 text-xs sm:text-sm line-clamp-1 mb-1.5 sm:mb-2">
                      {item.content.substring(0, 50)}...
                    </p>
                    <span className="text-[10px] sm:text-xs text-neutral-400 bg-neutral-100 px-2 py-0.5 sm:py-1 rounded-md inline-block">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto w-full sm:w-auto justify-end border-t sm:border-0 pt-3 sm:pt-0 mt-1 sm:mt-0">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleLoad(item)}
                    className="flex-1 sm:flex-none justify-center"
                  >
                    <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    다시 보기
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    className="text-secondary-error hover:text-red-700 hover:bg-red-50 px-2 sm:px-3"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
