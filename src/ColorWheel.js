import React, { useState, useEffect } from "react";
import { Stage, Layer, Arc } from "react-konva";
import chroma from "chroma-js";

const ColorWheel = ({ size = 300, segments = 12, scheme = "full",  harmonyType = "Complementary",
    onColorsChange }) => {
  const [selectedIndex, setSelectedIndex] = useState(null); // 選択中のセグメント

  const radius = size / 2;
  const segmentAngle = 360 / segments;

 // 色スキームを生成
 const generateColors = () => {
    let scale;
    if (scheme === "warm") {
      scale = chroma.scale(["red", "yellow", "orange"]);
    } else if (scheme === "cool") {
      scale = chroma.scale(["blue", "cyan", "purple"]);
    } else {
      scale = chroma.scale(["red", "yellow", "green", "cyan", "blue", "magenta", "red"]);
    }
    return scale.colors(segments);
  };

  const [colors, setColors] = useState(generateColors());
  useEffect(() => {
    setColors(generateColors());
  },[scheme]);

  // カラーハーモニーを計算する関数
  const getHarmonyIndices = (baseIndex) => {
    switch (harmonyType) {
      case "Complementary":
        return [baseIndex, (baseIndex + segments / 2) % segments];
      case "Triad":
        return [
          baseIndex,
          (baseIndex + segments / 3) % segments,
          (baseIndex + (2 * segments) / 3) % segments,
        ];
      case "Analogous":
        return [
          baseIndex,
          (baseIndex - 1 + segments) % segments,
          (baseIndex + 1) % segments,
        ];
      default:
        return [baseIndex];
    }
  };

  // セグメントをクリックした際の処理
  const handleClick = (index) => {
    const harmonyIndices = getHarmonyIndices(index);
    setSelectedIndex(index);

    const selectedColors = harmonyIndices.map((i) => colors[i]);
    if (onColorsChange) onColorsChange(selectedColors);
  };

  // カラーホイールを描画
  const renderWheel = () => {
    return colors.map((color, index) => {
      const startAngle = segmentAngle * index;
      const isSelected = selectedIndex !== null && getHarmonyIndices(selectedIndex).includes(index);

      return (
        <Arc
          key={index} 
          x={radius} y={radius} innerRadius={radius / 2} outerRadius={radius}
          fill={color} 
          angle={segmentAngle} 
          rotation={startAngle}
          onClick={() => handleClick(index)} stroke={isSelected ? "black" : null}
        />
      );
    });
  };

  return (
    <div>
      <Stage width={size} height={size}>
        <Layer>{renderWheel()}</Layer>
      </Stage>
    </div>
  );
};

export default ColorWheel;


