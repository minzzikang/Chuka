import { IoMdAdd } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import * as d from "./DrawerModal.styled";
import { useEffect, useState } from "react";
import { fetchFundings } from "@/apis/funding";
import FundingCard from "@common/fundingCard";

export type fundingData = {
    fundingId:number
    productImage:string
    productName:string
    introduce: string
    startDate:string
    endDate:string
    fundingResult:string
}

const DrawerModal = (props: {eventUserId?:string | undefined}) => {
  const {eventUserId} = props

  const navigate = useNavigate();
  const { eventId } = useParams<{
    eventId: string;
  }>();
  const [fundingData, setFundingData] = useState<fundingData[]>([]);
  // json.parse() 쓰는 이유 : localstorage의 데이터는 json형식으로 저장 -> 다시 js객체로 변환해서 사용해야함
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '{}')
  const currentUserId = currentUser.userState.userId ?? ''

  // 펀딩 목록 조회 요청
  useEffect(() => {
    const fetchFunding = async () => {
      if (typeof eventId == "string") {
        try {
          const fundingInfo = await fetchFundings(eventId);
          console.log("펀딩 목록 조회", fundingInfo);
          setFundingData(fundingInfo);
        } catch (err) {
          console.error(err);
          throw err;
        }
      } else {
        console.error("eventId 이상");
      }
    };
    fetchFunding();
  }, [eventId]);

  // 펀딩 상품 등록 페이지 이동
  const goCreateFunding = () => {
    if (eventUserId === currentUserId) {
      if (fundingData.length < 4) {
        navigate(`/celebrate/rolling/${eventId}/fundings` )
      } else {
        alert('펀딩 상품은 4개까지 등록 가능합니다.')
      }
    } else {
      alert('이벤트 등록자만 상품 등록이 가능합니다')
    }
  }

  return (
    <d.Container>
      { !fundingData.length && <p>진행 중인 펀딩이 없습니다.</p> }

      {fundingData &&
        fundingData.map((funding, index) => (
          <FundingCard
            key={index}
            eventUserId={eventUserId}
            fundingId={funding.fundingId}
            productImgUrl={funding.productImage}
            productName={funding.productName}
            introduce={funding.introduce}
            startDate={funding.startDate}
            endDate={funding.endDate}
            fundingResult={funding.fundingResult}
          />
        ))}
      <d.Button
        onClick={goCreateFunding}
      >
        <IoMdAdd /> &nbsp; 펀딩 추가
      </d.Button>
    </d.Container>
  );
};

export default DrawerModal;
