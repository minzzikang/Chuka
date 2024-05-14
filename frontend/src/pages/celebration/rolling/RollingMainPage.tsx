import RollingHeader from "@/components/celebration/Rolling/RollingMain/RollingHeader";
import Banner from "@/components/celebration/Rolling/RollingMain/Banner";
import Navbar from "@common/navbar";
import Board from "@/components/celebration/Rolling/RollingMain/Board";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchEventInfo } from "@/apis/event";
import Drawer from "@components/drawer";
import { EventInfo } from "./RollingMainPage.styled";
import * as r from "./RollingMainPage.styled";
import DrawerModal from "@/components/celebration/Rolling/RollingMain/DrawerModal";

const RollingMainPage = () => {
  const { eventId } = useParams<{
    eventId: string;
  }>();
  const prevUrl = window.location.href;
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [eventInfoData, setEventInfoData] = useState<EventInfo>({
    userId: "",
    nickname: "",
    eventId: 0,
    pageUrl: "",
    type: "",
    theme: "",
    title: "",
    date: "",
    createTime: "",
    bannerUrl: "",
    bannerThumbnailUrl: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      if (typeof eventId === "string") {
        try {
          const eventInfo = await fetchEventInfo(eventId);
          setEventInfoData(eventInfo);
        } catch (err) {
          console.error(err);
        }
      } else {
        console.error("eventId 이상");
      }
    };
    fetchEvent();
  }, [eventId]);

  const goFunding = () => {
    sessionStorage.setItem("prevUrl", prevUrl);
    setDrawerOpen(true);
  };

  return (
    <>
      <r.Container>
        <RollingHeader
          bannerThumbnailUrl={eventInfoData.bannerThumbnailUrl}
          title={eventInfoData.title}
          nickname={eventInfoData.nickname}
        />
        <Banner
          bannerThumbnailUrl={eventInfoData.bannerThumbnailUrl}
          title={eventInfoData.title}
          date={eventInfoData.date}
          createTime={eventInfoData.createTime}
          nickname={eventInfoData.nickname}
          type={eventInfoData.type}
        />
        <Board theme={eventInfoData.theme} date={eventInfoData.date} />
        <r.Button onClick={goFunding}>선물펀딩확인하기</r.Button>
        {isDrawerOpen && (
          <Drawer
            isOpen={isDrawerOpen}
            onClose={() => setDrawerOpen(false)}
            name="펀딩 리스트"
          >
            <DrawerModal eventUserId={eventInfoData.userId} />
          </Drawer>
        )}
      </r.Container>
      <Navbar current="celebration" />
    </>
  );
};

export default RollingMainPage;
