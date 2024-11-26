"use client";

import { useState, useEffect } from "react";
import { GitBranch, Copy, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { CommitTypeSelector } from "@/components/commit-type-selector";
import { BranchHistoryList } from "@/components/branch-history";
import { CommitType } from "@/lib/commit-types";
import { BranchHistory } from "@/lib/types";

export default function Home() {
  const [identifier, setIdentifier] = useState("");
  const [title, setTitle] = useState("");
  const [branchName, setBranchName] = useState("");
  const [commitMessage, setCommitMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<BranchHistory[]>([]);
  const [selectedCommitType, setSelectedCommitType] = useState<CommitType | null>(null);

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("branchHistory");
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        setHistory(Array.isArray(parsedHistory) ? parsedHistory : []);
      }
    } catch (error) {
      console.error("Error loading history:", error);
      setHistory([]);
    }
  }, []);

  const isValidIdentifier = (id: string) => /^KAN-\d+$/.test(id);

  const generateBranchName = () => {
    if (!isValidIdentifier(identifier)) {
      toast.error("Invalid identifier format. Use KAN-XX format.");
      return;
    }
    if (!title) {
      toast.error("Please enter a title.");
      return;
    }

    const formattedTitle = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    const newBranchName = `${identifier}-${formattedTitle}`;
    setBranchName(newBranchName);

    toast.success("Branch name generated!");
  };

  const generateCommitMessage = async () => {
    if (!title) {
      toast.error("Please enter a title first.");
      return;
    }
    if (!selectedCommitType) {
      toast.error("Please select a commit type.");
      return;
    }

    setIsLoading(true);
    try {
      const formattedTitle = title.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
      const message = `${selectedCommitType.emoji} ${selectedCommitType.prefix}(${identifier}): ${formattedTitle}

This commit introduces ${selectedCommitType.prefix === 'fix' ? 'a fix for' : 'functionality to'} ${formattedTitle}.`;
      
      setCommitMessage(message);
      
      if (branchName) {
        const newEntry: BranchHistory = {
          id: identifier,
          title,
          branch: branchName,
          commitMessage: message,
          timestamp: Date.now(),
          commitType: {
            prefix: selectedCommitType.prefix,
            emoji: selectedCommitType.emoji,
          },
        };
        
        const updatedHistory = [newEntry, ...history].slice(0, 5);
        setHistory(updatedHistory);
        localStorage.setItem("branchHistory", JSON.stringify(updatedHistory));
      }
      
      toast.success("Commit message generated!");
    } catch (error) {
      console.error("Error generating commit message:", error);
      toast.error("Failed to generate commit message");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
  };

  const handleHistorySelect = (entry: BranchHistory) => {
    setIdentifier(entry.id);
    setTitle(entry.title);
    setBranchName(entry.branch);
    setCommitMessage(entry.commitMessage);
    if (entry.commitType) {
      const commitType = {
        prefix: entry.commitType.prefix,
        emoji: entry.commitType.emoji,
        description: "",
        example: "",
      };
      setSelectedCommitType(commitType);
    }
  };

  return (
    <main className="min-h-screen  p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="p-6 backdrop-blur-lg bg-[#131313]  border border-[#ffffff1f]">
          <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Branch Name Generator
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
            Generate standardized branch names and commit messages for your Kanban-style workflow.
            Simply enter your ticket ID (KAN-XX) and a descriptive title.
          </p>

          <div className="space-y-6">
            <div className="space-y-4">
              <Input
                placeholder="KAN-14"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className=""
              />
              <Input
                placeholder="Feature description (e.g., Add user authentication)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className=""
              />
              <CommitTypeSelector onSelect={setSelectedCommitType} />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={generateBranchName}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <GitBranch className="mr-2 h-4 w-4" />
                Generate Branch
              </Button>
              <Button
                onClick={generateCommitMessage}
                disabled={isLoading || !branchName || !selectedCommitType}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Generate Commit Message"
                )}
              </Button>
            </div>

            {(branchName || commitMessage) && (
              <Card className="p-4 space-y-4 bg-gray-50 dark:bg-gray-800/50">
                {branchName && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Branch Command
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(
                            `git checkout -b ${branchName}`,
                            "Branch command"
                          )
                        }
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <code className="block p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                      git checkout -b {branchName}
                    </code>
                  </div>
                )}

                {commitMessage && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Commit Message
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(commitMessage, "Commit message")
                        }
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <pre className="whitespace-pre-wrap p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                      {commitMessage}
                    </pre>
                  </div>
                )}
              </Card>
            )}

            {Array.isArray(history) && history.length > 0 && (
              <BranchHistoryList history={history} onSelect={handleHistorySelect} />
            )}
          </div>
        </Card>
      </div>
    </main>
  );
}