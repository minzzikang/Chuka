import { colors } from "@styles/theme";
import * as r from "./RollingWrite.styled";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@common/header";

interface RegDataProps {
  shape: string;
  background_color: string;
  background_image: string;
  font: string;
  font_color: string;
  content: string;
}

interface RollingWriteProps {
    onUpdateData: (data: RegDataProps) => void;
  }

const RollingWrite = ({ onUpdateData }: RollingWriteProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [regData, setRegData] = useState<RegDataProps>(
    location.state?.regData || {
      shape: "",
      background_color: "",
      background_image: "",
      font: "",
      font_color: "",
      content: "",
    }
  );

  useEffect(() => {
    console.log(regData);
  }, [regData]);

  const [selectedColor, setSelectedColor] = useState<string>("black");
  const [selectedFont, setSelectedFont] = useState<string>("Pretend");

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
    setRegData((prevData) => ({
      ...prevData,
      font_color: color,
    }));
  };

  const handleSelectFont = (font: string) => {
    setSelectedFont(font);
    setRegData((prevData) => ({
      ...prevData,
      font: font,
    }));
  };

  const handleSubmit = () => {
    onUpdateData(regData);
    navigate("/celebrate/rolling-preview", { state: { regData } });
  };

  return (
    <>
      <Header children="내용 작성하기" label="다음" onClick={handleSubmit} />
      <r.Container>
        <r.MessageBox
          id="content"
          font={selectedFont}
          placeholder="내용을 작성해주세요."
          style={{ color: regData.font_color }}
          value={regData.content}
          onChange={(e) =>
            setRegData((prevData) => ({
              ...prevData,
              content: e.target.value,
            }))
          }
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
