import Logo from "/img/img_logo.png";
import { FiShare } from "react-icons/fi";
import { MdOutlinePostAdd } from "react-icons/md";
import { shareEventKakao } from "@/services/shareEventKakao";
import { useNavigate, useParams } from "react-router-dom";
import * as r from "./RollingHeader.styled";

export type RollingHeaderType = {
  bannerThumbnailUrl: string;
  title: string;
  nickname: string;
};

const RollingHeader = (props: RollingHeaderType) => {
  const { bannerThumbnailUrl, title, nickname } = props;

  const { eventId, pageUri } = useParams<{
    pageUri: string | undefined;
    eventId: string | undefined;
  }>();
  const navigate = useNavigate();
  const eventUrl = window.location.href;

  const handleAdd = () => {
    navigate(`/celebrate/rolling/${eventId}/${pageUri}/write`);
  };

  return (
    <>
      <r.Container>
        <r.Img src={Logo} alt="logo" onClick={() => navigate("/")} />
        <r.IconWrap>
          <r.BtnWrap
            onClick={() =>
              shareEventKakao({ eventUrl, bannerThumbnailUrl, title, nickname })
            }
          >
            <FiShare size={22} />
            <r.Span>공유하기</r.Span>
          </r.BtnWrap>
          <r.BtnWrap onClick={handleAdd}>
            <MdOutlinePostAdd size={24} />
            <r.Span>작성하기</r.Span>
          </r.BtnWrap>
        </r.IconWrap>
      </r.Container>
    </>
  );
};

export default RollingHeader;
