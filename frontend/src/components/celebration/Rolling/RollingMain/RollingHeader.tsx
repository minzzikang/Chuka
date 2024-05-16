import Logo from "/img/img_logo.png";
import { useNavigate, useParams } from "react-router-dom";
import * as r from "./RollingHeader.styled";

const RollingHeader = () => {
  const navigate = useNavigate()

  return (
    <>
      <r.Container>
        <r.Img src={Logo} alt="logo" onClick={() => navigate("/")} />
      </r.Container>
    </>
  );
};

export default RollingHeader;
