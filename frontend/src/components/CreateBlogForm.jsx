import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import BaseFormGroup from "./baseInput/BaseFormGroup";
import ReactSelect from "./ReactSelect";
import { useGetAllCategoryQuery } from "../apiSlice/category";
import { useGetAllTagsQuery } from "../apiSlice/tags";
import moment from "moment";
import { getUserInfo } from "../localStorage/localStorage";

const INITIAL_STATE = {
  title: "",
  content: "",
  author: "",
  category: "",
  tags: [],
  //   creationDate: "",
};

const CreateBlogForm = ({ isBusy = false, blogPost, onSubmit = () => {} }) => {
  const { user } = getUserInfo();
  const userId = user?._id;

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
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
      <Modal.Body>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <BaseFormGroup label="Title" required>
              <Controller
                name="title"
                control={control}
                rules={{ required: "Please enter a title." }}
                initialValue={blogPost ? blogPost.title : ""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Input the title"
                    multiline
                    rows={1}
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
                render={({ field }) => (
                  <Editor
                    // {...field}
                    apiKey="zqrsvtmeatld5mag3wlr175d0r1zdo1u8wcr0wvs3re77ow2"
                    onEditorChange={(content) => {
                      field.onChange(content);
                    }}
                    initialValue={blogPost ? blogPost.content : ""}
                    init={{
                      height: 250,
                      menubar: false,
                      placeholder: "Enter Message...",

                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                        "link",
                        "emoticons",
                      ],
                      toolbar:
                        "undo redo | formatselect | bold italic backcolor | \
                      alignleft aligncenter alignright alignjustify | \
                      bullist numlist outdent indent | removeformat | help",
                      valid_children: "+body[div],+body[span]", // Allow div and span as children of the root block
                      content_style:
                        'body { font-family:"Segoe UI","Montserrat",Helvetica,Arial,sans-serif; font-size:14px }',
                      force_br_newlines: false,
                      force_p_newlines: false,
                      forced_root_block: "",
                      content_style:
                        'body { font-family:"Segoe UI","Montserrat",Helvetica,Arial,sans-serif; font-size:14px }',
                    }}
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
      </Modal.Body>

      <Modal.Footer>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <Button
            color="primary"
            variant="contained"
            disabled={isBusy}
            onClick={handleSubmit((data) =>
              handleOnSubmit({
                ...data,
                ...(!blogPost && { status: "submitted" }),
              })
            )}
          >
            Submit
          </Button>
        </div>
      </Modal.Footer>
    </>
  );
};

export default CreateBlogForm;
