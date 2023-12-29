import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.scss";
import { stepProps } from "../../../pages/DecisionCreate/DecisionCreate";

interface IProps extends stepProps {
  placeholder: string;
  decisionKey: string;
}

function TextEditor({
  placeholder,
  newDecision,
  setNewDecision,
  decisionKey,
}: IProps) {
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

  const handleChange = (value: string) => {
    setNewDecision({ ...newDecision, [decisionKey]: value });
  };

  return (
    <ReactQuill
      theme="snow"
      value={newDecision.decisionKey}
      onChange={(value) => handleChange(value)}
      formats={formats}
      modules={modules}
      placeholder={placeholder}
    />
  );
}

export default TextEditor;
