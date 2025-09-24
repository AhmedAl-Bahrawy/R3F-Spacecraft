// src/components/Star.jsx
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";

export default function Star({ count = 5000, radius = 120, speed = 0.1 }) {
  const ref = useRef();

  // positions: Float32Array of xyz ...
  const positions = useMemo(
    () => random.inSphere(new Float32Array(count * 3), { radius }),
    [count, radius]
  );

  useFrame((_state, delta) => {
    if (ref.current) ref.current.rotation.y += speed * delta;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        size={0.02}
        sizeAttenuation={true}
        vertexColors={false}
        depthWrite={false}
      />
    </Points>
  );
}
