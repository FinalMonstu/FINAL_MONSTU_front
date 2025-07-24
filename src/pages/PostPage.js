import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SettingsIcon from '@mui/icons-material/Settings';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useAuth } from '../components/authenticate/AuthContext';
import { useSnack } from '../components/popup/MultiSnackBar';
import ContentBox from '../components/box/ContentBox';
import HistoryWordBox from '../components/box/HistoryWordBox';
import HistorySenBox from '../components/box/HistorySenBox';
import LanguageSelector from '../components/selecter/LanguageSelector';
import PostOption from '../components/modal/PostOption';
import PostInputModal from '../components/modal/PostInputModal';
import { getPostById, savePost } from '../hooks/controller/PostController';
import { trans } from '../hooks/controller/AiController';
import { hasWhitespace } from '../hooks/regexValid';
import { mainPath } from '../hooks/urlManager';
import { useTranslationMapper } from '../hooks/mapper/TranslationMapper';

/* 역할 : 사용자가 텍스트를 하이라이팅 할때마다 번역된 결과를 화면에 표시 */
export default function PostPage() {
  const { userInfo } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const showSnack = useSnack();
  const { toRequest, fromResponse } = useTranslationMapper();

  const sample = {
    title : "오른쪽 '+' 버튼을 눌러 보세요",
    content : '[아인슈타인]\n\nCreativity is intelligence having fun.\n\n 창의성이란 지성이 즐겁게 노는 것이다'
  }

  const [post, setPost] = useState({
    postId: Number(id),
    title: sample.title,
    content: sample.content,
    createdAt: '',
    modifiedAt: '',
    status: '',
    isPublic: false,
    authorId: userInfo?.memberId || '',
    nickName: '',
  });

  const [histWord,setHistWord] = useState([]);
  const [histSentence,setHistSentence] = useState([]);

  const [translation, setTranslation] = useState({
    originalText: '',                // 번역할 단어 또는 문장
    translatedText: '',              // 번역된 단어 또는 문장
    sourceLang: '',                  // 원본 언어
    targetLang: 'Korean',                // 번역 언어 (예시: 'Korean'로 기본값)
    textUnit: '',                    // 'WORD' 또는 'SENTENCE'
    createdAt: null,                 // 생성시간
  }); 

  const [options,setOptions] = useState({ viewWord : true, viewSentence : true })  //Option Modal 속성 - 단어 기록 & 문장 기록
  const [modal,setModal] = useState({ inputModal : false, optionsModal : false })  //PostInput Modal 속성


  const updatePost = useCallback((field, value) =>setPost((prev) => ({...prev, [field]: value, })), [] );
  const updateTranslation = useCallback((field, value) => setTranslation((prev) => ({ ...prev, [field]: value, })),  []);
  
  const toggleOption = useCallback((field) => { setOptions(prev => ({ ...prev, [field]: !prev[field] })); }, []);
  const toggleModal = useCallback((field) => { setModal((prev) => ({ ...prev, [field]: !prev[field] })); }, []);

  const deleteWord = useCallback((createdAt) => { 
    setHistWord(prev => prev.filter(item => item.createdAt !== createdAt)); 
    setTranslation(prev => ({ ...prev, translatedText: '', originalText: '' }));
  }, []);

  const deleteSentence = useCallback((createdAt) => { 
    setHistSentence(prev => prev.filter(item => item.createdAt !== createdAt)); 
    setTranslation(prev => ({ ...prev, translatedText: '', originalText: '' }));
  }, []);

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


  // 게시물 ID를 이용, 게시물 데이터 초기화 API
  const fetchPost = useCallback( async ( ) => {
      const {success, message, data} = await getPostById( id );
      if (success) setPost(data);
      else {
        showSnack('error', message);
        navigate(mainPath);
      }
  },[id]);

  useEffect(()=>{ if(id > -1) fetchPost(); },[id])
  useEffect(()=>{ console.log("userInfo:", userInfo); },[])
  //  Text 번역 API
  const fetchTrans = useCallback(async () => {
    if(translation.originalText.length > 115) showSnack('error','번역은 최대 115자까지 가능합니다')

    // textUnit을 직접 계산
    const textUnit = hasWhitespace(translation.originalText.trim()) ? 'SENTENCE' : 'WORD';

    // 이미 번역된 단어인지 검증
    const historyList = textUnit === 'WORD' ? histWord : histSentence;
    const cached = historyList.find(item => (item.originalText === translation.originalText) && (item.targetLang === translation.targetLang));
    if (cached) { return updateTranslation('translatedText', cached.translatedText); }

    // 매핑 적용: 프론트 데이터를 백엔드 요청 형태로 변환
    const requestData = { ...translation, textUnit }; // textUnit을 강제로 덮어씀
    const { success, message, data } = await trans(requestData);
    // 매핑 적용: 백엔드 응답을 프론트 형태로 변환
    if(!success){
      showSnack('error', message);
      return;
    }
    const mappedData = fromResponse(data);
    if (!success || translation.originalText !== mappedData.originalText) {
      showSnack('error', message);
      return;
    }
    updateTranslation('translatedText', mappedData.translatedText);
    updateTranslation('createdAt', Date.now());

  }, [translation, histWord, histSentence, updateTranslation, toRequest, fromResponse]);

 


  // type 초기화 (예시: "WORD" 또는 "SENTENCE") , 번역
  useEffect(() => {
    const { originalText } = translation;
    if (!originalText) return ;

    // WORD,SENTENCE 분별
    const textUnit = hasWhitespace(originalText.trim()) ? 'SENTENCE' : 'WORD';
    if (translation.textUnit !== textUnit) updateTranslation('textUnit', textUnit);
    fetchTrans(); //번역 API
  }, [translation.originalText]);


  // History 리스트에 추가
  useEffect(() => {
    const { translatedText, textUnit, originalText, createdAt  } = translation;
    if (!translatedText || !createdAt) return;
    const listSetter = (textUnit === 'WORD') ? setHistWord : setHistSentence;
    const list = (textUnit === 'WORD') ? histWord : histSentence;
    const exists = list.some(item => item.createdAt === createdAt);

    if (!exists) {
      listSetter(prev => [...prev, JSON.parse(JSON.stringify(translation))]);
    }
  }, [translation.translatedText]);


  // 게시물 데이터 DB에 저장 API
  const savePostAPI = useCallback( async (dto) => {
    let payLoad = {...dto, id : (dto.id === -1) ? null : dto.id }
    const {success, message, status, data} = await savePost( payLoad );
    if(!success){
      showSnack( "error", "게시물을 저장하려면 로그인이 필요합니다");
      return;
    };
    if (success) setPost(data)
  },[post,updatePost]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 4, py: 2 }}>

        <Typography variant="h3" sx={{ flex: 3, fontWeight: 'bold' }}>
          {post.title}
        </Typography>

        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>

          {/* 자신이 작성한 게시물, 새로운 게시물 작성 상태 일때 */}
          { (userInfo?.memberId === post.authorId || Number(id) === -1) &&(
            <IconButton onClick={() => toggleModal('inputModal')}>
              <ControlPointIcon fontSize="large" />
            </IconButton>
          )}

          <IconButton onClick={() => toggleModal('optionsModal')}>
            <SettingsIcon />
          </IconButton>

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

        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ display: 'flex', flex: 1, maxHeight: 800 }}>
        <Box sx={{ flex: options.viewWord ? 3 : 1, overflowY: 'auto', p: 4 ,'&::-webkit-scrollbar':{display: 'none'}, }}>
          <ContentBox translation={translation} updateTranslation={updateTranslation} post={post} />
        </Box>
          {options.viewWord && <HistoryWordBox list={histWord} handleDelete={deleteWord} />}
      </Box>

      {/* Sentence History */}
      {options.viewSentence && ( <HistorySenBox list={histSentence} handleDelete={deleteSentence} /> )}

      <PostOption isOpen={modal.optionsModal} toggleModal={toggleModal} toggleOption={toggleOption} />

      <PostInputModal isOpen={modal.inputModal} toggleOption={toggleModal} post={post} setPost={setPost} savePost={savePostAPI}/>
      
    </Box>
  );
}