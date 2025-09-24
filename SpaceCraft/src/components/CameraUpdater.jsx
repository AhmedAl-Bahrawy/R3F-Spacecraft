// src/components/CameraUpdater.jsx
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function CameraUpdater({ targetRef, mode = "follow" }) {
  const { camera } = useThree();
  const idealOffset = useMemo(() => new THREE.Vector3(0, 5, -10), []); // Default position behind and above ship
  const idealLookat = useMemo(() => new THREE.Vector3(0, 2, 10), []); // Point to look at ahead of ship
  const currentPosition = useRef(new THREE.Vector3());
  const currentLookat = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    if (!targetRef?.current || mode !== "follow") return;

    const ship = targetRef.current;

    // Calculate ideal camera position in world space
    const offset = idealOffset.clone();
    offset.applyQuaternion(ship.quaternion);
    offset.add(ship.position);

    // Calculate ideal lookat position in world space
    const lookat = idealLookat.clone();
    lookat.applyQuaternion(ship.quaternion);
    lookat.add(ship.position);

    // Smooth camera position
    const t = 1.0 - Math.pow(0.01, delta);
    currentPosition.current.lerp(offset, t);
    currentLookat.current.lerp(lookat, t);

    // Update camera
    camera.position.copy(currentPosition.current);
    camera.lookAt(currentLookat.current);

    // Ensure camera up vector stays aligned with world up
    camera.up.set(0, 1, 0);
  });
  return null;
}
