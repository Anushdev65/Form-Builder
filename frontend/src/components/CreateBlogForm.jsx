import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import BaseFormGroup from "./baseInput/BaseFormGroup";
import ReactSelect from "./ReactSelect";
import { useGetAllCategoryQuery } from "../apiSlice/category";
import { useGetAllTagsQuery } from "../apiSlice/tags";
import { getUserInfo } from "../localStorage/localStorage";
import RichTextEditor from "./RichTextEditor";
const INITIAL_STATE = {
  title: "",
  content: "",
  author: "",
  category: "",
  tags: [],
  //   creationDate: "",
};

const CreateBlogForm = ({ isBusy = false, blogPost, onSubmit = () => {} }) => {
  // const { user } = getUserInfo();
  // const userId = user?._id;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: INITIAL_STATE,
  });

  const { data: category = [], loadingCategory } = useGetAllCategoryQuery();

  const { data: tags = [], loadingTags } = useGetAllTagsQuery();

  console.log(tags);

  const _mappedCategories = category?.map((el) => ({
    label: el?.name,
    value: el?._id,
  }));

  const _mappedTags = tags?.map((el) => ({
    value: el?._id,
    label: el?.name,
  }));

  console.log(_mappedTags);

  const handleOnSubmit = (data) => {
    let _payLoad = {};

    _payLoad = {
      ...data,
      category: data?.category?.value,
      tags: data?.tags?.value,
    };

    if (!_payLoad) return;

    onSubmit(_payLoad);
  };

  React.useEffect(() => {
    if (!blogPost) return;

    reset({
      ...blogPost,
      category:
        { id: blogPost.category?._id, label: blogPost?.category?.name } ?? "",
      tags: { id: blogPost?.tags?._id, label: blogPost?.tags?.name } ?? "",
    });
  }, [blogPost, reset]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <BaseFormGroup label="Title" required>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Please enter a title." }}
              initialValue={blogPost ? blogPost?.title : ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Input the title"
                  multiline
                  rows={1}
                  fullWidth
                  error={!!errors?.title}
                  helperText={errors?.title?.message}
                />
              )}
            />
          </BaseFormGroup>
        </Grid>

        <Grid item xs={12}>
          <BaseFormGroup label="Content" required>
            <Controller
              name="content"
              control={control}
              rules={{ required: "Please write the content." }}
              initialValue={blogPost ? blogPost?.content : ""}
              render={({ field }) => (
                <RichTextEditor
                  {...field}
                  placeholder="Input the content to add the blog Post"
                  error={!!errors?.content}
                  helperText={errors?.content?.message}
                />
              )}
            />
          </BaseFormGroup>
        </Grid>

        <Grid item xs={12}>
          <BaseFormGroup label="Author" required>
            <Controller
              name="author"
              control={control}
              rules={{ required: "Input author." }}
              initialValue={blogPost ? blogPost.author : ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Input the author"
                  multiline
                  rows={1}
                  fullWidth
                  error={!!errors?.author}
                  helperText={errors?.author?.message}
                />
              )}
            />
          </BaseFormGroup>
        </Grid>

        <Grid item xs={12}>
          <BaseFormGroup label="Category" required>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Please select  category for your blog." }}
              render={({ field }) => (
                <ReactSelect
                  {...field}
                  options={_mappedCategories}
                  isLoading={loadingCategory}
                  placeholder="Select Category "
                  error={!!errors?.category}
                  helperText={errors?.category?.message}
                />
              )}
            />
          </BaseFormGroup>
        </Grid>

        <Grid item xs={12}>
          <BaseFormGroup label="Tags" required>
            <Controller
              name="tags"
              control={control}
              defaultValue={tags?.map((tag) => ({
                value: tag._id,
                label: tag.name,
              }))}
              rules={{ required: "Please select tags." }}
              render={({ field }) => (
                <ReactSelect
                  {...field}
                  options={_mappedTags}
                  isLoading={loadingTags}
                  placeholder="Select Tags"
                  error={!!errors?.tags}
                  helperText={errors?.tags?.message}
                />
              )}
            />
          </BaseFormGroup>
        </Grid>
      </Grid>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "1rem",
        }}
      >
        <Button
          color="secondary"
          variant="contained"
          disabled={isBusy}
          onClick={handleSubmit((data) =>
            handleOnSubmit({
              ...data,
            })
          )}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default CreateBlogForm;
