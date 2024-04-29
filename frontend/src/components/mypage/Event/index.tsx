import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { colors } from "@/styles/theme";
import styled from "styled-components";
import SearchBar from "@/components/searchBar";
import EventItem from "./EventItem";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  margin-top: 20px;
`;

const index = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <SearchBar />
      {/* <EventItem title={""} imgSrc={""} date={""} url={""} /> */}
    </Container>
  );
};

export default index;
