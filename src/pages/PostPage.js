import React, { useEffect, useState } from "react";
import ContentBox from "../components/box/ContentBox";
import HistoryWordBox from "../components/box/HistoryWordBox";
import HistorySenBox from "../components/box/HistorySenBox";
import { Box, Button, Fab, Typography } from "@mui/material";
import LanguageSelect from "../components/selecter/LanguageSelect";
import { hasWhitespace } from "../hooks/regexValid";
import { trans } from "../hooks/controller/AiController";
import TransPopover from "../components/popup/TransPopover";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PostOption from "../components/modal/PostOption";
import SettingsIcon from '@mui/icons-material/Settings';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import PostInputModal from "../components/modal/PostInputModal";

function PostPage() {
  const [anchorEl, setAnchorEl] = useState(null);  // Popover의 위치를 저장할 상태
  const [histWord,setHistWord] = useState([]);
  const [histSentence,setHistSentence] = useState([]);

  //PostInput Modal 속성
  const [inputModal,setInputModal] = useState({ isModalOpen : false })

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
  
  // translation 속성값 수정 함수
  const updateTranslation = (field, value) => {
    setTranslation((prev) => ({
      ...prev,   
      [field]: value,  
    }));
  };

  // post 속성값 수정 함수
  const updatePost = (field, value) => {
    setPost((prev) => ({
      ...prev,   
      [field]: value,  
    }));
  };

  // Option 속성값 수정 함수
  const updateOption = (updater) => {
    setOption((prev) => {
      return typeof updater === "function" ? updater(prev) : { ...prev, ...updater };
    });
  };


  //  Text 번역 API
  const fetchTrans = async (translation) => {
    let cachedTrans = search(translation);  //이미 History에 있으면 번역API 사용X
    if(cachedTrans!=null) return updateTranslation("transed",cachedTrans);

    const result = await trans(translation);    //API
    // if(!result?.success) return alert(result.message); //!!!!POPUP BOX로 교체
    console.log("112: "+result?.success && translation.target === result?.data.target);
    if(result?.success && translation.target === result?.data.target) {
      updateTranslation("transed",result?.data.transed);  //translation 초기화
      return  
    }
  };

  const search = (translation) => {
    const found = histWord.find(e => e.target === translation.target);
    return found ? found.transed : null;
  }

  // 사용자가 텍스트를 드래그하면 Popover를 띄움
  const handleSelection = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return; // 선택한 텍스트가 없으면 리턴
  
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
  
    if (rect.width === 0 || rect.height === 0) return; // 빈 공간 선택 방지
  
    setAnchorEl({
      getBoundingClientRect: () => rect,
    });
  };

  // Log
  useEffect(()=>{
    // console.log("post Object:", JSON.stringify(post, null, 2));
  //   console.log("Translation Object:", JSON.stringify(translation, null, 2));
  //   console.log("Option Object:", JSON.stringify(option, null, 2));
    console.log("histWord Object:", JSON.stringify(histWord.length, null, 2));
    console.log("histSentence Object:", JSON.stringify(histSentence.length, null, 2));
  },[translation,option,histWord,histSentence,post])


  // type 초기화 (예시: "word" 또는 "sentence") & 번역 APi이용
  useEffect(() => {
    if (!translation.target) return ;
    const type = !hasWhitespace(translation.target.trim()) ? "WORD" : "SENTENCE";
    
    if (translation.genre !== type) { 
      updateTranslation("genre", type);
    }
    fetchTrans({ ...translation, type });
  }, [translation.target]); 

  // 번역된 텍스트를 화면에 표시
  useEffect(()=>{
    handleSelection();
  },[translation.target])

  // History 리스트에 추가
  useEffect(() => {
    if (!translation.transed) return;
    let cachedTrans = search(translation);  //이미 History에 있으면 추가하지 않음
    if(cachedTrans!=null) return ;

    if (translation.genre === "WORD") {
      setHistWord((prev) => [...prev, translation]);
    } else if (translation.genre === "SENTENCE") {
      setHistSentence((prev) => [...prev, translation]);
    }
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
          <Button 
            sx={{color:"black"}} 
            onClick={()=>setInputModal(prev => ({ ...prev, isModalOpen : true}))}
          >
            <ControlPointIcon sx={{fontSize:33}}/>
          </Button>
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
            <HistoryWordBox list={histWord}/>
          </Box>
        }
      </Box>

      {/* Upload,GoNext_Button & empty_Box*/}
        {/* <Box sx={{
          display: "flex",
          flexDirection: "row",
        }}>
          <Box sx={{
            // boxSizing: "border-box",
            display: "flex",
            width: "75vw",
            minHeight: "3.8vh",
            overflowY: "auto",
            justifyContent: "right",  // 가로 방향 가운데 정렬
            alignItems: "center",       // 세로 방향 가운데 정렬
            gap: "0px"  // 버튼 사이 간격 조절
          }}>
            <Button 
              sx={{color:"black"}} 
              onClick={()=>setInputModal(prev => ({ ...prev, isModalOpen : true}))}
            >
              <ControlPointIcon sx={{fontSize:33}}/>
            </Button>
          </Box>
          <Box sx={{
            boxSizing: "border-box",
            width: "25vw",
            height: "3.5vh",
            overflowY: "auto"
          }}> */}
            {/* Empty Box */}
          {/* </Box>
        </Box> */}

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
              <HistorySenBox list={histSentence}/>
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
        <TransPopover
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          translation={translation}
        />
        <PostOption option={option} setOption={updateOption}/>
        <PostInputModal option={inputModal} setOption={setInputModal} setPost={setPost}/>
    </Box>
  );
}

export default PostPage;
