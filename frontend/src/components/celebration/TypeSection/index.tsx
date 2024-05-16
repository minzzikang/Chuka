import Label from "@common/label";
import { RollingTypeSectionType } from "@/types/rollingType";
import * as t from "@/components/celebration/TypeSection/TypeSection.styled";

const typeMap: { [key: string]: string } = {
  생일: "BIRTHDAY",
  "입학/졸업": "SCHOOL_EVENT",
  승진: "PROMOTION",
  스승의날: "TEACHERS_DAY",
  결혼: "MARRIAGE",
  기타: "ETC",
};

const index = (props: RollingTypeSectionType) => {
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
                <img
                  src={
                    type === typeMap[item]
                      ? "/icon/icon_type_birthday_pink.png"
                      : "/icon/icon_type_birthday_gray.png"
                  }
                />
              ) : item === "입학/졸업" ? (
                <img
                  src={
                    type === typeMap[item]
                      ? "/icon/icon_type_school_pink.png"
                      : "/icon/icon_type_school_gray.png"
                  }
                />
              ) : item === "승진" ? (
                <img
                  src={
                    type === typeMap[item]
                      ? "/icon/icon_type_promotion_pink.png"
                      : "/icon/icon_type_promotion_gray.png"
                  }
                />
              ) : item === "스승의날" ? (
                <img
                  src={
                    type === typeMap[item]
                      ? "/icon/icon_type_teacher_pink.png"
                      : "/icon/icon_type_teacher_gray.png"
                  }
                />
              ) : item === "결혼" ? (
                <img
                  src={
                    type === typeMap[item]
                      ? "/icon/icon_type_marriage_pink.png"
                      : "/icon/icon_type_marriage_gray.png"
                  }
                />
              ) : (
                <img
                  src={
                    type === typeMap[item]
                      ? "/icon/icon_type_etc_pink.png"
                      : "/icon/icon_type_etc_gray.png"
                  }
                />
              )}
              <span>{item}</span>
            </t.Button>
          ))}
        </t.Wrap>
      </t.Container>
    </>
  );
};

export default index;
