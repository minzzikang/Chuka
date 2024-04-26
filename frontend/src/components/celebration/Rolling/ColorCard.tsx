import styled from "styled-components";
import { colors } from "@/styles/theme";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  padding: 10px;
`;

const Card = styled.div<{ isSelected: boolean; color: string }>`
  width: 60px;
  height: 60px;
  background-color: ${(props) => props.color};
  margin: 5px;
  border-radius: 1em;
  box-shadow: 1px 0.5px 0 0 gray;
  border: ${(props) => props.isSelected ? `2px solid ${colors.mainPink}` : 'none'};
  cursor: pointer;
`;

const ColorCard = () => {
  const [selectedColor, setSelectedColor] = useState<string>("");

  const colorList = [
    colors.skybluePaper,
    colors.purplePaper,
    colors.yellowPaper,
    colors.greenPaper,
    colors.orangePaper,
  ];

  return (
    <Container>
      {colorList.map((color) => (
        <Card
          key={color}
          color={color}
          isSelected={color === selectedColor}
          onClick={() => {
            setSelectedColor(color);
          }}
        />
      ))}
    </Container>
  );
};

export default ColorCard;
