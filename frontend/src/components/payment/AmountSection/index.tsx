import React, { ChangeEvent, useState } from "react";
import * as A from "@components/payment/AmountSection/AmountSection.styled";
import { AmountSectionType } from "@/types/fundingType";
import styled from "styled-components";
import { colors } from "@/styles/theme";
import PayBox from "./PayBox";
import { FUNDING_IMGURL, FUNDING_COMMENT, FUNDING_HEIGHT, FUNDING_WIDTH } from "@/assets/data/payBox";


const index = (props: AmountSectionType) => {
  const { amount, setAmount } = props;

  const cashList: number[] = [1000, 5000, 10000, 20000, 30000, 50000];
  const [isActive, setIsActive] = useState<boolean[]>(
    Array(cashList.length).fill(false)
  );

  const [targetCash, setTargetCash] = useState<any>('');

  const onClickCash = (index: number) => {
    const clickedValue = cashList[index];
    setTargetCash(clickedValue);
    setAmount(clickedValue);
    setIsActive(
      isActive.map((_, i) => (i === index ? !isActive[i] : false))
    );
  };

  return (
    <A.Container>
      <A.Title>얼마를 선물할까요?</A.Title>
      <A.Input
        type="number"
        value={amount}
        placeholder="금액 직접 입력하기(최소 1000원)"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setAmount(Number(e.target.value))
        }
      />
      <A.Wrap>
        {cashList.map((cash, index) => (
          <PayBox
            key={index}
            cash={cash}
            isActive={isActive[index]}
            imgSrc={FUNDING_IMGURL[index]}
            width={FUNDING_WIDTH[index]}
            height={FUNDING_HEIGHT[index]}
            comment={FUNDING_COMMENT[index]}
            onClick={() => onClickCash(index)}
            />
        ))}

        {/* <A.Button onClick={onClickCash} $active={targetCash === cashList[0]}>
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
        </A.Button> */}
      </A.Wrap>
    </A.Container>
  );
};

export default index;
