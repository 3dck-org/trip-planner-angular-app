export interface CreateTripPlaceDto {
  name: string;
  description: string;
  point: string;
  category_names: string[];
  street: string;
  city: string;
  google_maps_url: string;
}
