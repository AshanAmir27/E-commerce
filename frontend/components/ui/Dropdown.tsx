"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
};

export default function Dropdown({ value, onChange, options }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? "Select option";

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center justify-center rounded-md bg-zinc-800 px-3 py-2 text-sm font-medium text-zinc-100 ring-1 ring-zinc-700 transition hover:bg-zinc-700"
      >
        <span className="text-zinc-300">{selectedLabel}</span>
        {isOpen ? (
          <ChevronUp className="ml-2 h-4 w-4 text-zinc-300" />
        ) : (
          <ChevronDown className="ml-2 h-4 w-4 text-zinc-300" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-40 overflow-hidden rounded-md border border-zinc-700 bg-zinc-800 py-1 shadow-lg shadow-black/30">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`block w-full cursor-pointer px-4 py-2 text-left text-sm transition hover:bg-zinc-700 ${
                value === option.value
                  ? "bg-zinc-700/60 font-medium text-blue-400"
                  : "text-zinc-200"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
