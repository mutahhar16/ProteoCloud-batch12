import React from 'react';
import { Cloud } from 'lucide-react';

interface NavigationProps {
  onNavigateToCloud: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigateToCloud }) => {
  return (
    <header className="sticky top-0 z-40 border-b border-[#E2DBD0] bg-[#FAF8F3]/95 backdrop-blur-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand wordmark in serif typeface */}
        <a
          href="#"
          className="flex items-center gap-2 font-serif text-xl sm:text-2xl font-medium tracking-tight text-[#143424] whitespace-nowrap shrink-0 hover:text-[#0D2418] transition-colors"
        >
          <span>Batch 12</span>
          <span className="text-[#8C6F47] text-base font-sans">/</span>
          <span className="text-lg sm:text-xl">ProteoCloud</span>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-[#4D5750]">
          <a
            href="#biophysics"
            className="whitespace-nowrap shrink-0 hover:text-[#143424] hover:underline underline-offset-4 transition-colors"
          >
            3D Molecules
          </a>
          <a
            href="#electrophysiology"
            className="whitespace-nowrap shrink-0 hover:text-[#143424] hover:underline underline-offset-4 transition-colors"
          >
            Heart Rhythm
          </a>
          <a
            href="#cluster"
            className="whitespace-nowrap shrink-0 hover:text-[#143424] hover:underline underline-offset-4 transition-colors"
          >
            Cloud Tasks
          </a>
          <a
            href="#cloud-storage"
            onClick={(e) => {
              e.preventDefault();
              onNavigateToCloud();
            }}
            className="whitespace-nowrap shrink-0 text-[#143424] font-semibold hover:underline underline-offset-4 transition-colors"
          >
            Cloud Storage
          </a>
        </nav>

        {/* Zone 3: 1 primary action button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onNavigateToCloud}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#F8F5EE] bg-[#1B432E] hover:bg-[#133423] transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
          >
            <Cloud className="h-3.5 w-3.5" />
            <span>Connect to Cloud</span>
          </button>
        </div>
      </div>
    </header>
  );
};
