import * as c from "@components/celebration/Celebration.styled";
import Input from "@common/input";
import FileInput from "@components/fileInput";
import Label from "@common/label";
import Button from "@common/button";
import Calendar from "@components/calendar";
import { MdCake, MdFavorite } from "react-icons/md";
import { RiGraduationCapFill, RiMedal2Fill } from "react-icons/ri";
import { PiFlowerLotusThin, PiDotsThreeOutlineFill } from "react-icons/pi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CorkImg from "/img/img_rolling_theme_cork.jpg";
import BoardImg from "/img/img_rolling_theme_board.jpg";

interface CelebrationValues {
  title: string;
  date: string;
  file: File | null;
  fileURL: string | null;
}

const Index = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<CelebrationValues>({
    title: "",
    date: "",
    file: null,
    fileURL: null,
  });

  const categoryList: string[] = [
    "생일",
    "입학/졸업",
    "승진",
    "스승의날",
    "결혼",
    "기타",
  ];

  const themeList: string[] = ["cork_board", "black_board"];

  const isPublic: string[] = ["public", "private"];

  const [targetCategory, setTargetCategory] = useState("생일");
  const [targetTheme, setTargetTheme] = useState("cork_board");
  const [targetIsPublic, setTargetIsPublic] = useState("public");

  const handleTitle = (value: string) => {
    setValues((prev) => ({ ...prev, title: value }));
  };

  const handleDateChange = (selectedDate: Date) => {
    setValues((prev) => ({
      ...prev,
      date: selectedDate.toISOString(),
    }));
  };

  const handleFileChange = (file: File | null, fileURL: string | null) => {
    setValues((prev) => ({ ...prev, file, fileURL }));
  };

  const onClickCategory = (category: string) => {
    console.log(category);
    setTargetCategory(category);
  };

  const onClickTheme = (theme: string) => {
    console.log(theme);
    setTargetTheme(theme);
  };

  const onClickIsPublic = (isPublic: string) => {
    console.log(isPublic);
    setTargetIsPublic(isPublic);
  };

  const handleSubmit = () => {
    navigate("/celebrate/rolling");
  };


  return (
    <c.Container>
      <c.InputWrap>
        <Label htmlFor="category" children="ㅊㅋ 종류" />
        <c.Wrap>
          <c.Button
            onClick={() => onClickCategory(categoryList[0])}
            $active={targetCategory === categoryList[0]}
          >
            <MdCake />
            {categoryList[0]}
          </c.Button>
          <c.Button
            onClick={() => onClickCategory(categoryList[1])}
            $active={targetCategory === categoryList[1]}
          >
            <RiGraduationCapFill />
            {categoryList[1]}
          </c.Button>
          <c.Button
            onClick={() => onClickCategory(categoryList[2])}
            $active={targetCategory === categoryList[2]}
          >
            <RiMedal2Fill />
            {categoryList[2]}
          </c.Button>
          <c.Button
            onClick={() => onClickCategory(categoryList[3])}
            $active={targetCategory === categoryList[3]}
          >
            <PiFlowerLotusThin />
            {categoryList[3]}
          </c.Button>
          <c.Button
            onClick={() => onClickCategory(categoryList[4])}
            $active={targetCategory === categoryList[4]}
          >
            <MdFavorite />
            {categoryList[4]}
          </c.Button>
          <c.Button
            onClick={() => onClickCategory(categoryList[5])}
            $active={targetCategory === categoryList[5]}
          >
            <PiDotsThreeOutlineFill />
            {categoryList[5]}
          </c.Button>
        </c.Wrap>
      </c.InputWrap>
      <c.InputWrap>
        <Label htmlFor="title" children="ㅊㅋ 제목" />
        <Input
          value={values.title}
          id="title"
          placeholder="축하하는 날의 이름을 적어주세요."
          onInputChange={handleTitle}
        />
      </c.InputWrap>
      <c.InputWrap>
        <Label htmlFor="date" children="ㅊㅋ 날짜" />
        <Calendar onDateChange={handleDateChange} />
        <c.P>선택한 날짜부터 롤링페이퍼가 공개됩니다.</c.P>
      </c.InputWrap>
      <c.InputWrap>
        <Label htmlFor="img" children="대표 이미지 설정" />
        <FileInput onChange={handleFileChange} />
      </c.InputWrap>
      {values.fileURL && <c.ImgPreview src={values.fileURL} alt="preview" />}
      <c.InputWrap>
        <Label htmlFor="theme" children="롤링 페이퍼 테마 선택" />
        <c.ThemeWrap>
          <c.ThemeButton
            onClick={() => onClickTheme(themeList[0])}
            $active={targetTheme === themeList[0]}
          >
            <c.ThemeImg src={CorkImg} />
            {"보드"}
          </c.ThemeButton>
          <c.ThemeButton
            onClick={() => onClickTheme(themeList[1])}
            $active={targetTheme === themeList[1]}
          >
            <c.ThemeImg src={BoardImg} />
            {"칠판"}
          </c.ThemeButton>
        </c.ThemeWrap>
      </c.InputWrap>
      <c.InputWrap>
        <Label htmlFor="secret" children="ㅊㅋ 공개 여부" />
        <c.PublicWrap>
          <c.IsPublicButton
            onClick={() => onClickIsPublic(isPublic[0])}
            $active={targetIsPublic === isPublic[0]}
          >
            {"공개"}
          </c.IsPublicButton>
          <c.IsPublicButton
            onClick={() => onClickIsPublic(isPublic[1])}
            $active={targetIsPublic === isPublic[1]}
          >
            {"비공개"}
          </c.IsPublicButton>
        </c.PublicWrap>
      </c.InputWrap>
      <Button children="등록하기" onClick={handleSubmit} />
    </c.Container>
  );
};

export default Index;
