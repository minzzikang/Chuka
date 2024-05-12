import * as m from "./SettingItem.styled";
import { useNavigate } from "react-router-dom";


export type MypageMenuItemType = {
  title: string;
  icon: JSX.Element;
  text?: string;
  url?: string;
  onClick?: () => void;
};

const SettingItem = (props: MypageMenuItemType) => {
  const { title, url, text, onClick, icon } = props;

  const navigate = useNavigate();

  const goPage = () => url && navigate(url);

  return (
    <m.Container onClick={url ? goPage : onClick}>
      <m.Left>
        <m.ImageWrap>{icon}</m.ImageWrap>
        <span>{title}</span>
      </m.Left>
      <m.Right>
        {url ? <img src={"/icon/icon_arrow_right_black.png"} alt="" /> : text}
      </m.Right>
    </m.Container>
  );
};

export default SettingItem;
