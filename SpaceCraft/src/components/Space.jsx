// src/components/Space.jsx
import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Star from "./Star";
import Nebula from "./Nebula";
import Glory from "./Glory";
import Spaceship from "./Spaceship";
import CameraUpdater from "./CameraUpdater";

/**
 * Space scene that composes Stars, Nebulae and Glory.
 */
export default function Space({ initialCamera = [0, 0, 12] }) {
  //Ship reference for camera follow (optional)
  const shipRef = useRef();

  // Ship reference for camera
  const [cameraMode, setCameraMode] = React.useState("orbit"); // 'orbit' or 'follow'
  // nebula layer configs - tweak positions, colors, scale, rotation
  const nebulaConfigs = [
    {
      position: [-20, 4, -30],
      rotation: [0, Math.PI * 0.1, Math.PI * 0.05],
      scale: [60, 40, 1],
      innerColor: "rgba(160,80,255,0.9)",
      opacity: 0.9,
    },
    {
      position: [18, -6, -40],
      rotation: [0, -Math.PI * 0.12, -Math.PI * 0.03],
      scale: [80, 50, 1],
      innerColor: "rgba(255,100,180,0.75)",
      opacity: 0.75,
    },
    {
      position: [0, 10, -25],
      rotation: [0, 0.2, 0],
      scale: [100, 60, 1],
      innerColor: "rgba(120,220,255,0.55)",
      opacity: 0.55,
    },
  ];

  return (
    <div id="canvas-container">
      <Canvas
        camera={{ position: initialCamera, fov: 60 }}
        gl={{ antialias: true }}
      >
        {/* ambient and faint rim light to gently illuminate everything */}
        <ambientLight intensity={0.12} />
        <directionalLight position={[10, 10, 10]} intensity={0.4} />

        {/* Camera Controls */}
        {cameraMode === "orbit" ? (
          <OrbitControls enablePan={false} maxDistance={50} minDistance={5} />
        ) : (
          <CameraUpdater targetRef={shipRef} mode="follow" />
        )}

        {/* Star layers: front and back for parallax */}
        <Star count={3500} radius={140} depth={100} speed={0.012} />
        <Star count={1200} radius={60} depth={20} speed={-0.02} />

        {/* Nebulae planes */}
        <Nebula configs={nebulaConfigs} />

        {/* Glory at center/back to give milky-way glow */}
        <Glory
          color="#88d6ff"
          size={36}
          position={[0, 0, -28]}
          intensity={0.9}
        />
        <Glory
          color="#ffd2ff"
          size={18}
          position={[8, -2, -20]}
          intensity={0.6}
        />

        <Spaceship ref={shipRef} />
      </Canvas>
      <button
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "10px 20px",
          background: "rgba(255,255,255,0.2)",
          border: "1px solid rgba(255,255,255,0.4)",
          borderRadius: "5px",
          color: "white",
          cursor: "pointer",
        }}
        onClick={() =>
          setCameraMode(cameraMode === "orbit" ? "follow" : "orbit")
        }
      >
        {cameraMode === "orbit" ? "Follow Ship" : "Free Camera"}
      </button>
    </div>
  );
}
