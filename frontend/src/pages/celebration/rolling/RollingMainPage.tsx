import RollingHeader from "@/components/celebration/Rolling/RollingMain/RollingHeader";
import Banner from "@/components/celebration/Rolling/RollingMain/Banner";
import Navbar from "@common/navbar";
import styled from "styled-components";
import { sizes } from "@styles/theme";
import Board from "@/components/celebration/Rolling/RollingMain/Board";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchEventInfo } from "@/apis/event";
import { fetchFundings } from "@/apis/funding";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: ${sizes.minWidth};
  max-width: ${sizes.maxWidth};
  @media only screen and (min-width: 430px) {
    width: 430px;
  }
  @media only screen and (min-width: 600px) {
    width: 375px;
  }
  position: relative;
`;

interface EventInfo {
  userId: string;
  nickname: string;
  eventId: number;
  pageUrl: string;
  type: string;
  theme: string;
  title: string;
  date: string;
  createTime: string;
  bannerUrl: string;
  bannerThumbnailUrl: string;
}

const RollingMainPage = () => {

  const { eventId, pageUri } = useParams<{
    pageUri: string;
    eventId: string;
  }>();

  const [ eventInfoData, setEventInfoData ] = useState<EventInfo>({
    userId: '',
    nickname: '',
    eventId: 0,
    pageUrl:'',
    type:'',
    theme:'',
    title:'',
    date:'',
    createTime: '',
    bannerUrl: '',
    bannerThumbnailUrl: '',
  })
  
  useEffect(() => {
    const fetchEvent = async () => {
      if (typeof eventId === "string") {
        try {
          const eventInfo = await fetchEventInfo(eventId);
          console.log("이벤트get요청!!!!!!!!!!!!!!!!!!!!!!!! : ", eventInfo);
          setEventInfoData(() => (eventInfo));
        } catch (err) {
          console.error(err);
        }
      } else {
        console.error("eventId 이상");
      }
    }
    fetchEvent()

    const fetchFunding = async () => {
      if (typeof eventId == "string") {
        try {
          const fundingInfo = await fetchFundings(eventId)
          console.log('펀딩 목록 조회 후후후후', fundingInfo);
        } catch (err) {
          console.error(err);
          throw err
        }
      } else {
        console.error("eventId 이상");
      }
    }
    fetchFunding()
  }, [eventId])

  // useEffect(() => {
  //   // eventInfo가 변경될 때마다 실행되는 코드
  //   console.log('eventInfo가 변경되었습니다:', eventInfoData);
  // }, [eventInfoData]);

  return (
    <>
      <Container>
        <RollingHeader bannerThumbnailUrl={eventInfoData.bannerThumbnailUrl} title={eventInfoData.title} nickname={eventInfoData.nickname} />
        <Banner bannerThumbnailUrl={eventInfoData.bannerThumbnailUrl} title={eventInfoData.title} date={eventInfoData.date} createTime={eventInfoData.createTime} nickname={eventInfoData.nickname} />
        <Board eventId={eventInfoData.eventId} theme={eventInfoData.theme} />
      </Container>
      <Navbar current="celebration" />
    </>
  );
};

export default RollingMainPage;
