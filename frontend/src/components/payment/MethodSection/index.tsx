import "@styles/radioBtn.css";
import { useState } from "react";
import * as M from "@components/payment/MethodSection/MethodSection.styled";

const index = () => {
  const [payment, setPayment] = useState("kakao");

  return (
    <M.Container>
      <M.Title>결제 수단</M.Title>
      <label htmlFor="kakao" style={{ display: "flex", alignItems: "center" }}>
        <M.Radio
          type="radio"
          id="kakao"
          checked={payment === "kakao"}
          onChange={() => setPayment("kakao")}
        />
        <M.Img src="/img/img_logo_kakaopay.png" alt="kakaoPay" />
      </label>
    </M.Container>
  );
};

export default index;
