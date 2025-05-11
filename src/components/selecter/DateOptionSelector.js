import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

/* 
  역할 : 날짜 옵션 목록 선택창
  기능 : 날짜 옵션 목록 초기화
*/
export default function DateOptionSelector({value,onChange}){
    const list = ["createdAt", "updatedAt"];

    return(
        <FormControl size="small" sx={{ minWidth: 130 }}>
            <InputLabel id="dateOption-label">Date Option</InputLabel>
            <Select
                label="dateOption-label"
                value={value || ""}
                onChange={onChange}
            >
                <MenuItem value=""> <em>None</em> </MenuItem> 
                {list.map((v) => (
                    <MenuItem key={v} value={v}>
                        {v}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}