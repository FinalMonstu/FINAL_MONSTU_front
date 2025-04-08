import React, { useCallback, useEffect, useState } from "react";
import ContentBox from "../components/box/ContentBox";
import HistoryWordBox from "../components/box/HistoryWordBox";
import HistorySenBox from "../components/box/HistorySenBox";
import { Box, Button, Typography } from "@mui/material";
import LanguageSelect from "../components/selecter/LanguageSelect";
import { hasWhitespace } from "../hooks/regexValid";
import { trans } from "../hooks/controller/AiController";
import TransPopover from "../components/popup/TransPopover";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PostOption from "../components/modal/PostOption";
import SettingsIcon from '@mui/icons-material/Settings';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import PostInputModal from "../components/modal/PostInputModal";
import MultiSnackBar from "../components/popup/MultiSnackBar";
import TripOriginSharpIcon from '@mui/icons-material/TripOriginSharp';

function PostPage() {
  const [anchorEl, setAnchorEl] = useState(null);  // Popover의 위치를 저장할 상태
  const [histWord,setHistWord] = useState([]);
  const [histSentence,setHistSentence] = useState([]);
  const [inputModal,setInputModal] = useState({ isModalOpen : false })  //PostInput Modal 속성
  const [snackBar,setSnackBar] = useState({
    msg : "",
    option : "",
  })

  //Option Modal 속성
  const [option,setOption] = useState({
    isModalOpen : false, 
    viewWord : true,
    viewSentence : true,
  })

  const [post, setPost] = useState({
    id : null,
    title: "René Descartes",   
    content: "It is not enough to have a good mind\nthe main thing is to use it well.",
    createdAt : null,
    modifiedAt : null,
    status : null,
    isPublic : null,
    authorId : null,
    nickName : null,
    tags : null,  //List<TagDTO>
  });

  const [postByAi, setPostByAi] = useState({
    title: "René Descartes",   
    content: "It is not enough to have a good mind\nthe main thing is to use it well.",
  });

  const [translation, setTranslation] = useState({
    id : "",  //단어 ID
    memberId : "",  // 회원 ID
    postId : "",  //게시물 ID
    target: "",    // 번역할 단어 또는 문장
    transed: "", // 번역된 단어 또는 문장
    oriLang: "",      // 원본 언어
    transLang: "Korean",    // 번역된 언어
    genre : "", //WORD,SENTENCE
  }); 
  

  // 상태 업데이트 헬퍼 함수들
    const updateTranslation = useCallback( (field, value) => setTranslation((prev) => ({ ...prev, [field]: value, })),  []);
    const updatePost = useCallback((field, value) =>setPost((prev) => ({...prev, [field]: value, })), [] );
    const updateOption = useCallback( (updater) => setOption((prev) => typeof updater === "function" ? updater(prev) : { ...prev, ...updater } ), [] );
    const updateSnackBar = useCallback( (field, value) => setSnackBar((prev) => ({ ...prev, [field]: value, })), [] );
  
    const deleteWord = useCallback( (target) => setHistWord((prev) => prev.filter((item) => item.target !== target)), [] );
    const deleteSent = useCallback( (target) => setHistSentence((prev) => prev.filter((item) => item.target !== target)),  [] );

  // History에 이미 값이 있으면 이미 추가된 요소의 transed를 반환환
  const searchHistory = useCallback((translation) => {
    const history = (translation?.genre === "SENTENCE") ? histSentence : histWord;
    return history.find(e => e.target === translation.target)?.transed || null;
  }, [translation.target,histSentence,histWord]);

  //  Text 번역 API
  const fetchTrans = async () => {
    const cachedTrans = searchHistory(translation);  //translation가 이미 History에 저장된 요소인지 확인
    if (cachedTrans) { updateTranslation("transed", cachedTrans); return; } 
    const result = await trans(translation);  // 번역 API
    if (!result?.success || translation.target !== result?.data.target) { //번역 실패 시
      updateSnackBar("option","error"); 
      updateSnackBar("msg",result.message); 
      return;} 
    updateTranslation("transed", result.data.transed);  //translation.transed 초기화
  };
  
  // 사용자가 텍스트를 드래그하면 Popover를 띄움
  const handleSelection = useCallback(() => {
      const selection = window.getSelection();
      if (!selection?.rangeCount) return;
      const rect = selection.getRangeAt(0).getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      setAnchorEl({ getBoundingClientRect: () => rect });
  }, []);

  // WORD,SENTENCE 분별
  const disGenre = useCallback((text) => { return !hasWhitespace(text.trim()) ? "WORD" : "SENTENCE";  },[])


  // Log
  useEffect(()=>{
    // console.log("post Object:", JSON.stringify(post, null, 2));
    console.log("Translation Object:", JSON.stringify(translation, null, 2));
  //   console.log("Option Object:", JSON.stringify(option, null, 2));
    console.log("histWord Object:", JSON.stringify(histWord.length, null, 2));
    // console.log("histWord :", JSON.stringify(histWord, null, 2));
    // console.log("histSentence Object:", JSON.stringify(histSentence.length, null, 2));
  },[translation,option,histWord,histSentence,post])

  // type 초기화 (예시: "WORD" 또는 "SENTENCE") & 번역 APi이용
  useEffect(() => {
    if (!translation.target) return ;
    const type = disGenre(translation.target);  // 단어,문장 분별
    if (translation.genre !== type) updateTranslation("genre", type); 
    fetchTrans(); //번역 API
    handleSelection();  //번역된 텍스트를 화면에 표시
  }, [translation.target]); 

  // History 리스트에 추가
  useEffect(() => {
    if (!translation.transed || searchHistory(translation)!=null) return;
    (translation.genre === "WORD" ? setHistWord : setHistSentence)(prev => [...prev, translation]);
  }, [translation.transed]);

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Title_Section & Menu_Option_Bar */}
      <Box sx={{
        display: "flex",
        flexDirection: "row",
      }}>
          <Typography variant="h3" sx={{
            boxSizing: "border-box",
            width: "75vw",
            height: "5vh",
            paddingLeft: "40px",
            overflowY: "auto",
            fontWeight: "bold"
          }}>
            {post.title}
          </Typography>

          {/* 게시물 수정 버튼, 문장 생성 API 버튼 */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
            <Button sx={{ color: "black", minWidth: "auto" }} onClick={() => setInputModal(prev => ({ ...prev, isModalOpen: true }))}>
              <ControlPointIcon sx={{ fontSize: 33 }} />
            </Button>
            <Button sx={{ color: "black", minWidth: "auto" }} onClick={() => setInputModal(prev => ({ ...prev, isModalOpen: true }))}>
              <TripOriginSharpIcon sx={{ fontSize: 33 }} />
            </Button>
          </Box>
          
          <Box sx={{
            boxSizing: "border-box",
            width: "25vw",
            height: "5vh",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",  // 가로 방향 가운데 정렬
            alignItems: "center",       // 세로 방향 가운데 정렬
          }}>
            <LanguageSelect translation={translation} updateTranslation={updateTranslation} type="ori"/>
            <ArrowForwardIcon sx={{padding:0.8,fontSize:"19px",color:"black",}}/>  {/* 화살표 아이콘 */}
            <LanguageSelect translation={translation} updateTranslation={updateTranslation} type="trans"/>
            <Button sx={{}} onClick={()=>updateOption(prev => ({ ...prev, isModalOpen : true}))}><SettingsIcon sx={{color:"black"}}/></Button>
          </Box>
      </Box>

      {/* Content_Section & History_Words */}
      <Box sx={{
        display: "flex",
        flexDirection: "row",
      }}>
        <Box sx={{
          boxSizing: "border-box",
          width: option.viewWord ? "75vw" : "100vw",
          height: option.viewSentence ? "60vh" : "85vh",
          overflowY: "auto"
        }}>
          <ContentBox translation={translation} updateTranslation={updateTranslation} post={post}/>
        </Box>
        {option.viewWord &&
          <Box sx={{
            boxSizing: "border-box",
            width: "25vw",
            height: option.viewSentence ? "60vh" : "85vh",
            overflowY: "auto"
          }}>
            <HistoryWordBox list={histWord} handleDelete={deleteWord}/>
          </Box>
        }
      </Box>

      {/* History_Sentences_Section & empty_Box */}
        { option.viewSentence &&
          <Box sx={{
            display: "flex",
            flexDirection: "row",
          }}>
            <Box sx={{
              boxSizing: "border-box",
              width: "75vw",
              height: "25vh",
              overflowY: "auto"
            }}>
              <HistorySenBox list={histSentence} handleDelete={deleteSent}/>
            </Box>
            <Box sx={{
              boxSizing: "border-box",
              width: "25vw",
              height: "25vh",
              overflowY: "auto"
            }}>
              {/* Empty_Box */}
            </Box>
          </Box>
        }

        {/* Popover 컴포넌트 (드래그한 텍스트에 대한 번역 표시) */}
        <TransPopover anchorEl={anchorEl} setAnchorEl={setAnchorEl} translation={translation} />
        {/* Option Modal */}
        <PostOption option={option} setOption={updateOption}/>
        {/* 게시물 추가 Modal */}
        <PostInputModal option={inputModal} setOption={setInputModal} setPost={setPost}/>
        {/* PopupBox */}
        <MultiSnackBar snackBar={snackBar} setSnackBar={updateSnackBar}/>
    </Box>
  );
}

export default PostPage;
