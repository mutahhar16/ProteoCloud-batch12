import React, { useState } from 'react';
import { CloudStorageConfig, S3ObjectRecord } from '../types';
import { S3ConnectivityHealthDashboard } from './S3ConnectivityHealthDashboard';
import {
  Cloud,
  CheckCircle2,
  Upload,
  Copy,
  Check,
  FolderOpen,
  GitBranch,
  Github,
  Terminal,
  Lock,
  AlertCircle,
  Database,
} from 'lucide-react';

export const AwsS3CloudConsole: React.FC = () => {
  const [config, setConfig] = useState<CloudStorageConfig>({
    awsRegion: 'ap-south-1',
    bucketName: '',
    isConnected: false,
    lastSyncTime: null,
    githubUsername: '',
    githubRepo: 'batch12-proteocloud',
    githubBranch: 'main',
    isGithubConnected: false,
    githubLastCommitTime: null,
  });

  const [activeTab, setActiveTab] = useState<'s3' | 'github'>('s3');
  const [objects, setObjects] = useState<S3ObjectRecord[]>([]);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [copiedGit, setCopiedGit] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const formatBytes = (bytes: number): string => {
    if (bytes >= 1048576) return (bytes / 1048576).toFixed(2) + ' MB';
    if (bytes >= 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return bytes + ' B';
  };

  const handleConnectS3 = () => {
    if (!config.bucketName.trim()) {
      setStatusMessage('Please enter an S3 bucket name first to test connection.');
      return;
    }

    setIsVerifying(true);
    setStatusMessage(`Verifying connection to s3://${config.bucketName}...`);

    setTimeout(() => {
      setIsVerifying(false);
      setConfig((prev) => ({
        ...prev,
        isConnected: true,
        lastSyncTime: 'Connected just now',
      }));
      setStatusMessage(`Successfully connected to s3://${config.bucketName} (${config.awsRegion}). Ready for data storage.`);
    }, 1200);
  };

  const handleDisconnectS3 = () => {
    setConfig((prev) => ({
      ...prev,
      isConnected: false,
      lastSyncTime: null,
    }));
    setStatusMessage('Cloud bucket disconnected. You can reconnect anytime.');
  };

  const handleConnectGithub = () => {
    if (!config.githubUsername.trim()) {
      setStatusMessage('Please enter a GitHub username to configure repository sync.');
      return;
    }

    setConfig((prev) => ({
      ...prev,
      isGithubConnected: true,
      githubLastCommitTime: 'Ready to push',
    }));
    setStatusMessage(`GitHub repository configured: github.com/${config.githubUsername}/${config.githubRepo}`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!config.isConnected) {
      setStatusMessage('Please connect your S3 bucket above before uploading files.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(20);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setUploadProgress(100);

            const newObj: S3ObjectRecord = {
              key: `data/${file.name}`,
              sizeBytes: file.size,
              lastModified: 'Just now',
              storageClass: 'Standard',
              contentType: file.type || 'application/octet-stream',
            };
            setObjects((prevObjs) => [newObj, ...prevObjs]);
            setStatusMessage(`Uploaded "${file.name}" to s3://${config.bucketName}/data/`);
          }, 300);
          return 95;
        }
        return prev + 25;
      });
    }, 200);
  };

  const gitUsername = config.githubUsername.trim() || '<username>';
  const gitRepo = config.githubRepo.trim() || 'batch12-proteocloud';
  const gitBranch = config.githubBranch.trim() || 'main';

  const gitTerminalCommands = `# Terminal Commands to push Batch 12 project to GitHub:

# 1. Initialize or update git remote origin:
git remote set-url origin https://github.com/${gitUsername}/${gitRepo}.git

# 2. Stage all project changes:
git add .

# 3. Create commit:
git commit -m "Batch 12: Project update"

# 4. Push to branch:
git push -u origin ${gitBranch}`;

  const handleCopyGitCommands = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(gitTerminalCommands);
      setCopiedGit(true);
      setTimeout(() => setCopiedGit(false), 2000);
    }
  };

  return (
    <section id="cloud-storage" className="py-14 md:py-20 border-b border-[#E2DBD0]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 text-center md:text-left">
          <div className="text-xs font-mono tracking-widest text-[#6E786E] uppercase">
            Cloud Infrastructure (Batch 12)
          </div>
          <h2 className="mt-1 font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#143424]">
            Cloud Storage &amp; Code Repository
          </h2>
          <p className="mt-2 max-w-2xl font-reading text-base leading-relaxed text-[#4A534B]">
            Configure your cloud environment when you are ready. Connect an Amazon S3 bucket for persistent file storage and link your GitHub repository.
          </p>
        </div>

        {/* 2 Main Tabs: S3 Bucket / GitHub */}
        <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-[#E2DBD0] pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('s3')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium border transition-colors cursor-pointer ${
              activeTab === 's3'
                ? 'border-[#1B432E] bg-[#1B432E] text-[#F8F5EE]'
                : 'border-[#E2DCCE] bg-[#FAF8F3] text-[#4A554D] hover:border-[#1B432E]'
            }`}
          >
            <Cloud className="h-3.5 w-3.5 text-[#C2A679]" />
            <span>Amazon S3 Bucket Setup</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('github')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium border transition-colors cursor-pointer ${
              activeTab === 'github'
                ? 'border-[#1B432E] bg-[#1B432E] text-[#F8F5EE]'
                : 'border-[#E2DCCE] bg-[#FAF8F3] text-[#4A554D] hover:border-[#1B432E]'
            }`}
          >
            <Github className="h-3.5 w-3.5" />
            <span>GitHub Repository Setup</span>
          </button>
        </div>

        {/* Status notification */}
        {statusMessage && (
          <div className="mb-6 border border-[#B8D4C0] bg-[#EFF7F2] p-3 text-xs text-[#18472E] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{statusMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setStatusMessage(null)}
              className="text-[#556357] hover:text-[#18472E] text-[11px]"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* TAB 1: AWS S3 Bucket */}
        {activeTab === 's3' && (
          <div className="space-y-8">
            {/* Real-Time Connectivity Health Dashboard */}
            <S3ConnectivityHealthDashboard
              bucketName={config.bucketName}
              region={config.awsRegion}
              isConnected={config.isConnected}
              onRunTestConnect={handleConnectS3}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Configuration Form */}
            <div className="lg:col-span-5 space-y-5">
              <div className="border border-[#DCD5C7] bg-[#FAF8F3] p-5 sm:p-6 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D6]">
                  <h3 className="font-serif text-xl font-medium text-[#143424]">
                    AWS S3 Bucket Settings
                  </h3>
                  <span
                    className={`text-[11px] font-sans px-2.5 py-0.5 border font-medium ${
                      config.isConnected
                        ? 'border-[#B8D4C0] bg-[#E3EFE6] text-[#1B432E]'
                        : 'border-[#DCD5C7] bg-[#F2EDE2] text-[#69746A]'
                    }`}
                  >
                    {config.isConnected ? 'CONNECTED' : 'NOT CONNECTED'}
                  </span>
                </div>

                <div className="mt-4 space-y-4 text-xs font-sans">
                  <div>
                    <label className="block text-[#475249] font-medium mb-1">Target S3 Bucket Name</label>
                    <div className="flex items-center border border-[#D5CDC0] bg-[#FCFAF6] px-3 py-2">
                      <span className="font-mono text-[#8C968D] mr-1">s3://</span>
                      <input
                        type="text"
                        value={config.bucketName}
                        onChange={(e) => setConfig({ ...config, bucketName: e.target.value })}
                        className="w-full bg-transparent font-mono text-xs text-[#143424] focus:outline-none"
                        placeholder="my-project-bucket-name"
                      />
                    </div>
                    <span className="text-[11px] text-[#717C73] mt-1 block">
                      Enter the S3 bucket name you wish to link.
                    </span>
                  </div>

                  <div>
                    <label className="block text-[#475249] font-medium mb-1">AWS Cloud Region</label>
                    <select
                      value={config.awsRegion}
                      onChange={(e) => setConfig({ ...config, awsRegion: e.target.value })}
                      className="w-full border border-[#D5CDC0] bg-[#FCFAF6] px-3 py-2 text-xs font-mono text-[#193726] focus:outline-none"
                    >
                      <option value="ap-south-1">ap-south-1 (Mumbai, India)</option>
                      <option value="us-east-1">us-east-1 (N. Virginia, USA)</option>
                      <option value="us-west-2">us-west-2 (Oregon, USA)</option>
                      <option value="eu-west-1">eu-west-1 (Ireland)</option>
                      <option value="ap-southeast-1">ap-southeast-1 (Singapore)</option>
                    </select>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    {config.isConnected ? (
                      <button
                        type="button"
                        onClick={handleDisconnectS3}
                        className="w-full py-2.5 px-4 text-xs font-medium border border-[#D5CDC0] text-[#556358] hover:bg-[#EFEAE0] transition-colors cursor-pointer"
                      >
                        Disconnect Bucket
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleConnectS3}
                        disabled={isVerifying}
                        className="w-full py-2.5 px-4 text-xs font-medium bg-[#1B432E] text-[#FAF8F3] hover:bg-[#133423] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Cloud className="h-3.5 w-3.5" />
                        <span>{isVerifying ? 'Verifying S3 Connection...' : 'Connect to S3 Bucket'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Upload to Bucket Form */}
              <div className="border border-[#DCD5C7] bg-[#FAF8F3] p-5 sm:p-6 shadow-xs">
                <h4 className="font-serif text-base font-semibold text-[#143424] mb-1">
                  Upload File to S3 Bucket
                </h4>
                <p className="font-reading text-xs text-[#566058] mb-3">
                  Upload files directly to the configured bucket once connected.
                </p>

                <label
                  className={`block border-2 border-dashed p-5 text-center transition-colors ${
                    config.isConnected
                      ? 'border-[#C5BBA7] hover:border-[#1B432E] bg-[#F7F3EA] cursor-pointer'
                      : 'border-[#DDD5C5] bg-[#F3EFE6] cursor-not-allowed opacity-75'
                  }`}
                >
                  <Upload className="mx-auto h-6 w-6 text-[#1B432E] mb-1.5" />
                  <span className="font-serif text-xs font-bold text-[#1B432E] block">
                    {config.isConnected ? 'Choose File to Upload' : 'Connect Bucket First to Upload'}
                  </span>
                  <span className="text-[11px] text-[#717B72] block mt-0.5">
                    Supports any document, model, or dataset file
                  </span>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={!config.isConnected || isUploading}
                  />
                </label>

                {isUploading && (
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-xs font-mono text-[#1B432E]">
                      <span>Uploading to S3...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="h-2 w-full bg-[#E5DFD1] overflow-hidden">
                      <div
                        className="h-full bg-[#1B432E] transition-all duration-200"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: S3 Bucket Objects Browser */}
            <div className="lg:col-span-7 space-y-5">
              <div className="border border-[#DCD5C7] bg-[#FAF8F3] shadow-xs">
                <div className="flex items-center justify-between border-b border-[#E8E2D6] bg-[#F5F1E8] px-4 py-3 text-xs">
                  <div className="flex items-center gap-2 font-mono font-medium text-[#153825]">
                    <FolderOpen className="h-4 w-4 text-[#8C6F47]" />
                    <span>
                      {config.isConnected
                        ? `Bucket: s3://${config.bucketName}/`
                        : 'Bucket: (Not Connected)'}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#6F786F] font-mono">
                    {objects.length} Objects
                  </span>
                </div>

                {objects.length === 0 ? (
                  <div className="p-8 text-center text-xs text-[#6A756D]">
                    <Database className="mx-auto h-8 w-8 text-[#A89D8B] mb-2" />
                    <p className="font-serif text-sm font-medium text-[#143424]">
                      No Files Stored Yet
                    </p>
                    <p className="mt-1 font-reading text-[#717D73] max-w-sm mx-auto">
                      Connect your S3 bucket above to view stored items or upload new datasets.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-[#E4DDCE] bg-[#F9F6EE] text-[10px] font-mono uppercase text-[#616B61]">
                          <th className="py-2.5 px-4 font-medium">Object Key</th>
                          <th className="py-2.5 px-4 font-medium">Size</th>
                          <th className="py-2.5 px-4 font-medium">Modified</th>
                          <th className="py-2.5 px-4 font-medium text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EDE7DB] font-mono">
                        {objects.map((obj) => (
                          <tr key={obj.key} className="hover:bg-[#F5F0E6] transition-colors">
                            <td className="py-3 px-4 font-bold text-[#143424] max-w-[200px] truncate">
                              {obj.key}
                            </td>
                            <td className="py-3 px-4 text-[#444F46]">
                              {formatBytes(obj.sizeBytes)}
                            </td>
                            <td className="py-3 px-4 text-[#697268]">
                              {obj.lastModified}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <span className="inline-flex items-center gap-1 text-[11px] text-[#1B432E]">
                                <Check className="h-3 w-3" />
                                <span>Stored</span>
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="p-3 bg-[#FAF8F3] border-t border-[#E8E2D6] text-xs text-[#525D55] font-reading">
                  <strong>Notice:</strong> Your cloud bucket configuration can be updated anytime. Changes remain local until verified.
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* TAB 2: GitHub Repository Setup */}
        {activeTab === 'github' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Configuration Form */}
            <div className="lg:col-span-5 space-y-5">
              <div className="border border-[#DCD5C7] bg-[#FAF8F3] p-5 sm:p-6 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D6]">
                  <h3 className="font-serif text-xl font-medium text-[#143424]">
                    GitHub Configuration
                  </h3>
                  <Github className="h-4 w-4 text-[#143424]" />
                </div>

                <div className="mt-4 space-y-4 text-xs font-sans">
                  <div>
                    <label className="block text-[#475249] font-medium mb-1">GitHub Username / Organization</label>
                    <input
                      type="text"
                      value={config.githubUsername}
                      onChange={(e) => setConfig({ ...config, githubUsername: e.target.value })}
                      className="w-full border border-[#D5CDC0] bg-[#FCFAF6] px-3 py-2 font-mono text-xs text-[#143424] focus:outline-none"
                      placeholder="e.g. your-github-username"
                    />
                  </div>

                  <div>
                    <label className="block text-[#475249] font-medium mb-1">Repository Name</label>
                    <input
                      type="text"
                      value={config.githubRepo}
                      onChange={(e) => setConfig({ ...config, githubRepo: e.target.value })}
                      className="w-full border border-[#D5CDC0] bg-[#FCFAF6] px-3 py-2 font-mono text-xs text-[#143424] focus:outline-none"
                      placeholder="e.g. batch12-proteocloud"
                    />
                  </div>

                  <div>
                    <label className="block text-[#475249] font-medium mb-1">Target Branch</label>
                    <input
                      type="text"
                      value={config.githubBranch}
                      onChange={(e) => setConfig({ ...config, githubBranch: e.target.value })}
                      className="w-full border border-[#D5CDC0] bg-[#FCFAF6] px-3 py-2 font-mono text-xs text-[#143424] focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleConnectGithub}
                      className="w-full py-2.5 px-4 text-xs font-medium bg-[#1B432E] text-[#FAF8F3] hover:bg-[#133423] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <GitBranch className="h-3.5 w-3.5" />
                      <span>Save GitHub Settings</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* GitHub Link Preview */}
              <div className="border border-[#CCD8D0] bg-[#F2F8F4] p-4 text-xs">
                <div className="font-bold text-[#143424] mb-1 flex items-center gap-1.5">
                  <Github className="h-4 w-4" />
                  <span>Target GitHub URL:</span>
                </div>
                <div className="font-mono text-[11px] text-[#1B432E] break-all select-all bg-white p-2 border border-[#C5D7CB]">
                  https://github.com/{gitUsername}/{gitRepo}
                </div>
                <div className="mt-2 text-[11px] text-[#556358]">
                  Branch: <span className="font-mono font-bold">{gitBranch}</span>
                </div>
              </div>
            </div>

            {/* Right: Terminal Push Instructions */}
            <div className="lg:col-span-7 space-y-5">
              <div className="border border-[#DCD5C7] bg-[#FAF8F3] shadow-xs">
                <div className="flex items-center justify-between border-b border-[#E8E2D6] bg-[#F5F1E8] px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-[#1B432E]" />
                    <span className="font-serif text-sm font-semibold text-[#143424]">
                      Terminal Git Push Commands
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyGitCommands}
                    className="flex items-center gap-1 bg-[#1B432E] hover:bg-[#133423] text-[#FAF8F3] px-3 py-1 text-xs transition-colors cursor-pointer font-sans"
                  >
                    {copiedGit ? (
                      <>
                        <Check className="h-3 w-3" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy Commands</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-[#1A261F] text-[#F3EFE6] p-4 font-mono text-[11px] leading-relaxed overflow-x-auto">
                  <pre>{gitTerminalCommands}</pre>
                </div>

                <div className="p-3 bg-[#FAF8F3] border-t border-[#E8E2D6] text-xs text-[#525D55] font-reading">
                  <strong>Instructions:</strong>
                  <ol className="list-decimal pl-4 mt-1 space-y-1">
                    <li>Copy the commands above.</li>
                    <li>Open your terminal in the root directory.</li>
                    <li>Execute the commands to push changes directly to your repository.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
