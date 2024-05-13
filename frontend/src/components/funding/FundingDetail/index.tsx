import FundingHeaderSection from "./Header";
import FundingCrawlingSection from "./Crawling";
import FundingMessageSection from "./Message";
import * as f from "./FundingDetail.styled";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchFunding } from "@/apis/funding";
import { useEffect, useState } from "react";
import { calculatePercent } from "@/utils/calculation";
import RModal from "@common/responsiveModal";
import FundingDeleteModal from "@/pages/celebration/funding/FundingDeleteModal";

type FundingType = {
  userId:string;
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

// 3463207627
const index = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate()
  const fundingId = Number(params.fundingId);
  const fundingUrl = window.location.href;
  const currentUser = JSON.parse(localStorage.getItem("currentUser") ?? "{}");
  const currentUserId = currentUser.userState?.userId ?? '';
  const eventUrl = sessionStorage.getItem("prevUrl");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [values, setValues] = useState<FundingType>();
  const accessToken = localStorage.getItem('access_token')

  // 펀딩 상세 조회 요청
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFunding(fundingId);
        console.log("펀딩 상세 조회", response);
        setValues(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [fundingId]);

  const eventUserId = values?.userId;

  return (
    <f.Container>
      <FundingHeaderSection
        fundingUrl={fundingUrl}
        productImgUrl={values?.productImage}
        productName={values?.productName}
        nickname={values?.nickname ?? ''}
        pageUri={values?.pageUri}
        eventId={values?.eventId}
      />
      <FundingCrawlingSection
        percent={
          values ? calculatePercent(values.goalAmount, values.remainAmount) : 0
        }
        image={values?.productImage ?? "/img/img_default_funding.png"}
        title={values?.productName ?? "유효하지않은 링크로 크롤링에 실패했습니다. 직접 수정해주세요."}
        date={values?.eventDate ?? "0000-00-00"}
        goalAmount={values?.goalAmount ?? 0}
        remainAmount={values?.remainAmount ?? 0}
        dDay={values?.dday ?? 0}
      />
      <FundingMessageSection
        productLink={values?.productLink ?? "상품 링크가 등록되지 않았습니다."}
        introduce={values?.introduce ?? "펀딩을 소개하는 문구입니다."}
        sponsor={values?.sponsors ?? []}
      />

      {eventUserId === currentUserId ? (
        <f.BtnWrap>
          <f.PinkBtn onClick={() => navigate(`/celebrate/funding/${fundingId}/payment`)}>펀딩 직접 참여</f.PinkBtn>
          <f.WhiteBtn onClick={() => setIsModalOpen(true)}>펀딩 삭제</f.WhiteBtn>
        </f.BtnWrap>
      ) : (
        <f.PinkBtn onClick={() => navigate(`/celebrate/funding/${fundingId}/payment`)}>선물 펀딩 참여하기</f.PinkBtn>
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
  );
};

export default index;
