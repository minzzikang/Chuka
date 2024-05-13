import { useState } from "react";
import { colors } from "@/styles/theme";
import * as c from "./ColorCard.styled";

interface ColorProps {
  onColorSelect: (color: string) => void;
}

const ColorCard = (props: ColorProps) => {
  const { onColorSelect } = props;
  const [selectedColor, setSelectedColor] = useState<string>("");

  const colorList = [
    colors.skybluePaper,
    colors.purplePaper,
    colors.yellowPaper,
    colors.greenPaper,
    colors.orangePaper,
  ];

  return (
    <c.Container>
      {colorList.map((color) => (
        <c.Card
          key={color}
          $color={color}
          $isSelected={color === selectedColor}
          onClick={() => {
            setSelectedColor(color);
            onColorSelect(color);
          }}
        />
      ))}
    </c.Container>
  );
};

export default ColorCard;
