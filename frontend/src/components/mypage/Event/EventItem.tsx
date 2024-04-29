import { colors } from "@/styles/theme";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export type MyEventItemType = {
  title: string;
  imgSrc: string;
  date: string;
  url: string;
  onClick?: () => void;
};

export const Container = styled.div`
  display: flex;
  width: 95%;
  height: 110px;
  border-radius: 1em;
  background-image: imgSrc;
  padding: 10px;
`;

export const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Dday = styled.p`
  font-size: 2em;
  font-weight: 600;
`;

export const Title = styled.p`
  font-size: 1.5em;
`;

export const Date = styled.p`
  color: ${colors.darkGray};
  font-size: 0.8em;
`;

export const IconWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const EventItem = (props: MyEventItemType) => {
  const { title, imgSrc, url, onClick, date } = props;

  const navigate = useNavigate();

  const goPage = () => url && navigate(url);

  return (
    <Container onClick={url ? goPage : onClick}>
      <InfoWrap>
        <Dday>{date}</Dday>
        <Title>{title}</Title>
        <Date>{date}</Date>
      </InfoWrap>
      <IconWrap></IconWrap>
    </Container>
  );
};

export default EventItem;
