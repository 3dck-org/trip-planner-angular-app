export interface Profile {
  id: number | null;
  name: string | null;
  surname: string | null;
  birthday: Date | null;
  login: string | null;
  email: string | null;
  created_at: Date | null;
  updated_at: Date | null;
  role_id: number | null;
  image_url: string | null;
}
