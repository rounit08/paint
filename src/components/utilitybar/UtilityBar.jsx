import React, { useState } from "react";
import "../../style/UtilityBar.css";

const UtilityBar = ({
  onColorSelect,
  onStrokeColorSelect,
  onStrokeWidthSelect,
}) => {
  const [strokeWidth, setStrokeWidth] = useState(1);

  const handleColorSelect = (color) => {
    onColorSelect(color);
  };

  const handleStrokeColor = (color) => {
    onStrokeColorSelect(color);
  };

  const handleStrokeWidthChange = (event) => {
    const width = parseInt(event.target.value);
    setStrokeWidth(width);
    onStrokeWidthSelect(width);
  };

  const handleClearCanvas = () => {
    onColorSelect("white");
  };
  return (
    <div className="utility">
      <div className="colorSection">
        <p>FILL</p>
        <div className="colorSectionColors">
          <input
            className="colorChoice black"
            type="button"
            onClick={() => handleColorSelect("black")}
          />
          <input
            className="colorChoice green"
            type="button"
            onClick={() => handleColorSelect("green")}
          />
          <input
            className="colorChoice white"
            type="button"
            onClick={() => handleColorSelect("white")}
          />
          <input
            className="colorChoice yellow"
            type="button"
            onClick={() => handleColorSelect("yellow")}
          />
          <input
            className="colorChoice pink"
            type="button"
            onClick={() => handleColorSelect("pink")}
          />
          <input
            className="colorChoice blue"
            type="button"
            onClick={() => handleColorSelect("blue")}
          />
        </div>
      </div>
      <div className="strokeWidthSection">
        <p>Stroke </p>
        <div className="strokeProperties">
          <div className="strokeColorSelection">
            <input
              className="strokeColor black"
              type="button"
              onClick={() => handleStrokeColor("black")}
            />
            <input
              className="strokeColor pink"
              type="button"
              onClick={() => handleStrokeColor("pink")}
            />
            <input
              className="strokeColor blue"
              type="button"
              onClick={() => handleStrokeColor("blue")}
            />

            <input
              className="strokeColor white"
              type="button"
              onClick={() => handleStrokeColor("white")}
            />
          </div>
          <input
            type="range"
            name="width"
            min="1"
            max="20"
            value={strokeWidth}
            onChange={handleStrokeWidthChange}
          />
          <span style={{ fontSize: "0.7em" }}>Width: {strokeWidth}</span>
        </div>
      </div>
      <div className="clearSection">
        <button onClick={handleClearCanvas}>Clear</button>
      </div>
    </div>
  );
};

export default UtilityBar;
