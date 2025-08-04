import { useCallback } from "react";
import { mapLanguageCode } from "../../posts/hooks/HistoryMapper.js";

// 백엔드 응답 → 프론트 타입 변환
export function mapTranslationResponse(response) {
  return {
    id: response.id,
    originalText: response.originalText,
    translatedText: response.translatedText,
    sourceLang: response.sourceLang,
    targetLang: response.targetLang,
    textUnit: response.textUnit,
  };
}

// 프론트 입력 → 백엔드 요청 타입 변환
export function mapTranslationRequest(data) {
  return {
    id: data.id,
    originalText: data.originalText,
    sourceLang: mapLanguageCode(data.sourceLang),
    targetLang: mapLanguageCode(data.targetLang),
    genre: data.textUnit,
  };
}

// hook 형태로도 제공
export function useTranslationMapper() {
  const toRequest = useCallback((data) => ({
    id: data.id,
    originalText: data.originalText,
    sourceLang: mapLanguageCode(data.sourceLang),
    targetLang: mapLanguageCode(data.targetLang),
    genre: data.textUnit,
  }), []);

  const fromResponse = useCallback((response) => ({
    id: response.id,
    originalText: response.originalText,
    translatedText: response.translatedText,
    sourceLang: response.sourceLang,
    targetLang: response.targetLang,
    textUnit: response.textUnit,
  }), []);

  return { toRequest, fromResponse };
} 