import Navbar from "@common/navbar";
import Header from "@common/header";
import MessageCard from "@/components/celebration/Rolling/RollingDetail/MessageCard";
import { useNavigate, useParams } from "react-router-dom";

const RollingDetailPage = () => {
  const { pageUri } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <Header children="작성된 메시지" />
      <MessageCard />
      <Navbar current={"celebration"} />
    </>
  );
};

export default RollingDetailPage;
