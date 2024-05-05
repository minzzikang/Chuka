import Logo from "/img/img_logo.png";
import ShareIcon from "/icon/icon_share.png";
import AddIcon from "/icon/icon_add_message.png";
import { ShareKakao } from "@/services/kakaoShare";
import { useNavigate, useParams } from "react-router-dom";
import * as r from "./RollingHeader.styled";



const RollingHeader = () => {
  const { eventId, pageUri } = useParams<{ pageUri: string; eventId: string }>();

  const navigate = useNavigate();

  const handleAdd = () => {
    console.log(pageUri);
    navigate(`/celebrate/rolling/${eventId}/${pageUri}/select`);
  };


  return (
    <>
      <r.Container>
        <r.Img src={Logo} alt="logo" onClick={() => (navigate('/')) } />
        <r.IconWrap>
          <r.BtnWrap onClick={ShareKakao}>
            <r.Icon src={ShareIcon} alt="share" />
            <r.Span>공유하기</r.Span>
          </r.BtnWrap>
          <r.BtnWrap onClick={handleAdd}>
            <r.Icon src={AddIcon} alt="add" />
            <r.Span>작성하기</r.Span>
          </r.BtnWrap>
        </r.IconWrap>
      </r.Container>
    </>
  );
};

export default RollingHeader;
