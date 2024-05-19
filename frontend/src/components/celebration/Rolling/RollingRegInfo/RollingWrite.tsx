import { colors } from "@styles/theme";
import Recg from "/img/img_recgPaper.png";
import Circle from "/img/img_circlePaper.png";
import ColorCard from "./ColorCard";
import * as r from "./RollingWrite.styled";
import { useState, useRef, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "@/stores/user";
import { createRollMsg } from "@/apis/roll";
import { LuPaintbrush } from "react-icons/lu";
import { TiScissors } from "react-icons/ti";
import { makeMessage } from "@/utils/makeMessage";
import Header from "@common/header";

interface RegDataProps {
  shape: string;
  backgroundColor: string;
  backgroundImage: File | null;
  font: string;
  fontColor: string;
  content: string;
  nickname: string;
}

const shapeMap: { [key: string]: string } = {
  사각형: "RECTANGLE",
  원형: "CIRCLE",
};

const RollingWrite = () => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const { eventId = "", pageUri = "" } = useParams<{
    pageUri?: string;
    eventId?: string;
  }>();

  const [regData, setRegData] = useState<RegDataProps>({
    shape: "RECTANGLE",
    backgroundColor: "",
    backgroundImage: null,
    content: "",
    font: "PRETENDARD",
    fontColor: "#00000",
    nickname: user.nickname || "",
  });

  const [backgroundType, setBackgroundType] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);

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
      backgroundImage: null,
    }));
    setSelectedFile("");
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const fileURL = URL.createObjectURL(file);
      setSelectedFile(fileURL); // 이미지 url

      setRegData((prevData) => ({
        ...prevData,
        backgroundImage: file,
        backgroundColor: "",
      }));
      setBackgroundType("img");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const [selectedColor, setSelectedColor] = useState<string>("");
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

  const handleSelectFontColor = (fontColor: string) => {
    setSelectedColor(fontColor);
    setRegData((prevData: any) => ({
      ...prevData,
      fontColor: fontColor,
    }));
  };

  const handleSelectFont = (font: string) => {
    setSelectedFont(font);
    setRegData((prevData: any) => ({
      ...prevData,
      font: font,
    }));
  };

  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isShapeModalOpen, setIsShapeModalOpen] = useState(false);

  const recommendMessage = () => {
    const randomIdx = Math.floor(Math.random() * makeMessage.length);
    const randomMessage = makeMessage[randomIdx];
    setRegData((prevData) => ({
      ...prevData,
      content: randomMessage,
    }));
  };

  // 롤링페이퍼 작성
  const handleSubmit = async () => {
    setSaveModalOpen(false);

    if (!regData.content) {
      alert("내용을 필수로 입력해주세요.");
      return;
    }

    if (regData.nickname === "") {
      alert("닉네임을 입력해주세요.");
      return;
    }

    const formData = new FormData();

    formData.append("shape", regData.shape);
    formData.append("backgroundColor", regData.backgroundColor);
    formData.append("content", regData.content);
    formData.append("font", regData.font);
    formData.append("fontColor", regData.fontColor);
    formData.append("nickname", regData.nickname);
    if (regData.backgroundImage) {
      formData.append("backgroundImage", regData.backgroundImage);
    }

    try {
      const res = await createRollMsg(formData, eventId);
      navigate(`/celebrate/rolling/${eventId}/${pageUri}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <Header>메시지 작성하기</Header>
      <r.Container>
        <r.SelectWrap>
          <r.SelectBtn onClick={() => setIsSelectModalOpen(true)}>
            <img src="/icon/icon_brush.png" alt="" />
            배경 선택
          </r.SelectBtn>
          <r.SelectBtn onClick={() => setIsShapeModalOpen(true)}>
            <img src="/icon/icon_scissors.png" alt="" />
            모양 선택
          </r.SelectBtn>
          <r.SelectPinkBtn onClick={recommendMessage}>
            <img src="/icon/icon_makewrite.png" alt="" />
            <span>축하 멘트 추천</span>
          </r.SelectPinkBtn>
        </r.SelectWrap>
        <r.MessageWrap
          $backColor={regData.backgroundColor}
          $backImage={selectedFile}
          $shape={regData.shape}
          $type={backgroundType}
        >
          <r.MessageBox
            id="content"
            $font={selectedFont}
            placeholder="내용을 작성해주세요."
            style={{ color: regData.fontColor }}
            $shape={regData.shape}
            $type={backgroundType}
            value={regData.content}
            maxLength={300}
            onChange={(e) => {
              setRegData((prevData: any) => ({
                ...prevData,
                content: e.target.value,
              }));
            }}
          />
        </r.MessageWrap>
        <r.Label>작성자</r.Label>
        <r.Wrap>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "95%",
              gap: "5px",
            }}
          >
            <label htmlFor="nickname">From:</label>
            <r.WriterInfo
              id="nickname"
              value={regData.nickname}
              placeholder={user.nickname}
              maxLength={15}
              onChange={(e) =>
                setRegData((prevData) => ({
                  ...prevData,
                  nickname: e.target.value,
                }))
              }
            />
          </div>
        </r.Wrap>
        <r.Label>글씨색</r.Label>
        <r.Wrap>
          {colorList.map((color) => (
            <r.ColorButton
              key={color}
              color={color}
              $isSelected={color === selectedColor}
              onClick={() => {
                {
                  handleSelectFontColor(color);
                }
              }}
            />
          ))}
        </r.Wrap>
        <r.Label>글씨체</r.Label>
        <r.Wrap>
          <r.PretendButton
            $isSelected={selectedFont === "PRETENDARD"}
            onClick={() => handleSelectFont("PRETENDARD")}
          >
            기본체
          </r.PretendButton>
          <r.GoocneaeumButton
            $isSelected={selectedFont === "GOOCNEAEUM"}
            onClick={() => handleSelectFont("GOOCNEAEUM")}
          >
            꽃내음체
          </r.GoocneaeumButton>
          <r.BazziButton
            $isSelected={selectedFont === "BAZZI"}
            onClick={() => handleSelectFont("BAZZI")}
          >
            배찌체
          </r.BazziButton>
        </r.Wrap>
        <r.Button onClick={() => setSaveModalOpen(true)}>저장하기</r.Button>
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          name="img"
          id="img"
          onChange={handleFileInput}
          accept="image/*"
        />
        {isSelectModalOpen && (
          <>
            <r.BlackBox onClick={() => setIsSelectModalOpen(false)} />
            <r.ModalContainer>
              <r.P>배경 종류를 선택해주세요.</r.P>
              <div style={{ display: "flex" }}>
                <button onClick={() => setBackgroundType("color")}>색깔</button>
                <button
                  onClick={() => {
                    setBackgroundType("img");
                    triggerFileInput();
                  }}
                >
                  사진
                </button>
              </div>
              {backgroundType === "color" && (
                <ColorCard
                  onColorSelect={(color: string) => {
                    handleSelectColor(color);
                    setIsSelectModalOpen(false);
                  }}
                />
              )}
              {backgroundType === "img" && selectedFile && (
                <img
                  src={selectedFile}
                  alt="미리보기"
                  style={{ width: "30%", height: "auto" }}
                ></img>
              )}
              <r.Backdrop>
                <img
                  src={"/icon/icon_close_black.png"}
                  alt="close"
                  onClick={() => setIsSelectModalOpen(false)}
                />
              </r.Backdrop>
            </r.ModalContainer>
          </>
        )}
        {isShapeModalOpen && (
          <>
            <r.BlackBox onClick={() => setIsShapeModalOpen(false)} />
            <r.ModalContainer>
              <r.P>종이 모양을 선택해주세요.</r.P>
              <div style={{ display: "flex" }}>
                {shapeList.map((shape) => (
                  <button key={shape} onClick={() => onClickShape(shape)}>
                    {shape === "사각형" ? (
                      <r.Img src={Recg} alt={shape} />
                    ) : (
                      <r.Img src={Circle} alt={shape} />
                    )}
                    {shape}
                  </button>
                ))}
              </div>
              <r.Backdrop>
                <img
                  src={"/icon/icon_close_black.png"}
                  alt="close"
                  onClick={() => setIsShapeModalOpen(false)}
                />
              </r.Backdrop>
            </r.ModalContainer>
          </>
        )}
        {saveModalOpen && (
          <>
            <r.BlackBox onClick={() => setSaveModalOpen(false)} />
            <r.ModalContainer>
              <r.P>한 번 작성한 메시지는 삭제나 수정이 불가능합니다.</r.P>
              <r.P>정말 저장하시겠습니까?</r.P>
              <button onClick={handleSubmit}>저장하기</button>
              <r.Backdrop>
                <img
                  src={"/icon/icon_close_black.png"}
                  alt="close"
                  onClick={() => setSaveModalOpen(false)}
                />
              </r.Backdrop>
            </r.ModalContainer>
          </>
        )}
      </r.Container>
    </div>
  );
};

export default RollingWrite;
