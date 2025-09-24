// src/components/ScrollPathController.jsx
import React, { useRef, useEffect, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ScrollPathController({
  targetRef,
  cameraRef,
  isActive = false,
  onProgressChange,
}) {
  const scrollProgress = useRef(0);
  const smoothProgress = useRef(0);
  const pathCurve = useRef(null);

  // Reusable temporaries for frame loop
  const tmpVec3 = useRef(new THREE.Vector3());
  const tmpVec3b = useRef(new THREE.Vector3());
  const tmpMat4 = useRef(new THREE.Matrix4());
  const desiredCamQuat = useRef(new THREE.Quaternion());
  const desiredShipQuat = useRef(new THREE.Quaternion());

  // Create a curved path through space
  useEffect(() => {
    const curve = new THREE.CatmullRomCurve3(
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
      0.5 // Increased tension for a smoother curve
    );

    pathCurve.current = curve;
  }, []);

  // Handle scroll events
  const handleScroll = useCallback(
    (event) => {
      if (!isActive) return;
      event.preventDefault();

      const scrollSensitivity = 0.0008;
      const delta = event.deltaY * scrollSensitivity;
      scrollProgress.current = Math.max(
        0,
        Math.min(1, scrollProgress.current + delta)
      );

      onProgressChange?.(scrollProgress.current);
    },
    [isActive, onProgressChange]
  );

  // Handle keyboard events
  const handleKeyDown = useCallback(
    (event) => {
      if (!isActive) return;

      const delta = 0.02;
      switch (event.key) {
        case "ArrowUp":
        case "w":
        case "W":
          event.preventDefault();
          scrollProgress.current = Math.max(0, scrollProgress.current - delta);
          break;
        case "ArrowDown":
        case "s":
        case "S":
          event.preventDefault();
          scrollProgress.current = Math.min(1, scrollProgress.current + delta);
          break;
      }
      onProgressChange?.(scrollProgress.current);
    },
    [isActive, onProgressChange]
  );

  // Setup event listeners
  useEffect(() => {
    if (!isActive) return;

    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive, handleScroll, handleKeyDown]);

  useFrame((state, delta) => {
    if (!isActive || !pathCurve.current) return;

    const lerpFactor = 1 - Math.exp(-4 * delta);
    smoothProgress.current = THREE.MathUtils.lerp(
      smoothProgress.current,
      scrollProgress.current,
      lerpFactor
    );
    const progress = smoothProgress.current;

    const position = pathCurve.current.getPoint(progress);
    const tangent = pathCurve.current.getTangent(progress).normalize();

    // --- Ship Update ---
    const ship = targetRef.current;
    if (ship) {
      ship.position.lerp(position, lerpFactor);

      // Rotate ship to face the tangent
      const shipLookAt = tmpVec3.current.copy(position).add(tangent);
      ship.lookAt(shipLookAt);
    }

    // --- Camera Update ---
    const cam = cameraRef.current;
    if (cam && ship) {
      const cameraOffset = tmpVec3.current
        .set(0, 5, -15) // 15 units behind, 5 units above
        .applyQuaternion(ship.quaternion);
      const desiredCamPos = tmpVec3b.current
        .copy(ship.position)
        .add(cameraOffset);

      cam.position.lerp(desiredCamPos, lerpFactor);
      cam.lookAt(ship.position);
    }
  });

  return null;
}