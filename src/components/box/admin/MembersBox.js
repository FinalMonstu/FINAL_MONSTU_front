import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Checkbox,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import CountrySelector from "../../selecter/CountrySelector";
import MemberRoleSelector from "../../selecter/MemberRoleSelector";
import MemberStatusSelector from "../../selecter/MemberStatusSelector";
import DateSelector from "../../selecter/DateSelector";
import { deleteMembers, findMember } from "../../../hooks/controller/MemberController";
import MultiSnackBar from "../../popup/MultiSnackBar";
import AddMemberModal from "../../modal/admin/AddMemberModal";
import DetailMember from "../../modal/admin/DetailMember";

const pageSizeOptions = [10, 20, 50];

export default function MembersBox() {
  const [snackBar,setSnackBar] = useState({ msg : "", option : "", })
  const [filters, setFilters] = useState({
    email: "",
    nickname: "",
    countryCode: null,
    role: null,
    status: null,
  });

  const [dateFilters, setDateFilters] = useState({
    dateOption: null,
    dateStart: "",
    dateEnd: "",
  })

  const [pageOption, setPageOption] = useState({
    totalElements: 0,
    totalPages: 0,
    number: 0,
    size: 20,
  })

  const [modal,setModal] = useState({
    add : false,
  })

  const [data,setData] = useState([])
  const [selected, setSelected] = useState([]);
  const [detail,setDetail] = useState(null);

  const handleFilterChange = (key) => (e) => { setFilters((prev) => ({ ...prev, [key]: e.target.value }));};
  const handlePageOptionChange = (key) => (e) => { setPageOption((prev) => ({ ...prev, [key]: e.target.value }));};
  const updateFilters = useCallback( (field, value) => { setFilters((prev) => ({ ...prev, [field]: value })); }, [] );
  const updateSnackBar = useCallback( (field, value) => setSnackBar((prev) => ({ ...prev, [field]: value, })), [] );
  const handleModal = (key) => { setModal((prev) => ({ ...prev, [key]: !prev[key] }));};
  

  const findMemberAPI = useCallback(
    async ( {filter,pageable} ) => {
      const result = await findMember( {filter,pageable} );
      if (result?.success) {
        setData(result?.data.content);
      }else{
        updateSnackBar("option","error");
        updateSnackBar("msg",result.message);
      }
  },[]);


  const handleResetBtn = () => {
    setFilters({
      countryCode: null,
      email: "",
      nickname: "",
      role: null,
      status: null,
    });
    setDateFilters({
      dateOption: "",
      dateStart: "",
      dateEnd: "",
    })
    setPageOption({
      totalElements: 0,
      totalPages: 0,
      number: 0,
      size: 20,
    })
    setSelected([]);
  };

  const handleSearchBtn = () => {
    const filter = {
      email : filters?.email,
      nickname : filters?.nickname,
      countryCode : filters.countryCode ? filters.countryCode : null,
      role : filters.role ? filters.role : null,
      status : filters.status ? filters.status : null,

      dateOption : dateFilters?.dateOption,
      dateStart : dateFilters?.dateStart,
      dateEnd : dateFilters?.dateEnd,
    }
    const pageable = {
      number: 0,
      size: 20,
    }
    findMemberAPI({filter,pageable});
  };

  const handleDelete = useCallback(
    async ( ) => {
      const result = await deleteMembers( selected );
      if (result?.success) {
        updateSnackBar("option","info");
        updateSnackBar("msg",result.message);
      }else{
        updateSnackBar("option","error");
        updateSnackBar("msg",result.message);
      }
  },[selected]);

  const handleSelectOne = (id) => {
    setSelected(prev => 
      prev.includes(id)
        ? prev.filter(i => i !== id)  // 이미 있으면 제거
        : [...prev, id]               // 없으면 추가
    );
  };

  // Log
  useEffect(()=>{
    // console.log("filters Object:", JSON.stringify(filters, null, 2));
    // console.log("Origin dateFilters Object:", JSON.stringify(dateFilters, null, 2));
    // console.log("pageOption Object:", JSON.stringify(pageOption, null, 2));
    // console.log("modal Object:", JSON.stringify(modal, null, 2));
    // console.log("selected Object:", JSON.stringify(selected, null, 2));
    console.log("detail Object:", JSON.stringify(detail, null, 2));
  },[filters,dateFilters,pageOption,modal,selected,detail])

  return (
    <Box>
      {/* 필터 바 */}
      <Box display="flex" alignItems="center" flexWrap="wrap" gap={1} mb={2}>
        <CountrySelector
          value={filters.countryCode}
          onChange={newValue => updateFilters("countryCode", newValue)}
        />
        <TextField
          size="small"
          label="Email"
          value={filters.email}
          onChange={handleFilterChange("email")}
        />
        <TextField
          size="small"
          label="Nickname"
          value={filters.nickname}
          onChange={handleFilterChange("nickname")}
        />

        <MemberRoleSelector
          value={filters.role}
          onChange={newValue => updateFilters("role", newValue)}
        />

        <MemberStatusSelector
          value={filters.status}
          onChange={newValue => updateFilters("status", newValue)}
        />

        <DateSelector
          filters={dateFilters}
          setter={setDateFilters}
        />

        <FormControl size="small">
          <InputLabel id="size-label">Size</InputLabel>
          <Select
            label="size-label"
            value={pageOption.size}
            onChange={handlePageOptionChange("size")}
          >
            {pageSizeOptions.map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" onClick={()=>handleModal("add")}>
          Add Member
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          DELETE
        </Button>
        <Button variant="outlined" onClick={handleResetBtn}>
          RESET
        </Button>
        <Button variant="contained" onClick={handleSearchBtn}>
          Search
        </Button>
      </Box>

      {/* 테이블 */}
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < data.length
                  }
                  checked={data.length > 0 && selected.length === data.length}
                  onChange={() =>
                    setSelected(
                      selected.length === data.length ? [] : data.map((r) => r.memberId)
                    )
                  }
                />
              </TableCell>
              <TableCell>countryCode</TableCell>
              <TableCell>email</TableCell>
              <TableCell>nickname</TableCell>
              <TableCell>role</TableCell>
              <TableCell>status</TableCell>
              <TableCell>created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.memberId} hover
                onClick={ ()=>{setDetail(row.memberId);} }
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.includes(row.memberId)}
                    onChange={()=>handleSelectOne(row.memberId)}
                  />
                </TableCell>
                <TableCell>{row.countryCode}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.nickName}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Member Modal */}
      <AddMemberModal modalOpen={modal.add} setModal={handleModal}/>

      {/* Member Detail Information Modal*/}
      <DetailMember memberId={detail} setter={setDetail}/>

      <MultiSnackBar snackBar={snackBar} setSnackBar={updateSnackBar}/>

    </Box>
  );
}
