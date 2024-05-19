import * as b from "./Banner.styled";
import Default from "/img/img_default_banner.png";
import { calculateDay } from "@/utils/calculation";

interface BannerInfo {
  bannerThumbnailUrl: string;
  title: string;
  date: string;
  createTime: string;
  nickname: string;
  type: string;
}

const Banner = (props: BannerInfo) => {
  const { bannerThumbnailUrl, title, date, createTime, nickname, type } = props;

  const bannerImg = bannerThumbnailUrl ? bannerThumbnailUrl : Default;

  const dDay = calculateDay(date);

  const setImage = (type: string) => {
    switch (type) {
      case "BIRTHDAY":
        return {
          src: "/icon/icon_birthday.png",
        };
      case "MARRIAGE":
        return {
          src: "/icon/icon_wedding.png",
        };
      case "ETC":
        return {
          src: "/icon/icon_etc.png",
        };
      case "PROMOTION":
        return {
          src: "/icon/icon_promotion.png",
        };
      case "TEACHERS_DAY":
        return {
          src: "/icon/icon_teachers.png",
        };
      case "SCHOOL_EVENT":
        return {
          src: "/icon/icon_school.png",
        };
    }
  };

  const icon = setImage(type);

  return (
    <>
      <b.Wrap>
        <b.Banner src={bannerImg} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            position: "absolute",
            width: "100%",
            marginTop: "5px",
          }}
        >
          <b.Title>{title}</b.Title>
          <b.Dday>
            {" "}
            <b.Icon>
              <img src={icon?.src} />
            </b.Icon>{" "}
            {`D${dDay}`}
          </b.Dday>
        </div>
        <b.EventDay>{date}</b.EventDay>

        <b.Name>생성자 : {nickname}</b.Name>
      </b.Wrap>
    </>
  );
};

export default Banner;
