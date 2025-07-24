import { useCallback } from "react";

// 백엔드 응답 → 프론트 타입 변환
export function mapTranslationResponse(response) {
  return {
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
    originalText: data.originalText,
    sourceLang: data.sourceLang,
    targetLang: data.targetLang,
    textUnit: data.textUnit,
  };
}

// hook 형태로도 제공
export function useTranslationMapper() {
  const toRequest = useCallback((data) => ({
    originalText: data.originalText,
    sourceLang: data.sourceLang,
    targetLang: data.targetLang,
    textUnit: data.textUnit,
  }), []);

  const fromResponse = useCallback((response) => ({
    originalText: response.originalText,
    translatedText: response.translatedText,
    sourceLang: response.sourceLang,
    targetLang: response.targetLang,
    textUnit: response.textUnit,
  }), []);

  return { toRequest, fromResponse };
} 