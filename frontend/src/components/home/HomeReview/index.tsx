import { colors } from "@/styles/theme";
import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ReviewBoxContainer = styled.div<{ id: any }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.id % 2 === 0 ? "flex-start" : "flex-end")};
`;

const ReviewWrap = styled.div`
  width: 250px;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  gap: 5px;
`;

const Title = styled.div`
  font-size: 1.4em;
  font-weight: 700;
  margin: auto auto;
  margin-bottom: 10px;
`;

const Desc = styled.div`
    font-size: 1em;
    color: ${colors.gray};
    margin: auto auto;
    margin-bottom: 10px;
`

const Name = styled.div`
  font-size: 1.2em;
  font-weight: 500;
  color: #000;
`;

const Comment = styled.div`
  font-size: 0.8em;
  color: #000;
`;

const Button = styled.button`
  width: 100%;
  height: 45px;
  border-radius: 5px;
  color: white;
  background-color: ${colors.mainPink};
  margin-top: 20px;
`;

const index = () => {
  const navigate = useNavigate()
  const data = [
    {
      id: 0,
      name: "이OO",
      comment:
        "인사치레 정도로 고맙다고 표현하지만 제가 원하는 선물을 위트있게 말할 수 있어..",
    },
    {
      id: 1,
      name: "김OO",
      comment:
        "인사치레 정도로 고맙다고 표현하지만 제가 원하는 선물을 위트있게 말할 수 있어..",
    },
    {
      id: 2,
      name: "박OO",
      comment:
        "인사치레 정도로 고맙다고 표현하지만 제가 원하는 선물을 위트있게 말할 수 있어..",
    },
    {
      id: 3,
      name: "승OO",
      comment:
        "인사치레 정도로 고맙다고 표현하지만 제가 원하는 선물을 위트있게 말할 수 있어..",
    },
    {
      id: 4,
      name: "강OO",
      comment:
        "인사치레 정도로 고맙다고 표현하지만 제가 원하는 선물을 위트있게 말할 수 있어..",
    },
  ];

  return (
    <Container>
      <Title>ㅊㅋ 사용 후기</Title>
      <Desc>사용후기를 작성해주세요. 후기를 작성해주신 분들께 추첨을 통해 스타벅스 기프티콘을 드립니다. 사용 후기를 등록하면 실시간으로 공개됩니다.</Desc>
      {data &&
        data.map((item, index) => (
          <ReviewBoxContainer id={item.id} key={item.id}>
            <ReviewWrap>
              <Name>{item.name}</Name>
              <Comment>{item.comment}</Comment>
            </ReviewWrap>
          </ReviewBoxContainer>
        ))}
      <Button onClick={() => navigate('/review')} >사용 후기 등록하러가기</Button>
    </Container>
  );
};

export default index;
