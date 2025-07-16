export interface Animal {
  id: string;
  name: string;
  scientific_name: string;
  conservation_status: string;
  habitat: string;
  description: string;
  facts: string[];
  threats: string[];
  conservation_efforts: string[];
  image_url: string;
  location_map?: string;
}