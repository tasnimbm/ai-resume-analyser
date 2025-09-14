import { v4 as uuidv4 } from "uuid";
import { twMerge } from "tailwind-merge";
import type { ClassValue } from "clsx";
import { clsx } from "clsx";

export const generateUUID = () => uuidv4();

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
