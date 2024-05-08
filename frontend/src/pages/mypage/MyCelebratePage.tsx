import Header from "@common/header";
import Navbar from "@common/navbar";
import EventNull from "@components/mypage/EventNull";
import Event from "@components/mypage/Event";
import { useEffect, useState } from "react";
import { fetchMyEventList } from "@/apis/event";

interface Event {
  eventId: number;
  userId: string;
  nickname: string;
  pageUri: string;
  type: string;
  title: string;
  date: string;
  banner: null | string;
  bannerThumbnail: null | string;
  bannerUrl: null | string;
  bannerThumbnailUrl: null | string;
  theme: string;
  visibility: boolean;
  createTime: string;
}

interface EventListResponse {
  totalCnt: number;
  eventList: Event[];
}

const MyCelebratePage = () => {
  const [values, setValues] = useState<EventListResponse>({
    totalCnt: 0,
    eventList: [],
  });

  const [isUpcoming, setIsUpcoming] = useState()

//   useEffect(() => {
// const fetchData = async () => {
//   try {
//     const myEvents = await fetchMyEventList()
//     setValues(myEvents)
//   } catch (err) {
//     console.error(err)
//   }
// }
//   }, [])


  return (
    <div>
      <Header children="나의 ㅊㅋ" />
      <Event />
      <EventNull />
      <Navbar current="mypage" />
    </div>
  );
};

export default MyCelebratePage;
