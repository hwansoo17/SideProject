type DataItem = {
  title?: string;
  corporation?: string;
  name?: string;
};

const decomposeHangul = (s: string) => {
  const CHO = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ',
    'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ',
    'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
  ];
  const JUNG = [
    'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ',
    'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ',
    'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ',
    'ㅡ', 'ㅢ', 'ㅣ',
  ];
  const JONG = [
    '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
    'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ',
    'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ',
    'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ',
    'ㅌ', 'ㅍ', 'ㅎ',
  ];

  const chars = s.split('');
  let result = '';
  let choResult = '';

  for (let i = 0; i < chars.length; i++) {
    const code = chars[i].charCodeAt(0) - 44032;

    if (code >= 0 && code <= 11171) {
      const cho = Math.floor(code / 588);
      const jung = Math.floor((code - cho * 588) / 28);
      const jong = code % 28;

      result += CHO[cho] + JUNG[jung] + JONG[jong];
      choResult += CHO[cho];
    } else {
      result += chars[i];
      choResult += chars[i];
    }
  }

  return { full: result, cho: choResult };
};

const koFilter = (data: DataItem[], query: string): DataItem[] => {
  const isHangul = /[가-힣ㄱ-ㅎ]/.test(query);
  const lowerCaseQuery = query.toLowerCase();

  if (!isHangul) {
    const startsWith = data.filter(item => {
      const title = item.title?.toLowerCase() || '';
      const corporation = item.corporation?.toLowerCase() || '';
      const name = item.name?.toLowerCase() || '';
      return title.startsWith(lowerCaseQuery) || corporation.startsWith(lowerCaseQuery) || name.startsWith(lowerCaseQuery);
    });

    const contains = data.filter(item => {
      const title = item.title?.toLowerCase() || '';
      const corporation = item.corporation?.toLowerCase() || '';
      const name = item.name?.toLowerCase() || '';
      return (
        (title.includes(lowerCaseQuery) && !title.startsWith(lowerCaseQuery)) ||
        (corporation.includes(lowerCaseQuery) && !corporation.startsWith(lowerCaseQuery)) ||
        (name.includes(lowerCaseQuery) && !name.startsWith(lowerCaseQuery))
      );
    });

    // 정렬: name에 포함된 항목 우선
    const sortedResults = [...startsWith, ...contains].sort((a, b) => {
      const aName = a.name?.toLowerCase() || '';
      const bName = b.name?.toLowerCase() || '';
      const aPriority = aName.includes(lowerCaseQuery) ? 0 : 1;
      const bPriority = bName.includes(lowerCaseQuery) ? 0 : 1;
      return aPriority - bPriority;
    });

    return sortedResults.slice(0, 10);
  }

  const { full: decomposedQueryFull, cho: decomposedQueryCho } = decomposeHangul(query);
  const isChoSearch = query
    .split('')
    .every(char => 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'.includes(char));

  const startsWith: DataItem[] = [];
  const contains: DataItem[] = [];

  data.forEach(item => {
    const title = item.title || '';
    const corporation = item.corporation || '';
    const name = item.name || '';
    const combined = title + corporation + name;

    const { full: decomposedItemFull, cho: decomposedItemCho } = decomposeHangul(combined);

    if (isChoSearch) {
      if (
        decomposedItemCho.startsWith(decomposedQueryCho) ||
        title.startsWith(query) ||
        corporation.startsWith(query) ||
        name.startsWith(query)
      ) {
        startsWith.push(item);
      } else if (
        decomposedItemCho.includes(decomposedQueryCho) ||
        title.includes(query) ||
        corporation.includes(query) ||
        name.includes(query)
      ) {
        contains.push(item);
      }
    } else {
      if (
        decomposedItemFull.startsWith(decomposedQueryFull) ||
        title.startsWith(query) ||
        corporation.startsWith(query) ||
        name.startsWith(query)
      ) {
        startsWith.push(item);
      } else if (
        decomposedItemFull.includes(decomposedQueryFull) ||
        title.includes(query) ||
        corporation.includes(query) ||
        name.includes(query)
      ) {
        contains.push(item);
      }
    }
  });

  // 중복 제거
  const uniqueResults: DataItem[] = [];
  const seen = new Set<string>();

  [...startsWith, ...contains].forEach(item => {
    const identifier = JSON.stringify(item);
    if (!seen.has(identifier)) {
      seen.add(identifier);
      uniqueResults.push(item);
    }
  });

  // 정렬: name에 query 포함된 항목 우선
  const sortedResults = uniqueResults.sort((a, b) => {
    const aName = a.name || '';
    const bName = b.name || '';
    const aPriority = aName.includes(query) ? 0 : 1;
    const bPriority = bName.includes(query) ? 0 : 1;
    return aPriority - bPriority;
  });

  return sortedResults.slice(0, 10);
};

export default koFilter;
