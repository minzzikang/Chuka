import Header from "@common/header";
import Navbar from "@common/navbar";
import EventNull from "@components/mypage/EventNull";
import Event from "@components/mypage/Event";

const MyCelebratePage = () => {
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
