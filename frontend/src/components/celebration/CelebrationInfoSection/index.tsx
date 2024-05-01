import Label from "@common/label";
import Calendar from "@components/calendar";
import FileInput from "@components/fileInput";
import CorkImg from "/img/img_rolling_theme_cork.jpg";
import BoardImg from "/img/img_rolling_theme_board.jpg";

import { RollingInfoSectionType } from "@/types/rollingType";
import * as c from "@/components/celebration/CelebrationInfoSection/CelebrationInfoSection.styled";

const index = (props: RollingInfoSectionType) => {
  const {
    handleTitle,
    title,
    isVisible,
    handleVisible,
    handleDateChange,
    handleFileChange,
    handleTheme,
    theme,
  } = props;

  const themeList: string[] = ["cork_board", "black_board"];

  const onClickTheme = (theme: string) => {
    handleTheme(theme);
  };

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
      <Label htmlFor="img" children="대표 이미지 설정" />
      <c.Wrap>
        <FileInput onChange={handleFileChange} />
      </c.Wrap>
      <Label htmlFor="theme" children="롤링 페이퍼 테마 선택" />
      <c.Wrap>
        <c.ThemeButton
          onClick={() => onClickTheme(themeList[0])}
          $active={theme === themeList[0]}
        >
          <c.ThemeImg src={CorkImg} />
          {"보드"}
        </c.ThemeButton>
        <c.ThemeButton
          onClick={() => onClickTheme(themeList[1])}
          $active={theme === themeList[1]}
        >
          <c.ThemeImg src={BoardImg} />
          {"칠판"}
        </c.ThemeButton>
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

export default index;
