import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ ...props }) => {
  const [content, setContent] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "list",
    "align",
    "link",
    "image",
    "video",
  ];

  const handleEditorChange = (value) => {
    const cleanContent = value
      .replace(/^<p>|<\/p>$/g, "")
      .replace(/<\/p><p>/g, "\n");
    setContent(cleanContent);
  };
  return (
    <div>
      <ReactQuill
        value={content}
        onChange={handleEditorChange}
        theme="snow"
        formats={formats}
        modules={modules}
        {...props}
      />
    </div>
  );
};

export default RichTextEditor;
