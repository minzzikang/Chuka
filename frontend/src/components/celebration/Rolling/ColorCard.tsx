import React, { useState } from "react";
import { colors } from "@/styles/theme";
import * as c from "./ColorCard.styled";

interface ColorCardProps {
  onSelectColor: (color: string) => void;
}

const ColorCard: React.FC<ColorCardProps> = ({ onSelectColor }) => {
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
          color={color}
          isSelected={color === selectedColor}
          onClick={() => {
            setSelectedColor(color);
            onSelectColor(color);
          }}
        />
      ))}
    </c.Container>
  );
};

export default ColorCard;
