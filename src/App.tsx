/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navigation } from './components/Navigation';
import { EditorialHero } from './components/EditorialHero';
import { ProteinBiophysicsCatalog } from './components/ProteinBiophysicsCatalog';
import { CardiacECGEngine } from './components/CardiacECGEngine';
import { CloudClusterHPC } from './components/CloudClusterHPC';
import { AwsS3CloudConsole } from './components/AwsS3CloudConsole';
import { HighContrastFooter } from './components/HighContrastFooter';

export default function App() {
  const handleNavigateToCloud = () => {
    const el = document.getElementById('cloud-storage');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectEcgProtein = () => {
    const el = document.getElementById('electrophysiology');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#1E241E] flex flex-col selection:bg-[#1B432E] selection:text-[#FAF8F3]">
      {/* Top Bar Navigation */}
      <Navigation onNavigateToCloud={handleNavigateToCloud} />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* Editorial Hero Section */}
        <EditorialHero onNavigateToCloud={handleNavigateToCloud} />

        {/* 3D Molecular Structures Viewer */}
        <ProteinBiophysicsCatalog onSelectEcgProtein={handleSelectEcgProtein} />

        {/* Real-Time Heart Rhythm Simulator */}
        <CardiacECGEngine />

        {/* Automated Cloud Processing Tasks */}
        <CloudClusterHPC onNavigateToS3={handleNavigateToCloud} />

        {/* Cloud Storage & Repository Configuration (Batch 12) */}
        <AwsS3CloudConsole />
      </main>

      {/* Subtle, High-Contrast Footer */}
      <HighContrastFooter onNavigateToCloud={handleNavigateToCloud} />
    </div>
  );
}
