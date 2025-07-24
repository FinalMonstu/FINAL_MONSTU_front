import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function BooleanSelector({value,onChange,label,allowNone=true}) {
     return(
        <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="label">{label}</InputLabel>
            <Select
                label="label"
                value={value}
                onChange={e => onChange(e.target.value)}
            >
                {allowNone && <MenuItem value={null}> <em>None</em> </MenuItem>}
                <MenuItem value="true"> true </MenuItem>
                <MenuItem value="false"> false </MenuItem>
            </Select>
        </FormControl>
    );
}