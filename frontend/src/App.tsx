import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./styles/GlobalStyles";
import ScrollToTop from "./utils/scrollToTop";
import HomeRouter from "@routers/HomeRouter";
import GlobalFont from "./styles/GlobalFont";



function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <GlobalFont />
      <ScrollToTop />

      <HomeRouter />

    </BrowserRouter>
  );
}

export default App;
