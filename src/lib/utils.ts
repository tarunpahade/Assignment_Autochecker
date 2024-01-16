'use client'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCookies(name: string): any | null {
  let cookieArray = document.cookie.split(';'); // Split the cookie string into individual key-value pairs

  for(let i = 0; i < cookieArray.length; i++) {
      let cookiePair = cookieArray[i].trim(); // Trim whitespace from each cookie pair
      if (cookiePair.startsWith(name + '=')) {
          const details=decodeURIComponent(cookiePair.substring(name.length + 1)); // Return the cookie value
      return JSON.parse(details)
        }
  }

  return null; // Return null if the cookie was not found
}