import * as c from "@components/celebration/Celebration.styled";

import FileInput from "@components/fileInput";
import Label from "@common/label";
import Button from "@common/button";
import Calendar from "@components/calendar";
import TypeSection from "./TypeSection";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CorkImg from "/img/img_rolling_theme_cork.jpg";
import BoardImg from "/img/img_rolling_theme_board.jpg";
import CelebrationInfoSection from "./CelebrationInfoSection";

interface CelebrationProps {
  type: string;
  title: string;
  date: string;
  banner: File | null;
  banner_thumbnail: string | null;
  theme: string;
  visibility: boolean;
  create_time: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [regData, setRegData] = useState<CelebrationProps>({
    type: "", // 이벤트 종류
    title: "",
    date: "",
    banner: null, // 대표 이미지
    banner_thumbnail: null,
    theme: "", // 롤링페이퍼 배경
    visibility: true, // 노출 여부
    create_time: "",
  });

  const [isVisible, setIsVisible] = useState(true);

  const themeList: string[] = ["cork_board", "black_board"];

  const [targetTheme, setTargetTheme] = useState("cork_board");

  const handleType = (newType: string) => {
    setRegData((prev) => ({ ...prev, type: newType }));
  };

  const handleTitle = (value: string) => {
    console.log(regData);
    setRegData((prev) => ({ ...prev, title: value }));
  };

  const handleDateChange = (selectedDate: Date) => {
    setRegData((prev) => ({
      ...prev,
      date: selectedDate.toISOString(),
    }));
  };

  const handleFileChange = (
    banner: File | null,
    banner_thumbnail: string | null
  ) => {
    setRegData((prev) => ({ ...prev, banner, banner_thumbnail }));
  };

  const handleVisible = (value: boolean) => {
    setRegData((prev) => ({
      ...prev,
      visibility: value,
    }));
  };

  const onClickTheme = (theme: string) => {
    console.log(theme);
    setTargetTheme(theme);
  };

  const handleSubmit = () => {
    navigate("/celebrate/rolling");
  };

  return (
    <c.Container>
      <TypeSection type={regData.type} handleType={handleType} />
      <CelebrationInfoSection
        isVisible={isVisible}
        title={regData.title}
        handleTitle={handleTitle}
        handleVisible={handleVisible}
      />
      <c.InputWrap>
        <Label htmlFor="date" children="ㅊㅋ 날짜" />
        <Calendar onDateChange={handleDateChange} />
        <c.P>선택한 날짜부터 롤링페이퍼가 공개됩니다.</c.P>
      </c.InputWrap>
      <c.InputWrap>
        <Label htmlFor="img" children="대표 이미지 설정" />
        <FileInput onChange={handleFileChange} />
      </c.InputWrap>
      {regData.banner_thumbnail && (
        <c.ImgPreview src={regData.banner_thumbnail} alt="preview" />
      )}
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
      <Button children="등록하기" onClick={handleSubmit} />
    </c.Container>
  );
};

export default Index;
