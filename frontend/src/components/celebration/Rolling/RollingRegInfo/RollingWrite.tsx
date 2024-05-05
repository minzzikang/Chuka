import { colors } from "@styles/theme";
import * as r from "./RollingWrite.styled";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface RegDataProps {
  shape: string;
  backgroundColor: string;
  backgroundImage: string;
  font: string;
  fontColor: string;
  content: string;
  nickname: string;
}

interface RollingWriteProps {
  onUpdateData: (data: RegDataProps) => void;
}

const RollingWrite = ({ onUpdateData }: RollingWriteProps) => {
  const { eventId, pageUri } = useParams<{
    pageUri: string;
    eventId: string;
  }>();
  const navigate = useNavigate();

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

  const [selectedColor, setSelectedColor] = useState<string>("black");
  const [selectedFont, setSelectedFont] = useState<string>("Pretendard");

  const colorList = [
    colors.black,
    colors.white,
    colors.blueFont,
    colors.orangeFont,
    colors.pinkFont,
    colors.greenFont,
    colors.yellowFont,
    colors.redFont,
  ];

  const handleSelectColor = (color: string) => {
    setSelectedColor(color);
    setRegData((prevData: any) => ({
      ...prevData,
      fontColor: color,
    }));
  };

  const handleSelectFont = (font: string) => {
    setSelectedFont(font);
    setRegData((prevData: any) => ({
      ...prevData,
      font: font,
    }));
  };

  const handleSubmit = () => {
    onUpdateData(regData);
    navigate(`/celebrate/rolling/${eventId}/${pageUri}/preview`);
  };

  const handleBack = () => {
    navigate(`/celebrate/rolling/${eventId}/${pageUri}/select`);
  };

  return (
    <>
      <r.Header>
        <r.Icon onClick={handleBack} />
        <span>메시지 작성하기</span>
        <button onClick={handleSubmit}>다음</button>
      </r.Header>
      <r.Container>
        <r.MessageBox
          id="content"
          font={selectedFont}
          backColor={regData.backgroundColor}
          placeholder="내용을 작성해주세요."
          style={{ color: regData.fontColor }}
          value={regData.content}
          maxLength={300}
          onChange={(e) => {
            setRegData((prevData: any) => ({
              ...prevData,
              content: e.target.value,
            }));
          }}
        />
        <r.Wrap>
          {colorList.map((color) => (
            <r.ColorButton
              key={color}
              color={color}
              isSelected={color === selectedColor}
              onClick={() => {
                {
                  handleSelectColor(color);
                }
              }}
            />
          ))}
        </r.Wrap>
        <r.Wrap>
          <r.PretendButton
            isSelected={selectedFont === "Pretendard"}
            onClick={() => handleSelectFont("Pretendard")}
          >
            기본체
          </r.PretendButton>
          <r.GoocneaeumButton
            isSelected={selectedFont === "Goocneaeum"}
            onClick={() => handleSelectFont("Goocneaeum")}
          >
            꽃내음체
          </r.GoocneaeumButton>
          <r.TreegardenButton
            isSelected={selectedFont === "Treegarden"}
            onClick={() => handleSelectFont("Treegarden")}
          >
            나무정원체
          </r.TreegardenButton>
        </r.Wrap>
      </r.Container>
    </>
  );
};

export default RollingWrite;
