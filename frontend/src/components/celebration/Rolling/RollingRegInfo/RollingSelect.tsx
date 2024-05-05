import Lable from "@common/label";
import Recg from "/img/img_recgPaper.png";
import Circle from "/img/img_circlePaper.png";
import { IoMdAdd } from "react-icons/io";
import { useState, ChangeEvent, useRef, useEffect } from "react";
import * as r from "@/components/celebration/Rolling/RollingRegInfo/RollingSelect.styled";
import ColorSelectModal from "./ColorSelectModal";
import { useNavigate, useParams } from "react-router-dom";

interface RegDataProps {
  shape: string;
  backgroundColor: string;
  content: string;
  font: string;
  fontColor: string;
  backgroundImage: string;
  nickname: string;
}

interface RollingSelectProps {
  onUpdateData: (data: RegDataProps) => void;
}

const shapeMap: { [key: string]: string } = {
  사각형: "RECTANGLE",
  원형: "CIRCLE",
};

const RollingSelect = ({ onUpdateData }: RollingSelectProps) => {
  const navigate = useNavigate();
  const { pageUri } = useParams();

  const [regData, setRegData] = useState<RegDataProps>(() => {
    const savedData = sessionStorage.getItem("regData");
    return savedData
      ? JSON.parse(savedData)
      : {
          shape: "",
          backgroundColor: "",
          backgroundImage: "",
          font: "",
          fontColor: "",
          content: "",
          nickname: "",
        };
  });

  useEffect(() => {
    console.log("롤링데이터", regData);
    sessionStorage.setItem("regData", JSON.stringify(regData));
    if (regData.backgroundImage) {
      sessionStorage.setItem("selectedFileUrl", regData.backgroundImage);
    }
  }, [regData]);

  useEffect(() => {
    const savedData = sessionStorage.getItem("regData");
    if (savedData) {
      setRegData(JSON.parse(savedData));
    }
  }, []);

  const [backgroundType, setBackgroundType] = useState<string>("");
  const [isRegOpen, setIsRegOpen] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(() => {
    return sessionStorage.getItem("selectedFileUrl");
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const shapeList: string[] = ["사각형", "원형"];

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
      backgroundColor: color,
      backgroundImage: "",
    }));
    setSelectedFile(null);
    sessionStorage.removeItem("selectedFileUrl");
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const fileURL = URL.createObjectURL(file);
      setSelectedFile(fileURL);

      setRegData((prevData) => ({
        ...prevData,
        backgroundImage: fileURL,
        backgroundColor: "",
      }));
      setBackgroundType("img");
      sessionStorage.setItem("selectedFileUrl", fileURL);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
    setBackgroundType("img");
  };

  const handleSubmit = () => {
    onUpdateData(regData);
    navigate(`/celebrate/rolling/${pageUri}/write`);
  };

  return (
    <>
      <r.Header>
        <r.Icon
          onClick={() => {
            window.history.back();
          }}
        />
        <span>배경 선택하기</span>
        <button onClick={handleSubmit}>다음</button>
      </r.Header>
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
              ) : (
                <r.Img src={Circle} alt={shape} />
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
          <r.ImagePreview src={selectedFile} alt="Preview" />
        )}
      </r.Container>
    </>
  );
};
export default RollingSelect;
