import * as P from "@components/payment/Payment.styled"
import Header from "@common/header";
import AmountSection from "@components/payment/AmountSection";
import MethodSection from "@components/payment/MethodSection";
import MessageSection from "@/components/payment/MessageSection";
import FinalAmountSection from "@components/payment/FinalAmountSection";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [payData, setPayData] = useState<PayDataType>({
    amount: amount,
    nickname: nickname,
    comment: comment,
    pgId: "",
    transactionId: "",
  });

  const onPayment = async () => {
    console.log(amount);
    console.log(nickname);
    console.log(comment);

    sessionStorage.setItem('nickname', nickname);
    sessionStorage.setItem('comment', comment);
    sessionStorage.setItem('amount', amount.toString());
    
    const { IMP } = window as ImpWindow;
    IMP?.init('imp34763563');
    IMP?.request_pay({
        pg: 'kakaopay',
        pay_method: 'card',
        merchant_uid: `chuka_${new Date().getTime()}`,
        name: 'ㅊㅋ',
        amount: amount,
        buyer_email: 'test@portone.io',
        buyer_name: nickname,
        buyer_tel: '010-1234-5678',
        buyer_addr: '서울특별시 강남구 삼성동',
        buyer_postcode: '123-456',
        m_redirect_url: 'http://localhost:5000',
      }, function (rsp: any) {
        if (rsp.success) {
          console.log('결제 성공');
          console.log(rsp.imp_uid);
          console.log(rsp.merchant_uid);
          
          setPayData(prevPayData => ({
            ...prevPayData,
            pgId: rsp.imp_uid,
            transactionId: rsp.merchant_uid,
          }));
        joinFunding({
          ...payData,
          pgId: rsp.imp_uid,
          transactionId: rsp.merchant_uid,
        })
        .then(response => {
            console.log(response);
            navigate('/celebrate/payment/done');
        });
        } else {
          console.log('결제 실패');
          console.log(rsp.error_msg);
        }
      }
    );
  };

  return (
    <>
      <Header children="펀딩 참여하기" />
      <P.Container>
        <P.Wrap>
          <AmountSection amount={amount} setAmount={setAmount} />
          <MethodSection />
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
    </>
  );
};

export default PaymentPage;
