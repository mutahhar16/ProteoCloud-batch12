import React, { useEffect, useRef, useState } from 'react';
import { ProteinStructure } from '../types';
import { RotateCw, Pause, Play, ZoomIn, ZoomOut, Compass, Sparkles } from 'lucide-react';

interface ProteinViewerCanvasProps {
  protein: ProteinStructure;
}

interface RibbonNode {
  x: number;
  y: number;
  z: number;
  partIndex: number;
  isKeySite: boolean;
  label?: string;
}

export const ProteinViewerCanvas: React.FC<ProteinViewerCanvasProps> = ({ protein }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rotationX, setRotationX] = useState<number>(0.2);
  const [rotationY, setRotationY] = useState<number>(0.5);
  const [zoom, setZoom] = useState<number>(1.15);
  const [isAutoSpin, setIsAutoSpin] = useState<boolean>(true);
  const [showKeyLabels, setShowKeyLabels] = useState<boolean>(true);

  const isDraggingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const ribbonNodesRef = useRef<RibbonNode[]>([]);

  // Generate a smooth, gorgeous, organic 3D folded ribbon fold
  useEffect(() => {
    const nodes: RibbonNode[] = [];
    const count = 90;

    // Tailor ribbon shape specifically for each protein so they look distinct and beautiful
    const shapeType = protein.id;

    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 4;
      let x = 0;
      let y = 0;
      let z = 0;
      let isKeySite = false;
      let label: string | undefined = undefined;

      if (shapeType === 'hemoglobin') {
        // 4 globular interlocking lobes
        const lobe = Math.floor(i / 22.5);
        const lobeAngle = lobe * (Math.PI / 2);
        const rLobe = 36;
        const cx = Math.cos(lobeAngle) * rLobe;
        const cy = Math.sin(lobeAngle) * rLobe;

        const subT = (i % 23) * 0.45;
        x = cx + Math.sin(subT * 2) * 18;
        y = cy + Math.cos(subT * 1.5) * 18;
        z = Math.sin(subT * 2.5) * 22;

        if (i === 15 || i === 38 || i === 60 || i === 82) {
          isKeySite = true;
          label = 'Oxygen Pocket (Iron)';
        }
      } else if (shapeType === 'herg-potassium-channel') {
        // Cylindrical gate with central pore and 4 outer columns
        const isColumn = i > 30;
        if (!isColumn) {
          // Central pore coil
          const u = (i / 30) * Math.PI * 3;
          x = Math.cos(u) * 22;
          y = (i - 15) * 3.8;
          z = Math.sin(u) * 22;
          if (i === 15) {
            isKeySite = true;
            label = 'Medicine Trap Cavity';
          }
        } else {
          // Outer spiral sensor
          const colIndex = Math.floor((i - 30) / 15);
          const colBaseAngle = colIndex * (Math.PI / 2) + Math.PI / 4;
          const u = ((i - 30) % 15) * 0.4;
          x = Math.cos(colBaseAngle) * 44 + Math.sin(u) * 8;
          y = (u * 14) - 40;
          z = Math.sin(colBaseAngle) * 44 + Math.cos(u) * 8;
          if (i === 45) {
            isKeySite = true;
            label = 'Heartbeat Sensor';
          }
        }
      } else if (shapeType === 'crispr-cas9') {
        // Two large lobes with a central cutting channel
        const lobe = i < 45 ? -1 : 1;
        const u = ((i % 45) / 45) * Math.PI * 2.5;
        x = lobe * 30 + Math.cos(u) * 25;
        y = Math.sin(u * 1.5) * 45;
        z = Math.sin(u * 2) * 24;

        if (i === 22) {
          isKeySite = true;
          label = 'DNA Guide Groove';
        }
        if (i === 68) {
          isKeySite = true;
          label = 'Cutting Blade';
        }
      } else {
        // Viral Spike Protein: Trimeric crown
        const trimer = Math.floor(i / 30);
        const trimerAngle = trimer * ((Math.PI * 2) / 3);
        const subT = (i % 30) * 0.35;
        const heightY = (subT * 7) - 45;
        const spreadR = 20 + (heightY > 0 ? heightY * 0.6 : 5);

        x = Math.cos(trimerAngle + subT * 0.3) * spreadR;
        y = heightY;
        z = Math.sin(trimerAngle + subT * 0.3) * spreadR;

        if (i === 25 || i === 55 || i === 85) {
          isKeySite = true;
          label = 'Cell Key Tip';
        }
      }

      nodes.push({
        x,
        y,
        z,
        partIndex: Math.floor(i / (count / 3)),
        isKeySite,
        label,
      });
    }

    ribbonNodesRef.current = nodes;
  }, [protein.id]);

  // Smooth render loop
  useEffect(() => {
    let animId: number;

    const render = () => {
      if (isAutoSpin && !isDraggingRef.current) {
        setRotationY((prev) => prev + 0.007);
      }

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Warm cream paper gradient background
      const bgGrad = ctx.createRadialGradient(cx, cy, 40, cx, cy, width * 0.65);
      bgGrad.addColorStop(0, '#FCFAF6');
      bgGrad.addColorStop(1, '#F3EFE6');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle warm millimeter grid lines
      ctx.strokeStyle = 'rgba(26, 43, 33, 0.04)';
      ctx.lineWidth = 0.5;
      for (let x = 20; x < width; x += 24) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 20; y < height; y += 24) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Rotate coordinates
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);

      const projected = ribbonNodesRef.current.map((node) => {
        // Y rotation
        const x1 = node.x * cosY + node.z * sinY;
        const z1 = -node.x * sinY + node.z * cosY;

        // X rotation
        const y2 = node.y * cosX - z1 * sinX;
        const z2 = node.y * sinX + z1 * cosX;

        // Perspective
        const camDist = 260;
        const factor = (camDist / (camDist + z2)) * zoom;
        const projX = cx + x1 * factor;
        const projY = cy + y2 * factor;

        return {
          ...node,
          projX,
          projY,
          depth: z2,
          factor,
        };
      });

      // Soft ground contact shadow
      ctx.beginPath();
      ctx.ellipse(cx, cy + 120 * zoom, 75 * zoom, 18 * zoom, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(26, 43, 33, 0.06)';
      ctx.fill();

      // Render ribbon as smooth connected segments with organic tubular thickness
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let i = 0; i < projected.length - 1; i++) {
        const curr = projected[i];
        const next = projected[i + 1];

        // 1. Soft depth-drop ribbon underlayer
        ctx.beginPath();
        ctx.moveTo(curr.projX + 1.5, curr.projY + 2.5);
        ctx.lineTo(next.projX + 1.5, next.projY + 2.5);
        ctx.strokeStyle = 'rgba(15, 35, 23, 0.15)';
        ctx.lineWidth = 6 * curr.factor;
        ctx.stroke();

        // 2. Primary colored ribbon strand
        ctx.beginPath();
        ctx.moveTo(curr.projX, curr.projY);
        ctx.lineTo(next.projX, next.projY);

        // Classy forest green and warm amber color palette
        if (curr.partIndex === 0) {
          ctx.strokeStyle = '#18472E'; // Forest green
        } else if (curr.partIndex === 1) {
          ctx.strokeStyle = '#275E40'; // Sage emerald
        } else {
          ctx.strokeStyle = '#8C6F47'; // Antique bronze / amber
        }

        ctx.lineWidth = 5 * curr.factor;
        ctx.stroke();

        // 3. Ribbon top glossy highlight line
        ctx.beginPath();
        ctx.moveTo(curr.projX - 0.5, curr.projY - 1);
        ctx.lineTo(next.projX - 0.5, next.projY - 1);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.lineWidth = 1.5 * curr.factor;
        ctx.stroke();
      }

      // Render Key Functional Sites (Glowing gold spheres + clear labels)
      projected.forEach((node) => {
        if (node.isKeySite) {
          // Spherical ball
          const r = 7 * node.factor;
          const sphereGrad = ctx.createRadialGradient(
            node.projX - r * 0.3,
            node.projY - r * 0.3,
            r * 0.1,
            node.projX,
            node.projY,
            r
          );
          sphereGrad.addColorStop(0, '#F5DEB3');
          sphereGrad.addColorStop(0.5, '#C2A679');
          sphereGrad.addColorStop(1, '#8C6F47');

          ctx.beginPath();
          ctx.arc(node.projX, node.projY, r, 0, Math.PI * 2);
          ctx.fillStyle = sphereGrad;
          ctx.fill();
          ctx.strokeStyle = '#143424';
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Clear, clean label callout
          if (showKeyLabels && node.label) {
            const labelX = node.projX + (node.projX > cx ? 24 : -110);
            const labelY = node.projY - 12;

            // Thin pointer hairline
            ctx.beginPath();
            ctx.moveTo(node.projX, node.projY);
            ctx.lineTo(labelX + (node.projX > cx ? 0 : 80), labelY + 6);
            ctx.strokeStyle = '#8C6F47';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Label text tag
            ctx.fillStyle = '#FAF7F0';
            ctx.fillRect(labelX - 4, labelY - 5, 86, 17);
            ctx.strokeStyle = '#D5CDC0';
            ctx.lineWidth = 1;
            ctx.strokeRect(labelX - 4, labelY - 5, 86, 17);

            ctx.fillStyle = '#1B432E';
            ctx.font = 'bold 9px "Plus Jakarta Sans", sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(node.label, labelX, labelY + 7);
          }
        }
      });

      // Compass rosette in bottom-left corner
      const compassX = 40;
      const compassY = height - 40;
      ctx.strokeStyle = '#B3A897';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(compassX, compassY, 15, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#1B3D2B';
      ctx.font = 'bold 8px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('3D', compassX, compassY + 3);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [rotationX, rotationY, zoom, isAutoSpin, showKeyLabels]);

  // Mouse interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastMousePosRef.current.x;
    const deltaY = e.clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };

    setRotationY((prev) => prev + deltaX * 0.008);
    setRotationX((prev) => Math.max(-1.4, Math.min(1.4, prev + deltaY * 0.008)));
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((prev) => Math.max(0.7, Math.min(2.2, prev - e.deltaY * 0.0015)));
  };

  return (
    <div className="overflow-hidden border border-[#DCD5C7] bg-[#FCFAF6] shadow-xs">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-[#E8E2D6] bg-[#F5F1E8] px-4 py-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-serif font-bold text-[#153825] text-sm">{protein.name}</span>
          <span className="text-[#8F8778]">·</span>
          <span className="font-sans text-[#4D5750]">{protein.simpleTitle}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowKeyLabels(!showKeyLabels)}
            className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-sans border transition-colors cursor-pointer ${
              showKeyLabels
                ? 'border-[#1B432E] bg-[#1B432E] text-[#F8F5EE]'
                : 'border-[#D5CDC0] bg-[#FAF8F3] text-[#4A554D] hover:text-[#1B432E]'
            }`}
          >
            <Sparkles className="h-3 w-3" />
            <span>{showKeyLabels ? 'Labels: ON' : 'Labels: OFF'}</span>
          </button>
        </div>
      </div>

      {/* Interactive 3D Canvas */}
      <div
        className="relative cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <canvas
          ref={canvasRef}
          width={760}
          height={400}
          className="h-[340px] sm:h-[400px] w-full block"
        />

        {/* Floating Tool Controls */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 bg-[#FAF7F0]/95 backdrop-blur-xs border border-[#DFD8CA] p-1.5 shadow-xs">
          <button
            type="button"
            onClick={() => setIsAutoSpin(!isAutoSpin)}
            title={isAutoSpin ? 'Pause Rotation' : 'Auto Rotate'}
            className="flex h-7 w-7 items-center justify-center text-[#234533] hover:bg-[#EAE4D7] transition-colors cursor-pointer"
          >
            {isAutoSpin ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(2.1, z + 0.2))}
            title="Zoom In"
            className="flex h-7 w-7 items-center justify-center text-[#234533] hover:bg-[#EAE4D7] transition-colors cursor-pointer"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.7, z - 0.2))}
            title="Zoom Out"
            className="flex h-7 w-7 items-center justify-center text-[#234533] hover:bg-[#EAE4D7] transition-colors cursor-pointer"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => {
              setRotationX(0.2);
              setRotationY(0.5);
              setZoom(1.15);
            }}
            title="Reset View"
            className="flex h-7 w-7 items-center justify-center text-[#234533] hover:bg-[#EAE4D7] transition-colors cursor-pointer"
          >
            <RotateCw className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Drag Hint */}
        <div className="absolute bottom-3 left-16 hidden sm:flex items-center gap-1.5 text-[11px] text-[#69746A] font-sans bg-[#FAF7F0]/90 px-2 py-0.5 border border-[#E5DFD2]">
          <Compass className="h-3 w-3 text-[#8C6F47]" />
          <span>Click &amp; drag mouse to spin · Scroll to zoom</span>
        </div>
      </div>

      {/* Simple "What am I looking at?" explanation footer */}
      <div className="border-t border-[#E8E2D6] bg-[#FAF8F3] px-4 py-3 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[#465149]">
          <span className="font-serif font-bold text-[#143424]">How it works:</span>
          <span>Proteins are tiny 3D folded machines. Their folded shape is what allows them to do their job in your body.</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] shrink-0 font-sans">
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#18472E]" />
            <span>Main Backbone</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#C2A679]" />
            <span>Active Pocket</span>
          </span>
        </div>
      </div>
    </div>
  );
};
