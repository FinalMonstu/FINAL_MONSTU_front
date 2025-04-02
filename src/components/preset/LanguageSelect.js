import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getLangList } from "../../hoooks/controller/PreSetController";

export default function LanguageSelect( {translation,updateTranslation,type} ) {
    const [langList,setLangList] = useState([])
    
    // 언어 목록 초기화
    const fetchLangList = async () => {
    const result = await getLangList();
    if(result.success) setLangList(result.data);
    else{ alert(result.message) }
    }

    useEffect(()=>{
        fetchLangList();
    },[])

    return (
      <Autocomplete
        id="language-select"
        sx={{ width: 150 }}
        options={langList}  //Autocomplete 컴포넌트에서 선택할 수 있는 항목들의 리스트를 제공하는 역할
        autoHighlight
        getOptionLabel={(option) => option} // 표시할 라벨 지정
        value={langList.find(lang => lang === (type === "ori" ? translation?.oriLang : translation?.transLang)) || null} // 현재 선택된 언어 표시
        onChange={(e, newValue) => {
          if (newValue) {
            updateTranslation(type === "ori" ? "oriLang" : "transLang", newValue);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={""}
            slotProps={{        
              htmlInput: {
                ...params.inputProps,
                autoComplete: 'new-password', //브라우저의 자동완성을 방지
              },
            }}
          />
        )}
      />
    );
  }