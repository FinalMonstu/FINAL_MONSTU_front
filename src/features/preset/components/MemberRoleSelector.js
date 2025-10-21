import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { getMemRole } from "../PreSetController";
import { useCallback, useEffect, useState } from "react";

export default function MemberRoleSelect({value,onChange,allowNone=true}){
    const [list,setList] = useState([])
    
    const fetch = useCallback(async () => {
        const result = await getMemRole();
        (result.success) ? setList(result.data) : alert(result.message);
    }, []);

    useEffect(()=>{
        fetch();
    },[fetch])
    
    return(
        <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
                labelId="role-label"
                label="Role"
                value={value ?? ''}
                onChange={e => onChange(e.target.value)}
                displayEmpty
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