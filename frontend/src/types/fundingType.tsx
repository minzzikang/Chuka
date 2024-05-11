import { Dispatch, SetStateAction } from "react";

export type MessageSectionType = {
  nickname: string;
  setNickname: Dispatch<SetStateAction<string>>;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
};

export type AmountSectionType = {
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
};

export type FundingDataType = {
  fundingId: number;
  eventId: number;
  introduce: string;
  fundingResult: string;
  productName: string;
  productImage: string;
  startDate: string;
  endDate: string;
};
