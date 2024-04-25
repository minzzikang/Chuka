import React, { ChangeEvent, useState, useRef } from "react";
import styled from "styled-components";
import { colors } from "@/styles/theme";

interface FileInputProps {
  onChange: (file: File | null, fileURL: string | null) => void;
}

const FileInputContainer = styled.div`
  width: 339px;
  height: 36px;
  border: 2px solid ${colors.gray};
  background-color: ${colors.white};
  color: ${colors.gray};
  border-radius: 0.6em;
  font-size: 1em;
  padding-left: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Index: React.FC<FileInputProps> = ({ onChange }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file);

    const fileURL = file ? URL.createObjectURL(file) : null;
    onChange(file, fileURL);
    console.log(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <FileInputContainer onClick={triggerFileInput}>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        name="img"
        id="img"
        onChange={handleFileChange}
        accept="image/*"
      />
      {selectedFile ? selectedFile.name : "축하할 날을 대표하는 이미지를 등록해주세요."}
    </FileInputContainer>
  );
};

export default Index;
