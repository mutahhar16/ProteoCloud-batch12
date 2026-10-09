import React, { useState } from 'react';
import { CloudJob } from '../types';
import { CheckCircle2, RefreshCw, HardDrive } from 'lucide-react';

const INITIAL_JOBS: CloudJob[] = [
  {
    id: 'task-101',
    title: 'Heart Medicine Safety Calculation',
    simpleDescription: 'Calculates how a medicine affects the hERG channel',
    targetProtein: 'Heart Rhythm Gate (hERG)',
    status: 'RUNNING',
    progressPct: 75,
    timeSpent: '12 mins',
  },
  {
    id: 'task-102',
    title: 'Oxygen Delivery Simulation',
    simpleDescription: 'Models how hemoglobin squeezes and delivers oxygen',
    targetProtein: 'Human Hemoglobin',
    status: 'RUNNING',
    progressPct: 45,
    timeSpent: '08 mins',
  },
  {
    id: 'task-103',
    title: 'DNA Scissors Precision Test',
    simpleDescription: 'Simulates cutting a target gene with CRISPR-Cas9',
    targetProtein: 'CRISPR-Cas9',
    status: 'COMPLETED',
    progressPct: 100,
    timeSpent: '24 mins',
  },
  {
    id: 'task-104',
    title: 'Viral Spike Antibody Verification',
    simpleDescription: 'Tests antibody binding across the spike protein',
    targetProtein: 'Viral Spike Protein',
    status: 'QUEUED',
    progressPct: 0,
    timeSpent: 'Queued',
  },
];

interface CloudClusterHPCProps {
  onNavigateToS3?: () => void;
}

export const CloudClusterHPC: React.FC<CloudClusterHPCProps> = ({ onNavigateToS3 }) => {
  const [jobs, setJobs] = useState<CloudJob[]>(INITIAL_JOBS);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  const handleStepSimulation = () => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.status === 'RUNNING') {
          const nextPct = Math.min(100, j.progressPct + 20);
          return {
            ...j,
            progressPct: nextPct,
            status: nextPct === 100 ? 'COMPLETED' : 'RUNNING',
          };
        }
        if (j.status === 'QUEUED') {
          return {
            ...j,
            status: 'RUNNING',
            progressPct: 15,
            timeSpent: 'Just started',
          };
        }
        return j;
      })
    );
    setSyncFeedback('Task progressed! Status updated.');
    setTimeout(() => setSyncFeedback(null), 4000);
  };

  return (
    <section id="cluster" className="py-14 md:py-20 border-b border-[#E2DBD0]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center md:text-left">
          <div className="text-xs font-mono tracking-widest text-[#6E786E] uppercase">
            Automated Cloud Processing (Batch 12)
          </div>
          <h2 className="mt-1 font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#143424]">
            Cloud Processing Tasks
          </h2>
          <p className="mt-2 max-w-2xl font-reading text-base leading-relaxed text-[#4A534B]">
            Background tasks computing 3D models and biophysical metrics ready for cloud storage synchronization.
          </p>
        </div>

        {/* Action Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-[#525D55]">
            <span className="font-bold text-[#143424]">Cloud Status:</span> 4 active worker tasks ready for cloud archival.
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleStepSimulation}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-sans border border-[#D5CDC0] bg-[#FAF8F3] text-[#344037] hover:bg-[#EFEAE0] transition-colors cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5 text-[#1B432E]" />
              <span>Step Tasks Forward</span>
            </button>
            {onNavigateToS3 && (
              <button
                type="button"
                onClick={onNavigateToS3}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium bg-[#1B432E] text-[#F8F5EE] hover:bg-[#133423] transition-colors cursor-pointer"
              >
                <HardDrive className="h-3.5 w-3.5" />
                <span>Configure Cloud Storage</span>
              </button>
            )}
          </div>
        </div>

        {syncFeedback && (
          <div className="mb-5 border border-[#B8D4C0] bg-[#EFF7F2] p-3 text-xs text-[#18472E] flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{syncFeedback}</span>
          </div>
        )}

        {/* Tasks Table */}
        <div className="border border-[#DCD5C7] bg-[#FAF8F3] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E4DDCE] bg-[#F4EFE6] text-[11px] font-mono uppercase text-[#616B61]">
                  <th className="py-3 px-4 font-medium">Task Name</th>
                  <th className="py-3 px-4 font-medium">Task Description</th>
                  <th className="py-3 px-4 font-medium">Target Molecule</th>
                  <th className="py-3 px-4 font-medium">Progress</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 font-medium text-right">Destination</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBE5D8] font-sans">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-[#F6F2EA] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#143424]">
                      {job.title}
                    </td>
                    <td className="py-3.5 px-4 text-[#4A554D]">
                      {job.simpleDescription}
                    </td>
                    <td className="py-3.5 px-4 text-[#1B432E] font-medium font-serif">
                      {job.targetProtein}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 bg-[#E5DFD1] overflow-hidden">
                          <div
                            className="h-full bg-[#1B432E] transition-all duration-300"
                            style={{ width: `${job.progressPct}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-[#4A554D] font-bold font-mono">
                          {job.progressPct}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase ${
                          job.status === 'COMPLETED'
                            ? 'bg-[#E3EEE6] text-[#1B432E] border border-[#BFD9C7]'
                            : job.status === 'RUNNING'
                            ? 'bg-[#F2ECE1] text-[#785E34] border border-[#DDD0B8]'
                            : 'bg-[#EBEBEB] text-[#555] border border-[#DDD]'
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#525D55]">
                        <HardDrive className="h-3 w-3 text-[#8C6F47]" />
                        <span>S3 Archive</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
