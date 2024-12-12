import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatJson(input: string) {
  const cleanedInput = input.replace(/```json|```/g, "").trim();
  return JSON.parse(cleanedInput);
}
