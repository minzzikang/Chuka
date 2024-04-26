import { MdCake, MdFavorite } from "react-icons/md";
import { RiGraduationCapFill, RiMedal2Fill } from "react-icons/ri";
import { PiFlowerLotusThin, PiDotsThreeOutlineFill } from "react-icons/pi";

import Label from "@common/label";
import { RollingTypeSectionType } from "@/types/rollingType";
import * as t from "@components/celebration/TypeSection.styled";

const typeMap: {[key: string]: string} = {
  생일: "birthday",
  "입학/졸업": "school_event",
  승진: "promotion",
  스승의날: "teachers_day",
  결혼: "marriage",
  기타: "etc",
};

const TypeSection = (props: RollingTypeSectionType) => {
  const { type, handleType } = props;
  const typeList: string[] = [
    "생일",
    "입학/졸업",
    "승진",
    "스승의날",
    "결혼",
    "기타",
  ];

  const onClickType = (type: string) => {
    const englishType = typeMap[type];
    handleType(englishType);
  };

  return (
    <>
      <t.Container>
        <Label htmlFor="type" children="ㅊㅋ 종류" />
        <t.Wrap>
          {typeList.map((item) => (
            <t.Button
              key={item}
              onClick={() => onClickType(item)}
              $active={type === typeMap[item]}
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
              <span>{item}</span>
            </t.Button>
          ))}
        </t.Wrap>
      </t.Container>
    </>
  );
};

export default TypeSection;
