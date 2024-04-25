import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";
import { set } from "date-fns";

type AddressType = {
//   postalCode: string;
  setPostalCode: Dispatch<SetStateAction<string>>;
//   address: string;
  setAddress: Dispatch<SetStateAction<string>>;
//   isAddressOpen: boolean
  setIsAddressOpen: Dispatch<SetStateAction<boolean>>;
};

const Container = styled.div`
  width: 100vw;
  height: 300px;
  background-color: #fff;
`;

const index = (props: AddressType) => {
  const { setPostalCode, setAddress,  setIsAddressOpen } = props;


  const onCompletePost = (data: any) => {
    setPostalCode(data.zonecode);
    setAddress(data.roadAddress);
    setIsAddressOpen(false)
  };

  return (
    <Container>
      <DaumPostcode onComplete={onCompletePost} />
    </Container>
  );
};

export default index;
