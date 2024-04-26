import Input from "@common/input";
import Label from "@common/label";
import Calendar from "@components/calendar";
import { RollingInfoSectionType } from "@/types/rollingType";
import * as c from "@components/celebration/CelebrationInfoSection.styled";

const CelebrationInfoSection = (props: RollingInfoSectionType) => {
  const { 
    handleTitle,
    title,
    isVisible,
    handleVisible,
    handleDateChange,
   } = props;

  const toggleButton = () => {
    handleVisible(!isVisible)
  }

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
        <Label htmlFor="date" children="ㅊㅋ 날짜" />
        <Calendar onDateChange={handleDateChange} />
      <c.Wrap>
        <c.P>선택한 날짜부터 롤링페이퍼가 공개됩니다.</c.P>
      </c.Wrap>
      <Label htmlFor="visible" children="ㅊㅋ 노출 여부" />
      <c.Wrap>
        {/* 버튼 클릭 시 ui 변경 안됨 */}
        <c.Button onClick={toggleButton} $active={isVisible}>
          {"허용함"}
        </c.Button>
        <c.Button onClick={toggleButton} $active={!isVisible}>
          {"허용하지 않음"}
        </c.Button>
      </c.Wrap>
    </c.Container>
  );
};

export default CelebrationInfoSection;
