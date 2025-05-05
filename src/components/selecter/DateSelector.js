
import { Box, TextField } from "@mui/material";
import DateOptionSelector from "./DateOptionSelector";
import { useEffect, useState } from "react";

export default function DateSelector({filters,setter}){
    const [tempDateFilters, setTempDateFilters] = useState({
        dateOption: "",
        dateStart: "",
        dateEnd: "",
    })

    const handleFilterChange = (key) => (e) => { setTempDateFilters((prev) => ({ ...prev, [key]: e.target.value }));};

    useEffect(()=>{setter(tempDateFilters)},[tempDateFilters])

    useEffect(()=>{
        console.log("tempDateFilters Object:", JSON.stringify(tempDateFilters, null, 2));
    },[tempDateFilters])

    return(
        <Box>
            <DateOptionSelector
                value={tempDateFilters.dateOption} 
                onChange={handleFilterChange("dateOption")}
            />

            <TextField
                size="small"
                label="dateStart-label"
                type="date"
                value={tempDateFilters.dateStart}
                onChange={handleFilterChange("dateStart")}
                slotProps={{ inputLabel: { shrink: true }, }}
            />
            <TextField
                size="small"
                label="dateEnd-label"
                type="date"
                value={tempDateFilters.dateEnd}
                onChange={handleFilterChange("dateEnd")}
                slotProps={{ inputLabel: { shrink: true }, }}
            />
        </Box>
    )
}