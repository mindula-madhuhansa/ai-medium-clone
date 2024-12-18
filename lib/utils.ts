import moment from "moment";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatJson(input: string) {
  const cleanedInput = input.replace(/```json|```/g, "").trim();
  const sanitizedInput = cleanedInput.replace(/[\x00-\x1F\x7F-\x9F]/g, "");
  return JSON.parse(sanitizedInput);
}

export function formatDate(date: string) {
  return moment(date).format("MMM D, YYYY");
}
