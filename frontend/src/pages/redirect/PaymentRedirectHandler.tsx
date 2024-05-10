import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { joinFunding } from "@/apis/funding";
import { PayDataType } from "@/components/payment/index.tsx";

const PaymentRedirectHandler = () => {
  const navigate = useNavigate();
  const pgId = new URLSearchParams(window.location.search).get("imp_uid") as string;
  const transactionId = new URLSearchParams(window.location.search).get("merchant_uid") as string;
  const isSuccess = new URLSearchParams(window.location.search).get("imp_success") as string;
  const nickname = sessionStorage.getItem("nickname") as string;
  const comment = sessionStorage.getItem("comment") as string;
  const amount = parseInt(sessionStorage.getItem("amount") || "0", 10);

  useEffect(() => {
    if (isSuccess === "true") {
      const payData: PayDataType = {
        amount,
        nickname,
        comment,
        pgId,
        transactionId,
      };

      joinFunding(payData)
        .then((response) => {
          // 결제 성공 시 처리 로직
          console.log("결제 성공:", response);
          navigate("/celebrate/payment/done");
        })
        .catch((error) => {
          // 결제 실패 시 처리 로직
          console.error("결제 실패:", error);
          navigate("/celebrate/payment");
        });
    } else {
      // 결제 실패 시 처리 로직
      console.error("결제 실패");
      navigate("/celebrate/payment");
    }
  }, []);

  return (
    <>
      <p>결제 처리 중입니다.</p>
    </>
  );
};
export default PaymentRedirectHandler;