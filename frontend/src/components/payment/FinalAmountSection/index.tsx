import * as F from "@components/payment/FinalAmountSection/FinalAmountSection.styled"
import { useState } from "react";
import { AmountSectionType } from "@/types/fundingType";




const index = (props:AmountSectionType) => {

  const {amount, setAmount} = props


  return (
    <F.Container>
      <F.Text>최종 결제금액</F.Text>
      <F.Text>{amount}원</F.Text>
    </F.Container>
  );
};

export default index;
