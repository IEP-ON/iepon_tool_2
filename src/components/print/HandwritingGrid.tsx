import { forwardRef } from 'react';
import { clsx } from 'clsx';

interface HandwritingGridProps {
  content: string;
  hasPictureArea?: boolean; // 그림일기용 그림 영역 여부
  date?: string;
  weather?: string;
  textOpacity?: number; // 글자 투명도 (0.0 ~ 1.0)
}

interface GridCell {
  char: string;
  className: string;
}

interface PageData {
  cells: GridCell[];
  rows: number;
  hasPicture: boolean;
  pageNumber: number;
}

export const HandwritingGrid = forwardRef<HTMLDivElement, HandwritingGridProps>(
  ({ content, hasPictureArea = false, date, weather, textOpacity = 0.2 }, ref) => {
    // A4 기준 (210mm x 297mm) - padding 제외한 실제 사용 영역
    // 칸 크기: 약 15mm ~ 18mm
    const COLS_PER_ROW = 10;
    
    // 텍스트를 원고지 규칙에 맞게 셀 배열로 변환
    const processTextToCells = (text: string): GridCell[] => {
      const cells: GridCell[] = [];
      const paragraphs = text.split('\n');
      
      // 따옴표 상태 추적
      let isDoubleQuoteOpen = false;
      let isSingleQuoteOpen = false;

      // 위치 클래스 결정 함수
      const getPositionClass = (char: string): string => {
        switch (char) {
          case '.':
          case ',':
            return 'items-end justify-start pl-1 pb-1'; // 왼쪽 아래
            
          case '?':
          case '!':
            return 'items-center justify-center'; // 가운데
            
          case '"':
          case '“':
          case '”':
            if (char === '“') return 'items-start justify-end pr-1 pt-1'; // 명시적 여는 따옴표
            if (char === '”') return 'items-start justify-start pl-1 pt-1'; // 명시적 닫는 따옴표
            
            // 직선 따옴표인 경우 상태에 따라 결정
            if (isDoubleQuoteOpen) {
              isDoubleQuoteOpen = false;
              return 'items-start justify-start pl-1 pt-1'; // 닫는 따옴표 (왼쪽 위)
            } else {
              isDoubleQuoteOpen = true;
              return 'items-start justify-end pr-1 pt-1'; // 여는 따옴표 (오른쪽 위)
            }
            
          case '\'':
          case '‘':
          case '’':
            if (char === '‘') return 'items-start justify-end pr-1 pt-1';
            if (char === '’') return 'items-start justify-start pl-1 pt-1';
            
            if (isSingleQuoteOpen) {
              isSingleQuoteOpen = false;
              return 'items-start justify-start pl-1 pt-1'; // 닫는 따옴표 (왼쪽 위)
            } else {
              isSingleQuoteOpen = true;
              return 'items-start justify-end pr-1 pt-1'; // 여는 따옴표 (오른쪽 위)
            }
            
          default:
            return 'items-center justify-center'; // 기본: 가운데 정렬
        }
      };
      
      paragraphs.forEach((paragraph, pIndex) => {
        // 문단을 문자 단위로 분리 (이모지 등 특수문자 처리를 위해 Array.from 사용)
        const chars = Array.from(paragraph);
        
        for (let i = 0; i < chars.length; i++) {
          const char = chars[i];

          // 숫자 2개 묶음 처리 (원고지 규칙: 숫자는 한 칸에 두 자씩)
          if (/[0-9]/.test(char) && i + 1 < chars.length && /[0-9]/.test(chars[i + 1])) {
            cells.push({
              char: char + chars[i + 1],
              className: 'items-center justify-center tracking-tighter'
            });
            i++; // 다음 숫자 건너뜀
            continue;
          }

          cells.push({
            char,
            className: getPositionClass(char)
          });
        }
        
        // 문단이 끝나면 줄바꿈 처리 (다음 줄의 시작으로 이동)
        // 마지막 문단이 아니면 줄바꿈 처리
        if (pIndex < paragraphs.length - 1) {
          const remainder = cells.length % COLS_PER_ROW;
          if (remainder !== 0) {
            const padding = COLS_PER_ROW - remainder;
            for (let i = 0; i < padding; i++) {
              cells.push({ char: '', className: 'items-center justify-center' });
            }
          }
        }
      });
      
      return cells;
    };

    const allCells = processTextToCells(content);
    
    // 페이지네이션 로직
    const pages: PageData[] = [];
    let currentCellIndex = 0;
    
    // 첫 번째 페이지 처리
    const ROWS_PAGE_1 = hasPictureArea ? 8 : 14;
    
    // 최소 1페이지는 생성하도록 do-while 사용
    do {
      const isFirstPage = pages.length === 0;
      const rowsPerPage = isFirstPage ? ROWS_PAGE_1 : 14; // 첫 페이지 이후는 14줄 (그림 영역 없음)
      const cellsPerPage = rowsPerPage * COLS_PER_ROW;
      
      const pageCells = allCells.slice(currentCellIndex, currentCellIndex + cellsPerPage);
      
      // 빈 칸 채우기
      const paddedCells = [
        ...pageCells, 
        ...Array(Math.max(0, cellsPerPage - pageCells.length)).fill({ char: '', className: 'items-center justify-center' })
      ];
      
      pages.push({
        cells: paddedCells,
        rows: rowsPerPage,
        hasPicture: isFirstPage && hasPictureArea,
        pageNumber: pages.length + 1
      });
      
      currentCellIndex += cellsPerPage;
    } while (currentCellIndex < allCells.length);

    return (
      <div ref={ref} className="print-wrapper w-full">
        <style jsx global>{`
          @media print {
            .print-page {
              page-break-after: always;
            }
            .print-page:last-child {
              page-break-after: auto;
            }
          }
        `}</style>
        
        {pages.map((page, pageIndex) => (
          <div 
            key={pageIndex}
            className="print-page bg-white text-black mx-auto overflow-hidden relative mb-8 print:mb-0"
            style={{ 
              width: '210mm', 
              height: '297mm', 
              padding: '20mm',
              boxSizing: 'border-box',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)'
            }}
          >
            {/* 날짜/날씨 헤더 (첫 페이지에만 표시) */}
            {pageIndex === 0 && (
              <div className="flex justify-end gap-4 mb-4 text-lg font-serif border-b-2 border-slate-800 pb-2">
                {date && <div>📅 {date}</div>}
                {weather && <div>⛅ {weather}</div>}
              </div>
            )}
            
            {/* 헤더 공간 확보 (2페이지부터는 날짜/날씨가 없으므로 공백으로 처리하거나 레이아웃 조정) */}
            {pageIndex > 0 && (
              <div className="h-[42px] mb-4"></div> // 첫 페이지 헤더 높이만큼 공백 유지
            )}

            {/* 그림 영역 (그림일기인 경우, 첫 페이지에만) */}
            {page.hasPicture && (
              <div className="w-full h-[100mm] border-2 border-slate-800 mb-8 rounded-sm relative flex items-center justify-center">
                <span className="text-slate-300 text-sm absolute bottom-2 right-2 print:hidden">
                  여기에 그림을 그려보세요
                </span>
              </div>
            )}
            
            {/* 경필쓰기 격자 영역 */}
            <div 
              className="grid gap-0 border-t-2 border-l-2 border-slate-800"
              style={{ 
                gridTemplateColumns: `repeat(${COLS_PER_ROW}, 1fr)` 
              }}
            >
              {page.cells.map((cell, i) => (
                <div 
                  key={i} 
                  className={clsx(
                    "aspect-square flex text-2xl font-serif relative",
                    "border-r-2 border-b-2 border-slate-800",
                    cell.className // 개별 위치 클래스 적용 (기본값: items-center justify-center)
                  )}
                >
                  {/* 십자 점선 가이드 */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-[1px] bg-slate-200" />
                    <div className="h-full w-[1px] bg-slate-200 absolute" />
                  </div>
                  
                  {/* 글자 (따라쓰기용 연한 회색) */}
                  <span 
                    className="relative z-10 text-neutral-900 font-medium"
                    style={{ opacity: textOpacity }}
                  >
                    {cell.char}
                  </span>
                </div>
              ))}
            </div>

            {/* 바닥글 */}
            <div className="absolute bottom-8 left-0 w-full text-center text-slate-400 text-sm">
              iepon 글쓰기 도우미로 작성된 글입니다. ({pageIndex + 1}/{pages.length})
            </div>
          </div>
        ))}
      </div>
    );
  }
);

HandwritingGrid.displayName = 'HandwritingGrid';
