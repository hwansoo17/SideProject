// utils/extractInitial.ts
export const getInitial = (text: string): string => {
  const HANGUL_START = 0xac00;
  const HANGUL_END = 0xd7af;
  const INITIALS = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ',
    'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
  ];

  if (!text || text.length === 0) return '#'; // 빈 값은 '#'로 처리
  const charCode = text.charCodeAt(0);

  if (charCode >= HANGUL_START && charCode <= HANGUL_END) {
    const initialIndex = Math.floor((charCode - HANGUL_START) / 588);
    return INITIALS[initialIndex];
  }

  // 한글이 아닌 경우
  if (/[A-Za-z]/.test(text[0])) return text[0].toUpperCase(); // 영어는 첫 글자
  return '#'; // 기타 문자는 '#'로 처리
};
