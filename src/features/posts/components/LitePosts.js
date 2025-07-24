import { useCallback } from "react";
import { Box, Grid, Typography, Card, CardContent, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";

import { postPath } from "../../../common/hooks/urlManager";
import { deletePostAPI } from "../PostController";
import { useSnack } from "../../../common/components/MultiSnackBar";
import { useAuth } from "../../auth/hooks/AuthContext";

const outerContainer = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  p: 2,
};

const scrollContainer = {
  flexGrow: 1,
  overflowY: "auto",
  mb: 2,
  "&::-webkit-scrollbar": { display: "none", },
};

const gridProps = {
  container: true,
  spacing: { xs: 1, sm: 2, md: 3 },
  rowSpacing: 3,
  justifyContent: "center",
  alignItems: "flex-start",
};

const cardStyles = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  cursor: "pointer",
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: 2,
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: 3,
  },
};

const dateBoxStyles = {
  p: 2,
  pt: 0,
};

export default function LitePosts({ posts, onDelete }) {
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    const showSnack = useSnack();

    const cardOnClick = (id) => { navigate(postPath.to(id)) }

    const handleDelete = useCallback(async (id,e) => {
        e.stopPropagation();
        const { success, message } = await deletePostAPI(id);
        showSnack( (success) ? "info" : "error", message);
        if(success) onDelete(id);
    }, [onDelete]);
    

    return (
        <Box sx={outerContainer}>
            <Box sx={scrollContainer}>
                <Grid {...gridProps}>
                    {Array.isArray(posts) && posts.length > 0 ? (
                        posts.map((post) => (
                            <Grid item xs={12} sm={6} md={4} key={post.id}>
                                <Card
                                    variant="outlined"
                                    sx={cardStyles}
                                    onClick={() => cardOnClick(post.id)}
                                >
                                    {   (userInfo?.role === 'ADMIN' || userInfo?.memberId === post.authorId) &&
                                        <IconButton
                                            size="small"
                                            onClick={(e) => handleDelete(post.id, e)}
                                            sx={{
                                            position: "absolute",
                                            top: 8,
                                            right: 8,
                                            backgroundColor: "rgba(255,255,255,0.8)",
                                            "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
                                            zIndex: 1
                                            }}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    }

                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" noWrap gutterBottom>
                                            {post.title}
                                        </Typography>
                                    </CardContent>
                                    <Box sx={dateBoxStyles}>
                                        <Typography variant="body2" color="text.secondary" noWrap>
                                            {dayjs(post.createdAt).format("YY-MM-DD")}
                                        </Typography>
                                    </Box>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                    <Grid item xs={12}>
                        <Typography align="center" color="text.secondary" py={4}>
                            게시물이 없습니다.
                        </Typography>
                    </Grid>
                    )}
                </Grid>
            </Box>
        </Box>
    );
}