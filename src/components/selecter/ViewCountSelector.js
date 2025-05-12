import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import ComparisonOperatorsSelector from "./ComparisonOperatorsSelector";


export default function ViewCountSelector({viewCount,viewCountOption,onChange}) {
    return (
        <Box display="flex" alignItems="center" gap={1}>
            <TextField
                sx={{maxWidth:110}}
                size="small"
                label="viewCount"
                type="number"
                value={viewCount ?? ""}
                onChange={e => onChange({ viewCount: e.target.value })}
            />

            <ComparisonOperatorsSelector
                value={viewCountOption}
                onChange={e => onChange({ viewCountOption: e.target.value })}
            />
        </Box>
    );
}