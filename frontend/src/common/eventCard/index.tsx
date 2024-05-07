import styled from "styled-components";
import { colors } from "@/styles/theme";


const Container = styled.div<{ $thumbNailUrl: string }>`
  background-image: ${(props) =>
    props.$thumbNailUrl
      ? `url('${props.$thumbNailUrl}')`
      : "url('/icon/apple-touch-icon.png')"};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* background-size: contain; */
  width: 120px;
  height: 120px;
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

const DescWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  /* align-items: center; */
`;
const Title = styled.div`
  font-size: 1em;
  font-weight: 700;
`;

const Date = styled.div`
  font-size: 0.5em;
`

export type EventCardType = {
    title:string
    createTime:string
    date: string
    thumbNailUrl: string
}

const index = (props: EventCardType) => {
  const {title, createTime, date, thumbNailUrl} = props

  const formatCreateTime = createTime.split("T")[0]

  return (
    <Container $thumbNailUrl={thumbNailUrl}>
      <Wrap>
        <WrapOverlay>
          <DescWrap>
            <Title>{title}</Title>
            <Date>
              {formatCreateTime} ~ {date}
            </Date>
          </DescWrap>
        </WrapOverlay>
      </Wrap>
    </Container>
  );
};

export default index;
