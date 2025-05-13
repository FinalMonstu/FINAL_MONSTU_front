import { Box, Grid, Typography, Button, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { postPath } from "../../hooks/urlManager";
import dayjs from "dayjs";

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

export default function LitePosts({ posts }) {
    const navigate = useNavigate();

    const cardOnClick = (id) => { navigate(postPath.to(id)) }

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