import Lable from "@common/label";
import Recg from "/img/img_recgPaper.png";
import Circle from "/img/img_circlePaper.png";
import Heart from "/img/img_heartPaper.png";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import * as r from "@components/celebration/Rolling/RollingSelect.styled";
import ColorSelectModal from "./ColorSelectModal";
import ColorCard from "./ColorCard";
// import { useNavigate } from "react-router";

const shapeMap: {[key: string]: string} = {
  사각형: "rectangle",
  원형: "circle",
  하트: "heart"
};


const RollingSelect = () => {
  const [regData, setRegData] = useState({
    shape: "",
    background_color: "",
    background_image: "",
  });

  
  const [backgroundType, setBackgroundType] = useState<string>("");
  const [isRegOpen, setIsRegOpen] = useState<boolean>(false);
  
  const shapeList: string[] = [
    "사각형",
    "원형",
    "하트",
  ];
  
  const onClickShape = (shape: string) => {
   const englishShape = shapeMap[shape]
   
    setRegData((prevData) => ({
      ...prevData,
      shape: englishShape,
      background_color: "",
      background_image: "",
    }));
  };

  const handleSelectColor = (color: string) => {
      setRegData((prevData) => ({
        ...prevData,
        background_color: color,
        background_image: "",
      }));
      setIsRegOpen(false);
      console.log(regData)
  };

  const handleSelectImg = () => {
    setBackgroundType("img");
    setRegData((prevData) => ({
      ...prevData,
      background_image: "",
      background_color: "",
    }));
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
          onClick={() => setIsRegOpen(true)}
          isActive={backgroundType === "color"}
        >
          색상 선택
        </r.BackgroundButton>
        <r.BackgroundButton
          isActive={backgroundType === "img"}
          onClick={handleSelectImg}
        >
          <IoMdAdd /> 사진 업로드
        </r.BackgroundButton>
        {isRegOpen && (
          <ColorSelectModal
            name="색상 선택"
            onClose={() => setIsRegOpen(false)}
            onColorSelect={handleSelectColor}
          >
            <ColorCard
              onSelectColor={handleSelectColor}
            />
          </ColorSelectModal>
        )}
      </r.Wrap>
    </r.Container>
  );
};

export default RollingSelect;
