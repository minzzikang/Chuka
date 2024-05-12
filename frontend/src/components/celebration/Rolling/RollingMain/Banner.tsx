import { useEffect, useState } from "react";
import * as b from "./Banner.styled";
import TestImg from "/img/img_main_banner.png";
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

  if (!bannerThumbnailUrl) {
    return <p>Loading...</p>;
  }

  const bannerImg = bannerThumbnailUrl ? bannerThumbnailUrl : TestImg;

  const dDay = calculateDay(date, createTime);

  return (
    <>
      <b.Wrap>
        <b.Banner src={bannerImg} />
        <b.Title>
          {title}
          {/* <IoMdSettings onClick={() => navigate("/celebrate")} /> */}
        </b.Title>
        <b.Dday>{`D-${dDay}`}</b.Dday>
        <b.EventDay>{date}</b.EventDay>
        <b.Name>생성자 : {nickname}</b.Name>
      </b.Wrap>
    </>
  );
};

export default Banner;
