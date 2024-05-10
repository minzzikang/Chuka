import Logo from "/img/img_logo.png";
import ShareIcon from "/icon/icon_share.png";
import AddIcon from "/icon/icon_add_message.png";
import { ShareKakao } from "@/services/kakaoShare";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as r from "./RollingHeader.styled";


type RollingHeader = {
  bannerThumbnailUrl:string
  title:string
  nickname:string
}


const RollingHeader = (props: RollingHeader) => {
  const {bannerThumbnailUrl, title, nickname} = props

  const { eventId, pageUri } = useParams<{ pageUri: string | undefined; eventId: string | undefined }>();
  const locate = useLocation()
  const navigate = useNavigate();

  const eventUrl = window.location.href

  const handleAdd = () => {
    console.log(pageUri);
    navigate(`/celebrate/rolling/${eventId}/${pageUri}/write`);
  };

  return (
    <>
      <r.Container>
        <r.Img src={Logo} alt="logo" onClick={() => navigate("/")} />
        <r.IconWrap>
          <r.BtnWrap onClick={() => ShareKakao({eventUrl, bannerThumbnailUrl, title, nickname})}>
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
