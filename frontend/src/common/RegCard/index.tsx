import * as C from "@/common/RegCard/RegCard.styled";
import { RecCardType } from "@/types/commonType";

const index = (props: RecCardType) => {
  const { imgUrl, title, amount } = props;

  return (
    <C.Container>
      <C.Img src={imgUrl} alt="" />
      <C.Wrap>
        <div style={{ fontWeight: 300 }}>{title}</div>
        <div style={{ fontWeight: 700 }}>{Number(amount).toLocaleString()}</div>
      </C.Wrap>
      <C.Button>선택하기</C.Button>
    </C.Container>
  );
};

export default index;
