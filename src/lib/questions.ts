import { WritingConfig, Option } from "@/types/writing";

// ========================================
// 동적 옵션 헬퍼
// ========================================

// 그림일기: 장소에 따른 활동 옵션
const getDiaryActivityOptions = (answers: Record<string, string>): Option[] => {
  const place = answers['place'];
  switch (place) {
    case '학교':
      return [
        { label: '공부했어요', value: '공부했어요', icon: '📖' },
        { label: '급식 먹었어요', value: '급식을 먹었어요', icon: '🍚' },
        { label: '체육했어요', value: '체육을 했어요', icon: '⚽' },
        { label: '그림 그렸어요', value: '그림을 그렸어요', icon: '🎨' },
        { label: '친구랑 놀았어요', value: '친구와 놀았어요', icon: '👫' },
      ];
    case '집':
      return [
        { label: '놀았어요', value: '놀았어요', icon: '🎮' },
        { label: 'TV 봤어요', value: 'TV를 봤어요', icon: '📺' },
        { label: '쉬었어요', value: '쉬었어요', icon: '😴' },
        { label: '밥 먹었어요', value: '밥을 먹었어요', icon: '🍚' },
        { label: '숙제했어요', value: '숙제를 했어요', icon: '📝' },
      ];
    case '놀이터':
      return [
        { label: '미끄럼틀 탔어요', value: '미끄럼틀을 탔어요', icon: '🛝' },
        { label: '그네 탔어요', value: '그네를 탔어요', icon: '🎠' },
        { label: '뛰어놀았어요', value: '뛰어놀았어요', icon: '🏃' },
        { label: '모래놀이 했어요', value: '모래놀이를 했어요', icon: '🏖️' },
      ];
    case '공원':
      return [
        { label: '산책했어요', value: '산책했어요', icon: '🚶' },
        { label: '자전거 탔어요', value: '자전거를 탔어요', icon: '🚲' },
        { label: '벤치에 앉았어요', value: '벤치에 앉았어요', icon: '🪑' },
        { label: '꽃을 봤어요', value: '꽃을 봤어요', icon: '🌸' },
      ];
    case '마트':
      return [
        { label: '장 봤어요', value: '장을 봤어요', icon: '🛒' },
        { label: '과자 샀어요', value: '과자를 샀어요', icon: '🍪' },
        { label: '구경했어요', value: '구경했어요', icon: '👀' },
      ];
    default:
      return [
        { label: '놀았어요', value: '놀았어요', icon: '🎮' },
        { label: '먹었어요', value: '먹었어요', icon: '🍽️' },
        { label: '공부했어요', value: '공부했어요', icon: '📖' },
        { label: '봤어요', value: '봤어요', icon: '👀' },
        { label: '쉬었어요', value: '쉬었어요', icon: '😴' },
      ];
  }
};

// 현장체험학습: 장소에 따른 '뭘 봤어요' 옵션
const getFieldTripSeenOptions = (answers: Record<string, string>): Option[] => {
  const place = answers['place'];
  switch (place) {
    case '동물원':
      return [
        { label: '사자', value: '사자', icon: '🦁' },
        { label: '코끼리', value: '코끼리', icon: '🐘' },
        { label: '원숭이', value: '원숭이', icon: '🐒' },
        { label: '기린', value: '기린', icon: '🦒' },
        { label: '펭귄', value: '펭귄', icon: '🐧' },
      ];
    case '수족관':
      return [
        { label: '물고기', value: '물고기', icon: '🐟' },
        { label: '상어', value: '상어', icon: '🦈' },
        { label: '해파리', value: '해파리', icon: '🪼' },
        { label: '거북이', value: '거북이', icon: '🐢' },
        { label: '돌고래', value: '돌고래', icon: '🐬' },
      ];
    case '박물관':
      return [
        { label: '그림', value: '그림', icon: '🖼️' },
        { label: '유물', value: '유물', icon: '🏺' },
        { label: '조각', value: '조각상', icon: '🗿' },
        { label: '옛날 물건', value: '옛날 물건', icon: '📜' },
      ];
    case '놀이공원':
      return [
        { label: '놀이기구', value: '놀이기구', icon: '🎢' },
        { label: '퍼레이드', value: '퍼레이드', icon: '🎭' },
        { label: '캐릭터', value: '캐릭터', icon: '🧸' },
        { label: '불꽃놀이', value: '불꽃놀이', icon: '🎆' },
      ];
    case '과학관':
      return [
        { label: '로봇', value: '로봇', icon: '🤖' },
        { label: '우주', value: '우주', icon: '🚀' },
        { label: '공룡', value: '공룡 뼈', icon: '🦕' },
        { label: '실험', value: '과학 실험', icon: '🔬' },
      ];
    case '공원':
      return [
        { label: '나무', value: '나무', icon: '🌳' },
        { label: '꽃', value: '꽃', icon: '🌸' },
        { label: '새', value: '새', icon: '🐦' },
        { label: '연못', value: '연못', icon: '🌊' },
      ];
    default:
      return [
        { label: '동물', value: '동물', icon: '🐘' },
        { label: '물고기', value: '물고기', icon: '🐟' },
        { label: '전시물', value: '전시물', icon: '🏺' },
        { label: '공연', value: '공연', icon: '🎭' },
      ];
  }
};

