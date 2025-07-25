import { useCallback } from "react";
import { Box, Grid, Typography, Card, CardContent, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";

import { postPath } from "../../../common/hooks/urlManager";
import { deletePostAPI } from "../PostController";
import { useSnack } from "../../../common/components/MultiSnackBar";
import { useAuth } from "../../auth/hooks/AuthContext";
import {
  rootSx,
  titleSx,
  infoRowSx,
  scrollContainer,
  gridProps,
  cardStyles,
  iconButtonStyles
} from '../styles/LitePostStyles';


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
        <Box sx={rootSx}>
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
                                            sx={iconButtonStyles}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    }

                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" noWrap gutterBottom sx={titleSx}>
                                            {post.title}
                                        </Typography>
                                    </CardContent>
                                    <Box sx={infoRowSx}>
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