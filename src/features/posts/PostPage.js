import { useState, useEffect, useCallback, useRef } from 'react';
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
import { getPostById, savePost, getHistoriesByPost, deleteHistory } from './PostController';
import { saveHistory } from './HistoryController';
import { trans } from '../translate/TranslationController';
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
  const postId = Number(id); // 별도의 postId 변수 생성
  const currentMemberId = userInfo?.memberId; // 현재 사용자의 memberId

  const [post, setPost] = useState({
    postId     : postId,
    title      : "오른쪽 '+' 버튼을 눌러 보세요",
    content    : '[아인슈타인]\n\nCreativity is intelligence having fun.\n\n 창의성이란 지성이 즐겁게 노는 것이다',
    createdAt  : '',
    modifiedAt : '',
    status     : '',
    isPublic   : false,
    authorId   : null, // 서버에서 받아올 때까지 null로 설정
    nickName   : '',
  });

  const [histWord,setHistWord] = useState([]);          // 단어 기록 리스트
  const [histSentence,setHistSentence] = useState([]);  // 문장 기록 리스트
  
  // 히스토리 상태를 추적하기 위한 ref
  const histWordRef = useRef([]);
  const histSentenceRef = useRef([]);

  const [translation, setTranslation] = useState({
    id            : null,             // 히스토리 ID
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


  const deleteWordFromHistory = useCallback(async (id) => {
    setHistWord(prev => {
      const itemToDelete = prev.find(item => item.id === id);
      if (itemToDelete && itemToDelete.id) {
        // 서버에서 삭제
        deleteHistory(itemToDelete.id, postId).then(({ success, message }) => {
          if (success) {
            console.log('단어 히스토리가 서버에서 삭제되었습니다.');
          } else {
            console.log('단어 히스토리 삭제 실패:', message);
          }
        });
      }
      // 로컬에서 삭제 - id로 삭제
      return prev.filter(item => item.id !== id);
    });
  }, [postId]);

  const deleteSentenceFromHistory = useCallback(async (id) => {
    setHistSentence(prev => {
      const itemToDelete = prev.find(item => item.id === id);
      if (itemToDelete && itemToDelete.id) {
        // 서버에서 삭제
        deleteHistory(itemToDelete.id, postId).then(({ success, message }) => {
          if (success) {
            console.log('문장 히스토리가 서버에서 삭제되었습니다.');
          } else {
            console.log('문장 히스토리 삭제 실패:', message);
          }
        });
      }
      // 로컬에서 삭제 - id로 삭제
      return prev.filter(item => item.id !== id);
    });
  }, [postId]);

  // translation 객체 초기화
  const resetTranslation = useCallback((newSourceLang, newTargetLang) => {
    setTranslation({
      id: null,
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

  // 게시물의 번역 기록을 불러오는 API
  const fetchHistoriesByPost = useCallback(async () => {
    if (!postId || postId <= 0) return;
    
    // post.authorId가 null이면 아직 서버에서 데이터를 받아오지 않은 상태
    if (post.authorId === null) {
      console.log('아직 게시물 데이터를 받아오지 않았습니다.');
      return;
    }
    
    // post.authorId와 currentMemberId가 같을 때만 히스토리를 불러옴
    if (post.authorId !== currentMemberId) {
      console.log('게시물 작성자가 아니므로 히스토리를 불러오지 않습니다.');
      return;
    }
    
    const { success, message, data } = await getHistoriesByPost(postId);
    if (success && data) {
      // 서버에서 받은 히스토리를 클라이언트 형식으로 변환
      const wordHistories = data
        .filter(item => item.genre === 'WORD')
        .map(item => ({
          id: item.id,
          originalText: item.originalText,
          translatedText: item.translatedText,
          sourceLang: item.sourceLang,
          targetLang: item.targetLang,
          textUnit: item.genre,
          createdAt: item.createdAt || Date.now()
        }));
      
      const sentenceHistories = data
        .filter(item => item.genre === 'SENTENCE')
        .map(item => ({
          id: item.id,
          originalText: item.originalText,
          translatedText: item.translatedText,
          sourceLang: item.sourceLang,
          targetLang: item.targetLang,
          textUnit: item.genre,
          createdAt: item.createdAt || Date.now()
        }));
      
      setHistWord(wordHistories);
      setHistSentence(sentenceHistories);
      console.log('히스토리를 불러왔습니다.');
    } else {
      console.log('히스토리 불러오기 실패:', message);
    }
  }, [postId, post.authorId, currentMemberId]);

  // 번역 API
  const translateText = useCallback(async () => {
    if (!isValidTranslationLength(translation.originalText)) return;  // 길이 제한 체크, 조건에 맞지 않으면 번역 API 호출하지 않음

    const textUnit = getTextUnit(translation.originalText);   // 텍스트가 단어인지 문장인지 판별

    // 이미 번역된 단어/문장 캐시 확인
    const historyList = textUnit === 'WORD' ? histWord : histSentence;
    const cached = historyList.find(
      item => item.originalText === translation.originalText && item.targetLang === translation.targetLang
    );
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
    
    // 번역 결과와 함께 id도 저장
    updateTranslation('translatedText', mappedData.translatedText);
    updateTranslation('id', mappedData.id);
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
    if (id > -1) {
      fetchPostById();
    }
  }, [id, fetchPostById]);

  // post.authorId가 설정된 후 히스토리 불러오기
  useEffect(() => {
    if (post.authorId !== null && postId > 0) {
      fetchHistoriesByPost();
    }
  }, [post.authorId, postId, fetchHistoriesByPost]);


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

  // 히스토리 ref 업데이트
  useEffect(() => {
    histWordRef.current = histWord;
  }, [histWord]);

  useEffect(() => {
    histSentenceRef.current = histSentence;
  }, [histSentence]);

  // 페이지 언마운트 시 히스토리 데이터 저장
  useEffect(() => {
    return () => {
             console.log("postId: " + postId)
       console.log("post.authorId: " + post.authorId)
       console.log("currentMemberId: " + currentMemberId)
       console.log("(!postId || postId <= 0): " + (!postId || postId <= 0))
       console.log("(post.authorId !== currentMemberId): " + (post.authorId !== currentMemberId))
       // postId가 null이 아니고 0보다 클 때만 저장
       if (!postId || postId <= 0) return;
       
       // post.authorId가 null이면 아직 서버에서 데이터를 받아오지 않은 상태이므로 저장하지 않음
       if (post.authorId === null) {
         console.log('게시물 데이터를 아직 받아오지 않았으므로 히스토리를 저장하지 않습니다.');
         return;
       }
       
       // authorId가 currentMemberId와 같을 때만 저장
       if (post.authorId !== currentMemberId) {
         console.log('게시물 작성자가 아니므로 히스토리를 저장하지 않습니다.');
         return;
       }
      
      const historyToSave = [...histWordRef.current, ...histSentenceRef.current];
      console.log("historyToSave.length === 0: " + historyToSave.length)

      if (historyToSave.length === 0) return;

      saveHistory(postId, histWordRef.current, histSentenceRef.current).then(({ success, message }) => {
        if (success) {
          console.log('히스토리가 저장되었습니다.');
        } else {
          console.log('히스토리 저장 실패:', message);
        }
      });
    };
  }, [postId, post.authorId, currentMemberId]);


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
                     {(currentMemberId === post.authorId || Number(id) === -1) && (
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