import * as r from "./RollingPreview.styled";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "@/stores/user";
import { createRollMsg } from "@/apis/roll";

interface RegDataProps {
  shape: string;
  backgroundColor: string;
  content: string;
  font: string;
  fontColor: string;
  backgroundImage: string;
  nickname: string;
}

interface RollingPreviewProps {
  onUpdateData: (data: RegDataProps) => void;
}

const RollingPreview = ({ onUpdateData }: RollingPreviewProps) => {
  const user = useRecoilValue(userState);
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
          nickname: user.nickname,
        };
  });

  useEffect(() => {
    sessionStorage.setItem("regData", JSON.stringify(regData));
  }, [regData]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);

  const handleCancle = () => {
    setIsModalOpen(false);
    sessionStorage.removeItem("regData");
    navigate("/");
  };

  const handleSubmit = async () => {
    setSaveModalOpen(false);

    const formData = new FormData();

    formData.append("shape", regData.shape);
    formData.append("backgroundColor", regData.backgroundColor);
    formData.append("content", regData.content);
    formData.append("font", regData.font);
    formData.append("nickname", regData.nickname);
    if (regData.backgroundImage) {
      formData.append("backgroundImage", regData.backgroundImage);
    }

    if (typeof eventId === "string") {
      try {
        const res = await createRollMsg(formData, eventId);
        console.log("메시지 정보", res);
        navigate(`/celebrate/rolling/${eventId}/${pageUri}/detail`);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("eventId 이상");
    }
  };

  const handleBack = () => {
    navigate(`/celebrate/rolling/${eventId}/${pageUri}/write`);
  };

  return (
    <>
      <r.Header>
        <r.Icon onClick={handleBack} />
        <span>미리보기</span>
        <button onClick={() => setIsModalOpen(true)}>취소</button>
      </r.Header>
      <r.Container>
        <r.MessageBox
          bgColor={regData.backgroundColor}
          bgImage={regData.backgroundImage}
          fontColor={regData.fontColor}
          fontFamily={regData.font}
          shape={regData.shape}
        >
          <r.InsideText>{regData.content}</r.InsideText>
        </r.MessageBox>
        <r.Wrap>
          <span>From:</span>
          <r.WriterInfo
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
        </r.Wrap>
        <r.Button onClick={() => setSaveModalOpen(true)}>저장하기</r.Button>
        {isModalOpen && (
          <>
            <r.BlackBox onClick={() => setIsModalOpen(false)} />
            <r.ModalContainer>
              <r.P>지금까지 작성된 메시지는 저장되지 않습니다.</r.P>
              <r.P>정말 취소하시겠습니까?</r.P>
              <r.Button onClick={handleCancle}>취소하기</r.Button>
              <r.Backdrop>
                <img
                  src={"/icon/icon_close_black.png"}
                  alt="close"
                  onClick={() => setIsModalOpen(false)}
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
              <r.Button onClick={handleSubmit}>저장하기</r.Button>
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
    </>
  );
};

export default RollingPreview;
