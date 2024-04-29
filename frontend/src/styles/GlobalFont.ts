import { createGlobalStyle } from "styled-components";

const GlobalFont = createGlobalStyle`

@font-face {
  font-family: "Pretendard";
  font-weight: 900;
  font-display: swap;
  src:
    local("Pretendard"),
    url("../assets/fonts/Pretendard-Black.woff") format("woff");
}

@font-face {
  font-family: "Pretendard";
  font-weight: 800;
  font-display: swap;
  src:
    local("Pretendard"),
    url("../assets/fonts/Pretendard-ExtraBold.woff") format("woff");
}

@font-face {
  font-family: "Pretendard";
  font-weight: 700;
  font-display: swap;
  src:
    local("Pretendard"),
    url("../assets/fonts/Pretendard-Bold.woff") format("woff");
}

@font-face {
  font-family: "Pretendard";
  font-weight: 600;
  font-display: swap;
  src:
    local("Pretendard"),
    url("../assets/fonts/Pretendard-SemiBold.woff") format("woff");
}

@font-face {
  font-family: "Pretendard";
  font-weight: 500;
  font-display: swap;
  src:
    local("Pretendard"),
    url("../assets/fonts/Pretendard-Medium.woff") format("woff");
}

@font-face {
  font-family: "Pretendard";
  font-weight: 400;
  font-display: swap;
  src:
    local("Pretendard"),
    url("../assets/fonts/Pretendard-Regular.woff") format("woff");
}

@font-face {
  font-family: "Pretendard";
  font-weight: 300;
  font-display: swap;
  src:
    local("Pretendard"),
    url("../assets/fonts/Pretendard-Light.woff") format("woff");
}

@font-face {
  font-family: "Pretendard";
  font-weight: 200;
  font-display: swap;
  src:
    local("Pretendard"),
    url("../assets/fonts/Pretendard-ExtraLight.woff") format("woff");
}

@font-face {
  font-family: "Pretendard";
  font-weight: 100;
  font-display: swap;
  src:
    local("Pretendard"),
    url("../assets/fonts/Pretendard-Thin.woff") format("woff");
}

@font-face {
    font-family: 'Goocneaeum';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_05@1.0/Gootneaeum.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

/* @font-face {
  font-family: "Goocneaeum";
  font-weight: normal;
  font-display: swap;
  src:
    local("Goocneaeum"),
    url("../assets/fonts/Goocneaeum-Regular.woff") format("woff");
} */


/* @font-face {
  font-family: "Treegarden";
  font-weight: normal;
  font-display: swap;
  src:
    local("Treegarden"),
    url("../assets/fonts/Treegarden-Regular.woff") format("woff");
} */



/* @font-face {
  font-family: "YeonSung";
  font-weight: 400;
  font-display: swap;
  src: local("YeonSung"), url("../assets/fonts/YeonSung-Regular.woff") format("woff");
} */

/* @font-face {
  font-family: "HiMelody";
  font-weight: 400;
  font-display: swap;
  src: local("HiMelody"), url("../assets/fonts/HiMelody-Regular.woff") format("woff");
} */

`;

export default GlobalFont;
