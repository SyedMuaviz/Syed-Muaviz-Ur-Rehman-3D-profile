"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { PORTFOLIO_CONTENT, PlanetProject } from "@/lib/content";
import {
  createProceduralPlanetTexture,
  createPortalTexture,
  createSyedSilhouetteTexture,
  createPlanetRingTexture,
} from "@/lib/textures";
import { calculateOrbitPosition } from "@/lib/rules";

export interface ProjectedPlanet {
  id: string;
  serial: string;
  name: string;
  colorHex: string;
  x: number;
  y: number;
  visible: boolean;
}

interface CosmicCanvasProps {
  currentScene: "hero" | "solar" | "planet";
  activePlanetId: string | null;
  onSelectPlanet: (planetId: string) => void;
  onHoverPlanet?: (planet: PlanetProject | null, screenPos?: { x: number; y: number }) => void;
  onUpdatePlanetPositions?: (positions: ProjectedPlanet[]) => void;
}

// Pre-allocated math objects to avoid per-frame GC allocations
const _raycaster = new THREE.Raycaster();
const _mouse = new THREE.Vector2();
const _tempVec = new THREE.Vector3();
const _camPosTarget = new THREE.Vector3();
const _camLookTarget = new THREE.Vector3();
const _camLookCurrent = new THREE.Vector3(0.6, 0.1, 0);

