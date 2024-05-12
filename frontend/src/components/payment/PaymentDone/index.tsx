import * as r from '@components/payment/PaymentDone/PaymentDone.styled'
import { useNavigate } from 'react-router'
import Lottie from 'react-lottie'
import paySuccess from '@assets/lottie/paySuccess.json'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'



const Index = () => {
  const navigate = useNavigate()
  const { fundingId } = useParams<{ fundingId: string}>()

  useEffect(() => {
    sessionStorage.removeItem("nickname");
    sessionStorage.removeItem("comment");
    sessionStorage.removeItem("amount");
    sessionStorage.removeItem("fundingId");
  }, []);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: paySuccess,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },

  }



  return (
    <r.Container>
      <r.Top>
        <r.Title>결제 완료</r.Title>
        {/* <r.Icon src="/icon/icon_check_pink.png" alt="" /> */}
        <Lottie options={defaultOptions} width={200} height={200}/>
        <r.SubTitle>결제가 정상적으로 처리되었습니다.</r.SubTitle>
      </r.Top>
      <r.Bottom>
        <r.Line />
        <r.Desc>
          <span>* 결제 취소는 가맹점에서 취소 요청을 해야합니다.</span>
        </r.Desc>
        <r.Button disabled={false} onClick={() => navigate(`/celebrate/funding/${fundingId}`)}>확인</r.Button>
      </r.Bottom>
    </r.Container>
  )
}

export default Index
