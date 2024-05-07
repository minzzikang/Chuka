import styled from "styled-components";
import { colors } from "@/styles/theme";


const Container = styled.div<{ $thumbNail: boolean }>`
  background-image: ${(props) =>
    props.$thumbNail
      ? `url('/img/img_loopy.jpg')`
      : "url('/img/img_chuka_info.png')"};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* background-size: contain; */
  width: 100%;
  height: 150px;
  border-radius: 30px;
  position: relative;
`;

const Wrap = styled.div`
  width: 100%;
  height: 44px;
  margin-top: 10px;
  background-color: ${colors.mainPink};
  display: flex;
  position: absolute;
  top: 50%;
`;

const WrapOverlay = styled.div`
  display: flex;
  width: 100%;
  height: 44px;
  opacity: 0.7;
  gap: 5px;
  /* justify-content: center; */
  align-items: center;
`;

const Img = styled.img`
  width: 31.5px;
  height: 34.5px;
`;

const DescWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
`;
const Title = styled.div`
  font-size: 1.2em;
  font-weight: 700;
`;

const Text = styled.div`
  font-size: 0.9em;
`

const index = () => {
  const thumbNail = true;

  return (
    <Container $thumbNail={thumbNail}>
      <Wrap>
        <WrapOverlay>
          <Img src="/img/img_default_profile.png" />
          <DescWrap>
            <Title>{"이벤트 제목"}</Title>
            <Text>
              {"2024-05-07"} ~ {"2024-05-20"}
            </Text>
          </DescWrap>
        </WrapOverlay>
      </Wrap>
    </Container>
  );
};

export default index;
