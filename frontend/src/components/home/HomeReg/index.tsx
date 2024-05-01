import React from "react";
import styled from "styled-components";
import { colors } from "@/styles/theme";

const Container = styled.div`
  width: 100%;
  height: 300px;
  background-color: #ffff;
  border-radius: 10%;
  /* opacity: 0.8; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3em;
  font-weight: 600;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
`;
const Text = styled.div`
  font-size: 1em;
`;

const Hightlight = styled.div`
  color: ${colors.mainPink};
`;

const Button = styled.button`
  width: 104px;
  height: 35.1px;
  background-color: ${colors.mainPink};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 10px;
`;

const index = () => {
  return (
    <Container>
      <div>
        <Title>
          <Hightlight>축하</Hightlight>&nbsp;하고 싶은 날이 있으신가요?
        </Title>
        <Title>롤링 페이퍼를 작성하여 마음을 전달해요</Title>
      </div>
      <Img src="/img/img_main_paper.png" />
      <Text>롤링 페이퍼는 축하 당일날 공개됩니다</Text>
      <Button><img src="/icon/icon_write.png" alt="" /> 작성하기</Button>
    </Container>
  );
};

export default index;
