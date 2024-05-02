import { useGetAllCategoryQuery } from "../apiSlice/category";
import AddCategoryModel from "./modal/AddCategoryModal";
import InfiniteScroll from "react-infinite-scroll-component";
import { GenericListSkeleton } from "./GenericListSkeleton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Grid, Card, CardContent, Typography, Fab } from "@mui/material";
import React from "react";
import { useState } from "react";
import { styled } from "@mui/system";

const CenteredContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  // alignItems: "center",
  // minHeight: "100vh",
  // height: "100%",
});

const ListContainer = styled("div")({
  width: "100%",
  maxWidth: "600px",
  padding: "20px",
});

const AddButtonContainer = styled("div")({
  position: "fixed",
  top: "150px",
  right: "100px",
});

const CategoryList = () => {
  const { data: categories, isLoading, isError } = useGetAllCategoryQuery();
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);

  return (
    <CenteredContainer>
      <ListContainer>
        <InfiniteScroll
          dataLength={categories?.length || 0}
          hasMore={true}
          endMessage={
            <Typography variant="body2">No more categories to load</Typography>
          }
        >
          <Grid container spacing={2}>
            {categories?.map((category) => (
              <Grid item key={category._id} xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="h6"
                      color="secondary"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      {category.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            {isLoading && (
              <Grid item xs={12}>
                <GenericListSkeleton />
              </Grid>
            )}
            {isError && (
              <Grid item xs={12}>
                <Typography>Error fetching data</Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <AddButtonContainer>
                <Fab
                  color="primary"
                  aria-label="add"
                  onClick={() => setOpenAddCategoryModal(true)}
                  size="small"
                >
                  <AddBoxIcon />
                </Fab>
              </AddButtonContainer>
            </Grid>
          </Grid>
        </InfiniteScroll>
      </ListContainer>

      <AddCategoryModel
        open={openAddCategoryModal}
        handleClose={() => setOpenAddCategoryModal(false)}
      />
    </CenteredContainer>
  );
};

export default CategoryList;
