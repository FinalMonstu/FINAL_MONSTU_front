import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { getPostStatus } from "../../hooks/controller/PreSetController";

export default function PostStatusSelect({value,onChange,allowNone=true}){
    const [list,setList] = useState([])

    const fetch = useCallback(async () => {
        const {success , message ,data} = await getPostStatus();
        (success) ? setList(data) : alert(message);
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
                {allowNone && 
                    <MenuItem value=""> <em>None</em> </MenuItem>
                }
                
                {list.map((v) => (
                    <MenuItem key={v} value={v}>
                        {v}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}