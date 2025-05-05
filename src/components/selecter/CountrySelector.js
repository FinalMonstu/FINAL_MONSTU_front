import React, { useCallback, useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { getCounList } from "../../hooks/controller/PreSetController";

export default function CountrySelect ({value,onChange,allowNone=true}) {
    const [list,setList] = useState([])

    const fetch = useCallback(async () => {
        const result = await getCounList();
        (result.success) ? setList(result.data) : alert(result.message);
    }, []);

    useEffect(()=>{ fetch(); },[fetch])

    return(
        <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="country-label">Country</InputLabel>
            <Select
                label="country-label"
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