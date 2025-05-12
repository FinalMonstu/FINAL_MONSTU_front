import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function ComparisonOperatorsSelector({value,onChange}){
    const list = ["less", "more"];

    return(
        <FormControl size="small" sx={{minWidth:130}}>
            <InputLabel id="co-label">Comparison</InputLabel>
            <Select
                label="co-label"
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