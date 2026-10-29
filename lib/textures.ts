import * as THREE from "three";

/**
 * Procedural texture generator for the 6 cosmic planets and portal backgrounds.
 * Zero external image dependencies (zero 404s).
 */

export function createProceduralPlanetTexture(planetId: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  switch (planetId) {
    case "rubiks-cayley": {
      // 01 Rubik's AI & Cayley Graph: cosmic purple #5C4B8A with faint lattice-graph network
      const grad = ctx.createLinearGradient(0, 0, 1024, 512);
      grad.addColorStop(0, "#3D2F60");
      grad.addColorStop(0.5, "#5C4B8A");
      grad.addColorStop(1, "#261D40");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 512);

      // Cayley graph lattice nodes and edges
      ctx.strokeStyle = "rgba(180, 160, 240, 0.28)";
      ctx.lineWidth = 1.5;
      const nodes: [number, number][] = [];
      for (let x = 40; x < 1024; x += 110) {
        for (let y = 30; y < 512; y += 85) {
          const jitterX = x + Math.sin(x * y) * 22;
          const jitterY = y + Math.cos(x + y) * 18;
          nodes.push([jitterX, jitterY]);
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i][0] - nodes[j][0];
          const dy = nodes[i][1] - nodes[j][1];
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(nodes[i][0], nodes[i][1]);
            ctx.lineTo(nodes[j][0], nodes[j][1]);
            ctx.stroke();
          }
        }
      }
      // Bright node points
      ctx.fillStyle = "rgba(220, 205, 255, 0.75)";
      nodes.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });
      break;
    }

    case "azure-ml-pipeline": {
      // 02 Azure Cloud ML: cool tech blue #4A7BB0 with pipeline node tracks
      const grad = ctx.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, "#224163");
      grad.addColorStop(0.5, "#4A7BB0");
      grad.addColorStop(1, "#182C44");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 512);

      // Cloud pipeline data streams and horizontal tracks
      ctx.strokeStyle = "rgba(140, 205, 255, 0.35)";
      ctx.lineWidth = 2;
      for (let y = 60; y < 512; y += 55) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.bezierCurveTo(340, y - 25, 680, y + 25, 1024, y);
        ctx.stroke();

        // Data packets
        for (let x = 60; x < 1024; x += 180) {
          ctx.fillStyle = "#E5C158"; // gold pipeline packet
          ctx.beginPath();
          ctx.arc(x + ((y * 3) % 80), y, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      break;
    }

    case "catch-vr": {
      // 03 CATCH-VR: warm amber #E58F42 with robotic-path line texture
      const grad = ctx.createLinearGradient(0, 0, 1024, 512);
      grad.addColorStop(0, "#8C4A15");
      grad.addColorStop(0.5, "#E58F42");
      grad.addColorStop(1, "#522506");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 512);

      // Autonomous navigation path vectors and waypoints
      ctx.strokeStyle = "rgba(255, 230, 190, 0.38)";
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 8]);
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        let currX = 40 + i * 110;
        let currY = 40;
        ctx.moveTo(currX, currY);
        while (currY < 500) {
          currX += (Math.random() - 0.5) * 140;
          currY += 70;
          ctx.lineTo(currX, currY);
        }
        ctx.stroke();
      }
      ctx.setLineDash([]);
      break;
    }

    case "peer-reviewed-paper": {
      // 04 Peer-Reviewed Publication: ivory marble #EAE5D9 with gold lettering & equations
      const grad = ctx.createLinearGradient(0, 0, 1024, 512);
      grad.addColorStop(0, "#F5F2EA");
      grad.addColorStop(0.4, "#E2DDD0");
      grad.addColorStop(0.8, "#F7F5EF");
      grad.addColorStop(1, "#D6CFBE");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 512);

      // Fine marble veining
      ctx.strokeStyle = "rgba(140, 125, 95, 0.25)";
      ctx.lineWidth = 1.8;
      for (let i = 0; i < 14; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * 45);
        ctx.bezierCurveTo(280, i * 45 + 50, 720, i * 45 - 40, 1024, i * 45 + 20);
        ctx.stroke();
      }

      // Elegant gold inscribed notation & DOI markings
      ctx.fillStyle = "rgba(180, 140, 50, 0.42)";
      ctx.font = "italic 16px serif";
      ctx.fillText("DOI: 10.5281/zenodo.18829960 · E(w) = min L(θ) + λΩ(θ)", 80, 140);
      ctx.fillText("∇L_B(w) + 1/2 H_w · OPTIMIZATION & DECISION SCIENCE", 120, 260);
      ctx.fillText("G ≅ ⟨s₁, s₂, ... | r₁, r₂, ...⟩ · SYMMETRIC GROUPS", 160, 390);
      break;
    }

    case "bank-analytics": {
      // 05 Bank-Transaction Analytics: frosted silver-white with fine data-grain texture
      const grad = ctx.createLinearGradient(0, 0, 1024, 0);
      grad.addColorStop(0, "#BAC7D5");
      grad.addColorStop(0.5, "#E2E8F0");
      grad.addColorStop(1, "#A0AEC0");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 512);

      // Statistical distribution bars & telemetry spikes
      ctx.fillStyle = "rgba(71, 85, 105, 0.22)";
      for (let x = 0; x < 1024; x += 6) {
        const h = Math.abs(Math.sin(x * 0.05) * 140 + Math.cos(x * 0.12) * 60);
        ctx.fillRect(x, 256 - h / 2, 4, h);
      }
      ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let x = 0; x < 1024; x += 10) {
        const y = 256 + Math.sin(x * 0.03) * 80 * Math.sin(x * 0.005);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      break;
    }

    case "tourism-data": {
      // 06 Tourism Data: terracotta / earthy marble #C86D51 with subtle map-contour texture
      const grad = ctx.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, "#8F3E26");
      grad.addColorStop(0.5, "#C86D51");
      grad.addColorStop(1, "#662615");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 512);

      // Topographic elevation contour lines
      ctx.strokeStyle = "rgba(255, 220, 205, 0.28)";
      ctx.lineWidth = 1.5;
      for (let r = 30; r < 360; r += 28) {
        ctx.beginPath();
        for (let angle = 0; angle <= Math.PI * 2; angle += 0.1) {
          const rad = r + Math.sin(angle * 7) * 12 + Math.cos(angle * 4) * 8;
          const x = 512 + Math.cos(angle) * rad * 1.5;
          const y = 256 + Math.sin(angle) * rad;
          if (angle === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }
      break;
    }

    default: {
      ctx.fillStyle = "#334155";
      ctx.fillRect(0, 0, 1024, 512);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Creates texture for Syed's arched portal backdrop
 */
export function createPortalTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  // Dark emerald deep gradient (#0F3B2E to #14573F)
  const grad = ctx.createLinearGradient(0, 0, 0, 1024);
  grad.addColorStop(0, "#081E17");
  grad.addColorStop(0.4, "#0F3B2E");
  grad.addColorStop(0.8, "#14573F");
  grad.addColorStop(1, "#09221A");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 1024);

  // Arched frame contour lines
  ctx.strokeStyle = "rgba(57, 255, 20, 0.22)"; // soft neon green glow lines
  ctx.lineWidth = 1.5;

  for (let inset = 15; inset <= 65; inset += 25) {
    ctx.beginPath();
    ctx.moveTo(inset, 1024);
    ctx.lineTo(inset, 256);
    ctx.arc(256, 256, 256 - inset, Math.PI, 0, false);
    ctx.lineTo(512 - inset, 1024);
    ctx.stroke();
  }

  // Thin gold coordinate tick marks
  ctx.strokeStyle = "rgba(217, 180, 90, 0.4)";
  for (let y = 300; y < 1000; y += 70) {
    ctx.beginPath();
    ctx.moveTo(25, y);
    ctx.lineTo(40, y);
    ctx.moveTo(487, y);
    ctx.lineTo(472, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates Syed's cutout avatar sprite / plane texture
 * Uses the uploaded portrait (/assets/aistudio/Muaviz_e241b88f.jpg),
 * cleanly removes the white background with feathered alpha,
 * adds subtle neon green rim lighting (#39FF14), emerald lighting,
 * and soft contact shadow on the pedestal.
 */
export function createSyedSilhouetteTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 800;
  const ctx = canvas.getContext("2d")!;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  const renderCutout = (img?: HTMLImageElement) => {
    ctx.clearRect(0, 0, 512, 800);

    // 1. Soft emerald & neon green aura behind figure
    const auraGrad = ctx.createRadialGradient(256, 380, 50, 256, 380, 280);
    auraGrad.addColorStop(0, "rgba(57, 255, 20, 0.28)");
    auraGrad.addColorStop(0.45, "rgba(20, 87, 63, 0.22)");
    auraGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = auraGrad;
    ctx.beginPath();
    ctx.arc(256, 380, 280, 0, Math.PI * 2);
    ctx.fill();

    // 2. Pedestal contact shadow base
    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    ctx.beginPath();
    ctx.ellipse(256, 765, 130, 28, 0, 0, Math.PI * 2);
    ctx.fill();

    if (img && img.complete && img.naturalWidth > 0) {
      // Create offscreen canvas to process the photo
      const offCanvas = document.createElement("canvas");
      offCanvas.width = 512;
      offCanvas.height = 800;
      const offCtx = offCanvas.getContext("2d")!;

      // Draw Syed's photo scaled to fit from head down to shoulders/torso standing on the pedestal
      const targetW = 440;
      const targetH = (targetW / img.naturalWidth) * img.naturalHeight;
      const startX = (512 - targetW) / 2;
      const startY = 120;

      offCtx.drawImage(img, startX, startY, targetW, targetH);

      // Chroma/luminance keying to remove white background cleanly
      const imgData = offCtx.getImageData(0, 0, 512, 800);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = (r + g + b) / 3;

        // If background white or off-white
        if (r > 218 && g > 218 && b > 218) {
          if (brightness > 240) {
            data[i + 3] = 0; // Pure transparent
          } else {
            // Feathered soft edge
            const alphaFactor = (240 - brightness) / 22;
            data[i + 3] = Math.max(0, Math.min(255, Math.floor(alphaFactor * 255)));
          }
        }
      }

      offCtx.putImageData(imgData, 0, 0);

      // Draw subtle neon green edge/rim glow
      ctx.save();
      ctx.shadowColor = "#39FF14";
      ctx.shadowBlur = 18;
      ctx.drawImage(offCanvas, 0, 0);
      ctx.restore();

      // Draw main crisp cutout
      ctx.drawImage(offCanvas, 0, 0);

      // Subtle emerald tone overlay on lower torso to merge into pedestal
      const lowerFade = ctx.createLinearGradient(0, 600, 0, 770);
      lowerFade.addColorStop(0, "rgba(8, 28, 22, 0)");
      lowerFade.addColorStop(0.7, "rgba(8, 28, 22, 0.45)");
      lowerFade.addColorStop(1, "rgba(8, 28, 22, 0.95)");
      ctx.fillStyle = lowerFade;
      ctx.fillRect(startX, 600, targetW, 170);
    } else {
      // Silhouette placeholder while image is streaming in
      ctx.fillStyle = "#0c1f19";
      ctx.beginPath();
      ctx.ellipse(256, 360, 110, 150, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    texture.needsUpdate = true;
  };

  // Initial draw
  renderCutout();

  // Load Syed's photo
  if (typeof window !== "undefined") {
    const photo = new Image();
    photo.crossOrigin = "anonymous";
    photo.src = "/assets/aistudio/Muaviz_e241b88f.jpg";
    photo.onload = () => {
      renderCutout(photo);
    };
  }

  return texture;
}

/**
 * Creates procedural gold Saturn-like ring texture for Planet 02
 */
export function createPlanetRingTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;

  const grad = ctx.createLinearGradient(0, 0, 512, 0);
  grad.addColorStop(0, "rgba(217, 180, 90, 0)");
  grad.addColorStop(0.2, "rgba(217, 180, 90, 0.85)");
  grad.addColorStop(0.5, "rgba(255, 235, 160, 0.95)");
  grad.addColorStop(0.8, "rgba(217, 180, 90, 0.85)");
  grad.addColorStop(1, "rgba(217, 180, 90, 0)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 64);

  // Concentric ring grooves
  ctx.fillStyle = "rgba(10, 25, 30, 0.35)";
  ctx.fillRect(120, 0, 15, 64);
  ctx.fillRect(280, 0, 25, 64);
  ctx.fillRect(390, 0, 10, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
