import { useNavigate } from "react-router";
import * as b from "./Banner.styeld";
import TestImg from "/img/img_main_banner.png";
import { IoMdSettings } from "react-icons/io";

const Banner = () => {
    const navigate = useNavigate();
    return (
        <>
        <b.Wrap>
          <b.Banner src={TestImg} />
          <b.Title>
            이벤트 제목
            <IoMdSettings onClick={() => navigate("/celebrate")} />
          </b.Title>
          <b.Name>작성자 이름</b.Name>
          <b.Dday>남은 날짜</b.Dday>
        </b.Wrap>
        </>
    );
};

export default Banner;