import Navbar from "@common/navbar";
import Header from "@common/header";
import MessageCard from "@/components/celebration/Rolling/RollingDetail/MessageCard";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchRollSheets } from "@/apis/roll";

interface MessageProps {
  nickname: string;
  content: string;
}

const RollingDetailPage = () => {
  const { pageUri } = useParams();
  const navigate = useNavigate();
  const eventId = localStorage.getItem("eventId") as string;

  const [values, setValues] = useState<MessageProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const RollList = await fetchRollSheets(eventId);
        console.log("롤리스트", RollList);
        setValues(RollList);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header children="작성된 메시지" />
      {values.map((message, index) => (
        <MessageCard
          key={index}
          eventId={eventId}
          nickname={message.nickname}
          content={message.content}
        />
      ))}
      <Navbar current={"celebration"} />
    </>
  );
};

export default RollingDetailPage;
