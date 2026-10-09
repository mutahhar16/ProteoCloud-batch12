import React from 'react';

/**
 * EditorialArtworks provides archival, copperplate-style scientific engravings
 * and plates rendered with deep forest greens, antique parchment tones, and bronze hairlines.
 * This guarantees pristine visual fidelity with zero broken image frames.
 */

interface ArtworkProps {
  className?: string;
  caption?: string;
  figureNumber?: string;
}

export const HeroEngravingPlate: React.FC<ArtworkProps> = ({
  className = '',
  caption = 'Plate I: Quaternary Allostery & Crystallographic Diffraction Lattice (Batch 12 Archive)',
  figureNumber = 'Fig. 01',
}) => {
  return (
    <figure className={`overflow-hidden border border-[#DCD5C7] bg-[#FAF8F3] p-4 lg:p-6 shadow-xs ${className}`}>
      <div className="relative aspect-[16/10] w-full overflow-hidden border border-[#E5DFD2] bg-[#F5F1E7]">
        {/* Subtle decorative archival corner markers */}
        <div className="absolute top-2 left-2 text-[9px] font-mono tracking-widest text-[#7B8276] uppercase">
          [REF: PRT-CRYST-7]
        </div>
        <div className="absolute top-2 right-2 text-[9px] font-mono tracking-widest text-[#7B8276] uppercase">
          λ = 1.5418 Å
        </div>
        <div className="absolute bottom-2 left-2 text-[9px] font-serif italic text-[#8B7355]">
          Folio 42 · Tabula Biophysica
        </div>
        <div className="absolute bottom-2 right-2 text-[9px] font-mono text-[#7B8276]">
          P 2₁ 2₁ 2₁
        </div>

        {/* SVG Archival Engraving */}
        <svg
          viewBox="0 0 800 500"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Crystallographic and protein structure archival engraving"
        >
          <defs>
            <radialGradient id="engraveGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#EDE7D9" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F5F1E7" stopOpacity="0" />
            </radialGradient>
            <pattern id="millimeterGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2DAC9" strokeWidth="0.5" strokeOpacity="0.5" />
            </pattern>
          </defs>

          {/* Grid background */}
          <rect width="800" height="500" fill="url(#millimeterGrid)" />
          <circle cx="400" cy="250" r="230" fill="url(#engraveGlow)" />

          {/* Concentric diffraction rings (Bragg reflection circles) */}
          <g stroke="#C2B8A3" strokeWidth="0.75" fill="none" strokeDasharray="3 3">
            <circle cx="400" cy="250" r="60" />
            <circle cx="400" cy="250" r="110" />
            <circle cx="400" cy="250" r="160" />
            <circle cx="400" cy="250" r="210" strokeDasharray="6 4" stroke="#A89B82" strokeWidth="1" />
          </g>

          {/* Polar axes */}
          <g stroke="#998D75" strokeWidth="0.75">
            <line x1="170" y1="250" x2="630" y2="250" strokeDasharray="4 2" />
            <line x1="400" y1="40" x2="400" y2="460" strokeDasharray="4 2" />
          </g>

          {/* Central Macromolecular Ribbon Structure in deep forest green */}
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Secondary ribbon shadows */}
            <path
              d="M 280,310 C 310,360 360,370 410,340 C 460,310 490,320 520,360"
              stroke="#BAC5BC"
              strokeWidth="7"
              opacity="0.6"
            />
            {/* Primary Alpha-Helix Ribbon Fold */}
            <path
              d="M 270,180 C 310,130 350,150 380,210 C 410,270 450,290 490,230 C 530,170 560,200 580,260"
              stroke="#1B432E"
              strokeWidth="5"
            />
            {/* Parallel Beta Strand Sheet 1 */}
            <path
              d="M 330,190 L 370,250 L 340,310 L 390,350 L 450,320"
              stroke="#2B5D42"
              strokeWidth="3.5"
            />
            {/* Beta Strand Arrowhead */}
            <polygon points="450,315 465,320 448,328" fill="#1B432E" />

            {/* Counter Helix */}
            <path
              d="M 240,240 C 270,290 320,300 370,260 C 420,220 460,230 500,280 C 540,330 580,320 600,280"
              stroke="#3B6F52"
              strokeWidth="2.5"
              strokeDasharray="8 3"
            />

            {/* Coordination bonds and prosthetic heme ring */}
            <g stroke="#8B7355" strokeWidth="1.2">
              <line x1="380" y1="210" x2="400" y2="250" />
              <line x1="400" y1="250" x2="430" y2="240" />
              <line x1="400" y1="250" x2="410" y2="280" />
              <line x1="400" y1="250" x2="370" y2="260" />
            </g>
          </g>

          {/* Coordination center (Fe ion / catalytic pore) */}
          <circle cx="400" cy="250" r="7" fill="#8B7355" stroke="#1B432E" strokeWidth="2" />
          <circle cx="400" cy="250" r="14" fill="none" stroke="#C2A679" strokeWidth="1" strokeDasharray="2 2" />

          {/* Crystallographic diffraction reflections (discrete Bragg spots) */}
          <g fill="#1B432E">
            <circle cx="340" cy="180" r="3" />
            <circle cx="460" cy="180" r="2.5" />
            <circle cx="320" cy="290" r="2" />
            <circle cx="480" cy="290" r="3.5" />
            <circle cx="290" cy="210" r="2" />
            <circle cx="510" cy="210" r="2.5" />
            <circle cx="400" cy="140" r="4" fill="#8B7355" />
            <circle cx="400" cy="360" r="4" fill="#8B7355" />
            <circle cx="260" cy="250" r="3" />
            <circle cx="540" cy="250" r="3" />
            <circle cx="310" cy="140" r="2" />
            <circle cx="490" cy="140" r="2" />
            <circle cx="310" cy="360" r="2" />
            <circle cx="490" cy="360" r="2" />
            <circle cx="230" cy="200" r="1.5" />
            <circle cx="570" cy="300" r="1.5" />
          </g>

          {/* Astrolabe / Goniometer angle ticks */}
          {Array.from({ length: 36 }).map((_, i) => {
            const angle = (i * 10 * Math.PI) / 180;
            const x1 = 400 + Math.cos(angle) * 210;
            const y1 = 250 + Math.sin(angle) * 210;
            const tickLen = i % 9 === 0 ? 12 : i % 3 === 0 ? 7 : 4;
            const x2 = 400 + Math.cos(angle) * (210 - tickLen);
            const y2 = 250 + Math.sin(angle) * (210 - tickLen);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#8F836E"
                strokeWidth={i % 9 === 0 ? 1.5 : 0.75}
              />
            );
          })}
        </svg>
      </div>

      <figcaption className="mt-3 flex items-baseline justify-between border-t border-[#E5DFD2] pt-2 text-xs">
        <span className="font-serif italic text-[#303832]">
          {figureNumber} &mdash; {caption}
        </span>
        <span className="font-mono text-[10px] text-[#788075] uppercase">Archival Plate</span>
      </figcaption>
    </figure>
  );
};

