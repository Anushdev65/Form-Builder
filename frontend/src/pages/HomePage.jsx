import Navbar from "../components/NavBar";
import LoadingWrapper from "../components/LoadingWrapper";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "../styles/homepage.css";
import { useGetAllBlogPostQuery } from "../apiSlice/blogPost";
import ListBlogPosts from "../components/ListBlogPosts";
import CreateBlogForm from "../components/CreateBlogForm";
import { useCreateBlogPostMutation } from "../apiSlice/blogPost";

const HomePage = () => {
  const [showAddBlogPost, setShowAddBlogPost] = useState(false);
  // const [activateLoader, setActivateLoader] = useState(false);

  const handleCloseAddBlogPost = () => setShowAddBlogPost(false);

  const handleShowAddBlogPost = () => setShowAddBlogPost(true);

  // const { data: blogPosts = [], loadingBlogPosts } = useGetAllBlogPostQuery();

  const [createBlog, { isLoading: loadingCreateBlog }] =
    useCreateBlogPostMutation();

  const handleAddBlogPost = async (payload) => {
    try {
      // setActivateLoader(true);

      const newPayLoad = {
        ...payload,
      };

      await createBlog(newPayLoad).then((res) => {
        if (res) {
          if (res.error) {
            console.log(res);
            toast.error(res?.error?.data?.message ?? "Couln't add Post!");

            setShowAddBlogPost(false);
            // setActivateLoader(false);
            return;
          }
          setShowAddBlogPost(false);
          // setActivateLoader(false);
          toast.success("Post sucessfully added!");
        }
      });
    } catch (err) {
      console.log("error", err);
      toast.error(err?.data?.nessage ?? err?.data ?? "Couldn't add Blog Post");
      setShowAddBlogPost(false);
      // setActivateLoader(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "10px",
        }}
      >
        <div
          className="post-header"
          style={{
            fontWeight: "550",
            display: "flex",
            alignItems: "center",
            color: "#a341f0",
          }}
        >
          Blog Posts
        </div>
        <div>
          <Button
            onClick={handleShowAddBlogPost}
            variant="primary"
            style={{
              width: "120px",
              height: "30px",
              backgroundColor: "rgba(184, 122, 178, 0.9)",
            }}
          >
            Create Blog
          </Button>
          {/* </Tooltip> */}
        </div>
      </div>
      <div style={{ zIndex: 1 }}>
        <ListBlogPosts />
      </div>
      <Modal
        className="content"
        show={showAddBlogPost}
        onHide={handleCloseAddBlogPost}
        backdrop="static"
      >
        <div
          style={{
            width: "50%",
            backgroundColor: "white",
            borderRadius: "10px",
            margin: "auto",
          }}
        >
          <LoadingWrapper loading={loadingCreateBlog}>
            <Modal.Header closeButton>
              <Modal.Title>Create Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CreateBlogForm
                isBusy={loadingCreateBlog}
                onSubmit={handleAddBlogPost}
                onCancel={() => setShowAddBlogPost(false)}
              />
            </Modal.Body>
          </LoadingWrapper>
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;
