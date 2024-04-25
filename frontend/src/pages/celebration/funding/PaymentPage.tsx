import styled from "styled-components";

import AmountSection from "@components/payment/AmountSection";
import MethodSection from "@components/payment/MethodSection";
import MessageSection from "@/components/payment/MessageSection";
import Header from "@common/header";
import { colors } from "@/styles/theme";
import { SetStateAction, useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrap = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const TextWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Text = styled.div`
  color: ${colors.mainPink};
  font-size: 1em;
`;

const Button = styled.button`
  width: 100%;
  height: 49px;
  background-color: ${colors.mainPink};
  color: white;
`;

const BottomWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PaymentPage = () => {
  const [payData, setPayData] = useState({
    amount: 0,
    nickname: "",
    comment: "",
  });

  const [amount, setAmount] = useState(0);

  return (
    <>
      <Container>
        <Header children="펀딩 참여하기" />
        <Wrap>
          <AmountSection amount={amount} setAmount={setAmount} />
          <MethodSection />
          <MessageSection />
          <BottomWrap>
            <TextWrap>
              <Text>최종 결제금액</Text>
              <Text>{3000}원</Text>
            </TextWrap>
            <Button>결제하기</Button>
          </BottomWrap>
        </Wrap>
      </Container>
    </>
  );
};

export default PaymentPage;
