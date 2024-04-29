import Lable from "@common/label";
import Recg from "/img/img_recgPaper.png";
import Circle from "/img/img_circlePaper.png";
import Heart from "/img/img_heartPaper.png";
import { IoMdAdd } from "react-icons/io";
import { useState, ChangeEvent, useRef, useEffect } from "react";
import * as r from "@/components/celebration/Rolling/RollingRegInfo/RollingSelect.styled";
import ColorSelectModal from "./ColorSelectModal";
import Header from "@common/header";
import { useNavigate } from "react-router-dom";

interface RollingSelectData {
  shape: string;
  background_color: string;
  background_image: string;
}

interface RollingSelectProps {
  onUpdateData: (data: RollingSelectData) => void;
}

const shapeMap: { [key: string]: string } = {
  사각형: "rectangle",
  원형: "circle",
  하트: "heart",
};

const RollingSelect = ({ onUpdateData }: RollingSelectProps) => {
  const [regData, setRegData] = useState<RollingSelectData>({
    shape: "rectangle",
    background_color: "",
    background_image: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log(regData);
  }, [regData]);

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

  const handleSubmit = () => {
    onUpdateData(regData);
    navigate("/celebrate/rolling-write", { state: { regData } });
  };

  return (
    <>
      <Header children="배경 선택하기" label="다음" onClick={handleSubmit} />
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
        {selectedFile && backgroundType === "img" && (
          <r.ImagePreview
            src={URL.createObjectURL(selectedFile)}
            alt="Preview"
          />
        )}
      </r.Container>
    </>
  );
};
export default RollingSelect;
