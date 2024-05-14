import * as P from "@components/payment/Payment.styled";
import Header from "@common/header";
import AmountSection from "@components/payment/AmountSection";
import MethodSection from "@components/payment/MethodSection";
import MessageSection from "@/components/payment/MessageSection";
import FinalAmountSection from "@components/payment/FinalAmountSection";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { joinFunding } from "@/apis/funding";

interface ImpWindow extends Window {
  IMP?: any;
}
export type PayDataType = {
  amount: number;
  nickname: string;
  comment: string;
  pgId: string;
  transactionId: String;
};

const PaymentPage = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(1000);
  const [nickname, setNickname] = useState("");
  const [comment, setComment] = useState("");
  const { fundingId } = useParams<{ fundingId: string }>();

  const onPayment = async () => {
    sessionStorage.setItem("nickname", nickname);
    sessionStorage.setItem("comment", comment);
    sessionStorage.setItem("amount", amount.toString());

    const { IMP } = window as ImpWindow;
    IMP?.init(import.meta.env.VITE_PAYMENT_KEY);
    IMP?.request_pay(
      {
        pg: "kakaopay",
        pay_method: "card",
        merchant_uid: `chuka_${new Date().getTime()}`,
        name: "ㅊㅋ",
        amount: amount,
        buyer_email: "test@portone.io",
        buyer_name: nickname,
        buyer_tel: "010-1234-5678",
        buyer_addr: "서울특별시 강남구 삼성동",
        buyer_postcode: "123-456",
        m_redirect_url: `https://chuka.kr/celebrate/funding/${fundingId}/payment/doing`,
      },
      function (rsp: any) {
        if (rsp.success) {
          joinFunding(fundingId ? parseInt(fundingId, 10) : 0, {
            amount: amount,
            nickname: nickname,
            comment: comment,
            pgId: rsp.imp_uid,
            transactionId: rsp.merchant_uid,
          }).then((response) => {
            navigate(`/celebrate/funding/${fundingId}/payment/done`);
          });
        } else {
          console.log(rsp.error_msg);
        }
      }
    );
  };

  return (
    <div style={{ position: "relative" }}>
      <Header children="펀딩 참여하기" />
      <P.Container>
        <P.Wrap>
          <AmountSection amount={amount} setAmount={setAmount} />
          {/* <MethodSection /> */}
          <MessageSection
            nickname={nickname}
            setNickname={setNickname}
            comment={comment}
            setComment={setComment}
          />
          <FinalAmountSection amount={amount} setAmount={setAmount} />
          <P.Button onClick={onPayment}>결제하기</P.Button>
        </P.Wrap>
      </P.Container>
    </div>
  );
};

export default PaymentPage;
