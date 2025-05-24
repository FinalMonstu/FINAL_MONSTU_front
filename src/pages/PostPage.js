import React, { useState, useEffect, useCallback } from 'react';
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

/* 역할 : 사용자가 텍스트를 하이라이팅 할때마다 번역된 결과를 화면에 표시 */
export default function PostPage() {
  const { userInfo } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const showSnack = useSnack();

  const sample = {
    title : "오른쪽 '+' 버튼을 눌러 보세요",
    content : '[아인슈타인]\n\nCreativity is intelligence having fun.\n\n 창의성이란 지성이 즐겁게 노는 것이다'
  }

  // const sample = {
  //   title : "오른쪽 '+' 버튼을 눌러 보세요",
  //   content : '[아인슈타인]\n\nCreativity is intelligence having fun.\n\n 창의성이란 지성이 즐겁게 노는 것이다[아인슈타인]\n\nCreativity is intelligence having fun.\n\n 창의성이란 지성이 즐겁게 노는 것이다[아인슈타인]\n\nCreativity is intelligence having fun.\n\n 창의성이란 지성이 즐겁게 노는 것이다[아인슈타인]\n\nCreativity is intelligence having fun.\n\n 창의성이란 지성이 즐겁게 노는 것이다[아인슈타인]\n\nCreativity is intelligence having fun.\n\n 창의성이란 지성이 즐겁게 노는 것이다[아인슈타인]\n\nCreativity is intelligence having fun.\n\n 창의성이란 지성이 즐겁게 노는 것이다[아인슈타인]\n\nCreativity is intelligence having fun.\n\n 창의성이란 지성이 즐겁게 노는 것이다[아인슈타인]\n\nCreativity is intelligence having fun.\n\n 창의성이란 지성이 즐겁게 노는 것이다[아인슈타인]\n\nCreativity is intelligence having fun.\n\n 창의성이란 지성이 즐겁게 노는 것이다[아인슈타인]\n\nCreativity is intelligence having fun.\n\n 창의성이란 지성이 즐겁게 노는 것이다[아인슈타인]\n\nCreativity is intelligence having fun.\n\n 창의성이란 지성이 즐겁게 노는 것이다[아인슈타인]\n\nCreativity is intelligence having fun.\n\n 창의성이란 지성이 즐겁게 노는 것이다[아인슈타인]\n\nCreativity is intelligence having fun.\n\n 창의성이란 지성이 즐겁게 노는 것이다[아인슈타인]\n\nCreativity is intelligence having fun.\n\n 창의성이란 지성이 즐겁게 노는 것이다'
  // }

  const [post, setPost] = useState({
    id: Number(id),
    title: sample.title,
    content: sample.content,
    createdAt: '',
    modifiedAt: '',
    status: '',
    isPublic: false,
    authorEmail: userInfo?.email || '',
    nickName: '',
  });

  const [histWord,setHistWord] = useState([]);
  const [histSentence,setHistSentence] = useState([]);

  const [translation, setTranslation] = useState({
    id : '',                         //단어 ID
    memberId : userInfo?.id || '',   // 회원 ID
    postId : id || null,               //게시물 ID
    target: '',                      // 번역할 단어 또는 문장
    transed: '',                     // 번역된 단어 또는 문장
    oriLang: '',                     // 원본 언어
    transLang: 'Korean',             // 번역된 언어
    genre : '',                      //WORD,SENTENCE
  }); 

  const [options,setOptions] = useState({ viewWord : true, viewSentence : true })  //Option Modal 속성 - 단어 기록 & 문장 기록록
  const [modal,setModal] = useState({ inputModal : false, optionsModal : false })  //PostInput Modal 속성


  const updatePost = useCallback((field, value) =>setPost((prev) => ({...prev, [field]: value, })), [] );
  const updateTranslation = useCallback( (field, value) => setTranslation((prev) => ({ ...prev, [field]: value, })),  []);
  
  const toggleOption = useCallback((field) => { setOptions(prev => ({ ...prev, [field]: !prev[field] })); }, []);
  const toggleModal = useCallback((field) => { setModal((prev) => ({ ...prev, [field]: !prev[field] })); }, []);

  const deleteWord = useCallback( (target) => setHistWord(prev => prev.filter(item => item.target !== target)), [] );
  const deleteSentence = useCallback( (target) => setHistSentence(prev => prev.filter(item => item.target !== target)), [] );


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


  //  Text 번역 API
  const fetchTrans = useCallback(async () => {
    if(translation.target.length > 115) showSnack('error','번역은 최대 115자까지 가능합니다')

    // 이미 번역된 단어인지 검증
    const historyList = translation.genre === 'WORD' ? histWord : histSentence;
    const cached = historyList.find(item => (item.target === translation.target) && (item.transLang === translation.transLang));
    if (cached) { return updateTranslation('transed', cached.transed); }

    const { success, message, data } = await trans(translation);
    (!success || translation.target !== data.target)
      ? showSnack('error', message)
      : updateTranslation('transed', data.transed);
  }, [translation, histWord, histSentence, updateTranslation]);


  // type 초기화 (예시: "WORD" 또는 "SENTENCE") , 번역
  useEffect(() => {
    const { target } = translation;
    if (!target) return ;

    // WORD,SENTENCE 분별
    const genre = hasWhitespace(target.trim()) ? 'SENTENCE' : 'WORD';
    if (translation.genre !== genre) updateTranslation('genre', genre);
    fetchTrans(); //번역 API
  }, [translation.target]);


  // History 리스트에 추가
  useEffect(() => {
    const { transed, genre, target } = translation;
    if (!transed) return;
    const listSetter = (genre === 'WORD') ? setHistWord : setHistSentence;
    const list = (genre === 'WORD') ? histWord : histSentence;
    if (!list.some(item => (item.target === target)&&(item.transLang === translation.transLang))) listSetter(prev => [...prev, translation]);
  }, [translation.transed, histWord, histSentence]);


  // 게시물 데이터 DB에 저장 API
  const savePostAPI = useCallback( async (dto) => {
    let payLoad = {...dto, id : (dto.id === -1) ? null : dto.id }
    const {success, message, status, data} = await savePost( payLoad );
    if(status==403){
      showSnack( "error", "게시물을 저장하려면 로그인이 필요합니다");
      return;
    };
    if (success) setPost(data)
  },[post,updatePost]);


  // Log
  useEffect(()=>{
    console.log("post Object:", JSON.stringify(post, null, 2));
    // console.log("Translation Object:", JSON.stringify(translation, null, 2));
    // console.log("options Object:", JSON.stringify(options, null, 2));
    // console.log("histWord Object:", JSON.stringify(histWord.length, null, 2));
    // console.log("histWord :", JSON.stringify(histWord, null, 2));
    // console.log("histSentence Object:", JSON.stringify(histSentence.length, null, 2));
    // console.log("modal Object:", JSON.stringify(modal, null, 2));
    // console.log("userInfo Object:", JSON.stringify(userInfo, null, 2));
  },[translation,options,histWord,histSentence,post,modal,userInfo])


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 4, py: 2 }}>

        <Typography variant="h3" sx={{ flex: 3, fontWeight: 'bold' }}>
          {post.title}
        </Typography>

        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>

          {/* 자신이 작성한 게시물, 새로운 게시물 작성 상태 일때 */}
          { (userInfo?.id === post.authorId || Number(id) === -1) &&(
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
          />
          <ArrowForwardIcon />

          <LanguageSelector
            translation={translation}
            updateTranslation={updateTranslation}
            type="trans"
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