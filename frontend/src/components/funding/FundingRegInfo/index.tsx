import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchEventInfo } from "@/apis/event";
import Header from "@common/header";
import DefaultFunding from "/img/img_default_funding.png";
import * as F from "@components/funding/FundingRegInfo/FundingRegInfo.styled";
import RModal from "@common/responsiveModal";
import AddressInput from "@/components/addressInput";
import FundingRegDoneModal from "@/components/funding/FundingRegDoneModal";
import { createFunding } from "@/apis/funding";


export type RegDataType = {
  eventId:  number;
  productLink: string;
  introduce: string;
  option: string;
  goalAmount: string | number;
  endDate: string;
  receiverName: string;
  receiverPhone: string;
  postalCode: string;
  address: string;
  addressDetail: string;
};

const index = () => {
  const location = useLocation();
  const { productLink } = location.state;
  const { eventId, pageUri } = useParams<{ eventId: string; pageUri: string }>();

  const [regData, setRegData] = useState<RegDataType>({
    eventId: Number(eventId),
    productLink: productLink,
    introduce: "",
    option: "",
    goalAmount: "",
    endDate: "",
    receiverName: "",
    receiverPhone: "",
    postalCode: "",
    address: "",
    addressDetail: "",
  });


  const [isAddressOpen, setIsAddressOpen] = useState<boolean>(false);
  const [isRegOpen, setIsRegOpen] = useState<boolean>(false);

  const onRegister = async () => {

    console.log(regData);
    try {
      const response = await createFunding(regData)
      console.log("찐찐찐찐찐찐찐찐찐찐찐찐", response);
      setIsRegOpen(true);
    } catch (err) {
      console.error(err)
    }


  };

  return (
    <>
      <F.Container>
        <Header children="펀딩 등록하기" />
        <F.Img src={DefaultFunding}  />
        <F.Wrap>
          <F.Inner>
            <F.Label htmlFor="introduce">"한 줄 펀딩 소개"</F.Label>
            <F.Input
              id="introduce"
              value={regData.introduce}
              placeholder="펀딩글을 소개하는 문구를 작성해주세요"
              onChange={(e) =>
                setRegData((prevData) => ({
                  ...prevData,
                  introduce: e.target.value,
                }))
              }
            />
          </F.Inner>
          <F.Inner>
            <F.Label htmlFor="option">"펀딩 상품 상세 옵션"</F.Label>
            <F.Input
              id="option"
              value={regData.option}
              placeholder="펀딩 받을 상품의 상세 옵션을 입력해주세요.(색상, 수량, 추가정보 등)"
              onChange={(e) =>
                setRegData((prevData) => ({
                  ...prevData,
                  option: e.target.value,
                }))
              }
            />
          </F.Inner>
          <F.Inner>
            <F.Label htmlFor="goal_Amount">"펀딩 목표 금액"</F.Label>
            <F.Input
              id="goal_Amount"
              value={regData.goalAmount}
              placeholder="금액을 입력해주세요(5000원 이상)"
              onChange={(e) =>
                setRegData((prevData) => ({
                  ...prevData,
                  goalAmount: Number(e.target.value),
                }))
              }
            />
          </F.Inner>
          <F.Inner>
            <F.Label htmlFor="end_date">"펀딩 종료 일자"</F.Label>
            <F.Input
              id="end_date"
              value={regData.endDate}
              placeholder="펀딩 종료 일자를 입력해주세요(ex 2024-05-18)"
              onChange={(e) =>
                setRegData((prevData) => ({
                  ...prevData,
                  endDate: (e.target.value).replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"),
                }))
              }
              maxLength={10}
            />
          </F.Inner>
          <F.Inner>
            <F.Label htmlFor="receiver_name">"수령인 이름"</F.Label>
            <F.Input
              id="receiver_name"
              value={regData.receiverName}
              placeholder="이름 입력"
              onChange={(e) =>
                setRegData((prevData) => ({
                  ...prevData,
                  receiverName: e.target.value,
                }))
              }
            />
          </F.Inner>
          <F.Inner>
            <F.Label htmlFor="receiver_phone">"수령인 연락처"</F.Label>
            <F.Input
              id="receiver_phone"
              value={regData.receiverPhone}
              placeholder="휴대폰 번호 입력(ex 01043286612)"
              onChange={(e) =>
                setRegData((prevData) => ({
                  ...prevData,
                  receiverPhone: e.target.value,
                }))
              }
            />
          </F.Inner>

          <F.Label htmlFor="address"></F.Label>
          <div style={{ display: "flex", gap: "10px" }}>
            <F.SmallInput
              id="address"
              value={regData.postalCode}
              placeholder="우편번호"
            />
            <F.SmallBtn onClick={() => setIsAddressOpen(true)}>
              우편번호 검색
            </F.SmallBtn>
          </div>

          <F.Input
            id="address"
            value={regData.address}
            placeholder="주소를 입력해주세요"
          />
          <F.Input
            id="address"
            value={regData.addressDetail}
            placeholder="상세 주소를 입력해주세요"
            onChange={(e) =>
              setRegData((prevData) => ({
                ...prevData,
                addressDetail: e.target.value,
              }))
            }
          />
          <F.LargeBtn onClick={onRegister}>펀딩 상품 등록</F.LargeBtn>

          {isAddressOpen && (
            <RModal
              name={"우편번호 검색"}
              onClose={() => setIsAddressOpen(false)}
            >
              <AddressInput
                setValue={setRegData}
                setIsAddressOpen={setIsAddressOpen}
              />
            </RModal>
          )}

          {isRegOpen && (
            <RModal
              name={"펀딩 등록 신청 완료"}
              onClose={() => setIsRegOpen(false)}
            >
              <FundingRegDoneModal />
            </RModal>
          )}
        </F.Wrap>
      </F.Container>
    </>
  );
};

export default index;
