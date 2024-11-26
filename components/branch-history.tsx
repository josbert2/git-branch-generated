"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History } from "lucide-react";
import { BranchHistory } from "@/lib/types";

interface BranchHistoryProps {
  history: BranchHistory[];
  onSelect: (entry: BranchHistory) => void;
}

export function BranchHistoryList({ history, onSelect }: BranchHistoryProps) {
  if (!Array.isArray(history) || history.length === 0) return null;

  return (
    <Card className="p-4 bg-[#131313]  border border-[#ffffff1f] shadow-sm">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-300">
        <History className="h-5 w-5" />
        Recent Branche: ({history.length})
      </h3>
      <ScrollArea className="h-48">
        <div className="space-y-4">
          {history.map((entry, index) => (
            <Card
              key={`${entry.id}-${index}`}
              className="p-3 hover:bg-[#1b1b1b]/30 dark:hover:bg-gray-800/50 cursor-pointer border border-[#ffffff1f]  bg-[#1b1b1b]"
              onClick={() => onSelect(entry)}
            >
              <div className="flex items-center gap-2">
                {entry.commitType && (
                  <span className="text-lg text-gray-300">{entry.commitType.emoji}</span>
                )}
                <p className="font-medium text-gray-300">{entry.branch}</p>
              </div>
              <p className="text-sm text-gray-500">
                {new Date(entry.timestamp).toLocaleDateString()}
              </p>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}