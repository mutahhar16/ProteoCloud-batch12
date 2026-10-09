import React from 'react';
import { HeroEngravingPlate } from './EditorialArtworks';
import { ArrowRight, HardDrive, Shield, Sparkles } from 'lucide-react';

interface EditorialHeroProps {
  onNavigateToCloud: () => void;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({ onNavigateToCloud }) => {
  return (
    <section className="relative overflow-hidden border-b border-[#E2DBD0] bg-[#F8F6F0] pt-10 pb-14 md:pt-14 md:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Curated Institutional Utility Ribbon */}
        <div className="mb-8 flex flex-wrap items-center justify-between border-b border-[#E5DFD2] pb-3 text-xs font-mono text-[#6A746B]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#143424]">Batch 12 Project</span>
            <span aria-hidden="true">·</span>
            <span>Molecular Biophysics &amp; Distributed Systems</span>
          </div>
          <div className="flex items-center gap-2 text-[#8C6F47]">
            <Shield className="h-3.5 w-3.5" />
            <span>Cloud Storage Configuration Ready</span>
          </div>
        </div>

        {/* 2-Column Grid: Typography & Classical Engraving Plate */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#727D74] uppercase">
              <Sparkles className="h-3.5 w-3.5 text-[#8C6F47]" />
              <span>Interactive 3D Science &amp; Cloud Platform</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#143424] leading-[1.08] text-balance">
              Molecules in 3D, Heart Health &amp; Cloud Storage.
            </h1>

            <p className="font-reading text-base sm:text-lg leading-relaxed text-[#4A534C] max-w-xl">
              An intuitive platform to examine 3D biological molecules, simulate heart electrical rhythms, with simple options to link AWS S3 cloud storage and GitHub.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#biophysics"
                className="px-5 py-2.5 text-xs font-medium bg-[#1B432E] text-[#F9F7F2] hover:bg-[#133423] transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Explore 3D Molecules</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>

              <button
                type="button"
                onClick={onNavigateToCloud}
                className="px-5 py-2.5 text-xs font-medium border border-[#1B432E] text-[#1B432E] hover:bg-[#EFEAE0] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <HardDrive className="h-3.5 w-3.5 text-[#8C6F47]" />
                <span>Configure Cloud Storage</span>
              </button>
            </div>

            {/* Simple Project Pillars */}
            <div className="mt-6 border-t border-[#E8E2D6] pt-4 grid grid-cols-3 gap-3 text-xs text-[#525D55]">
              <div>
                <span className="font-bold text-[#143424] block">1. 3D Molecules</span>
                <span className="text-[11px]">Hemoglobin, Heart Gates</span>
              </div>
              <div>
                <span className="font-bold text-[#143424] block">2. Live Heart ECG</span>
                <span className="text-[11px]">Test medicine effect</span>
              </div>
              <div>
                <span className="font-bold text-[#143424] block">3. Cloud Storage</span>
                <span className="text-[11px]">AWS S3 Ready</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Plate */}
          <div className="lg:col-span-6">
            <HeroEngravingPlate
              caption="Plate I: The Architecture of Life & Cloud Storage (Batch 12)"
              figureNumber="Fig. 01"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
