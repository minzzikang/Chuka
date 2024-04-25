import * as P from "@components/payment/Payment.styled"
import Header from "@common/header";
import AmountSection from "@components/payment/AmountSection";
import MethodSection from "@components/payment/MethodSection";
import MessageSection from "@/components/payment/MessageSection";
import FinalAmountSection from "@components/payment/FinalAmountSection";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const PaymentPage = () => {
  const navigate = useNavigate();
  const [payData, setPayData] = useState({
    amount: 0,
    nickname: "",
    comment: "",
  });

  const [amount, setAmount] = useState(1000);
  const [nickname, setNickname] = useState("");
  const [comment, setComment] = useState("");

  const onPayment = async () => {
    console.log(amount);
    console.log(nickname);
    console.log(comment);
    navigate("/");
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
