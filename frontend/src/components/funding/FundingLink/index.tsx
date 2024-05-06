import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchEventInfo } from "@/apis/event";
// import RegCard from "@/common/regCard";
import * as F from "@/components/funding/FundingLink/FundingLink.styled";
import Header from "@common/header";
import { useNavigate } from "react-router-dom";

const index = () => {
  const [productLink, setProductLink] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/celebrate/:eventId/funding-info/", { state: { productLink } });
  };

  const { eventId } = useParams<{ eventId: string }>();

  useEffect(() => {
    const fetchInfo = async () => {
      if (typeof eventId === "string") {
        try {
          const eventInfo = await fetchEventInfo(eventId);
          console.log("이벤트get요청", eventInfo);
          // setRegData(eventInfo);
        } catch (err) {
          console.error(err);
        }
      } else {
        console.error("eventId fetch error");
      }
    };
    fetchInfo();
  }, [eventId]);

  return (
    <>
      <Header children="펀딩 등록하기" />
      <F.Container>
        <F.Img src={"/img/img_present_funding.png"} alt="" />
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
            {/* <RegCard
              imgUrl={present}
              title="삼성 갤럭시 버즈2 프로"
              amount="138880"
            />
            <RegCard
              imgUrl={present}
              title="삼성 갤럭시 버즈2 프로"
              amount="138880"
            /> */}
          </F.Carousel>
        </F.Wrap>
      </F.Container>
    </>
  );
};

export default index;
