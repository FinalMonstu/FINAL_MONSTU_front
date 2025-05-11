import React, { useState, useEffect, useCallback } from "react";
import { Box, TextField, Button } from "@mui/material";
import CountrySelector from "../../selecter/CountrySelector";
import MemberRoleSelector from "../../selecter/MemberRoleSelector";
import MemberStatusSelector from "../../selecter/MemberStatusSelector";
import DateSelector from "../../selecter/DateSelector";
import { deleteMembers, findMember } from "../../../hooks/controller/MemberController";
import { useSnack } from "../../popup/MultiSnackBar";
import AddMemberModal from "../../modal/admin/AddMemberModal";
import DetailMember from "../../modal/admin/DetailMember";
import SizeSelector from "../../selecter/SizeSelector";
import MemberTable from "../../table/MemberTable";

/* 
  역할 : 어드민 페이지 -> 회원관리 박스
  인증 : ADMIN만 사용가능
  기능 : 
    회원 정보 필터링 검색,
    회원 추가, 회원 삭제, 회원정보 상세보기
*/
export default function MembersBox() {
  const showSnack = useSnack();

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

  // 모달 여닫이 옵션션
  const [modal,setModal] = useState({
    add : false,
  })

  const [data,setData] = useState([])   // Members Information
  const [selected, setSelected] = useState([]); // 체크 박스 선택된 모든 요소 저장
  const [detail,setDetail] = useState(null);  // 상세보기 게시물 ID 저장


  // useState 속성 헨들러러
  const handleFilterChange = (key) => (e) => { setFilters((prev) => ({ ...prev, [key]: e.target.value }));};
  const toggleModal = (key) => { setModal((prev) => ({ ...prev, [key]: !prev[key] }));};
  const updatePageOptionChange = (field, value) => { setPageOption(prev => ({ ...prev, [field]: value })); };
  const updateFilters = useCallback( (field, value) => { setFilters((prev) => ({ ...prev, [field]: value })); }, [] );


  // 필터링 & 페이징 이용, 여러 유저 검색
  const getFilterMemberAPI = useCallback(
    async ( {filter,pageable} ) => {
      const result = await findMember( {filter,pageable} );
      result?.success
        ? setData(result?.data.content)
        : showSnack("error", result.message);
  },[]);

  // Reset 버튼, 필터링 조건 & 선택된 요소 초기화
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
    getFilterMemberAPI({filter,pageable});
  };

  const handleDelete = useCallback(
    async ( ) => {
      const result = await deleteMembers( selected );
      result?.success 
        ? showSnack("info", result.message)
        : showSnack("error", result.message);
  },[selected]);

  // 전체 체크박스스 선택했을 경우
  const handleSelectAll = useCallback(() => {
    selected.length === data.length
      ? setSelected([])
      : setSelected(data.map(r => r.memberId))
  }, [selected, data]);

  // 체크박스 하나만 선택했을 경우 
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
    // console.log("data Object:", JSON.stringify(data, null, 2));
    // console.log("selected Object:", JSON.stringify(selected, null, 2));
    // console.log("detail Object:", JSON.stringify(detail, null, 2));
  },[filters,dateFilters,pageOption,modal,selected,detail,data])

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
          setter={setDateFilters}
        />

        <SizeSelector
          value={pageOption.size}
          onChange={newValue => updatePageOptionChange("size", newValue)}
        />

        <Button variant="contained" onClick={()=>toggleModal("add")}>
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

      <MemberTable
        data={data}
        selected={selected}
        onSelectAll={handleSelectAll}
        onSelectOne={handleSelectOne}
        onRowClick={setDetail}
      />

      {/* Add Member Modal */}
      <AddMemberModal modalOpen={modal.add} toggleModal={toggleModal}/>

      {/* Member Detail Information Modal*/}
      <DetailMember memberId={detail} setter={setDetail}/>

    </Box>
  );
}
