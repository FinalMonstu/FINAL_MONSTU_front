import { Box, Button, Stack, TablePagination, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import { useSnack } from "../../../common/components/MultiSnackBar";
import { deletePosts } from "../AdminController";
import DateSelector from "../../preset/components/DateSelector";
import BooleanSelector from "../../preset/components/BooleanSelector";
import ViewCountSelector from "../../preset/components/ViewCountSelector";
import PostsTable from "./PostsTable";
import DetailPost from "./DetailPost";
import { filterPostAPI } from "../../posts/PostController";

export default function PostsBox() {
    const showSnack = useSnack();

    const [filters, setFilters] = useState({
        isPublic: null,
        title: '',
        authorId: '',
    });
    
    const [dateFilters, setDateFilters] = useState({
        dateOption: null,
        dateStart: '',
        dateEnd: '',
    })
    
    const [viewFilters,setViewFilters] = useState({
        viewCount: null,
        viewCountOption: ''
    })

    const [pageOption, setPageOption] = useState({
        totalElements: 0,
        totalPages: 0,
        page: 0,
        size: 20,
    })

    const [data,setData] = useState([])   // Lite Post Information
    const [selected, setSelected] = useState([]); // 체크 박스 선택된 모든 요소 저장
    const [detail,setDetail] = useState(null);  // 상세보기 게시물 ID 저장

    const handleFilterChange = (key) => (e) => { setFilters((prev) => ({ ...prev, [key]: e.target.value }));};
    const updateFilter = useCallback( (field, value) => { setFilters((prev) => ({ ...prev, [field]: value })); }, [] );


    const handlePageChange = (event, newPage) => {
        setPageOption(prev => ({ ...prev, page: newPage }));
        handleSearchBtn({ page: newPage, size: pageOption.size });
    };
    const handleRowsPerPageChange = (event) => {
        const newSize = parseInt(event.target.value, 10);
        setPageOption(prev => ({ ...prev, size: newSize, page: 0 }));
        handleSearchBtn({ page: 0, size: newSize });
    };
    

    //필터링 & 페이징 이용, 여러 게시물 검색
    const filterPost = useCallback(
        async ( {filter,pageable} ) => {
        const {success, data, message} = await filterPostAPI( {filter,pageable} );
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
            isPublic: null,
            title: '',
            authorId: '',
        });
        setDateFilters({
            dateOption: "",
            dateStart: "",
            dateEnd: "",
        })
        setViewFilters({
            viewCount: null,
            viewCountOption: ''
        })
        setPageOption({
            totalElements: 0,
            totalPages: 0,
            number: 0,
            size: 20,
        })
        setSelected([]);
    };

    const handleSearchBtn = useCallback(
        ({ page = pageOption.page, size = pageOption.size } = {}) => {
        // If any date filter field is provided, require all three
        const { dateOption, dateStart, dateEnd } = dateFilters;
        const anyDateProvided = !!(dateOption || dateStart || dateEnd);
        if (anyDateProvided) {
            if (!dateOption || !dateStart || !dateEnd) {
                showSnack('warning', '날짜 필터을 사용하려면 옵션/시작일/종료일을 모두 입력하세요.');
                return;
            }

            // check that end >= start
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
            isPublic : filters?.isPublic,
            title : filters?.title,
            authorId : filters?.authorId,

            dateOption : dateFilters?.dateOption,
            dateStart : dateFilters?.dateStart,
            dateEnd : dateFilters?.dateEnd,

            viewCount : viewFilters?.viewCount,
            viewCountOption : viewFilters?.viewCountOption
        }
        filterPost({ filter, pageable: { page, size } });
        },
        [filters, dateFilters, viewFilters, pageOption.page, pageOption.size]
    );

    const handleDelete = useCallback( async ( ) => {
        const {success, message} = await deletePosts( selected );
        showSnack( (success) ? "info" : "error", message);
        if(success) {
            setSelected([]);
            handleSearchBtn();
        }
    },[selected]);
    
    // 전체 체크박스 선택했을 경우
    const handleSelectAll = useCallback(() => {
        selected.length === data.length
            ? setSelected([])
            : setSelected(data.map(r => r.id))
    }, [selected, data]);

    // 체크박스 하나만 선택했을 경우 
    const handleSelectOne = (id) => {
        setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };


    useEffect(() => { handleSearchBtn() }, []);

    return(
        <Box>
            <Box display="flex" alignItems="center" flexWrap="wrap" gap={1} mb={2}>
                <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
                    <BooleanSelector 
                        value={filters.isPublic}
                        onChange={newValue => updateFilter("isPublic", newValue)}
                        label={"isPublic"}
                    />

                    <TextField
                        size="small"
                        label="title"
                        value={filters.title}
                        onChange={handleFilterChange("title")}
                    />

                    <TextField
                        sx={{maxWidth:110}}
                        size="small"
                        label="authorId"
                        value={filters.authorId}
                        onChange={handleFilterChange("authorId")}
                        InputLabelProps={{
                            shrink: !!filters.authorId
                        }}
                    />

                    {/* <ViewCountSelector
                        viewCount={viewFilters.viewCount}
                        viewCountOption={viewFilters.viewCountOption}
                        onChange={(newFilters) => setViewFilters(prev => ({ ...prev, ...newFilters })) }
                    /> */}

                    <DateSelector
                        addValue={['createdAt','modifiedAt','lastViewAt']}
                        dateOption={dateFilters.dateOption}
                        dateStart={dateFilters.dateStart}
                        dateEnd={dateFilters.dateEnd}
                        onChange={newValues => setDateFilters(prev => ({ ...prev, ...newValues }))}
                    />
                </Box>
                

                <Stack direction="row" spacing={1}>
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

            <PostsTable
                data={data}
                selected={selected}
                onSelectAll={handleSelectAll}
                onSelectOne={handleSelectOne}
                onRowClick={setDetail}
            />

            {/* Post Detail Information Modal*/}
            <DetailPost postId={detail} setter={setDetail} refreshList={handleSearchBtn}/>
        </Box>
    )
}