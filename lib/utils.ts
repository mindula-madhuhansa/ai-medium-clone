import moment from "moment";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatJson(input: string) {
  const cleanedInput = input.replace(/```json|```/g, "").trim();
  return JSON.parse(cleanedInput);
}

export function formatDate(date: string) {
  return moment(date).format("MMM D, YYYY");
}
