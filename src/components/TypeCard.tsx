import Link from 'next/link';
import { WritingConfig } from '@/types/writing';

interface TypeCardProps {
  config: WritingConfig;
}

// 각 유형별 고유 스타일 정의
const CARD_STYLES: Record<string, { bg: string; iconBg: string; border: string; hover: string }> = {
  'picture-diary': {
    bg: 'bg-gradient-to-br from-amber-50 to-orange-50',
    iconBg: 'bg-amber-100',
    border: 'border-amber-200',
    hover: 'hover:border-amber-400 hover:shadow-amber-100',
  },
  'observation': {
    bg: 'bg-gradient-to-br from-emerald-50 to-green-50',
    iconBg: 'bg-emerald-100',
    border: 'border-emerald-200',
    hover: 'hover:border-emerald-400 hover:shadow-emerald-100',
  },
  'letter': {
    bg: 'bg-gradient-to-br from-pink-50 to-rose-50',
    iconBg: 'bg-pink-100',
    border: 'border-pink-200',
    hover: 'hover:border-pink-400 hover:shadow-pink-100',
  },
  'field-trip': {
    bg: 'bg-gradient-to-br from-sky-50 to-blue-50',
    iconBg: 'bg-sky-100',
    border: 'border-sky-200',
    hover: 'hover:border-sky-400 hover:shadow-sky-100',
  },
  'self-intro': {
    bg: 'bg-gradient-to-br from-violet-50 to-purple-50',
    iconBg: 'bg-violet-100',
    border: 'border-violet-200',
    hover: 'hover:border-violet-400 hover:shadow-violet-100',
  },
  'book-report': {
    bg: 'bg-gradient-to-br from-indigo-50 to-blue-50',
    iconBg: 'bg-indigo-100',
    border: 'border-indigo-200',
    hover: 'hover:border-indigo-400 hover:shadow-indigo-100',
  },
};

export default function TypeCard({ config }: TypeCardProps) {
  const style = CARD_STYLES[config.id] || {
    bg: 'bg-white',
    iconBg: 'bg-neutral-100',
    border: 'border-neutral-200',
    hover: 'hover:border-primary-200',
  };

  return (
    <Link 
      href={`/${config.id}`}
      className={`group relative flex flex-col items-center p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border-2 active:scale-95 ${style.bg} ${style.border} ${style.hover}`}
    >
      {/* 아이콘 영역 - 더 크고 눈에 띄게 */}
      <div className={`w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-5 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl ${style.iconBg} shadow-inner group-hover:scale-110 transition-transform duration-300`}>
        {config.icon}
      </div>
      
      {/* 제목 */}
      <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
        {config.title}
      </h3>
      
      {/* 설명 */}
      <p className="text-xs sm:text-sm text-neutral-600 text-center break-keep leading-relaxed">
        {config.description}
      </p>
      
      {/* 호버 시 나타나는 화살표 */}
      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary-500 font-medium text-xs sm:text-sm flex items-center gap-1">
        시작하기 →
      </div>
    </Link>
  );
}
