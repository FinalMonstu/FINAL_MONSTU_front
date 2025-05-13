import { Box, Button } from "@mui/material";

export default function PageMoreButton({pageable,setPageable}){
    const {page,totalPages} = pageable;

    const handleMoreBtn = () => {
        if (page + 1 < totalPages) setPageable((prev) => ({ ...prev, page: prev.page + 1 }));
    };
    
    return(
        <Box textAlign="center" py={1}>
            <Button
                variant="contained"
                size="small"
                disabled={page + 1 >= totalPages}
                onClick={handleMoreBtn}
            >
                More
            </Button>
        </Box>
    )
}