import * as b from "./Banner.styled";
import Default from "/img/img_default_banner.png";
import { IoMdSettings } from "react-icons/io";
import { calculateDay } from "@/utils/calculation";

interface BannerInfo {
  bannerThumbnailUrl: string;
  title: string;
  date: string;
  createTime: string;
  nickname: string;
}

const Banner = (props: BannerInfo) => {
  const { bannerThumbnailUrl, title, date, createTime, nickname } = props;

  const bannerImg = bannerThumbnailUrl ? bannerThumbnailUrl : Default;

  const dDay = calculateDay(date);
  return (
    <>
      <b.Wrap>
        <b.Banner src={bannerImg} />
        <div>
        <b.Title>
          {title}
          {/* <IoMdSettings onClick={() => navigate("/celebrate")} /> */}
        </b.Title>
        <b.Dday>{`D-${dDay}`}</b.Dday>
        </div>
        <b.EventDay>{date}</b.EventDay>
        <b.Name>생성자 : {nickname}</b.Name>
      </b.Wrap>
    </>
  );
};

export default Banner;