export const MolecularCrystalPlate: React.FC<ArtworkProps> = ({
  className = '',
  caption = 'Plate II: Membrane Pore Translocation Cavity & Selectivity Filter (hERG KCNH2)',
  figureNumber = 'Fig. 02',
}) => {
  return (
    <figure className={`border border-[#DCD5C7] bg-[#FAF8F3] p-4 shadow-xs ${className}`}>
      <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#E5DFD2] bg-[#F4EFE5] p-2">
        <svg
          viewBox="0 0 500 375"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Membrane pore selectivity filter diagram"
        >
          {/* Subtle horizontal lipid bilayer bands */}
          <rect x="20" y="80" width="460" height="215" fill="#EAE3D4" fillOpacity="0.4" />
          <line x1="20" y1="80" x2="480" y2="80" stroke="#C5BCA9" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="20" y1="295" x2="480" y2="295" stroke="#C5BCA9" strokeWidth="1" strokeDasharray="3 3" />

          {/* Extracellular / Intracellular labels */}
          <text x="35" y="65" fill="#756E5E" fontSize="10" fontFamily="var(--font-serif)" fontStyle="italic">
            Extracellular Fluid [145 mM Na⁺, 4.0 mM K⁺]
          </text>
          <text x="35" y="325" fill="#756E5E" fontSize="10" fontFamily="var(--font-serif)" fontStyle="italic">
            Cytoplasmic Milieu [140 mM K⁺, 12 mM Na⁺]
          </text>

          {/* S5 and S6 Transmembrane Helices */}
          <g stroke="#1A432D" strokeWidth="3" fill="none">
            {/* Subunit A S5 */}
            <path d="M 110,85 C 130,140 120,220 100,290" />
            {/* Subunit A S6 inner pore helix */}
            <path d="M 180,90 C 200,160 215,220 190,290" strokeWidth="4" />

            {/* Subunit B S6 inner pore helix */}
            <path d="M 320,90 C 300,160 285,220 310,290" strokeWidth="4" />
            {/* Subunit B S5 */}
            <path d="M 390,85 C 370,140 380,220 400,290" />
          </g>

          {/* Pore Loop & Selectivity Filter TTVGYG */}
          <path
            d="M 180,90 C 210,100 230,120 230,145 L 270,145 C 270,120 290,100 320,90"
            stroke="#8B7355"
            strokeWidth="3.5"
            fill="none"
          />

          {/* 4 Potassium binding sites (S1 - S4) in the selectivity filter */}
          <g>
            <circle cx="250" cy="115" r="7" fill="#8B7355" stroke="#1A432D" strokeWidth="1.5" />
            <circle cx="250" cy="135" r="7" fill="#2E5C41" stroke="#FAF8F3" strokeWidth="1.5" />
            <circle cx="250" cy="155" r="7" fill="#8B7355" stroke="#1A432D" strokeWidth="1.5" />
            <circle cx="250" cy="175" r="7" fill="#2E5C41" stroke="#FAF8F3" strokeWidth="1.5" />
            <text x="268" y="119" fill="#1A432D" fontSize="9" fontFamily="var(--font-mono)">S₁ site</text>
            <text x="268" y="139" fill="#1A432D" fontSize="9" fontFamily="var(--font-mono)">S₂ site</text>
            <text x="268" y="159" fill="#1A432D" fontSize="9" fontFamily="var(--font-mono)">S₃ site</text>
            <text x="268" y="179" fill="#1A432D" fontSize="9" fontFamily="var(--font-mono)">S₄ site</text>
          </g>

          {/* Central Hydrophobic Cavity with Tyr652 / Phe656 annotation */}
          <ellipse cx="250" cy="225" rx="35" ry="25" fill="#E2DAC9" fillOpacity="0.5" stroke="#8B7355" strokeWidth="1" strokeDasharray="3 2" />
          <text x="250" y="222" textAnchor="middle" fill="#1A432D" fontSize="10" fontFamily="var(--font-serif)" fontWeight="bold">
            Central Cavity
          </text>
          <text x="250" y="236" textAnchor="middle" fill="#8B7355" fontSize="9" fontFamily="var(--font-mono)">
            Tyr652 · Phe656
          </text>
        </svg>
      </div>
      <figcaption className="mt-2.5 flex items-baseline justify-between border-t border-[#E5DFD2] pt-2 text-xs">
        <span className="font-serif italic text-[#303832]">
          {figureNumber} &mdash; {caption}
        </span>
        <span className="font-mono text-[10px] text-[#788075]">PDB: 5VA1</span>
      </figcaption>
    </figure>
  );
};

