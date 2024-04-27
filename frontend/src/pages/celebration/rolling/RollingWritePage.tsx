import Navbar from "@common/navbar";
import Header from "@common/header";
import { useNavigate, useLocation } from "react-router-dom";

const RollingWritePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const fetchData = location.state.value;
    
    const goNext = () => [navigate("/celebrate/rolling-preview")];


    return (
        <>
          <Header children="내용 작성하기" label="다음" onClick={goNext} />
          <Navbar current="celebration" />
        </>
      );

}

export default RollingWritePage;