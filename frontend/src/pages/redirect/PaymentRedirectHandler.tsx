import { useEffect } from "react";
import { useNavigate, useParams  } from "react-router-dom";
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
  const { fundingId: fundingIdStr } = useParams<{ fundingId: string}>()

  useEffect(() => {
    const fundingId = parseInt(fundingIdStr || '0', 10);
    if (isSuccess === "true") {
      const payData: PayDataType = {
        amount,
        nickname,
        comment,
        pgId,
        transactionId,
      };

      joinFunding(fundingId, payData)
        .then((response) => {
          // 결제 성공 시 처리 로직
          console.log("결제 성공:", response);
          navigate(`/celebrate/funding/${fundingId}/payment/done`);
        })
        .catch((error) => {
          // 결제 실패 시 처리 로직
          console.error("결제 실패:", error);
          alert("결제에 실패했습니다. 다시 시도해주세요.");
          navigate(`/celebrate/funding/${fundingId}/payment`);
        });
    } else {
      // 결제 실패 시 처리 로직
      console.error("결제 실패");
      alert("결제에 실패했습니다. 다시 시도해주세요.");
      navigate(`/celebrate/funding/${fundingId}/payment`);
    }
  }, []);

  return (
    <>
      <p>결제 처리 중입니다.</p>
    </>
  );
};
export default PaymentRedirectHandler;