import { useState } from "react";
import { useParams } from "react-router-dom";
// import RegCard from "@/common/regCard";
import * as F from "@/components/funding/FundingLink/FundingLink.styled";
import Header from "@common/header";
import { useNavigate } from "react-router-dom";

const index = () => {
  const navigate = useNavigate();
  const [productLink, setProductLink] = useState("");
  const { eventId } = useParams<{ eventId: string }>();

  const handleClick = () => {
    if (productLink) {
      navigate(`/celebrate/rolling/${eventId}/funding-info`, {
        state: { productLink },
      });
    } else {
      alert("상품 구매 링크를 입력해주세요");
    }
  };

  return (
    <div style={{position:'relative'}}>
      <Header children="펀딩 등록하기" />
      <F.Container>
        <F.Img src={"/img/img_present_funding.png"} alt="" />
        <F.Wrap>
          <F.Label htmlFor="product-link">
            받고 싶은 선물을 구매할 수 있는 링크를 입력해주세요.
          </F.Label>
          <F.TextArea
            id="product-link"
            placeholder="상품 구매 링크 입력"
            value={productLink}
            onChange={(e) => setProductLink(e.target.value.trim())}
          />
          <F.Button onClick={handleClick}>다음</F.Button>
        </F.Wrap>
      </F.Container>
    </div>
  );
};

export default index;

{
  /* <F.Text>ㅊㅋ 추천 선물</F.Text> */
}
{
  /* <F.Carousel> */
}
{
  /* <RegCard
              imgUrl={present}
              title="삼성 갤럭시 버즈2 프로"
              amount="138880"
            />
            <RegCard
              imgUrl={present}
              title="삼성 갤럭시 버즈2 프로"
              amount="138880"
            /> */
}
{
  /* </F.Carousel> */
}
