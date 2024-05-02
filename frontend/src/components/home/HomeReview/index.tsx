import { useNavigate } from "react-router";
import * as h from "@components/home/HomeReview/HomeReview.styled"

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
    <h.Container>
      <h.Title>ㅊㅋ 사용 후기</h.Title>
      <h.Desc>사용후기를 작성해주세요. 후기를 작성해주신 분들께 추첨을 통해 스타벅스 기프티콘을 드립니다. 사용 후기를 등록하면 실시간으로 공개됩니다.</h.Desc>
      {data &&
        data.map((item, index) => (
          <h.ReviewBoxContainer id={item.id} key={item.id}>
            <h.ReviewWrap>
              <h.Name>{item.name}</h.Name>
              <h.Comment>{item.comment}</h.Comment>
            </h.ReviewWrap>
          </h.ReviewBoxContainer>
        ))}
      <h.Button onClick={() => navigate('/review')} >사용 후기 등록하러가기</h.Button>
    </h.Container>
  );
};

export default index;
