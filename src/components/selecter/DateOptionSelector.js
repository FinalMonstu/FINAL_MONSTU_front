import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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