export const ElectrophysiologyPolygraphPlate: React.FC<ArtworkProps> = ({
  className = '',
  caption = 'Plate III: Real-Time Ventricular Repolarization & Electrocardiographic Tracing',
  figureNumber = 'Fig. 03',
}) => {
  return (
    <figure className={`border border-[#DCD5C7] bg-[#FAF8F3] p-4 shadow-xs ${className}`}>
      <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#E5DFD2] bg-[#F6F2E9] p-2">
        <svg
          viewBox="0 0 500 375"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Electrocardiographic polygraph recording"
        >
          {/* Calibrated physiological pink/tan millimeter grid */}
          <defs>
            <pattern id="cardioSmallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#E9DEC9" strokeWidth="0.5" />
            </pattern>
            <pattern id="cardioMajorGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <rect width="50" height="50" fill="url(#cardioSmallGrid)" />
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#DAC9B0" strokeWidth="1" />
            </pattern>
          </defs>

          <rect width="500" height="375" fill="url(#cardioMajorGrid)" />

          {/* Classical paper calibration marks */}
          <g stroke="#8B7355" strokeWidth="1.2">
            <polyline points="30,220 30,170 50,170 50,220" fill="none" />
          </g>
          <text x="35" y="240" fill="#756E5E" fontSize="8" fontFamily="var(--font-mono)">
            10 mm/mV · 25 mm/s
          </text>

          {/* Lead II ECG Tracing in Deep Forest Ink */}
          <path
            d="
              M 60,220 
              L 100,220 
              C 105,220 110,210 115,200 
              C 120,190 125,190 130,200 
              C 135,210 140,220 145,220 
              L 165,220 
              L 170,228 
              L 180,105 
              L 190,248 
              L 195,220 
              L 230,220 
              C 250,220 270,185 295,185 
              C 320,185 340,220 360,220 
              L 400,220 
              C 405,220 410,210 415,200 
              C 420,190 425,190 430,200 
              C 435,210 440,220 445,220 
              L 460,220
            "
            fill="none"
            stroke="#163925"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Prolonged QT overlay (hERG blockade simulation comparison) */}
          <path
            d="
              M 230,220 
              C 255,220 280,205 315,195 
              C 350,185 385,210 410,220
            "
            fill="none"
            stroke="#9E472A"
            strokeWidth="1.75"
            strokeDasharray="4 3"
          />

          {/* Wave Annotations */}
          <text x="122" y="180" fill="#163925" fontSize="11" fontFamily="var(--font-serif)" fontWeight="bold">P</text>
          <text x="160" y="242" fill="#788075" fontSize="9" fontFamily="var(--font-mono)">Q</text>
          <text x="176" y="95" fill="#163925" fontSize="12" fontFamily="var(--font-serif)" fontWeight="bold">R</text>
          <text x="194" y="260" fill="#788075" fontSize="9" fontFamily="var(--font-mono)">S</text>
          <text x="290" y="172" fill="#163925" fontSize="12" fontFamily="var(--font-serif)" fontWeight="bold">T</text>
          <text x="360" y="180" fill="#9E472A" fontSize="9" fontFamily="var(--font-serif)" fontStyle="italic">T (Prolonged)</text>

          {/* QT Interval Measurement Bracket */}
          <line x1="168" y1="280" x2="360" y2="280" stroke="#8B7355" strokeWidth="1" />
          <line x1="168" y1="275" x2="168" y2="285" stroke="#8B7355" strokeWidth="1" />
          <line x1="360" y1="275" x2="360" y2="285" stroke="#8B7355" strokeWidth="1" />
          <text x="264" y="295" textAnchor="middle" fill="#8B7355" fontSize="10" fontFamily="var(--font-mono)">
            QT = 412 ms (Bazett QTc = 428 ms)
          </text>
        </svg>
      </div>
      <figcaption className="mt-2.5 flex items-baseline justify-between border-t border-[#E5DFD2] pt-2 text-xs">
        <span className="font-serif italic text-[#303832]">
          {figureNumber} &mdash; {caption}
        </span>
        <span className="font-mono text-[10px] text-[#788075]">Lead II Lead</span>
      </figcaption>
    </figure>
  );
};

