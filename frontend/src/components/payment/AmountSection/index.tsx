import React, { ChangeEvent, useState } from "react";
import * as A from "@components/payment/AmountSection/AmountSection.styled";
import { AmountSectionType } from "@/types/fundingType";

const index = (props: AmountSectionType) => {
  const { amount, setAmount } = props;

  const cashList: number[] = [3000, 5000, 10000, 20000];
  const [targetCash, setTargetCash] = useState(0);

  const onClickCash = (e: React.SyntheticEvent) => {
    const clickedValue = Number(e.currentTarget.innerHTML.replace(",", ""));
    setTargetCash(clickedValue);
    setAmount((prevValue) => prevValue + clickedValue);
  };

  return (
    <A.Container>
      <A.Title>펀딩 금액</A.Title>
      <A.Input
        type="number"
        value={amount}
        placeholder="금액 직접 입력하기(최소 1000원)"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setAmount(Number(e.target.value))
        }
      />
      <A.BtnWrap>
        <A.Button onClick={onClickCash} $active={targetCash === cashList[0]}>
          {cashList[0].toLocaleString()}
        </A.Button>
        <A.Button onClick={onClickCash} $active={targetCash === cashList[1]}>
          {cashList[1].toLocaleString()}
        </A.Button>
        <A.Button onClick={onClickCash} $active={targetCash === cashList[2]}>
          {cashList[2].toLocaleString()}
        </A.Button>
        <A.Button onClick={onClickCash} $active={targetCash === cashList[3]}>
          {cashList[3].toLocaleString()}
        </A.Button>
      </A.BtnWrap>
    </A.Container>
  );
};

export default index;
