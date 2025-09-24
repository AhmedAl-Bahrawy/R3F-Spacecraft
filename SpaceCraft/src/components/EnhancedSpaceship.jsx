// src/components/EnhancedSpaceship.jsx
import React, { forwardRef, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const EnhancedSpaceship = forwardRef((props, ref) => {
  const { isPathMode = false, ...otherProps } = props;
  const thrusterRef1 = useRef();
  const thrusterRef2 = useRef();
  const lightRef = useRef();

  // Load the spaceship model (keeping the original path)
  const { nodes, materials } = useGLTF("/Models/Spaceship.glb");

  useFrame((state, delta) => {
    if (ref?.current) {
      // Only rotate when not in path mode
      if (!isPathMode) {
        ref.current.rotation.y += 0.2 * delta;
      }

      // Animate thruster effects
      if (thrusterRef1.current) {
        thrusterRef1.current.material.opacity =
          0.7 + Math.sin(state.clock.elapsedTime * 15) * 0.3;
      }
      if (thrusterRef2.current) {
        thrusterRef2.current.material.opacity =
          0.7 + Math.sin(state.clock.elapsedTime * 12) * 0.3;
      }

      // Animate navigation light
      if (lightRef.current) {
        lightRef.current.intensity =
          0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
      }
    }
  });

  return (
    <group {...otherProps} dispose={null} ref={ref}>
      {/* Original spaceship model */}
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          geometry={nodes.Spaceship_1.geometry}
          material={materials.White}
        />
        <mesh
          geometry={nodes.Spaceship_2.geometry}
          material={materials.Black}
        />
      </group>

      {/* Thruster effects */}
      <mesh position={[0, 0, -12]} ref={thrusterRef1}>
        <coneGeometry args={[1.5, 6, 8]} />
        <meshBasicMaterial color="#00aaff" transparent opacity={0.7} />
      </mesh>

      <mesh position={[0, 0, -15]} ref={thrusterRef2}>
        <coneGeometry args={[2, 8, 8]} />
        <meshBasicMaterial color="#0066cc" transparent opacity={0.4} />
      </mesh>

      {/* Navigation light */}
      <pointLight
        ref={lightRef}
        position={[0, 2, 5]}
        color="#ffffff"
        intensity={0.5}
        distance={20}
      />

      {/* Light indicator mesh */}
      <mesh position={[0, 2, 5]}>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
      </mesh>
    </group>
  );
});

export default EnhancedSpaceship;

// Preload the model
useGLTF.preload("/Models/Spaceship.glb");
