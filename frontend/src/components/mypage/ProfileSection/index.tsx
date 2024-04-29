import { colors } from "@/styles/theme";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  margin: 0 auto;
`;

const Profile = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 20px;
  border-radius: 100%;
`;

const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 1.2em;
`;

const Description = styled.div`
  font-weight: 400;
  font-size: 1em;
  color: ${colors.gray};
`;

const index = () => {
  const isUser = false;

  return (
    <Container>
      <Profile
        src={
          isUser ? "/img/img_main_paper.png" : "/img/img_default_profile.png"
        }
      />
      <InfoWrap>
        <Name>{isUser ? "유저이름" : "로그인 필요"}</Name>

        {isUser ? undefined : (
          <Description>원활한 서비스 이용을 위해 로그인을 해주세요</Description>
        )}
      </InfoWrap>
    </Container>
  );
};

export default index;
