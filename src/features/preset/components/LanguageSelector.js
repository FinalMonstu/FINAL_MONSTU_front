import { useCallback, useEffect, useState } from "react";
import { getLangList } from "../PreSetController";
import { FormControl, MenuItem, Select } from "@mui/material";

export default function LanguageSelector( {translation,updateTranslation,type,resetTranslation} ) {
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
          sx={{ height: 33, fontSize: 15, borderRadius: 0 }}
          value={type === "ori" ? translation?.sourceLang : translation?.targetLang || ""}
          onChange={(e) => {
            const selectedLang = e.target.value;
            if (type === "ori") {
              resetTranslation(selectedLang, translation.targetLang);
            } else {
              resetTranslation(translation.sourceLang, selectedLang);
            }
          }}
          displayEmpty
          renderValue={(selected) => selected || "Select"}
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