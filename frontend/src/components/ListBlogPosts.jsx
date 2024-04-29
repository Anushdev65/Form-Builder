import React from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useGetAllBlogPostQuery } from "../apiSlice/blogPost";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from "react";
import { useState } from "react";

const ListBlogPosts = () => {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);

  const { data: initialBlogPosts = [], initialLoading } =
    useGetAllBlogPostQuery();

  useEffect(() => {
    setBlogPosts(initialBlogPosts);
    setLoading(initialLoading);
  }, [initialBlogPosts, initialLoading]);

  const fetchMoreData = () => {
    setPage(page + 1);
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
        dataLength={blogPosts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more posts</p>}
        style={{ width: "100%", overflow: "visible" }} // Adjust styles as needed
      >
        {loading && <h4>Loading...</h4>}
        {!loading && blogPosts.length === 0 && <p>No blog posts yet!</p>}
        {!loading &&
          blogPosts.map((blogPost) => (
            <Card key={blogPost._id} style={{ margin: "10px", width: "90%" }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {blogPost.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {blogPost.content}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
      </InfiniteScroll>
    </Box>
  );
};

export default ListBlogPosts;
