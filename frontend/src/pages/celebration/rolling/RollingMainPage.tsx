import RollingHeader from "@/components/celebration/Rolling/RollingMain/RollingHeader";
import Banner from "@/components/celebration/Rolling/RollingMain/Banner";
import Board from "@/components/celebration/Rolling/RollingMain/Board";
import Navbar from "@common/navbar";
import Drawer from "@/common/drawer";
import DrawerModal from "@/components/celebration/Rolling/RollingMain/DrawerModal";
import { shareEventKakao } from "@/services/shareEventKakao";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchEventInfo } from "@/apis/event";
import { EventInfo } from "./RollingMainPage.styled";
import * as r from "./RollingMainPage.styled";

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

  const eventUrl = window.location.href;

  return (
    <>
      <r.Container>
        <RollingHeader />
        <Banner
          bannerThumbnailUrl={eventInfoData.bannerThumbnailUrl}
          title={eventInfoData.title}
          date={eventInfoData.date}
          createTime={eventInfoData.createTime}
          nickname={eventInfoData.nickname}
          type={eventInfoData.type}
        />
        <Board theme={eventInfoData.theme} date={eventInfoData.date} />
        <r.Button onClick={goFunding}>선물펀딩보기</r.Button>
        {isDrawerOpen && (
          <Drawer
            isOpen={isDrawerOpen}
            onClose={() => setDrawerOpen(false)}
            name="펀딩 리스트"
          >
            <DrawerModal eventUserId={eventInfoData.userId} />
          </Drawer>
        )}
        <r.shareButton
          onClick={() =>
            shareEventKakao({
              eventUrl: eventUrl,
              bannerThumbnailUrl: eventInfoData.bannerThumbnailUrl,
              title: eventInfoData.title,
              nickname: eventInfoData.nickname,
            })
          }
        >
          SNS로 공유하기
        </r.shareButton>
      </r.Container>
      <Navbar current="celebration" />
    </>
  );
};

export default RollingMainPage;
