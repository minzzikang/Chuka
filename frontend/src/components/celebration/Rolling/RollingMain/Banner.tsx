import * as b from "./Banner.styled";
import Default from "/img/img_default_banner.png";
import { IoMdSettings } from "react-icons/io";
import { MdCake, MdFavorite } from "react-icons/md";
import { GiPartyHat } from "react-icons/gi";
import { RiGraduationCapFill, RiMedal2Fill } from "react-icons/ri";
import { PiFlowerLotusThin, PiDotsThreeOutlineFill } from "react-icons/pi";
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
        return <MdCake size={24} />;
      case "MARRIAGE":
        return <MdFavorite size={24} />;
      case "ETC":
        return <GiPartyHat size={24} />;
      case "PROMOTION":
        return <RiMedal2Fill size={24} />;
      case "TEACHERS_DAY":
        return <PiFlowerLotusThin size={24} />;
      case "SCHOOL_EVENT":
        return <RiGraduationCapFill size={24} />;
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
          <b.Title>
            {title}
            {/* <IoMdSettings onClick={() => navigate("/celebrate")} /> */}
          </b.Title>
          <b.Dday>
            {" "}
            <b.Icon>{icon}</b.Icon> {`D-${dDay}`}
          </b.Dday>
        </div>
        <b.EventDay>{date}</b.EventDay>

        <b.Name>생성자 : {nickname}</b.Name>
      </b.Wrap>
    </>
  );
};

export default Banner;