export const CloudVaultArchivePlate: React.FC<ArtworkProps> = ({
  className = '',
  caption = 'Plate IV: Distributed Cloud Compute & AWS S3 Cold-Tier Archival Repository',
  figureNumber = 'Fig. 04',
}) => {
  return (
    <figure className={`border border-[#DCD5C7] bg-[#FAF8F3] p-4 shadow-xs ${className}`}>
      <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#E5DFD2] bg-[#F4EFE5] p-2">
        <svg
          viewBox="0 0 500 375"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Cloud and archival repository architectural diagram"
        >
          {/* Classical vaulted arch frame in background */}
          <path
            d="M 60,340 L 60,150 C 60,70 140,40 250,40 C 360,40 440,70 440,150 L 440,340"
            fill="none"
            stroke="#D0C6B2"
            strokeWidth="1.5"
          />
          <path
            d="M 80,340 L 80,160 C 80,90 150,60 250,60 C 350,60 420,90 420,160 L 420,340"
            fill="none"
            stroke="#E0D7C4"
            strokeWidth="1"
            strokeDasharray="4 2"
          />

          {/* Central AWS S3 Bucket Vault Iconography */}
          <g>
            {/* Cylindrical S3 Bucket Stack */}
            {/* Base cylinder 3 */}
            <path
              d="M 170,260 C 170,250 250,240 250,240 C 250,240 330,250 330,260 L 330,285 C 330,295 250,305 250,305 C 250,305 170,295 170,285 Z"
              fill="#224E38"
              stroke="#133022"
              strokeWidth="2"
            />
            {/* Cylinder 2 */}
            <path
              d="M 170,210 C 170,200 250,190 250,190 C 250,190 330,200 330,210 L 330,240 C 330,250 250,260 250,260 C 250,260 170,250 170,240 Z"
              fill="#2A5C43"
              stroke="#133022"
              strokeWidth="2"
            />
            {/* Top cylinder 1 */}
            <path
              d="M 170,160 C 170,150 250,140 250,140 C 250,140 330,150 330,160 L 330,190 C 330,200 250,210 250,210 C 250,210 170,200 170,190 Z"
              fill="#346F51"
              stroke="#133022"
              strokeWidth="2"
            />
            {/* Top lid ellipse */}
            <ellipse cx="250" cy="150" rx="80" ry="16" fill="#428160" stroke="#133022" strokeWidth="2" />

            {/* Brass lock / Seal */}
            <circle cx="250" cy="150" r="10" fill="#937648" stroke="#F6F2E9" strokeWidth="1.5" />
          </g>

          {/* Telemetry data streams to cluster nodes */}
          <g stroke="#8B7355" strokeWidth="1.2" strokeDasharray="3 3">
            <line x1="120" y1="120" x2="190" y2="150" />
            <line x1="380" y1="120" x2="310" y2="150" />
            <line x1="100" y1="250" x2="170" y2="240" />
            <line x1="400" y1="250" x2="330" y2="240" />
          </g>

          {/* Compute node plates */}
          <rect x="70" y="100" width="80" height="32" fill="#F8F6F0" stroke="#1A432D" strokeWidth="1.5" />
          <text x="110" y="120" textAnchor="middle" fill="#1A432D" fontSize="9" fontFamily="var(--font-mono)">c6i.16xlarge</text>

          <rect x="350" y="100" width="80" height="32" fill="#F8F6F0" stroke="#1A432D" strokeWidth="1.5" />
          <text x="390" y="120" textAnchor="middle" fill="#1A432D" fontSize="9" fontFamily="var(--font-mono)">g5.4xlarge</text>

          <rect x="50" y="235" width="90" height="32" fill="#F8F6F0" stroke="#8B7355" strokeWidth="1.5" />
          <text x="95" y="255" textAnchor="middle" fill="#8B7355" fontSize="9" fontFamily="var(--font-mono)">s3://trajectories</text>

          <rect x="360" y="235" width="90" height="32" fill="#F8F6F0" stroke="#8B7355" strokeWidth="1.5" />
          <text x="405" y="255" textAnchor="middle" fill="#8B7355" fontSize="9" fontFamily="var(--font-mono)">Glacier Deep</text>

          {/* Central Title Inscription */}
          <text x="250" y="325" textAnchor="middle" fill="#1A432D" fontSize="12" fontFamily="var(--font-serif)" fontWeight="bold">
            s3://batch12-cloud-archive
          </text>
          <text x="250" y="340" textAnchor="middle" fill="#756E5E" fontSize="9" fontFamily="var(--font-mono)">
            Region: ap-south-1 · SSE-S3 256-bit AES
          </text>
        </svg>
      </div>
      <figcaption className="mt-2.5 flex items-baseline justify-between border-t border-[#E5DFD2] pt-2 text-xs">
        <span className="font-serif italic text-[#303832]">
          {figureNumber} &mdash; {caption}
        </span>
        <span className="font-mono text-[10px] text-[#788075]">AWS S3 Ready</span>
      </figcaption>
    </figure>
  );
};
