import React, { useCallback, useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { getCounList } from "../../hooks/controller/PreSetController";

export default function CountrySelect ({dto,setter}) {
    const [countries,setCountries] = useState([])

    const fetchCounList = useCallback(async () => {
        const result = await getCounList();
        (result.success) ? setCountries(result.data) : alert(result.message);
      }, []);

    useEffect(()=>{
        fetchCounList();
    },[fetchCounList])

    return(
        <FormControl sx={{ width: 100, height: 30}}>
            <Select
                sx={{ height: 33, fontSize: 15,borderRadius: 1, width: 200, textAlign: 'center'}}
                value={dto.country || ""}
                onChange={(e) => setter("country", e.target.value)}
                displayEmpty
                renderValue={(value) => value || "Select Country"} // 기본 표시값
            >
                {countries.map((coun) => (
                <MenuItem key={coun} value={coun} sx={{ fontSize: 13, minHeight: 30 }}>
                    {coun}
                </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}