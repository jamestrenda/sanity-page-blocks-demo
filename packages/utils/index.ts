import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const titleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const capitalize = (input: string) =>
  input.charAt(0).toUpperCase() + input.slice(1);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
