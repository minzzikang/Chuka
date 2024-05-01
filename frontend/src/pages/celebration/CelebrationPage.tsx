import Navbar from "@common/navbar";
import Header from "@common/header";
import Celebration from "@components/celebration";

const CelebrationPage = () => {

  return (
    <>
      <Header children="축하 등록하기" />
      <Celebration />
      <Navbar current="celebration" />
    </>
  );
};

export default CelebrationPage;
