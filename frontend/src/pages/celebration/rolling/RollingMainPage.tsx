import RollingHeader from "@/components/celebration/Rolling/RollingMain/RollingHeader";
import Banner from "@/components/celebration/Rolling/RollingMain/Banner";
import Navbar from "@common/navbar";
import styled from "styled-components";
import { sizes } from "@styles/theme";
import Board from "@/components/celebration/Rolling/RollingMain/Board";


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 62px);
  min-width: ${sizes.minWidth};
  max-width: ${sizes.maxWidth};
  @media only screen and (min-width: 430px) {
    width: 430px;
  }
  @media only screen and (min-width: 600px) {
    width: 375px;
  }
  position: relative;
`;

const RollingMainPage = () => {
  return (
    <>
      <Container>
        <RollingHeader />
        <Banner />
        <Board />
      </Container>
      <Navbar current="celebration" />
    </>
  );
};

export default RollingMainPage;
