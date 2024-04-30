import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Fab,
} from "@mui/material";
import { Box } from "@mui/system";
// import { useParams } from "react-router-dom";
import { useGetAllBlogPostQuery } from "../apiSlice/blogPost";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from "react";
import { useState } from "react";
import TruncateText from "./TurncateText";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDeleteBlogPostMutation } from "../apiSlice/blogPost";
import BaseConfirmDialog from "./modal/BaseConfirmDialog";

const ListBlogPosts = () => {
  // const params = useParams();

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);

  const [showConfirm, setShowConfirm] = useState(false);

  const { data: initialBlogPosts, initialLoading } = useGetAllBlogPostQuery();

  useEffect(() => {
    setBlogPosts(initialBlogPosts);
    setLoading(initialLoading);
  }, [initialBlogPosts, initialLoading]);

  const fetchMoreData = () => {
    setPage(page + 1);
  };

  const [deleteBlog, { isLoading: deletingBlog }] = useDeleteBlogPostMutation();

  const handleDeleteBlog = async (id) => {
    try {
      await deleteBlog(id).unwrap();
    } catch (error) {
      console.log("Error deleting blog:", error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="80vw"
      marginLeft="17rem"
    >
      <InfiniteScroll
        dataLength={blogPosts?.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more posts</p>}
        style={{ width: "100%", overflow: "visible" }} // Adjust styles as needed
      >
        {!loading && blogPosts?.length === 0 && <p>No blog posts yet!</p>}
        {!loading &&
          blogPosts?.map((blogPost) => (
            <Card key={blogPost._id} style={{ margin: "10px", width: "90%" }}>
              <CardActionArea>
                <CardContent>
                  <div>
                    <Typography gutterBottom variant="h5" component="div">
                      {blogPost?.title}
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "10px",
                      }}
                    >
                      <Fab
                        // loading={isLoading}
                        color="#a341f0"
                        aria-label="delete"
                        onClick={() => setShowConfirm(true)}
                        size="small"
                      >
                        <DeleteIcon />
                      </Fab>

                      <Fab
                        color="#a341f0"
                        aria-label="edit"
                        // onClick={() => (true)}
                        size="small"
                      >
                        <EditIcon />
                      </Fab>
                    </div>
                  </div>

                  <Typography variant="body2" color="text.secondary">
                    {TruncateText(blogPost?.content, 20)}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <BaseConfirmDialog
                fullWidth
                maxWidth="xs"
                loading={deletingBlog}
                open={showConfirm}
                onConfirm={() => handleDeleteBlog(blogPost?._id)}
                onClose={() => setShowConfirm(false)}
              >
                Are you sure you want to delete the Blog?
              </BaseConfirmDialog>
            </Card>
          ))}
      </InfiniteScroll>
    </Box>
  );
};

export default ListBlogPosts;
