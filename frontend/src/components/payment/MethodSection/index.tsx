import { colors } from "@/styles/theme";
import styled from "styled-components";
import React, { useState } from "react";

import * as M from '@components/payment/MethodSection/MethodSection.styled'



const index = () => {
  const [payment, setPayment] = useState("kakao");

  return (
    <M.Container>
      <M.Title>결제 수단</M.Title>

      <M.Img
        src="/img/img_logo_kakaopay.png"
        alt=""
        onClick={() => setPayment("kakao")}
        $active={payment === "kakao"}
      />
    </M.Container>
  );
};

export default index;
