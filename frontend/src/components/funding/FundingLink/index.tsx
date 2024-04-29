import { useState } from "react";
import present from "/img/img_present_funding.png";
import RegCard from "@/common/RegCard";
import * as F from "@/components/funding/FundingLink/FundingLink.styled";
import Header from "@common/header";
import { useNavigate } from "react-router-dom";

const index = () => {
  const [productLink, setProductLink] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/celebrate/funding-info/", { state: { productLink } });
  };

  return (
    <>
      <Header children="펀딩 등록하기" />
      <F.Container>
        <F.Img src={present} alt="" />
        <F.Wrap>
          <F.Label htmlFor="product-link">
            받고 싶은 선물을 구매할 수 있는 링크를 입력해주세요.
          </F.Label>
          <F.Input
            id="product-link"
            placeholder="상품 구매 링크 입력"
            value={productLink}
            onChange={(e) => setProductLink(e.target.value)}
          />
          <F.Button onClick={handleClick}>다음</F.Button>

          <div style={{ marginTop: "20px" }}></div>
          <F.Text>ㅊㅋ 추천 선물</F.Text>
          <F.Carousel>
            <RegCard
              imgUrl={present}
              title="삼성 갤럭시 버즈2 프로"
              amount="138880"
            />
            <RegCard
              imgUrl={present}
              title="삼성 갤럭시 버즈2 프로"
              amount="138880"
            />
          </F.Carousel>
        </F.Wrap>
      </F.Container>
    </>
  );
};

export default index;
