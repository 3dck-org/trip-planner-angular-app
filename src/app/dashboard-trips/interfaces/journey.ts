import {Trip} from "./trip";
import {User} from "../../auth-page-component/interfaces/user";

export interface Journey {
  id: number | null;
  trip: Trip | null;
  user: User | null;
  completed: string | null;
  distance: string | null;
  start_at: string | null;
  end_at: string | null;
  created_at: Date | null;
  updated_at: Date | null;
}
