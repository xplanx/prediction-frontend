import { Prediction } from "./types";

export interface Market {
  id: number;
  imgUrl: string;
  title: string;
  tag: string;
  timestamp: string;
  pts: string;
  yes: number;
  no: number;
}

function formatTimestamp(timestamp: string): string {
  // Check if timestamp is a number (Unix timestamp in seconds)
  if (!isNaN(Number(timestamp))) {
    // Convert to milliseconds if it's in seconds
    const milliseconds = Number(timestamp) * 1000;
    return new Date(milliseconds).toLocaleDateString();
  }
  
  // If it's already a date string, try to parse it
  const date = new Date(timestamp);
  if (!isNaN(date.getTime())) {
    return date.toLocaleDateString();
  }
  
  // Fallback to current date if parsing fails
  return new Date().toLocaleDateString();
}

export function mapPredictionToMarket(prediction: Prediction): Market {
  return {
    id: parseInt(prediction.id),
    title: prediction.name,
    imgUrl: prediction.url || "/placeholder-image.jpg",
    timestamp: formatTimestamp(prediction.createdAt),
    pts: "0", // Default value since we don't have this in the Prediction type
    yes: 50, // Default value since we don't have this in the Prediction type
    no: 50, // Default value since we don't have this in the Prediction type
    tag: prediction.tag || "Uncategorized",
  };
} 