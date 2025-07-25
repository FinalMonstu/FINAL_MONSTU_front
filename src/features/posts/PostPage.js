import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SettingsIcon from '@mui/icons-material/Settings';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import { useAuth } from '../auth/hooks/AuthContext';
import ContentBox from './components/ContentBox';
import HistoryWordBox from './components/HistoryWordBox';
import HistorySenBox from './components/HistorySentenceBox';
import LanguageSelector from '../preset/components/LanguageSelector';
import PostOption from './components/PostOption';
import PostInputModal from './components/PostInputModal';
import { getPostById, savePost } from './PostController';
import { trans } from '../translate/AiController';
import { hasWhitespace } from '../../common/hooks/regexValid';
import { mainPath } from '../../common/hooks/urlManager'; 
import { useSnack } from '../../common/components/MultiSnackBar';
import { useTranslationMapper } from '../translate/hooks/TranslationMapper';
import {
  rootSx,
  headerSx,
  headerTitleSx,
  headerRightSx,
  contentWrapSx,
  contentSx,
  historyWrapSx,
  historyBoxSx
} from './styles/PostPageStyles';

/* 역할 : 사용자가 텍스트를 하이라이팅 할때마다 번역된 결과를 화면에 표시 */
export default function PostPage() {
  const navigate = useNavigate();
  const showSnack = useSnack();
  const { fromResponse } = useTranslationMapper();
  const { userInfo } = useAuth();
  const { id } = useParams();

  const [post, setPost] = useState({
    postId     : Number(id),
    title      : "오른쪽 '+' 버튼을 눌러 보세요",
    content    : '[아인슈타인]\n\nCreativity is intelligence having fun.\n\n 창의성이란 지성이 즐겁게 노는 것이다',
    createdAt  : '',
    modifiedAt : '',
    status     : '',
    isPublic   : false,
    authorId   : userInfo?.memberId || '',
    nickName   : '',
  });

  const [histWord,setHistWord] = useState([]);          // 단어 기록 리스트
  const [histSentence,setHistSentence] = useState([]);  // 문장 기록 리스트

  const [translation, setTranslation] = useState({
    originalText   : '',              // 번역할 단어 또는 문장
    translatedText : '',              // 번역된 단어 또는 문장
    sourceLang     : '',              // 원본 언어
    targetLang     : 'Korean',        // 번역 언어 (예시: 'Korean'로 기본값)
    textUnit       : '',              // 'WORD' 또는 'SENTENCE'
    createdAt      : null,            // 생성시간
  }); 

  const [options,setOptions] = useState({ viewWord : true, viewSentence : true })       // Option Modal 속성 - 단어 기록 / 문장 기록 표시 여부
  const [modal,setModal]     = useState({ inputModal : false, optionsModal : false })   // Modal 속성 - 게시물 작성 모달 / 옵션 모달

  const updatePost        = useCallback((field, value) => setPost((prev) => ({...prev, [field]: value, })), [] );
  const updateTranslation = useCallback((field, value) => setTranslation((prev) => ({ ...prev, [field]: value, })),  []);
  
  const toggleOption = useCallback((field) => { setOptions(prev => ({ ...prev, [field]: !prev[field] })); }, []);
  const toggleModal  = useCallback((field) => { setModal((prev) => ({ ...prev, [field]: !prev[field] })); }, []);


  const deleteWordFromHistory     = useCallback((createdAt) => { setHistWord(prev => prev.filter(item => item.createdAt !== createdAt)); }, []);
  const deleteSentenceFromHistory = useCallback((createdAt) => { setHistSentence(prev => prev.filter(item => item.createdAt !== createdAt)); }, []);

  // translation 객체 초기화
  const resetTranslation = useCallback((newSourceLang, newTargetLang) => {
    setTranslation({
      originalText: '',
      translatedText: '',
      sourceLang: newSourceLang ?? '',
      targetLang: newTargetLang ?? 'ko',
      textUnit: '',
      createdAt: null,
    });
  }, []);

  /*--------------------------------- 번역 관련 함수 ---------------------------------*/
  // 번역 텍스트 길이 제한 체크
  const isValidTranslationLength = useCallback((text) => {
    if (text.length > 115) {
      showSnack('error', '번역은 최대 115자까지 가능합니다');
      return false;
    }
    return true;
  }, [showSnack]);

  // 텍스트가 단어인지 문장인지 판별하는 함수
  const getTextUnit = (text) => hasWhitespace(text.trim()) ? 'SENTENCE' : 'WORD';

  // 이미 번역된 단어/문장 캐시 확인 -> 캐시 확인 후 번역된 텍스트 반환
  const findCachedTranslation = (textUnit, originalText, targetLang) => {
    const historyList = textUnit === 'WORD' ? histWord : histSentence;
    return historyList.find(
      item => item.originalText === originalText && item.targetLang === targetLang
    );
  };

  /*---------------------------------번역 API ---------------------------------*/
  // 게시물 ID를 이용, 게시물 데이터 초기화 API
  const fetchPostById = useCallback( async ( ) => {
      const {success, message, data} = await getPostById( id );
      if (success) setPost(data);
      else {
        showSnack('error', message);
        navigate(mainPath);
      }
  },[id]);

  // 번역 API
  const translateText = useCallback(async () => {
    if (!isValidTranslationLength(translation.originalText)) return;  // 길이 제한 체크, 조건에 맞지 않으면 번역 API 호출하지 않음

    const textUnit = getTextUnit(translation.originalText);   // 텍스트가 단어인지 문장인지 판별

    // 이미 번역된 단어/문장 캐시 확인
    const cached = findCachedTranslation(textUnit, translation.originalText, translation.targetLang);
    if (cached) {
      updateTranslation('translatedText', cached.translatedText);
      return;
    }

    // 번역 API 호출 및 매핑
    const requestData = { ...translation, textUnit };
    const { success, message, data } = await trans(requestData);

    if (!success) { showSnack('error', message); return;}

    const mappedData = fromResponse(data);
    if (translation.originalText !== mappedData.originalText) {showSnack('error', message); return;}
    
    updateTranslation('translatedText', mappedData.translatedText);
    updateTranslation('createdAt', Date.now());

  }, [translation, histWord, histSentence, updateTranslation, fromResponse, showSnack, isValidTranslationLength]);


  /*---------------------------------게시물 관련련 API ---------------------------------*/
  // 게시물 데이터 DB에 저장 API
  const savePostAPI  = useCallback( async (dto) => {
    let request = {...dto, id : (dto.id === -1) ? null : dto.id }   // id가 -1이면 새로운 게시물 작성 상태
    const {success, message, data} = await savePost( request );
    if (success){
      setPost(data);
      showSnack( "info", "저장되었습니다" );
    }else{
      showSnack( "error", "게시물을 저장하려면 로그인이 필요합니다");
    }
  },[]);
  /*--------------------------------- useEffect ---------------------------------*/

  // 게시물 데이터 초기화 API, id가 -1이면 새로운 게시물 작성 상태
  useEffect(() => {
    if (id > -1) fetchPostById();
  }, [id, fetchPostById]);


  // textUnit 초기화 (예시: "WORD" 또는 "SENTENCE") 후 번역 API 호출
  useEffect(() => {
    const { originalText } = translation;
    if (!originalText) return ;

    const textUnit = getTextUnit(originalText);   // WORD, SENTENCE 분별
    if (translation.textUnit !== textUnit) updateTranslation('textUnit', textUnit);
    translateText(); //번역 API
  }, [translation.originalText]);


  // History 리스트에 추가
  useEffect(() => {
    const { translatedText, textUnit, createdAt  } = translation;

    if (!translatedText || !createdAt) return;

    const listSetter = (textUnit === 'WORD') ? setHistWord : setHistSentence;
    const list       = (textUnit === 'WORD') ? histWord : histSentence;

    const exists = list.some(item => item.createdAt === createdAt);
    if (!exists) { listSetter(prev => [...prev, JSON.parse(JSON.stringify(translation))]); }
  }, [translation.createdAt]);


  return (
    <Box sx={rootSx}>
      {/* Header */}
      <Box sx={headerSx}>
        <Typography variant="h4" sx={headerTitleSx}>{post.title}</Typography>
        <Box sx={headerRightSx}>
          <LanguageSelector
            translation={translation}
            updateTranslation={updateTranslation}
            type="ori"
            resetTranslation={resetTranslation}
          />
          <ArrowForwardIcon />
          <LanguageSelector
            translation={translation}
            updateTranslation={updateTranslation}
            type="trans"
            resetTranslation={resetTranslation}
          />
          <IconButton onClick={() => toggleModal('optionsModal')}>
            <SettingsIcon />
          </IconButton>
          {(userInfo?.memberId === post.authorId || Number(id) === -1) && (
            <IconButton onClick={() => toggleModal('inputModal')}>
              <ControlPointIcon fontSize="large" />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Content */}
      <Box sx={contentWrapSx}>
        {/* 번역 입력/결과 */}
        <Box sx={contentSx}>
          <ContentBox translation={translation} updateTranslation={updateTranslation} post={post} />
        </Box>
        {/* 히스토리 */}
        <Box sx={historyWrapSx}>
          {options.viewWord && (
            <Box sx={historyBoxSx}>
              <HistoryWordBox list={histWord} handleDelete={deleteWordFromHistory} sx={{ width: '100%', boxShadow: 1, borderRadius: 2, bgcolor: '#fff', height: '100%' }} />
            </Box>
          )}
          {options.viewSentence && (
            <Box sx={historyBoxSx}>
              <HistorySenBox list={histSentence} handleDelete={deleteSentenceFromHistory} sx={{ width: '100%', boxShadow: 1, borderRadius: 2, bgcolor: '#fff', height: '100%' }} />
            </Box>
          )}
        </Box>
      </Box>

      {/* 옵션/입력 모달 */}
      <PostOption isOpen={modal.optionsModal} toggleModal={toggleModal} toggleOption={toggleOption} options={options} />
      <PostInputModal isOpen={modal.inputModal} toggleOption={toggleModal} post={post} setPost={setPost} savePost={savePostAPI }/>
    </Box>
  );
}