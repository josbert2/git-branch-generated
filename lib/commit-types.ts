export interface CommitType {
  prefix: string;
  emoji: string;
  description: string;
  example: string;
}

export const commitTypes: CommitType[] = [
  {
    prefix: 'feat',
    emoji: '✨',
    description: 'New features or capabilities',
    example: 'Add Google authentication'
  },
  {
    prefix: 'fix',
    emoji: '🐛',
    description: 'Bug fixes',
    example: 'Fix user loading error'
  },
  {
    prefix: 'refactor',
    emoji: '♻️',
    description: 'Code improvements without fixing bugs or adding features',
    example: 'Optimize validation code'
  },
  {
    prefix: 'docs',
    emoji: '📝',
    description: 'Documentation changes',
    example: 'Update installation guide'
  },
  {
    prefix: 'style',
    emoji: '💄',
    description: 'Code style changes (formatting, missing semi colons, etc)',
    example: 'Fix indentation'
  },
  {
    prefix: 'test',
    emoji: '✅',
    description: 'Adding or modifying tests',
    example: 'Add login unit tests'
  },
  {
    prefix: 'perf',
    emoji: '⚡️',
    description: 'Performance improvements',
    example: 'Optimize database queries'
  },
  {
    prefix: 'chore',
    emoji: '🔧',
    description: 'Maintenance tasks',
    example: 'Update npm dependencies'
  },
  {
    prefix: 'build',
    emoji: '👷',
    description: 'Build system or external dependencies',
    example: 'Configure webpack for production'
  },
  {
    prefix: 'ci',
    emoji: '💚',
    description: 'CI/CD changes',
    example: 'Add test job to GitHub Actions'
  },
  {
    prefix: 'revert',
    emoji: '⏪',
    description: 'Revert previous changes',
    example: 'Revert commit abc123'
  },
  {
    prefix: 'hotfix',
    emoji: '🚑',
    description: 'Critical fixes in production',
    example: 'Fix critical login bug'
  },
  {
    prefix: 'deps',
    emoji: '⬆️',
    description: 'Dependency updates',
    example: 'Update Tailwind CSS to v3.3.0'
  }
];

const commitTypesFallback: CommitType[] = [
  { prefix: "feat", emoji: "✨", description: "New features or capabilities", example: "Add feature X" },
  { prefix: "fix", emoji: "🐛", description: "Bug fixes", example: "Fix bug Y" },
];
const types = commitTypes || commitTypesFallback;