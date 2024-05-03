import React, { ChangeEvent, useState, useRef } from "react";
import * as f from "./FileInput.styled";

interface FileInputProps {
  onChange: (file: File | null, fileURL: string | null) => void;
}

const Index: React.FC<FileInputProps> = ({ onChange }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file);

    if (file) {
      const fileURL = URL.createObjectURL(file);
      setImagePreviewUrl(fileURL);
      onChange(file, fileURL);
      console.log("파일입니당", file);
    } else {
      setImagePreviewUrl(null);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <f.Container>
        <f.FileInputContainer onClick={triggerFileInput}>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            name="img"
            id="img"
            onChange={handleFileChange}
            accept="image/*"
          />
          {selectedFile
            ? selectedFile.name
            : "축하할 날을 대표하는 이미지를 등록해주세요."}
        </f.FileInputContainer>
        {imagePreviewUrl && (
          <f.ImagePreview src={imagePreviewUrl} alt="Preview" />
        )}
      </f.Container>
    </>
  );
};

export default Index;
