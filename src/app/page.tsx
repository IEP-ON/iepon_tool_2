import Link from 'next/link';
import { WRITING_TYPES } from '@/lib/questions';
import TypeCard from '@/components/TypeCard';
import { Button } from '@/components/ui/Button';
import { History } from 'lucide-react';

export default function Home() {
  const writingTypes = Object.values(WRITING_TYPES);

  return (
    <div className="main-container py-8 sm:py-12">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2 sm:mb-3 break-keep">
          어떤 글을 써볼까요?
        </h2>
        <p className="text-neutral-600 mb-6 sm:mb-8 text-base sm:text-lg break-keep">
          쓰고 싶은 글 종류를 선택해주세요.
        </p>
        
        <Link href="/history">
          <Button variant="outline" size="sm" className="rounded-full px-5 sm:px-6 h-8 sm:h-9 text-xs sm:text-sm">
            <History className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            작성 목록 보기
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {writingTypes.map((type) => (
          <TypeCard key={type.id} config={type} />
        ))}
      </div>
    </div>
  );
}
