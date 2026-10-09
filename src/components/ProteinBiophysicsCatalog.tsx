import React, { useState } from 'react';
import { PROTEIN_CATALOG } from '../data/proteinsData';
import { ProteinViewerCanvas } from './ProteinViewerCanvas';
import { Activity, Heart, Scissors, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';

interface ProteinBiophysicsCatalogProps {
  onSelectEcgProtein?: () => void;
}

export const ProteinBiophysicsCatalog: React.FC<ProteinBiophysicsCatalogProps> = ({ onSelectEcgProtein }) => {
  const [selectedProteinId, setSelectedProteinId] = useState<string>(PROTEIN_CATALOG[0].id);

  const currentProtein = PROTEIN_CATALOG.find((p) => p.id === selectedProteinId) || PROTEIN_CATALOG[0];

  const getProteinIcon = (id: string) => {
    switch (id) {
      case 'hemoglobin':
        return <Activity className="h-4 w-4" />;
      case 'herg-potassium-channel':
        return <Heart className="h-4 w-4" />;
      case 'crispr-cas9':
        return <Scissors className="h-4 w-4" />;
      default:
        return <ShieldAlert className="h-4 w-4" />;
    }
  };

  return (
    <section id="biophysics" className="py-14 md:py-20 border-b border-[#E2DBD0]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 text-center md:text-left">
          <div className="text-xs font-mono tracking-widest text-[#6E786E] uppercase">
            Interactive 3D Molecular Gallery
          </div>
          <h2 className="mt-1 font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#143424]">
            Explore How Proteins Work
          </h2>
          <p className="mt-2 max-w-2xl font-reading text-base leading-relaxed text-[#4A534B]">
            Pick a molecule below to see its 3D folded shape. Every protein in living cells acts like a tiny machine with a specific job.
          </p>
        </div>

        {/* Simple Protein Selector Tabs */}
        <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PROTEIN_CATALOG.map((protein) => {
            const isActive = protein.id === selectedProteinId;
            return (
              <button
                key={protein.id}
                onClick={() => setSelectedProteinId(protein.id)}
                type="button"
                className={`p-3 text-left border transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#1B432E] bg-[#1B432E] text-[#F8F5EE] shadow-sm'
                    : 'border-[#E2DCCE] bg-[#FAF8F3] text-[#344038] hover:border-[#1B432E]'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={isActive ? 'text-[#C2A679]' : 'text-[#1B432E]'}>
                    {getProteinIcon(protein.id)}
                  </span>
                  <span className="font-serif font-bold text-sm truncate">{protein.name}</span>
                </div>
                <div className={`text-[11px] truncate font-sans ${isActive ? 'text-[#D0DDD4]' : 'text-[#697268]'}`}>
                  {protein.simpleTitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* 2-Column Layout: 3D Canvas & Simple Explanation Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 3D Viewer */}
          <div className="lg:col-span-7 space-y-4">
            <ProteinViewerCanvas protein={currentProtein} />

            {/* Quick action for Heart protein */}
            {currentProtein.id === 'herg-potassium-channel' && onSelectEcgProtein && (
              <div className="border border-[#CCD8D0] bg-[#EEF5F1] p-3 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#18472E]">
                  <Heart className="h-4 w-4 shrink-0 text-[#9B4522]" />
                  <span>Want to see how medicines affect this heart protein?</span>
                </div>
                <button
                  type="button"
                  onClick={onSelectEcgProtein}
                  className="font-serif font-bold text-[#143424] hover:underline cursor-pointer"
                >
                  Test Heart Rhythm &rarr;
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Simple, Clear Explanation Cards */}
          <div className="lg:col-span-5 space-y-5">
            {/* Plain English Summary */}
            <div className="border border-[#DCD5C7] bg-[#FAF8F3] p-5 sm:p-6 shadow-xs">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#737E74]">
                Molecule Overview
              </div>
              <h3 className="mt-1 font-serif text-2xl font-medium text-[#143424]">
                {currentProtein.name}
              </h3>
              <div className="mt-1 text-xs font-serif italic text-[#8C6F47]">
                &ldquo;{currentProtein.simpleTitle}&rdquo;
              </div>

              <div className="mt-4 pt-3 border-t border-[#E8E2D6] space-y-3 text-xs">
                <div>
                  <span className="font-bold text-[#143424] block">What it does:</span>
                  <p className="font-reading text-[#434D46] mt-0.5 leading-relaxed">
                    {currentProtein.whatItDoes}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-[#143424] block">Where it is found:</span>
                  <p className="font-reading text-[#434D46] mt-0.5">
                    {currentProtein.foundIn}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-[#143424] block">Why it matters:</span>
                  <p className="font-reading text-[#434D46] mt-0.5 leading-relaxed">
                    {currentProtein.whyItMatters}
                  </p>
                </div>
              </div>
            </div>

            {/* Simple Parts of this Machine */}
            <div className="border border-[#DCD5C7] bg-[#FAF8F3] p-5 sm:p-6 shadow-xs">
              <h4 className="font-serif text-base font-semibold text-[#143424] mb-3 pb-2 border-b border-[#E8E2D6] flex items-center justify-between">
                <span>The 3 Main Parts of this Machine</span>
                <Sparkles className="h-4 w-4 text-[#8C6F47]" />
              </h4>

              <div className="space-y-3">
                {currentProtein.simpleParts.map((part, idx) => (
                  <div key={idx} className="border-b border-[#EFE8DC] pb-2.5 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#143424]">
                      <span
                        className="h-2 w-2 rounded-full shrink-0"
                        style={{ backgroundColor: part.color }}
                      />
                      <span>{part.name}</span>
                    </div>
                    <p className="mt-0.5 font-reading text-xs text-[#525D55] pl-4">
                      {part.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Fun Fact */}
            <div className="border border-[#DCD5C7] bg-[#F5F0E4] p-4 text-xs">
              <div className="flex items-start gap-2.5">
                <HelpCircle className="h-4 w-4 text-[#8C6F47] shrink-0 mt-0.5" />
                <div className="text-[#4E564E] leading-relaxed">
                  <strong className="text-[#143424]">Simple Takeaway:</strong> Without these 3D folded shapes, our bodies couldn&apos;t breathe, heartbeat, or digest food. Cloud computing helps us study these shapes so scientists can create safer medicines.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
