import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { colors, sizes } from "./theme";

export const GlobalStyle = createGlobalStyle`
    ${reset}
    :root {
        font-family: 'Pretendard', 'YeonSung', 'HiMelody', 'Goocneaeum', 'Treegarden', Arial, Helvetica, sans-serif;
        font-size: 16px;
    }
    * {
        padding: 0;
        box-sizing: border-box;
        font-family: 'Pretendard', 'YeonSung', 'HiMelody', 'Goocneaeum', 'Treegarden', Arial, Helvetica, sans-serif;
    }
    html, body {
        margin: 0;
        padding: 0;
        font-weight: 400;
        line-height: 1.1;
        background: linear-gradient(#e2e3ff, #eadeff);
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
            display: none;
            width: 0;
            height: 0;
            background: transparent;
            -webkit-appearance: none;
        }
    }

    #root {
        font-family: 'Pretendard', 'YeonSung', 'HiMelody', 'Goocneaeum', 'Treegarden', Arial, Helvetica, sans-serif;
        width: 100%;
        min-width: ${sizes.minWidth};
        max-width: ${sizes.maxWidth};
        min-height: 100dvh;
        margin: 0 auto;
        @media only screen and (min-width: 430px) {
            width: 430px;
        }
        @media only screen and (min-width: 600px) {
            width: 375px;
        }
    }
    a {
        outline: none;
        color: inherit;
        text-decoration: none;
        cursor: pointer;
    }
    button {
        font-size: 16px;
        font-family: 'Courier New', Courier, monospace;
        border: none;
        cursor: pointer;
        background: none;
        border-radius: 10px;
        &:disabled {
            background-color: #CACFD9;
        }
    }
    label {
        color: ${colors.mainPink};
        font-size: 12px;
        
        &:focus {
            color: ${colors.mainPink};
            outline: none;
        }

    }
    input {
        font-size: 12px;
        outline: none;
        border-radius: 10px;
        border-color: ${colors.inputGray};
        &:focus {
            border-color: ${colors.mainPink};
            outline: none;
        }
        &::placeholder {
            color: ${colors.gray};
            font-weight: 500;
        }
    }

    textarea {
        font-size: 12px;
        outline: none;
        padding-top: 10px;
        border-radius: 10px;
        border-color: ${colors.inputGray};
        &:focus {
            border-color: ${colors.mainPink};
            outline: none;
        }
        &::placeholder {
            color: ${colors.gray};
            font-weight: 500;
        }
    }
`;