export default function CosmicCanvas({
  currentScene,
  activePlanetId,
  onSelectPlanet,
  onHoverPlanet,
  onUpdatePlanetPositions,
}: CosmicCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    currentScene,
    activePlanetId,
    onSelectPlanet,
    onHoverPlanet,
    onUpdatePlanetPositions,
  });

  // Keep stateRef up to date without tearing down canvas
  useEffect(() => {
    stateRef.current = {
      currentScene,
      activePlanetId,
      onSelectPlanet,
      onHoverPlanet,
      onUpdatePlanetPositions,
    };
  }, [currentScene, activePlanetId, onSelectPlanet, onHoverPlanet, onUpdatePlanetPositions]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement("canvas").getContext("webgl2");
        if (!gl) return true;
        const ext = gl.getExtension("WEBGL_debug_renderer_info");
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene & Renderer setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#081013");
    scene.fog = new THREE.FogExp2("#081013", 0.022);

    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 150);
    // Initial camera position for Hero view
    camera.position.set(-1.2, 0.4, 5.2);
    camera.lookAt(0.6, 0.1, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: "high-performance",
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 2. Lighting Rig
    const ambientLight = new THREE.AmbientLight("#223838", 1.2);
    scene.add(ambientLight);

    // Emerald-cool hemisphere light
    const hemiLight = new THREE.HemisphereLight("#284D40", "#0D191D", 1.4);
    scene.add(hemiLight);

    // Warm gold key light
    const keyLight = new THREE.DirectionalLight("#FFE8A3", 2.2);
    keyLight.position.set(6, 12, 10);
    scene.add(keyLight);

    // Subtle neon green rim light on Syed
    const greenRimLight = new THREE.PointLight("#39FF14", 3.5, 9);
    greenRimLight.position.set(0, 1.2, -0.6);
    scene.add(greenRimLight);

    // 3. Faint receding perspective grid floor
    const gridHelper = new THREE.GridHelper(48, 48, "#2A473D", "#0E241E");
    gridHelper.position.y = -1.2;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.28;
    scene.add(gridHelper);

    // 4. Multi-layer star field (3 depth layers with mouse parallax)
    const starGroups: THREE.Points[] = [];
    const starCounts = isSoftwareGl ? [300, 200, 100] : [700, 450, 250];
    const starSpeeds = [0.0003, 0.0006, 0.001];

    starCounts.forEach((count, idx) => {
      const starGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const radius = 25 + Math.random() * 45;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        // Subtly varied star hues (gold #D9B45A, soft cyan, pure white)
        const rand = Math.random();
        if (rand < 0.2) {
          colors[i * 3] = 0.85;
          colors[i * 3 + 1] = 0.71;
          colors[i * 3 + 2] = 0.35; // gold
        } else if (rand < 0.4) {
          colors[i * 3] = 0.45;
          colors[i * 3 + 1] = 0.85;
          colors[i * 3 + 2] = 0.75; // emerald/cyan
        } else {
          colors[i * 3] = 0.95;
          colors[i * 3 + 1] = 0.98;
          colors[i * 3 + 2] = 1.0; // diamond white
        }
      }

      starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      starGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const starMat = new THREE.PointsMaterial({
        size: idx === 0 ? 0.7 : idx === 1 ? 1.0 : 1.3,
        vertexColors: true,
        transparent: true,
        opacity: idx === 0 ? 0.45 : idx === 1 ? 0.7 : 0.9,
      });

      const starMesh = new THREE.Points(starGeo, starMat);
      scene.add(starMesh);
      starGroups.push(starMesh);
    });

    // 5. Central Hero Structure: The Pedestal, Portal Frame, and Syed "Sun"
    const centralGroup = new THREE.Group();
    scene.add(centralGroup);

    // Pedestal base (dark emerald disc)
    const baseGeo = new THREE.CylinderGeometry(1.5, 1.7, 0.22, 48);
    const baseMat = new THREE.MeshStandardMaterial({
      color: "#081E17",
      metalness: 0.85,
      roughness: 0.25,
    });
    const pedestalBase = new THREE.Mesh(baseGeo, baseMat);
    pedestalBase.position.y = -1.1;
    centralGroup.add(pedestalBase);

    // Glowing Holographic Neon Green Pedestal Ring (#39FF14)
    const ringGeo = new THREE.TorusGeometry(1.55, 0.04, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: "#39FF14",
    });
    const pedestalGlowRing = new THREE.Mesh(ringGeo, ringMat);
    pedestalGlowRing.rotation.x = Math.PI / 2;
    pedestalGlowRing.position.y = -0.98;
    centralGroup.add(pedestalGlowRing);

    // Secondary Gold Pedestal Ring (#D9B45A)
    const goldRingGeo = new THREE.TorusGeometry(1.35, 0.02, 16, 64);
    const goldRingMat = new THREE.MeshBasicMaterial({
      color: "#D9B45A",
      transparent: true,
      opacity: 0.8,
    });
    const pedestalGoldRing = new THREE.Mesh(goldRingGeo, goldRingMat);
    pedestalGoldRing.rotation.x = Math.PI / 2;
    pedestalGoldRing.position.y = -0.97;
    centralGroup.add(pedestalGoldRing);

    // Tall Arched Portal Frame Backdrop with green and gold trims
    const portalTexture = createPortalTexture();
    const portalGeo = new THREE.PlaneGeometry(2.5, 4.4);
    const portalMat = new THREE.MeshBasicMaterial({
      map: portalTexture,
      transparent: true,
      opacity: 0.88,
      side: THREE.DoubleSide,
    });
    const portalMesh = new THREE.Mesh(portalGeo, portalMat);
    portalMesh.position.set(0, 1.1, -0.4);
    centralGroup.add(portalMesh);

    // Arched Outer Glow Frame (Curve)
    const archCurvePoints: THREE.Vector3[] = [];
    const archRadius = 1.25;
    for (let i = 0; i <= 32; i++) {
      const angle = (i / 32) * Math.PI;
      archCurvePoints.push(
        new THREE.Vector3(
          Math.cos(angle) * archRadius,
          2.05 + Math.sin(angle) * archRadius,
          -0.38
        )
      );
    }
    const archGeo = new THREE.BufferGeometry().setFromPoints(archCurvePoints);
    const archMat = new THREE.LineBasicMaterial({
      color: "#39FF14",
      transparent: true,
      opacity: 0.75,
      linewidth: 2,
    });
    const archLine = new THREE.Line(archGeo, archMat);
    centralGroup.add(archLine);

    // Thin Gold Orbital Accents around Portal
    const goldOrbitArc1 = new THREE.EllipseCurve(0, 0.8, 1.8, 0.8, 0, Math.PI * 2, false, 0.35);
    const arcPoints1 = goldOrbitArc1.getPoints(50);
    const arcGeo1 = new THREE.BufferGeometry().setFromPoints(
      arcPoints1.map((p) => new THREE.Vector3(p.x, p.y, -0.1))
    );
    const goldOrbitLine1 = new THREE.Line(
      arcGeo1,
      new THREE.LineBasicMaterial({ color: "#D9B45A", transparent: true, opacity: 0.55 })
    );
    centralGroup.add(goldOrbitLine1);

    // Syed's Cutout Silhouette Plane
    const syedTexture = createSyedSilhouetteTexture();
    const syedGeo = new THREE.PlaneGeometry(1.85, 3.4);
    const syedMat = new THREE.MeshBasicMaterial({
      map: syedTexture,
      transparent: true,
      alphaTest: 0.05,
      side: THREE.FrontSide,
    });
    const syedMesh = new THREE.Mesh(syedGeo, syedMat);
    syedMesh.position.set(0, 0.72, 0.05);
    centralGroup.add(syedMesh);

    // Floating Dust / Energy Particles around Syed
    const dustCount = 80;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 2.8;
      dustPositions[i * 3 + 1] = -0.8 + Math.random() * 3.2;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.08,
      color: "#39FF14",
      transparent: true,
      opacity: 0.6,
    });
    const dustMesh = new THREE.Points(dustGeo, dustMat);
    centralGroup.add(dustMesh);

    // 6. Six Orbiting Planets & Elliptical Orbit Lines
    const planetMeshes: {
      id: string;
      project: PlanetProject;
      group: THREE.Group;
      sphere: THREE.Mesh;
      glowSprite: THREE.Sprite;
      orbitLine: THREE.Line;
      currentAngle: number;
    }[] = [];

    // Faint gold/emerald orbit paths
    PORTFOLIO_CONTENT.planets.forEach((p, idx) => {
      const orbitPoints: THREE.Vector3[] = [];
      const segments = 120;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const coord = calculateOrbitPosition(p.orbitRadiusX, p.orbitRadiusZ, p.tiltAngle, theta);
        orbitPoints.push(new THREE.Vector3(coord.x, coord.y, coord.z));
      }
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
      const orbitMat = new THREE.LineBasicMaterial({
        color: idx % 2 === 0 ? "#D9B45A" : "#326B54",
        transparent: true,
        opacity: 0.35,
      });
      const orbitLine = new THREE.Line(orbitGeo, orbitMat);
      scene.add(orbitLine);

      // Planet Group
      const pGroup = new THREE.Group();
      scene.add(pGroup);

      // Procedural Texture for Planet
      const texture = createProceduralPlanetTexture(p.id);
      const sphereGeo = new THREE.SphereGeometry(p.size, 32, 32);
      const sphereMat = new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0.35,
        roughness: 0.45,
        emissive: new THREE.Color(p.colorHex),
        emissiveIntensity: 0.22,
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.userData = { planetId: p.id, project: p };
      pGroup.add(sphere);

      // Planet 02 Bright Gold Ring
      if (p.hasRing) {
        const ringTexture = createPlanetRingTexture();
        const planetRingGeo = new THREE.RingGeometry(p.size * 1.35, p.size * 2.1, 48);
        const planetRingMat = new THREE.MeshBasicMaterial({
          map: ringTexture,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.88,
        });
        const planetRing = new THREE.Mesh(planetRingGeo, planetRingMat);
        planetRing.rotation.x = Math.PI / 2.3;
        pGroup.add(planetRing);
      }

      // Soft Atmosphere Glow Sprite
      const spriteCanvas = document.createElement("canvas");
      spriteCanvas.width = 128;
      spriteCanvas.height = 128;
      const sCtx = spriteCanvas.getContext("2d")!;
      const sGrad = sCtx.createRadialGradient(64, 64, 20, 64, 64, 64);
      sGrad.addColorStop(0, p.glowHex);
      sGrad.addColorStop(0.5, p.glowHex + "66");
      sGrad.addColorStop(1, "rgba(0,0,0,0)");
      sCtx.fillStyle = sGrad;
      sCtx.fillRect(0, 0, 128, 128);
      const spriteTex = new THREE.CanvasTexture(spriteCanvas);
      const spriteMat = new THREE.SpriteMaterial({
        map: spriteTex,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
      });
      const glowSprite = new THREE.Sprite(spriteMat);
      glowSprite.scale.set(p.size * 3.4, p.size * 3.4, 1);
      pGroup.add(glowSprite);

      // Initial angle staggered around orbit
      const initialAngle = (idx / PORTFOLIO_CONTENT.planets.length) * Math.PI * 2;
      planetMeshes.push({
        id: p.id,
        project: p,
        group: pGroup,
        sphere,
        glowSprite,
        orbitLine,
        currentAngle: initialAngle,
      });
    });

    // 7. Raycasting & Interaction handling
    let hoveredPlanetId: string | null = null;
    let mouseX = 0;
    let mouseY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      _mouse.set(x, y);

      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

      _raycaster.setFromCamera(_mouse, camera);
      const intersects = _raycaster.intersectObjects(
        planetMeshes.map((pm) => pm.sphere)
      );

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const pId = hit.userData.planetId as string;
        if (hoveredPlanetId !== pId) {
          hoveredPlanetId = pId;
          const found = PORTFOLIO_CONTENT.planets.find((item) => item.id === pId) || null;
          stateRef.current.onHoverPlanet?.(found, { x: e.clientX, y: e.clientY });
        }
      } else {
        if (hoveredPlanetId !== null) {
          hoveredPlanetId = null;
          stateRef.current.onHoverPlanet?.(null);
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      _mouse.set(x, y);

      _raycaster.setFromCamera(_mouse, camera);
      const intersects = _raycaster.intersectObjects(
        planetMeshes.map((pm) => pm.sphere)
      );

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const pId = hit.userData.planetId as string;
        stateRef.current.onSelectPlanet(pId);
      }
    };

    window.addEventListener("pointermove", onPointerMove);
    container.addEventListener("click", onClick);

    // 8. Resize Handler
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // 9. Main Animation & Camera Tween Loop
    let animId = 0;
    let clock = new THREE.Clock();

    const renderTick = () => {
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsedTime = clock.getElapsedTime();

      // Subtle mouse parallax on star layers and Syed portal
      starGroups.forEach((sg, idx) => {
        sg.rotation.y = elapsedTime * starSpeeds[idx] + mouseX * 0.04 * (idx + 1);
        sg.rotation.x = mouseY * 0.02 * (idx + 1);
      });

      // Subtle pulse on pedestal glow ring
      pedestalGlowRing.scale.setScalar(1 + Math.sin(elapsedTime * 2) * 0.015);
      portalMesh.position.x = mouseX * 0.08;
      syedMesh.position.x = mouseX * 0.12;

      // Update dust particle positions
      const dustPos = dustGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < dustCount; i++) {
        dustPos[i * 3 + 1] += delta * 0.15;
        if (dustPos[i * 3 + 1] > 2.4) {
          dustPos[i * 3 + 1] = -0.8;
        }
      }
      dustGeo.attributes.position.needsUpdate = true;

      // Animate Orbiting Planets
      planetMeshes.forEach((pm) => {
        // If hovered, slow down orbit to highlight
        const speedMult = hoveredPlanetId === pm.id ? 0.25 : 1.0;
        pm.currentAngle += pm.project.orbitSpeed * delta * 0.45 * speedMult;

        const coords = calculateOrbitPosition(
          pm.project.orbitRadiusX,
          pm.project.orbitRadiusZ,
          pm.project.tiltAngle,
          pm.currentAngle
        );
        pm.group.position.set(coords.x, coords.y, coords.z);
        pm.sphere.rotation.y += delta * 0.6;

        // Depth of field / atmospheric fading
        // Planets further in back lose opacity and scale down
        const distFromCamera = camera.position.distanceTo(pm.group.position);
        const isHovered = hoveredPlanetId === pm.id;
        const isSelected = stateRef.current.activePlanetId === pm.id;

        if (isSelected || isHovered) {
          (pm.sphere.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.55;
          pm.glowSprite.material.opacity = 0.85;
          pm.group.scale.lerp(_tempVec.set(1.2, 1.2, 1.2), 0.1);
        } else {
          (pm.sphere.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.2;
          // Fade back planets slightly
          const zDepth = pm.group.position.z;
          const factor = THREE.MathUtils.clamp((zDepth + 15) / 30, 0.65, 1.0);
          pm.glowSprite.material.opacity = 0.4 * factor;
          pm.group.scale.lerp(_tempVec.set(factor, factor, factor), 0.1);
        }
      });

      // Target Camera & Pedestal Setup based on Scene Mode
      const sceneMode = stateRef.current.currentScene;
      const selectedId = stateRef.current.activePlanetId;
      const isMobile = width < 768;

      // In Hero mode on desktop, position pedestal on the right of the split layout
      const targetCentralX = sceneMode === "hero" && !isMobile ? 1.75 : 0;
      centralGroup.position.x = THREE.MathUtils.damp(centralGroup.position.x, targetCentralX, 3.5, delta);

      if (sceneMode === "hero") {
        if (isMobile) {
          _camPosTarget.set(0, 0.3, 5.8);
          _camLookTarget.set(0, 0.1, 0);
        } else {
          _camPosTarget.set(-1.8 + mouseX * 0.25, 0.35 + mouseY * 0.15, 5.0);
          _camLookTarget.set(0.8, 0.1, 0);
        }
      } else if (sceneMode === "solar") {
        // High dolly perspective looking over the solar system
        if (isMobile) {
          _camPosTarget.set(0, 16, 26);
        } else {
          _camPosTarget.set(mouseX * 2.5, 12 + mouseY * 1.5, 21);
        }
        _camLookTarget.set(0, 0, 0);

        // Project planet positions to screen coordinates for labels
        if (stateRef.current.onUpdatePlanetPositions) {
          const projectedList: ProjectedPlanet[] = planetMeshes.map((pm) => {
            _tempVec.copy(pm.group.position);
            _tempVec.project(camera);
            const x = ((_tempVec.x + 1) * width) / 2;
            const y = ((-_tempVec.y + 1) * height) / 2;
            const visible = _tempVec.z < 1.0;
            return {
              id: pm.id,
              serial: pm.project.serial,
              name: pm.project.name,
              colorHex: pm.project.colorHex,
              x,
              y,
              visible,
            };
          });
          stateRef.current.onUpdatePlanetPositions(projectedList);
        }
      } else if (sceneMode === "planet" && selectedId) {
        // Smooth camera fly-to into the target planet
        const targetPlanet = planetMeshes.find((pm) => pm.id === selectedId);
        if (targetPlanet) {
          const pPos = targetPlanet.group.position;
          if (isMobile) {
            _camPosTarget.set(pPos.x, pPos.y + 0.8, pPos.z + 3.4);
          } else {
            // Offset left so the glassmorphic detail panel can sit on the right
            _camPosTarget.set(pPos.x - 1.8, pPos.y + 0.9, pPos.z + 3.8);
          }
          _camLookTarget.set(pPos.x, pPos.y, pPos.z);
        }
      }

      // Smooth camera interpolation using damp
      camera.position.lerp(_camPosTarget, delta * 3.2);
      _camLookCurrent.lerp(_camLookTarget, delta * 3.5);
      camera.lookAt(_camLookCurrent);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(renderTick);
    };

    animId = requestAnimationFrame(renderTick);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      scene.clear();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full overflow-hidden z-0 select-none cursor-default"
      aria-label="3D Solar System Viewport"
      role="region"
    />
  );
}
