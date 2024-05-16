import * as r from "./ReviewPage.styled";
import { useState } from "react";
import TopSection from "@components/home/ReviewPage/TopSection";
import MiddleSection from "@components/home/ReviewPage/MiddleSection";
import Header from "@common/header";
import { createReview } from "@/apis/review";
import { useNavigate } from "react-router-dom";

const index = () => {
  const [regData, setRegData] = useState<{
    content: string;
    phoneNumber: string;
  }>({
    content: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();

  const onRegister = async () => {
    try {
      const response = createReview(regData);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <r.Container>
        <Header children={"후기 작성"} />
        <div style={{ marginTop: "50px" }}></div>
        <TopSection />
        <MiddleSection
          comment={regData.content}
          setComment={(value) =>
            setRegData((prev) => ({ ...prev, content: value }))
          }
          phone={regData.phoneNumber}
          setPhone={(value) =>
            setRegData((prev) => ({ ...prev, phoneNumber: value }))
          }
        />
        <r.LargeBtn onClick={onRegister}>등록하기</r.LargeBtn>
      </r.Container>
    </>
  );
};

export default index;
