import { MdCake, MdFavorite } from "react-icons/md";
import { RiGraduationCapFill, RiMedal2Fill } from "react-icons/ri";
import { PiFlowerLotusThin, PiDotsThreeOutlineFill } from "react-icons/pi";
import Label from "@common/label";
import { RollingTypeSectionType } from "@/types/rollingType";
import * as c from "@components/celebration/Celebration.styled";

const TypeSection = (props: RollingTypeSectionType) => {
  const { type, setType } = props;
  const typeList: string[] = [
    "생일",
    "입학/졸업",
    "승진",
    "스승의날",
    "결혼",
    "기타",
  ];

  const onClickType = (selectType: string) => {
    console.log(selectType);
    setType(selectType);
  };

  return (
    <>
      <c.InputWrap>
        <Label htmlFor="type" children="ㅊㅋ 종류" />
        <c.Wrap>
          {typeList.map((item) => (
            <c.Button
              key={item}
              onClick={() => onClickType(item)}
              $active={type === item}
            >
              {item === "생일" ? (
                <MdCake />
              ) : item === "입학/졸업" ? (
                <RiGraduationCapFill />
              ) : item === "승진" ? (
                <RiMedal2Fill />
              ) : item === "스승의날" ? (
                <PiFlowerLotusThin />
              ) : item === "결혼" ? (
                <MdFavorite />
              ) : (
                <PiDotsThreeOutlineFill />
              )}
              {item}
            </c.Button>
          ))}
        </c.Wrap>
      </c.InputWrap>
    </>
  );
};

export default TypeSection;
