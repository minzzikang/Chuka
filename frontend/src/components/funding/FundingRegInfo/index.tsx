import { useState } from "react";
import Header from "@common/header";
import DefaultFunding from "/img/img_default_funding.png";
import { useLocation } from "react-router-dom";
import * as F from "@components/funding/FundingRegInfo/FundingRegInfo.styled";
import RModal from "@common/responsiveModal";
import AddressInput from "@/components/addressInput";
import FundingRegDoneModal from "@/components/funding/FundingRegDoneModal";

export type RegDataType = {
  product_link: string;
  introduce: string;
  option: string;
  goal_Amount: string | number;
  end_date: string;
  receiver_name: string;
  receiver_phone: string;
  postal_code: string;
  address: string;
  address_detail: string;
};

const index = () => {
  const location = useLocation();
  const { productLink } = location.state;

  const [regData, setRegData] = useState<RegDataType>({
    product_link: productLink,
    introduce: "",
    option: "",
    goal_Amount: "",
    end_date: "",
    receiver_name: "",
    receiver_phone: "",
    postal_code: "",
    address: "",
    address_detail: "",
  });

  const [isAddressOpen, setIsAddressOpen] = useState<boolean>(false);
  const [isRegOpen, setIsRegOpen] = useState<boolean>(false);

  const onRegister = async () => {
    console.log(regData);

    // 목표금액 number로 바꾸기

    // 새로운 모달 띄우기
    setIsRegOpen(true);
  };

  return (
    <>
      <F.Container>
        <Header children="펀딩 등록하기" />
        <F.Img src={DefaultFunding} />
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
              value={regData.goal_Amount}
              placeholder="금액을 입력해주세요(5000원 이상)"
              onChange={(e) =>
                setRegData((prevData) => ({
                  ...prevData,
                  goal_Amount: Number(e.target.value),
                }))
              }
            />
          </F.Inner>
          <F.Inner>
            <F.Label htmlFor="end_date">"펀딩 종료 일자"</F.Label>
            <F.Input
              id="end_date"
              value={regData.end_date}
              placeholder="펀딩 종료 일자를 입력해주세요(ex 20250518)"
              onChange={(e) =>
                setRegData((prevData) => ({
                  ...prevData,
                  end_date: e.target.value,
                }))
              }
              maxLength={8}
            />
          </F.Inner>
          <F.Inner>
            <F.Label htmlFor="receiver_name">"수령인 이름"</F.Label>
            <F.Input
              id="receiver_name"
              value={regData.receiver_name}
              placeholder="이름 입력"
              onChange={(e) =>
                setRegData((prevData) => ({
                  ...prevData,
                  receiver_name: e.target.value,
                }))
              }
            />
          </F.Inner>
          <F.Inner>
            <F.Label htmlFor="receiver_phone">"수령인 연락처"</F.Label>
            <F.Input
              id="receiver_phone"
              value={regData.receiver_phone}
              placeholder="휴대폰 번호 입력(ex 01043286612)"
              onChange={(e) =>
                setRegData((prevData) => ({
                  ...prevData,
                  receiver_phone: e.target.value,
                }))
              }
            />
          </F.Inner>

          <F.Label htmlFor="address"></F.Label>
          <div style={{ display: "flex", gap: "10px" }}>
            <F.SmallInput
              id="address"
              value={regData.postal_code}
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
            value={regData.address_detail}
            placeholder="상세 주소를 입력해주세요"
            onChange={(e) =>
              setRegData((prevData) => ({
                ...prevData,
                address_detail: e.target.value,
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
