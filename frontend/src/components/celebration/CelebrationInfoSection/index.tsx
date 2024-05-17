import Label from "@common/label";
import Calendar from "@/common/calendar";
import CorkImg from "/img/img_rolling_theme_cork.jpg";
import BoardImg from "/img/img_rolling_theme_board.jpg";
import FileIcon from "/icon/icon_file_upload.png";
import { ChangeEvent, useState, useRef } from "react";

import { RollingInfoSectionType } from "@/types/rollingType";
import * as c from "@/components/celebration/CelebrationInfoSection/CelebrationInfoSection.styled";

const index = (props: RollingInfoSectionType) => {
  const {
    handleTitle,
    title,
    nickname,
    isVisible,
    handleVisible,
    handleDateChange,
    handleFileChange,
    handleTheme,
    handleNickname,
    theme,
  } = props;

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");

  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const fileURL = URL.createObjectURL(file);
      setImagePreviewUrl(fileURL);
      setFileName(file.name);
    } else {
      setImagePreviewUrl(null);
      setFileName("");
    }
    handleFileChange(file);
  };

  const toggleButton = () => {
    handleVisible(!isVisible);
  };

  const themeList: string[] = ["CORK_BOARD", "BLACK_BOARD"];

  const onClickTheme = (theme: string) => {
    handleTheme(theme);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const TriggerFileInput = () => {
    fileInputRef.current?.click();
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
          maxLength={20}
        />
      </c.Wrap>
      <c.Wrap>
        <Label htmlFor="date" children="ㅊㅋ 날짜" />
        <Calendar onDateChange={handleDateChange} />
        <c.P>선택한 날짜부터 롤링페이퍼 메시지가 공개됩니다.</c.P>
      </c.Wrap>
      <c.Wrap>
        <Label htmlFor="nickname" children="ㅊㅋ 만든 사람" />
        <c.Input
          id="nickname"
          placeholder="등록한 사람(본인)의 별명을 적어주세요."
          value={nickname}
          onChange={(e) => handleNickname(e.target.value)}
        />
        <c.P>작성한 이름은 다른 사용자들에게 공개됩니다.</c.P>
      </c.Wrap>
      <c.Wrap>
        <c.FileInputLabel htmlFor="img">대표 이미지 설정</c.FileInputLabel>
        <c.FileInputContainer onClick={TriggerFileInput}>
          <c.HiddenInput
            type="file"
            name="img"
            id="img"
            ref={fileInputRef}
            onChange={handleImgChange}
            accept="image/jpeg, image/png, image/gif"
          />
          {fileName || "축하하는 날을 대표하는 이미지를 등록해주세요."}
          <img src={FileIcon} />
        </c.FileInputContainer>
        {imagePreviewUrl && (
          <c.ImagePreview src={imagePreviewUrl} alt="Preview" />
        )}
      </c.Wrap>
      <c.Wrap>
        <Label htmlFor="theme" children="롤링 페이퍼 테마 선택" />
        <c.BtnWrap>
          <c.ThemeButton
            onClick={() => onClickTheme(themeList[0])}
            $active={theme === themeList[0]}
          >
            <c.ThemeImg src={CorkImg} />
            {"벽돌"}
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
      <div
        style={{
          marginBottom: "10px",
          alignSelf: "flex-start",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Label htmlFor="visible" children="ㅊㅋ 노출 여부" />
        <c.BtnWrap>
          <c.Button onClick={toggleButton} $active={isVisible}>
            {"허용함"}
          </c.Button>
          <c.Button onClick={toggleButton} $active={!isVisible}>
            {"허용하지 않음"}
          </c.Button>
        </c.BtnWrap>
        <c.P>허용 시 추카 메인 화면에 노출됩니다.</c.P>
      </div>
    </c.Container>
  );
};

export default index;
