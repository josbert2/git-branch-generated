"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { CommitType, commitTypes } from "@/lib/commit-types";

interface CommitTypeSelectorProps {
  onSelect: (type: CommitType) => void;
}

console.log(commitTypes)

export function CommitTypeSelector({ onSelect }: CommitTypeSelectorProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selectedType, setSelectedType] = useState<CommitType | null>(null);

  const handleSelect = (currentValue: string) => {
    const type = commitTypes.find((type) => type.prefix === currentValue);
    if (type) {
      setValue(currentValue);
      setSelectedType(type);
      onSelect(type);
      setOpen(false);
    }
  };
  
  console.log(selectedType)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button

          role="combobox"
          aria-expanded={open}
          className="w-full justify-between placeholder:text-sm focus-visible:outline-[#ffffff1f] bg-[#1b1b1b] h-11 text-[#b2b2b2a3]"
        >
          {selectedType ? (
            <span className="flex items-center gap-2 text-[#ffffff1f]">
              <span>{selectedType.emoji}</span>
              <span>{selectedType.prefix}</span>
            </span>
          ) : (
            "Select commit type..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
      
      {commitTypes.map((type) => (
        <>
          <Command value={value} onValueChange={setValue}>
            <CommandInput placeholder="Search commit type..." />
            <CommandList >
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions" className="max-h-[300px] overflow-y-auto">
                {commitTypes.map((type) => (
                  <CommandItem
                    key={type.prefix}
                    value={type.prefix}
                    onSelect={handleSelect}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedType?.prefix === type.prefix
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    <span className="mr-2">{type.emoji}</span>
                    <span className="font-medium">{type.prefix}</span>
                    <span className="ml-2 text-muted-foreground">
                      - {type.description}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          
        </>
      ))}
        {/*<Command value={value} onValueChange={setValue}>
          <CommandInput placeholder="Search commit type..." />
          <CommandEmpty>No commit type found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-y-auto">
            {commitTypes.map((type) => (
              <CommandItem
                key={type.prefix}
                value={type.prefix}
                onSelect={handleSelect}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedType?.prefix === type.prefix
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                <span className="mr-2">{type.emoji}</span>
                <span className="font-medium">{type.prefix}</span>
                <span className="ml-2 text-muted-foreground">
                  - {type.description}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command> */}
      </PopoverContent>
    </Popover>
  );
}