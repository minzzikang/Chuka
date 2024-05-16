import Logo from "/img/img_logo.png";
import { MdOutlinePostAdd } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import * as r from "./RollingHeader.styled";

const RollingHeader = () => {
  const { eventId, pageUri } = useParams<{
    pageUri: string | undefined;
    eventId: string | undefined;
  }>();
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate(`/celebrate/rolling/${eventId}/${pageUri}/write`);
  };

  return (
    <>
      <r.Container>
        <r.Img src={Logo} alt="logo" onClick={() => navigate("/")} />
        <r.IconWrap>
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
