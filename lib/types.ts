export interface BranchHistory {
  id: string;
  title: string;
  branch: string;
  commitMessage: string;
  timestamp: number;
  commitType?: {
    prefix: string;
    emoji: string;
  };
}