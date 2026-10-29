/**
 * Pure calculation logic for orbital mechanics, navigation transitions,
 * and portfolio utilities. Decoupled for deterministic unit testing.
 */

export interface OrbitCoordinate {
  x: number;
  y: number;
  z: number;
}

/**
 * Calculates a 3D coordinate on an elliptical tilted orbit.
 * @param radiusX Semi-major / semi-minor axis X
 * @param radiusZ Semi-major / semi-minor axis Z
 * @param tiltAngle Plane tilt in radians
 * @param currentAngle Angle in radians around orbit
 */
export function calculateOrbitPosition(
  radiusX: number,
  radiusZ: number,
  tiltAngle: number,
  currentAngle: number
): OrbitCoordinate {
  const baseX = Math.cos(currentAngle) * radiusX;
  const baseZ = Math.sin(currentAngle) * radiusZ;

  // Apply tilt rotation around X-axis
  const rawY = -Math.sin(tiltAngle) * baseZ;
  const rawZ = Math.cos(tiltAngle) * baseZ;

  const roundZero = (v: number) => {
    const rounded = Number(v.toFixed(4));
    return Object.is(rounded, -0) ? 0 : rounded;
  };

  return {
    x: roundZero(baseX),
    y: roundZero(rawY),
    z: roundZero(rawZ),
  };
}

/**
 * Returns the next planet ID with wrapping.
 */
export function getNextPlanetId(currentId: string, planetIds: string[]): string {
  if (planetIds.length === 0) return currentId;
  const currentIndex = planetIds.indexOf(currentId);
  if (currentIndex === -1) return planetIds[0];
  const nextIndex = (currentIndex + 1) % planetIds.length;
  return planetIds[nextIndex];
}

/**
 * Returns the previous planet ID with wrapping.
 */
export function getPrevPlanetId(currentId: string, planetIds: string[]): string {
  if (planetIds.length === 0) return currentId;
  const currentIndex = planetIds.indexOf(currentId);
  if (currentIndex === -1) return planetIds[planetIds.length - 1];
  const prevIndex = (currentIndex - 1 + planetIds.length) % planetIds.length;
  return planetIds[prevIndex];
}

/**
 * Calculates depth opacity and scale based on Z distance from camera.
 * Front planets are crisp and full opacity; back planets dim and scale slightly.
 */
export function calculateDepthOfField(
  zPos: number,
  minZ = -15,
  maxZ = 15
): { opacity: number; scaleFactor: number } {
  // Normalize zPos: -15 is farthest back, +15 is closest to camera
  const clampedZ = Math.max(minZ, Math.min(maxZ, zPos));
  const normalized = (clampedZ - minZ) / (maxZ - minZ); // 0 (far) to 1 (near)

  const opacity = 0.55 + normalized * 0.45; // 0.55 to 1.0
  const scaleFactor = 0.85 + normalized * 0.3; // 0.85 to 1.15

  return {
    opacity: Number(opacity.toFixed(3)),
    scaleFactor: Number(scaleFactor.toFixed(3)),
  };
}

/**
 * Determines camera target for each scene view mode.
 */
export function getCameraPreset(mode: "hero" | "solar" | "planet", planetPos?: OrbitCoordinate): {
  cameraPos: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
} {
  switch (mode) {
    case "hero":
      return {
        // Camera slightly angled to frame Syed on the right with space on the left for hero text
        cameraPos: [-1.2, 0.4, 5.2],
        lookAt: [0.6, 0.1, 0],
        fov: 46,
      };
    case "solar":
      return {
        // High dolly perspective looking down slightly over the full 6-planet solar system
        cameraPos: [0, 11.5, 20],
        lookAt: [0, 0, 0],
        fov: 52,
      };
    case "planet":
      if (planetPos) {
        // Frame selected planet closely with offset to allow glassmorphism side panel
        return {
          cameraPos: [planetPos.x - 1.8, planetPos.y + 0.9, planetPos.z + 4.2],
          lookAt: [planetPos.x, planetPos.y, planetPos.z],
          fov: 44,
        };
      }
      return {
        cameraPos: [0, 8, 16],
        lookAt: [0, 0, 0],
        fov: 48,
      };
  }
}
