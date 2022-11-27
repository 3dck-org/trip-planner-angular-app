export interface Journey {
  id: number | null;
  trip_id: number | null;
  user_id: number | null;
  completed: string | null;
  distance: string | null;
  start_at: string | null;
  end_at: string | null;
  created_at: Date | null;
  updated_at: Date | null;
}
