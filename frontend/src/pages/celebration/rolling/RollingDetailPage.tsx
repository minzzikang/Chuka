import Navbar from "@common/navbar";
import Header from "@common/header";
import MessageCard from "@/components/celebration/Rolling/RollingDetail/MessageCard";

const RollingDetailPage = () => {
  return (
    <>
      <Header children="작성된 메시지" />
      <MessageCard />
      <Navbar current={"celebration"} />
    </>
  );
};

export default RollingDetailPage;
