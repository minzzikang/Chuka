import FundingHeaderSection from "./Header";
import FundingCrawlingSection from "./Crawling";
import FundingMessageSection from "./Message";
import * as f from "./FundingDetail.styled";
import { useNavigate, useParams } from "react-router-dom";
import { fetchFunding } from "@/apis/funding";
import { useEffect, useState } from "react";
import { calculatePercent } from "@/utils/calculation";
import RModal from "@common/homeResModal";
import FundingDeleteModal from "@/pages/celebration/funding/FundingDeleteModal";
import Navbar from "@common/navbar";

type FundingType = {
  userId: string;
  fundingId: number;
  eventDate: string;
  eventTitle: string;
  status: string;
  productImage: string;
  productName: string;
  goalAmount: number;
  remainAmount: number;
  productLink: string;
  introduce: string;
  sponsors: [];
  dday: number;
  nickname: string;
  eventId: number;
  pageUri: string;
};

const index = () => {
  const params = useParams();
  const navigate = useNavigate();
  const fundingId = Number(params.fundingId);
  const fundingUrl = window.location.href;
  const currentUser = JSON.parse(localStorage.getItem("currentUser") ?? "{}");
  const currentUserId = currentUser.userState?.userId ?? "";
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [values, setValues] = useState<FundingType>();

  // 펀딩 상세 조회 요청
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFunding(fundingId);
        setValues(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [fundingId]);

  const eventUserId = values?.userId;

  const goPayment = () => {
    if (
      values?.remainAmount &&
      values?.goalAmount &&
      values?.remainAmount <= values?.goalAmount
    ) {
      navigate(`/celebrate/funding/${fundingId}/payment`);
    } else {
      alert("모금이 완료되었습니다.");
    }
  };

  return (
    <>
      <FundingHeaderSection
        fundingUrl={fundingUrl}
        productImgUrl={values?.productImage}
        productName={values?.productName}
        nickname={values?.nickname ?? ""}
        pageUri={values?.pageUri}
        eventId={values?.eventId}
      />
      <f.Container>
        <FundingCrawlingSection
          productLink={
            values?.productLink ?? "상품 링크가 등록되지 않았습니다."
          }
          percent={
            values
              ? calculatePercent(values.goalAmount, values.remainAmount)
              : 0
          }
          image={values?.productImage ?? "/img/img_default_funding.png"}
          title={
            values?.productName ??
            "정보를 불러오는 데 실패했습니다."
          }
          date={values?.eventDate ?? "0000-00-00"}
          goalAmount={values?.goalAmount ?? 0}
          remainAmount={values?.remainAmount ?? 0}
          dDay={values?.dday ?? 0}
        />
        <FundingMessageSection
          introduce={values?.introduce ?? "ㅊㅋ와 함께 원하는 선물은 펀딩해요."}
          sponsor={values?.sponsors ?? []}
        />

        {eventUserId === currentUserId ? (
          <f.BtnWrap>
            <f.PinkBtn onClick={goPayment}>펀딩 직접 참여</f.PinkBtn>
            <f.WhiteBtn onClick={() => setIsModalOpen(true)}>
              펀딩 삭제
            </f.WhiteBtn>
          </f.BtnWrap>
        ) : (
          <f.PinkBtn onClick={goPayment}>선물 펀딩 참여하기</f.PinkBtn>
        )}

        {isModalOpen && (
          <RModal name={"펀딩 상품 삭제"} onClose={() => setIsModalOpen(false)}>
            <FundingDeleteModal
              setFundingModalOpen={setIsModalOpen}
              fundingId={fundingId}
            />
          </RModal>
        )}
      </f.Container>
      <Navbar current="celebration" />
    </>
  );
};

export default index;
