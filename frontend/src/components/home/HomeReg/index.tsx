import * as h from "@components/home/HomeReg/HomeReg.styled";
import { MdPostAdd } from "react-icons/md";
import { LuPartyPopper } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const index = () => {
  const prevUrl = window.location.href;
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");

  const goEventReg = () => {
    sessionStorage.setItem("prevUrl", prevUrl);

    if (accessToken) {
      navigate("/celebrate");
    } else {
      navigate("/login");
    }
  };

  return (
    <h.Container>
      <h.TitleWrap>
        <h.Title>
          <h.Hightlight>축하</h.Hightlight>&nbsp;하고 싶은 날이 있으신가요?
        </h.Title>
        <h.Title>친구들과 함께 롤링 페이퍼를 작성해요.</h.Title>
      </h.TitleWrap>
      <h.Img src="/img/img_main_paper.png" />
      <h.Text>
        롤링 페이퍼는 <span style={{ color: "#ff3b85" }}>축하 당일날</span>{" "}
        공개됩니다
      </h.Text>
      <h.Button onClick={goEventReg}>
        <LuPartyPopper size={20} />
        축하 공간 생성
      </h.Button>
    </h.Container>
  );
};

export default index;