// 편지: 받는 사람에 따른 편지 이유 옵션
const getLetterReasonOptions = (answers: Record<string, string>): Option[] => {
  const receiver = answers['receiver'];
  switch (receiver) {
    case '선생님':
      return [
        { label: '고마워서', value: '고마워서', icon: '🙏' },
        { label: '존경해서', value: '존경해서', icon: '⭐' },
        { label: '안녕히 계세요', value: '인사하려고', icon: '👋' },
        { label: '축하해서', value: '축하하려고', icon: '🎉' },
      ];
    case '친구':
      return [
        { label: '고마워서', value: '고마워서', icon: '🙏' },
        { label: '미안해서', value: '미안해서', icon: '🙇' },
        { label: '보고싶어서', value: '보고싶어서', icon: '🥺' },
        { label: '축하해서', value: '축하하려고', icon: '🎉' },
        { label: '같이 놀자', value: '같이 놀고 싶어서', icon: '🤝' },
      ];
    default:
      return [
        { label: '고마워서', value: '고마워서', icon: '🙏' },
        { label: '사랑해서', value: '사랑한다고', icon: '❤️' },
        { label: '보고싶어서', value: '보고싶어서', icon: '🥺' },
        { label: '미안해서', value: '미안해서', icon: '🙇' },
        { label: '축하해서', value: '축하하려고', icon: '🎉' },
      ];
  }
};

// ========================================
// 6가지 글쓰기 유형 정의
// ========================================

