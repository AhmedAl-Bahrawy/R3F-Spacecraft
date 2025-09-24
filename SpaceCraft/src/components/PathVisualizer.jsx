// src/components/PathVisualizer.jsx
import React, { useMemo } from "react";
import * as THREE from "three";

export default function PathVisualizer() {
  // Create the same path as ScrollPathController
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, 0, 8), // Start position
        new THREE.Vector3(15, 5, 0), // Right curve
        new THREE.Vector3(10, -8, -20), // Down and back
        new THREE.Vector3(-12, 2, -35), // Left curve
        new THREE.Vector3(-5, 15, -50), // Up curve
        new THREE.Vector3(20, 8, -70), // Right again
        new THREE.Vector3(0, -10, -90), // Center bottom
        new THREE.Vector3(-25, 0, -110), // Far left
        new THREE.Vector3(0, 20, -130), // High center
        new THREE.Vector3(30, -5, -160), // Final stretch
      ],
      false,
      "catmullrom",
      0.5
    );
  }, []);

  const linePoints = useMemo(() => {
    return curve.getPoints(500); // Increased points for a smoother curve
  }, [curve]);

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.1);
    shape.lineTo(0, 0.1);
    return shape;
  }, []);

  return (
    <group position-y={-2}>
      <mesh>
        <extrudeGeometry
          args={[
            shape,
            {
              steps: linePoints.length,
              bevelEnabled: false,
              extrudePath: curve,
            },
          ]}
        />
        <meshStandardMaterial color={"#00d4ff"} opacity={0.7} transparent />
      </mesh>
    </group>
  );
}