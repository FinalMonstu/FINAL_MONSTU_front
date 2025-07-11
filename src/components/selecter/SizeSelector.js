import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const pageSizeOptions = [3,10, 20, 50];

export default function SizeSelector ({value,onChange}) {
    return(
        <FormControl size="small">
          <InputLabel id="size-label">Size</InputLabel>
          <Select
            label="size-label"
            value={value || 10}
            onChange={e => onChange({ size: e.target.value })}
          >
            {pageSizeOptions.map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
    )
}