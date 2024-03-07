import React, { useState, useRef, useEffect } from "react";
import "../style/Paint.css";
import UtilityBar from "../components/utilitybar/UtilityBar";
const Paint = () => {
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedStrokeWidth, setSelectedStrokeWidth] = useState(1);
  const [selectedStrokeColor, setSelectedStrokeColor] = useState("white");

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    fillCanvas(color); // Fill canvas with selected color
  };

  const handleStrokeWidth = (width) => {
    setSelectedStrokeWidth(width);
  };

  const handleStrokeColor = (color) => {
    setSelectedStrokeColor(color);
  };

  const canvasRef = useRef(null);
  const isPainting = useRef(false);
  const previousPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.addEventListener("mousedown", startPaint);
    canvas.addEventListener("mouseup", endPaint);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("touchstart", startPaint);
    canvas.addEventListener("touchend", endPaint);
    canvas.addEventListener("touchmove", draw);

    return () => {
      canvas.removeEventListener("mousedown", startPaint);
      canvas.removeEventListener("mouseup", endPaint);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("touchstart", startPaint);
      canvas.removeEventListener("touchend", endPaint);
      canvas.removeEventListener("touchmove", draw);
    };
  }, [selectedStrokeWidth, selectedStrokeColor]);

  const startPaint = (event) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    isPainting.current = true;
    const rect = canvas.getBoundingClientRect();
    previousPosition.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const endPaint = () => {
    isPainting.current = false;
  };

  const draw = (event) => {
    if (!isPainting.current) {
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const currentPosition = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    ctx.strokeStyle = selectedStrokeColor;
    ctx.lineWidth = selectedStrokeWidth;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(previousPosition.current.x, previousPosition.current.y);
    ctx.lineTo(currentPosition.x, currentPosition.y);
    ctx.stroke();

    previousPosition.current = currentPosition;
  };

  const fillCanvas = (color) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="paint">
      <div className="paintCanvas">
        <canvas className="canvas" ref={canvasRef}></canvas>
      </div>
      <div className="paintTools">
        <UtilityBar
          onColorSelect={handleColorSelect}
          onStrokeWidthSelect={handleStrokeWidth}
          onStrokeColorSelect={handleStrokeColor}
        />
      </div>
    </div>
  );
};

export default Paint;
