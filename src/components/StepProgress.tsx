interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm font-medium text-neutral-500 mb-2">
        <span>진행 상황</span>
        <span>{current} / {total}</span>
      </div>
      <div className="h-3 w-full bg-neutral-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary-500 transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
