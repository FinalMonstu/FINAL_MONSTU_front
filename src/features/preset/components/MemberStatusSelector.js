import { useCallback, useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { getMemStatus } from "../PreSetController";

export default function MemberStatusSelector ({value,onChange,allowNone=true}) {
    const [list,setList] = useState([null])

    const fetch = useCallback(async () => {
        const result = await getMemStatus();
        (result.success) ? setList(result.data) : alert(result.message);
    }, []);

    useEffect(()=>{
        fetch();
    },[fetch])

    return(
        <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
                label="status-label"
                value={value || ""}
                onChange={e => onChange(e.target.value)}
            >
                {allowNone && <MenuItem value={null}> <em>None</em> </MenuItem>}

                {list.map((v) => (
                    <MenuItem key={v} value={v}>
                        {v}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}