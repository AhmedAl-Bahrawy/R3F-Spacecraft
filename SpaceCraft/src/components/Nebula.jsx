// src/components/Nebula.jsx
import React, { useMemo } from "react";
import * as THREE from "three";

/**
 * Nebula planes with procedural radial gradient textures.
 * Each nebula is an additive translucent plane positioned in 3D.
 */
function createNebulaTexture(
  innerColor = "#ff7cc6",
  outerColor = "transparent",
  size = 1024
) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");

  // radial gradient center
  const grad = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  grad.addColorStop(0, innerColor);
  grad.addColorStop(0.4, outerColor);
  grad.addColorStop(1, "transparent");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // add some soft noise (subtle) — by drawing semi-transparent circles
  for (let i = 0; i < 30; i++) {
    const r = Math.random() * size * 0.5;
    ctx.globalAlpha = 0.02 + Math.random() * 0.06;
    ctx.beginPath();
    const x = size / 2 + (Math.random() - 0.5) * size * 0.6;
    const y = size / 2 + (Math.random() - 0.5) * size * 0.6;
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = innerColor;
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function Nebula({ configs = [] }) {
  // prepare textures
  const textures = useMemo(
    () =>
      configs.map((c) =>
        createNebulaTexture(
          c.innerColor || "rgba(255,120,200,0.8)",
          c.outerColor || "transparent",
          c.size || 1024
        )
      ),
    [configs]
  );

  return (
    <group>
      {configs.map((c, i) => (
        <mesh
          key={i}
          position={c.position}
          rotation={c.rotation || [0, 0, 0]}
          scale={c.scale || [c.width || 40, c.height || 40, 1]}
          renderOrder={1} // render after opaque objects
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={textures[i]}
            blending={THREE.AdditiveBlending}
            transparent={true}
            depthWrite={false}
            opacity={c.opacity ?? 0.9}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
