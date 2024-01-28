'use client'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCookies(name: string): any | null {
  let cookieArray = document.cookie.split(';'); // Split the cookie string into individual key-value pairs

  for (let i = 0; i < cookieArray.length; i++) {
    let cookiePair = cookieArray[i].trim(); // Trim whitespace from each cookie pair
    if (cookiePair.startsWith(name + '=')) {
      const details = decodeURIComponent(cookiePair.substring(name.length + 1)); // Extract the cookie value
      try {
        return JSON.parse(details); // Parse and return the cookie value
      } catch (e) {
        console.error("Error parsing JSON from cookie", e);
        return null; // Return null or handle the error as needed
      }
    }
  }

  return null; // Return null if the cookie was not found
}
