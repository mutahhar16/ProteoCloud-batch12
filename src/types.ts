export interface ProteinStructure {
  id: string;
  pdbId: string;
  name: string;
  simpleTitle: string;
  whatItDoes: string;
  foundIn: string;
  weightSimple: string;
  partsCount: number;
  whyItMatters: string;
  simpleParts: Array<{
    name: string;
    role: string;
    color: string;
  }>;
  sequencePreview: string;
}

export interface ECGSimulationParams {
  heartRate: number;
  medicineLevelPct: number;
  potassiumBalance: 'Low' | 'Normal' | 'High';
  isSimulationRunning: boolean;
}

export interface CloudJob {
  id: string;
  title: string;
  simpleDescription: string;
  targetProtein: string;
  status: 'QUEUED' | 'RUNNING' | 'COMPLETED';
  progressPct: number;
  timeSpent: string;
}

export interface S3ObjectRecord {
  key: string;
  sizeBytes: number;
  lastModified: string;
  storageClass: string;
  contentType: string;
}

export interface CloudStorageConfig {
  awsRegion: string;
  bucketName: string;
  isConnected: boolean;
  lastSyncTime: string | null;
  githubUsername: string;
  githubRepo: string;
  githubBranch: string;
  isGithubConnected: boolean;
  githubLastCommitTime: string | null;
}
