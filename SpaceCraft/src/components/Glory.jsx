// src/components/Glory.jsx
import React, { useMemo } from "react";
import * as THREE from "three";

/**
 * Glory: a soft sprite in the middle or at a point that gives bloom-like glow.
 */
export default function Glory({
  color = "#7cc8ff",
  size = 20,
  position = [0, 0, -20],
  intensity = 1.0,
}) {
  // create simple circular texture
  const texture = useMemo(() => {
    const s = 512;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = s;
    const ctx = canvas.getContext("2d");

    // outer radial gradient
    const grad = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    grad.addColorStop(0, color);
    grad.addColorStop(0.3, color);
    grad.addColorStop(0.6, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, s, s);

    // mild inner white core
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.arc(s / 2, s / 2, s * 0.08, 0, Math.PI * 2);
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
  }, [color]);

  return (
    <sprite position={position} scale={[size, size, 1]}>
      <spriteMaterial
        map={texture}
        blending={THREE.AdditiveBlending}
        transparent
        depthWrite={false}
        opacity={intensity}
      />
    </sprite>
  );
}
