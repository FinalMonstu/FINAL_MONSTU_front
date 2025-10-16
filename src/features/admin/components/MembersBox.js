import { useState, useCallback, useEffect } from "react";
import { Box, TextField, Button, Stack, TablePagination } from "@mui/material";

import CountrySelector from "../../preset/components/CountrySelector";
import MemberRoleSelector from "../../preset/components/MemberRoleSelector";
import MemberStatusSelector from "../../preset/components/MemberStatusSelector";
import DateSelector from "../../preset/components/DateSelector";

import { deleteMembers, filterMemberAPI } from "../AdminController";
import { useSnack } from "../../../common/components/MultiSnackBar";
import CreateMemberModal from "./CreateMemberModal";
import DetailMember from "./DetailMember";
import MemberTable from "./MemberTable";

/* 
  어드민 페이지의 회원관리 박스
*/
export default function MembersBox() {
  const showSnack = useSnack();

  const [filters, setFilters] = useState({
    email      : "",
    nickname   : "",
    countryCode: null,  
    role       : null,  
    status     : null,  
  });

  const [dateFilters, setDateFilters] = useState({
    dateOption : null,  
    dateStart  : "",    
    dateEnd    : "",    
  })

  const [pageOption, setPageOption] = useState({
    totalElements : 0,
    totalPages    : 0,
    page          : 0,
    size          : 20,
  })

  // 모달 여닫이 옵션
  const [modal,setModal] = useState({ add : false })

  const [data,setData]          = useState([])     // Members Information
  const [selected, setSelected] = useState([]);    // 체크 박스 선택된 모든 요소 저장
  const [detail,setDetail]      = useState(null);  // 상세보기 게시물 ID 저장


  // useState 속성 헨들러
  const handleFilterChange = (key) => (e) => { setFilters((prev) => ({ ...prev, [key]: e.target.value }));};
  const toggleModal        = (key) => { setModal((prev) => ({ ...prev, [key]: !prev[key] }));};
  const updateFilters      = useCallback( (field, value) => { setFilters((prev) => ({ ...prev, [field]: value })); }, [] );

  // 페이징 이용, 여러 유저 검색
  const handlePageChange = (event, newPage) => {
      setPageOption(prev => ({ ...prev, page: newPage }));
      handleSearchBtn({ page: newPage, size: pageOption.size });
  };
  const handleRowsPerPageChange = (event) => {
      const newSize = parseInt(event.target.value, 10);
      setPageOption(prev => ({ ...prev, size: newSize, page: 0 }));
      handleSearchBtn({ page: 0, size: newSize });
  };

  // 필터링 & 페이징 이용, 여러 유저 검색
  const getFilterMemberAPI = useCallback(
    async ( {filter,pageable} ) => {
      const {success, message, data } = await filterMemberAPI( {filter,pageable} );
      if(success){
        setData(data.content);
        setPageOption(prev => ({ ...prev,
          totalElements: data.totalElements,
          totalPages: data.totalPages,
          page: data.number,
          size: data.size,
        }));
      }else{
        showSnack("error", message);
      }
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
      page: 0,
      size: 20,
    })
    setSelected([]);
  };

  const handleSearchBtn = useCallback(
    ({ page = pageOption.page, size = pageOption.size } = {}) => {
      // Date validation: if any date field is provided, require all three and ensure end >= start
      const { dateOption, dateStart, dateEnd } = dateFilters;
      const anyDateProvided = !!(dateOption || dateStart || dateEnd);
      if (anyDateProvided) {
        if (!dateOption || !dateStart || !dateEnd) {
          showSnack('warning', '날짜 필터를 사용하려면 옵션/시작일/종료일을 모두 입력하세요.');
          return;
        }
        const start = new Date(dateStart);
        const end = new Date(dateEnd);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
          showSnack('warning', '날짜 형식이 올바르지 않습니다.');
          return;
        }
        if (end < start) {
          showSnack('warning', '종료일은 시작일보다 이전일 수 없습니다.');
          return;
        }
      }

      const filter = {
        email:       filters.email,
        nickname:    filters.nickname,
        countryCode: filters.countryCode,
        role:        filters.role,
        status:      filters.status,
        dateOption:  dateFilters.dateOption,
        dateStart:   dateFilters.dateStart,
        dateEnd:     dateFilters.dateEnd,
      };
      getFilterMemberAPI({ filter, pageable: { page, size } });
    },
    [filters, dateFilters, getFilterMemberAPI, pageOption.page, pageOption.size]
  );

  const handleDelete = useCallback(
    async ( ) => {
      const {success, message} = await deleteMembers( selected );
      if(success) {handleSearchBtn()}
      showSnack( (success) ? "info" : "error", message);
  },[selected]);

  // 전체 체크박스 선택했을 경우
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

  useEffect(() => { handleSearchBtn() }, []);

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
            addValue={['createdAt','updatedAt']}
            dateOption={dateFilters.dateOption}
            dateStart={dateFilters.dateStart}
            dateEnd={dateFilters.dateEnd}
            onChange={newValues => setDateFilters(prev => ({ ...prev, ...newValues }))}
        />

        <Stack direction="row" spacing={1}>
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
        </Stack>
      </Box>

      <TablePagination
        component="div"
        count={pageOption.totalElements}      // 전체 아이템 수
        page={pageOption.page}                // 0-based 현재 페이지
        onPageChange={handlePageChange}
        rowsPerPage={pageOption.size}         // 한 페이지당 항목 수
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 20, 50]}   // 선택 가능한 옵션
      />

      <MemberTable
        data={data}
        selected={selected}
        onSelectAll={handleSelectAll}
        onSelectOne={handleSelectOne}
        onRowClick={setDetail}
      />

      {/* Add Member Modal */}
      <CreateMemberModal modalOpen={modal.add} toggleModal={toggleModal} onSuccess={handleSearchBtn}/>

      {/* Member Detail Information Modal*/}
      <DetailMember memberId={detail} setter={setDetail} onSuccess={handleSearchBtn} />


    </Box>
  );
}
