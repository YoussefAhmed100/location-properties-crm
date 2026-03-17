export interface AreaViewResponse {
  name: string;
  location: string;
  
  description?: string;
 

  totalUnits: number;
  availableUnits: number;
  availabilityRate: number;
}