import Navbar from "@common/navbar";
import Header from "@common/header";
import DetailCard from "@/components/celebration/Rolling/RollingDetail";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchRollSheets } from "@/apis/roll";

interface MessageProps {
  nickname: string;
  content: string;
  backgroundImageThumbnailUrl?: string;
  backgroundColor?: string;
  font: string;
  fontColor: string;
  shape: string;
  rollSheetId: string;
}

const RollingDetailPage = () => {
  const { eventId, pageUri } = useParams<{
    pageUri: string;
    eventId: string;
  }>();

  const [values, setValues] = useState<MessageProps[]>([]);

  useEffect(() => {
    const fetchRolls = async () => {
      if (typeof eventId === "string") {
        try {
          const RollList = await fetchRollSheets(eventId);
          console.log("롤리스트", RollList);

          if (RollList.length > 0) {
            setValues(RollList);
          }
          console.log("values", values);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchRolls();
  }, [eventId]);

  useEffect(() => {
    console.log("Updated values:", values);
  }, [values]);

  return (
    <>
      <Header children="작성된 메시지" />
      {values.map((message) => (
        <DetailCard
          key={message.rollSheetId}
          nickname={message.nickname}
          content={message.content}
          bgImage={message.backgroundImageThumbnailUrl}
          bgColor={message.backgroundColor}
          font={message.font}
          fontColor={message.fontColor}
        />
      ))}
      <Navbar current={"celebration"} />
    </>
  );
};

export default RollingDetailPage;
