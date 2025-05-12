
import { Box, TextField } from "@mui/material";
import DateOptionSelector from "./DateOptionSelector";

/* 
  역할 : 날짜 정보 세트 입력창 (날짜 종류 & 시작일 & 종료일)
  기능 : 날짜 종류 & 시작일 & 종료일 정보 초기화
*/
export default function DateSelector({addValue, dateOption, dateStart, dateEnd, onChange}){
   
    return (
        <Box display="flex" alignItems="center" gap={1}>
            <DateOptionSelector
                addValue={addValue}
                value={dateOption || ""}
                onChange={e => onChange({ dateOption: e.target.value })}
            />

            <TextField
                size="small"
                label="Start"
                type="date"
                value={dateStart}
                onChange={e => onChange({ dateStart: e.target.value })}
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                size="small"
                label="End"
                type="date"
                value={dateEnd}
                onChange={e => onChange({ dateEnd: e.target.value })}
                InputLabelProps={{ shrink: true }}
            />
        </Box>
    );
}