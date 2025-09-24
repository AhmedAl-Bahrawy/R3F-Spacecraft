// src/components/EnhancedSpace.jsx
import React, { useRef, useState, useCallback, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Star from "./Star";
import Nebula from "./Nebula";
import Glory from "./Glory";
import EnhancedSpaceship from "./EnhancedSpaceship";
import CameraUpdater from "./CameraUpdater";
import ScrollPathController from "./ScrollPathController";
import PathVisualizer from "./PathVisualizer";
import ProgressIndicator from "./ProgressIndicator";
import IntroText from "./IntroText";

// Camera reference component to get access to camera
function CameraRef({ setCameraRef }) {
  const { camera } = useThree();

  React.useEffect(() => {
    setCameraRef(camera);
  }, [camera, setCameraRef]);

  return null;
}

export default function EnhancedSpace({ initialCamera = [0, 0, 12] }) {
  const shipRef = useRef();
  const cameraRef = useRef();

  // State management
  const [showIntro, setShowIntro] = useState(true);
  const [cameraMode, setCameraMode] = useState("orbit");
  const [pathProgress, setPathProgress] = useState(0);
  
  const [autoTransitionTimer, setAutoTransitionTimer] = useState(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Nebula configurations (keeping original setup)
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

  // Handle intro completion and start auto-transition timer
  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);

    // Start 10-second timer for automatic transition to path mode
    const timer = setTimeout(() => {
      if (!hasScrolled) {
        setCameraMode("path");
      }
    }, 10000);

    setAutoTransitionTimer(timer);
  }, [hasScrolled]);

  // Handle progress change and detect first scroll
  const handleProgressChange = useCallback(
    (progress) => {
      if (!hasScrolled) {
        setHasScrolled(true);
        setCameraMode("path");

        // Clear auto-transition timer since user scrolled
        if (autoTransitionTimer) {
          clearTimeout(autoTransitionTimer);
          setAutoTransitionTimer(null);
        }
      }
      setPathProgress(progress);
    },
    [hasScrolled, autoTransitionTimer]
  );

  // Handle scroll events globally to detect when user starts scrolling
  useEffect(() => {
    const handleGlobalScroll = () => {
      if (!hasScrolled && !showIntro) {
        handleProgressChange(pathProgress);
      }
    };

    window.addEventListener("wheel", handleGlobalScroll);
    return () => {
      window.removeEventListener("wheel", handleGlobalScroll);
      if (autoTransitionTimer) {
        clearTimeout(autoTransitionTimer);
      }
    };
  }, [
    hasScrolled,
    showIntro,
    pathProgress,
    handleProgressChange,
    autoTransitionTimer,
  ]);

  // Handle camera mode change
  const handleCameraModeChange = useCallback(() => {
    if (cameraMode === "orbit") {
      setCameraMode("follow");
    } else if (cameraMode === "follow") {
      setCameraMode("path");
    } else {
      setCameraMode("orbit");
      setPathProgress(0); // Reset path progress when going back to orbit
    }
  }, [cameraMode]);

  

  return (
    <div id="canvas-container">
      <Canvas
        camera={{ position: initialCamera, fov: 60 }}
        gl={{ antialias: true }}
      >
        {/* Get camera reference */}
        <CameraRef
          setCameraRef={(camera) => {
            cameraRef.current = camera;
          }}
        />

        {/* Lighting */}
        <ambientLight intensity={0.12} />
        <directionalLight position={[10, 10, 10]} intensity={0.4} />

        {/* Camera Controls based on mode */}
        {cameraMode === "orbit" && (
          <OrbitControls enablePan={false} maxDistance={50} minDistance={5} />
        )}
        {cameraMode === "follow" && (
          <CameraUpdater targetRef={shipRef} mode="follow" />
        )}
        {cameraMode === "path" && (
          <ScrollPathController
            targetRef={shipRef}
            cameraRef={cameraRef}
            isActive={true}
            onProgressChange={handleProgressChange}
          />
        )}

        {/* Star fields */}
        <Star count={3500} radius={140} depth={100} speed={0.012} />
        <Star count={1200} radius={60} depth={20} speed={-0.02} />

        {/* Nebulae */}
        <Nebula configs={nebulaConfigs} />

        {/* Glory effects */}
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

        {/* Enhanced Spaceship */}
        <EnhancedSpaceship ref={shipRef} isPathMode={cameraMode === "path"} />

        {cameraMode === "path" && <PathVisualizer />}
      </Canvas>

      {/* UI Overlays */}
      <IntroText isVisible={showIntro} onComplete={handleIntroComplete} />

      <ProgressIndicator
        progress={pathProgress}
        isVisible={cameraMode === "path"}
      />

      {/* Status Indicator */}
      {!showIntro && cameraMode === "orbit" && !hasScrolled && (
        <div className="status-indicator">
          <p>🎮 Free Camera Mode</p>
          <p>
            ⏰ Automatic path mode in{" "}
            {Math.ceil((10000 - (Date.now() % 10000)) / 1000)}s
          </p>
          <p>🖱️ Or scroll to start journey immediately</p>
        </div>
      )}

      {/* Control Buttons */}
      <div className="controls-container">
        <button className="control-button" onClick={handleCameraModeChange}>
          {cameraMode === "orbit"
            ? "Follow Ship"
            : cameraMode === "follow"
            ? "Path Mode"
            : "Free Camera"}
        </button>

        
      </div>

      <style jsx>{`
        .controls-container {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 50;
        }

        .control-button {
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          color: white;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .control-button:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-1px);
        }

        .control-button:active {
          transform: translateY(0);
        }

        .status-indicator {
          position: absolute;
          bottom: 120px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 12px;
          padding: 15px 25px;
          text-align: center;
          color: white;
          font-size: 14px;
          z-index: 40;
          animation: pulse 2s ease-in-out infinite alternate;
        }

        .status-indicator p {
          margin: 5px 0;
        }

        @keyframes pulse {
          from {
            opacity: 0.8;
          }
          to {
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .controls-container {
            bottom: 100px;
            flex-direction: column;
            align-items: center;
          }

          .control-button {
            padding: 10px 20px;
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}
