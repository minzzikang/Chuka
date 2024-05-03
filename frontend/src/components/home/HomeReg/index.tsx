import GoLogin from "@/common/goLogin/goLogin";
import * as h from "@components/home/HomeReg/HomeReg.styled";
import { useLocation, useNavigate } from "react-router-dom";

const index = () => {
  const currentUrl = window.location.href;
  const navigate = useNavigate()
  return (
    <h.Container>
      <h.TitleWrap>
        <h.Title>
          <h.Hightlight>축하</h.Hightlight>&nbsp;하고 싶은 날이 있으신가요?
        </h.Title>
        <h.Title>롤링 페이퍼를 작성하여 마음을 전달해요</h.Title>
      </h.TitleWrap>
      <h.Img src="/img/img_main_paper.png" />
      <h.Text>롤링 페이퍼는 축하 당일날 공개됩니다</h.Text>
      <h.Button onClick={() => navigate('/login', {state:{from:currentUrl}})}>
        <img src="/icon/icon_write.png" alt="" /> 작성하기
      </h.Button>
    </h.Container>
  );
};

export default index;