export const WRITING_TYPES: Record<string, WritingConfig> = {
  // ========================================
  // 🎨 오늘 하루 일기
  // 교육과정: 쓰기 - 겪은 일을 글로 표현
  // ========================================
  'picture-diary': {
    id: 'picture-diary',
    title: '오늘 하루 일기',
    description: '오늘 있었던 일을 글로 써요.',
    icon: '🎨',
    color: 'bg-amber-100 text-amber-800',
    curriculumArea: '쓰기',
    levels: {
      level1: {
        title: '골라서 쓰기',
        description: '그림을 콕콕 눌러요',
        resultTemplate: '{date}, {weather}.\n{companion_sentence} {place}에서 {activity}.\n기분이 {feeling}.',
        steps: [
          {
            id: 'date-weather',
            label: '📅 언제? 날씨는?',
            description: '날짜와 날씨를 골라요',
            type: 'date-weather' as any,
            required: true,
            feedbackMessage: '좋아요! 📅',
          },
          {
            id: 'companion-place',
            label: '👥 누구랑 어디서?',
            description: '함께한 사람과 장소를 골라요',
            type: 'compound' as any,
            required: true,
            feedbackMessage: '잘 골랐어요! 👏',
            subQuestions: [
              {
                id: 'companion',
                label: '👥 누구랑?',
                type: 'emoji',
                options: [
                  { label: '혼자', value: '혼자', icon: '🧍' },
                  { label: '친구', value: '친구', icon: '👦' },
                  { label: '엄마', value: '엄마', icon: '👩' },
                  { label: '아빠', value: '아빠', icon: '👨' },
                  { label: '가족', value: '가족', icon: '👨‍👩‍👧' },
                  { label: '선생님', value: '선생님', icon: '👩‍🏫' },
                ],
              },
              {
                id: 'place',
                label: '🏫 어디서?',
                type: 'emoji',
                options: [
                  { label: '학교', value: '학교', icon: '🏫' },
                  { label: '집', value: '집', icon: '🏠' },
                  { label: '놀이터', value: '놀이터', icon: '🛝' },
                  { label: '공원', value: '공원', icon: '🌳' },
                  { label: '마트', value: '마트', icon: '🛒' },
                ],
              },
            ],
          },
          {
            id: 'activity',
            label: '🎯 뭐 했어요?',
            description: '한 일을 골라요',
            type: 'emoji',
            dynamicOptions: getDiaryActivityOptions,
            required: true,
            feedbackMessage: '멋져요! ⭐',
          },
          {
            id: 'feeling',
            label: '😊 기분은?',
            description: '내 마음을 골라요',
            type: 'emoji',
            options: [
              { label: '좋았어요', value: '좋았어요', icon: '😄' },
              { label: '신났어요', value: '신났어요', icon: '😆' },
              { label: '그냥 그래요', value: '그냥 그랬어요', icon: '😐' },
              { label: '슬펐어요', value: '슬펐어요', icon: '😢' },
              { label: '피곤했어요', value: '피곤했어요', icon: '😴' },
            ],
            required: true,
            feedbackMessage: '잘했어요! 🎉',
          },
        ],
      },
      level2: {
        title: '생각해서 쓰기',
        description: '글자를 쓱쓱 써요',
        steps: [
          {
            id: 'date',
            label: '📅 언제 있었던 일이에요?',
            description: '날짜를 골라주세요.',
            type: 'date',
            required: true,
          },
          {
            id: 'who-where',
            label: '👥 누구랑 어디서?',
            description: '누구와 함께, 어디에서 있었는지 써 주세요.',
            type: 'textarea',
            placeholder: '예: 엄마랑 놀이터에서',
            required: true,
          },
          {
            id: 'activity',
            label: '🎯 무엇을 했나요?',
            description: '거기서 무엇을 했는지 써 주세요.',
            type: 'textarea',
            placeholder: '예: 미끄럼틀도 타고 그네도 탔어요.',
            required: true,
          },
          {
            id: 'feeling',
            label: '😊 기분이 어땠나요?',
            description: '어떤 기분이었는지 써 주세요.',
            type: 'select-with-custom',
            options: [
              { label: '좋았어요', value: '좋았어요', icon: '😄' },
              { label: '신났어요', value: '신났어요', icon: '😆' },
              { label: '슬펐어요', value: '슬펐어요', icon: '😢' },
              { label: '피곤했어요', value: '피곤했어요', icon: '😴' },
            ],
            customPlaceholder: '다른 기분을 써 주세요',
            required: true,
          },
        ],
      },
    },
  },

  // ========================================
  // 🔍 자세히 보고 쓰기
  // 교육과정: 쓰기 - 대상의 특징을 설명하는 글
  // ========================================
  'observation': {
    id: 'observation',
    title: '자세히 보고 쓰기',
    description: '동물이나 식물을 자세히 보고 써요.',
    icon: '🔍',
    color: 'bg-emerald-100 text-emerald-800',
    curriculumArea: '쓰기',
    levels: {
      level1: {
        title: '골라서 쓰기',
        description: '그림을 콕콕 눌러요',
        resultTemplate: '{target:을/를} 봤어요.\n색깔은 {color}이에요.\n크기는 {size}.\n만져 보면 {touch}.\n{feeling}!',
        steps: [
          {
            id: 'target',
            label: '🎯 뭘 봤어요?',
            description: '관찰한 것을 골라요',
            type: 'emoji',
            options: [
              { label: '꽃', value: '꽃', icon: '🌸' },
              { label: '나무', value: '나무', icon: '🌳' },
              { label: '강아지', value: '강아지', icon: '🐕' },
              { label: '고양이', value: '고양이', icon: '🐈' },
              { label: '곤충', value: '곤충', icon: '🦋' },
              { label: '물고기', value: '물고기', icon: '🐠' },
            ],
            required: true,
            feedbackMessage: '좋아요! 👀',
          },
          {
            id: 'color',
            label: '🎨 무슨 색이에요?',
            description: '색깔을 골라요',
            type: 'emoji',
            options: [
              { label: '빨강', value: '빨간색', icon: '🔴' },
              { label: '노랑', value: '노란색', icon: '🟡' },
              { label: '초록', value: '초록색', icon: '🟢' },
              { label: '파랑', value: '파란색', icon: '🔵' },
              { label: '하양', value: '흰색', icon: '⚪' },
              { label: '갈색', value: '갈색', icon: '🟤' },
            ],
            required: true,
            feedbackMessage: '잘 봤어요! 🎨',
          },
          {
            id: 'size-touch',
            label: '📏 크기와 느낌은?',
            description: '크기와 만진 느낌을 골라요',
            type: 'compound' as any,
            required: true,
            feedbackMessage: '자세히 관찰했어요! 👏',
            subQuestions: [
              {
                id: 'size',
                label: '📏 크기는?',
                type: 'emoji',
                options: [
                  { label: '아주 작아요', value: '아주 작아요', icon: '🐜' },
                  { label: '작아요', value: '작아요', icon: '🐁' },
                  { label: '보통이에요', value: '보통이에요', icon: '🐈' },
                  { label: '커요', value: '커요', icon: '🐕' },
                  { label: '아주 커요', value: '아주 커요', icon: '🐘' },
                ],
              },
              {
                id: 'touch',
                label: '✋ 만지면?',
                type: 'emoji',
                options: [
                  { label: '부드러워요', value: '부드러워요', icon: '🧸' },
                  { label: '까칠해요', value: '까칠해요', icon: '🌵' },
                  { label: '딱딱해요', value: '딱딱해요', icon: '🪨' },
                  { label: '미끌미끌', value: '미끌미끌해요', icon: '🐸' },
                  { label: '따뜻해요', value: '따뜻해요', icon: '☀️' },
                ],
              },
            ],
          },
          {
            id: 'feeling',
            label: '💭 어땠어요?',
            description: '보고 나서 어떤 생각이 들었어요?',
            type: 'emoji',
            options: [
              { label: '신기해요', value: '참 신기해요', icon: '🤩' },
              { label: '예뻐요', value: '정말 예뻐요', icon: '😍' },
              { label: '귀여워요', value: '너무 귀여워요', icon: '🥰' },
              { label: '재밌어요', value: '관찰이 재밌어요', icon: '😄' },
            ],
            required: true,
            feedbackMessage: '훌륭해요! 🌟',
          },
        ],
      },
      level2: {
        title: '생각해서 쓰기',
        description: '글자를 쓱쓱 써요',
        steps: [
          {
            id: 'target',
            label: '🎯 무엇을 관찰했나요?',
            description: '관찰한 것의 이름을 써 주세요.',
            type: 'select-with-custom',
            options: [
              { label: '꽃', value: '꽃', icon: '🌸' },
              { label: '나무', value: '나무', icon: '🌳' },
              { label: '강아지', value: '강아지', icon: '🐕' },
              { label: '고양이', value: '고양이', icon: '🐈' },
              { label: '곤충', value: '곤충', icon: '🦋' },
            ],
            customPlaceholder: '예: 무당벌레, 나팔꽃',
            required: true,
          },
          {
            id: 'appearance',
            label: '👀 어떻게 생겼나요?',
            description: '색깔, 모양, 크기를 써 주세요.',
            type: 'textarea',
            placeholder: '예: 빨간색이고 동그란 모양이에요.',
            required: true,
          },
          {
            id: 'senses',
            label: '✋ 만져보면 어때요?',
            description: '만진 느낌이나 냄새를 써 주세요.',
            type: 'textarea',
            placeholder: '예: 보들보들하고 좋은 냄새가 나요.',
            required: false,
          },
          {
            id: 'discovery',
            label: '💭 어떤 생각이 들었나요?',
            description: '새로 알게 된 것이나 느낀 점을 써 주세요.',
            type: 'textarea',
            placeholder: '예: 잎에 줄무늬가 있어서 신기했어요.',
            required: true,
          },
        ],
      },
    },
  },

  // ========================================
  // ✉️ 마음 전하기
  // 교육과정: 쓰기 - 마음을 전하는 글 / 듣기·말하기 연계
  // ========================================
  'letter': {
    id: 'letter',
    title: '마음 전하기',
    description: '고마운 사람에게 마음을 전해요.',
    icon: '✉️',
    color: 'bg-pink-100 text-pink-800',
    curriculumArea: '쓰기, 듣기·말하기',
    levels: {
      level1: {
        title: '골라서 쓰기',
        description: '그림을 콕콕 눌러요',
        resultTemplate: '{receiver}에게\n\n{reason} 편지를 써요.\n{content}\n\n{sender} 올림',
        steps: [
          {
            id: 'receiver',
            label: '👤 누구에게 쓸까요?',
            description: '편지 받을 사람을 골라요',
            type: 'emoji',
            options: [
              { label: '엄마', value: '엄마', icon: '👩' },
              { label: '아빠', value: '아빠', icon: '👨' },
              { label: '할머니', value: '할머니', icon: '👵' },
              { label: '할아버지', value: '할아버지', icon: '👴' },
              { label: '친구', value: '친구', icon: '👦' },
              { label: '선생님', value: '선생님', icon: '👩‍🏫' },
            ],
            required: true,
            feedbackMessage: '좋아요! 💌',
          },
          {
            id: 'reason',
            label: '💌 왜 편지를 써요?',
            description: '편지 쓰는 이유를 골라요',
            type: 'emoji',
            dynamicOptions: getLetterReasonOptions,
            required: true,
            feedbackMessage: '마음이 따뜻해요! ❤️',
          },
          {
            id: 'content',
            label: '💬 하고 싶은 말',
            description: '전하고 싶은 말을 골라요',
            type: 'emoji',
            options: [
              { label: '건강하세요', value: '항상 건강하세요.', icon: '💪' },
              { label: '사랑해요', value: '정말 사랑해요.', icon: '❤️' },
              { label: '고마워요', value: '정말 고마워요.', icon: '🙏' },
              { label: '보고싶어요', value: '많이 보고싶어요.', icon: '🥺' },
              { label: '최고예요', value: '세상에서 최고예요.', icon: '👍' },
            ],
            required: true,
            feedbackMessage: '멋진 마음이에요! ⭐',
          },
          {
            id: 'sender',
            label: '✍️ 내 이름',
            description: '내 이름을 써 주세요',
            type: 'text',
            placeholder: '예: 철수',
            required: true,
            feedbackMessage: '편지 완성! 🎉',
          },
        ],
      },
      level2: {
        title: '생각해서 쓰기',
        description: '글자를 쓱쓱 써요',
        steps: [
          {
            id: 'receiver',
            label: '👤 누구에게 쓸까요?',
            description: '편지 받을 사람을 써 주세요.',
            type: 'select-with-custom',
            options: [
              { label: '엄마', value: '엄마', icon: '👩' },
              { label: '아빠', value: '아빠', icon: '👨' },
              { label: '친구', value: '친구', icon: '👦' },
              { label: '선생님', value: '선생님', icon: '👩‍🏫' },
            ],
            customPlaceholder: '예: 사촌 동생',
            required: true,
          },
          {
            id: 'reason',
            label: '💌 왜 편지를 써요?',
            description: '어떤 마음을 전하고 싶은지 써 주세요.',
            type: 'textarea',
            placeholder: '예: 맛있는 밥을 해 주셔서 고마워요.',
            required: true,
          },
          {
            id: 'content',
            label: '💬 하고 싶은 말',
            description: '전하고 싶은 이야기를 써 주세요.',
            type: 'textarea',
            placeholder: '예: 엄마가 해 주시는 김치찌개가 제일 맛있어요.',
            required: true,
          },
          {
            id: 'sender',
            label: '✍️ 마무리',
            description: '보내는 사람 이름을 써 주세요.',
            type: 'text',
            placeholder: '예: 철수 올림',
            required: true,
          },
        ],
      },
    },
  },

  // ========================================
  // 🚌 다녀온 이야기
  // 교육과정: 쓰기 - 겪은 일의 감상을 글로 표현
  // ========================================
  'field-trip': {
    id: 'field-trip',
    title: '다녀온 이야기',
    description: '어딘가 다녀온 이야기를 써요.',
    icon: '🚌',
    color: 'bg-sky-100 text-sky-800',
    curriculumArea: '쓰기',
    levels: {
      level1: {
        title: '골라서 쓰기',
        description: '그림을 콕콕 눌러요',
        resultTemplate: '{place}에 갔어요.\n{transport} 갔어요.\n{seen:을/를} 봤어요.\n정말 {feeling}!',
        steps: [
          {
            id: 'place',
            label: '📍 어디 갔어요?',
            description: '다녀온 곳을 골라요',
            type: 'emoji',
            options: [
              { label: '동물원', value: '동물원', icon: '🦁' },
              { label: '수족관', value: '수족관', icon: '🐠' },
              { label: '박물관', value: '박물관', icon: '🏛️' },
              { label: '놀이공원', value: '놀이공원', icon: '🎢' },
              { label: '과학관', value: '과학관', icon: '🔬' },
              { label: '공원', value: '공원', icon: '🌳' },
            ],
            required: true,
            feedbackMessage: '좋은 곳이에요! 📍',
          },
          {
            id: 'transport',
            label: '🚗 뭘 타고 갔어요?',
            description: '타고 간 것을 골라요',
            type: 'emoji',
            options: [
              { label: '버스', value: '버스를 타고', icon: '🚌' },
              { label: '자동차', value: '자동차를 타고', icon: '🚗' },
              { label: '지하철', value: '지하철을 타고', icon: '🚇' },
              { label: '걸어서', value: '걸어서', icon: '🚶' },
            ],
            required: true,
            feedbackMessage: '잘 골랐어요! 🚗',
          },
          {
            id: 'seen',
            label: '👀 뭘 봤어요?',
            description: '본 것을 골라요',
            type: 'emoji',
            dynamicOptions: getFieldTripSeenOptions,
            required: true,
            feedbackMessage: '멋진 걸 봤네요! 👀',
          },
          {
            id: 'feeling',
            label: '⭐ 어땠어요?',
            description: '느낌을 골라요',
            type: 'emoji',
            options: [
              { label: '재밌었어요', value: '재미있었어요', icon: '😄' },
              { label: '신기했어요', value: '신기했어요', icon: '😲' },
              { label: '행복했어요', value: '행복했어요', icon: '🥰' },
              { label: '무서웠어요', value: '무서웠어요', icon: '😨' },
              { label: '또 가고 싶어요', value: '또 가고 싶어요', icon: '🔄' },
            ],
            required: true,
            feedbackMessage: '멋진 이야기예요! 🎉',
          },
        ],
      },
      level2: {
        title: '생각해서 쓰기',
        description: '글자를 쓱쓱 써요',
        steps: [
          {
            id: 'place',
            label: '📍 어디에 갔나요?',
            description: '다녀온 곳을 써 주세요.',
            type: 'select-with-custom',
            options: [
              { label: '동물원', value: '동물원', icon: '🦁' },
              { label: '수족관', value: '수족관', icon: '🐠' },
              { label: '박물관', value: '박물관', icon: '🏛️' },
              { label: '놀이공원', value: '놀이공원', icon: '🎢' },
            ],
            customPlaceholder: '예: 서울대공원',
            required: true,
          },
          {
            id: 'journey',
            label: '🚗 어떻게 갔나요?',
            description: '뭘 타고 갔는지 써 주세요.',
            type: 'textarea',
            placeholder: '예: 버스를 타고 갔어요.',
            required: true,
          },
          {
            id: 'experience',
            label: '👀 무엇을 봤나요?',
            description: '보거나 한 것을 써 주세요.',
            type: 'textarea',
            placeholder: '예: 코끼리가 코로 물을 뿌렸어요.',
            required: true,
          },
          {
            id: 'feeling',
            label: '😊 어땠나요?',
            description: '느낀 점을 써 주세요.',
            type: 'select-with-custom',
            options: [
              { label: '재밌었어요', value: '재미있었어요', icon: '😄' },
              { label: '신기했어요', value: '신기했어요', icon: '😲' },
              { label: '행복했어요', value: '행복했어요', icon: '🥰' },
            ],
            customPlaceholder: '다른 느낌을 써 주세요',
            required: true,
          },
        ],
      },
    },
  },

  // ========================================
  // 😊 나를 소개해요
  // 교육과정: 쓰기 - 자신에 대한 글
  // ========================================
  'self-intro': {
    id: 'self-intro',
    title: '나를 소개해요',
    description: '나를 소개하는 글을 써요.',
    icon: '😊',
    color: 'bg-violet-100 text-violet-800',
    curriculumArea: '쓰기',
    levels: {
      level1: {
        title: '골라서 쓰기',
        description: '그림을 콕콕 눌러요',
        resultTemplate: '안녕하세요.\n저는 {grade} {name}입니다.\n저는 {hobby:을/를} 좋아해요.\n{strength:을/를} 잘해요.\n커서 {dream}이 되고 싶어요.',
        steps: [
          {
            id: 'name-grade',
            label: '👋 이름과 학년',
            description: '이름을 쓰고, 학년을 골라요',
            type: 'compound' as any,
            required: true,
            feedbackMessage: '반가워요! 👋',
            subQuestions: [
              {
                id: 'name',
                label: '✍️ 이름',
                type: 'text',
                placeholder: '예: 김철수',
              },
              {
                id: 'grade',
                label: '🎒 학년',
                type: 'emoji',
                options: [
                  { label: '1학년', value: '1학년', icon: '1️⃣' },
                  { label: '2학년', value: '2학년', icon: '2️⃣' },
                  { label: '3학년', value: '3학년', icon: '3️⃣' },
                  { label: '4학년', value: '4학년', icon: '4️⃣' },
                  { label: '5학년', value: '5학년', icon: '5️⃣' },
                  { label: '6학년', value: '6학년', icon: '6️⃣' },
                ],
              },
            ],
          },
          {
            id: 'hobby',
            label: '❤️ 좋아하는 것',
            description: '좋아하는 것을 골라요',
            type: 'emoji',
            options: [
              { label: '게임', value: '게임', icon: '🎮' },
              { label: '그림 그리기', value: '그림 그리기', icon: '🎨' },
              { label: '운동', value: '운동', icon: '⚽' },
              { label: '노래', value: '노래 듣기', icon: '🎵' },
              { label: '만들기', value: '만들기', icon: '🔧' },
              { label: '요리', value: '요리', icon: '🍳' },
            ],
            required: true,
            feedbackMessage: '멋져요! ❤️',
          },
          {
            id: 'strength',
            label: '💪 잘하는 것',
            description: '잘하는 것을 골라요',
            type: 'emoji',
            options: [
              { label: '달리기', value: '달리기', icon: '🏃' },
              { label: '노래', value: '노래 부르기', icon: '🎤' },
              { label: '그림', value: '그림 그리기', icon: '🎨' },
              { label: '춤', value: '춤추기', icon: '💃' },
              { label: '정리', value: '정리 정돈', icon: '🧹' },
              { label: '인사', value: '인사하기', icon: '👋' },
            ],
            required: true,
            feedbackMessage: '대단해요! 💪',
          },
          {
            id: 'dream',
            label: '🌟 커서 되고 싶은 것',
            description: '꿈을 골라요',
            type: 'emoji',
            options: [
              { label: '선생님', value: '선생님', icon: '👩‍🏫' },
              { label: '의사', value: '의사', icon: '👨‍⚕️' },
              { label: '요리사', value: '요리사', icon: '👨‍🍳' },
              { label: '운동선수', value: '운동선수', icon: '⚽' },
              { label: '가수', value: '가수', icon: '🎤' },
              { label: '경찰관', value: '경찰관', icon: '👮' },
            ],
            required: true,
            feedbackMessage: '멋진 꿈이에요! 🌟',
          },
        ],
      },
      level2: {
        title: '생각해서 쓰기',
        description: '글자를 쓱쓱 써요',
        steps: [
          {
            id: 'intro',
            label: '👋 이름과 학년',
            description: '이름과 학년을 써 주세요.',
            type: 'text',
            placeholder: '예: 저는 3학년 김철수예요.',
            required: true,
          },
          {
            id: 'hobby',
            label: '❤️ 좋아하는 것',
            description: '좋아하는 것을 써 주세요.',
            type: 'select-with-custom',
            options: [
              { label: '게임', value: '게임', icon: '🎮' },
              { label: '그림', value: '그림 그리기', icon: '🎨' },
              { label: '운동', value: '운동', icon: '⚽' },
              { label: '노래', value: '노래', icon: '🎵' },
            ],
            customPlaceholder: '예: 레고 만들기',
            required: true,
          },
          {
            id: 'strength',
            label: '💪 잘하는 것',
            description: '잘하는 것을 써 주세요.',
            type: 'textarea',
            placeholder: '예: 달리기를 잘해요.',
            required: true,
          },
          {
            id: 'dream',
            label: '🌟 나의 꿈',
            description: '커서 어떤 사람이 되고 싶은지 써 주세요.',
            type: 'select-with-custom',
            options: [
              { label: '선생님', value: '선생님', icon: '👩‍🏫' },
              { label: '의사', value: '의사', icon: '👨‍⚕️' },
              { label: '요리사', value: '요리사', icon: '👨‍🍳' },
              { label: '운동선수', value: '운동선수', icon: '⚽' },
            ],
            customPlaceholder: '예: 과학자',
            required: true,
          },
        ],
      },
    },
  },

  // ========================================
  // 📚 책 읽고 쓰기
  // 교육과정: 쓰기 + 문학 + 읽기 통합
  // ========================================
  'book-report': {
    id: 'book-report',
    title: '책 읽고 쓰기',
    description: '책을 읽고 느낀 점을 써요.',
    icon: '📚',
    color: 'bg-indigo-100 text-indigo-800',
    curriculumArea: '쓰기, 문학, 읽기',
    levels: {
      level1: {
        title: '골라서 쓰기',
        description: '그림을 콕콕 눌러요',
        resultTemplate: '{book_type:을/를} 읽었어요.\n{character}이 나오는 {story} 이야기예요.\n참 {feeling}!',
        steps: [
          {
            id: 'book_type',
            label: '📖 어떤 책이에요?',
            description: '읽은 책 종류를 골라요',
            type: 'emoji',
            options: [
              { label: '그림책', value: '그림책', icon: '🎨' },
              { label: '동화책', value: '동화책', icon: '📖' },
              { label: '과학책', value: '과학책', icon: '🔬' },
              { label: '만화책', value: '만화책', icon: '🦸' },
              { label: '위인전', value: '위인전', icon: '👤' },
            ],
            required: true,
            feedbackMessage: '좋은 책이에요! 📚',
          },
          {
            id: 'character',
            label: '👤 누가 나와요?',
            description: '주인공을 골라요',
            type: 'emoji',
            options: [
              { label: '아이', value: '아이', icon: '👦' },
              { label: '동물', value: '동물', icon: '🐕' },
              { label: '공주/왕자', value: '공주와 왕자', icon: '👸' },
              { label: '가족', value: '가족', icon: '👨‍👩‍👧' },
              { label: '영웅', value: '영웅', icon: '🦸' },
              { label: '로봇', value: '로봇', icon: '🤖' },
            ],
            required: true,
            feedbackMessage: '재밌는 주인공이에요! 👤',
          },
          {
            id: 'story',
            label: '📝 어떤 이야기예요?',
            description: '이야기 종류를 골라요',
            type: 'emoji',
            options: [
              { label: '모험', value: '신나는 모험', icon: '🗺️' },
              { label: '우정', value: '따뜻한 우정', icon: '🤝' },
              { label: '도움', value: '서로 돕는', icon: '🤗' },
              { label: '가족 사랑', value: '가족 사랑', icon: '👨‍👩‍👧' },
              { label: '용기', value: '용기를 내는', icon: '💪' },
            ],
            required: true,
            feedbackMessage: '멋진 이야기예요! 📝',
          },
          {
            id: 'feeling',
            label: '😊 읽고 나서 어땠어요?',
            description: '느낌을 골라요',
            type: 'emoji',
            options: [
              { label: '재밌었어요', value: '재미있었어요', icon: '😄' },
              { label: '감동이에요', value: '감동적이었어요', icon: '🥹' },
              { label: '슬펐어요', value: '슬펐어요', icon: '😢' },
              { label: '신기했어요', value: '신기했어요', icon: '😲' },
            ],
            required: true,
            feedbackMessage: '독서 감상 완성! 🎉',
          },
        ],
      },
      level2: {
        title: '생각해서 쓰기',
        description: '글자를 쓱쓱 써요',
        steps: [
          {
            id: 'book_info',
            label: '📖 어떤 책을 읽었나요?',
            description: '책 제목을 써 주세요.',
            type: 'text',
            placeholder: '예: 흥부와 놀부',
            required: true,
          },
          {
            id: 'character',
            label: '👤 누가 나와요?',
            description: '주인공이 누구인지 써 주세요.',
            type: 'textarea',
            placeholder: '예: 착한 흥부와 욕심쟁이 놀부가 나와요.',
            required: true,
          },
          {
            id: 'summary',
            label: '📝 어떤 이야기예요?',
            description: '무슨 이야기인지 써 주세요.',
            type: 'textarea',
            placeholder: '예: 흥부가 제비 다리를 고쳐주고 복을 받아요.',
            required: true,
          },
          {
            id: 'thought',
            label: '💭 어떤 생각이 들었나요?',
            description: '읽고 나서 느낀 점을 써 주세요.',
            type: 'textarea',
            placeholder: '예: 착하게 살면 좋은 일이 생겨요.',
            required: true,
          },
        ],
      },
    },
  },
};
