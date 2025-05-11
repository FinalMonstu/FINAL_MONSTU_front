import React, { useCallback, useEffect, useState } from "react";
import { getLangList } from "../../hooks/controller/PreSetController";
import { FormControl, MenuItem, Select } from "@mui/material";

export default function LanguageSelector( {translation,updateTranslation,type} ) {
    const [langList,setLangList] = useState([])
    
    // 언어 목록 초기화
    const fetchLangList = useCallback(
      async () => {
        const result = await getLangList();
        (result.success) ? setLangList(result.data) : alert(result.message);
      },[])

    useEffect(()=>{
      fetchLangList();
    },[fetchLangList])

    return (
      <FormControl sx={{ width: 100, height: 30}}>
        <Select
          sx={{ height: 33, fontSize: 15,borderRadius: 0}}
          value={type === "ori" ? translation?.oriLang : translation?.transLang || ""}
          onChange={(e) => updateTranslation(type === "ori" ? "oriLang" : "transLang", e.target.value)}
          displayEmpty
          renderValue={(selected) => selected || "Select"} // 기본 표시값
        >
          {langList.map((lang) => (
            <MenuItem key={lang} value={lang} sx={{ fontSize: 13, minHeight: 30 }}>
              {lang}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }