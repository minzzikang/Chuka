import logo from "/img/img_main_logo.png";
import * as l from "@pages/login/LoginPage.styled";

const LoginPage = () => {
  return (
    <l.Container>
      <img src={logo} alt="logo" />
      <l.Text>특별한 날,</l.Text>
      <l.FlexRow>
        <l.Text>함께</l.Text>
        <l.Highlight>축하</l.Highlight>
        <l.Text>해요</l.Text>
      </l.FlexRow>
    </l.Container>
  );
};

export default LoginPage;
