import { useParams } from "react-router";
import { useEffect, useState } from "react";
import * as b from "./Banner.styeld";
import TestImg from "/img/img_main_banner.png";
import { IoMdSettings } from "react-icons/io";
import { fetchEventInfo } from "@/apis/event";

interface EventInfo {
  title: string;
  date: string;
  bannerUrl: string;
  bannerThumbnailUrl: string;
  userId: string;
  createTime: string;
  nickname: string;
}

const Banner = () => {
  const { eventId, pageUri } = useParams<{
    pageUri: string;
    eventId: string;
  }>();
  const [values, setValues] = useState<EventInfo | null>(null);

  useEffect(() => {
    const fetchInfo = async () => {
      if (typeof eventId === "string") {
        try {
          const eventInfo = await fetchEventInfo(eventId);
          console.log("이벤트get요청", eventInfo);
          setValues(eventInfo);
        } catch (err) {
          console.error(err);
        }
      } else {
        console.error("eventId 이상");
      }
    };
    fetchInfo();
  }, [eventId]);

  if (!values) {
    return <p>Loading...</p>;
  }

  const bannerImg = values.bannerThumbnailUrl
    ? values.bannerThumbnailUrl
    : TestImg;

  const calculateDay = (eventDate: string, creationTime: string) => {
    const eventDateObj = new Date(eventDate);
    const creationDateObj = new Date(creationTime.split("T")[0]);
    const diff = eventDateObj.getTime() - creationDateObj.getTime();

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const dDay = calculateDay(values.date, values.createTime);

  return (
    <>
      <b.Wrap>
        <b.Banner src={bannerImg} />
        <b.Title>
          {values.title}
          {/* <IoMdSettings onClick={() => navigate("/celebrate")} /> */}
        </b.Title>
        <b.Dday>{`D-${dDay}`}</b.Dday>
        <b.EventDay>{values.date}</b.EventDay>
        <b.Name>생성자 : {values.nickname}</b.Name>
      </b.Wrap>
    </>
  );
};

export default Banner;
