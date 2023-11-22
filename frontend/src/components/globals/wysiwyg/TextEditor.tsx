import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.scss";

interface IProps {
  placeholder: string;
}

function TextEditor({ placeholder }: IProps) {
  const [value, setValue] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  console.log(value);

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      formats={formats}
      modules={modules}
      placeholder={placeholder}
    />
  );
}

export default TextEditor;
