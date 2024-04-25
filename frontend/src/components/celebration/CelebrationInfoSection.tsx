import Input from "@common/input";
import Label from "@common/label";
import { RollingInfoSectionType } from "@/types/rollingType";
import * as c from "@components/celebration/CelebrationInfoSection.styled";

const CelebrationInfoSection = (props: RollingInfoSectionType) => {
  const { handleTitle, title, isVisible, handleVisible } = props;

  return (
    <c.Container>
      <Label htmlFor="title" children="ㅊㅋ 제목" />
      <c.Wrap>
        <c.Input
          id="title"
          placeholder="축하하는 날의 이름을 적어주세요."
          value={title}
          onChange={(e) => handleTitle(e.target.value)}
        />
      </c.Wrap>
      <Label htmlFor="visible" children="ㅊㅋ 노출 여부" />
      <c.Wrap>
        <c.Button onClick={() => handleVisible(true)} $active={isVisible}>
          {"허용함"}
        </c.Button>
        <c.Button onClick={() => handleVisible(false)} $active={!isVisible}>
          {"허용하지 않음"}
        </c.Button>
      </c.Wrap>
    </c.Container>
  );
};

export default CelebrationInfoSection;
