import { useNavigate } from "react-router";
import * as h from "@components/home/HomeReview/HomeReview.styled";
import { useEffect, useState } from "react";
import { fetchReview } from "@/apis/review";

const index = () => {
  const navigate = useNavigate();
  const nameData = ['익명의 고릴라', '익명의 사자', '익명의 호랑이', '익명의 고양이', '익명의 강아지', '익명의 다람쥐', '익명의 래서팬더', '익명의 곰']

  const [reviewData, setReviewData] = useState([]);
  const [randomName, setRandomName] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
       const data = await fetchReview()
       setReviewData(data)
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };
    fetchData();
  }, [setReviewData]);

  const getRandomName = () => {
    const randomIndex = Math.floor(Math.random() * nameData.length)
    return nameData[randomIndex]
  }

  useEffect(() => {
    setRandomName(getRandomName());
  }, []);

  return (
    <h.Container>
      <h.Title>ㅊㅋ 사용 후기</h.Title>
      <h.Desc>
        사용후기를 작성해주세요. 후기를 작성해주신 분들께 추첨을 통해 스타벅스
        기프티콘을 드립니다. 사용 후기를 등록하면 실시간으로 공개됩니다.
      </h.Desc>
      {reviewData &&
        reviewData.map((item, index) => {
          const randomNameIndex = index % nameData.length; // 사용자 인덱스에 맞게 이름 인덱스 계산
          const randomName = nameData[randomNameIndex]; // 해당 인덱스에 해당하는 이름 선택
          return (
          <h.ReviewBoxContainer id={index} key={index}>
            <h.ReviewWrap>
              <h.Name>{randomName}</h.Name>
              <h.Comment>{item.content}</h.Comment>
            </h.ReviewWrap>
          </h.ReviewBoxContainer>
          )
})}
      <h.Button onClick={() => navigate("/review")}>
        사용 후기 등록하러가기
      </h.Button>
    </h.Container>
  );
};

export default index;
