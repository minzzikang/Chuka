import * as r from "./RollingPreview.styled";
import Header from "@common/header";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface RegDataProps {
  shape: string;
  background_color: string;
  content: string;
  font: string;
  font_color: string;
  background_image: string;
  nickname: string;
}

interface RollingPreviewProps {
  onUpdateData: (data: RegDataProps) => void;
}

const RollingPreview = ({ onUpdateData }: RollingPreviewProps) => {
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
      nickname: "",
    }
  );

  useEffect(() => {
    console.log(regData);
  }, [regData]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCancle = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const handleSubmit = () => {};

  return (
    <>
      <Header
        children="미리보기"
        label="취소"
        onClick={() => setIsModalOpen(true)}
      />
      <r.Container>
        <r.MessageBox
          bgColor={regData.background_color}
          bgImage={regData.background_image}
          fontColor={regData.font_color}
          fontFamily={regData.font}
        >
          {regData.content}
        </r.MessageBox>
        <r.Wrap>
          <span>From:</span>
          <r.WriterInfo
            value={regData.nickname}
            placeholder="작성자 이름"
            onChange={(e) =>
              setRegData((prevData) => ({
                ...prevData,
                nickname: e.target.value,
              }))
            }
          />
        </r.Wrap>
        <r.Button onClick={handleSubmit}>저장하기</r.Button>
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
      </r.Container>
    </>
  );
};

export default RollingPreview;
