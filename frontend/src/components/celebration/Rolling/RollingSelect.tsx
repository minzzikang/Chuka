import Lable from "@common/label";
import Recg from "/img/img_recgPaper.png";
import Circle from "/img/img_circlePaper.png";
import Heart from "/img/img_heartPaper.png";
import { IoMdAdd } from "react-icons/io";

import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import * as r from "@components/celebration/Rolling/RollingSelect.styled";
import ColorSelectModal from "./ColorSelectModal";

interface RollingSelectProps {
  onDataChange: (data: any) => void;
}

const shapeMap: { [key: string]: string } = {
  사각형: "rectangle",
  원형: "circle",
  하트: "heart",
};

const RollingSelect: React.FC<RollingSelectProps> = ({ onDataChange }) => {
  const [regData, setRegData] = useState({
    shape: "rectangle",
    background_color: "",
    background_image: "",
  });

  useEffect(() => {
    console.log(regData)
    onDataChange(regData);
  }, [regData, onDataChange]);

  const [backgroundType, setBackgroundType] = useState<string>("");
  const [isRegOpen, setIsRegOpen] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const shapeList: string[] = ["사각형", "원형", "하트"];

  const onClickShape = (shape: string) => {
    const englishShape = shapeMap[shape];

    setRegData((prevData) => ({
      ...prevData,
      shape: englishShape,
    }));
  };

  const handleSelectColor = (color: string) => {
    setRegData((prevData) => ({
      ...prevData,
      background_color: color,
      background_image: "",
    }));
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file);

    if (file) {
      const fileURL = URL.createObjectURL(file);

      setRegData((prevData) => ({
        ...prevData,
        background_image: fileURL,
        background_color: "",
      }));
      setBackgroundType("img");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
    setBackgroundType("img");
  };

  return (
    <r.Container>
      <Lable htmlFor="paper-shape" children="종이 모양 선택" />
      <r.Wrap>
        {shapeList.map((shape) => (
          <r.ShapeButton
            key={shape}
            isActive={regData.shape === shapeMap[shape]}
            onClick={() => onClickShape(shape)}
          >
            {shape === "사각형" ? (
              <r.Img src={Recg} alt={shape} />
            ) : shape === "원형" ? (
              <r.Img src={Circle} alt={shape} />
            ) : (
              <r.Img src={Heart} alt={shape} />
            )}
            {shape}
          </r.ShapeButton>
        ))}
      </r.Wrap>
      <Lable htmlFor="paper-background" children="종이 배경 선택" />
      <r.Wrap>
        <r.BackgroundButton
          onClick={() => {
            setIsRegOpen(true);
            setBackgroundType("color");
          }}
          isActive={backgroundType === "color"}
        >
          색상 선택
        </r.BackgroundButton>
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          name="img"
          id="img"
          onChange={handleFileInput}
          accept="image/*"
        />
        <r.BackgroundButton
          isActive={backgroundType === "img"}
          onClick={triggerFileInput}
        >
          <IoMdAdd /> 사진 업로드
        </r.BackgroundButton>
        {isRegOpen && (
          <ColorSelectModal
            name="배경색 선택"
            onClose={() => setIsRegOpen(false)}
            onSelectColor={handleSelectColor}
          />
        )}
      </r.Wrap>
      {selectedFile && backgroundType === 'img' && (
        <r.ImagePreview src={URL.createObjectURL(selectedFile)} alt="Preview" />
      )}
    </r.Container>
  );
};
export default RollingSelect;
