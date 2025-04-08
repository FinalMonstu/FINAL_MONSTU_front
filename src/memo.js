import React, { useCallback, useEffect, useState } from "react";
import ContentBox from "../components/box/ContentBox";
import HistoryWordBox from "../components/box/HistoryWordBox";
import HistorySenBox from "../components/box/HistorySenBox";
import { Box, Button, Typography } from "@mui/material";
import LanguageSelect from "../components/selecter/LanguageSelect";
import { hasWhitespace } from "../hooks/regexValid";
import { trans } from "../hooks/controller/AiController";
import TransPopover from "../components/popup/TransPopover";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PostOption from "../components/modal/PostOption";
import SettingsIcon from "@mui/icons-material/Settings";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import PostInputModal from "../components/modal/PostInputModal";
import MultiSnackBar from "../components/popup/MultiSnackBar";
import TripOriginSharpIcon from "@mui/icons-material/TripOriginSharp";

function PostPage() {
  // 모달, 팝업, 데이터 상태
  const [anchorEl, setAnchorEl] = useState(null);
  const [histWord, setHistWord] = useState([]);
  const [histSentence, setHistSentence] = useState([]);
  const [inputModal, setInputModal] = useState({ isModalOpen: false });
  const [snackBar, setSnackBar] = useState({ msg: "", option: "" });

  const [option, setOption] = useState({
    isModalOpen: false,
    viewWord: true,
    viewSentence: true,
  });

  const [post, setPost] = useState({
    id: null,
    title: "René Descartes",
    content:
      "It is not enough to have a good mind\nthe main thing is to use it well.",
    createdAt: null,
    modifiedAt: null,
    status: null,
    isPublic: null,
    authorId: null,
    nickName: null,
    tags: null,
  });

  const [postByAi, setPostByAi] = useState({
    title: "René Descartes",
    content:
      "It is not enough to have a good mind\nthe main thing is to use it well.",
  });

  const [translation, setTranslation] = useState({
    id: "",
    memberId: "",
    postId: "",
    target: "",
    transed: "",
    oriLang: "",
    transLang: "Korean",
    genre: "",
  });

  const { target, transed, genre } = translation;

  // 상태 업데이트 헬퍼 함수들
  const updateTranslation = useCallback( (field, value) => setTranslation((prev) => ({ ...prev, [field]: value, })),  []);
  const updatePost = useCallback((field, value) =>setPost((prev) => ({...prev, [field]: value, })), [] );
  const updateOption = useCallback( (updater) => setOption((prev) => typeof updater === "function" ? updater(prev) : { ...prev, ...updater } ), [] );
  const updateSnackBar = useCallback( (field, value) => setSnackBar((prev) => ({ ...prev, [field]: value, })), [] );

  const deleteWord = useCallback( (target) => setHistWord((prev) => prev.filter((item) => item.target !== target)), [] );
  const deleteSent = useCallback( (target) => setHistSentence((prev) => prev.filter((item) => item.target !== target)),  [] );

  // history에 이미 값이 있으면 기존의 번역 값을 반환
  const searchHistory = useCallback(
    (target, genre) => {
      const history = genre === "SENTENCE" ? histSentence : histWord;
      return history.find((item) => item.target === target)?.transed || null;
    },
    [histSentence, histWord]
  );

  // 텍스트 번역 API 호출
  const fetchTrans = useCallback(async () => {
    if (!target) return;
    const cachedTrans = searchHistory(target, genre);
    if (cachedTrans) {
      updateTranslation("transed", cachedTrans);
      return;
    }
    const result = await trans(translation);
    if (!result?.success || target !== result?.data?.target) {
      updateSnackBar("option", "error");
      updateSnackBar("msg", result?.message);
      return;
    }
    updateTranslation("transed", result.data.transed);
  }, [target, genre, searchHistory, updateSnackBar, updateTranslation,transed]);

  // 드래그한 텍스트의 위치를 기준으로 Popover 띄우기
  const handleSelection = useCallback(() => {
    const selection = window.getSelection();
    if (!selection?.rangeCount) return;
    const rect = selection.getRangeAt(0).getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    setAnchorEl({ getBoundingClientRect: () => rect });
  }, []);

  // TEXT가 WORD인지 SENTENCE인지 판별
  const disGenre = useCallback(
    (text) => (!hasWhitespace(text.trim()) ? "WORD" : "SENTENCE"),
    []
  );

  // 번역 관련 useEffect
  useEffect(() => {
    if (!target) return;
    const type = disGenre(target);
    if (genre !== type) {
      updateTranslation("genre", type);
    }
    fetchTrans();
    handleSelection();
  }, [target, genre, disGenre, fetchTrans, handleSelection, updateTranslation]);

  // History에 새로 번역된 값이 있으면 추가
  useEffect(() => {
    if (!transed || searchHistory(target, genre) !== null) return;
    if (genre === "WORD") {
      setHistWord((prev) => [...prev, translation]);
    } else {
      setHistSentence((prev) => [...prev, translation]);
    }
  }, [transed, target, genre, searchHistory]);

  // Log (디버깅 용도)
  useEffect(() => {
    console.log("Translation Object:", JSON.stringify(translation, null, 2));
    console.log("histWord length:", histWord.length);
  }, [translation, histWord]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* Title Section & Menu Option Bar */}
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Typography
          variant="h3"
          sx={{
            boxSizing: "border-box",
            width: "75vw",
            height: "5vh",
            paddingLeft: "40px",
            overflowY: "auto",
            fontWeight: "bold",
          }}
        >
          {post.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
          <Button
            sx={{ color: "black", minWidth: "auto" }}
            onClick={() =>
              setInputModal((prev) => ({ ...prev, isModalOpen: true }))
            }
          >
            <ControlPointIcon sx={{ fontSize: 33 }} />
          </Button>
          <Button
            sx={{ color: "black", minWidth: "auto" }}
            onClick={() =>
              setInputModal((prev) => ({ ...prev, isModalOpen: true }))
            }
          >
            <TripOriginSharpIcon sx={{ fontSize: 33 }} />
          </Button>
        </Box>
        <Box
          sx={{
            boxSizing: "border-box",
            width: "25vw",
            height: "5vh",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LanguageSelect
            translation={translation}
            updateTranslation={updateTranslation}
            type="ori"
          />
          <ArrowForwardIcon
            sx={{ padding: 0.8, fontSize: "19px", color: "black" }}
          />
          <LanguageSelect
            translation={translation}
            updateTranslation={updateTranslation}
            type="trans"
          />
          <Button
            onClick={() =>
              updateOption((prev) => ({ ...prev, isModalOpen: true }))
            }
          >
            <SettingsIcon sx={{ color: "black" }} />
          </Button>
        </Box>
      </Box>

      {/* Content Section & History_Word */}
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            boxSizing: "border-box",
            width: option.viewWord ? "75vw" : "100vw",
            height: option.viewSentence ? "60vh" : "85vh",
            overflowY: "auto",
          }}
        >
          <ContentBox
            translation={translation}
            updateTranslation={updateTranslation}
            post={post}
          />
        </Box>
        {option.viewWord && (
          <Box
            sx={{
              boxSizing: "border-box",
              width: "25vw",
              height: option.viewSentence ? "60vh" : "85vh",
              overflowY: "auto",
            }}
          >
            <HistoryWordBox list={histWord} handleDelete={deleteWord} />
          </Box>
        )}
      </Box>

      {/* History Sentence Section & 빈 Box */}
      {option.viewSentence && (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            sx={{
              boxSizing: "border-box",
              width: "75vw",
              height: "25vh",
              overflowY: "auto",
            }}
          >
            <HistorySenBox list={histSentence} handleDelete={deleteSent} />
          </Box>
          <Box
            sx={{
              boxSizing: "border-box",
              width: "25vw",
              height: "25vh",
              overflowY: "auto",
            }}
          >
            {/* Empty_Box */}
          </Box>
        </Box>
      )}

      {/* Popover 및 모달 */}
      <TransPopover
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        translation={translation}
      />
      <PostOption option={option} setOption={updateOption} />
      <PostInputModal
        option={inputModal}
        setOption={setInputModal}
        setPost={setPost}
      />
      <MultiSnackBar snackBar={snackBar} setSnackBar={updateSnackBar} />
    </Box>
  );
}

export default PostPage;
