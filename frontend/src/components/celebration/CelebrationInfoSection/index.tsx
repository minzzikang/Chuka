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

  const toggleButton = () => {
    handleVisible(!isVisible);
  };

  const themeList: string[] = ["CORK_BOARD", "BLACK_BOARD"];

  const onClickTheme = (theme: string) => {
    handleTheme(theme);
  };

  return (
    <c.Container>
      <c.Wrap>
        <Label htmlFor="title" children="ㅊㅋ 제목" />
        <c.Input
          id="title"
          placeholder="축하하는 날의 이름을 적어주세요."
          value={title}
          onChange={(e) => handleTitle(e.target.value)}
        />
      </c.Wrap>
      <c.Wrap>
        <Label htmlFor="date" children="ㅊㅋ 날짜" />
        <Calendar onDateChange={handleDateChange} />
        <c.P>선택한 날짜부터 롤링페이퍼가 공개됩니다.</c.P>
      </c.Wrap>
      <c.Wrap>
        <Label htmlFor="img" children="대표 이미지 설정" />
        <FileInput onChange={handleFileChange} />
      </c.Wrap>
      <c.Wrap>
        <Label htmlFor="theme" children="롤링 페이퍼 테마 선택" />
        <c.BtnWrap>
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
        </c.BtnWrap>
      </c.Wrap>
      <c.Wrap>
        <Label htmlFor="visible" children="ㅊㅋ 노출 여부" />
        <c.BtnWrap>
          <c.Button onClick={toggleButton} $active={isVisible}>
            {"허용함"}
          </c.Button>
          <c.Button onClick={toggleButton} $active={!isVisible}>
            {"허용하지 않음"}
          </c.Button>
        </c.BtnWrap>
      </c.Wrap>
    </c.Container>
  );
};

export default index;
