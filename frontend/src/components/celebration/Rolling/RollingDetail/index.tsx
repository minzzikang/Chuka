import * as m from "./RollingDetail.styled";

interface MessageCardProps {
  nickname: string;
  content: string;
  backgroundImageThumbnailUrl?: string;
  backgroundColor?: string;
  font: string;
  fontColor: string;
}

const index = ({
  nickname,
  content,
  backgroundImageThumbnailUrl,
  backgroundColor,
  font,
  fontColor,
}: MessageCardProps) => {
  return (
    <>
      <m.Container>
        <m.MessageBox
          $backgroundImageThumbnailUrl={backgroundImageThumbnailUrl}
          $backgroundColor={backgroundColor}
          $fontColor={fontColor}
          $font={font}
        >
          {content}
          <m.Nickname>From. {nickname}</m.Nickname>
        </m.MessageBox>
      </m.Container>
    </>
  );
};

export default index;
