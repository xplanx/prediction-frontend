export interface Prediction {
  id: string;
  name: string;
  description: string;
  outcome1: string;
  outcome2: string;
  optionalReward: string;
  b: string;
  url: string;
  createdAt: string;
  tag?: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}

export interface PredictionsResponse {
  predictionss: {
    items: Prediction[];
    pageInfo: PageInfo;
    totalCount: number;
  };
} 