import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";
import { RegDataType } from "../funding/FundingRegInfo";

type AddressType = {
  setValue: Dispatch<SetStateAction<RegDataType>>
  setIsAddressOpen: Dispatch<SetStateAction<boolean>>;
};

const Container = styled.div`
  width: 100vw;
  height: 300px;
  background-color: #fff;
`;

const index = (props: AddressType) => {
  const { setValue, setIsAddressOpen } = props;

  const onCompletePost = (data: any) => {
    setValue((prevData) => ({
      ...prevData,
      postal_code: data.zonecode,
      address: data.roadAddress
    })) 
    setIsAddressOpen(false)
  };

  return (
    <Container>
      <DaumPostcode onComplete={onCompletePost} />
    </Container>
  );
};

export default index;
