import { NextResponse } from 'next/server';
import { generatePrompt } from '@/lib/prompts';
import { WritingType, WritingLevel } from '@/types/writing';
import { resolveTemplate } from '@/lib/hangul';

export const runtime = 'nodejs';

// OpenAI Chat Completions API를 fetch로 직접 호출
async function callOpenAI(
  messages: { role: string; content: string }[],
  temperature: number,
  max_tokens: number,
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY 환경변수가 설정되지 않았습니다.');
  }

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      temperature,
      max_tokens,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`OpenAI API ${res.status}: ${errBody}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

// Level 1용 템플릿 기반 텍스트 생성 (resolveTemplate 활용으로 조사 자동 처리)
function generateFromTemplate(template: string, answers: Record<string, string>): string {
  // 혼자 분기 처리: companion_sentence 생성
  const processedAnswers = { ...answers };
  if (processedAnswers['companion'] === '혼자') {
    processedAnswers['companion_sentence'] = '혼자';
  } else if (processedAnswers['companion']) {
    processedAnswers['companion_sentence'] = `${processedAnswers['companion']}\uACFC/\uC640 \uD568\uAED8`;
  }

  // resolveTemplate로 조사 처리 ({key:을/를} 등) 적용
  return resolveTemplate(template, processedAnswers);
}

export async function POST(req: Request) {
  try {
    const { type, answers, level, resultTemplate } = await req.json();

    if (!type || !answers) {
      return NextResponse.json(
        { error: '잘못된 요청입니다.' },
        { status: 400 }
      );
    }

    let content: string;

    // 답변에서 'completed' 같은 내부 상태값 제거
    const cleanedAnswers = Object.fromEntries(
      Object.entries(answers as Record<string, string>).filter(([_, v]) => v && v !== 'completed')
    ) as Record<string, string>;

    // Level 1: 템플릿 기반으로 간단히 생성 후 AI로 자연스럽게 다듬기
    if (level === 'level1' && resultTemplate) {
      const templateText = generateFromTemplate(resultTemplate, cleanedAnswers);
      
      content = await callOpenAI(
        [
          { 
            role: "system", 
            content: `당신은 초등학교 특수교육대상학생(지적장애, 자폐성장애 등)의 글쓰기를 돕는 선생님입니다.
학생이 선택한 단어들로 만들어진 문장을 자연스럽고 문법적으로 올바른 한국어로 다듬어주세요.

중요 규칙:
1. 학생이 선택한 핵심 단어와 의미는 반드시 유지하세요.
2. 한 문장은 15자 이내로 짧게 유지하세요.
3. 초등 저학년도 이해할 수 있는 쉬운 어휘만 사용하세요.
4. 3~4문장, 50~100자 내외로 작성하세요.
5. 각 문장은 새로운 줄에 작성하세요.
6. "혼자"인 경우 "~와/과 함께" 표현을 쓰지 마세요.
7. 완성된 글만 출력하세요. (인사말, 설명, 따옴표 제외)`
          },
          { 
            role: "user", 
            content: `다음 문장을 자연스럽게 다듬어주세요:\n\n${templateText}` 
          }
        ],
        0.3,
        300,
      ) || templateText;
    } 
    // Level 2: AI가 전체 글 작성
    else {
      const systemPrompt = generatePrompt(type as WritingType, cleanedAnswers, level);

      content = await callOpenAI(
        [
          { role: "system", content: systemPrompt },
          { role: "user", content: "학생의 답변을 바탕으로 글을 작성해주세요." }
        ],
        0.5,
        500,
      );
    }

    return NextResponse.json({ content });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error('OpenAI API Error:', errMsg);
    return NextResponse.json(
      { error: '글을 생성하는 도중 문제가 발생했습니다.', details: errMsg },
      { status: 500 }
    );
  }
}
