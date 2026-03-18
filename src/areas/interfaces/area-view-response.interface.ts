export interface AreaViewResponse {
  name: string;
  location: string;
  description?: string;
  stats: {
    totalUnits: number;
    availableUnits: number;
    availabilityPercentage: number; 
  };
}
