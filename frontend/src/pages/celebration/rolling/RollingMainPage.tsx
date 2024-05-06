import RollingHeader from "@/components/celebration/Rolling/RollingMain/RollingHeader";
import Banner from "@/components/celebration/Rolling/RollingMain/Banner";
import Navbar from "@common/navbar";
import styled from "styled-components";
import { sizes } from "@styles/theme";
import Board from "@/components/celebration/Rolling/RollingMain/Board";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchEventInfo } from "@/apis/event";


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 62px);
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
  title: string;
  date: string;
  bannerUrl: string;
  bannerThumbnailUrl: string;
  userId: string;
  createTime: string;
  nickname: string;
}


const RollingMainPage = () => {

  // const [ eventInfo, setEventInfo ] = useState<EventInfo>({


  // })

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


  return (
    <>
      <Container>
        <RollingHeader />
        <Banner />
        <Board />
      </Container>
      <Navbar current="celebration" />
    </>
  );
};

export default RollingMainPage;
