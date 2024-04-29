import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "@/styles/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Text = styled.div`
  font-size: 1.2em;
`;

const Highlight = styled(Text)`
  color: ${colors.mainPink};
`;

const Wrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
`;

const index = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <img src="/img/img_event_manage.png" alt="" />
      <Wrap>
        <Highlight>축하</Highlight> {''} 중인 이벤트가 없어요.
      </Wrap>
        <Text>등록하러 가볼까요?</Text>
      <img
        src="/img/img_arrow_btn.png"
        alt=""
        onClick={() => navigate("/celebrate")}
      />
    </Container>
  );
};

export default index;
