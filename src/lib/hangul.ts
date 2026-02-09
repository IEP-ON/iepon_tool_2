/**
 * 한글 조사 처리를 위한 유틸리티
 * 동적 텍스트 삽입 시 '은/는', '이/가' 등의 조사를 받침 유무에 따라 자동 처리
 */

// 받침 유무 확인
const hasBatchim = (char: string): boolean => {
  if (!char) return false;
  const code = char.charCodeAt(0);
  // 한글 유니코드 범위: 0xAC00 ~ 0xD7A3
  if (code < 0xAC00 || code > 0xD7A3) return false;
  return (code - 0xAC00) % 28 !== 0;
};

// ㄹ 받침 확인 (으로/로 처리용)
const hasRieulBatchim = (char: string): boolean => {
  if (!char) return false;
  const code = char.charCodeAt(0);
  if (code < 0xAC00 || code > 0xD7A3) return false;
  return (code - 0xAC00) % 28 === 8; // ㄹ = 8
};

export type JosaType = '은/는' | '이/가' | '을/를' | '과/와' | '아/야' | '이어/여' | '으로/로' | '이랑/랑';

/**
 * 단어에 적절한 조사를 반환
 */
export const josa = (word: string, type: JosaType): string => {
  if (!word) return '';

  const lastChar = word[word.length - 1];
  const has = hasBatchim(lastChar);

  switch (type) {
    case '은/는':
      return has ? '은' : '는';
    case '이/가':
      return has ? '이' : '가';
    case '을/를':
      return has ? '을' : '를';
    case '과/와':
      return has ? '과' : '와';
    case '아/야':
      return has ? '아' : '야';
    case '이어/여':
      return has ? '이어' : '여';
    case '이랑/랑':
      return has ? '이랑' : '랑';
    case '으로/로':
      // 'ㄹ' 받침인 경우 '로' (예외)
      if (hasRieulBatchim(lastChar)) return '로';
      return has ? '으로' : '로';
    default:
      return '';
  }
};

/**
 * 단어 + 조사를 합쳐서 반환
 */
export const withJosa = (word: string, type: JosaType): string => {
  return word + josa(word, type);
};

/**
 * 템플릿 문자열을 데이터로 치환하는 함수
 * 
 * 지원 형식:
 * - {key}: 값 그대로 치환
 * - {key:은/는}: 값 + 적절한 조사
 * 
 * 예시:
 * - resolveTemplate("{name:은/는} 오늘 기분이 어때요?", { name: "민수" })
 *   -> "민수는 오늘 기분이 어때요?"
 * - resolveTemplate("{companion:과/와} 무엇을 했나요?", { companion: "친구" })
 *   -> "친구와 무엇을 했나요?"
 */
export const resolveTemplate = (template: string, data: Record<string, string>): string => {
  if (!template) return '';

  return template.replace(/\{([^}]+)\}/g, (match, key) => {
    // 조사 처리 문법 확인 (예: name:은/는)
    const parts = key.split(':');
    const variable = parts[0];
    const josaType = parts[1] as JosaType | undefined;

    const value = data[variable];

    // 값이 없으면 원본 템플릿 유지 (플레이스홀더로 표시)
    if (!value) return match;

    if (josaType) {
      return withJosa(value, josaType);
    }

    return value;
  });
};
