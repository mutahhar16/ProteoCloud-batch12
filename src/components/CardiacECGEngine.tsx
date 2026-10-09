import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, AlertTriangle, ShieldCheck, Heart, Info } from 'lucide-react';

export const CardiacECGEngine: React.FC = () => {
  const [heartRate, setHeartRate] = useState<number>(72);
  const [medicineLevel, setMedicineLevel] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sweepXRef = useRef<number>(0);
  const bufferRef = useRef<number[]>([]);

  // Simple, intuitive health indicator
  const isDangerous = medicineLevel >= 60;
  const isModerate = medicineLevel >= 30 && medicineLevel < 60;

  // Real-time animated ECG tracing onto clean paper graph
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const midY = height * 0.58;

    // Background paper grid
    const drawGrid = () => {
      ctx.fillStyle = '#FBF8F1';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = '#EFE6D4';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < width; x += 12) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 12) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      ctx.strokeStyle = '#E2D5BE';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 48) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 48) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    if (bufferRef.current.length === 0) {
      drawGrid();
    }

    const stepSpeed = 1.6;

    const loop = () => {
      if (!isRunning) {
        animId = requestAnimationFrame(loop);
        return;
      }

      const currentX = sweepXRef.current;
      const nextX = (currentX + stepSpeed) % width;

      // Erase ahead
      ctx.fillStyle = '#FBF8F1';
      ctx.fillRect(nextX, 0, 26, height);

      // Redraw grid ahead
      ctx.strokeStyle = '#EFE6D4';
      ctx.lineWidth = 0.5;
      const startX = Math.floor(nextX / 12) * 12;
      for (let gx = startX; gx <= nextX + 26; gx += 12) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height);
        ctx.stroke();
      }

      ctx.strokeStyle = '#E2D5BE';
      ctx.lineWidth = 1;
      const startMajorX = Math.floor(nextX / 48) * 48;
      for (let gx = startMajorX; gx <= nextX + 26; gx += 48) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height);
        ctx.stroke();
      }

      // Calculate ECG waveform
      const beatPeriodSeconds = 60 / heartRate;
      const beatWidthPx = beatPeriodSeconds * 120;
      const phase = (currentX % beatWidthPx) / beatWidthPx;

      let signal = 0;

      // P wave (atrial pulse)
      if (phase > 0.08 && phase < 0.18) {
        const pNorm = (phase - 0.13) / 0.05;
        signal = Math.exp(-pNorm * pNorm * 4) * 0.22;
      }
      // Q dip
      else if (phase >= 0.24 && phase < 0.26) {
        signal = -0.18;
      }
      // R main tall pump spike
      else if (phase >= 0.26 && phase < 0.28) {
        const rNorm = (phase - 0.27) / 0.01;
        signal = Math.exp(-rNorm * rNorm * 3) * 1.85;
      }
      // S dip
      else if (phase >= 0.28 && phase < 0.31) {
        signal = -0.32;
      }
      // T wave (recovery wave - stretches out when medicine is blocking)
      else {
        const delay = (medicineLevel / 100) * 0.18;
        const tStart = 0.35;
        const tPeak = 0.44 + delay;
        const tEnd = 0.56 + delay * 1.4;

        if (phase >= tStart && phase <= tEnd) {
          const tWidth = (tEnd - tStart) / 2;
          const tNorm = (phase - tPeak) / tWidth;
          signal = Math.exp(-tNorm * tNorm * 3.5) * 0.45;
        }
      }

      const yVal = midY - signal * 46;

      ctx.strokeStyle = isDangerous ? '#9B3D2B' : '#143825';
      ctx.lineWidth = 2.2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      const prevX = (currentX - stepSpeed + width) % width;
      const prevY = bufferRef.current[Math.floor(prevX)] ?? yVal;
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(currentX, yVal);
      ctx.stroke();

      bufferRef.current[Math.floor(currentX)] = yVal;
      sweepXRef.current = nextX;

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, heartRate, medicineLevel, isDangerous]);

  return (
    <section id="electrophysiology" className="py-14 md:py-20 border-b border-[#E2DBD0]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 text-center md:text-left">
          <div className="text-xs font-mono tracking-widest text-[#6E786E] uppercase">
            Simple Health Simulator
          </div>
          <h2 className="mt-1 font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#143424]">
            Heart Rhythm &amp; Medicine Safety
          </h2>
          <p className="mt-2 max-w-2xl font-reading text-base leading-relaxed text-[#4A534B]">
            See what happens to a person&apos;s heartbeat when a medicine affects the heart&apos;s electrical recovery.
          </p>
        </div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: ECG Graph Viewport */}
          <div className="lg:col-span-8 space-y-4">
            <div className="border border-[#DCD5C7] bg-[#FCFAF6] shadow-xs">
              {/* Paper Header */}
              <div className="flex items-center justify-between border-b border-[#E8E2D6] bg-[#F5F1E8] px-4 py-2.5 text-xs">
                <div className="flex items-center gap-2 font-serif font-medium text-[#1A3828]">
                  <Heart className="h-4 w-4 text-[#9B4522]" />
                  <span>Live Heartbeat Monitor (Electrocardiogram / ECG)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsRunning(!isRunning)}
                    className="font-sans text-xs text-[#1B432E] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {isRunning ? (
                      <>
                        <Pause className="h-3 w-3" />
                        <span>Pause Wave</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-3 w-3" />
                        <span>Resume Wave</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Canvas */}
              <div className="relative overflow-hidden">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={320}
                  className="h-[260px] sm:h-[320px] w-full block"
                />
                <div className="absolute top-3 left-4 bg-[#FAF7F0]/90 border border-[#DFD8CA] px-2.5 py-1 text-[11px] font-sans text-[#4D5850]">
                  Green spike = Heart pumping blood · Wave afterwards = Heart resting
                </div>
              </div>

              {/* Simple Bottom Stats */}
              <div className="grid grid-cols-3 border-t border-[#E8E2D6] bg-[#FAF8F3] p-3 text-center text-xs">
                <div className="border-r border-[#E8E2D6] pr-2">
                  <span className="text-[11px] text-[#717C73] block">Heart Rate</span>
                  <span className="text-[#143424] font-bold text-sm">{heartRate} Beats / Min</span>
                </div>
                <div className="border-r border-[#E8E2D6] pr-2">
                  <span className="text-[11px] text-[#717C73] block">Medicine Effect</span>
                  <span className="text-[#143424] font-bold text-sm">{medicineLevel}% Blocked</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#717C73] block">Safety Status</span>
                  <span
                    className={`font-bold text-sm ${
                      isDangerous ? 'text-[#9B3D2B]' : isModerate ? 'text-[#8A6A32]' : 'text-[#1B432E]'
                    }`}
                  >
                    {isDangerous ? 'High Warning' : isModerate ? 'Moderate Delay' : 'Healthy Normal'}
                  </span>
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div
              className={`border p-4 text-xs transition-colors ${
                isDangerous
                  ? 'border-[#C89B92] bg-[#FAF3F2] text-[#69291D]'
                  : isModerate
                  ? 'border-[#DAC8A8] bg-[#FBF7EE] text-[#654C21]'
                  : 'border-[#CAD6CE] bg-[#F4F8F5] text-[#1E432F]'
              }`}
            >
              <div className="flex items-start gap-3">
                {isDangerous ? (
                  <AlertTriangle className="h-5 w-5 text-[#9B3D2B] shrink-0 mt-0.5" />
                ) : isModerate ? (
                  <Info className="h-5 w-5 text-[#8A6A32] shrink-0 mt-0.5" />
                ) : (
                  <ShieldCheck className="h-5 w-5 text-[#1B432E] shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-serif font-bold text-sm">
                    {isDangerous
                      ? 'Warning: The heart is taking too long to reset!'
                      : isModerate
                      ? 'Moderate Notice: Heart reset is slightly delayed'
                      : 'All Clear: Heart recharge rhythm is perfectly normal'}
                  </div>
                  <p className="mt-1 font-reading text-xs leading-relaxed">
                    {isDangerous
                      ? 'Because the medicine level is high (over 60%), the heart gate is blocked. The heart takes too long to recharge for the next beat. Drug companies test this in the cloud to stop dangerous pills from reaching patients.'
                      : isModerate
                      ? 'The recovery wave is taking slightly longer. The heart is still safe, but doctors would keep a close eye on this dosage.'
                      : 'The heartbeat wave looks great! The electrical reset happens right on time without any delay.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Sliders & Quick Presets */}
          <div className="lg:col-span-4 space-y-5">
            <div className="border border-[#DCD5C7] bg-[#FAF8F3] p-5 sm:p-6 shadow-xs">
              <h3 className="font-serif text-xl font-medium text-[#143424] pb-2 border-b border-[#E8E2D6]">
                Change Heart Controls
              </h3>

              <div className="mt-4 space-y-5">
                {/* Heart Rate Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <label className="text-[#3A463E] font-medium font-sans">Heart Speed (BPM)</label>
                    <span className="font-bold text-[#143424]">{heartRate} BPM</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="130"
                    step="1"
                    value={heartRate}
                    onChange={(e) => setHeartRate(Number(e.target.value))}
                    className="w-full mt-2 accent-[#1B432E] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-[#717C73] mt-1">
                    <span>50 (Resting)</span>
                    <span>72 (Normal)</span>
                    <span>130 (Running)</span>
                  </div>
                </div>

                {/* Medicine Level Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <label className="text-[#3A463E] font-medium font-sans">Medicine Blocking Level</label>
                    <span className={`font-bold ${isDangerous ? 'text-[#9B3D2B]' : 'text-[#143424]'}`}>
                      {medicineLevel}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="80"
                    step="5"
                    value={medicineLevel}
                    onChange={(e) => setMedicineLevel(Number(e.target.value))}
                    className="w-full mt-2 accent-[#1B432E] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-[#717C73] mt-1">
                    <span>0% (No Medicine)</span>
                    <span>40% (Medium)</span>
                    <span>80% (High Dose)</span>
                  </div>
                </div>

                {/* 3 Quick Preset Buttons */}
                <div className="pt-2 border-t border-[#E8E2D6] space-y-2">
                  <div className="text-[11px] font-sans text-[#6B756D] font-medium">Quick Scenarios:</div>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setHeartRate(72);
                        setMedicineLevel(0);
                      }}
                      className="w-full text-left p-2 border border-[#D5CDC0] bg-[#FAF8F3] hover:bg-[#EFEAE0] text-xs transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span className="font-serif font-bold text-[#1B432E]">Scenario 1: Normal Heart (No Drugs)</span>
                      <span className="text-[10px] text-[#788279]">0% Effect</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setHeartRate(68);
                        setMedicineLevel(35);
                      }}
                      className="w-full text-left p-2 border border-[#D5CDC0] bg-[#FAF8F3] hover:bg-[#EFEAE0] text-xs transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span className="font-serif font-bold text-[#8A6A32]">Scenario 2: Safe Daily Medicine</span>
                      <span className="text-[10px] text-[#788279]">35% Effect</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setHeartRate(60);
                        setMedicineLevel(70);
                      }}
                      className="w-full text-left p-2 border border-[#C89B92] bg-[#FAF3F2] hover:bg-[#F5E8E6] text-xs transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span className="font-serif font-bold text-[#9B3D2B]">Scenario 3: Dangerous Drug Warning</span>
                      <span className="text-[10px] text-[#9B3D2B] font-bold">70% Block</span>
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setHeartRate(72);
                      setMedicineLevel(0);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 border border-[#D5CDC0] text-xs text-[#48534C] hover:bg-[#EFEAE0] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Reset to Defaults</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
