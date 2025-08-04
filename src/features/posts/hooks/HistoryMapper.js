// History DTO 클래스
class History {
  constructor(originalText, translatedText, sourceLang, targetLang, genre) {
    this.originalText = originalText;
    this.translatedText = translatedText;
    this.sourceLang = sourceLang;
    this.targetLang = targetLang;
    this.genre = genre;
  }
}

// LanguageCode enum
const LanguageCode = {
  KOREAN: 'KO',
  ENGLISH: 'EN',
  JAPANESE: 'JA',
  CHINESE: 'ZH',
  FRENCH: 'FR',
  SPANISH: 'ES'
};

// Genre enum
const Genre = {
  WORD: 'WORD',
  SENTENCE: 'SENTENCE'
};

// 언어 코드 매핑 함수
const mapLanguageCode = (lang) => {
  const languageMap = {
    // 한국어
    'Korean': LanguageCode.KOREAN,
    'KO': LanguageCode.KOREAN,
    // 영어
    'English': LanguageCode.ENGLISH,
    'EN': LanguageCode.ENGLISH,
    // 일본어
    'Japanese': LanguageCode.JAPANESE,
    'JA': LanguageCode.JAPANESE,
    // 중국어
    'Chinese': LanguageCode.CHINESE,
    'ZH': LanguageCode.CHINESE,
    // 프랑스어
    'French': LanguageCode.FRENCH,
    'FR': LanguageCode.FRENCH,
    // 스페인어
    'Spanish': LanguageCode.SPANISH,
    'ES': LanguageCode.SPANISH,
    // 기본값
    '': LanguageCode.ENGLISH
  };
  return languageMap[lang] || LanguageCode.ENGLISH;
};

// 히스토리 데이터를 서버 DTO 형식으로 변환하는 매퍼
const mapHistoryToDTO = (histWord, histSentence) => {
  const historyList = [];
  
  // 단어 히스토리 매핑
  histWord.forEach(item => {
    historyList.push(new History(
      item.originalText,
      item.translatedText,
      mapLanguageCode(item.sourceLang),
      mapLanguageCode(item.targetLang),
      Genre.WORD
    ));
  });
  
  // 문장 히스토리 매핑
  histSentence.forEach(item => {
    historyList.push(new History(
      item.originalText,
      item.translatedText,
      mapLanguageCode(item.sourceLang),
      mapLanguageCode(item.targetLang),
      Genre.SENTENCE
    ));
  });
  
  return historyList;
};

export { History, LanguageCode, Genre, mapLanguageCode, mapHistoryToDTO }; 