import React, { useState } from "react";
import ColorWheel from "./ColorWheel";
import chroma from "chroma-js";

const App = () => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [harmonyType, setHarmonyType] = useState("Complementary");
  const [scheme, setScheme] = useState("full");
  const [similarColors, setSimilarColors] = useState([]);

  const styles = {
    container: {
      display: "inline-block",
    },
    select: {
      appearance: "none",
      borderRadius: "8px",
      padding: "10px 30px 10px 15px",
      margin: "5px",
      fontSize: "16px",
      cursor: "pointer",
    },
  };

// 選択した色に基づくランダムな彩度の類似色を生成
 const generateSimilarColors = (colors) => {
    const similar = colors.map((color) => {
      // 彩度をランダムに設定
      return Array.from({ length: 5 }, () => {
        const randomSaturation = Math.random(); // ランダムな彩度（0.0～1.0）
        return chroma(color).set('hsl.s', randomSaturation).hex();
      });
    });
    setSimilarColors(similar);
  };
  
  // カラーホイールで色が選択された時の処理
  const handleColorChange = (colors) => {
    setSelectedColors(colors);
    generateSimilarColors(colors);
  };


  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Color Palette</h1>

        {/* スキーム切り替え */}
        <div style={styles.container}>
          <select value={scheme} onChange={(e) => setScheme(e.target.value)} style={styles.select}>
            <option value="full">Full</option>
            <option value="warm">Warm</option>
            <option value="cool">Cool</option>
          </select>
      </div>

      {/* ハーモニータイプの選択 */}
      <div style={styles.container}>
          <select value={harmonyType} onChange={(e) => setHarmonyType(e.target.value)} style={styles.select}>
            <option value="Complementary">Complementary</option>
            <option value="Triad">Triad</option>
            <option value="Analogous">Analogous</option>
          </select>
      </div>

      {/* カラーホイール */}
      <div style={{display: "flex", justifyContent: "center"}}>
      <ColorWheel
        size={400}
        segments={12}
        scheme={scheme}
        harmonyType={harmonyType}
        onColorsChange={handleColorChange}
      />
      </div>

      {/* 選択した色と類似色を表示 */}
      <div style={{ marginTop: "20px" }}>
        <h2>Selected Colors and Similar Colors</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          {selectedColors.map((color, index) => (
            <div key={index}>
              <div style={{ backgroundColor: color,width: "100px", height: "100px", borderRadius: "8px", marginBottom: "10px"}}
              ></div>
              {similarColors[index]?.map((similarColor, subIndex) => (
                <div key={subIndex}
                  style={{backgroundColor: similarColor, width: "100px", height: "100px", borderRadius: "8px", margin: "10px 0px"}}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;






