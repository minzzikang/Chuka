import * as e from './EventBanner.styled'

const index = () => {
  const thumbNail = true;

  return (
    <e.Container $thumbNail={thumbNail}>
      <e.Wrap>
        <e.WrapOverlay>
          <e.Img src="/img/img_default_profile.png" />
          <e.DescWrap>
            <e.Title>{"이벤트 제목"}</e.Title>
            <e.Text>
              {"2024-05-07"} ~ {"2024-05-20"}
            </e.Text>
          </e.DescWrap>
        </e.WrapOverlay>
      </e.Wrap>
    </e.Container>
  );
};

export default index;
