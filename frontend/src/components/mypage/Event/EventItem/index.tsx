import * as e from "./EventItem.styled";
import { useNavigate } from "react-router-dom";
import Trash from "/icon/icon_trash.png";
import Badge from "@components/badge";

export type MyEventItemType = {
  title: string;
  imgSrc: string;
  date: string;
  url: string;
  onClick?: () => void;
};

const index = (props: MyEventItemType) => {
  const { title, imgSrc, url, onClick, date } = props;

  const navigate = useNavigate();

  const goPage = () => url && navigate(url);

  return (
    <e.Container imgSrc={imgSrc} onClick={url ? goPage : onClick}>
      <e.InfoWrap>
        <e.Dday>디데이{date}</e.Dday>
        <e.Title>제목{title}</e.Title>
        <e.Date>날짜{date}</e.Date>
      </e.InfoWrap>
      <e.IconWrap>
        <Badge />
        <img src={Trash} alt="delete" onClick={() => {}} />
      </e.IconWrap>
    </e.Container>
  );
};

export default index;
